import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import { getSocket } from "../../socket/socket";
import api from "../../lib/api";

function ChatWindow({ selectedUser, onBack }) {
  const { authUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const activeChatRef = useRef(null);

  // 🔁 Keep active chat ref updated
  useEffect(() => {
    activeChatRef.current = selectedUser;
  }, [selectedUser]);

  // 📥 LOAD MESSAGES (CENTRALIZED API)
  useEffect(() => {
    if (!selectedUser?._id) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${selectedUser._id}`);
        setMessages(
          res.data.messages.map((m) => ({
            id: m._id,
            text: m.message,
            isOwn: m.senderId === authUser._id,
            senderId: m.senderId,
            receiverId: m.receiverId,
          }))
        );
      } catch (err) {
        console.error("Failed to load messages");
      }
    };

    fetchMessages();
  }, [selectedUser, authUser]);

  // 🔥 REAL-TIME RECEIVE
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onReceive = (m) => {
      const active = activeChatRef.current;
      if (!active) return;

      if (m.senderId === active._id || m.receiverId === active._id) {
        setMessages((prev) => {
          if (prev.some((x) => x.id === m._id)) return prev;

          return [
            ...prev,
            {
              id: m._id,
              text: m.message,
              isOwn: m.senderId === authUser._id,
              senderId: m.senderId,
              receiverId: m.receiverId,
            },
          ];
        });
      }
    };

    socket.on("receiveMessage", onReceive);
    return () => socket.off("receiveMessage", onReceive);
  }, [authUser]);

  // 📤 SEND MESSAGE (OPTIMISTIC UI)
  const sendMessage = async (text) => {
    if (!selectedUser) return;

    const tempId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        text,
        isOwn: true,
        senderId: authUser._id,
        receiverId: selectedUser._id,
      },
    ]);

    try {
      await api.post(`/messages/sendmessage/${selectedUser._id}`, {
        message: text,
      });
    } catch (err) {
      console.error("Message send failed");
    }
  };

  // 📴 NO CHAT SELECTED
  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full min-h-[100dvh] md:min-h-0 bg-[#F7F5FF]">
      {/* HEADER */}
      <div className="h-16 px-4 flex items-center gap-3 border-b bg-white">
        <button onClick={onBack} className="md:hidden">
          <ArrowLeft />
        </button>
        <span className="font-semibold">{selectedUser.username}</span>
      </div>

      {/* MESSAGES */}
      <MessagesContainer messages={messages} />

      {/* INPUT */}
      <MessageInput onSend={sendMessage} />
    </section>
  );
}

export default ChatWindow;
