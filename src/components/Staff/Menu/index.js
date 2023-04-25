import React, { useState } from "react";
import {
  useCreateCategory,
  useGetListCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../hooks/category";
import { useFormik } from "formik";
import AddProduct from "./AddProduct";
import {
  SearchOutlined,
  FormOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Space,
  Input,
  Row,
  Col,
  List,
  Card,
  Form,
  Modal,
  message,
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faPen,
  faXmarkCircle,
  faPlus,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
const { Meta } = Card;

function Menu() {
  const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);

  const toggleModal = () => {
    setOpenModalAddCategory(!openModalAddCategory);
  };

  const { data: dataCategoryResponse, refetch } = useGetListCategory();
  const listCategory = dataCategoryResponse?.data;

  const handleCloseModal = () => {
    setOpenModalAddCategory(false);
    formik.resetForm();
    setInitialCategoryValues({
      id: null,
      type: "",
    });
  };

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      handleCloseModal();
      refetch();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const mutateCreateCategory = useCreateCategory(handleResponse);
  const mutateUpdateCategory = useUpdateCategory(handleResponse);
  const deleteCategory = useDeleteCategory(handleResponse);

  const [initialCategoryValues, setInitialCategoryValues] = useState({
    id: null,
    type: "",
  });
  const formik = useFormik({
    initialValues: initialCategoryValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      isEdit
        ? mutateUpdateCategory.mutate({ ...values })
        : mutateCreateCategory.mutate({ ...values });
    },
  });

  const handleClickEditCategory = (item) => (e) => {
    e.preventDefault();
    setIsEdit(true);
    setInitialCategoryValues({
      ...item,
      id: item.id,
      type: item.type,
    });
    toggleModal();
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        isDeleteProduct ? console.log(id) : deleteCategory.mutate(id);
      },
    });
  };

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

  return (
    <>
      <Space className="menu" align="start">
        <div className="list-category">
          <List>
            <p className="title">Danh mục sản phẩm</p>
            {listCategory?.map((item) => (
              <List.Item key={item.id}>
                <Row justify="space-between">
                  <Space>
                    <FontAwesomeIcon icon={faBowlFood} />
                    {item.type}
                  </Space>
                  <Space>
                    <button onClick={handleClickEditCategory(item)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDeleteProduct(false);
                        confirmDelete(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                  </Space>
                </Row>
              </List.Item>
            ))}
            <List.Item className="product-new">
              <Row justify="space-between">
                <Space>
                  <FontAwesomeIcon icon={faNoteSticky} />
                  Sản phẩm mới
                </Space>
              </Row>
            </List.Item>
            <List.Item className="product-outofstock">
              <Row justify="space-between">
                <Space>
                  <FontAwesomeIcon icon={faNoteSticky} />
                  Sản phẩm tạm hết
                </Space>
              </Row>
            </List.Item>
            <Space
              onClick={() => {
                toggleModal();
                setIsEdit(false);
              }}
              className="add-category"
            >
              <FontAwesomeIcon icon={faPlus} />
              <p>Thêm nhóm mới</p>
            </Space>

            <Modal
              title={
                isEdit
                  ? "Chỉnh sửa danh mục sản phẩm"
                  : "Thêm danh mục sản phẩm"
              }
              open={openModalAddCategory}
              onCancel={handleCloseModal}
              footer={[]}
              style={{
                maxWidth: "350px",
              }}
            >
              <Form onFinish={formik.handleSubmit}>
                <Input
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                  placeholder={
                    isEdit
                      ? initialCategoryValues.type
                      : "Nhập tên danh mục sản phẩm ..."
                  }
                  onChange={(e) => formik.setFieldValue("type", e.target.value)}
                ></Input>
                <Button
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  {isEdit ? <>Chỉnh sửa</> : <>Thêm</>}
                </Button>
              </Form>
            </Modal>
          </List>
        </div>

        <div className="product-list">
          <p className="title">Danh sách sản phẩm </p>
          <p style={{ fontStyle: "italic", fontSize: "16px", margin: "5px 0" }}>
            {" "}
            Danh mục Đồ uống
          </p>
          <Row className="form-search" justify="space-between">
            <Col>
              <Space>
                <Input placeholder="Nhập ..."></Input>
                <Select
                  defaultValue="--Giá--"
                  style={{
                    width: 120,
                  }}
                  options={[
                    {
                      value: "asc",
                      label: "Tăng dần",
                    },
                    {
                      value: "desc",
                      label: "Giảm dần",
                    },
                  ]}
                />
                <Button type="primary" icon={<SearchOutlined />}></Button>
              </Space>
            </Col>
            <Col>
              <AddProduct />
            </Col>
          </Row>
          <List
            className="list"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
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
                <Card cover={<img alt="img" src={item.image} />}>
                  <Meta
                    title={
                      <Row justify="space-between">
                        <p className="product-name">{item.product_name}</p>
                        <Row>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDeleteProduct(true);
                              confirmDelete(item.key);
                            }}
                          >
                            <DeleteOutlined />
                          </button>
                          <button>
                            <EditOutlined />
                          </button>
                        </Row>
                      </Row>
                    }
                    description={`${item.price}đ`}
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Space>
    </>
  );
}

export default Menu;
