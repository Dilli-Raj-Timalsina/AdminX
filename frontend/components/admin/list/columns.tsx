"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IEntity } from "@/types/entity";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export function generateColumns(entity: IEntity): ColumnDef<any>[] {
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Add columns based on entity fields
  entity.fields.forEach((field) => {
    if (!field.inputOptions.hidden) {
      columns.push({
        accessorKey: field.key,
        header: field.inputOptions.label,
        cell: ({ row }) => {
          const value = row.getValue(field.key);

          // Handle different field types
          if (field.inputOptions.type === "checkbox") {
            return value ? "Yes" : "No";
          }

          if (field.inputOptions.type === "select") {
            const option = field.inputOptions.selectOptions?.find(
              (opt) => opt.value === value
            );
            return option?.label || value;
          }

          return value;
        },
      });
    }
  });

  // Add actions column
  columns.push({
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.getValue("id"))}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/admin/${entity.key}/${row.getValue(
                  "id"
                )}/update`)
              }
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  return columns;
}
