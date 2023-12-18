'use server';
import db from '../db';

export async function retreiveCustomers() {
    try {
        const [results] = await db.execute("select * from pos_customers");
        db.end();
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return error;
    }
}