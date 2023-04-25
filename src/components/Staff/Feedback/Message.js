import React from "react";
import { Typography } from "antd";
import { formatRelative } from "date-fns";

function formatDate(seconds) {
  let formatDate = "";

  if (seconds) {
    formatDate = formatRelative(new Date(seconds * 1000), new Date());
    formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  }

  return formatDate;
}

function Message({ text, createdAt }) {
  return (
    <div>
      <div>
        <Typography.Text>{formatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div>
        <Typography.Text>{text}</Typography.Text>
      </div>
    </div>
  );
}

export default Message;
