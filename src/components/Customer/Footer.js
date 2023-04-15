import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Space } from "antd";

function Footer() {
  return (
    <section className="footer">
      <h2>CÔNG TY ABC</h2>
      <p>Địa chỉ: </p>
      <p>Hotline 1: 0916.121.222</p>
      <p>Hotline 1: 0916.121.111</p>
      <Space>
        <FontAwesomeIcon icon={faFacebookSquare} />
        <FontAwesomeIcon icon={faInstagramSquare} />
        <FontAwesomeIcon icon={faTiktok} />
      </Space>
    </section>
  );
}

export default Footer;
