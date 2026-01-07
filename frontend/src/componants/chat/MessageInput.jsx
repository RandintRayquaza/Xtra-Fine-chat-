import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getSocket } from "../../socket/socket";

function MessageInput({ receiverId }) {
  const [text, setText] = useState("");
  const { authUser } = useSelector((state) => state.user);

  const send = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      `https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/messages/sendmessage/${receiverId}`,
      { message: text },
      { withCredentials: true }
    );

    const socket = getSocket();
    socket.emit("sendMessage", {
      receiverId,
      message: res.data.newMessage,
    });

    setText("");
  };

  return (
    <div className="p-3 border-t flex gap-2">
      <input
        className="flex-1 border px-3 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default MessageInput;
