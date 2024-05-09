"use client"

import { useState } from "react"
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
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
    manualPagination: true, // Enable manual pagination
  });

  // Pagination controls
  const pageCount = table.getPageCount();
  const nextPage = () => table.nextPage();
  const previousPage = () => table.previousPage();
  const setPageIndex = (pageIndex: number) => table.setPageIndex(pageIndex);
  const setPageSize = (pageSize: number) => table.setPageSize(pageSize);

  return (
    <div>
     <select onChange={(e) => setPageSize(Number(e.target.value))} className="bg-transparent font-bold text-lg mb-2 p-1 rounded-xl border">
      {[10, 20, 30].map((size) => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center py-4 justify-between">
        <Button 
        onClick={() => setPageIndex(0)}
        disabled={pagination.pageIndex === 0}>First</Button>
        <Button 
        onClick={previousPage}>Previous</Button>
        
        <span>{pagination.pageIndex + 1} / {pageCount}</span>

        <Button 
        onClick={nextPage}>Next</Button>
        <Button 
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={pagination.pageIndex === pageCount - 1}>Last</Button>
      </div>
    </div>
  )
}
