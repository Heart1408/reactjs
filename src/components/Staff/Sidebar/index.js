import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cookies from "react-cookies";
import { processLogout } from "../../../store/actions";
import { handleLogout } from "../../../services/staffService";

import "./Sidebar.scss";

function Sidebar() {
  const staff = useSelector((state) => state.staff.staffInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(staff);

  const logout = async (e) => {
    try {
      console.log(cookies.load("token"));

      const data = await handleLogout({
        Authorization: `Bearer ${cookies.load("token")}`,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
    cookies.remove("token");
    cookies.remove("staff");
    dispatch(processLogout());
    navigate("/staff/login", { replace: true });
  };

  return (
    <nav className="main-menu">
      <div style={{ color: "white" }}>{staff.username}</div>
      <ul>
        <li>
          <NavLink to="/staff/home" className="list-group-item">
            <i className="fa fa-home fa-2x"></i>
            <span className="nav-text">Quản trị</span>
          </NavLink>
        </li>
        <li className="has-subnav">
          <NavLink to="/staff/menu" className="list-group-item">
            <i className="fa fa-comments fa-2x"></i>
            <span className="nav-text">AAa</span>
          </NavLink>
        </li>
        <li className="has-subnav">
          <NavLink to="/staff/menu" className="list-group-item">
            <i className="fa fa-book fa-2x"></i>
            <span className="nav-text">AAA</span>
          </NavLink>
        </li>
        <li className="has-subnav">
          <NavLink to="/staff/chainstore" className="list-group-item">
            <i className="fa fa-map-marker fa-2x"></i>
            <span className="nav-text">Map</span>
          </NavLink>
        </li>
      </ul>
      <ul className="logout">
        <li>
          <NavLink onClick={logout} className="list-group-item">
            <i className="fa fa-power-off fa-2x"></i>
            <span className="nav-text">Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
