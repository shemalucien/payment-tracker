import { Product } from "./product";
export interface Order {
  id ?: string;
  client ?: string;
  products ?: Product[];
  quantity ?: number;
  paymentMode ?: string;
  totalAmount : number;
  invoiceDate ?: string;
  status : string;
};