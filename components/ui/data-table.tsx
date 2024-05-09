
"use client"

import { useEffect, useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { Select } from "./select"
import StoreSwitcher from "../store-switcher"
import { DropdownMenu } from "./dropdown-menu"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
     []
    );
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters,
        pagination,
      },
});

const handlePageChange = (newPageIndex: number) => {
  setPagination((prevPagination) => ({
   ...prevPagination,
    pageIndex: newPageIndex,
  }));
};
useEffect(() => {
  // Example side effect: fetch new data based on the current page
  console.log(`Fetching data for page ${pagination.pageIndex + 1}`);
}, [pagination.pageIndex])

  const pageCount = table.getPageCount();

  return (
    <div>
      <div className="flex items-center py-4">
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="py-4">
    {pageCount > 1 && (
          <>
          <div className="flex justify-between pb-2">
          <div>
            <Button onClick={() => handlePageChange(pagination.pageIndex - 1)}className="mx-2">Previous</Button>
            </div>

            <span>{pagination.pageIndex + 1} / {pageCount}</span>

            <div>
            <Button onClick={() => handlePageChange(pagination.pageIndex + 1)}
            className="mx-2">Next</Button>
            </div>
            </div>

            <div className="flex justify-between mx-2">
            <Button onClick={() => handlePageChange(0)} disabled={pagination.pageIndex === 0}>
              First
            </Button>
            <Button onClick={() => handlePageChange(pageCount - 1)} disabled={pagination.pageIndex === pageCount - 1}>
              Last
            </Button>
            </div>
            
          </>
        )}
      </div>
    </div>
  )
}