"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type InfoColumn = {
  id: string
  name: string
  icon: string
  phonenumber: string
  whatsapp: string
  instagram: string
  facebook: string
  email: string
  footerText: string
  footerText2: string
  darkMode: boolean
  darkPrimaryColor: string
  darkSecondaryColor: string
  lightMode: boolean
  lightPrimaryColor: string
  lightSecondaryColor: string
  visa: boolean
  mastercard: boolean
  amex: boolean
  hipercard: boolean
  elo: boolean
  pix: boolean
  paypal: boolean
  stripe: boolean
  createdAt: string;
}

export const columns: ColumnDef<InfoColumn>[] = [
  {
    id: "actions",
    header: "Edit",
    cell: ({ row }) => <CellAction data={row.original} />
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "icon",
    header: "Logo",
    cell: ({ row }) => (
      <div style={{ width: "50px", height: "50px" }}>
        <Image src={row.original.icon} alt="Icon" width={50} height={50} />
      </div>
    ),
  },{
    accessorKey: "phonenumber",
    header: "Phone Number",
  },{
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },{
    accessorKey: "instagram",
    header: "Instagram",
  },
  {
    accessorKey: "facebook",
    header: "Facebook",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "footerText",
    header: "Year in Footer",
  },
  {
    accessorKey: "footerText2",
    header: "Rights Reservations",
  },/*
  {
    accessorKey: "darkMode",
    header: "Dark Mode",
  },
  {
    accessorKey: "darkPrimaryColor",
    header: "Dark Mode Primary Color",
  },
  {
    accessorKey: "darkSecondaryColor",
    header: "Dark Mode Secondary Color",
  },
  {
    accessorKey: "lightMode",
    header: "Light Mode",
  },
  {
    accessorKey: "lightPrimaryColor",
    header: "Light Mode Primary Color",
  },
  {
    accessorKey: "lightSecondaryColor",
    header: "Light Mode Secondary Color",
  },*/
  {
    accessorKey: "visa",
    header: "Visa",
  },
  {
    accessorKey: "mastercard",
    header: "Mastercard",
  },
  {
    accessorKey: "amex",
    header: "Amex",
  },
  {
    accessorKey: "hipercard",
    header: "Hipercard",
  },
  {
    accessorKey: "elo",
    header: "Elo",
  },
  {
    accessorKey: "pix",
    header: "Pix",
  },
  {
    accessorKey: "paypal",
    header: "Paypal",
  },
  {
    accessorKey: "stripe",
    header: "Stripe",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
]
