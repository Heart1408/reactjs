import React from "react";
import { Row, Col, Progress, Space, Button, Dropdown, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSackDollar } from '@fortawesome/fontawesome-free-solid';
import {
  faSackDollar,
  faClipboard,
  faChartSimple,
  faUserFriends,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items = [
  {
    label: "Tháng 1",
    key: "1",
  },
  {
    label: "Tháng 2",
    key: "2",
  },
  {
    label: "Tháng 3",
    key: "3",
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Statistics = () => {
  return (
    <>
      <p className="title">Tổng quan</p>
      <div>
        <p>Hoạt động trong ngày 20/02/2023 - 04:31 CH</p>
        <Row className="content">
          <Col md={12} sm={24} xs={24} className="item">
            <div>
              <Row justify="space-between" className="title">
                <Row>
                  <FontAwesomeIcon icon={faSackDollar} size="lg" />
                  <p className="label">TIỀN THU</p>
                </Row>
                <div>16,709,111</div>
              </Row>
              <Row justify="space-between">
                <p className="label">Bán hàng</p>
                <p>16,709,111</p>
              </Row>
              <Row justify="space-between">
                <p className="label">Thu nợ</p>
                <p>16,709,111</p>
              </Row>
              <Row justify="space-between">
                <p className="label">Khách đặt cọc</p>
                <p>16,709,111</p>
              </Row>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24} className="item">
            <div>
              <Row justify="space-between" className="title">
                <Row>
                  <FontAwesomeIcon icon={faClipboard} size="lg" />
                  <p className="label">ORDER</p>
                </Row>
                <div>16,709,111</div>
              </Row>
              <Row>
                <Col span={10} className="label">
                  Đã thanh toán
                </Col>
                <Col span={6}>6</Col>
                <Col>16,709,111</Col>
              </Row>
              <Row>
                <Col span={10} className="label">
                  Đang phục vụ
                </Col>
                <Col span={6}>5</Col>
                <Col>16,709,111</Col>
              </Row>
              <Row>
                <Col span={10} className="label">
                  Hủy
                </Col>
                <Col span={6}>7</Col>
                <Col>16,709,111</Col>
              </Row>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24} className="item">
            <div>
              <Row justify="space-between" className="title">
                <Row>
                  <FontAwesomeIcon icon={faChartSimple} size="lg" />
                  <p className="label">DOANH THU ƯỚC TÍNH</p>
                </Row>
                <div>16,709,111</div>
              </Row>
              <Row justify="space-between">
                <p className="label">Bán hàng</p>
                <p>16,709,111</p>
              </Row>
              <Row justify="space-between">
                <p className="label">Thu nợ</p>
                <p>16,709,111</p>
              </Row>
              <Row justify="space-between">
                <p className="label">Khách đặt cọc</p>
                <p>16,709,111</p>
              </Row>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24} className="customer-item item">
            <div>
              <Row justify="space-between" className="title">
                <Row>
                  <FontAwesomeIcon icon={faUserFriends} size="lg" />
                  <p className="label">KHÁCH HÀNG</p>
                </Row>
                <div>50</div>
              </Row>
              <Row justify="space-between">
                <Col sm={14} xs={24}>
                  <Row justify="space-between">
                    <p className="label">Đã phục vụ</p>
                    <p>30</p>
                  </Row>
                  <Row justify="space-between">
                    <p className="label">Đang phục vụ</p>
                    <p>20</p>
                  </Row>
                </Col>
                <Col className="progress-custom">
                  <Progress type="circle" percent={70} width={60} />
                  <p>Công suất phục vụ</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row justify={"space-between"}>
          <p>Doanh thu, chi phí, lợi nhuận</p>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Tháng này
                <FontAwesomeIcon icon={faAngleDown} />
              </Space>
            </Button>
          </Dropdown>
        </Row>
      </div>
    </>
  );
};

export default Statistics;
