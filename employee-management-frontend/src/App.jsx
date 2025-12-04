import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/Loginpage";
import { Toaster } from "sonner";
import OverviewPage from "./pages/dashboard/overview/OverviewPage";
import EmployeesPage from "./pages/dashboard/employees/EmployeesPage";
import EditDepartmentPage from "./pages/dashboard/overview/EditDepartmentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        {/* {private Route} */}
        <Route path="/overview" element={<OverviewPage />}></Route>
        <Route
          path="/edit-department/:id"
          element={<EditDepartmentPage />}
        ></Route>

        <Route path="/employees" element={<EmployeesPage />}></Route>
      </Routes>
      <Toaster richColors closeButton />
    </Router>
  );
}

export default App;
