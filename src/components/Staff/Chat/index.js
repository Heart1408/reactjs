import React from "react";
import { Row, Col } from "antd";
import ListChat from "./ListChat";
import ChatWindow from "./ChatWindow";
import "./style.scss";

function Chat() {
  return (
    <Row>
      <Col span={6}>
        <ListChat />
      </Col>
      <Col span={18}>
        <ChatWindow />
      </Col>
    </Row>
  );
}

export default Chat;
