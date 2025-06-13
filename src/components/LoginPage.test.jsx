import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

// Mocking useAuthState to return no user
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: () => [null, false],
}));

// Mocking useNavigate
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders animated welcome and Google sign-in button", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  expect(
    screen.getByText(/welcome to restaurant-bot/i)
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /sign in with google/i })
  ).toBeInTheDocument();
});