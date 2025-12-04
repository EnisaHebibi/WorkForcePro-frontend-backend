import React from "react";
import Layout from "../Layout";
import Header from "@/components/shared/dashboard/Header";
import CreateTaskDialog from "@/components/shared/dashboard/tasks/CreateTaskDialog";

const TaskPage = () => {
  return (
    <Layout>
      <Header title="Task Manager" subtitle="Here's list of your tasks!">
        <CreateTaskDialog />
      </Header>
    </Layout>
  );
};

export default TaskPage;
