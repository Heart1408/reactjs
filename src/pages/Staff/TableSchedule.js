import React, { useState, useEffect } from "react";
import { useGetFloor, useGetSchedule } from "../../hooks/schedule";
import ScheduleItem from "../../components/Staff/Schedule/Item";
import AddShift from "../../components/Staff/Schedule/AddShift";
import { STATUS_TABLE_COLOR } from "../../constants";
import { Button, Select, Table, Row } from "antd";
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
      children: Array.from({ length: 16 }, (_, i) => ({
        title: `${i + 7}:00`,
        dataIndex: `time_${i + 7}`,
        key: Math.random(),
        width: 65,
      })),
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

  return (
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
        pagination={{ pageSize: 5 }}
        scroll={{
          x: 1280,
        }}
      />
    </>
  );
}

export default TableSchedule;
