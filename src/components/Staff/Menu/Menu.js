import React, { useState } from "react";
import Category from "./Category";
import {
  SearchOutlined,
  PlusOutlined,
  FormOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
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
  Col,
  List,
  Card,
} from "antd";
const { Meta } = Card;
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
//----------------------------------------------------------------

function Menu() {
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
    <>
      <Space align="start">
        <div style={{ minWidth: "230px" }}>
          <Category />
        </div>
        <div>
          <h5>Danh sách mặt hàng</h5>
          <Row justify="space-between">
            <Col>
              <Space>
                <Input placeholder="Nhập ..."></Input>
                <Button type="primary" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
              </Space>
            </Col>
            <Col>
              <Button
                onClick={showModal}
                type="primary"
                icon={<PlusOutlined />}
              >
                Thêm mặt hàng
              </Button>
              <Modal
                title="Thêm mặt hàng mới"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[]}
              >
                <Form
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  onFinish={onSubmitShift}
                  onFinishFailed={onSubmitShiftFailed}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Space>
                    <Form.Item
                      label="Tên mặt hàng"
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
                          width: 200,
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
                          width: 150,
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
                      label="Giá"
                      name="date"
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
                        style={{ width: "" }}
                      ></Input>
                    </Form.Item>

                    <Form.Item
                      label="Ảnh"
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
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                              width: "100%",
                            }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                  </Space>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 5,
              }}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    cover={
                      <img
                        alt="img"
                        src={item.image}
                        style={{
                          width: "100%",
                        }}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Row justify="space-between">
                          <p>{item.product_name}</p>
                          <button>
                            <EditOutlined />
                          </button>
                        </Row>
                      }
                      description={`${item.price}đ`}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Space>
    </>
  );
}

export default Menu;
