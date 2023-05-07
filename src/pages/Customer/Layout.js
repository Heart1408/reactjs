import React, { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../services/api";
import { isExpired } from "../../utils/common";
import { Outlet } from "react-router-dom";
import Header from "../../components/Customer/Header";
import { Layout } from "antd";
const { Content } = Layout;

export const CustomerContext = createContext();

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showConfirmCustomerModal = () => {
    setIsModalOpen(true);
  };

  const hideConfirmCustomerModal = () => {
    setIsModalOpen(false);
  };

  const token = useSelector(
    (state) => state.AuthenticationSlice?.confirmCustomerToken
  );
  const [confirmCus, setConfirmCus] = useState(token !== "");

  if (!isExpired(token)) {
    getToken(token);
  }

  return (
    <>
      <CustomerContext.Provider
        value={{
          isModalOpen,
          confirmCus,
          onShowConfirmCustomerModel: showConfirmCustomerModal,
          onHideConfirmCustomerModel: hideConfirmCustomerModal,
        }}
      >
        <Layout>
          <Header />
          <Content style={{ margin: "100px 0 30px 0" }}>
            <Outlet />
          </Content>
        </Layout>
      </CustomerContext.Provider>
    </>
  );
};

export default Menu;
