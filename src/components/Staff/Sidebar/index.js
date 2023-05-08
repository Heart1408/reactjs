import React, { useState, useContext } from "react";
import { FeedbackContext } from "../../../Context/FeedbackProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../redux/login/slice";
import selectAuthentication, {
  selectedCurrentUser,
} from "../../../redux/login/selector";
import { getToken } from "../../../services/api";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faTable,
  faBowlFood,
  faMapLocation,
  faComment,
  faChartLine,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const { Sider } = Layout;

function Sidebar(props) {
  const { unreadFeedbackCount } = useContext(FeedbackContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthentication.getAuthenticationToken);
  const currentStaff = useSelector(selectedCurrentUser);

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
          <FontAwesomeIcon icon={faChartLine} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Tổng quan</span>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink to="/staff/tableschedule" className="list-group-item">
          <FontAwesomeIcon icon={faTable} size="lg" />
          <span className={`nav-text ${hiddenClass}`}> Đặt bàn</span>
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to="/staff/menu" className="list-group-item">
          <FontAwesomeIcon icon={faBowlFood} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Thực đơn</span>
        </NavLink>
      ),
    },
    {
      key: "4",
      label: (
        <NavLink to="/staff/feedback" className="list-group-item">
          <FontAwesomeIcon icon={faComment} size="lg" />
          {unreadFeedbackCount !== 0 && (
            <span className="new-feedback">{unreadFeedbackCount}</span>
          )}
          <span className={`nav-text ${hiddenClass}`}>Phản hồi</span>
        </NavLink>
      ),
    },
    {
      key: "5",
      label: (
        <NavLink to="/staff/customermanagement" className="list-group-item">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Khách hàng</span>
        </NavLink>
      ),
    },
    currentStaff.role === "admin" && {
      key: "6",
      label: (
        <NavLink to="/staff/staffmanagement" className="list-group-item">
          <FontAwesomeIcon icon={faUserTie} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Nhân viên</span>
        </NavLink>
      ),
    },
    // {
    //   key: "7",
    //   label: (
    //     <NavLink to="#" className="list-group-item">
    //       <FontAwesomeIcon icon={faMapLocation} size="lg" />
    //       <span className={`nav-text ${hiddenClass}`}>Map</span>
    //     </NavLink>
    //   ),
    // },
    {
      key: "8",
      label: (
        <NavLink className="list-group-item" onClick={handleLogoutRequest}>
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
          <span className={`nav-text ${hiddenClass}`}>Logout</span>
        </NavLink>
      ),
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
      <div className="avatar">
        <Avatar icon={<UserOutlined />}></Avatar>
        <p>{currentStaff.username}</p>
      </div>
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
