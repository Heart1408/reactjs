import React, { useContext, useRef, useState } from "react";
import { DISH_STATUS } from "../../../constants";
import { useGetListProduct, useGetListCategory } from "../../../hooks/category";
import { useAddDishToMenu } from "../../../hooks/customer/booking";
import { CustomerContext } from "../../../pages/Customer/Layout";
import { UndoOutlined } from "@ant-design/icons";
import { Select, Input, Button, List, Divider, message } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function SmoothHorizontalScrolling(e, time, amount, start) {
  var eAmt = amount / 100;
  var curTime = 0;
  var scrollCounter = 0;
  const y = window.scrollY;
  while (curTime <= time) {
    window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start, y);
    curTime += time / 100;
    scrollCounter++;
  }
  window.scrollTo(0, y);
}

function SHS_B(e, sc, eAmt, start, y) {
  e.scrollLeft = eAmt * sc + start;
}

function Menu() {
  const { onShowConfirmCustomerModel, confirmCus } =
    useContext(CustomerContext);

  const [queryParams, setQueryParams] = useState({
    search_key: "",
    sortByPrice: null,
    categoryId: null,
    status: null,
  });

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };

  const { data: dataCategoryResponse } = useGetListCategory();
  const { data: dataNewProductResponse } = useGetListProduct({
    status: DISH_STATUS.NEW,
  });
  const { data: dataProductResponse } = useGetListProduct(queryParams);
  const addDishsToMenu = useAddDishToMenu(handleResponse);

  const listCategory = dataCategoryResponse?.data;
  const newProduct = dataNewProductResponse?.data;
  const listProduct = dataProductResponse?.data;

  const addDish = (dish) => {
    if (!confirmCus) onShowConfirmCustomerModel();
    else {
      console.log(dish.id);
      addDishsToMenu.mutate(dish.id);
    }
  };

  const sortByPrice = (value) => {
    setQueryParams({
      ...queryParams,
      sortByPrice: value,
    });
  };

  const onChangeKeyword = (keyword) => {
    setQueryParams({
      ...queryParams,
      search_key: keyword,
    });
  };

  const onChangeCategory = (value) => {
    setQueryParams({
      ...queryParams,
      categoryId: value,
    });
  };

  const resetFilter = () => {
    setQueryParams({
      ...queryParams,
      sortByPrice: null,
      search_key: null,
      categoryId: null,
    });
  };

  const sliderRef = useRef();
  const itemRef = useRef();
  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        300,
        itemRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };
  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        300,
        -itemRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };

  return (
    <div className="menu-page">
      <div>
        <Slider>
          <p className="menu-title">Món mới</p>
          <Item ref={sliderRef} length={newProduct ? newProduct.length : 0}>
            {newProduct?.map((item, index) => (
              <div key={index} className="item" ref={itemRef}>
                <div class="booking-btn">
                  <button onClick={() => addDish(item)}>
                    <FontAwesomeIcon icon={faUtensils} />
                  </button>
                </div>
                <div className="img">
                  <img
                    alt="image-food"
                    src={`http://localhost:8000${item.image}`}
                  ></img>
                </div>
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="price">{item.price}đ</p>
                </div>
              </div>
            ))}
          </Item>
          <div className="btnLeft" onClick={handleScrollLeft}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <div className="btnRight" onClick={handleScrollRight}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </Slider>
      </div>
      <div className="menu-detail">
        <div className="title">
          <div className="content">
            <Divider orientation="center"> FOOD</Divider>
            <p>MENU</p>
          </div>
        </div>
        <div className="search">
          <Select
            placeholder="--Chọn món--"
            defaultValue={listCategory ? listCategory[0].id : null}
            options={listCategory?.map((item) => ({
              value: item.id,
              label: item.type,
            }))}
            onChange={(value) => onChangeCategory(value)}
          />
          <Select
            placeholder="--Giá--"
            options={[
              {
                value: "asc",
                label: "Giá tăng dần",
              },
              {
                value: "desc",
                label: "Giá giảm dần",
              },
            ]}
            onChange={(e) => sortByPrice(e)}
            value={queryParams["sortByPrice"]}
          />
          <Input
            placeholder="Tìm kiếm ..."
            onChange={(e) => onChangeKeyword(e.target.value)}
            value={queryParams["search_key"]}
          ></Input>
          <Button
            onClick={() => resetFilter()}
            type="primary"
            icon={<UndoOutlined />}
          ></Button>
        </div>
        <div className="list-product">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 3,
              md: 5,
              lg: 5,
              xl: 5,
            }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
              align: "center",
            }}
            dataSource={listProduct}
            renderItem={(item) => (
              <List.Item>
                <div className="item">
                  <div class="booking-btn">
                    <button onClick={() => addDish(item)}>
                      <FontAwesomeIcon icon={faUtensils} />
                    </button>
                  </div>
                  <div className="img">
                    <img
                      alt="image-food"
                      src={`http://localhost:8000${item.image}`}
                    ></img>
                  </div>
                  <div className="info">
                    <p className="name">{item.name}</p>
                    <p className="price">{item.price}đ</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Menu;

const Slider = styled.div`
  position: relative;
  margin: 0 6%;

  .btnLeft,
  .btnRight {
    position: absolute;
    top: 50%;
    z-index: 11;
    transfor-origin: center;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);

    svg {
      opacity: 0.7;
      font-size: 30px;
      transition: all 0.3s linear;
    }

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }

    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .btnLeft {
    left: -8px;
  }

  .btnRight {
    right: -8px;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.length}, 200px);
  // grid-template-columns: repeat(50, 200px);
  gap: 10px;
  transition: all 0.3s linear;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding: 20px 0;
  scroll-behavior: smooth;

  &:hover .item {
    opacity: 0.5;
  }

.item {
  .img {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 80%;
      opacity: 0.9;
    }
  }

  .info {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
  }

  &:hover {
    transform: scale(1.1);
    z-index: 10;
    opacity: 1;
  }
`;
