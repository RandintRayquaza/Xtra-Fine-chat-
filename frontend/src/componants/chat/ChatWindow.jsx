import React, { useState } from "react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey 👋", isOwn: false },
    { id: 2, text: "Hi! How are you?", isOwn: true },
  ]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        isOwn: true,
      },
    ]);
  };

  return (
    <section className="flex flex-col h-full w-full bg-white">
      {/* CHAT HEADER */}
      <div className="h-16 px-6 flex items-center border-b border-black/10 flex-shrink-0">
        <h2 className="font-semibold text-gray-900">Chat</h2>
      </div>

      {/* MESSAGES (THIS MUST FLEX) */}
      <div className="flex-1 overflow-hidden bg-[#F7F5FF]">
        <MessagesContainer messages={messages} />
      </div>

      {/* INPUT (FIXED HEIGHT) */}
      <div className="flex-shrink-0">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </section>
  );
}

export default ChatWindow;
