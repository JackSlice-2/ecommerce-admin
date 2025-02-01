"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { XCircle } from "lucide-react"
import Link from "next/link"

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
    cell: ({ row }) => {
      return (
        <Link href={`tel:${row.original.phonenumber}`}
          className="hover:underline">
          {row.original.phonenumber}
        </Link>
      )
    }
  },{
    accessorKey: "whatsapp",
    header: "WhatsApp",
    cell: ({ row }) => {
      return (
        <Link href={`${row.original.whatsapp}`}
          className="hover:underline">
          {row.original.whatsapp.split("=")[1]}
        </Link>
      )
    }
  },{
    accessorKey: "instagram",
    header: "Instagram",
    cell: ({ row }) => {
      return (
        <Link href={`${row.original.instagram}`}
          className="hover:underline">
          {row.original.instagram.split(".com/")[1]}
        </Link>
      )
    }
  },
  {
    accessorKey: "facebook",
    header: "Facebook",
    cell: ({ row }) => {
      return (
        <Link href={`${row.original.facebook}`}
          className="hover:underline">
          {row.original.facebook.split(".com/")[1]}
        </Link>
      )
    }
  },
  {
    accessorKey: "email",
    header: "E-Mail",
    cell: ({ row }) => {
      return (
        <Link href={`mailto:${row.original.email}?subject=${encodeURIComponent("Teste")}&body=${encodeURIComponent("Link do Email Funcionando!")}`}
          className="hover:underline">
          {row.original.email}
        </Link>
      )
    }
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
    id: "paymentMethods",
    header: "Payment Methods",
    cell: ({ row }) => {
      const paymentMethods = [
        { name: "Visa", value: row.original.visa, image: '/visa.svg'},
        { name: "Mastercard", value: row.original.mastercard, image: '/mastercard.svg'},
        { name: "Amex", value: row.original.amex, image: '/amex.svg'},
        { name: "Hipercard", value: row.original.hipercard, image: '/hipercard.svg'},
        { name: "Elo", value: row.original.elo, image: '/elo.png'},
        { name: "Pix", value: row.original.pix, image: '/pix.webp'},
        { name: "Stripe", value: row.original.stripe, image: '/stripe.svg'},
      ];
      return (
        <div className="grid grid-cols-2 gap-2">
        {paymentMethods.map((method) => (
          method.value === true ? (
            <div key={method.name} className="flex items-center justify-center">
              <Image src={method.image} alt={method.name} width={50} height={50} />
            </div>
          ) : null
        ))}
      </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {{
      return (
        <>
          <p>
            {row.original.createdAt.split(",")[0]}
          </p>
          <p className="text-end">
            {row.original.createdAt.split(",")[1]}
          </p>
        </>
        )
    }}
  }
]