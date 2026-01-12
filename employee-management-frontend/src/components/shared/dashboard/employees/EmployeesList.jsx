import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useDispatch } from "react-redux";

const EmployeesList = ({ employees }) => {
  const dispatch = useDispatch();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>#Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Departments</TableHead>
        </TableRow>
      </TableHeader>

      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>Enisa</TableCell>
        <TableCell>enisa@gmail.com</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell>Web Devs</TableCell>
      </TableRow>
    </Table>
  );
};

export default EmployeesList;
