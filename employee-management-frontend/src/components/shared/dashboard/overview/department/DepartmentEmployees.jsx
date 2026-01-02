import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DepartmentEmployees = () => {
  const { id: selectedDepartmentId } = useParams();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [employeesRes, departmentsRes] = await Promise.all([
          fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/employees/department/${selectedDepartmentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          fetch(`${import.meta.env.VITE_API_URL}/api/departments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (!departmentsRes.ok) {
          throw new Error("Failed to fetch departments!");
        }

        const employeesData =
          employeesRes.ok && employeesRes.status !== 404
            ? await employeesRes.json()
            : [];

        const departmentsData = await departmentsRes.json();
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
      } catch (error) {
        toast.error("Error", { description: error.message });
        setEmployees([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDepartmentId]);

  const handleDepartmentChange = async (userId, newDepartmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees/update-department`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_id: userId,
            department_id: newDepartmentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      toast.success("Success", {
        description: "Employee's department updated successfully.",
      });

      setEmployees((prev) => prev.filter((emp) => emp.user_id !== userId));
    } catch (error) {
      toast, error("Error", { description: error.message });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees in Department</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(employees) && employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow key={employee.user_id}>
                    <TableCell>{employee.user_id}</TableCell>
                    <TableCell>{employee.user_name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={String(selectedDepartmentId)}
                        onValueChange={(value) =>
                          handleDepartmentChange(employee.user_id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(departments) &&
                            departments.length > 0 &&
                            departments.map((dept) => (
                              <SelectItem key={dept.id} value={String(dept.id)}>
                                {dept.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">
                    No employees found!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentEmployees;
