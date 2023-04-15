import React from "react";
import Chat from "../../components/Staff/Chat";
import ChatProvider from "../../Context/ChatProvider";

const ChatPage = () => {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
};

export default ChatPage;
