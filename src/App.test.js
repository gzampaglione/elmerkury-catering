import { render, screen } from "@testing-library/react";
import App from "./App";

const setUrl = (search) =>
  window.history.replaceState({}, "", `/${search}`);

beforeEach(() => setUrl(""));

test("renders the homepage by default", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /toggle customer context/i })
  ).toBeInTheDocument();
});

test("deep link with a valid order number opens the edit order screen", () => {
  setUrl("?view=editOrder&order=EM-20251007-001");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /edit order/i })
  ).toBeInTheDocument();
});

test("deep link with a malformed order number falls back to the homepage", () => {
  setUrl("?view=editOrder&order=%0d%0aSet-Cookie:%20x%3D1");
  render(<App />);
  expect(
    screen.getByRole("button", { name: /toggle customer context/i })
  ).toBeInTheDocument();
});
