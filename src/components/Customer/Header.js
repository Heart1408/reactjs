import React, { useContext } from "react";
import { CustomerContext } from "../../pages/Customer/Layout";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBurger } from "@fortawesome/free-solid-svg-icons";

export default function Heade() {
  const { onShowConfirmCustomerModel, confirmCus } =
    useContext(CustomerContext);

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
          <NavLink
            to={confirmCus && "/customer/booking"}
            className=""
            onClick={!confirmCus && onShowConfirmCustomerModel}
            style={{ background: !confirmCus && "grey" }}
          >
            <FontAwesomeIcon icon={faUtensils} size="lg" />
            <span className="">Gọi món</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
