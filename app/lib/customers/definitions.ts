// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DateTime } from "next-auth/providers/kakao";

// However, these types are generated automatically if you're using an ORM such as Prisma.

export type CustomersTable = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  store_name: string;
  city: string;
  address: string;
  phone_no: string;
  status: 'active' | 'inactive';
};
