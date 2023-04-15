import React from "react";
import { List, Space, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faPen,
  faXmarkCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";

function Category() {
  return (
    <List>
      <p className="title">Danh mục sản phẩm</p>
      <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
      <List.Item>
        <Space>
          <FontAwesomeIcon icon={faBowlFood} />
          <p>Đồ uống</p>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </Space>
      </List.Item>
      <List.Item>
        <Space>
          <FontAwesomeIcon icon={faBowlFood} />
          <p>Đồ uống</p>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </Space>
      </List.Item>
      <Space>
        <FontAwesomeIcon icon={faPlus} />
        <p>Thêm nhóm mới</p>
      </Space>
    </List>
  );
}

export default Category;
