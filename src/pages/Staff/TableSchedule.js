import React, { useState, useEffect } from "react";
import {
  getFloorAPI,
  getListTableAPI,
  getScheduleAPI,
} from "../../services/schedule";
import ScheduleItem from "../../components/Staff/Order/Schedule/Item";
import AddShift from "../../components/Staff/Order/Schedule/AddShift";
import { STATUS_TABLE_COLOR } from "../../constants";
import Layout from "../../components/Staff/Order/Layout";
import { Button, Select, Table, Row, Tabs, Alert, Space } from "antd";
import { format } from "date-fns";

function TableSchedule() {
  const formatDate = "dd-MM-yyyy";
  const formatDBDate = "yyyy-MM-dd";
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const overmorrow = new Date(today);
  overmorrow.setDate(today.getDate() + 2);

  const [selectedDate, setSelectedDate] = useState(format(today, formatDBDate));
  const [listFloor, setListFloor] = useState([]);
  const [floorId, setFloorId] = useState(null);
  const [listTable, setListTable] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);

  useEffect(() => {
    const handleGetFloor = async () => {
      try {
        const response = await getFloorAPI();
        if (!response?.success) {
          throw response?.message;
        }
        setListFloor(response.data);
        setFloorId(response.data[0].id);
      } catch (err) {
        throw err;
      }
    };

    const handleGetListSchedule = async () => {
      try {
        const response = await getScheduleAPI(selectedDate);
        if (!response?.success) {
          throw response?.message;
        }
        setListSchedule(response.data);
      } catch (err) {
        throw err;
      }
    };

    handleGetFloor();
    handleGetListSchedule();
  }, [selectedDate]);

  useEffect(() => {
    const handleGetListTable = async () => {
      try {
        const response = await getListTableAPI(floorId);
        if (!response?.success) {
          throw response?.message;
        }
        setListTable(response.data);
      } catch (error) {
        throw error;
      }
    };
    handleGetListTable();
  }, [floorId]);

  const getHour = (dateString) => {
    const date = new Date(dateString);
    return date.getHours();
  };

  const data = [
    {
      key: Math.random(),
      tableName: (
        <>
          <Select
            defaultValue={floorId}
            style={{ width: 110 }}
            options={listFloor?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            onChange={(value) => {
              setFloorId(value);
            }}
          />
        </>
      ),
    },
  ];

  function renderSchedule(listTable, listSchedule) {
    listTable?.map((item) => {
      const result = {
        key: item.id,
        tableName: item.name,
      };
      listSchedule?.map((listScheduleItem) => {
        result[`time_${getHour(listScheduleItem.time)}`] =
          listScheduleItem.table_detail_id === item.id ? (
            <ScheduleItem data={listScheduleItem} listFloor={listFloor} />
          ) : (
            ""
          );
      });
      data.push(result);
    });
  }

  if (listTable === undefined || listTable.length === 0) {
    data.push({
      tableName: (
        <>
          Chưa có bàn nào!
          <Button>Thêm bàn</Button>
        </>
      ),
    });
  }

  renderSchedule(listTable, listSchedule);

  const columns = [
    {
      title: "PHÒNG/BÀN",
      width: 130,
      dataIndex: "tableName",
      key: "tableName",
      fixed: "left",
    },
    {
      title: "",
      children: [
        {
          title: "07:00",
          dataIndex: "time_7",
          key: "2",
          width: 65,
        },
        {
          title: "08:00",
          dataIndex: "time_8",
          key: "3",
          width: 65,
        },
        {
          title: "09:00",
          dataIndex: "time_9",
          key: "2",
          width: 65,
        },
        {
          title: "10:00",
          dataIndex: "time_10",
          key: "3",
          width: 65,
        },
        {
          title: "11:00",
          dataIndex: "time_11",
          key: "2",
          width: 65,
        },
        {
          title: "12:00",
          dataIndex: "time_12",
          key: "3",
          width: 65,
        },
        {
          title: "13:00",
          dataIndex: "time_13",
          key: "2",
          width: 65,
        },
        {
          title: "14:00",
          dataIndex: "time_14",
          key: "3",
          width: 65,
        },
        {
          title: "15:00",
          dataIndex: "time_15",
          key: "2",
          width: 65,
        },
        {
          title: "16:00",
          dataIndex: "time_16",
          key: "3",
          width: 65,
        },
        {
          title: "17:00",
          dataIndex: "time_17",
          key: "2",
          width: 65,
        },
        {
          title: "18:00",
          dataIndex: "time_18",
          key: "3",
          width: 65,
        },
        {
          title: "19:00",
          dataIndex: "time_19",
          key: "2",
          width: 65,
        },
        {
          title: "20:00",
          dataIndex: "time_20",
          key: "3",
          width: 65,
        },
        {
          title: "21:00",
          dataIndex: "time_21",
          key: "2",
          width: 65,
        },
        {
          title: "22:00",
          dataIndex: "time_22",
          key: "3",
          width: 65,
        },
      ],
    },
  ];

  const date = [
    {
      value: format(today, formatDBDate),
      label: format(today, formatDate),
    },
    {
      value: format(tomorrow, formatDBDate),
      label: format(tomorrow, formatDate),
    },
    {
      value: format(overmorrow, formatDBDate),
      label: format(overmorrow, formatDate),
    },
  ];

  const detailTabs = [
    {
      key: "1",
      label: `Quản lý bàn`,
      children: <Layout listFloor={listFloor} />,
    },
    {
      key: "2",
      label: `Lịch đặt bàn`,
      children: (
        <>
          <Row justify="space-between">
            <Select
              defaultValue={date[0]}
              style={{ width: 120, marginBottom: "25px", marginTop: "15px" }}
              options={date}
              onChange={(value) => {
                setSelectedDate(value);
              }}
            />
            <AddShift listFloor={listFloor} />
          </Row>

          <Row className="note" style={{ width: "100%" }}>
            <p>Trạng thái lịch đặt bàn: </p>
            <Row>
              <div
                className="note-item"
                style={{ background: STATUS_TABLE_COLOR.READY }}
              ></div>{" "}
              <p>Chưa đến</p>
            </Row>
            <Row>
              <div
                className="note-item"
                style={{ background: STATUS_TABLE_COLOR.NOTREADY }}
              ></div>{" "}
              <p>Đã đến</p>
            </Row>
            <Row>
              <div
                className="note-item"
                style={{ background: STATUS_TABLE_COLOR.GUESTS }}
              ></div>{" "}
              <p>Đã hủy</p>
            </Row>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 4 }}
            scroll={{
              x: 1280,
              // y: 600,
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={detailTabs} />
    </>
  );
}

export default TableSchedule;
