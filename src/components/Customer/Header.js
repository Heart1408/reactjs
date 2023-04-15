import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/CustomerAuthProvider";
import { auth } from "../../firebase/config";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faBowlFood,
  faUtensils,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Avatar, Space, Typography, Dropdown } from "antd";
import "./header.scss";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const {
    user: { displayName, photoURL },
    setIsOpenLoginModal,
    isLogin,
  } = useContext(AuthContext);
  const handleOpenModelLogin = () => {
    setIsOpenLoginModal(true);
  };

  const onClick = () => {
    auth.signOut();
  };

  const items = [
    {
      label: "Đăng xuất",
      key: "1",
    },
  ];

  return (
    <div className="header">
      <Row align="middle" className="brand">
        <h1>Brand</h1>
      </Row>
      <span className="menu-icon" onClick={() => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faBars} />
      </span>
      <div className={`navbar ${isActive ? "navactive" : ""}`} id="nav">
        <ul>
          <li>
            <FontAwesomeIcon className="head-icon" icon={faHome} />
            <NavLink to="#" className="list-group-item">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <FontAwesomeIcon className="head-icon" icon={faBowlFood} />
            <NavLink to="#" className="list-group-item">
              Thực đơn
            </NavLink>
          </li>
          <li>
            <FontAwesomeIcon className="head-icon" icon={faUtensils} />
            <NavLink to="#" className="list-group-item">
              Đặt bàn
            </NavLink>
          </li>
          {isLogin ? (
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src={photoURL}
                    style={{ background: "white", color: "black" }}
                  >
                    {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Typography.Text style={{ color: "white" }}>
                    {!displayName ? "" : displayName}
                  </Typography.Text>
                  <FontAwesomeIcon icon={faChevronDown} />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <li onClick={handleOpenModelLogin}>
              <FontAwesomeIcon className="head-icon" icon={faUser} />
              <NavLink to="#" className="list-group-item">
                Đăng ký
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
