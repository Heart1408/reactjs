import React, { useState, useEffect, useRef } from "react";
import {
  useGetOrderedDishes,
  useDeleteDish,
  useConfirmOrder,
  useSendFeedback,
} from "../../hooks/customer/booking";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/common";
import { getToken } from "../../services/api";
import { BILL_STATUS, BOOKING_STATUS } from "../../constants";
import { Row, Col, Button, List, Input, Rate, Modal, message } from "antd";
import {
  ExclamationCircleOutlined,
  UndoOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { handleCustomerLogout } from "../../redux/login/slice";

const { TextArea } = Input;
const red = "rgb(128, 0, 0)";
const activecolor = "rgb(30, 100, 156)";

export default function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedbackRef = useRef(null);
  const [rate, setRate] = useState(null);
  const [comment, setComment] = useState("");
  const [listOrderedDishes, setlistOrderedDishes] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const {
    data: dataOrderedDishesResponse,
    refetch,
    isSuccess,
  } = useGetOrderedDishes();

  const listOrderedDishesData = dataOrderedDishesResponse?.data.bill;
  const customerName = dataOrderedDishesResponse?.data.customer_name;
  const orderable = dataOrderedDishesResponse?.data.orderable;
  const bookingStatus = dataOrderedDishesResponse?.data.status;
  const bookingId = dataOrderedDishesResponse?.data.booking_id;
  const hasFeedback = dataOrderedDishesResponse?.data.rate !== null;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(handleCustomerLogout({}));
    getToken("");
    navigate("/customer/menu");
    window.location.reload();
  };

  useEffect(() => {
    if (listOrderedDishesData) {
      setlistOrderedDishes(listOrderedDishesData);
    }
  }, [listOrderedDishesData]);

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      refetch();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };
  const deleteDish = useDeleteDish(handleResponse);
  const mutateConfirmOrder = useConfirmOrder(handleResponse);
  const sendFeedback = useSendFeedback(handleResponse);

  const handleConfirmOrder = () => {
    mutateConfirmOrder.mutate({
      listOrdered: listOrderedDishes,
    });
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    sendFeedback.mutate({
      bookingId: bookingId,
      rate: rate,
      comment: comment,
    });
  };

  const confirmDelete = (id, name) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: `Bỏ ${name} ra khỏi danh sách gọi món?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        deleteDish.mutate(id);
      },
    });
  };

  const calculateTotalPay = (listOrdered) => {
    let total = 0;
    listOrdered.forEach((item) => {
      total += item.price * item.pivot.quantity;
    });
    let result = formatPrice(total);
    setTotalPay(result);
  };

  useEffect(() => {
    if (isSuccess) {
      calculateTotalPay(listOrderedDishes);
    }
  }, [listOrderedDishes, isSuccess]);

  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.pivot.quantity + 1;
    const newListOrderedDishes = listOrderedDishes.map((dish) => {
      if (
        dish.id === item.id &&
        dish.pivot.status === BILL_STATUS.NOT_ORDERED
      ) {
        return {
          ...dish,
          pivot: {
            ...dish.pivot,
            quantity: newQuantity,
          },
        };
      }
      return dish;
    });

    setlistOrderedDishes(newListOrderedDishes);
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = item.pivot.quantity - 1;
    if (newQuantity < 1) {
      return;
    }
    const newListOrderedDishes = listOrderedDishes.map((dish) => {
      if (
        dish.id === item.id &&
        dish.pivot.status === BILL_STATUS.NOT_ORDERED
      ) {
        return {
          ...dish,
          pivot: {
            ...dish.pivot,
            quantity: newQuantity,
          },
        };
      }
      return dish;
    });

    setlistOrderedDishes(newListOrderedDishes);
  };

  const goToFeedback = () => {
    refetch();
    bookingStatus === BOOKING_STATUS.PAID
      ? feedbackRef.current.scrollIntoView({ behavior: "smooth" })
      : message.warning("Bạn chưa thể gửi phản hồi lúc này!");
  };

  return (
    <div className="booking-page">
      <div className="booking">
        <div className="booking-header">
          <div>
            <img src="/images/chef.png"></img>
          </div>
          <div>
            <p className="cus-name">
              Xin chào, <span>{customerName}</span> !
              {bookingStatus === BOOKING_STATUS.PAID && (
                <LogoutOutlined
                  onClick={handleLogout}
                  style={{
                    marginLeft: "15px",
                    color: "white",
                    fontSize: "18px",
                  }}
                />
              )}
            </p>
            <p className="slogan">Đây là thực đơn hôm nay của bạn.</p>
            <a onClick={goToFeedback}>
              Đừng quên gửi phản hồi cho chúng tôi{" "}
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
        <div className="list-order">
          <div className="top">
            <Button
              style={{ background: orderable === true ? activecolor : "grey" }}
              disabled={orderable === true ? false : true}
              onClick={handleConfirmOrder}
            >
              Đặt món
            </Button>
            <div className="total-price">
              <p>Tổng tiền: {totalPay}đ</p>
              <div
                className="is-paid"
                style={{
                  color: red,
                }}
                onClick={() => refetch()}
              >
                {bookingStatus === BOOKING_STATUS.PAID
                  ? "Đã thanh toán "
                  : "Chưa thanh toán "}
                <UndoOutlined />
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
            dataSource={listOrderedDishes}
            renderItem={(item) => (
              <List.Item
                style={{
                  background:
                    item.pivot.status === BILL_STATUS.NOT_ORDERED
                      ? "#b5cad4"
                      : "",
                }}
              >
                <Row className="item">
                  <Col flex="2" className="info">
                    <img
                      alt="image-food"
                      src={`http://localhost:8000${item.image}`}
                    ></img>
                    <p className="name">{item.name}</p>
                  </Col>
                  <Col className="quantity" flex="1">
                    <button
                      style={{
                        background:
                          item.pivot.status !== BILL_STATUS.NOT_ORDERED
                            ? "grey"
                            : activecolor,
                      }}
                      disabled={
                        item.pivot.status !== BILL_STATUS.NOT_ORDERED
                          ? true
                          : false
                      }
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.pivot.quantity}</span>
                    <button
                      style={{
                        background:
                          item.pivot.status !== BILL_STATUS.NOT_ORDERED
                            ? "grey"
                            : activecolor,
                      }}
                      disabled={
                        item.pivot.status !== BILL_STATUS.NOT_ORDERED
                          ? true
                          : false
                      }
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </Col>
                  <Col flex="1" className="price">
                    <p>{formatPrice(item.price)}đ</p>
                  </Col>
                  <Col flex="1" className="total">
                    <p>
                      {formatPrice(
                        parseFloat(item.price) * parseInt(item.pivot.quantity)
                      )}
                      đ
                    </p>
                    <div className="delete-btn">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          confirmDelete(item.id, item.name);
                        }}
                        style={{
                          background:
                            item.pivot.status !== BILL_STATUS.NOT_ORDERED
                              ? "grey"
                              : activecolor,
                        }}
                        disabled={
                          item.pivot.status !== BILL_STATUS.NOT_ORDERED
                            ? true
                            : false
                        }
                      >
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
      {bookingStatus === BOOKING_STATUS.PAID && (
        <div className="feedback" ref={feedbackRef}>
          <p>
            {hasFeedback
              ? "Cảm ơn bạn đã gửi phản hồi cho chúng tôi!"
              : "Xin hãy cho biết ý kiến của bạn về các dịch vụ của chúng tôi!"}
          </p>
          <form>
            <div className="rate">
              <Rate
                onChange={(value) => setRate(value)}
                defaultValue={dataOrderedDishesResponse?.data.rate}
                disabled={hasFeedback && true}
              />
            </div>
            <div className="comment">
              <TextArea
                placeholder="Phản hồi của bạn ..."
                rows="3"
                onChange={(e) => setComment(e.target.value)}
                defaultValue={dataOrderedDishesResponse?.data.comment}
                disabled={hasFeedback && true}
              ></TextArea>
            </div>
            <Button
              type="primary"
              onClick={handleSendFeedback}
              disabled={hasFeedback && true}
              className={!hasFeedback && "active-btn"}
            >
              Gửi phản hồi
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
