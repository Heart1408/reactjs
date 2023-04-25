import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Staff/Sidebar";
import selectAuthentication from "../../redux/login/selector";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../services/api";
import { isExpired } from "../../utils/common";
import { handleLogout } from "../../redux/login/slice";
import Logo from "../../components/Logo";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme, Row, Col } from "antd";

const { Header, Content } = Layout;

function Layouts() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.AuthenticationSlice?.authenticationToken
  );
  const [isLogin, setIsLogin] = useState(token !== "");

  if (isExpired(token)) {
    dispatch(handleLogout({}));
    getToken("");
  } else {
    getToken(token);
  }

  return (
    isLogin && (
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row>
              <Col md={17}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Col>
              <Col md={7}>
                <div>
                  <Logo />
                </div>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    )
  );
}

export default Layouts;
