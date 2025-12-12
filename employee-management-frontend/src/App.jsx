import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/Loginpage";
import { Toaster } from "sonner";
import OverviewPage from "./pages/dashboard/overview/OverviewPage";
import EmployeesPage from "./pages/dashboard/employees/EmployeesPage";
import EditDepartmentPage from "./pages/dashboard/overview/EditDepartmentPage";
import TaskPage from "./pages/dashboard/tasks/TaskPage";
import PrivateRoute from "./lib/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        <Route
          path="/overview"
          element={
            <PrivateRoute>
              <OverviewPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/edit-department/:id"
          element={<EditDepartmentPage />}
        ></Route>

        <Route path="/employees" element={<EmployeesPage />}></Route>

        <Route path="/tasks" element={<TaskPage />}></Route>
      </Routes>
      <Toaster richColors closeButton />
    </Router>
  );
}

export default App;
