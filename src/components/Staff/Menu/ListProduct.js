import React, { useEffect } from "react";
import { DISH_STATUS } from "../../../constants";
import { formatPrice } from "../../../utils/common";
import { useGetListProduct, useDeleteProduct } from "../../../hooks/category";
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
  Modal,
  message,
  Select,
} from "antd";
const { Meta } = Card;

function ListProduct(props) {
  const { categoryActive, isAdmin, listCategory, queryParams, setQueryParams } =
    props;

  const handleResponse = (isSuccess, success = null) => {
    if (isSuccess) {
      message.success(success);
      refetch();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const deleteProduct = useDeleteProduct(handleResponse);

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        deleteProduct.mutate(id);
      },
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
    isError: getListFail,
    refetch,
    error,
  } = useGetListProduct(queryParams);

  const listProduct = dataProductResponse?.data;

  useEffect(() => {
    if (getListFail) {
      message.error(error);
    }
  }, [getListFail]);

  return (
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
          <AddProduct
            listCategory={listCategory ? listCategory : null}
            isAdmin={isAdmin}
            refetch={refetch}
          />
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
          <List.Item
            style={{
              opacity:
                item.chain_stores &&
                item.chain_stores["0"] &&
                item.chain_stores["0"].pivot.status ===
                  DISH_STATUS.OUT_OF_STOCK &&
                "0.5",
            }}
          >
            <Card
              cover={
                <div className="img">
                  <img
                    alt={item.image}
                    src={`http://localhost:8000${item.image}`}
                  />
                  {item.chain_stores &&
                    item.chain_stores["0"] &&
                    item.chain_stores["0"].pivot.status === DISH_STATUS.NEW && (
                      <span className="tag">Mới</span>
                    )}
                </div>
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
                          confirmDelete(item.id);
                        }}
                        className={!isAdmin && "inactive"}
                      >
                        <DeleteOutlined />
                      </button>
                      <button>
                        <EditOutlined />
                      </button>
                    </Row>
                  </Row>
                }
                description={`${formatPrice(item.price)}đ`}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListProduct;
