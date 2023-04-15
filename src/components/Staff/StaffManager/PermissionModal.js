import React, { useContext } from "react";
import { Button, Space, Select, Modal, Input, Form } from "antd";
import "./permission.scss";
import { PermissionContext } from "../../../pages/Staff/StaffManagement";

const PermissionModal = () => {
  const { isAddStaffModalOpen, onHideAddStaffModal } =
    useContext(PermissionContext);

  const handleAddStaffCancel = () => {
    onHideAddStaffModal();
  };

  const onSubmitShift = (values) => {
    console.log("Success:", values);
    onHideAddStaffModal();
  };

  const onSubmitShiftFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 17,
        offset: 7,
      },
    },
  };

  return (
    <>
      <Modal
        title="Thêm mới nhân viên"
        open={isAddStaffModalOpen}
        onCancel={handleAddStaffCancel}
        footer={[]}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onSubmitShift}
          onFinishFailed={onSubmitShiftFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập email ..." />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại ..." />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item
            name="Nhập password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="" />
          </Form.Item>

          <Form.Item
            label="Nhập lại password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Hai mật khẩu nhập không khớp nhau!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Vị trí"
            name=""
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Select
              placeholder="Họ và tên"
              style={{
                width: 160,
              }}
              options={[
                {
                  value: 1,
                  label: "Admin",
                },
                {
                  value: 2,
                  label: "Parttime",
                },
              ]}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PermissionModal;
