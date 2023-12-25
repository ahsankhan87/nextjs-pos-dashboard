'use server';
import { executeQuery } from '../db';
import {
    FormattedCustomersTable
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

        const results = await executeQuery<FormattedCustomersTable>('SELECT * FROM customers');
        //console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return error + ' Failed to fetch customers data';
    }
}
