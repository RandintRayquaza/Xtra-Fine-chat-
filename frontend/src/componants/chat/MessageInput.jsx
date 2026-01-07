import React, { useState } from "react";
import { Send } from "lucide-react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 bg-white border-t border-black/10 flex gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="
          flex-1 px-4 py-3 rounded-xl
          border border-black/10
          focus:outline-none focus:ring-2 focus:ring-black/10
        "
      />
      <button
        onClick={handleSend}
        className="px-4 rounded-xl bg-black text-white"
      >
        <Send size={18} />
      </button>
    </div>
  );
}

export default MessageInput;
