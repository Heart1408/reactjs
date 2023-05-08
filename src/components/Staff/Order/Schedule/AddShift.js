import React, { useState } from "react";
import { useCreateSchedule } from "../../../../hooks/schedule";
import { useSelector } from "react-redux";
import { selectedCurrentUser } from "../../../../redux/login/selector";
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
  const currentStaff = useSelector(selectedCurrentUser);

  const floors = props.listFloor;

  const [floorId, setFloorId] = useState(
    floors && floors[0] ? floors[0].id : null
  );

  let listTable = [];
  if (floorId !== null) {
    const floor = floors.find((floor) => floor.id === floorId);
    listTable = floor.tables.map((table) => ({
      id: table.id,
      name: table.name,
    }));
  }

  const handleUpdateResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      props.refetch();
      handleCancel();
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
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      mutateCreateSchedule.mutate(values);
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
    setInitialValues({
      phone: null,
      customername: null,
      table_id: null,
      time: null,
      note: null,
    });
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
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={600}
      >
        <p className="model-header">Thêm lịch đặt bàn</p>
        <FormStyle>
          <Form
            onFinish={formik.handleSubmit}
            autoComplete="off"
            layout="vertical"
            name="basic"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "500",
                margin: "-5px 0 10px 0",
              }}
            >
              <FontAwesomeIcon icon={faUserTie} /> Nhân viên nhận đặt:{" "}
              {currentStaff.username}
            </p>
            <Space direction="vertical">
              <Space>
                <Form.Item
                  label="Số điện thoại: "
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    onChange={(e) =>
                      formik.setFieldValue("phone", e.target.value)
                    }
                    value={formik.values.phone}
                  />
                </Form.Item>
                {formik.errors.phone && (
                  <p className="pl-2 pt-1 text-danger">{formik.errors.phone}</p>
                )}
                <Form.Item label="Khách hàng: ">
                  <Input
                    placeholder="Nhập tên khách hàng"
                    name="customername"
                    value={formik.values.customername}
                    onChange={(e) =>
                      formik.setFieldValue("customername", e.target.value)
                    }
                  />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item label="Tầng: ">
                  <Select
                    name="floor"
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
                      allowClear
                      placeholder="Chọn bàn"
                      name="table_id"
                      options={listTable?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      value={formik.values.table_id}
                      onChange={(value) => {
                        formik.setFieldValue("table_id", value);
                      }}
                    />
                  )}
                </Form.Item>
              </Space>

              <Row>
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
                  label="Ghi chú: "
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống!",
                    },
                  ]}
                  style={{ marginLeft: "10px" }}
                >
                  <TextArea
                    name="note"
                    rows={2}
                    placeholder="Nhập ghi chú"
                    onChange={(e) =>
                      formik.setFieldValue("note", e.target.value)
                    }
                  />
                </Form.Item>
              </Row>
            </Space>

            <Form.Item>
              <Button
                type="primary"
                htmlType="reset"
                onClick={handleCancel}
                style={{ marginRight: "5px", background: "grey" }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm
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
