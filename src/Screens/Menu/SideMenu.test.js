import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideMenu from "./SideMenu";
import { keyList } from "../../config/MyConstant";

describe("SideMenu tests", () => {
  it("renders the component without errors", () => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );

    expect(screen.getByText("Tilli")).toBeInTheDocument();
  });

  it("navigates to Level page when Level link is clicked", () => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );

    screen.getByText("Level").click();
    expect(window.location.pathname).toBe("/" + keyList.projectUrl + "/Level");
  });

  it("navigates to Theme page when Theme link is clicked", () => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );

    screen.getByText("Theme").click();

    expect(window.location.pathname).toBe("/" + keyList.projectUrl + "/Theme");
  });

  it("navigates to ImageManager page when Image Manager link is clicked", () => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );

    screen.getByText("Image Manager").click();
    expect(window.location.pathname).toBe(
      "/" + keyList.projectUrl + "/ImageManager"
    );
  });
});
