import React, { useState, useEffect } from "react";
import { useGetFloor, useGetSchedule } from "../../hooks/schedule";
import ScheduleItem from "../../components/Staff/Order/Schedule/Item";
import AddShift from "../../components/Staff/Order/Schedule/AddShift";
import Layout from "../../components/Staff/Order/Layout";
import { STATUS_TABLE_COLOR } from "../../constants";
import { Button, Select, Table, Row, Tabs } from "antd";
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

  const {
    data: dataFloorsResponse,
    isSuccess,
    refetch: refetchFloor,
  } = useGetFloor();
  const floors = dataFloorsResponse?.data;

  const { data: dataSchedulesResponse, refetch } = useGetSchedule(selectedDate);
  const listSchedule = dataSchedulesResponse?.data;

  const [selectedFloor, setSelectedFloor] = useState(null);
  const floorOptions = floors?.map((floor) => ({
    value: floor.id,
    label: floor.name,
  }));

  let tableOptions = [];
  if (selectedFloor !== null) {
    const floor = floors?.find((floor) => floor.id === selectedFloor);
    tableOptions = floor?.tables?.map((table) => ({
      value: table.id,
      label: table.name,
    }));
  }

  useEffect(() => {
    setSelectedFloor(floors && floors[0] && floors[0].id);
  }, [floors, isSuccess]);

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
            defaultValue={selectedFloor}
            style={{ width: 110 }}
            options={floorOptions}
            onChange={(value) => {
              setSelectedFloor(value);
            }}
          />
        </>
      ),
    },
  ];

  function renderSchedule(tableOptions, listSchedule) {
    tableOptions?.map((item) => {
      const result = {
        key: item.value,
        tableName: item.label,
      };
      listSchedule?.map((listScheduleItem) => {
        result[`time_${getHour(listScheduleItem.time)}`] =
          listScheduleItem.table_detail_id === item.value ? (
            <ScheduleItem
              data={listScheduleItem}
              listFloor={floors}
              refetch={refetch}
              refetchFloor={refetchFloor}
            />
          ) : (
            ""
          );
      });
      data.push(result);
    });
  }

  if (selectedFloor !== null && tableOptions !== undefined) {
    if (tableOptions.length === 0) {
      data.push({
        tableName: (
          <>
            Chưa có bàn nào!
            <Button>Thêm bàn</Button>
          </>
        ),
      });
    }
  }

  renderSchedule(tableOptions, listSchedule);

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
      children: <Layout listFloor={floors} refetchFloor={refetchFloor} />,
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
            <AddShift listFloor={floors} refetch={refetch} />
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
