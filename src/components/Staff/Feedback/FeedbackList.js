import React from "react";
import { FEEDBACK_STATUS } from "../../../constants";
import { format } from "date-fns";
import { Avatar, Typography, Space, Button, Row, Col, Rate } from "antd";
// import { ChatContext } from "../../../Context/ChatProvider";
import { UserOutlined } from "@ant-design/icons";

function FeedbackList(props) {
  const feedbackList = props.feedbackList;

  return (
    <Space direction="vertical" className="list-feedback">
      {feedbackList?.map((item) => (
        <div className="item">
          <Row className="overview">
            <Col flex="1">
              <Typography.Link className="userlink">
                <Avatar icon={<UserOutlined />} />
                <Typography.Text>
                  {item.customer ? item.customer.fullname : "customername"}
                </Typography.Text>
              </Typography.Link>
            </Col>
            <Col flex="1" className="rate">
              <p>Đánh giá: </p> <Rate value={item.rate} disabled />
            </Col>
            <Col flex="1" className="status">
              <Button
                className={
                  item.feedback_status === FEEDBACK_STATUS.UNREAD
                    ? "feedback-btn-unread"
                    : "feedback-btn-read"
                }
              >
                {item.feedback_status === FEEDBACK_STATUS.UNREAD
                  ? "Chưa xem"
                  : "Đã xem"}
              </Button>
            </Col>
          </Row>
          <Row className="content" justify="space-between">
            <p>{item.comment}</p>
            <p style={{ fontStyle: "italic", color: "grey" }}>
              Ngày {format(new Date(item.updated_at), "dd/MM/YYY")}
            </p>
          </Row>
        </div>
      ))}
    </Space>
  );
}

export default FeedbackList;
