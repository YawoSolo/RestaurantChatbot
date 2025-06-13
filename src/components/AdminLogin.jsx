import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem("admin", "true");
      navigate("/admin/orders");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Card className="p-4 mt-5 mb-3 mx-auto" style={{ maxWidth: 400 }}>
      <Card.Title className="mb-3 text-center">Admin Login</Card.Title>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <div className="text-danger mb-2">{error}</div>}
        <Button type="submit" variant="primary" className="w-100">
          Login
        </Button>
      </Form>
    </Card>
  );
}