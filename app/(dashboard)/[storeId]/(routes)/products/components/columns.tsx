"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  colors: string[]
  sizes: string[]
  inStock: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
      {/* Map through the colors array and create a ball for each color */}
      {row.original.colors.map((color, index) => (
        <div
          key={index} // Using index as the key since we are dealing with an array
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
    )
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  },
]

