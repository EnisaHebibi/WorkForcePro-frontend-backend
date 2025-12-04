import Header from "../../../components/shared/dashboard/Header";
import CreateDepartmentDialog from "../../../components/shared/dashboard/overview/department/CreateDepartmentDialog";
import Stats from "../../../components/shared/dashboard/overview/stats/Stats";
import Layout from "../Layout";

const OverviewPage = () => {
  return (
    <Layout>
      <Header
        title="Dashboard"
        subtitle="Here you can manage all the departments, users, tasks."
      >
        <CreateDepartmentDialog></CreateDepartmentDialog>
      </Header>

      <Stats />

      {/* {DEPARTMENTS LIST} */}
    </Layout>
  );
};

export default OverviewPage;
