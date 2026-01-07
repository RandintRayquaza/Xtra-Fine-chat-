import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatLayout() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default ChatLayout;
