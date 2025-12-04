import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8095/api/departments/all"
        );
        const data = await response.json();

        setDepartments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) {
    return <h1>Fetching data....</h1>;
  }

  if (departments.length === 0) {
    return <h1 className="mt-3">No data found</h1>;
  }

  return (
    <div className="mt-10 ">
      <div className="flex justify-between">
        <h1 className="text-left">List of all departments:</h1>
        <div className="flex gap-2 mb-5">
          <Button
            variant={listView ? "default" : "outline"}
            onClick={() => setListView(true)}
          >
            List
          </Button>
          <Button
            variant={listView ? "outline" : "default"}
            onClick={() => setListView(false)}
          >
            Card
          </Button>
        </div>
      </div>
      {listView ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {departments.length > 0 &&
              departments?.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.employee_list.length || 0}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/edit-department/${department.id}`}>
                        <Pencil />
                      </Link>
                    </Button>

                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {departments.length > 0 &&
            departments?.map((department) => (
              <Card key={department.id}>
                <CardHeader>
                  <CardTitle>{department.name}</CardTitle>
                </CardHeader>

                <CardFooter className="justify-between">
                  <CardDescription>
                    Employees: {department.employee_list.length || 0}
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/edit-department/${department.id}`}>
                        <Pencil />
                      </Link>
                    </Button>

                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsList;
