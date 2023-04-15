import React, { useContext, useState, useMemo } from "react";
import { Avatar, Alert, Space, Typography, Form, Input, Button } from "antd";
import Message from "./Message";
import "./style.scss";
import { ChatContext } from "../../../Context/ChatProvider";
import { addDocument } from "../../../firebase/service";
import useFirestore from "../../../hooks/useFirestore";

function ChatWindow() {
  const [inputValue, setInputValue] = useState("");
  const { selectedRoom } = useContext(ChatContext);
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue !== "") {
      addDocument("messages", {
        text: inputValue,
        uid: "abc123",
        photoURL: "",
        roomId: selectedRoom.id,
        displayName: "Support",
      });

      form.resetFields(["message"]);
      setInputValue("");
    }
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: !selectedRoom ? "" : selectedRoom.id,
    }),
    [!selectedRoom ? null : selectedRoom.id]
  );
  const messages = useFirestore("messages", condition);

  return (
    <>
      {selectedRoom && selectedRoom.id ? (
        <>
          <Space className="header">
            <Avatar></Avatar>
            <Typography.Text>
              {!selectedRoom ? "" : selectedRoom.name}
            </Typography.Text>
          </Space>

          <div className="content">
            {messages.map((message) => (
              <Message
                key={message.id}
                text={message.text}
                createdAt={message.createAt}
              />
            ))}

            <Form form={form}>
              <Space direction="honorizal">
                <Form.Item name="message">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onPressEnter={handleSubmit}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  Gửi
                </Button>
              </Space>
            </Form>
          </div>
        </>
      ) : (
        <Alert
          message="Chọn đoạn chat"
          type="info"
          showIcon
          style={{ margin: "5px" }}
        />
      )}
    </>
  );
}

export default ChatWindow;
