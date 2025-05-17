import React, { createRef } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MeetSinglePerson from "./MeetSinglePerson";
import { BrowserRouter as Router } from "react-router-dom";

// Mock assets and constants
jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../images/heart.png", () => "heart.png");
jest.mock("../../../config/MyConstant", () => ({
  keyList: {
    apiURL: "http://localhost/",
  },
}));

const mockStore = configureStore([]);
const createComponent = (props = {}, storeState = {}) => {
  const store = mockStore({
    languageReducer: {
      commonGroupLanguageMappingData: {
        0: {
          fieldData: [{ value: "Mapped Value" }],
        },
      },
      commonGroupLanguageBaseData: {
        0: {
          fieldData: [{ value: "Base Value" }],
        },
      },
      ...storeState,
    },
  });

  return render(
    <Provider store={store}>
      <Router>
        <MeetSinglePerson {...defaultProps} {...props} />
      </Router>
    </Provider>
  );
};

const defaultProps = {
  stage: 1,
  parentindex: 2,
  themeType: "StoryCard",
  moduleJson: {
    stages: [
      { theme: "Ask Age" },
      { theme: "StoryCard" },
      { theme: "StoryCard" },
    ],
  },
  data: {
    title: "<h1>Test Title</h1>",
    content: {
      color_1: "#fff",
      color_2: "#eee",
      image: {
        json: {
          fileName: "img.png",
          fileType: "png",
        },
        fileName: "img.png",
        fileType: "png",
      },
      imageclassname: "img-class",
      imagestyle: "width:100",
      personName: "<p>Person Name</p>",
      body: "<p>Body Content</p>",
      question: "<p>Question?</p>",
      bottomText: "<span>Click me</span>",
    },
  },
  trustPointText: "Trust",
  totalPoint: 5,
  PercentageTotal: 50,
  changeScreen: jest.fn(),
  changeStage: jest.fn(),
  changeindex: jest.fn(),
};

describe("MeetSinglePerson Component", () => {
  it("renders with language mapping data", () => {
    createComponent();
    expect(screen.getByText("Person Name")).toBeInTheDocument();
    expect(screen.getByText("Body Content")).toBeInTheDocument();
    expect(screen.getByText("Question?")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles back navigation with themeType StoryCard", () => {
    createComponent();
    const backBtn = screen.getByRole("link");
    fireEvent.click(backBtn);
    expect(defaultProps.changeScreen).toHaveBeenCalledWith("Previous", 2);
  });

  it("calls changeindex on next image click", () => {
    createComponent();
    const nextImg = screen.getAllByRole("img").find(img => img.src.includes("nextImage"));
    fireEvent.click(nextImg);
    expect(defaultProps.changeindex).toHaveBeenCalledWith("Next", 1);
  });

  it("adjusts height in landscape or short screens", () => {
    global.innerWidth = 900;
    global.innerHeight = 500;
    createComponent();
    expect(screen.getByText("Person Name")).toBeInTheDocument();
  });

  it("falls back to base language data if mapping is missing", () => {
    const storeState = {
      commonGroupLanguageMappingData: {},
      commonGroupLanguageBaseData: {
        0: { fieldData: [{ value: "Base Value" }] },
      },
    };
    const store = mockStore({ languageReducer: storeState });

     const ref = createRef();

    const component = render(
      <Provider store={store}>
        <Router>
          <MeetSinglePerson {...defaultProps} ref={ref}/>
        </Router>
      </Provider>
    );
    
    const result = ref.current.return_content(0, 0);
    expect(result).toBe("Base Value");
  });

  it("returns empty string if both mapping and base data are missing", () => {
    const store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {},
      },
    });

    const ref= createRef();

    const component = render(
      <Provider store={store}>
        <Router>
          <MeetSinglePerson {...defaultProps} ref={ref}/>
        </Router>
      </Provider>
    );
   
    const result = ref.current.return_content(0, 0);
    expect(result).toBe("");
  });

  it("parses malformed imagestyle string without crashing", () => {
  const props = {
    data: {
      ...defaultProps.data,
      content: {
        ...defaultProps.data.content,
        imagestyle: "invalidJsonHere",
      },
    },
  };
  expect(() => createComponent(props)).not.toThrow();
});

it("renders image with gif type and applies full width style", () => {
  const props = {
    data: {
      ...defaultProps.data,
      content: {
        ...defaultProps.data.content,
        image: {
          json: {
            fileName: "img.gif",
            fileType: "gif",
          },
        },
      },
    },
  };
  createComponent(props);
  const img = screen.getAllByRole("img")[1]; // second image is the main content
  expect(img).toHaveStyle("width: 100%");
});

