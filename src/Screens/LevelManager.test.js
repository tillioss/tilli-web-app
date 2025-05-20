import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LevelManager from "./LevelManager";

test("renders Level Manager component", () => {
  render(
    <Router>
      <LevelManager />
    </Router>
  );
});
