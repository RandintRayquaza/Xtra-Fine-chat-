import React, { useEffect, useRef } from "react";
import Message from "./Message";

function MessagesContainer({ messages }) {
  const bottomRef = useRef(null);

  // 🔥 Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-3">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.text}
          isOwn={msg.isOwn}
        />
      ))}

      {/* scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessagesContainer;
