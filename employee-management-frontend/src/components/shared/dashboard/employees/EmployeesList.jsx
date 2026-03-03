import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchDepartments } from "@/store/departmentsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditEmployeeStatus from "./EditEmployeeStatus";

const EmployeesList = ({ employees }) => {
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.departments,
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const [updatedEmployees, setUpdatedEmployees] = useState([]);

  useEffect(() => {
    setUpdatedEmployees(employees);
  }, [employees]);

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

      <TableBody>
        {updatedEmployees.length < 0 ? (
          <TableCell colSpan="5">No Employees found</TableCell>
        ) : (
          updatedEmployees.map((employees, index) => (
            <TableRow key={index}>
              <TableCell>{employees.user_id}</TableCell>
              <TableCell>{employees.user_name}</TableCell>
              <TableCell>{employees.email}</TableCell>
              <TableCell>
                <EditEmployeeStatus
                  userId={employees.user_id}
                  currentStatus={employees.status}
                />
              </TableCell>
              <TableCell>{employees.department_name}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeesList;
