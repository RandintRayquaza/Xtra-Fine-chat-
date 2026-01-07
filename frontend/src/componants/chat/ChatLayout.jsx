import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="fixed inset-0 flex">
      <div className="w-72 border-r">
        <Sidebar onSelectUser={setSelectedUser} />
      </div>

      <div className="flex-1">
        <ChatWindow
          selectedUser={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default ChatLayout;
