import React, { useState } from "react";
import { useCreateProduct } from "../../../hooks/category";
import { useFormik } from "formik";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Space,
  Modal,
  Form,
  Input,
  message,
  Image,
} from "antd";

function AddProduct(props) {
  const { listCategory, isAdmin, refetch } = props;

  const data = [];
  for (let i = 1; i < 20; i++) {
    data.push({
      key: i,
      image: "/images/drink.jpg",
      product_name: `Name name ${i}`,
      price: `10${i}.000`,
      edit: <Button type="primary" icon={<FormOutlined />} ghost />,
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      handleCancel();
      refetch();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const mutateCreateProduct = useCreateProduct(handleResponse);
  const [initialValues, setInitialValues] = useState({
    name: "",
    dish_type: null,
    price: "",
    image: null,
    status: null,
  });

  //upload ảnh
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const [featureImage, setFeatureImage] = useState({});
  const handleSetFeatureImage = (base64) => {
    setFeatureImage((prevState) => ({
      ...prevState,
      image: base64,
    }));
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      }
      mutateCreateProduct.mutate(formData);
    },
  });

  const handleUploadFile = (e) => {
    const image = e.target.files[0];
    formik.setFieldValue("image", image);
    getBase64(image, handleSetFeatureImage);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="add-product">
      <Button
        onClick={showModal}
        className={!isAdmin && "inactive"}
        type="primary"
        icon={<PlusOutlined />}
      >
        Thêm sản phẩm
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={480}
      >
        <p className="model-header">Thêm sản phẩm mới</p>
        <Form
          wrapperCol={{
            span: 16,
          }}
          onFinish={formik.handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Space>
            <Form.Item
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                style={{
                  width: 260,
                }}
                name="name"
                placeholder="N..."
                onChange={formik.handleChange}
                value={formik.values.name}
              ></Input>
            </Form.Item>

            <Form.Item
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Select
                placeholder="--Chọn danh mục--"
                style={{
                  width: 160,
                }}
                name="dish_type"
                options={listCategory?.map((item) => ({
                  value: item.id,
                  label: item.type,
                }))}
                onChange={(e) => {
                  formik.setFieldValue("dish_type", e);
                }}
                value={formik.values.dish_type}
              />
            </Form.Item>
          </Space>

          <Space>
            <Form.Item label="Trạng thái">
              <Select
                name="status"
                style={{
                  width: 260,
                }}
                options={[
                  {
                    value: null,
                    label: "--None--",
                  },
                  {
                    value: 1,
                    label: "Sản phẩm mới",
                  },
                  {
                    value: 2,
                    label: "Sản phẩm tạm hết",
                  },
                ]}
                onChange={(e) => {
                  formik.setFieldValue("status", e);
                }}
                value={formik.values.status}
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                type="number"
                name="price"
                placeholder="10000"
                style={{
                  width: 160,
                }}
                onChange={formik.handleChange}
                value={formik.values.price}
              ></Input>
            </Form.Item>
          </Space>
          <Form.Item
            label={
              <>
                <p>Ảnh sản phẩm</p>
                <p>File hỗ trợ: JPG, PNG, SVG. Tối đa 5MB</p>
              </>
            }
          >
            <Image
              className=""
              name="image"
              preview={false}
              src={featureImage.image || formik.values.image}
            />
            <input type="file" multiple={false} onChange={handleUploadFile} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddProduct;
