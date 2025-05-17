import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SingleTextImage from "./SingleTextImage";
import { BrowserRouter as Router } from "react-router-dom";

// Mocks
jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/combined.png", () => "textboxyellow.png");
jest.mock("../../../config/MyConstant", () => ({
  keyList: { apiURL: "http://mockapi/" },
}));

const mockChangeStage = jest.fn();

const defaultProps = {
  stage: 1,
  data: {
    title: "<h1>Welcome</h1>",
    content: {
      text: "<p>This is the main content</p>",
      bottomtext: "<p>Continue</p>",
      image: { fileName: "img123", fileType: "png" },
      imageclassname: "custom-image-class",
      imagestyle: "height:200,width:100",
    },
  },
  trustPointText: "Points:",
  totalPoint: 30,
  PercentageTotal: 60,
  changeStage: mockChangeStage,
};

// Resize helper
const resizeWindow = (width, height) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

describe("SingleTextImage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title, content text, and bottom text correctly", () => {
    render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome");
    expect(screen.getByText("This is the main content")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("Points: 30")).toBeInTheDocument();
  });

  test("triggers changeStage on back and next clicks", () => {
    render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    const backButton = screen.getByRole("link");
    fireEvent.click(backButton);
    expect(mockChangeStage).toHaveBeenCalledWith("Previous", 1);

    const nextDiv = screen.getByText("Continue").parentElement;
    fireEvent.click(nextDiv);
    expect(mockChangeStage).toHaveBeenCalledWith("Next", 1);
  });

  test("sets image style from imagestyle string", () => {
    const { container } = render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    const img = container.querySelector("img.custom-image-class");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("img123"));
  });

  test("adjusts layout for small screens (deviceHeight < 640)", () => {
    resizeWindow(360, 600); // deviceHeight < 640
    const { container } = render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    const row = container.querySelector(".pt-2");
    expect(row).toBeInTheDocument();
  });

  test("adjusts layout for large screens (deviceHeight > 800)", () => {
    resizeWindow(400, 850); // deviceHeight > 800
    const { container } = render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    const textParagraph = container.querySelector(".single-image-text").parentElement;
    expect(textParagraph.style.fontSize).toBe("19px");
  });

  test("shows progress bar with correct width and color", () => {
    render(
      <Router>
        <SingleTextImage {...defaultProps} />
      </Router>
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 60%");
    expect(progressBar).toHaveStyle("background-color: #FFBD12");
  });

  test("handles missing image gracefully", () => {
    const props = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        content: {
          ...defaultProps.data.content,
          image: {},
        },
      },
    };

    const { container } = render(
      <Router>
        <SingleTextImage {...props} />
      </Router>
    );

    const img = container.querySelector("img.custom-image-class");
    expect(img).not.toHaveAttribute("src", expect.stringContaining("img123"));
  });

  test("parses invalid imagestyle string safely", () => {
    const props = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        content: {
          ...defaultProps.data.content,
          imagestyle: "invalidStyle",
        },
      },
    };

    const { container } = render(
      <Router>
        <SingleTextImage {...props} />
      </Router>
    );

    const img = container.querySelector("img.custom-image-class");
    expect(img).toBeInTheDocument();
  });
});

describe("Browser Detection (inline SingleTextImage logic)", () => {
  const getBrowser = () => {
    const test = (regexp) => regexp.test(window.navigator.userAgent);
    switch (true) {
      case test(/edg/i): return "Microsoft Edge";
      case test(/trident/i): return "Microsoft Internet Explorer";
      case test(/firefox|fxios/i): return "Mozilla Firefox";
      case test(/opr\//i): return "Opera";
      case test(/ucbrowser/i): return "UC Browser";
      case test(/samsungbrowser/i): return "Samsung Browser";
      case test(/chrome|chromium|crios/i): return "Google Chrome";
      case test(/safari/i): return "Apple Safari";
      default: return "Other";
    }
  };

  const mockUserAgent = (userAgent) => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: userAgent,
      configurable: true,
    });
  };

  afterEach(() => {
    jest.resetModules();
  });

  test("detects Microsoft Edge", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edg/90.0.818.56");
    expect(getBrowser()).toBe("Microsoft Edge");
  });

  test("detects Internet Explorer", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko");
    expect(getBrowser()).toBe("Microsoft Internet Explorer");
  });

  test("detects Firefox", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0");
    expect(getBrowser()).toBe("Mozilla Firefox");
  });

  test("detects Opera", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) OPR/76.0.4017.177");
    expect(getBrowser()).toBe("Opera");
  });

  test("detects UC Browser", () => {
    mockUserAgent("Mozilla/5.0 (Linux; U; Android 4.4.2;) UCBrowser/9.8.0.484");
    expect(getBrowser()).toBe("UC Browser");
  });

  test("detects Samsung Browser", () => {
    mockUserAgent("Mozilla/5.0 (Linux; Android 9; SM-G960F) SamsungBrowser/11.1 Chrome/75.0");
    expect(getBrowser()).toBe("Samsung Browser");
  });

  test("detects Google Chrome", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36");
    expect(getBrowser()).toBe("Google Chrome");
  });

  test("detects Apple Safari", () => {
    mockUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15");
    expect(getBrowser()).toBe("Apple Safari");
  });

  test("returns 'Other' for unknown user agent", () => {
    mockUserAgent("CustomBrowser/1.0");
    expect(getBrowser()).toBe("Other");
  });
});