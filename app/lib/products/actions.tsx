'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { executeQuery } from '../db';

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    cost_price: z.coerce
        .number()
        .gt(0, { message: 'Please enter an cost price greater than $0.' }),
    unit_price: z.coerce
        .number()
        .gt(0, { message: 'Please enter an unit price greater than $0.' })

});
export type State = {
    errors?: {
        name?: string[];
        cost_price?: string[];
        unit_price?: string[];
    };
    message?: string | null;
};

const CreateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(prevState: State, formData: FormData) {
    // Validate form using Zod

    const validatedFields = CreateProduct.safeParse({
        name: formData.get('name'),
        cost_price: formData.get('cost_price'),
        unit_price: formData.get('unit_price'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
        };
    }

    // Prepare data for insertion into the database
    const { name, cost_price, unit_price } = validatedFields.data;
    const costPriceInCents = cost_price * 100;
    const unitPriceInCents = unit_price * 100;
    // const date = new Date().toISOString().split('T')[0];

    try {

        await executeQuery(`
            INSERT INTO pos_items_detail (name, cost_price, unit_price)
            VALUES ('${name}', '${costPriceInCents}', '${unitPriceInCents}')
          `);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Product.',
        };
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
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