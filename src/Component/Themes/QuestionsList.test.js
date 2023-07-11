import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import QuestionsList from "./QuestionsList";

describe("QuestionsList", () => {
  test("renders the component with question data", () => {
    const data = {
      title: "Questions List",
      content: {
        questionTitle: "Choose a question:",
        questionList: [
          {
            question: "What is your favorite color?",
            color: "#FF0000",
          },
          {
            question: "What is your favorite food?",
            color: "#00FF00",
          },
        ],
      },
    };

    render(
      <Router>
        <QuestionsList data={data} stage="stage" changeStage={() => {}} />
      </Router>
    );

    expect(screen.getByText("Choose a question:")).toBeInTheDocument();

    expect(
      screen.getByText("What is your favorite color?")
    ).toBeInTheDocument();
    expect(screen.getByText("What is your favorite food?")).toBeInTheDocument();
  });
});
