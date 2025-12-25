"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/dataTable/data-table-column-header";

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
];
