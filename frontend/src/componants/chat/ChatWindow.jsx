import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import { getSocket } from "../../socket/socket";

function ChatWindow({ selectedUser, onBack }) {
  const { authUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const activeChatRef = useRef(null);

  useEffect(() => {
    activeChatRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    axios
      .get(
        `https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/messages/${selectedUser._id}`,
        { withCredentials: true }
      )
      .then((res) =>
        setMessages(
          res.data.messages.map((m) => ({
            id: m._id,
            text: m.message,
            isOwn: m.senderId === authUser._id,
            senderId: m.senderId,
            receiverId: m.receiverId,
          }))
        )
      );
  }, [selectedUser, authUser]);

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

    await axios.post(
      `https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/messages/sendmessage/${selectedUser._id}`,
      { message: text },
      { withCredentials: true }
    );
  };

  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full min-h-[100dvh] md:min-h-0 bg-[#F7F5FF]">
      <div className="h-16 px-4 flex items-center gap-3 border-b bg-white">
        <button onClick={onBack} className="md:hidden">
          <ArrowLeft />
        </button>
        <span className="font-semibold">{selectedUser.username}</span>
      </div>

      <MessagesContainer messages={messages} />
      <MessageInput onSend={sendMessage} />
    </section>
  );
}

export default ChatWindow;
