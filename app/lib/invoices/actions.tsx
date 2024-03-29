'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../../auth';
import { executeQuery } from '../db';
import { InvoiceForm } from '../definitions';
import { fetchTotalStock } from '../products/data';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  total_amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
  sale_date: z.string(),
  due_date: z.string(),
  total_tax: z.string(),
});
export type State = {
  errors?: {
    customerId?: string[];
    total_amount?: string[];
    total_tax?: string[];
    status?: string[];
    sale_date?: string[];
    due_date?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: InvoiceForm | any) {

  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.customerId,
    total_amount: formData.total_amount,
    total_tax: formData.total_tax,
    status: formData.status,
    sale_date: formData.sale_date,
    due_date: formData.due_date,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, total_amount, total_tax, status, sale_date, due_date } = validatedFields.data;
  //const amountInCents = total_amount * 100;
  //const date = new Date().toISOString().split('T')[0];

  try {

    await executeQuery(`
          INSERT INTO pos_invoices (customer_id, total_amount,total_tax, status, sale_date,due_date,company_id)
          VALUES ('${customerId}', '${total_amount}','${total_tax}',  '${status}', '${sale_date}', '${due_date}','21')
        `);

    const lastInsertId: any = await executeQuery(`
        SELECT LAST_INSERT_ID()
    `);
    const invoiceLastInsertID: string = lastInsertId[0]['LAST_INSERT_ID()']

    for (const entry of formData.details) {
      await executeQuery(`
          INSERT INTO pos_invoices_items (sale_id,invoice_no,item_id, quantity_sold,item_cost_price,item_unit_price,company_id)
          VALUES ('${invoiceLastInsertID}','${invoiceLastInsertID}','${entry.productId}', 
          '${entry.quantity}','${entry.costPrice}','${entry.unitPrice}','21')
        `);

      //get total quantity of the project and add/substract with sale qty
      const total_quantity: number = await fetchTotalStock(entry.productId);

      await executeQuery(`UPDATE pos_items_detail
          SET quantity = '${(total_quantity - entry.quantity)}'
          WHERE id = '${entry.productId}'
        `);

      //inventory table
      await executeQuery(`
          INSERT INTO pos_inventory (trans_user,invoice_no,trans_item, trans_inventory,cost_price,unit_price,company_id,trans_comment)
          VALUES ('${entry.id}','${invoiceLastInsertID}','${entry.productId}', '${entry.quantity}','${entry.costPrice}','${entry.unitPrice}','21','${status}')
        `);
    }


  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    total_amount: formData.get('total_amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, total_amount, status } = validatedFields.data;
  const amountInCents = total_amount * 100;

  try {
    await executeQuery(`
        UPDATE pos_invoices
        SET customer_id = '${customerId}', total_amount = '${amountInCents}', description = '${status}'
        WHERE sale_id = '${id}'
      `);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await executeQuery(`DELETE FROM pos_invoices WHERE sale_id = '${id}'`);
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}