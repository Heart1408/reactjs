import React, { useContext } from "react";
import { useCreateStaff, useUpdateStaff } from "../../../hooks/staff";
import { STAFF_ROLE } from "../../../constants";
import { useFormik } from "formik";
import { Button, Select, Modal, Input, Form, message } from "antd";
import { PermissionContext } from "../../../pages/Staff/StaffManagement";

const PermissionModal = () => {
  const {
    isEditStaff,
    isAddStaffModalOpen,
    onHideAddStaffModal,
    initialValues,
    setInitialValues,
    onRefetchListStaff,
  } = useContext(PermissionContext);

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      handleAddStaffCancel();
      onRefetchListStaff();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const createStaff = useCreateStaff(handleResponse);
  const updateStaff = useUpdateStaff(handleResponse);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      isEditStaff
        ? updateStaff.mutate({ ...values })
        : createStaff.mutate({ ...values });
    },
  });

  const handleAddStaffCancel = () => {
    onHideAddStaffModal();
    formik.resetForm();
    setInitialValues({
      username: null,
      fullname: null,
      phone: null,
      email: null,
      password: null,
      password_confirmation: null,
      permission: STAFF_ROLE.STAFF,
    });
  };

  console.log("tserd", initialValues);

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
        title={
          <p className="model-header">
            {isEditStaff
              ? "Chỉnh sửa thông tin nhân viên"
              : "Thêm nhân viên mới"}
          </p>
        }
        open={isAddStaffModalOpen}
        onCancel={handleAddStaffCancel}
        footer={[]}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 17,
          }}
          onFinish={formik.handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Nhập tên người dùng"
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item label="Họ và tên">
            <Input
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              placeholder="Nhập họ và tên"
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          {!isEditStaff && (
            <Form.Item label="Nhập lại password">
              <Input.Password
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
          )}

          <Form.Item label="Vị trí">
            <Select
              value={formik.values.permission}
              onChange={(value) => {
                formik.setFieldValue("permission", value);
              }}
              style={{
                width: 160,
              }}
              options={[
                {
                  value: 0,
                  label: "Nhân viên",
                },
                {
                  value: 1,
                  label: "Admin",
                },
              ]}
              name="permission"
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {isEditStaff ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PermissionModal;
