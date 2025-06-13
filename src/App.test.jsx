import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import App from "./App";
import LoginPage from "./components/LoginPage";
import { BrowserRouter } from "react-router-dom";

// Mocking useAuthState to always return a user and not loading
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: () => [{ uid: "testuser" }, false],
}));

test("renders welcome message", () => {
  render(<App />);
  const welcomeElement = screen.getByText(
    /👋 Welcome! Here is our menu. Please select your items and quantities, then confirm your order./i
  );
  expect(welcomeElement).toBeInTheDocument();
});
