import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../redux/login/slice";
import selectAuthentication from "../../../redux/login/selector";
import { getToken } from "../../../services/api";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faTable,
  faBowlFood,
  faMapLocation,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";

const { Sider } = Layout;

function Sidebar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthentication.getAuthenticationToken);
  const [isLogin, setIsLogin] = useState(token !== "");
  const { collapsed } = props;

  function handleLogoutRequest(e) {
    e.preventDefault();
    dispatch(handleLogout({}));
    setIsLogin(false);
    getToken("");
    navigate("/staff/login");
  }

  let hiddenClass = collapsed ? "hidden" : "";

  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink to="/staff/home" className="list-group-item">
          <i className="fa fa-home fa-2x"></i>
          <span className={`nav-text ${hiddenClass}`}>Tổng quan</span>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink className="list-group-item">
          <FontAwesomeIcon icon={faTable} size="lg" />
          <span className={`nav-text ${hiddenClass}`}> Đặt bàn</span>
        </NavLink>
      ),
      children: [
        {
          key: "21",
          label: (
            <NavLink to="/staff/order" className="list-group-item">
              <span className={`nav-text ${hiddenClass}`}>Chi tiết</span>
            </NavLink>
          ),
        },
        {
          key: "22",
          label: (
            <NavLink to="/staff/tableschedule" className="list-group-item">
              <span className={`nav-text ${hiddenClass}`}> Lịch đặt bàn</span>
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "3",
      label: (
        <NavLink to="/staff/staffmanagement" className="list-group-item">
          <FontAwesomeIcon icon={faUserTie} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Nhân viên</span>
        </NavLink>
      ),
    },
    {
      key: "4",
      label: (
        <NavLink className="list-group-item">
          <FontAwesomeIcon icon={faBowlFood} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Thực đơn</span>
        </NavLink>
      ),
      children: [
        {
          key: "41",
          label: (
            <NavLink to="/staff/menu" className="list-group-item">
              <span className={`nav-text ${hiddenClass}`}>Danh sách</span>
            </NavLink>
          ),
        },
        {
          key: "42",
          label: (
            <NavLink to="/staff/menu" className="list-group-item">
              <span className={`nav-text ${hiddenClass}`}>
                {" "}
                Thực đơn theo ngày
              </span>
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "5",
      label: (
        <NavLink to="/staff/chat" className="list-group-item">
          <FontAwesomeIcon icon={faComment} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Chat</span>
        </NavLink>
      ),
    },
    {
      key: "6",
      label: (
        <NavLink to="#" className="list-group-item">
          <FontAwesomeIcon icon={faMapLocation} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Map</span>
        </NavLink>
      ),
    },
    {
      key: "7",
      label: (
        <NavLink className="list-group-item" onClick={handleLogoutRequest}>
          <i className="fa fa-power-off fa-2x"></i>
          <span className={`nav-text ${hiddenClass}`}>Logout</span>
        </NavLink>
      ),
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      ></Menu>
    </Sider>
  );
}

export default Sidebar;
