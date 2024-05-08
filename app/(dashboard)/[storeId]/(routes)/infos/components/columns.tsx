"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type InfoColumn = {
  id: string
  name: string
  billboardid: string
  icon: string
  phonenumber: string
  whatsapp: string
  instagram: string
  facebook: string
  email: string
  createdAt: string;
}

export const columns: ColumnDef<InfoColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },{
    accessorKey: "billboardid",
    header: "Billboard ID",
  },{
    accessorKey: "phonenumber",
    header: "Phone Number",
  },{
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },{
    accessorKey: "instagram",
    header: "Instagram",
  },{
    accessorKey: "facebook",
    header: "Facebook",
  },{
    accessorKey: "email",
    header: "E-Mail",
  },{
    accessorKey: "icon",
    header: "Logo",
  },{
    accessorKey: "createdAt",
    header: "Date",
  },{
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  },
]
