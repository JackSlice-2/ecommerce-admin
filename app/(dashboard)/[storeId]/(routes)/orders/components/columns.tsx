"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
// import { CellAction } from "./cell-action";

export type CommonOrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  paymentType: 'Stripe' | 'PayPal';
}

export type OrderColumn = CommonOrderColumn;

export type PayOrderColumn = CommonOrderColumn & {
  id: string;
  orderID: string;
  payerID: string;
  paymentID: string;
  billingToken: string;
  facilitatorAccessToken: string;
  paymentSource: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "paymentType",
    header: "PaymentType",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
   {
     id: "actions",
     cell: ({ row }) => <CellAction data={row.original} />
   },
]
