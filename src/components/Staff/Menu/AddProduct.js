import React, { useState } from "react";
import { PlusOutlined, FormOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Row,
} from "antd";
//uplaod ảnh
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function AddProduct() {
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmitShift = (values) => {
    console.log("Success:", values);
    setIsModalOpen(false);
  };

  const onSubmitShiftFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //upload ảnh
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="add-product">
      <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
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
          onFinish={onSubmitShift}
          onFinishFailed={onSubmitShiftFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Space>
            <Form.Item
              label="Tên sản phẩm"
              name="productname"
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
                placeholder="N..."
              ></Input>
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name=""
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Select
                defaultValue="2"
                style={{
                  width: 160,
                }}
                options={[
                  {
                    value: "1",
                    label: "Đồ uống",
                  },
                  {
                    value: "2",
                    label: "Tráng miệng",
                  },
                ]}
              />
            </Form.Item>
          </Space>

          <Space>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Select
                defaultValue="1"
                style={{
                  width: 260,
                }}
                options={[
                  {
                    value: "1",
                    label: "--None--",
                  },
                  {
                    value: "2",
                    label: "Sản phẩm mới",
                  },
                  {
                    value: "3",
                    label: "Sản phẩm tạm hết",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="10.000"
                style={{
                  width: 160,
                }}
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
            name=""
            rules={[
              {
                required: true,
                message: "Không được để trống!",
              },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              style={{
                width: "100%",
              }}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddProduct;
