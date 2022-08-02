import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders title of the project", () => {
  render(<App />);
  const linkElement = screen.getByText("COUNTRIES");
  expect(linkElement).toBeInTheDocument();
});

test("Renders the Start button", () => {
  render(<App />);
  const linkElement = screen.getByText("Start");
  expect(linkElement).toBeInTheDocument();
});
