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
import { LayoutDashboard, List, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "@/store/departmentsSlice";
import DeleteButton from "./DeleteButton";
import { DataTable } from "@/components/shared/dataTable/data-table";
import { columns } from "./columns";

const DepartmentsList = () => {
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.departments
  );
  const [listView, setListView] = useState(true);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleDepartmentDelete = () => {
    dispatch(fetchDepartments());
  };
  if (loading) {
    return <h1>Fetching data....</h1>;
  }

  if (departments.error) {
    return <h1 className="text-red-500">Error: {error}</h1>;
  }

  if (departments.length === 0) {
    return <h1 className="mt-3">No data found</h1>;
  }

  return (
    <div className="w-full mt-8 ">
      {/*Switch*/}
      <div className="w-fit ml-auto mb-8 gap-2 flex">
        <Button
          variant={listView ? "default" : "outline"}
          onClick={() => setListView(true)}
        >
          <List />
        </Button>
        <Button
          variant={listView ? "outline" : "default"}
          onClick={() => setListView(false)}
        >
          <LayoutDashboard />
        </Button>
      </div>

      {listView ? (
        <DataTable columns={columns} data={departments} />
      ) : (
        // <Table>
        //   <TableHeader>
        //     <TableRow>
        //       <TableHead>Name</TableHead>
        //       <TableHead>Employees</TableHead>
        //       <TableHead className="text-right">Actions</TableHead>
        //     </TableRow>
        //   </TableHeader>

        //   <TableBody>
        //     {departments.length > 0 &&
        //       departments?.map((department) => (
        //         <TableRow key={department.id}>
        //           <TableCell>{department.name}</TableCell>

        //           <TableCell>{department?.employee_count || 0}</TableCell>
        //           <TableCell className="flex gap-2 justify-end">
        //             <Button variant="outline" size="icon" asChild>
        //               <Link to={`/edit-department/${department.id}`}>
        //                 <Pencil />
        //               </Link>
        //             </Button>

        //             <Button variant="destructive">
        //               <DeleteButton
        //                 departmentId={department.id}
        //                 departmentName={department.name}
        //                 onDelete={handleDepartmentDelete}
        //               />
        //             </Button>
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //   </TableBody>
        // </Table>
        <div className="grid grid-cols-3 gap-4">
          {departments.length > 0 &&
            departments?.map((department) => (
              <Card key={department.id}>
                <CardHeader>
                  <CardTitle>{department.name}</CardTitle>
                </CardHeader>

                <CardFooter className="justify-between">
                  <CardDescription>
                    Employees: {department?.employee_count || 0}
                  </CardDescription>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/edit-department/${department.id}`}>
                        <Pencil />
                      </Link>
                    </Button>

                    <Button variant="destructive">
                      <DeleteButton
                        departmentId={department.id}
                        departmentName={department.name}
                        onDelete={handleDepartmentDelete}
                      />
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
