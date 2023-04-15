import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  publicRoutes,
  staffRoutes,
  staffLoginRoute,
  errorPage,
} from "./routes";
import Layout from "./pages/Staff/Layout";
import "./App.scss";

import { useSelector } from "react-redux";
import CustomerAuthProvider from "./Context/CustomerAuthProvider";
import ChatProvider from "./Context/ChatProvider";

function App() {
  const staff = useSelector((state) => state?.staff?.staffInfo);

  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <CustomerAuthProvider>
                    <ChatProvider>
                      <Page />{" "}
                    </ChatProvider>
                  </CustomerAuthProvider>
                }
              />
            );
          })}

          <Route
            path={staffLoginRoute.path}
            element={<staffLoginRoute.component />}
          />

          {console.log("check", staff !== undefined)}

          {/* {staff !== null && staff !== undefined && ( */}
            <Route path="staff" element={<Layout />}>
              {staffRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                );
              })}
            </Route>
          {/* ) */}
          {/* } */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
