import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import {} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBurger } from "@fortawesome/free-solid-svg-icons";

export default function Heade() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <Logo />
        </div>
        <div className="menu">
          <NavLink to="/customer/menu">
            <FontAwesomeIcon icon={faBurger} size="lg" />
            <span className="">Thực đơn</span>
          </NavLink>
          <NavLink to="/customer/booking" className="">
            <FontAwesomeIcon icon={faUtensils} size="lg" />
            <span className="">Gọi món</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
