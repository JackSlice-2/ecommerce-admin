"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type BillboardColumn = {
  id: string
  label: string
  imageUrl: string
  createdAt: string;
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
      <div style={{ width: "50px", height: "50px" }}>
        <Image src={row.original.imageUrl} alt="Icon" width={50} height={50} className="rounded-md"/>
      </div>
    ),
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
