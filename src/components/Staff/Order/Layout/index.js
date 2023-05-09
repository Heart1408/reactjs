import React, { useState, useEffect } from "react";
import { useUpdateTableStatus } from "../../../../hooks/schedule";
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
import { STATUS_TABLE_COLOR, TABLE_STATUS } from "../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import TableDetail from "./TableDetail";
const { TextArea } = Input;

function Layout(props) {
  const floors = props.listFloor;
  const [selectedFloor, setSelectedFloor] = useState(
    floors && floors[0] ? floors[0].id : null
  );

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
      props.refetchFloor();
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
                  props.listFloor && props.listFloor.length > 0
                    ? props.listFloor[0].id
                    : "Tầng 1"
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
                            // id={item.newId}
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
                      <Form
                      // onFinish={formik.handleSubmit}
                      >
                        <Select
                          value={selectedTable.status}
                          options={
                            selectedTable.status === TABLE_STATUS.GUESTS
                              ? [
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
                                ]
                              : [
                                  {
                                    value: TABLE_STATUS.READY,
                                    label: "Bàn trống",
                                  },
                                  {
                                    value: TABLE_STATUS.NOTREADY,
                                    label: "Đang chưa sẵn sàng",
                                  },
                                ]
                          }
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

export default Layout;
