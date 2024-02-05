// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DateTime } from "next-auth/providers/kakao";

// However, these types are generated automatically if you're using an ORM such as Prisma.

export type SuppliersTable = {
  id: number;
  name: string;
  email: string;
  address: string;
  contact_no: string;
  status: string;

};
