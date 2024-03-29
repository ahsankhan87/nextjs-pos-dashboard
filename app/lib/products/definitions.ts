// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DateTime } from "next-auth/providers/kakao";

// However, these types are generated automatically if you're using an ORM such as Prisma.

export type ProductsTable = {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  cost_price: number;
  avg_cost: number;
  unit_price: number;

};

export type ProductsField = {
  item_id: number;
  name: string;
  cost_price: number;
  unit_price: number;
};