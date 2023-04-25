import React, { useContext } from "react";
import { Input, Avatar, Typography, Space, Button, Row, Col, Rate } from "antd";
// import { ChatContext } from "../../../Context/ChatProvider";
import { UserOutlined } from "@ant-design/icons";

function ListChat() {
  // const { rooms, setSelectedRoomId } = useContext(ChatContext);
  // console.log("rooms");

  return (
    <Space direction="vertical" className="list-feedback">
      <div className="item">
        <Row className="overview">
          <Col flex="1">
            <Typography.Link className="userlink">
              <Avatar icon={<UserOutlined />} />
              <Typography.Text>kkk</Typography.Text>
            </Typography.Link>
          </Col>
          <Col flex="1" className="rate">
            <p>Đánh giá: </p> <Rate value={5} />
          </Col>
          <Col flex="1" className="status">
            <Button style={{ background: "green", color: "white" }}>
              Chưa xem
            </Button>
          </Col>
        </Row>
        <div className="content">Chất lượng dịch vụ tốt</div>
      </div>
      <div className="item">
        <Row className="overview">
          <Col flex="1">
            <Typography.Link className="userlink">
              <Avatar src="" />
              <Typography.Text>kkk</Typography.Text>
            </Typography.Link>
          </Col>
          <Col flex="1" className="rate">
            <p>Đánh giá: </p> <Rate value={5} />
          </Col>
          <Col flex="1" className="status">
            <Button style={{ background: "green", color: "white" }}>
              Chưa xem
            </Button>
          </Col>
        </Row>
        <div className="content">Nhân viên phục vụ nhiệt tình</div>
      </div>
      <div className="item">
        <Row className="overview">
          <Col flex="1">
            <Typography.Link className="userlink">
              <Avatar src="" />
              <Typography.Text>kkk</Typography.Text>
            </Typography.Link>
          </Col>
          <Col flex="1" className="rate">
            <p>Đánh giá: </p> <Rate value={4} />
          </Col>
          <Col flex="1" className="status">
            <Button style={{ background: "grey", color: "white" }}>
              Đã xem
            </Button>
          </Col>
        </Row>
        <div className="content">Đồ ăn tạm ngon</div>
      </div>
    </Space>
  );
}

export default ListChat;
