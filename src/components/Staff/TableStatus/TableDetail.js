import React, { useState, useEffect } from "react";
import {
  useGetTableCurrent,
  useUpdateStatusBill,
  usePaymentConfirm,
} from "../../../hooks/schedule";
import { QuestionCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../utils/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  STATUS_TABLE_COLOR,
  TABLE_STATUS,
  BILL_STATUS,
  BOOKING_STATUS,
} from "../../../constants";
import { faBowlFood, faAtom, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Alert, Checkbox, Table, message, Modal } from "antd";
import { Link } from "react-router-dom";

export default function TableDetail(props) {
  const status = props.tableInfo?.status;
  const tableId = props.tableInfo?.id;
  const tableName = props.tableInfo?.name;

  const response = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      refetch();
      setServeredList([]);
      return;
    }
    message.error(error || "Đã có lỗi xảy ra!");
  };

  const { data: dataTableResponse, refetch, isSuccess } = useGetTableCurrent(
    tableId
  );

  const updateBillStatus = useUpdateStatusBill(response);
  const paymentConfirm = usePaymentConfirm(response);

  const tableDetail = dataTableResponse?.data;
  const bill = dataTableResponse?.data.bill;
  const bookingId = dataTableResponse?.data.booking_id;
  const bookingStatus = dataTableResponse?.data.status;
  const note = dataTableResponse?.data.note;
  const paymentConfirmable = dataTableResponse?.data.payment_confirmable;

  const [data, setData] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [serveredList, setServeredList] = useState([]);

  const handleCheckboxChange = (dishId, isChecked) => {
    setServeredList((prevList) => {
      if (isChecked) {
        return [...prevList, dishId];
      } else {
        return prevList.filter((id) => id !== dishId);
      }
    });
  };

  const calculateTotalPay = (bill) => {
    let total = 0;
    bill.forEach((item) => {
      total += item.price * item.pivot.quantity;
    });
    let result = formatPrice(total);
    setTotalPay(result);
  };

  useEffect(() => {
    if (isSuccess) {
      calculateTotalPay(bill);
    }
  }, [bill, isSuccess]);

  useEffect(() => {
    let number = 1;
    const tempData = bill?.map((item) => {
      return {
        key: item.id,
        number: number++,
        dish: (
          <>
            {item.pivot.status === BILL_STATUS.SERVERED ? (
              <>
                <Checkbox
                  style={{ marginRight: "5px" }}
                  checked={item.pivot.status === BILL_STATUS.SERVERED}
                  disabled={item.pivot.status === BILL_STATUS.SERVERED}
                ></Checkbox>
                {item.name}
              </>
            ) : (
              <>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange(item.id, e.target.checked)
                  }
                  style={{ marginRight: "5px" }}
                ></Checkbox>
                {item.name}
              </>
            )}
          </>
        ),
        quantity: item.pivot.quantity,
        price: <>{formatPrice(item.price)}đ</>,
        totalprice: (
          <p className="total-p">
            {formatPrice(item.price * item.pivot.quantity)}đ
          </p>
        ),
      };
    });
    setData(tempData);
  }, [bill]);

  const handleUpdateBillStatus = () => {
    updateBillStatus.mutate({
      serveredListId: serveredList,
      bookingId: bookingId,
    });
  };

  const handlePaymentConfirm = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <QuestionCircleOutlined />,
      content: "Xác nhận thanh toán?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        paymentConfirm.mutate({
          bookingId: bookingId,
        });
      },
    });
  };

  const columns = [
    {
      title: (
        <div className="update-status">
          <p>Các món ăn đã gọi</p>
          <Button
            type="primary"
            disabled={serveredList.length > 0 ? false : true}
            onClick={handleUpdateBillStatus}
          >
            Cập nhật
          </Button>
        </div>
      ),
      dataIndex: "number",
      key: "number",
      width: "10px",
      colSpan: 2,
    },
    {
      title: "",
      dataIndex: "dish",
      colSpan: 0,
    },
    {
      title: <FontAwesomeIcon icon={faBowlFood} size="lg" />,
      dataIndex: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalprice",
      className: "total",
    },
  ];

  return (
    <>
      {tableId === undefined ? (
        <Alert message="Vui lòng chọn bàn!" type="info" showIcon />
      ) : (
        <div className="layout-detail">
          <div
            style={{
              backgroundColor:
                status === TABLE_STATUS.GUESTS
                  ? STATUS_TABLE_COLOR.GUESTS
                  : status === TABLE_STATUS.NOTREADY
                  ? STATUS_TABLE_COLOR.NOTREADY
                  : STATUS_TABLE_COLOR.READY,
              color: "white",
            }}
            className="status"
          >
            {status === TABLE_STATUS.GUESTS ? (
              <>Bàn đang có khách</>
            ) : status === TABLE_STATUS.NOTREADY ? (
              <>Bàn chưa sẵn sàng</>
            ) : (
              <>Bàn trống</>
            )}
          </div>

          <div className="detail-content">
            {status === 3 ? (
              <div style={{ width: "100%", marginTop: "10px" }}>
                <p>{tableName} - Tầng 1</p>
                <p>
                  Khách hàng: {tableDetail?.customer_name} - SĐT:{" "}
                  {tableDetail?.customer_phone}{" "}
                  <UndoOutlined onClick={() => refetch()} />
                </p>
                {bill && bill.length > 0 ? (
                  <>
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                      style={{ width: "98%" }}
                    />
                    <div className="note">
                      <FontAwesomeIcon icon={faPen} />3 người {note}
                    </div>
                    <div className="total-price">
                      <div>
                        <div className="total-price">
                          Tổng:
                          <span>{totalPay}đ</span>
                        </div>
                        {bookingStatus === BOOKING_STATUS.PAID ? (
                          <p className="paid-text">Đã thanh toán</p>
                        ) : (
                          <Button
                            type="primary"
                            disabled={!paymentConfirmable}
                            onClick={handlePaymentConfirm}
                          >
                            Xác nhận thanh toán
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p
                    style={{
                      fontSize: "16px",
                      fonntWeight: "500",
                      color: "grey",
                    }}
                  >
                    Khách hàng chưa gọi món!
                  </p>
                )}
                <Link
                  to={
                    bookingId !== undefined &&
                    `/staff/booking?bookingId=${bookingId}`
                  }
                >
                  Thêm món ăn
                </Link>
              </div>
            ) : (
              <div className="no-data">
                <div>
                  <FontAwesomeIcon icon={faAtom} />
                  <p>No data !</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
