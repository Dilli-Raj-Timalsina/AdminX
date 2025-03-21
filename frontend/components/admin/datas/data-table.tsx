"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationContent } from "@/components/ui/pagination";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,

    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="mx-10 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder={`Filter ${
              // @ts-ignore
              columns[1] ? columns[1].accessorKey : column[0].accessorKey
            }...`}
            value={
              (table
                .getColumn(
                  // @ts-ignore
                  columns[1] ? columns[1].accessorKey : column[0].accessorKey
                )
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(
                  // @ts-ignore
                  columns[1] ? columns[1].accessorKey : column[0].accessorKey
                )
                ?.setFilterValue(event.target.value)
            }
            className="max-w-md md:w-72 w-44"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
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
                  <TableCell key={cell.id} className="border">
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
      <div className="flex my-5 justify-between items-center">
        {/* Items Per Page Selection */}
        <div className="flex items-center space-x-2">
          <span className="whitespace-nowrap">limit : </span>
          <Select
            onValueChange={(value) => table.setPageSize(Number(value))}
            defaultValue={String(table.getState().pagination.pageSize)}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* pagination */}
        <Pagination className=" flex items-center mx-0">
          <PaginationContent className="flex justify-between space-x-4 items-center">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <PaginationItem className="flex justify-between items-center space-x-2">
              {Array.from({ length: table.getPageCount() }, (_, index) => (
                <Button
                  key={index}
                  variant={
                    table.getState().pagination.pageIndex === index
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </PaginationItem>
            {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
