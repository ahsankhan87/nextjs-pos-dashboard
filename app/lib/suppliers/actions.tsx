'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { executeQuery } from '../db';



const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please Enter a supplier name.',
    }),
    email: z.string({
        invalid_type_error: 'Please Enter a supplier email.',
    }),
    contact_no: z.string({
        invalid_type_error: 'Please Enter a supplier phone no.',
    }),
    address: z.string({
        invalid_type_error: 'Please Enter a supplier address.',
    }),
});
export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        contact_no?: string[];
        address?: string[];
    };
    message?: string | null;
};

const CreateSupplier = FormSchema.omit({ id: true, date: true });

export async function createSupplier(prevState: State, formData: FormData) {
    // Validate form using Zod

    const validatedFields = CreateSupplier.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        contact_no: formData.get('contact_no'),
        address: formData.get('address'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Supplier.',
        };
    }

    // Prepare data for insertion into the database
    const { name, email, contact_no, address } = validatedFields.data;
    //const date = new Date().toISOString().split('T')[0];

    try {

        await executeQuery(`
            INSERT INTO pos_suppliers (name, email, contact_no,address,status,company_id)
            VALUES ('${name}', '${email}', '${contact_no}','${address}', 'active', '21')
          `);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Supplier.',
        };
    }

    revalidatePath('/dashboard/suppliers');
    redirect('/dashboard/suppliers');
}

const FormSchemaModal = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please Enter a supplier name.',
    }),
    email: z.string({
        invalid_type_error: 'Please Enter a supplier email.',
    }),
    contact_no: z.string({
        invalid_type_error: 'Please Enter a supplier phone no.',
    }),
    address: z.string({
        invalid_type_error: 'Please Enter a supplier address.',
    }),
});
export type StateModal = {
    errors?: {
        name?: string[];
        email?: string[];
        contact_no?: string[];
        address?: string[];
    };
    message?: string | null;
};

const CreateSupplierModal = FormSchemaModal.omit({ id: true, date: true });

export async function createSupplierModal(prevState: StateModal, formData: FormData) {
    // Validate form using Zod

    const validatedFields = CreateSupplierModal.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        contact_no: formData.get('contact_no'),
        address: formData.get('address'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Supplier Modal.',
        };
    }

    // Prepare data for insertion into the database
    const { name, email, contact_no, address } = validatedFields.data;
    //const date = new Date().toISOString().split('T')[0];

    try {

        await executeQuery(`
            INSERT INTO pos_suppliers (name, email, contact_no,address,status,company_id)
            VALUES ('${name}', '${email}', '${contact_no}','${address}', 'active', '21')
          `);

        revalidatePath('/dashboard/suppliers');
        revalidatePath('/dashboard/invoices/create');

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create supplier Modal.',
        };
    }

    //redirect('/dashboard/suppliers');
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

const UpdateSupplier = FormSchema.omit({ id: true, date: true });

export async function updateSupplier(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateSupplier.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        contact_no: formData.get('contact_no'),
        address: formData.get('address'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Supplier.',
        };
    }

    const { name, email, contact_no, address } = validatedFields.data;

    try {
        await executeQuery(`
        UPDATE pos_suppliers
        SET name = '${name}', email = '${email}', contact_no = '${contact_no}', address = '${address}'
        WHERE id = '${id}'
      `);
    } catch (error) {
        return { message: 'Database Error: Failed to Update supplier.' };
    }

    revalidatePath('/dashboard/suppliers');
    redirect('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
    // throw new Error('Failed to Delete Supplier');
    try {
        await executeQuery(`DELETE FROM pos_suppliers WHERE id = '${id}'`);
        revalidatePath('/dashboard/suppliers');
        return { message: 'Supplier Deleted.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Supplier.' };
    }
}
