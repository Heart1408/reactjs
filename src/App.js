import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, staffRoutes, staffLoginRoute } from "./routes";
import "./App.scss";

import { useSelector } from "react-redux";

function App() {
  const staff = useSelector((state) => state.staff.staffInfo);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}

        <Route
          path={staffLoginRoute.path}
          element={<staffLoginRoute.component />}
        />

        {staff !== null &&
          staffRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
      </Routes>
    </Router>
  );
}

export default App;
