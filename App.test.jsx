import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./src/App";
test("renders welcome message", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});
