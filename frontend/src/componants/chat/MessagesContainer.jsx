import React from "react";
import Message from "./Message";

function MessagesContainer({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#F7F5FF] space-y-2">
      {messages.map((msg) => (
        <Message key={msg.id} text={msg.text} isOwn={msg.isOwn} />
      ))}
    </div>
  );
}

export default MessagesContainer;
