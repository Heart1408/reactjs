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
          {[5, 4, 3, 2, 1].map((rate) => (
            <div key={rate}>
              <Rate value={rate} disabled />{" "}
              {statistic[`rate_${rate}`]}
            </div>
          ))}
          <p>Đã xem: {statistic.read}</p>
          <p>Chưa xem: {statistic.unread}</p>
        </div>
      </div>
    )
  );
}
