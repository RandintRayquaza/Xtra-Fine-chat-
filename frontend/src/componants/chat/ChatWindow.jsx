import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getSocket } from "../../socket/socket";

function ChatWindow({ selectedUser }) {
  const { authUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const activeChatRef = useRef(null);

  useEffect(() => {
    activeChatRef.current = selectedUser;
  }, [selectedUser]);

  // load history
  useEffect(() => {
    if (!selectedUser) return;

    const load = async () => {
      const res = await axios.get(
        `https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/messages/${selectedUser._id}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages);
    };

    load();
  }, [selectedUser]);

  // realtime listener
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onReceive = (message) => {
      const active = activeChatRef.current;
      if (!active) return;

      if (
        message.senderId === active._id ||
        message.receiverId === active._id
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", onReceive);
    return () => socket.off("receiveMessage", onReceive);
  }, []);

  if (!selectedUser) {
    return <div className="p-6 text-gray-400">Select a chat</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m._id}>{m.message}</div>
        ))}
      </div>
      <MessageInput receiverId={selectedUser._id} />
    </div>
  );
}

export default ChatWindow;
