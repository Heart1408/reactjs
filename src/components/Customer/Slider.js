import React, { useContext, useRef } from "react";
import {} from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const images = [
  "/images/food1.png",
  "/images/food2.png",
  "/images/drink1.png",
  "/images/drink2.png",
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

function Slide() {
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

  return (
    <Slider>
      <h1 className="title">title</h1>
      <Item ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index} className="item" ref={itemRef}>
            <div className="img">
              <img alt="image-food" src={image}></img>
            </div>
            <div className="name">Name</div>
          </div>
        ))}
      </Item>
      <div className="btnLeft" onClick={handleScrollLeft}>
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </div>
      <div className="btnRight" onClick={handleScrollRight}>
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </div>
    </Slider>
  );
}

export default Slide;

const Slider = styled.div`
  position: relative;
  margin: 0 6%;

  .heading {
  }

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
    left: -15px;
  }

  .btnRight {
    right: -15px;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(${images.length}, 300px);
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
  position: relative;
  transform: scale(1);
  max-width: 300px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  transition: all 0.3s linear;
  user-select: none;
  overflow: hidden;
  border-radius: 6px;
  transform: center left;
  border: 1px solid black;

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 80%;
    }
  }

  .name {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }

  &:hover {
    transform: scale(1.1);
    z-index: 10;
    opacity: 1;
  }
`;
