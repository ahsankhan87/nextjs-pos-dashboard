// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DateTime } from "next-auth/providers/kakao";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  sale_id: string;
  customer_id: string;
  first_name: string;
  email: string;
  image_url: string;
  sale_date: string;
  total_amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type CustomersTable_1 = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  store_name: string;
  city: string;
  address: string;
  phone_no: string;

};
export type FormattedCustomersTable = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;

};
export type CompaniesTable = {
  id: string;
  name: string;
  contact_no: string;
  email: string;
  address: string;
  image: string;
  locked: boolean;
  expire: Date | any;

};
export type CustomerField = {
  id: string;
  first_name: string;
};

export type InvoiceForm = {
  sale_id: string;
  customerId: string;
  amount: number;
  total_amount: number;
  status: 'pending' | 'paid';
  sale_date: string;
  due_date: string;
};


