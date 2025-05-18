import React from 'react';
import { render, screen, act } from '@testing-library/react';
import StoryCardScreen from './StoryCardScreen';

jest.mock('./AudioQuizScreen', () => () => <div data-testid="AudioQuizScreen">AudioQuizScreen</div>);
jest.mock('./DropToSelection', () => () => <div data-testid="DropToSelection">DropToSelection</div>);
jest.mock('./MeetSinglePerson', () => () => <div data-testid="MeetSinglePerson">MeetSinglePerson</div>);

const defaultProps = {
  data: {
    content: [
      { theme: "MeetSinglePerson" },
      { theme: "AudioQuizScreen" },
      { theme: "DropToSelection" },
    ],
  },
  moduleJson: {
    stages: [
      {
        content: [
          { theme: "MeetSinglePerson" },
          { theme: "AudioQuizScreen" },
          { theme: "DropToSelection" },
        ]
      }
    ]
  },
  stage: 1,
  changeScreen: jest.fn(),
  trustPointText: "Trust",
  totalPoint: 100,
  PercentageTotal: 50,
};

class StoryCardScreenWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { force: 0 };
  }

  setIndex = (index) => {
    this.ref.current.setState({ checkindex: index }, () => {
      this.setState({ force: this.state.force + 1 });
    });
  };

  callChangeIndex = (type, index) => {
    this.ref.current.changeindex(type, index);
    this.setState({ force: this.state.force + 1 });
  };

  render() {
    return (
      <>
        <StoryCardScreen {...this.props} ref={this.ref} />
        <button onClick={() => this.setIndex(0)} data-testid="set-meet">Meet</button>
        <button onClick={() => this.setIndex(1)} data-testid="set-audio">Audio</button>
        <button onClick={() => this.setIndex(2)} data-testid="set-drop">Drop</button>
        <button onClick={() => this.callChangeIndex("Next", 1)} data-testid="next">Next</button>
        <button onClick={() => this.callChangeIndex("Previous", 2)} data-testid="prev">Previous</button>
        <button onClick={() => this.callChangeIndex("Next", 2)} data-testid="next-last">NextLast</button>
      </>
    );
  }
}

describe("StoryCardScreen", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders MeetSinglePerson at index 0", () => {
    render(<StoryCardScreenWrapper {...defaultProps} />);
    act(() => screen.getByTestId("set-meet").click());
    expect(screen.getByTestId("MeetSinglePerson")).toBeInTheDocument();
  });

  it("renders AudioQuizScreen at index 1", () => {
    render(<StoryCardScreenWrapper {...defaultProps} />);
    act(() => screen.getByTestId("set-audio").click());
    expect(screen.getByTestId("AudioQuizScreen")).toBeInTheDocument();
  });

  it("renders DropToSelection at index 2", () => {
    render(<StoryCardScreenWrapper {...defaultProps} />);
    act(() => screen.getByTestId("set-drop").click());
    expect(screen.getByTestId("DropToSelection")).toBeInTheDocument();
  });

  it("calls changeScreen when on last index and Next is clicked", () => {
    render(<StoryCardScreenWrapper {...defaultProps} />);
    act(() => screen.getByTestId("set-drop").click());
    act(() => screen.getByTestId("next-last").click());
    expect(defaultProps.changeScreen).toHaveBeenCalledWith("Next", 1);
  });

  it("changes index from 2 to 1 when Previous is clicked", () => {
    render(<StoryCardScreenWrapper {...defaultProps} />);
    act(() => screen.getByTestId("set-drop").click());
    act(() => screen.getByTestId("prev").click());
    expect(screen.getByTestId("AudioQuizScreen")).toBeInTheDocument();
  });

  it("sets index to last on mount if PreviousPages is true", () => {
    const propsWithPrev = { ...defaultProps, PreviousPages: true };
    render(<StoryCardScreenWrapper {...propsWithPrev} />);
    expect(screen.getByTestId("DropToSelection")).toBeInTheDocument();
  });
});
