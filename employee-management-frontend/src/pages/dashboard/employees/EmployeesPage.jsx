import CreateEmployeeDialog from "@/components/shared/dashboard/employees/CreateEmployeeDialog";
import Header from "../../../components/shared/dashboard/Header";
import Layout from "../Layout";
import EmployeesList from "@/components/shared/dashboard/employees/EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEmployees } from "@/store/employeesSlice";
import { toast } from "sonner";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const {
    data: employees,
    loading,
    error,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees()).catch((error) =>
      toast.error("Error", { description: error })
    );
  }, [dispatch]);
  return (
    <Layout>
      <Header
        title="Employees Management"
        subtitle="Here is the list of all employees."
      >
        <CreateEmployeeDialog />
      </Header>
      {loading ? (
        <p className="text-center">Loading employees...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <EmployeesList employees={employees} />
      )}
    </Layout>
  );
};

export default EmployeesPage;
