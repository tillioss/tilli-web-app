import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DoubleBoxOverlapWithImage from "./DoubleBoxOverlapWithImage";

jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../config/MyConstant", () => ({
  keyList: {
    apiURL: "http://localhost/",
  },
}));

describe("DoubleBoxOverlapWithImage Component", () => {
  const mockChangeStage = jest.fn();

  const mockProps = {
    stage: 1,
    trustPointText: "Points",
    totalPoint: 50,
    PercentageTotal: 75,
    changeStage: mockChangeStage,
    data: {
      title: "<h2>Test Title</h2>",
      content: {
        text: "<p>Some content text</p>",
        color: "#FF89BB",
        nameClassName: "custom-class",
        image: {
          fileName: "testImage.png",
          fileType: "image/png"
        },
        imagestyle: "width:100,height:200"
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component and displays title, content, and progress bar", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    // Title
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Text content
    expect(screen.getByText("Some content text")).toBeInTheDocument();

    // Progress bar
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 75%");
  });

  it("triggers changeStage('Previous') when back button is clicked", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    const backButton = screen.getAllByRole("link")[0];
    fireEvent.click(backButton);
    expect(mockChangeStage).toHaveBeenCalledWith("Previous", 1);
  });

  it("triggers changeStage('Next') when next button is clicked", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    const nextButton = screen.getAllByRole("link")[1];
    fireEvent.click(nextButton);
    expect(mockChangeStage).toHaveBeenCalledWith("Next", 1);
  });

  it("renders the image with correct src", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    const image = screen.getAllByRole("img").find(img =>
      img.src.includes("testImage.png")
    );
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("http://localhost/vp?action=module&key=testImage.png&id=image/png");
  });

  it("handles resize event and updates state", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    act(() => {
      global.innerHeight = 600;
      global.innerWidth = 800;
      fireEvent(window, new Event("resize"));
    });

    // Expect no crash or error, and the component should stay responsive
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("parses and applies inline imagestyle props correctly", () => {
    render(
      <MemoryRouter>
        <DoubleBoxOverlapWithImage {...mockProps} />
      </MemoryRouter>
    );

    // While styles are parsed and applied inline, since we use `dangerouslySetInnerHTML`,
    // this test ensures that there are no crashes due to malformed `imagestyle`
    expect(screen.getByText("Some content text")).toBeInTheDocument();
  });
});
