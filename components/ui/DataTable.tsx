"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  TableCell,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  gridLayout?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  gridLayout = false,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col">
      <div className={`rounded-md border ${gridLayout? "w-full h-screen" : ""}`}>
        <div className={`${gridLayout? "w-full h-full" : ""}`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <div key={header.id}>
                    {header.isPlaceholder? null 
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                );
              })}
            </div>
          ))}
          <div>
            {table.getRowModel().rows?.length? (
              table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-red-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
