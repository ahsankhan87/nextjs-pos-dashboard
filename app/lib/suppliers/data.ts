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

    const results = await executeQuery<SuppliersTable>('SELECT * FROM pos_supplier');
    //console.log(results);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all Suppliers.');
  }

}
const ITEMS_PER_PAGE = 6;
export async function fetchSuppliersPages(query: string) {
  noStore();
  try {
    const count: any = await executeQuery(`SELECT COUNT(*) as count
      FROM pos_supplier
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
        FROM pos_supplier
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
