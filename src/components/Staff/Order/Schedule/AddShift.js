import React, { useState } from "react";
import { useGetCurrentStaff } from "../../../../hooks/auth";
import { useGetListTable, useCreateSchedule } from "../../../../hooks/schedule";
import { useFormik } from "formik";
import dayjs from "dayjs";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Space,
  DatePicker,
  Modal,
  Form,
  Input,
  Row,
  message,
} from "antd";
const { TextArea } = Input;

function AddShift(props) {
  const { data: currentStaffDataResponse } = useGetCurrentStaff();
  const currentStaff = currentStaffDataResponse?.data;

  const [floorId, setFloorId] = useState(
    props.listFloor.length !== 0 ? props.listFloor[0].id : null
  );
  const { data: listTableResponse } = useGetListTable(floorId);
  const listTable = listTableResponse?.data;
  const handleUpdateResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      return;
    }
    message.error(error || "Đã có lỗi xảy ra!");
  };

  const mutateCreateSchedule = useCreateSchedule(handleUpdateResponse);

  const [initialValues, setInitialValues] = useState({
    phone: null,
    customername: null,
    table_id: null,
    time: null,
    note: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    console.log("showModal");
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("tét ", values);
      mutateCreateSchedule.mutate(values);
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmitShiftFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(8, 22),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  return (
    <div className="add-shift">
      <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
        Thêm mới đặt bàn
      </Button>
      <Modal
        title="Thêm lịch đặt bàn"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={600}
      >
        <FormStyle>
          <Form
            onFinish={formik.handleSubmit}
            onFinishFailed={onSubmitShiftFailed}
            autoComplete="off"
            layout="vertical"
            name="basic"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
          >
            <p>
              <FontAwesomeIcon icon={faUserTie} /> Nhân viên nhận đặt:{" "}
              {currentStaff && currentStaff.username}
            </p>
            <Space direction="vertical">
              <Space>
                <Form.Item
                  label="Số điện thoại: "
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue("phone", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="Khách hàng: " name="customername">
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue("customername", e.target.value)
                    }
                  />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item label="Tầng: " name="floor">
                  <Select
                    defaultValue={
                      props.listFloor.length !== 0 ? props.listFloor[0].id : ""
                    }
                    options={props.listFloor?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={(value) => {
                      setFloorId(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Bàn: "
                  name="table_position"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                >
                  {(listTable && listTable.length === 0) ||
                  (listTable && listTable === undefined) ? (
                    <p style={{ color: "red", margin: "0" }}>
                      Chưa có bàn nào !
                    </p>
                  ) : (
                    <Select
                      // mode="multiple"
                      allowClear
                      placeholder="Please select"
                      // value={selectedTableId}
                      options={listTable?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={(value) => {
                        console.log("table_id", value);
                        formik.setFieldValue("table_id", value);
                      }}
                    />
                  )}
                </Form.Item>
              </Space>
              <Row>
                <Form.Item
                  label="Ghi chú: "
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                >
                  <TextArea
                    rows={3}
                    onChange={(e) =>
                      formik.setFieldValue("note", e.target.value)
                    }
                    // placeholder="maxLength is 6"
                    // maxLength={6}
                  />
                </Form.Item>
                <Form.Item
                  label="Thời gian: "
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                  style={{ paddingLeft: "10px" }}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    onChange={(value) => {
                      console.log("time", value.format("YYYY-MM-DD HH:mm:ss"));
                      formik.setFieldValue(
                        "time",
                        value.format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                  />
                </Form.Item>
              </Row>
            </Space>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </FormStyle>
      </Modal>
    </div>
  );
}

export default AddShift;

const FormStyle = styled.div`
  input,
  textarea,
  .ant-select.ant-select-in-form-item {
    width: 250px;
  }

  .ant-picker .ant-picker-input > input {
    width: 205px;
  }
`;
