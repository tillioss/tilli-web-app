import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./Theme";

test("renders Level Manager component", () => {
  render(
    <Router>
      <Theme />
    </Router>
  );
});
