import React from "react";

export default function Banner(props) {
  return (
    <div className="menu-page">
      <div className="banner">
        <div className="content">
          <img src="/images/chef.png"></img>
          <div>
            <p className="cus-name">
              Xin chào, <span>{props.customerName}</span> !
            </p>
            <p>Tham khảo menu tại nhà hàng chúng tôi.</p>
          </div>
        </div>
        <div className="image">
          <img src="/images/OIP.jpg"></img>
        </div>
      </div>
      <div className="category">
        <a>Món chính</a>
        <a>Tráng miệng</a>
        <a>Salad</a>
        <a>Đồ uống</a>
      </div>
    </div>
  );
}
