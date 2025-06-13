import "./ChatHistory.css";

export default function ChatHistory({ chatHistory }) {
  return (
    <div className="chat-history mb-2">
      {chatHistory.map((chat, index) => (
        <div
          className={`chat-bubble ${chat.type === "user" ? "user" : "bot"}`}
          key={index}
        >
          <span className="chat-author">
            {chat.type === "user" ? "You" : "RESTAURANTBOT"}
          </span>
          {chat.message}
        </div>
      ))}
    </div>
  );
}
