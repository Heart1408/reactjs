import React, { createContext, useState } from "react";

export const FeedbackContext = createContext();

function FeedbackProvider({ children }) {
  const [unreadFeedbackCount, setUnreadFeedbackCount] = useState(0);

  return (
    <FeedbackContext.Provider
      value={{ unreadFeedbackCount, setUnreadFeedbackCount }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackProvider;
