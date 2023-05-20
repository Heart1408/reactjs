import React, { useState } from "react";
import { useGetCustomerInfo } from "../../../hooks/customer";
import { useUpdateSchedule } from "../../../hooks/schedule";
import { useFormik } from "formik";
import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Input, Select, DatePicker, Form, message } from "antd";
import { BOOKING_COLOR, BOOKING_STATUS } from "../../../constants";
const { TextArea } = Input;

function Item(props) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const { data: dataResponse } = useGetCustomerInfo(props.data.id);
  const customerInfo = dataResponse?.data;

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      handleCloseModel();
      props.refetch();
      props.refetchFloor();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const mutateUpdateSchedule = useUpdateSchedule(handleResponse);

  const [initialValues, setInitialValues] = useState({
    status: props.data.status,
    table_id: props.data.table_detail_id,
    time: props.data.time,
    note: props.data.note,
    id: props.data.id,
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("ddd", values);
      mutateUpdateSchedule.mutate(values);
    },
  });

  const handleCloseModel = () => {
    formik.resetForm();
    setInitialValues({
      status: props.data.status,
      table_id: props.data.table_detail_id,
      time: props.data.time,
      note: props.data.note,
      id: props.data.id,
    });
    setOpenModalDetail(false);
  };

  const floors = props.listFloor;
  const [floorId, setFloorId] = useState(customerInfo?.floor_id);

  let listTable = [];
  if (floorId !== null && floors !== undefined) {
    if (floors.length > 0) {
      const floor = floors.find((floor) => floor.id === floorId);
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

  const time = props.data.time;

  const getTime = (datetime) => {
    return datetime.substring(11, 16);
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  const booking_status = props.data.status;
  return (
    <>
      <ScheduleItem
        onClick={() => {
          setOpenModalDetail(true);
        }}
        style={{
          background:
            booking_status === BOOKING_STATUS.NOT_ARRIVED
              ? BOOKING_COLOR.NOT_ARRIVED
              : booking_status === BOOKING_STATUS.CANCELLED
              ? BOOKING_COLOR.CANCELLED
              : BOOKING_COLOR.ARRIVED,
        }}
      >
        {getTime(props.data.time)}
        <FontAwesomeIcon icon={faCircleInfo} />
      </ScheduleItem>

      <Modal
        title="Chi tiết lịch đặt bàn"
        open={openModalDetail}
        onCancel={handleCloseModel}
        footer={[]}
        width={450}
      >
        <Form
          autoComplete="off"
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17 }}
          style={{ maxWidth: 450 }}
          initialValues={{ remember: true }}
          onFinish={formik.handleSubmit}
        >
          <Form.Item label="Trạng thái:">
            <Select
              name="status"
              value={formik.values.status}
              options={[
                { value: BOOKING_STATUS.NOT_ARRIVED, label: "Khách chưa đến" },
                { value: BOOKING_STATUS.ARRIVED, label: "Khách đã đến" },
                { value: BOOKING_STATUS.CANCELLED, label: "Khách hủy đặt bàn" },
              ]}
              style={{ width: "100%" }}
              onChange={(e) => {
                formik.setFieldValue("status", e);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Khách hàng: "
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input
              defaultValue={customerInfo && customerInfo.fullname}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại: "
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input defaultValue={customerInfo && customerInfo.phone} disabled />
          </Form.Item>

          <Form.Item
            label="Thời gian: "
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <DatePicker
              name="time"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Chọn thời gian"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              value={dayjs(formik.values.time)}
              onChange={(value) => {
                console.log("time", value.format("YYYY-MM-DD HH:mm:ss"));
                formik.setFieldValue(
                  "time",
                  value.format("YYYY-MM-DD HH:mm:ss")
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tầng, bàn: "
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Select
              defaultValue={customerInfo && customerInfo.floor_id}
              options={props.listFloor?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(value) => {
                setFloorId(value);
              }}
            />
            <Select
              name="table_id"
              style={{
                paddingLeft: "15px",
              }}
              options={listTable?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(value) => {
                formik.setFieldValue("table_id", value);
              }}
              value={formik.values.table_id}
            />
          </Form.Item>

          <Form.Item label="Ghi chú:">
            <TextArea
              rows={3}
              defaultValue={props.data.note}
              // maxLength={6}
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Item;

const ScheduleItem = styled.div`
  // background-color: #003d99;
  color: white;
  position: relative;
  display: flex;
  width: 60px;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  svg {
    width: 13px;
  }

  &:hover {
    transform: scale(1.01);
    background-color: #0052cc;
  }
`;

const FormStyle = styled.div`
  input {
    width: 100%;
  }

  .ant-select.ant-select-in-form-item {
    width: 50%;
  }
`;

const UpdateStatus = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  width: 92%;
  padding: 5px 0;
  margin: auto;
  margin-bottom: 35px;
  margin-top: 20px;

  form {
    display: flex;
    justify-content: center;

    .ant-select {
      width: 250px;
      margin-right: 10px;
    }
  }
`;
