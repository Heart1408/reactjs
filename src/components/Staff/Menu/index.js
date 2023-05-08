import React, { useState, useEffect } from "react";
import { DISH_STATUS } from "../../../constants";
import { useSelector } from "react-redux";
import { selectedCurrentUser } from "../../../redux/login/selector";
import {
  useCreateCategory,
  useGetListCategory,
  useUpdateCategory,
  useDeleteCategory,
  useGetListProduct,
} from "../../../hooks/category";
import { useFormik } from "formik";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Input,
  Row,
  List,
  Card,
  Form,
  Modal,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faPen,
  faXmarkCircle,
  faPlus,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import ListProduct from "./ListProduct";
const { Meta } = Card;

function Menu() {
  const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const currentStaff = useSelector(selectedCurrentUser);
  const isAdmin = currentStaff.role === "admin";

  const toggleModal = () => {
    setOpenModalAddCategory(!openModalAddCategory);
  };

  const {
    data: dataCategoryResponse,
    isSuccess,
    refetch,
  } = useGetListCategory();
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
        deleteCategory.mutate(id);
      },
    });
  };

  const [queryParams, setQueryParams] = useState({
    search_key: "",
    sortByPrice: null,
    categoryId: null,
    status: null,
  });

  const [categoryActive, setCategoryActive] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    setCategoryActive({
      id: listCategory && listCategory[0] ? listCategory[0].id : null,
      name: listCategory && listCategory[0] ? listCategory[0].type : null,
    });
  }, [listCategory, isSuccess]);

  const handleItemClick = (category) => {
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

  const {
    data: dataProductResponse,
    isError: getListFail,
    error,
  } = useGetListProduct(queryParams);

  const listProduct = dataProductResponse?.data;

  useEffect(() => {
    if (getListFail) {
      message.error(error);
    }
  }, [getListFail]);

  console.log(listProduct);

  return (
    <>
      <div className="menu">
        <div className="list-category">
          <List>
            <p className="title">Danh mục sản phẩm</p>
            {listCategory?.map((item) => (
              <List.Item
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{
                  background: categoryActive["id"] === item.id ? "#95bcf3" : "",
                }}
              >
                <Row justify="space-between">
                  <Space>
                    <FontAwesomeIcon icon={faBowlFood} />
                    {item.type}
                  </Space>
                  <Space>
                    <button
                      onClick={handleClickEditCategory(item)}
                      className={!isAdmin && "inactive"}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        confirmDelete(item.id);
                      }}
                      className={!isAdmin && "inactive"}
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
            {isAdmin && (
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
            )}

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
        <ListProduct
          categoryActive={categoryActive}
          isAdmin={isAdmin}
          listCategory={listCategory}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
    </>
  );
}

export default Menu;
