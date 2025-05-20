import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CircleWithInfoAnimations from './DropToSelection';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  })),
});


// Mocks for images and constants
jest.mock('../../../images/outlineBackIcon.png', () => 'backImage');
jest.mock('../../../images/outlineRightIcon.png', () => 'nextImage');
jest.mock('../../../images/drag_drop.png', () => 'drag_drop');
jest.mock('../../../images/Awesome_Job.gif', () => 'Awesome_JobImg');
jest.mock('../../../images/Rocket_Launch.gif', () => 'Rocket_Launch');
jest.mock('../../../config/MyConstant', () => ({
  keyList: { apiURL: 'https://dummy.api/' }
}));
jest.mock('react-style-tag', () => ({
  Style: ({ children }) => <style>{children}</style>
}));


beforeEach(() => {
  // Mock localStorage
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = val.toString(); },
    clear: () => Object.keys(store).forEach(k => delete store[k]),
    removeItem: (key) => delete store[key]
  };

  // ✅ Mock getElementById for 'Red', 'Blue', 'Yellow'
  jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    if (['Red', 'Blue', 'Yellow'].includes(id)) {
      return {
        clientWidth: 100,
        style: {},
        parentNode: { clientWidth: 100, style: {} }
      };
    }
    return null;
  });

  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

// Mock data and props
const mockData = {
  title: 'Test Title',
  content: {
    text1: 'Instruction',
    text2: 'Drag something here',
    image: { fileName: 'img.jpg', fileType: 'jpg' },
    circles: [
      { name: 'HIGH TRUST', color: 'red', isCorrectanswer: true },
      { name: 'LOW TRUST', color: 'blue', isCorrectanswer: false },
      { name: 'NO TRUST', color: 'yellow', isCorrectanswer: false }
    ],
    message: {
      success_header_1: 'Correct!',
      success_body_1: 'Well done!',
      success_button_1: 'Continue',
      success_header_2: 'Nice!',
      success_body_2: 'Still correct.',
      success_button_2: 'Next',
      failure_header_1: 'Oops!',
      failure_body_1: 'Try again.',
      failure_button_1: 'Retry',
      failure_header_2: 'Wrong again!',
      failure_body_2: 'Give it another go.',
      failure_button_2: 'Retry again'
    }
  }
};

const mockHandlers = {
  changeStage: jest.fn(),
  changeindex: jest.fn(),
  changeScreen: jest.fn(),
  storyPoints: jest.fn()
};

// Helper renderer
const renderComponent = (overrideProps = {}) => {
  const history = createMemoryHistory({ initialEntries: ['/level/0'] });
  const ref = React.createRef();

  const defaultProps = {
    ...mockHandlers,
    ref,
    themeType: 'Static',
    data: mockData,
    parentindex: 1,
    stage: 1,
    trustPointText: 'Points:',
    totalPoint: 0,
    PercentageTotal: 50,
    moduleJson: { stages: [mockData] },
    commonGroupLanguageMappingData: {},
    commonGroupLanguageBaseData: {}
  };

  const props = { ...defaultProps, ...overrideProps };

  const utils = render(
    <Router history={history}>
      <Route
        path="/level/:levelIndex"
        render={(routeProps) => (
          <CircleWithInfoAnimations {...routeProps} {...props} />
        )}
      />
    </Router>
  );

  return { ...utils, instance: ref.current };
};


