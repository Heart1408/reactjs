import React from "react";
import { Row, Col, Button, List, Input, Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;

export default function Booking() {
  const list_order = [];
  for (let i = 1; i < 20; i++) {
    list_order.push({
      key: i,
      image: "/images/drink.jpg",
    });
  }

  return (
    <div className="booking-page">
      <div className="booking">
        <div className="booking-header">
          <div>
            <img src="/images/chef.png"></img>
          </div>
          <div>
            <p className="cus-name">
              Xin chào, <span>Tâm</span> !
            </p>
            <p className="slogan">Đây là thực đơn hôm nay của bạn.</p>
            <a>
              Đừng quên gửi phản hồi cho chúng tôi{" "}
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
        <div className="list-order">
          <div className="top">
            <Button>Đặt món</Button>
            <div className="total-price">
              <p>Tổng tiền: 800.000 đ</p>
              <div className="btn">
                <Button>Xác nhận thanh toán</Button>
              </div>
            </div>
          </div>
          <Row className="item-title">
            <Col flex="2" className="img">
              <p className="name">Tên món ăn</p>
            </Col>
            <Col flex="1">
              <p>Số lượng</p>
            </Col>
            <Col flex="1" className="price">
              <p>Giá</p>
            </Col>
            <Col flex="1" className="total">
              <p>Tổng tiền</p>
            </Col>
          </Row>
          <List
            className="detail"
            itemLayout="horizontal"
            dataSource={list_order}
            renderItem={(item) => (
              <List.Item>
                <Row className="item">
                  <Col flex="2" className="info">
                    <img alt="image-food" src={item.image}></img>
                    <p className="name">Nước ép cam</p>
                  </Col>
                  <Col className="quantity" flex="1">
                    <button> - </button>
                    <span>1</span>
                    <button>+</button>
                  </Col>
                  <Col flex="1" className="price">
                    <p>40.000d</p>
                  </Col>
                  <Col flex="1" className="total">
                    <p>40.000d</p>
                    <div className="delete-btn">
                      <button>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="feedback">
        <p>Xin hãy cho biết ý kiến của bạn về các dịch vụ của chúng tôi!</p>
        <form>
          <div className="rate">
            <Rate defaultValue={5} />
          </div>
          <div className="comment">
            <TextArea placeholder="Phản hồi của bạn ..." rows="3"></TextArea>
          </div>
          <button type="submit">Gửi phản hồi</button>
        </form>
      </div>
    </div>
  );
}
