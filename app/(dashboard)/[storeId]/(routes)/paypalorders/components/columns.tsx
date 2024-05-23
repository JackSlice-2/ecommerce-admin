"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export type PayOrderColumn =  {
  id: string;
  totalPrice: string;
  createdAt: string;
  orderID: string;
  payerID: string;
  paymentID: string;
  billingToken: string;
  facilitatorAccessToken: string;
  paymentSource: string;
  isPaid: boolean;
}

export const paycolumns: ColumnDef<PayOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
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
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "orderID",
    header: "PayPal OrderID",
  },
  {
    accessorKey: "payerID",
    header: "Paypal PayerID",
  },
  {
    accessorKey: "paymentID",
    header: "Paypal PaymentID",
  },
  {
    accessorKey: "billingToken",
    header: "Paypal BillingToken",
  },{
    accessorKey: "billingToken",
    header: "Paypal BillingToken",
  },{
    accessorKey: "facilitatorAccessToken",
    header: "Paypal facilitatorAccessToken",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]

