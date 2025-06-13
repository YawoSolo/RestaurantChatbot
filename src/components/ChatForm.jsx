import { useState, useEffect } from "react";
import { Col, Button, Row, Form, Container, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import ChatHistory from "./ChatHistory";

const MENU_ITEMS = [
  {
    name: "Jollof Rice and Chicken",
    description: "A classic dish with spicy jollof rice and grilled chicken.",
  },
  {
    name: "Jollof Rice and Plantain",
    description: "A delicious combination of jollof rice and fried plantains.",
  },
  {
    name: "Fried Rice",
    description: "A flavorful dish with seasoned rice and mixed vegetables.",
  },
];

export default function ChatForm() {
  const [user] = useAuthState(auth);
  const [greeted, setGreeted] = useState(false);
  const [order, setOrder] = useState(
    MENU_ITEMS.map((item) => ({ ...item, quantity: 0 }))
  );
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  // Greeting user and showing menu on login
  useEffect(() => {
    if (user && !greeted) {
      setGreeted(true);
      setChatHistory([
        {
          type: "bot",
          message:
            "👋 Welcome! Here is our menu. Please select your items and quantities, then confirm your order.",
        },
      ]);
    }
  }, [user, greeted]);

  const handleQuantityChange = (idx, value) => {
    setOrder((order) =>
      order.map((item, i) =>
        i === idx ? { ...item, quantity: Math.max(0, Number(value)) } : item
      )
    );
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: "📝 Please review your order and click Checkout when ready.",
      },
    ]);
  };

  // Handling chat input (including confirmation)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user || userMessage.trim() === "") return;

    // If awaiting confirmation, handle yes/no
    if (awaitingConfirmation) {
      const response = userMessage.trim().toLowerCase();
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userMessage },
      ]);
      setUserMessage("");
      if (response === "yes") {
        // Save order
        setIsLoading(true);
        try {
          await addDoc(collection(db, "users", user.uid, "orders"), {
            items: pendingOrder,
            createdAt: new Date(),
            status: "new",
            userId: user.uid,
          });
          setChatHistory((prev) => [
            ...prev,
            {
              type: "bot",
              message: "✅ Order placed! You can view it in your orders.",
            },
          ]);
          setOrder(MENU_ITEMS.map((item) => ({ ...item, quantity: 0 })));
          setConfirmed(false);
        } catch (error) {
          setChatHistory((prev) => [
            ...prev,
            { type: "bot", message: "❌ Failed to place order." },
          ]);
        }
        setIsLoading(false);
        setPendingOrder(null);
        setAwaitingConfirmation(false);
        return;
      } else if (response === "no") {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            message: "Order cancelled. You can continue editing your order.",
          },
        ]);
        setPendingOrder(null);
        setAwaitingConfirmation(false);
        return;
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            message:
              "Please type 'yes' to confirm or 'no' to cancel your order.",
          },
        ]);
        return;
      }
    }

    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: userMessage },
      { type: "bot", message: "Please use the menu to place your order." },
    ]);
    setUserMessage("");
  };

  // When user clicks checkout, ask for confirmation in chat
  const handleCheckout = () => {
    const items = order.filter((item) => item.quantity > 0);
    if (items.length === 0) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: "Please select at least one item before checking out.",
        },
      ]);
      return;
    }
    const orderSummary = items
      .map((item) => `${item.name} × ${item.quantity}`)
      .join(", ");
    setPendingOrder(items);
    setAwaitingConfirmation(true);
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: `You are about to order: ${orderSummary}. Are you sure you want to place this order? Type 'yes' to confirm or 'no' to cancel.`,
      },
    ]);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex flex-column align-items-center">
            <ChatHistory chatHistory={chatHistory} />

            {/* Chat input for confirmation */}
            {awaitingConfirmation && (
              <Form onSubmit={sendMessage} className="mb-3 w-100">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Type 'yes' or 'no'..."
                      disabled={isLoading}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      Send
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}

            {/* Menu and order selection */}
            {!confirmed && !awaitingConfirmation && (
              <>
                <Form className="w-100">
                  <Table bordered className="text-center align-middle bg-white">
                    <thead>
                      <tr>
                        <th>Menu Item</th>
                        <th>Description</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((item, idx) => (
                        <tr key={item.name}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td style={{ width: "120px" }}>
                            <Form.Control
                              type="number"
                              min={0}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(idx, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form>
                <Button
                  variant="primary"
                  className="mt-2 mb-3"
                  onClick={handleConfirm}
                  disabled={order.every((item) => item.quantity === 0)}
                >
                  Confirm Selection
                </Button>
              </>
            )}

            {/* Order review and checkout */}
            {confirmed && !awaitingConfirmation && (
              <>
                <div className="mb-3">
                  <strong>
                    📝 Please review your order and click Checkout when ready.
                  </strong>
                </div>
                <ul>
                  {order
                    .filter((item) => item.quantity > 0)
                    .map((item) => (
                      <li key={item.name}>
                        {item.name} &times; {item.quantity}
                      </li>
                    ))}
                </ul>
                <Button
                  variant="success"
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="mb-1"
                >
                  Checkout
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => setConfirmed(false)}
                  disabled={isLoading}
                  className="mb-3"
                >
                  Edit Order
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
