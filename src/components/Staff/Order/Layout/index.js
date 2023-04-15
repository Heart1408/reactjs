import React, { useState, useRef, useEffect } from "react";
import { Select, Row, Col, Button, Space, Table, Modal, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBowlFood,
  faCheck,
  faXmark,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Layout.scss";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import Draggable from "react-draggable";

function Layout() {
  const [floor, setFloor] = useState(1);
  const [numberTable, setNumberTable] = useState(1);
  const [board, setBoard] = useState([]);
  const [positions, setPositions] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showItemBar, setShowItemBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodeRef = useRef(null);
  const tableIdRef = useRef(null);
  const [customer, setCustomer] = useState("customer-name");
  const data = [];
  for (let i = 1; i < 6; i++) {
    data.push({
      key: i,
      ready: false,
      dish: `dish ${i}`,
      number: "1",
      price: "200.000",
      totalprice: "200.000",
    });
  }
  const columns = [
    {
      title:
        "Bàn " +
        numberTable +
        "/ Tầng " +
        floor +
        "  -   Khách hàng " +
        customer,
      dataIndex: "key",
      key: "key",
      width: "10px",
      colSpan: 3,
    },
    {
      title: "",
      dataIndex: "ready",
      width: "10px",
      colSpan: 0,
      render: (ready) => (
        <Select
          defaultValue={ready ? true : false}
          style={{ width: 55 }}
          options={[
            { value: true, label: <FontAwesomeIcon icon={faCheck} /> },
            { value: false, label: <FontAwesomeIcon icon={faXmark} /> },
          ]}
        />
      ),
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
      title: "Bảng giá chung",
      dataIndex: "price",
    },
    {
      title: "",
      dataIndex: "totalprice",
      className: "total",
    },
  ];

  const detailTabs = [
    {
      key: "1",
      label: `Tab 1`,
      children: (
        <div>
          <div>
            <p className="title">Hóa đơn id: {tableIdRef.current}</p>
            <div className="add-shift">
              <Button>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
          <div className="total-price">
            Tổng tiền:
            <span>1.200.000</span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Tab 2`,
      children: (
        <div>
          <p className="title">Chi tiết</p>
        </div>
      ),
    },
  ];

  const PictureList = [
    {
      id: 1,
      url: "/images/tbale-3.jpg",
    },
    {
      id: 2,
      url: "/images/table-6.png",
    },
  ];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    // collect: (monitor) => ({
    //   isOver: !!monitor.isOver(),
    // }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    pictureList[0].newId = Math.random();
    setBoard((board) => [...board, pictureList[0]]);
  };

  useEffect(() => {
    const existingDivPositions = JSON.parse(
      localStorage.getItem("positions_div")
    );
    const board = JSON.parse(localStorage.getItem("board"));
    setPositions(existingDivPositions);
    setBoard(board);
    setHasLoaded(true);
  }, []);

  function handleStop(e, data) {
    let dummyPositions = { ...positions };
    const itemId = e.target.id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  }

  useEffect(() => {
    localStorage.setItem(`board`, JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem(`positions_div`, JSON.stringify(positions));
  }, [positions]);

  function getTableDetail(e) {
    tableIdRef.current = e.target.id;
    console.log("dnbs", tableIdRef.current);
  }
  function editTableStatus() {
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeTab = (key) => {
    console.log(key);
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12} className="layout">
        <p className="title">Sơ đồ nhà hàng</p>
        <div>
          <Space wrap>
            <Button type="primary">Tầng 1</Button>
            <Button>Tầng 2</Button>
            <Button
              onClick={() => setShowItemBar(!showItemBar)}
              icon={<FontAwesomeIcon icon={faGear} size="lg" />}
            >
              {" "}
            </Button>
          </Space>
          <div className="layout-content">
            <div className={`show-item  ${showItemBar ? "" : "hidde"}`}>
              <div className="item-bar">
                {PictureList.map((picture) => {
                  return (
                    <Picture
                      key={picture.id}
                      url={picture.url}
                      id={picture.id}
                    />
                  );
                })}
              </div>
            </div>
            {hasLoaded ? (
              <div className="board" ref={drop}>
                {board.map((item) => {
                  return (
                    <Draggable
                      defaultPosition={
                        positions === null
                          ? { x: 0, y: 0 }
                          : !positions[item.newId]
                          ? { x: 0, y: 0 }
                          : {
                              x: positions[item.newId].x,
                              y: positions[item.newId].y,
                            }
                      }
                      position={null}
                      key={item.newId}
                      nodeRef={nodeRef}
                      onStop={handleStop}
                      // bounds="parent"
                      axis={showItemBar ? "both" : "none"}
                    >
                      <div className="item" onClick={getTableDetail}>
                        <img
                          ref={nodeRef}
                          className="target"
                          id={item.newId}
                          src={item.url}
                          alt="img"
                        />
                        <Button
                          onClick={editTableStatus}
                          id={item.newId}
                          type="primary"
                          danger
                        >
                          <FontAwesomeIcon
                            id={item.newId}
                            icon={faPenToSquare}
                          />
                        </Button>
                      </div>
                    </Draggable>
                  );
                })}

                <Modal
                  title="Thông tin bàn hiện tại"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="Cập nhật"
                  cancelText="Trở lại"
                >
                  <div>
                    <label>Trạng thái bàn:</label>
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
                          label: "Đang dọn",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <p>Ghi chú:</p>
                    <textarea rows="4" cols="60"></textarea>
                  </div>
                </Modal>
              </div>
            ) : null}
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} className="layout-detail">
        <Tabs defaultActiveKey="1" items={detailTabs} onChange={onChangeTab} />
      </Col>
    </Row>
  );
}

export default Layout;
