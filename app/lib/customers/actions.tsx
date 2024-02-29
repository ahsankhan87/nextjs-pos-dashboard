'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { executeQuery } from '../db';

const FormSchema = z.object({
    id: z.string(),
    first_name: z.string({
        invalid_type_error: 'Please Enter a customer name.',
    }),
    email: z.string({
        invalid_type_error: 'Please Enter a customer email.',
    }),
    phone_no: z.string({
        invalid_type_error: 'Please Enter a customer phone no.',
    }),
    address: z.string({
        invalid_type_error: 'Please Enter a customer address.',
    }),
});
export type State = {
    errors?: {
        first_name?: string[];
        email?: string[];
        phone_no?: string[];
        address?: string[];
    };
    message?: string | null;
};

const CreateCustomer = FormSchema.omit({ id: true, date: true });

export async function createCustomer(prevState: State, formData: FormData) {
    // Validate form using Zod
    console.log(formData);
    const validatedFields = CreateCustomer.safeParse({
        first_name: formData.get('first_name'),
        email: formData.get('email'),
        phone_no: formData.get('phone_no'),
        address: formData.get('address'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }

    // Prepare data for insertion into the database
    const { first_name, email, phone_no, address } = validatedFields.data;
    //const date = new Date().toISOString().split('T')[0];

    try {

        await executeQuery(`
            INSERT INTO pos_customers (first_name, email, phone_no,address,status,company_id)
            VALUES ('${first_name}', '${email}', '${phone_no}','${address}', 'active', '21')
          `);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Customer.',
        };
    }

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

const CreateCustomerModal = FormSchema.omit({ id: true, date: true });

export async function createCustomerModal(prevState: State, formData: FormData) {
    // Validate form using Zod
    console.log(formData);
    const validatedFields = CreateCustomerModal.safeParse({
        first_name: formData.get('first_name'),
        email: formData.get('email'),
        phone_no: formData.get('phone_no'),
        address: formData.get('address'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer Modal.',
        };
    }

    // Prepare data for insertion into the database
    const { first_name, email, phone_no, address } = validatedFields.data;
    //const date = new Date().toISOString().split('T')[0];

    try {

        await executeQuery(`
            INSERT INTO pos_customers (first_name, email, phone_no,address,status,company_id)
            VALUES ('${first_name}', '${email}', '${phone_no}','${address}', 'active', '21')
          `);

        const lastInsertId: any = await executeQuery(`
          SELECT LAST_INSERT_ID()
        `);

        console.log('db insert id ' + lastInsertId[0]['LAST_INSERT_ID()']);

        revalidatePath('/dashboard/customers');
        revalidatePath('/dashboard/invoice/create');
        
        return lastInsertId[0]['LAST_INSERT_ID()'];

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Customer Modal.',
        };
    }

    //redirect('/dashboard/customers');
}

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