//customer
import Home from "../pages/Customer/Home";

//staff
import Login from "../pages/Staff/Login";
import Admin from "../pages/Staff/Home";
import Table from "../pages/Staff/Table";
import Menu from "../pages/Staff/Menu";
import Chat from "../pages/Staff/Chat";
import StaffManagement from "../pages/Staff/StaffManagement";
import TableSchedule from "../pages/Staff/TableSchedule";
import Error from "../pages/Error";

const publicRoutes = [
  { path: "/", exact: true, component: Home },
];

const staffLoginRoute = { path: "/staff/login", component: Login };
const errorPage = { path: "/error", component: Error };

const staffRoutes = [
  { path: "/staff/home", component: Admin },
  { path: "/staff/order", component: Table },
  { path: "/staff/menu", component: Menu },
  { path: "/staff/chat", component: Chat },
  { path: "/staff/staffmanagement", component: StaffManagement },
  { path: "/staff/tableschedule", component: TableSchedule },
];

export { publicRoutes, staffRoutes, staffLoginRoute, errorPage };
