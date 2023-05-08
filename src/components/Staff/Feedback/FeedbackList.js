import React from "react";

import { useChangeStatus } from "../../../hooks/feedback";
import { FEEDBACK_STATUS } from "../../../constants";
import { format } from "date-fns";
import {
  Avatar,
  Typography,
  Space,
  Button,
  Row,
  Col,
  Rate,
  message,
  Dropdown,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

function FeedbackList(props) {
  const feedbackList = props.feedbackList;

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      props.refetch();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };
  const changeStatus = useChangeStatus(handleResponse);

  const confirmChangeStatus = (id) => {
    changeStatus.mutate(id);
  };

  return (
    <Space direction="vertical" className="list-feedback">
      {feedbackList && feedbackList.length === 0 ? (
        <p style={{ color: "rgb(128, 0, 0)" }}>
          Không tìm thấy dữ liệu phù hợp.
        </p>
      ) : (
        <>
          {" "}
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
                  {item.feedback_status === FEEDBACK_STATUS.UNREAD ? (
                    <Dropdown
                      overlay={
                        <Button
                          onClick={() => confirmChangeStatus(item.id)}
                          className="feedback-btn-read"
                        >
                          Đã xem
                        </Button>
                      }
                      placement="bottomLeft"
                    >
                      <Button className="feedback-btn-unread">Chưa xem</Button>
                    </Dropdown>
                  ) : (
                    <Button className="feedback-btn-read">Đã xem</Button>
                  )}
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
        </>
      )}
    </Space>
  );
}

export default FeedbackList;
