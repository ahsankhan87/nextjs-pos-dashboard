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
