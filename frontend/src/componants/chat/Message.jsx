function Message({ text, isOwn }) {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[75%] md:max-w-[60%]
          px-4 py-2
          rounded-2xl
          text-sm
          break-words
          whitespace-pre-wrap
          ${
            isOwn
              ? "bg-black text-white rounded-br-md"
              : "bg-white text-black border rounded-bl-md"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
