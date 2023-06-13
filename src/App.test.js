import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App", () => {
  test("renders without errors", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});
