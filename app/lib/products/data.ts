'use server';
import { executeQuery } from '../db';
import {
    ProductsField
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

export async function fetchProducts() {
    noStore();
    try {
        const results = await executeQuery<ProductsField[]>('SELECT * FROM pos_items');
        // console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return error + ' Failed to fetch products data';
    }
}