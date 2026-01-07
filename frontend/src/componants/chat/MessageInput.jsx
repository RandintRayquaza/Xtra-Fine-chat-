import { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="sticky bottom-0 p-3 bg-white border-t flex gap-2">
      <input
        className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Type a message…"
      />
      <button
        onClick={send}
        className="px-4 py-2 rounded-full bg-black text-white"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
