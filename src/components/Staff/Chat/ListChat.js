import React, { useContext } from "react";
import { Input, Avatar, Typography, Space } from "antd";
import { ChatContext } from "../../../Context/ChatProvider";

const { Search } = Input;

function ListChat() {
  const { rooms, setSelectedRoomId } = useContext(ChatContext);
  // console.log("rooms");

  return (
    <Space direction="vertical">
      <Search
        placeholder="Tìm kiếm..."
        allowClear
        // onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      {rooms.map((room) => (
        <Typography.Link className="userlink" key={room.id} onClick={()=>setSelectedRoomId(room.id)}>
          <Avatar src=" " />
          <Typography.Text>{room.name}</Typography.Text>
        </Typography.Link>
      ))}
    </Space>
  );
}

export default ListChat;
