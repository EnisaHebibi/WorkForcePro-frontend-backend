import Logo from "@/assets/img/DarkWorkForceProLogo.svg";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navLinks = [
    { path: "/overview", label: "Overview" },
    { path: "/employees", label: "Employees" },
    { path: "/tasks", label: "Tasks" },
  ];
  return (
    <nav className="flex justify-between items-center py-4 px-5 container mx-auto ">
      <ul className=" flex items-center gap-10">
        <li>
          <Link to="/overview">
            <img src={Logo} alt="Logo" />
          </Link>
        </li>
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-slate-900 font-medium"
                  : "text-muted-foreground font-normal"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
