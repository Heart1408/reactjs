import React from "react";
import { FEEDBACK_STATUS, RATE } from "../../../constants";
import { Row, Col, Button, Space, Select } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import ListFeedback from "./ListFeedback";
import Statistic from "./Statistic";

function Feedback() {
  const formatDBDate = "yyyy-MM-dd";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const date = [
    {
      value: "all",
      label: "Tất cả",
    },
    {
      value: format(today, formatDBDate),
      label: "Hôm nay " + format(today, "dd-MM"),
    },
    {
      value: format(yesterday, formatDBDate),
      label: "Hôm qua " + format(yesterday, "dd-MM"),
    },
    {
      value: format(today, "MM"),
      label: "Tháng này",
    },
  ];

  return (
    <div className="feedback">
      <p className="title">Phản hồi của khách hàng</p>
      <Row className="form-search">
        <Space>
          <Select
            defaultValue={format(today, formatDBDate)}
            style={{
              width: 160,
            }}
            options={date}
          />
          <Select
            defaultValue="--Trạng thái xem--"
            style={{
              width: 160,
            }}
            options={[
              {
                value: FEEDBACK_STATUS.READ,
                label: "Đã xem",
              },
              {
                value: FEEDBACK_STATUS.UNREAD,
                label: "Chưa xem",
              },
            ]}
          />
          <Select
            defaultValue="--Lượt đánh giá--"
            style={{
              width: 160,
            }}
            options={[
              {
                value: RATE.FIVESTAR,
                label: "5 sao",
              },
              {
                value: RATE.FOURSTAR,
                label: "4 sao",
              },
              {
                value: RATE.THREESTAR,
                label: "3 sao",
              },
              {
                value: RATE.TWOSTAR,
                label: "2 sao",
              },
              {
                value: RATE.ONESTAR,
                label: "1 sao",
              },
            ]}
          />
          <Button type="primary" icon={<UndoOutlined />}></Button>
        </Space>
      </Row>
      <Row>
        <Col flex="2">
          <ListFeedback />
        </Col>
        <Col flex="1">
          <Statistic />
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
