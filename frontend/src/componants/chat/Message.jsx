function Message({ text, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
          isOwn
            ? "bg-black text-white rounded-br-none"
            : "bg-white text-black rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
