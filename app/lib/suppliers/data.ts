'use server';
import { executeQuery } from '../db';
import {
  SuppliersTable
} from '../suppliers/definitions';
import { unstable_noStore as noStore } from 'next/cache';

// export async function fetchSuppliers() {
//     noStore();
//     try {
//         type results = Array<any>;
//         const [results] = await executeQuery.execute("select * from pos_Suppliers");
//         //db.end();
//         console.log(results);
//         return results;
//     } catch (error) {
//         console.log(error);
//         return error + ' Failed to fetch revenue data';
//     }
// }
export async function fetchSuppliers() {
  noStore();
  try {
    // const result = await executeQuery<{ propertyName: string }[]>('SELECT * FROM your_table');
    // console.log('Fetching customer data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fetched data after 3 second...');

    const results = await executeQuery<SuppliersTable>('SELECT * FROM pos_suppliers');
    //console.log(results);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all Suppliers.');
  }

}

export async function fetchSupplierById(id: string = "0") {
  noStore();
  try {
    // const result = await executeQuery<{ propertyName: string }[]>('SELECT * FROM your_table');
    // console.log('Fetching product data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fetched data after 3 second...');

    const results = await executeQuery<SuppliersTable>(`SELECT name,email,contact_no,address,status FROM pos_suppliers WHERE id = ${id}`);
    //console.log(id);
    // return results;

    const supplier = results.map((supplier) => ({
      ...supplier,
      // Convert amount from cents to dollars

    }));
    // product is an empty array []
    return supplier[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch supplier by id.');
  }

}

const ITEMS_PER_PAGE = 6;
export async function fetchSuppliersPages(query: string) {
  noStore();
  try {
    const count: any = await executeQuery(`SELECT COUNT(*) as count
      FROM pos_suppliers
      WHERE
        name LIKE '%${query}%'
        
    `);

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    //console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Suppliers.');
  }
}

export async function fetchFilteredSuppliers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const Suppliers = await executeQuery<SuppliersTable>(`
        SELECT
          *
        FROM pos_suppliers
        WHERE
            name LIKE '%${query}%'
            ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
    //console.log(invoices);
    return Suppliers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Suppliers.');
  }
}
