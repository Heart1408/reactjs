import React, { useContext, useRef } from "react";
import { UndoOutlined } from "@ant-design/icons";
import { Select, Input, Button, List, Divider } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const images = [
  "/images/food1.png",
  "/images/food2.png",
  "/images/drink1.png",
  "/images/drink2.png",
  "/images/drink3.png",
  "/images/food2.png",
  "/images/drink1.png",
  "/images/drink2.png",
  "/images/food1.png",
  "/images/food2.png",
];

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
  const sliderRef = useRef();
  const itemRef = useRef();
  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    // console.log(maxScrollLeft);
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

  const list_product = [];
  for (let i = 1; i < 9; i++) {
    list_product.push({
      key: i,
      image: "/images/drink.jpg",
    });
  }

  return (
    <div className="menu-page">
      <div>
        <Slider>
          <p className="menu-title">Món mới</p>
          <Item ref={sliderRef}>
            {images.map((image, index) => (
              <div key={index} className="item" ref={itemRef}>
                <div class="booking-btn">
                  <button>
                    <FontAwesomeIcon icon={faUtensils} />
                  </button>
                </div>
                <div className="img">
                  <img alt="image-food" src={image}></img>
                </div>
                <div className="info">
                  <p className="name">Name</p>
                  <p className="price">100.000d</p>
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
            placeholder="--Danh mục--"
            options={[
              {
                value: 1,
                label: "Đồ uống",
              },
              {
                value: 2,
                label: "Món chính",
              },
            ]}
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
          />
          <Input placeholder="Tìm kiếm ..."></Input>
          <Button type="primary" icon={<UndoOutlined />}></Button>
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
            dataSource={list_product}
            renderItem={(item) => (
              <List.Item>
                <div className="item">
                  <div class="booking-btn">
                    <button>
                      <FontAwesomeIcon icon={faUtensils} />
                    </button>
                  </div>
                  <div className="img">
                    <img alt="image-food" src={item.image}></img>
                  </div>
                  <div className="info">
                    <p className="name">Nước ép cam</p>
                    <p className="price">40.000đ</p>
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
  grid-template-columns: repeat(${images.length}, 200px);
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
