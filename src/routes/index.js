//customer
import Home from "../pages/Customer/Home";
import Booking from "../pages/Customer/Booking";
import Address from "../pages/Customer/Address";

//staff
import Login from "../pages/Staff/Login";
import Admin from "../pages/Staff/Home";
import Menu from "../pages/Staff/Menu";
import ChainStore from "../pages/Staff/ChainStore";

const publicRoutes = [
  { path: "/", exact: true, component: Home },
  { path: "/booking", component: Booking },
  { path: "/address", component: Address },
];

const staffLoginRoute = { path: "/staff/login", component: Login };

const staffRoutes = [
  { path: "/staff/home", component: Admin },
  { path: "/staff/menu", component: Menu },
  { path: "/staff/chainstore", component: ChainStore },
];

export { publicRoutes, staffRoutes, staffLoginRoute };
