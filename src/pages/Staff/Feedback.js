import React, { useState, useEffect, useContext } from "react";
import { FeedbackContext } from "../../Context/FeedbackProvider";
import { useGetFeedbackList } from "../../hooks/feedback";
import { FEEDBACK_STATUS, RATE } from "../../constants";
import { Row, Col, Button, Space, Select, Rate } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import FeedbackList from "../../components/Staff/Feedback/FeedbackList"
import Statistic from "../../components/Staff/Feedback/Statistic";

function Feedback() {
  const { setUnreadFeedbackCount } = useContext(FeedbackContext);

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [dayOption, setDayOption] = useState([]);
  const [statistic, setStatistic] = useState({
    total: null,
    average: null,
    star_5: null,
    star_4: null,
    star_3: null,
    star_2: null,
    star_1: null,
    read: null,
  });

  useEffect(() => {
    setSelectedMonth(today.getMonth() + 1);
  }, [today]);

  useEffect(() => {
    const daysInMonth = new Date(
      today.getFullYear(),
      selectedMonth,
      0
    ).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    setDayOption(days);
  }, [selectedMonth, today]);

  const [queryParams, setQueryParams] = useState({
    month: null,
    day: null,
    rate: null,
    status: null,
  });

  const {
    data: dataFeedbackResponse,
    isSuccess,
    refetch,
  } = useGetFeedbackList(queryParams);

  const feedbackList = dataFeedbackResponse?.data;

  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      label: `tháng ${i}`,
    });
  }

  const handleChangeMonth = (value) => {
    setSelectedMonth(value);

    setQueryParams({
      ...queryParams,
      month: value,
    });
  };

  const handleChangeDay = (value) => {
    setQueryParams({
      ...queryParams,
      day: value,
    });
  };

  const handleChangeStatus = (value) => {
    setQueryParams({
      ...queryParams,
      status: value,
    });
  };

  const handleChangeRate = (value) => {
    setQueryParams({
      ...queryParams,
      rate: value,
    });
  };

  const reloadFormSearch = () => {
    setQueryParams({
      month: null,
      day: null,
      rate: null,
      status: null,
    });
  };

  const calculateFeeback = (data) => {
    let total = data.length;
    let rates = [0, 0, 0, 0, 0];
    let feedbackStatus = [0, 0];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      rates[item.rate - 1] += 1;
      feedbackStatus[item.feedback_status - 1] += 1;
    }

    let average =
      (rates[4] * 5 + rates[3] * 4 + rates[2] * 3 + rates[1] * 2 + rates[0]) /
      total;

    setStatistic({
      total: total,
      average: average.toFixed(1),
      rate_5: rates[4],
      rate_4: rates[3],
      rate_3: rates[2],
      rate_2: rates[1],
      rate_1: rates[0],
      read: feedbackStatus[1],
      unread: feedbackStatus[0],
    });

    setUnreadFeedbackCount(feedbackStatus[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      calculateFeeback(feedbackList);
    }
  }, [feedbackList, isSuccess]);

  return (
    <div className="feedback">
      <p className="title">Phản hồi của khách hàng</p>
      <Row className="form-search">
        <Space>
          <Select
            style={{
              width: 110,
            }}
            value={today.getFullYear()}
            options={[
              {
                value: today.getFullYear(),
                label: "Năm " + today.getFullYear(),
              },
            ]}
            disabled={true}
          />
          <Select
            placeholder="--Tháng--"
            value={queryParams["month"]}
            style={{
              width: 100,
            }}
            options={months}
            onChange={handleChangeMonth}
          />
          <Select
            placeholder="--Ngày--"
            value={queryParams["day"]}
            style={{
              width: 100,
            }}
            options={dayOption.map((day) => ({
              value: day,
              label: "ngày " + day,
            }))}
            onChange={handleChangeDay}
            disabled={queryParams["month"] === null && true}
          />
          <Select
            placeholder="--Trạng thái--"
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
            onChange={handleChangeStatus}
            value={queryParams["feedback_status"]}
          />
          <Select
            placeholder="--Đánh giá--"
            style={{
              width: 160,
            }}
            options={Object.values(RATE).map((value) => ({
              value: value,
              label: <Rate value={value} disabled />,
            }))}
            onChange={handleChangeRate}
            value={queryParams["rate"]}
          />
          <Button
            onClick={reloadFormSearch}
            type="primary"
            icon={<UndoOutlined />}
          ></Button>
        </Space>
      </Row>
      <Row>
        <Col flex="2">
          <FeedbackList feedbackList={feedbackList} refetch={refetch} />
        </Col>
        <Col flex="1">
          <Statistic statistic={statistic} />
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
