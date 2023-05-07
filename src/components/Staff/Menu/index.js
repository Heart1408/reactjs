import React, { useState, useEffect } from "react";
import { DISH_STATUS } from "../../../constants";
import {
  useCreateCategory,
  useGetListCategory,
  useUpdateCategory,
  useDeleteCategory,
  useGetListProduct,
} from "../../../hooks/category";
import { useFormik } from "formik";
import AddProduct from "./AddProduct";
import {
  UndoOutlined,
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
  // ------------------------------------------------------------------------------
  const [queryParams, setQueryParams] = useState({
    search_key: "",
    sortByPrice: null,
    categoryId: null,
    status: null,
  });

  const [categoryActive, setCategoryActive] = useState({
    id: "2",
    name: "Món chính",
  });
  const [active, setActive] = useState("#95bcf3");

  const handleItemClick = (category) => {
    if (category.id === 2) setActive("#95bcf3");
    else setActive("unset");
    setCategoryActive({
      id: category.id,
      name: category.type,
    });
    setQueryParams({ ...queryParams, categoryId: category.id, status: null });
  };

  const handleDishSatusClick = (status) => {
    setQueryParams({
      ...queryParams,
      categoryId: null,
      status: status,
    });

    setCategoryActive({
      name: status === 1 ? "Sản phẩm mới" : "Sản phẩm tạm hết",
    });
  };

  const onChangeKeyword = (keyword) => {
    setQueryParams({
      ...queryParams,
      search_key: keyword,
    });
  };

  const sortByPrice = (value) => {
    setQueryParams({
      ...queryParams,
      sortByPrice: value,
    });
  };

  const resetFilter = () => {
    setQueryParams({
      ...queryParams,
      sortByPrice: null,
      search_key: null,
    });
  };

  const {
    data: dataProductResponse,
    isLoading: loading,
    isError: getListFail,
    error,
    isSuccess,
  } = useGetListProduct(queryParams);

  const listProduct = dataProductResponse?.data;

  useEffect(() => {
    if (getListFail) {
      message.error(error);
    }
  }, [getListFail]);

  return (
    <>
      <Space className="menu" align="start">
        <div className="list-category">
          <List>
            <p className="title">Danh mục sản phẩm</p>
            {listCategory?.map((item) => (
              <List.Item
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{
                  backgroundColor:
                    item.id === 2
                      ? active
                      : categoryActive["id"] === item.id
                      ? "#95bcf3"
                      : "",
                }}
              >
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
            <List.Item
              className="product-new"
              onClick={() => handleDishSatusClick(DISH_STATUS.NEW)}
              style={{
                backgroundColor:
                  queryParams["status"] === DISH_STATUS.NEW ? "#95bcf3" : "",
              }}
            >
              <Row justify="space-between">
                <Space>
                  <FontAwesomeIcon icon={faNoteSticky} />
                  Sản phẩm mới
                </Space>
              </Row>
            </List.Item>
            <List.Item
              className="product-outofstock"
              onClick={() => handleDishSatusClick(DISH_STATUS.OUT_OF_STOCK)}
              style={{
                backgroundColor:
                  queryParams["status"] === DISH_STATUS.OUT_OF_STOCK
                    ? "#95bcf3"
                    : "",
              }}
            >
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
            Danh mục {categoryActive["name"]}
          </p>
          <Row className="form-search" justify="space-between">
            <Col>
              <Space>
                <Input
                  placeholder="Nhập ..."
                  onChange={(e) => onChangeKeyword(e.target.value)}
                  value={queryParams["search_key"]}
                ></Input>
                <Select
                  placeholder="--Giá--"
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
                  onChange={(e) => sortByPrice(e)}
                  value={queryParams["sortByPrice"]}
                />
                <Button
                  onClick={() => resetFilter()}
                  type="primary"
                  icon={<UndoOutlined />}
                ></Button>
              </Space>
            </Col>
            <Col>
              <AddProduct listCategory={listCategory ? listCategory : null} />
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
            dataSource={listProduct}
            renderItem={(item) => (
              <List.Item>
                <Card
                  cover={
                    <img
                      alt={item.image}
                      src={`http://localhost:8000${item.image}`}
                    />
                  }
                >
                  <Meta
                    title={
                      <Row justify="space-between">
                        <p className="product-name">{item.name}</p>
                        <Row>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDeleteProduct(true);
                              confirmDelete(item.id);
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
