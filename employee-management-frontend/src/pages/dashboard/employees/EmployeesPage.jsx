import CreateEmployeeDialog from "@/components/shared/dashboard/employees/CreateEmployeeDialog";
import Header from "../../../components/shared/dashboard/Header";
import Layout from "../Layout";
import EmployeesList from "@/components/shared/dashboard/employees/EmployeesList";

const EmployeesPage = () => {
  return (
    <Layout>
      <Header title="Employees" subtitle="Here is the list of all employees.">
        <CreateEmployeeDialog />
      </Header>
      <EmployeesList />
    </Layout>
  );
};

export default EmployeesPage;
