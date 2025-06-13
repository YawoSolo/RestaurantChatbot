import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Footer from "./Footer";

test("renders copyright", () => {
  render(<Footer />);
  expect(
    screen.getByText(/Built By YawoDev ©2025/i)
  ).toBeInTheDocument();
});