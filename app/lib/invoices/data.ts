import { sql } from '@vercel/postgres';
import { executeQuery } from '../db';

import {
  CustomerField,
  CustomersTable,
  FormattedCustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from '../definitions';
import { formatCurrency } from '../utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await executeQuery<Revenue>(`SELECT sales_month as month, total_sales as revenue FROM monthly_sales_view`);
    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await executeQuery<LatestInvoiceRaw>(`
      SELECT pos_invoices.total_amount as amount, pos_customers.first_name as name, pos_customers.email, pos_invoices.sale_id
      FROM pos_invoices
      JOIN pos_customers ON pos_invoices.customer_id = pos_customers.id
      ORDER BY pos_invoices.sale_date DESC
      LIMIT 5`);

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = executeQuery(`SELECT COUNT(*) as count FROM pos_invoices`);
    const customerCountPromise = executeQuery(`SELECT COUNT(*) as count FROM pos_customers`);
    const invoiceStatusPromise = executeQuery(`SELECT
         SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS "pending"
         FROM pos_invoices`);

    const data: any = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await executeQuery<InvoicesTable>(`
      SELECT
        pos_invoices.sale_id,
        pos_invoices.total_amount,
        pos_invoices.sale_date,
        pos_invoices.status,
        pos_customers.first_name,
        pos_customers.email
        
      FROM pos_invoices
      LEFT JOIN pos_customers ON pos_invoices.customer_id = pos_customers.id
      WHERE
        pos_customers.first_name LIKE '%${query}%' OR
        pos_customers.email LIKE '%${query}%' OR
        pos_invoices.total_amount LIKE '%${query}%' OR
        pos_invoices.sale_date LIKE '%${query}%' OR
        pos_invoices.status LIKE '%${query}%' 
      ORDER BY pos_invoices.sale_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `);
    //console.log(invoices);
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count: any = await executeQuery(`SELECT COUNT(*) as count
    FROM pos_invoices
    LEFT JOIN pos_customers ON pos_invoices.customer_id = pos_customers.id
    WHERE
      pos_customers.first_name LIKE '%${query}%' OR
      pos_customers.email LIKE '%${query}%' OR
      pos_invoices.total_amount LIKE '%${query}%' OR
      pos_invoices.sale_date LIKE '%${query}%'
      
  `);

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    //console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await executeQuery<InvoiceForm>(`
      SELECT
        pos_invoices.sale_id,
        pos_invoices.customer_id,
        pos_invoices.total_amount,
        pos_invoices.description as status
      FROM pos_invoices
      WHERE pos_invoices.sale_id = ${id};
    `);

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.total_amount / 100,
    }));
    // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await executeQuery<CustomerField>(`
      SELECT
        id,
        first_name
      FROM pos_customers
      ORDER BY first_name ASC
    `);

    const customers = data;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await executeQuery<FormattedCustomersTable>(`
		SELECT
		  *
		FROM pos_customers
		ORDER BY pos_customers.first_name ASC
	  `);

    const customers = data.map((customer) => ({
      ...customer,

    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await executeQuery(`SELECT * from dashboard_users where email=${email}`);
    return user[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
