import React from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { Rate, Divider } from "antd";

export default function Statistic() {
  return (
    <div className="statistic">
      <p className="title">
        <UsergroupAddOutlined />
        Thống kê lượt phản hồi
      </p>
      <div className="total-rate">
        <p> Tổng lượt đánh giá: 3</p>
        <div>
          <Rate allowHalf value={4.7} />
          <p>(4.7)</p>
        </div>
      </div>
      <div className="rate">
        <Divider orientation="center"> Số lượt đánh giá:</Divider>
        <div>
          <Rate value={5} /> 2
        </div>
        <div>
          <Rate value={4} /> 1
        </div>
        <div>
          <Rate value={3} /> 0
        </div>
        <div>
          <Rate value={2} /> 0
        </div>
        <div>
          <Rate value={1} /> 0
        </div>
        <p>Đã đọc: 1</p>
        <p>Chưa đọc: 2</p>
      </div>
    </div>
  );
}
