import React, { useState, useEffect } from "react";
import { useGetCustomers, useGetBookingInfo } from "../../hooks/customer";
import { formatPrice } from "../../utils/common";
import { BOOKING_STATUS } from "../../constants";
import { format } from "date-fns";
import { Avatar, Row, Col, Space, Input, Button, List } from "antd";
import { UndoOutlined, UserOutlined, TagFilled } from "@ant-design/icons";

export default function Customer() {
  const [searchKey, setSearchKey] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [bookingInfoParams, setBookingInfoParams] = useState({
    customerId: null,
    month: null,
  });

  const { data: dataCustomersResponse, isSuccess } = useGetCustomers({
    search_key: searchKey,
  });
  const { data: dataBookingInfoResponse } =
    useGetBookingInfo(bookingInfoParams);

  const customers = dataCustomersResponse?.data;
  const bookingInfo = dataBookingInfoResponse?.data;

  useEffect(() => {
    setBookingInfoParams({
      customerId: customers && customers[0] ? customers[0].id : null,
      month: new Date().getMonth() + 1,
    });

    setSelectedCustomer(
      customers && customers[0] ? customers[0].fullname : null
    );
  }, [customers, isSuccess]);

  const hasTodayBooking = (booking) => {
    const bookingDate = new Date(booking.time).getDate();
    return bookingDate === new Date().getDate();
  };

  const getBookingInfo = (customerId, customerName) => {
    setBookingInfoParams({
      ...bookingInfoParams,
      customerId: customerId,
    });

    setSelectedCustomer(customerName);
  };

  const getTotalBill = (dishes) => {
    let total = 0;
    dishes?.map((dish) => {
      total += dish.price * dish.pivot.quantity;
    });
    return total;
  };

  const getBookingStatusCounts = (booking) => {
    let counts = [0, 0, 0];

    booking?.forEach((item) => {
      if (item.status === BOOKING_STATUS.PAID) {
        counts[0]++;
      } else if (item.status === BOOKING_STATUS.CANCELLED) {
        counts[1]++;
      } else {
        counts[2]++;
      }
    });

    return counts;
  };

  const bookingStatusCount = getBookingStatusCounts(bookingInfo);

  return (
    <div className="customer">
      <p className="title">Thông tin khách hàng</p>
      <Row>
        <Col flex="1">
          <Space className="form-search">
            <Input
              placeholder="Nhập ..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            ></Input>
            <Button
              type="primary"
              icon={<UndoOutlined />}
              onClick={() => setSearchKey(null)}
            ></Button>
          </Space>
          {customers && customers.length === 0 ? (
            <p style={{ color: "rgb(128, 0, 0)" }}>
              Không tìm thấy dữ liệu phù hợp.
            </p>
          ) : (
            <div className="list-customer">
              <List
                itemLayout="horizontal"
                pagination={{
                  pageSize: 6,
                  align: "center",
                }}
                dataSource={customers}
                renderItem={(item) => (
                  <List.Item
                    className={
                      item.id === bookingInfoParams["customerId"] &&
                      "list-active"
                    }
                    key={item.id}
                    onClick={() => getBookingInfo(item.id, item.fullname)}
                  >
                    <Row className="item">
                      <Col flex="2">
                        <Space>
                          <Avatar icon={<UserOutlined />} />{" "}
                          <p>{item.fullname}</p>
                        </Space>
                      </Col>
                      <Col flex="1">{item.phone}</Col>
                      <Col flex="3">
                        <div className="status">
                          Lịch hẹn hôm nay:{" "}
                          {hasTodayBooking(
                            item.bookings ? item.bookings[0] : false
                          ) === true ? (
                            <p className="active">Có</p>
                          ) : (
                            <p>Không</p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Col>
        <Col flex="1" className="booking-detail">
          <p className="title">Thông tin đặt bàn</p>
          <div className="statistic">
            <p className="customer-name">Khách hàng: {selectedCustomer}</p>
            <p>Số lần đặt lịch: {bookingInfo?.length}</p>
            <p className="wait">
              <TagFilled />
              Đang chờ: {bookingStatusCount[2]}
            </p>
            <p className="success">
              <TagFilled />
              Thành công: {bookingStatusCount[0]}
            </p>
            <p className="cancel">
              <TagFilled />
              Đã hủy: {bookingStatusCount[1]}
            </p>
          </div>
          <List
            className="details"
            itemLayout="horizontal"
            dataSource={bookingInfo}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Row className="item">
                  <Col flex="3">
                    Ngày {format(new Date(item.time), "dd/MM/YYY")}
                  </Col>
                  <Col flex="3">
                    {new Date(item.time).getDate() === new Date().getDate() &&
                    item.status !== BOOKING_STATUS.PAID ? (
                      <div>
                        {item.table_detail.floor.name} -{" "}
                        {item.table_detail.name}
                      </div>
                    ) : (
                      <>
                        Tổng hóa đơn: {formatPrice(getTotalBill(item.dishes))}đ
                      </>
                    )}
                  </Col>
                  <Col flex="2" className="booking-status">
                    {console.log(item)}
                    {item.status === BOOKING_STATUS.PAID ? (
                      <p style={{ background: "green" }}>Thành công</p>
                    ) : item.status === BOOKING_STATUS.CANCELLED ? (
                      <p style={{ background: "red" }}>Đã hủy</p>
                    ) : (
                      <p style={{ background: "rgb(30, 100, 156)" }}>
                        Đang chờ
                      </p>
                    )}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
