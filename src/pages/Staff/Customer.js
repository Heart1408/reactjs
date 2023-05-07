import React from "react";
import { Avatar, Row, Col, Space, Input, Button, List } from "antd";
import { UndoOutlined, UserOutlined, TagFilled } from "@ant-design/icons";

export default function Customer() {
  const data = [
    {
      name: "Ant",
      phone: "0378933888",
      backgound: "#cdcecf",
    },
    {
      name: "Ant Design ",
      phone: "0355933222",
    },
    {
      name: "Tâm Vũ",
      phone: "031133999",
    },
    {
      name: "Ant Design Title 4",
      phone: "035933999",
    },
  ];

  const data2 = [
    {
      date: "20/04/2023",
      totalPrice: "500.000đ",
    },
    {
      date: "18/04/2023",
      totalPrice: "1.000.000đ",
    },
    {
      date: "17/04/2023",
      totalPrice: "820.000đ",
    },
    {
      date: "15/04/2023",
      totalPrice: "200.000đ",
    },
  ];

  return (
    <div className="customer">
      <p className="title">Thông tin khách hàng</p>
      <Row>
        <Col flex="1">
          <Space className="form-search">
            <Input placeholder="Nhập ..."></Input>
            <Button type="primary" icon={<UndoOutlined />}></Button>
          </Space>
          <div className="list-customer">
            <List
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
                align: "center",
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ background: item.backgound }}>
                  <Row className="item">
                    <Col flex="2">
                      <Space>
                        <Avatar icon={<UserOutlined />} /> <p>{item.name}</p>
                      </Space>
                    </Col>
                    <Col flex="1">{item.phone}</Col>
                    <Col flex="3">
                      <div className="status">
                        Lịch hẹn hôm nay:<p>Không có</p>
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col flex="1" className="booking-detail">
          <p className="title">Thông tin đặt bàn</p>
          <div className="statistic">
            <p className="customer-name">Khách hàng: Ant</p>
            <p>Số lần đặt lịch: 4</p>
            <p className="success">
              <TagFilled />
              Thành công: 4
            </p>
            <p className="cancel">
              <TagFilled />
              Đã hủy: 0
            </p>
          </div>
          <List
            className="details"
            itemLayout="horizontal"
            dataSource={data2}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Row className="item">
                  <Col flex="3">Ngày {item.date}</Col>
                  <Col flex="3">Tổng hóa đơn: {item.totalPrice}</Col>
                  <Col flex="2" className="status">
                    <p style={{ background: "green" }}>Thành công</p>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
