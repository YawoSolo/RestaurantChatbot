import { Card } from "react-bootstrap";
export default function ChatHistory({ chatHistory }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Text>
          {chatHistory.map((chat, index) => (
            <span
              style={{ display: "block" }}
              className={
                chat.type === "user"
                  ? "text-muted bg-body-tertiary p-2 rounded"
                  : "text-dark bg-body-secondary p-2 rounded"
              }
              key={index}
            >
              <strong>
                {chat.type === "user" ? "You:  " : "RESTAURANTBOT:  "}
              </strong>
              {chat.message}
            </span>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
