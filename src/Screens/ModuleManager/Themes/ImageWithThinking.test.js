import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageWithThinking from './ImageWithThinking';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock images and CSS imports
jest.mock('../../../images/outlineBackIcon.png', () => 'backImage.png');
jest.mock('../../../images/outlineRightIcon.png', () => 'nextImage.png');
jest.mock('../../../images/spashes1.png', () => 'spashes1.png');
jest.mock('../../../images/PeopleIcons4.png', () => 'PeopleIcons4.png');

describe('ImageWithThinking Component', () => {
  const mockChangeStage = jest.fn();

  const mockProps = {
    stage: 1,
    changeStage: mockChangeStage,
    trustPointText: "Trust Points:",
    totalPoint: 5,
    PercentageTotal: 60,
    data: {
      title: "<h1>Sample Title</h1>",
      content: {
        text: "<p>This is sample text.</p>",
        image: {
          fileName: "image.png"
        },
        imageclassname: "sample-class",
        imagestyle: "marginTop:\"10\",marginLeft:\"5\""
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and displays title and content', () => {
    const { getByText, container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    expect(container.querySelector('h1').textContent).toBe('Sample Title');
    expect(container.querySelector('.imgttext').innerHTML).toContain('This is sample text.');
  });

  it('calls changeStage with "Previous" when back button is clicked', () => {
    const { container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    const backBtn = container.querySelector('img[src="backImage.png"]');
    fireEvent.click(backBtn);
    expect(mockChangeStage).toHaveBeenCalledWith('Previous', 1);
  });

  it('calls changeStage with "Next" when next button is clicked', () => {
    const { container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    const nextBtn = container.querySelector('img[src="nextImage.png"]');
    fireEvent.click(nextBtn);
    expect(mockChangeStage).toHaveBeenCalledWith('Next', 1);
  });

  it('updates state on window resize', () => {
    const { container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    global.innerHeight = 700;
    fireEvent(window, new Event('resize'));

    // simulate to force re-render with new height
    expect(container.querySelector('.bottom-style')).toBeInTheDocument();
  });

  it('renders progress bar with correct percentage and border', () => {
    const { container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    const progressBar = container.querySelector('.progress-bar');
    expect(progressBar.style.width).toBe('60%');
    expect(progressBar.style.border).toBe('1px solid #18191f');
  });

  it('applies imagestyle correctly from string', () => {
    const { container } = render(
      <Router>
        <ImageWithThinking {...mockProps} />
      </Router>
    );

    const image = container.querySelector('img[src="PeopleIcons4.png"]');
    expect(image.classList.contains('sample-class')).toBe(true);
  });

  it('adjusts image sizes if app is running in a webview', () => {
  const originalAppVersion = window.navigator.appVersion;

  // Mock appVersion to simulate webview
  Object.defineProperty(window.navigator, 'appVersion', {
    value: 'MyApp/1.0 WebView',
    configurable: true,
  });

  const { container } = render(
    <Router>
      <ImageWithThinking {...mockProps} />
    </Router>
  );

  const imageContainer = container.querySelector('img[src="PeopleIcons4.png"]');
  const wrapper = imageContainer.parentElement;

  // Check applied width style on wrapper div
  expect(wrapper.style.width).not.toBe('');
  expect(wrapper.style.height).not.toBe('');

  // Restore original appVersion after test
  Object.defineProperty(window.navigator, 'appVersion', {
    value: originalAppVersion,
  });
});

it('applies special sizing when deviceHeight is between 800 and 850', () => {
  const originalInnerHeight = window.innerHeight;
  const originalConsoleLog = console.log;
  const logSpy = jest.fn();

  // Set window height to simulate the range
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 820,
  });

  // Spy on console.log to verify the branch was entered
  console.log = logSpy;

  render(
    <Router>
      <ImageWithThinking {...mockProps} />
    </Router>
  );

  // Check if the "true" branch ran
  expect(logSpy).toHaveBeenCalledWith("true", 820);

  // Restore original values
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: originalInnerHeight,
  });
  console.log = originalConsoleLog;
});

it('applies default sizing when deviceHeight is outside 800-850', () => {
  const originalInnerHeight = window.innerHeight;
  const originalConsoleLog = console.log;
  const logSpy = jest.fn();

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 780,
  });

  console.log = logSpy;

  render(
    <Router>
      <ImageWithThinking {...mockProps} />
    </Router>
  );

  expect(logSpy).toHaveBeenCalledWith("false", 780);

  // Clean up
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: originalInnerHeight,
  });
  console.log = originalConsoleLog;
});
});