it("handles non-StoryCard theme type correctly for navigation", () => {
  const props = {
    themeType: "Basic",
    changeStage: jest.fn(),
    moduleJson: {
      stages: [{ theme: "Other" }, { theme: "Basic" }, { theme: "Different" }],
    },
  };
  const { getByRole } = createComponent(props);
  fireEvent.click(getByRole("link")); // back
  expect(props.changeStage).toHaveBeenCalledWith("Previous", 1);
});

it("adjusts borderRadius style based on window.innerHeight", () => {
  const originalHeight = window.innerHeight;

  // Simulate small height to trigger alternative branch
  window.innerHeight = 600;
  const { container } = createComponent();

  const circleContainer = container.querySelector(".col-10[style]");

  expect(circleContainer).toBeInTheDocument();

  // Since deviceHeight < 750, we expect borderRadius to match this logic:
  const inlineStyle = circleContainer.getAttribute("style");

  // Match rounded value in string
  expect(inlineStyle).toContain(`border: 2px solid #18191f; border-radius: 16px;`);

  // Restore window height
  window.innerHeight = originalHeight;
});

it("applies reduced height for landscape layout", () => {
  const originalHeight = global.innerHeight;
  const originalWidth = global.innerWidth;

  global.innerHeight = 600;
  global.innerWidth = 800;

  const { getByText } = createComponent();
  expect(getByText("Click me")).toBeInTheDocument();

  global.innerHeight = originalHeight;
  global.innerWidth = originalWidth;
});

it("clicks on bottomText instead of arrow icon", () => {
  const props = {
    changeindex: jest.fn(),
  };
  const { container } = createComponent(props);
  const bottomText = container.querySelector(".msp-btmtxt");
  fireEvent.click(bottomText);
  expect(props.changeindex).toHaveBeenCalledWith("Next", 1);
});

it("return_content returns mapped data if available", () => {
  const storeState = {
    commonGroupLanguageMappingData: {
      0: { fieldData: [{ value: "Mapped" }] },
    },
    commonGroupLanguageBaseData: {
      0: { fieldData: [{ value: "Base" }] },
    },
  };
  const store = mockStore({ languageReducer: storeState });

  const ref = createRef();

  const { container } = render(
    <Provider store={store}>
      <Router>
        <MeetSinglePerson {...defaultProps} ref={ref}/>
      </Router>
    </Provider>
  );

  const result = ref.current.return_content(0, 0);
  expect(result).toBe("Mapped");
});

it("return_content returns base data if mapping is missing", () => {
  const storeState = {
    commonGroupLanguageMappingData: {},
    commonGroupLanguageBaseData: {
      0: { fieldData: [{ value: "Base Value" }] },
    },
  };
  const store = mockStore({ languageReducer: storeState });

  const ref = createRef();

  const { container } = render(
    <Provider store={store}>
      <Router>
        <MeetSinglePerson {...defaultProps} ref={ref}/>
      </Router>
    </Provider>
  );

  const result = ref.current.return_content(0, 0);
  expect(result).toBe("Base Value");
});

it("return_content returns empty string if both mapping and base data are missing", () => {
  const store = mockStore({
    languageReducer: {
      commonGroupLanguageMappingData: {},
      commonGroupLanguageBaseData: {},
    },
  });

  const ref = createRef();

  const { container } = render(
    <Provider store={store}>
      <Router>
        <MeetSinglePerson {...defaultProps} ref={ref}/>
      </Router>
    </Provider>
  );
  
  const result = ref.current.return_content(0, 0);
  expect(result).toBe("");
});

it("calls changeindex when themeType is StoryCard (bottom text click)", () => {
  const props = {
    themeType: "StoryCard",
    changeindex: jest.fn(),
  };
  const { container } = createComponent(props);
  const bottomText = container.querySelector(".msp-btmtxt");
  fireEvent.click(bottomText);
  expect(props.changeindex).toHaveBeenCalled();
});

it("calls changeStage when themeType is NOT StoryCard (bottom text click)", () => {
  const props = {
    themeType: "Basic",
    changeStage: jest.fn(),
  };
  const { container } = createComponent(props);
  const bottomText = container.querySelector(".msp-btmtxt");
  fireEvent.click(bottomText);
  expect(props.changeStage).toHaveBeenCalled();
});

it("calls changeScreen if preStageData_2 is Ask Age or Ask Gender", () => {
  const props = {
    themeType: "StoryCard",
    changeScreen: jest.fn(),
    moduleJson: {
      stages: [
        { theme: "Ask Age" },
        { theme: "Other" },
        { theme: "StoryCard" },
      ],
    },
    parentindex: 2,
  };
  const { getByRole } = createComponent(props);
  fireEvent.click(getByRole("link"));
  expect(props.changeScreen).toHaveBeenCalledWith("Previous", 2);
});

it("renders with long layout if deviceHeight is 750+", () => {
  window.innerHeight = 850;
  const { container } = createComponent();
  const progressBar = container.querySelector(".progress-bar");
  expect(progressBar).toHaveStyle("width: 50%");
});
});
