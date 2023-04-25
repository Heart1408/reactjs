// import React, { createContext, useState, useMemo } from "react";
// import useFirestore from "../hooks/useFirestore";

// export const ChatContext = createContext();

// function ChatProvider({ children }) {
//   const [selectedRoomId, setSelectedRoomId] = useState("");
//   const rooms = useFirestore("rooms", null);
//   const selectedRoom = useMemo(
//     () => rooms.find((room) => room.id === selectedRoomId),
//     [rooms, selectedRoomId]
//   );

//   return (
//     <ChatContext.Provider
//       value={{ rooms, selectedRoomId, setSelectedRoomId, selectedRoom }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// }

// export default ChatProvider;
