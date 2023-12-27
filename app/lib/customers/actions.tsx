'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { executeQuery } from '../db';


export async function activateCompany(
    companyid: string,
) {
    try {
        await executeQuery(`UPDATE companies SET locked = '1' WHERE id = '${companyid}'`);
        revalidatePath('/dashboard/customers');

    } catch (error) {
        return { message: 'Database Error: Failed to activate.' };
    }
}

export async function deactivateCompany(
    companyid: string,
) {
    try {
        await executeQuery(`UPDATE companies SET locked = '0' WHERE id = '${companyid}'`);
        revalidatePath('/dashboard/customers');

    } catch (error) {
        return { message: 'Database Error: Failed to activate.' };
    }
}