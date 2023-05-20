import React, { useState, useEffect } from "react";
import { useUpdateTableStatus, useGetFloor } from "../../hooks/schedule";
import {
  Select,
  Row,
  Col,
  Button,
  Space,
  Modal,
  Input,
  Form,
  message,
} from "antd";
import { STATUS_TABLE_COLOR, TABLE_STATUS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import TableDetail from "../../components/Staff/TableStatus/TableDetail";
const { TextArea } = Input;

function TableStatus() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const overmorrow = new Date(today);
  overmorrow.setDate(today.getDate() + 2);

  const {
    data: dataFloorsResponse,
    isSuccess,
    refetch: refetchFloor,
  } = useGetFloor();
  const floors = dataFloorsResponse?.data;

  const [selectedFloor, setSelectedFloor] = useState(null);

  useEffect(() => {
    setSelectedFloor(floors && floors[0] && floors[0].id);
  }, [floors, isSuccess]);

  useEffect(() => {
    let l = floors && floors[0] && floors[0].id;
    setSelectedFloor(l);
  }, [floors]);
  const [selectedTable, setSelectedTable] = useState({});
  const [showItemBar, setShowItemBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState(null);

  let listTable = [];
  if (selectedFloor !== null && floors !== undefined) {
    if (floors.length > 0) {
      const floor = floors.find((floor) => floor.id === selectedFloor);
      listTable =
        floor &&
        floor.tables &&
        floor.tables.map((table) => ({
          id: table.id,
          name: table.name,
          status: table.status,
        }));
    }
  }

  function editTableStatus() {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const response = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      refetchFloor();
      handleCancel();
      setNote(null);
      return;
    }
    message.error(error || "Đã có lỗi xảy ra!");
  };

  const updateTableStatus = useUpdateTableStatus(response);
  const handleUpdateStatusTable = () => {
    updateTableStatus.mutate({
      table_id: selectedTable.id,
      status: selectedTable.status,
      note: note,
    });
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="layout">
          <p className="title">Sơ đồ bàn</p>
          <div>
            <Space wrap>
              <Select
                defaultValue={
                  floors && floors.length > 0 ? floors[0].id : "Tầng 1"
                }
                style={{ width: 120 }}
                options={floors?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => {
                  setSelectedFloor(value);
                }}
              />
              <Button
                onClick={() => setShowItemBar(!showItemBar)}
                icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
              >
                {" "}
              </Button>
            </Space>
            <Row className="note">
              <Row>
                <div
                  className="note-item"
                  style={{ background: STATUS_TABLE_COLOR.READY }}
                ></div>{" "}
                <p>Bàn trống</p>
              </Row>
              <Row>
                <div
                  className="note-item"
                  style={{ background: STATUS_TABLE_COLOR.NOTREADY }}
                ></div>{" "}
                <p>Bàn chưa sẵn sàng</p>
              </Row>
              <Row>
                <div
                  className="note-item"
                  style={{ background: STATUS_TABLE_COLOR.GUESTS }}
                ></div>{" "}
                <p> Bàn đang có khách</p>
              </Row>
            </Row>
            <div className="layout-content">
              <Row>
                {listTable?.length === 0 ? (
                  <div>
                    Không có bàn nào!
                    <Button type="primary">Thêm bàn mới</Button>
                  </div>
                ) : (
                  <>
                    {listTable?.map((item) => (
                      <Col
                        key={item.id}
                        className="item"
                        onClick={() => setSelectedTable(item)}
                        style={{
                          backgroundColor:
                            item.status === TABLE_STATUS.GUESTS
                              ? STATUS_TABLE_COLOR.GUESTS
                              : item.status === TABLE_STATUS.NOTREADY
                              ? STATUS_TABLE_COLOR.NOTREADY
                              : STATUS_TABLE_COLOR.READY,
                        }}
                      >
                        {item.name}
                        <Button onClick={() => editTableStatus()}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                          />
                        </Button>
                      </Col>
                    ))}

                    <Modal
                      title={`Trạng thái bàn hiện tại - ${selectedTable.name}`}
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={[]}
                      width={380}
                    >
                      <Form>
                        <Select
                          value={selectedTable.status}
                          options={[
                            {
                              value: TABLE_STATUS.READY,
                              label: "Bàn trống",
                            },
                            {
                              value: TABLE_STATUS.NOTREADY,
                              label: "Đang chưa sẵn sàng",
                            },
                            {
                              value: TABLE_STATUS.GUESTS,
                              label: "Đang có khách",
                            },
                          ]}
                          style={{ width: "100%", margin: "10px 0" }}
                          onChange={(value) =>
                            setSelectedTable({
                              ...selectedTable,
                              status: value,
                            })
                          }
                        />
                        <TextArea
                          placeholder="Ghi chú ..."
                          rows="3"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        ></TextArea>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ width: "100%", marginTop: "15px" }}
                          onClick={handleUpdateStatusTable}
                        >
                          Cập nhật
                        </Button>
                      </Form>
                    </Modal>
                  </>
                )}
              </Row>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} className="layout-detail">
        <TableDetail tableInfo={selectedTable} />
      </Col>
    </Row>
  );
}

export default TableStatus;
