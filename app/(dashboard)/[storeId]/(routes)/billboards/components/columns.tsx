"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type BillboardColumn = {
  id: string
  label: string
  imageUrl: string
  createdAt: string;
  categories: string;
  disableDelete: boolean;
  isMain: boolean;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div style={{ width: "110px", height: "80px" }}>
        <Image src={row.original.imageUrl} alt="Icon" width={110} height={80} />
      </div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: 'isMain',
    header: 'Main',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const disableDelete = row.original.isMain;
      return <CellAction isMainBillboard={disableDelete} data={row.original} />;
    },
  },
];
