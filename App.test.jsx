import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import App from "./src/App";
import LoginPage from "./src/components/LoginPage";
import { BrowserRouter } from "react-router-dom";

// Mocking useAuthState to always return a user and not loading
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: () => [{ uid: "testuser" }, false],
}));

test("renders welcome message", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});

// test("renders sign in message", () => {
//   render(
//     <BrowserRouter>
//       <LoginPage />
//     </BrowserRouter>
//   );
//   const greetings = screen.getAllByText((content) =>
//     content.includes("Sign in with Google")
//   );
//   expect(greetings[0]).toBeInTheDocument();
// });
