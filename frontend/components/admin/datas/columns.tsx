"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { IEntity } from "@/types/entity";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { deleteEntity } from "@/server/entity/delete-entity";
import { EditDialog } from "@/components/edit-dialog";
export function generateColumns(entity: IEntity): ColumnDef<any>[] {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleConfirmDelete = async (id: string) => {
    const res = await deleteEntity(id, entity.dbConfig.tableName);
    if (res.error) {
      toast.error(res.error, {
        position: "bottom-right",
        duration: 5000,
      });
      return;
    }
    toast.success("Record deleted successfully", {
      position: "bottom-right",
      duration: 3000,
      className: "text-blue-500",
    });
  };

  const columns: ColumnDef<any>[] = [];

  entity?.fields?.map((field) => {
    columns.push({
      accessorKey: field.dbConfig.columnName,
      header: ({ column }) => {
        return (
          <div
            className="text-left text-base font-medium text-gray-800 hover:text-gray-500 flex flex-row items-center justify-start "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="whitespace-nowrap">
              {field.inputOptions.label}
            </span>
            <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer hover:text-blue-700" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-left">
            {typeof row.original[field.dbConfig.columnName] == "boolean"
              ? row.original[field.dbConfig.columnName]
                ? "true"
                : "false"
              : row.original[field.dbConfig.columnName]}
          </div>
        );
      },
    });
  });

  columns.push({
    accessorKey: "actions",
    header: ({ column }) => {
      return (
        <div className="text-left text-base font-medium text-gray-800 hover:text-gray-500 flex items-center justify-start ">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex flex-row gap-2">
          <EditDialog entity={entity} initialData={item} />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </Button>
          <DeleteConfirmationDialog
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={() => handleConfirmDelete(row.original.id)}
            title={`Delete ${item.name || "this item"}?`}
            description="This action cannot be undone. The item will be permanently deleted from the database."
          />
        </div>
      );
    },
  });

  return columns;
}
