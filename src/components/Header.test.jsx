import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Header from "./Header";

// Mocking useAuthState to return a user
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: () => [{ displayName: "Test User" }, false],
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({ pathname: "/chat" }),
    Link: (props) => <a {...props} />,
  };
});

test("renders brand, welcome message, Orders button, and Logout button when logged in", () => {
  render(<Header />);
  expect(screen.getByText(/RestaurantBOT/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome Test User/i)).toBeInTheDocument();
  expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});