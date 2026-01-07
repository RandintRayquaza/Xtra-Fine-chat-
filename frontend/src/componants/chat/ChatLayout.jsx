import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="fixed inset-0 flex bg-white">
      {/* SIDEBAR */}
      <div
        className={`
          ${selectedUser ? "hidden md:block" : "block"}
          w-full md:w-80
          h-screen
          border-r
        `}
      >
        <Sidebar onSelectUser={setSelectedUser} />
      </div>

      {/* CHAT */}
      <div
        className={`
          ${selectedUser ? "block" : "hidden md:flex"}
          flex-1
          h-screen
          bg-[#F7F5FF]
        `}
      >
        <ChatWindow
          selectedUser={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default ChatLayout;
