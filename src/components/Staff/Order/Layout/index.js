import React, { useState, useEffect } from "react";
import {
  Select,
  Row,
  Col,
  Button,
  Space,
  Modal,
  Input,
  Form,
  Alert,
} from "antd";
import { getListTableAPI } from "../../../../services/schedule";
import { STATUS_TABLE_COLOR, TABLE_STATUS } from "../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import TableDetail from "./TableDetail";
const { TextArea } = Input;

function Layout(props) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedTable, setSelectedTable] = useState({});
  const [listTable, setListTable] = useState([]);
  const [showItemBar, setShowItemBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (props.listFloor[0]) setSelectedFloor(props.listFloor[0].id);
  }, [props.listFloor]);

  useEffect(() => {
    const handleGetListTable = async () => {
      try {
        const response = await getListTableAPI(selectedFloor);
        if (!response?.success) {
          throw response?.message;
        }
        setListTable(response.data);
      } catch (error) {
        throw error;
      }
    };
    handleGetListTable();
  }, [selectedFloor]);

  function editTableStatus() {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("onChangeTab", selectedTable);

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
                options={props.listFloor?.map((item) => ({
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
                        <Button onClick={editTableStatus}>
                          <FontAwesomeIcon
                            // id={item.newId}
                            icon={faPenToSquare}
                          />
                        </Button>
                      </Col>
                    ))}

                    <Modal
                      title="Trạng thái bàn hiện tại - Bàn 2"
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={[]}
                      width={380}
                    >
                      <Form
                      // onFinish={formik.handleSubmit}
                      >
                        <Select
                          defaultValue="Bàn trống"
                          options={[
                            {
                              value: 1,
                              label: "Bàn trống",
                            },
                            {
                              value: 2,
                              label: "Đang có khách",
                            },
                            {
                              value: 3,
                              label: "Đang chưa sẵn sàng",
                            },
                          ]}
                          style={{ width: "100%", margin: "10px 0" }}
                        />
                        <TextArea placeholder="Ghi chú ..." rows="3"></TextArea>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ width: "100%", marginTop: "15px" }}
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