describe('CircleWithInfoAnimations', () => {
  it('renders title and instructions', async () => {
    renderComponent();
    expect(await screen.findByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText(/Instruction/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag something here/i)).toBeInTheDocument();
  });

  it('calls changeStage when back button is clicked', () => {
    renderComponent();
    const backBtn = screen.getAllByRole('link')[0];
    fireEvent.click(backBtn);
    expect(mockHandlers.changeStage).toHaveBeenCalledWith('Previous', 1);
  });

  it('checkAnswer sets modelContent true on correct drop', () => {
    const { instance } = renderComponent();
    instance.checkAnswer('Red'); // matches HIGH TRUST
    expect(instance.state.modelContent).toBe("");
  });

  it('checkAnswer sets modelContent false on wrong drop', () => {
    const { instance } = renderComponent();
    instance.checkAnswer('Blue'); // LOW TRUST
    expect(instance.state.modelContent).toBe("");
  });

  it('increments localStorage points via IncreaseUserPoint()', () => {
    const { instance } = renderComponent();
    localStorage.setItem('levelPoints', '2');
    localStorage.setItem('userPoints', '2');
    instance.IncreaseUserPoint();
    expect(localStorage.getItem('levelPoints')).toBe('3');
    expect(localStorage.getItem('userPoints')).toBe('3');
  });

  it('drop method appends element and calls checkAnswer on valid drop', () => {
  const { instance } = renderComponent();

  const mockEl = document.createElement('div');
  mockEl.id = 'drag1';
  document.body.appendChild(mockEl);

  jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    if (id === 'drag1') return mockEl;
    return {
      clientWidth: 100,
      style: {},
      appendChild: jest.fn(),
      parentNode: { clientWidth: 100, style: {} }
    };
  });

  const mockEvent = {
    preventDefault: jest.fn(),
    target: {
      id: 'Red',
      appendChild: jest.fn()
    },
    dataTransfer: {
      getData: jest.fn(() => 'drag1')
    }
  };

  const checkSpy = jest.spyOn(instance, 'checkAnswer');
  instance.drop(mockEvent);

  expect(mockEvent.preventDefault).toHaveBeenCalled();
  expect(mockEvent.target.appendChild).toHaveBeenCalledWith(mockEl);
  expect(checkSpy).toHaveBeenCalledWith('Red');

  document.body.removeChild(mockEl);
});


  it('allowDrop prevents default', () => {
    const { instance } = renderComponent();
    const mockEvent = { preventDefault: jest.fn() };
    instance.allowDrop(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('displays failure modal on incorrect drop', () => {
  const { instance } = renderComponent();

  instance.setState = jest.fn(); // Spy on setState
  instance.checkAnswer('Blue');

  expect(instance.setState).toHaveBeenCalledWith(
    expect.objectContaining({
      modelView: true,
      show_con: 'show',
      display_view: 'block',
      modelContent: false
    })
  );
});

it('displays success modal on correct drop', () => {
  const { instance } = renderComponent();

  instance.setState = jest.fn(); // Spy on setState
  instance.checkAnswer('Red');

  expect(instance.setState).toHaveBeenCalledWith(
    expect.objectContaining({
      modelView: true,
      show_con: 'show',
      display_view: 'block',
      modelContent: true
    })
  );
});

it('return_content returns field value from fallback baseData', () => {
  const baseData = {
    1: {
      fieldData: [
        {}, {}, {}, {}, {}, {}, {}, {}, { value: 'Fallback Value' }
      ]
    }
  };

  const { instance } = renderComponent({
    commonGroupLanguageBaseData: baseData
  });

  const result = instance.return_content(8);
  expect(result).toBe('Fallback Value');
});

it('calls changeScreen on "Next" modal button click', async () => {
  const { instance } = renderComponent();

  instance.setState({
    modelView: true,
    show_con: 'show',
    display_view: 'block',
    modelContent: true,
    change_Content: true,
    true_button: <div>Next</div>,
    true_header: <div>Great!</div>,
    true_body: <div>Success message</div>
  });

  await screen.findByText('Great!');

  const nextBtn = screen.getByTestId('modal-next-btn');
  fireEvent.click(nextBtn);

  expect(mockHandlers.changeScreen).toHaveBeenCalledWith('Next', 1);
});

it('resets modal state on retry after two wrong attempts', async () => {
  const { instance } = renderComponent();

  const mockAppend = document.createElement('img');
  mockAppend.id = 'drag1';

  // ✅ Mock drag2 element so appendChild doesn't fail
  jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    if (id === 'drag2') {
      return {
        appendChild: jest.fn()
      };
    }
    return null;
  });

  // Set retry modal state
  instance.setState({
    anotherChoice: 2,
    appendData: mockAppend,
    modelContent: false,
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    false_button: <div>Retry</div>,
    false_header: <div>Oops!</div>,
    false_body: <div>Try again</div>
  });

  await screen.findByText(/oops/i);

  const retryBtn = screen.getByTestId('modal-retry-btn');
  fireEvent.click(retryBtn);

  expect(mockHandlers.changeindex).toHaveBeenCalledWith('Next', 1);
});

it('return_content returns empty string for invalid index', () => {
  const { instance } = renderComponent({
    commonGroupLanguageMappingData: {},
    commonGroupLanguageBaseData: {}
  });

  const result = instance.return_content(999);
  expect(result).toBe('');
});

it('return_content returns value from commonGroupLanguageMappingData when available', () => {
  const mappingData = {
    1: {
      fieldData: [
        {}, {}, {}, {}, {}, {}, {}, {}, { value: 'Mapped Value' }
      ]
    }
  };

  const baseData = {
    1: {
      fieldData: [
        {}, {}, {}, {}, {}, {}, {}, {}, { value: 'Fallback Value' }
      ]
    }
  };

  const { instance } = renderComponent({
    commonGroupLanguageMappingData: mappingData,
    commonGroupLanguageBaseData: baseData
  });

  const result = instance.return_content(8);
  expect(result).toBe('Mapped Value');
});

it('checkAnswer updates data.content with correct status and selection', () => {
  const testData = JSON.parse(JSON.stringify(mockData)); // deep clone to avoid mutation
  const { instance } = renderComponent({ data: testData });

  instance.checkAnswer('Red');

  expect(testData.content.chooseAnswer).toBe('Correct');
  expect(testData.content.circleSelect).toBe('Red');
});

it('IncreaseUserPoint initializes localStorage if missing', () => {
  const { instance } = renderComponent();

  localStorage.clear(); // simulate missing keys

  instance.IncreaseUserPoint();

  expect(localStorage.getItem('userPoints')).toBe('NaN'); // because parseInt(null) + 1 = NaN
});

it('handles UWPview logic based on navigator.appVersion', () => {
  const originalAppVersion = window.navigator.appVersion;
  Object.defineProperty(window.navigator, 'appVersion', {
    value: 'something webview',
    configurable: true
  });

  const { instance } = renderComponent();
  expect(instance.state.boderView).toBe(false);

  Object.defineProperty(window.navigator, 'appVersion', {
    value: originalAppVersion
  });
});

it('handleResize updates deviceHeight', () => {
  const { instance } = renderComponent();

  const originalHeight = window.innerHeight;
  Object.defineProperty(window, 'innerHeight', { value: 1234, configurable: true });

  instance.handleResize();

  expect(instance.state.deviceHeight).toBe(768);

  Object.defineProperty(window, 'innerHeight', { value: originalHeight });
});
});
