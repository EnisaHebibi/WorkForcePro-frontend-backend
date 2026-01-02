"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/dataTable/data-table-column-header";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <>
        <DataTableColumnHeader column={column} title="Department Name" />
      </>
    ),
  },

  {
    accessorKey: "employee_count",
    header: () => <>Employees</>,
    cell: ({ row }) => {
      return <div>{row.getValue("employee_count")}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <>Actions</>,
    cell: ({ row }) => {
      const id = row.getValue("id");
      const name = row.getValue("name");

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to={`/edit-department/${id}`}>
              <Pencil />
            </Link>
          </Button>

          <DeleteButton
            departmentId={id}
            departmentName={name}
            onDelete={() => window.location.reload()}
          />
        </div>
      );
    },
  },
];
