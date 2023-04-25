//customer
import CusMenu from "../pages/Customer/Menu";
import Booking from "../pages/Customer/Booking";

//staff
import Login from "../pages/Staff/Login";
import Admin from "../pages/Staff/Home";
import Menu from "../pages/Staff/Menu";
import Feedback from "../pages/Staff/Feedback";
import StaffManagement from "../pages/Staff/StaffManagement";
import TableSchedule from "../pages/Staff/TableSchedule";
import Customer from "../pages/Staff/Customer";
import Error from "../pages/Error";

const customerRoutes = [
  { path: "/customer/menu", exact: true, component: CusMenu },
  { path: "/customer/booking", exact: true, component: Booking },
];

const staffLoginRoute = { path: "/staff/login", component: Login };
const errorPage = { path: "/error", component: Error };

const staffRoutes = [
  { path: "/staff/home", component: Admin },
  { path: "/staff/menu", component: Menu },
  { path: "/staff/feedback", component: Feedback },
  { path: "/staff/staffmanagement", component: StaffManagement },
  { path: "/staff/tableschedule", component: TableSchedule },
  { path: "/staff/customermanagement", component: Customer },
];

export { customerRoutes, staffRoutes, staffLoginRoute, errorPage };
