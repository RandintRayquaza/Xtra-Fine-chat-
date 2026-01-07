import Message from "./Message";

function MessagesContainer({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
      {messages.map((m) => (
        <Message key={m.id} text={m.text} isOwn={m.isOwn} />
      ))}
    </div>
  );
}

export default MessagesContainer;
