'use server';
import { executeQuery } from '../db';
import {
  CustomersTable
} from '../../lib/customers/definitions';
import { unstable_noStore as noStore } from 'next/cache';

// export async function fetchCustomers() {
//     noStore();
//     try {
//         type results = Array<any>;
//         const [results] = await executeQuery.execute("select * from pos_customers");
//         //db.end();
//         console.log(results);
//         return results;
//     } catch (error) {
//         console.log(error);
//         return error + ' Failed to fetch revenue data';
//     }
// }
export async function fetchCustomers() {
  noStore();
  try {
    // const result = await executeQuery<{ propertyName: string }[]>('SELECT * FROM your_table');
    // console.log('Fetching customer data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fetched data after 3 second...');

    const results = await executeQuery<CustomersTable>('SELECT * FROM pos_customers');
    //console.log(results);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }

}
const ITEMS_PER_PAGE = 6;
export async function fetchCustomersPages(query: string) {
  noStore();
  try {
    const count: any = await executeQuery(`SELECT COUNT(*) as count
      FROM pos_customers
      WHERE
        first_name LIKE '%${query}%' OR
        last_name LIKE '%${query}%' OR
        store_name LIKE '%${query}%' OR
        email LIKE '%${query}%' OR
        phone_no LIKE '%${query}%'
    `);

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    //console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = await executeQuery<CustomersTable>(`
        SELECT
          *
        FROM pos_customers
        WHERE
          first_name LIKE '%${query}%' OR
          last_name LIKE '%${query}%' OR
          store_name LIKE '%${query}%' OR
          email LIKE '%${query}%' OR
          phone_no LIKE '%${query}%'
          ORDER BY first_name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
    //console.log(invoices);
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();
  try {
    const data = await executeQuery<CustomersTable>(`
      SELECT
        *
      FROM pos_customers
      WHERE id = ${id};
    `);
    //return data;

    const customer = data.map((customer) => ({
      ...customer,
      // Convert amount from cents to dollars

    }));
    // Customer is an empty array []
    return customer[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

