import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Customer/Header";
import { Layout } from "antd";
const { Content } = Layout;

const Menu = () => {
  return (
    <>
      <Layout>
        <Header />
        <Content style={{ margin: "30px 0 30px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default Menu;
