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

const FormSchemaModal = z.object({
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
export type StateModal = {
    errors?: {
        first_name?: string[];
        email?: string[];
        phone_no?: string[];
        address?: string[];
    };
    message?: string | null;
};

const CreateCustomerModal = FormSchemaModal.omit({ id: true, date: true });

export async function createCustomerModal(prevState: StateModal, formData: FormData) {
    // Validate form using Zod
   
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

        revalidatePath('/dashboard/customers');
        revalidatePath('/dashboard/invoices/create');

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Customer Modal.',
        };
    }

    //redirect('/dashboard/customers');
}

export async function getLastInsertID() {
    try {
        const lastInsertId: any = await executeQuery(`
            SELECT LAST_INSERT_ID()
        `);

        return lastInsertId[0]['LAST_INSERT_ID()']

    } catch (error) {
        return {
            message: 'Database Error: Failed to get LAST_INSERT_ID.',
        };
    }
}

const UpdateCustomer = FormSchema.omit({ id: true, date: true });

export async function updateCustomer(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateCustomer.safeParse({
        first_name: formData.get('first_name'),
        email: formData.get('email'),
        phone_no: formData.get('phone_no'),
        address: formData.get('address'),
    });
    
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Customer.',
        };
    }

    const { first_name, email, phone_no, address } = validatedFields.data;

    try {
        await executeQuery(`
        UPDATE pos_customers
        SET first_name = '${first_name}', email = '${email}', phone_no = '${phone_no}', address = '${address}'
        WHERE id = '${id}'
      `);
    } catch (error) {
        return { message: 'Database Error: Failed to Update Customer.' };
    }

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
    // throw new Error('Failed to Delete Customer');
    try {
        await executeQuery(`DELETE FROM pos_customers WHERE id = '${id}'`);
        revalidatePath('/dashboard/customers');
        return { message: 'Customer Deleted.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Customer.' };
    }
}
