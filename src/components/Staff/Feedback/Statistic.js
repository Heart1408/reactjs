import React from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { Rate, Divider } from "antd";

export default function Statistic(props) {
  const statistic = props.statistic;

  return (
    statistic.total !== 0 && (
      <div className="statistic">
        <p className="title">
          <UsergroupAddOutlined />
          Thống kê lượt phản hồi
        </p>
        <div className="total-rate">
          <p> Tổng lượt đánh giá: {statistic.total}</p>
          <div>
            <Rate allowHalf value={statistic.average} />
            <p>{statistic.average}</p>
          </div>
        </div>
        <div className="rate">
          <Divider orientation="center"> Số lượt đánh giá:</Divider>
          <div>
            <Rate value={5} disabled /> {statistic.rate_5}
          </div>
          <div>
            <Rate value={4} disabled /> {statistic.rate_4}
          </div>
          <div>
            <Rate value={3} disabled /> {statistic.rate_3}
          </div>
          <div>
            <Rate value={2} disabled /> {statistic.rate_2}
          </div>
          <div>
            <Rate value={1} disabled /> {statistic.rate_1}
          </div>
          <p>Đã xem: {statistic.read}</p>
          <p>Chưa xem: {statistic.unread}</p>
        </div>
      </div>
    )
  );
}
