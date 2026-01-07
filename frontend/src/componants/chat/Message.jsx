import React from "react";

function Message({ text, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-xs px-4 py-2 text-sm rounded-2xl
          ${
            isOwn
              ? "bg-black text-white rounded-br-none"
              : "bg-white text-gray-900 border border-black/10 rounded-bl-none"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
