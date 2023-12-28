'use server';
import { executeQuery } from '../db';
import {
    CompaniesTable
} from '../../lib/definitions';
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

        const results = await executeQuery<CompaniesTable>('SELECT * FROM companies');
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
      const count:any = await executeQuery(`SELECT COUNT(*) as count
      FROM companies
      WHERE
        name LIKE '%${query}%' OR
        email LIKE '%${query}%' OR
        contact_no LIKE '%${query}%'
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
      const companies = await executeQuery<CompaniesTable>(`
        SELECT
          *
        FROM companies
        WHERE
            name LIKE '%${query}%' OR
            email LIKE '%${query}%' OR
            contact_no LIKE '%${query}%'
            ORDER BY expire DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
      //console.log(invoices);
      return companies;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch companies.');
    }
  }
  