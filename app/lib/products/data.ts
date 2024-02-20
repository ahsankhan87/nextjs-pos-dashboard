'use server';
import { executeQuery } from '../db';
import {
  ProductsTable
} from '../../lib/products/definitions';
import { unstable_noStore as noStore } from 'next/cache';

// export async function fetchProducts() {
//     noStore();
//     try {
//         type results = Array<any>;
//         const [results] = await executeQuery.execute("select * from pos_Products");
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
    // const result = await executeQuery<{ propertyName: string }[]>('SELECT * FROM your_table');
    // console.log('Fetching customer data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fetched data after 3 second...');

    const results = await executeQuery<ProductsTable>('SELECT * FROM pos_items_detail');
    //console.log(results);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all Products.');
  }

}

export async function fetchProductById(id: string = "0") {
  noStore();
  try {
    // const result = await executeQuery<{ propertyName: string }[]>('SELECT * FROM your_table');
    // console.log('Fetching customer data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fetched data after 3 second...');

    const results = await executeQuery<ProductsTable>(`SELECT * FROM pos_items_detail WHERE id = ${id}`);
    console.log(id);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product by id.');
  }

}

const ITEMS_PER_PAGE = 6;
export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count: any = await executeQuery(`SELECT COUNT(*) as count
      FROM pos_items_detail
      WHERE
        name LIKE '%${query}%'
        
    `);

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    //console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await executeQuery<ProductsTable>(`
        SELECT
          *
        FROM pos_items_detail
        WHERE
            name LIKE '%${query}%'
            ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
    //console.log(invoices);
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
