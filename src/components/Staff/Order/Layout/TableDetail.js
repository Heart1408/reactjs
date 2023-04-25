import React from "react";
import {
  useGetTableCurrent,
  useGetCustomerInfo,
} from "../../../../hooks/schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STATUS_TABLE_COLOR, TABLE_STATUS } from "../../../../constants";
import { faBowlFood, faAtom } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, Alert, Checkbox } from "antd";

export default function TableDetail(props) {
  const status = props.tableInfo.status;
  const { data: dataTableResponse } = useGetTableCurrent(props.tableInfo.id);
  const tableDetail = dataTableResponse?.data;

  const { data: dataCustomerReponse } = useGetCustomerInfo(tableDetail?.id);
  const customerInfo = dataCustomerReponse?.data;

  console.log("test", customerInfo);

  const data = [];
  for (let i = 1; i < 6; i++) {
    data.push({
      key: i,
      dish: (
        <>
          Nước ép cam
          <Checkbox onChange="" style={{ marginLeft: "5px" }}></Checkbox>
        </>
      ),
      number: "1",
      price: "40.000",
      totalprice: "40.000",
    });
  }
  const columns = [
    {
      title: (
        <div className="update-status">
          <p>Các món ăn đã gọi</p>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
      dataIndex: "key",
      key: "key",
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
      dataIndex: "number",
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
      {props.tableInfo.id === undefined ? (
        <Alert message="Vui lòng chọn bàn!" type="info" showIcon />
      ) : (
        <div className="layout-detail">
          <div
            style={{
              backgroundColor:
                props.tableInfo.status === TABLE_STATUS.GUESTS
                  ? STATUS_TABLE_COLOR.GUESTS
                  : props.tableInfo.status === TABLE_STATUS.NOTREADY
                  ? STATUS_TABLE_COLOR.NOTREADY
                  : STATUS_TABLE_COLOR.READY,
              color: "white",
            }}
            className="status"
          >
            {status === 3 ? (
              <>Bàn đang có khách</>
            ) : status === 2 ? (
              <>Bàn chưa sẵn sàng</>
            ) : (
              <>Bàn trống</>
            )}
          </div>

          <div className="detail-content">
            {status === 3 ? (
              <div style={{ width: "100%" }}>
                <p>{props.tableInfo?.name} - Tầng 1</p>
                {/* <p>Khách hàng: {customerInfo?.fullname} - SĐT: 0383927238</p> */}
                <p>Khách hàng: Nguyễn Văn A - SĐT: 0383927238</p>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  style={{ width: "98%" }}
                />
                <div className="total-price">
                  <div>
                    <div className="total-price">
                      Tổng tiền:
                      <span>200.000đ</span>
                    </div>
                    <Button type="primary">Xác nhận thanh toán</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-data">
                <FontAwesomeIcon icon={faAtom} />
                <p>No data !</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
