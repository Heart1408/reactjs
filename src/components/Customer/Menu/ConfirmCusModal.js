import React, { useContext, useState } from "react";
import { CustomerContext } from "../../../pages/Customer/Layout";
import { handleConfirmCustomerRequest } from "../../../redux/login/slice";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ConfirmCusModal() {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    phone: null,
  });

  const { isModalOpen, onHideConfirmCustomerModel } =
    useContext(CustomerContext);

  const onSubmitShiftFailed = () => {};

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      phone: Yup.string().required("Vui lòng nhập số điện thoại!"),
    }),
    onSubmit: (values) => {
      dispatch(
        handleConfirmCustomerRequest({
          data: values,
          callback: handleResponse,
        })
      );
    },
  });

  const handleResponse = (status, response = null) => {
    if (status) {
      message.success("Xác thực thành công!");
      onHideConfirmCustomerModel();
    } else {
      message.error(response);
    }
  };

  return (
    <Modal
      title=""
      open={isModalOpen}
      onCancel={onHideConfirmCustomerModel}
      footer={[]}
      width={420}
      className="confirm-customer"
    >
      <p className="confirm-header">
        <p>Quý khách vui lòng nhập số điện thoại</p>
        <p>để xác minh thông tin.</p>
      </p>
      <Form onFinish={formik.handleSubmit} onFinishFailed={onSubmitShiftFailed}>
        <Form.Item name="customer-phone">
          <Input
            onChange={(e) => formik.setFieldValue("phone", e.target.value)}
            placeholder="Nhập số điện thoại"
            name="phone"
          ></Input>
          {formik.errors.phone && (
            <p style={{ color: "red", textAlign: "left" }}>
              {formik.errors.phone}
            </p>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác minh thông tin
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
