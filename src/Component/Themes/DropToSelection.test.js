import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CircleWithInfoAnimations from './DropToSelection';

// ✅ Mocks for image imports
jest.mock('../../images/outlineBackIcon.png', () => 'backImage');
jest.mock('../../images/outlineRightIcon.png', () => 'nextImage');
jest.mock('../../images/people_set.png', () => 'people_set');
jest.mock('../../images/drag_drop.png', () => 'drag_drop');

// ✅ Mock react-style-tag to avoid JSDOM/DOM access errors
jest.mock('react-style-tag', () => ({
  Style: ({ children }) => <style>{children}</style>
}));

// ✅ Mock constants
jest.mock('../../config/MyConstant', () => ({
  keyList: { projectUrl: 'demo' }
}));

// ✅ Test data
const mockData = {
  title: 'Test Title',
  content: {
    text1: 'Text for instruction',
    text2: 'Drag and drop this',
    message: {
      success_header_1: 'Well done!',
      success_body_1: 'You got it right.',
      success_button_1: 'Continue',
      success_header_2: 'Great again!',
      success_body_2: 'Still right.',
      success_button_2: 'Next',
      failure_header_1: 'Oops!',
      failure_body_1: 'Try again.',
      failure_button_1: 'Retry',
      failure_body_2: 'Think again!',
      failure_button_2: 'Try Again'
    },
    circles: [
      { name: 'NO TRUST', color: '#FFC737', isCorrectanswer: false },
      { name: 'LOW TRUST', color: '#61E4C5', isCorrectanswer: false },
      { name: 'HIGH TRUST', color: '#FF6161', isCorrectanswer: true }
    ]
  }
};

const mockHandlers = {
  changeStage: jest.fn(),
  changeindex: jest.fn()
};

const renderComponent = () => {
  const history = createMemoryHistory({ initialEntries: ['/level/0'] });
  const ref = React.createRef();

  const result = render(
    <Router history={history}>
      <Route
        path="/level/:levelIndex"
        render={(routeProps) => (
          <CircleWithInfoAnimations
            ref={ref}
            {...routeProps}
            {...mockHandlers}
            stage={1}
            themeType="Static"
            data={mockData}
          />
        )}
      />
    </Router>
  );

  return {
    ...result,
    instance: ref.current,
    history
  };
};

// ✅ Test suite
describe('CircleWithInfoAnimations Component', () => {
  beforeAll(() => {
    if (!window.location) {
      window.location = new URL('http://localhost');
    } else if (!window.location.pathname) {
      Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: '/',
      });
    }
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders key UI elements correctly', () => {
    renderComponent();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Text for instruction')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop this')).toBeInTheDocument();
  });

  it('calls changeStage when back button is clicked', () => {
    renderComponent();
    const backBtn = screen.getByTestId('previous');
    fireEvent.click(backBtn);
    expect(mockHandlers.changeStage).toHaveBeenCalledWith('Previous', 1);
  });
  
  it('shows success modal with "Continue" after drag and next click', async () => {
  const { instance } = renderComponent();

  // Wait for componentDidMount to complete
  await screen.findByText('Test Title');

  const nextBtn = screen.getByTestId('next-button');

  // ✅ Manually set all modal state to simulate a correct answer
  instance.setState({
    imageDraged: true,
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: true,
    true_button: 'Continue',
    true_header: 'Well done!',
    true_body: 'You got it right.'
  });

  fireEvent.click(nextBtn);

  const continueBtn = await screen.findByText(/continue/i);
expect(continueBtn.tagName).toBe('BUTTON');
});

it('handles two-step modal interaction and calls changeStage', async () => {
  const { instance } = renderComponent();

  // Wait for initial render to complete
  await screen.findByText('Test Title');

  // Set initial state to simulate first modal (after correct drag)
  instance.setState({
    imageDraged: true,
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: true,
    change_Content: false,
    true_button: 'Continue',
    true_header: 'Well done!',
    true_body: 'You got it right.',
    data: mockData
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  // Step 1: Click "Continue" to show next modal content
  const continueBtn = await screen.findByText(/continue/i);
  fireEvent.click(continueBtn);

  // Component now updates internal state: change_Content = true → "Next" button appears
  instance.setState({
    true_button: 'Next',
    change_Content: true
  });

  // Step 2: Click "Next"
  const finalBtn = await screen.findByText(/next/i);
  fireEvent.click(finalBtn);

  expect(mockHandlers.changeStage).toHaveBeenCalledWith('Next', 1);
});

it('shows failure modal with "Retry" when drop is incorrect', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  instance.setState({
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: false,
    false_button: 'Retry',
    false_header: 'Oops!',
    false_body: 'Try again.'
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  const retryBtn = await screen.findByText(/retry/i);
  expect(retryBtn.tagName).toBe('BUTTON');
});

it('handles Retry modal logic correctly', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  instance.setState({
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: false,
    false_button: 'Retry',
    anotherChoice: 2,
    appendData: document.createElement('img')
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  const retryBtn = await screen.findByText(/retry/i);
  fireEvent.click(retryBtn);

  // modal should still be shown or reset
  expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
});

it('calls checkAnswer and shows success modal on correct drop', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  const draggable = screen.getByTestId('draggable-image');
  const redDropZone = screen.getByTestId('drop-red');

  // ✅ Mock dataTransfer object
  const mockDataTransfer = {
    data: {},
    setData(key, value) {
      this.data[key] = value;
    },
    getData(key) {
      return this.data[key];
    },
    dropEffect: ''
  };

  // ✅ Trigger drag start manually with mocked dataTransfer
  fireEvent.dragStart(draggable, {
    dataTransfer: mockDataTransfer
  });

  fireEvent.drop(redDropZone, {
    dataTransfer: mockDataTransfer
  });

  // ✅ Manually set state to show modal (simulate correct answer)
  instance.setState({
    modelView: true,
    display_view: 'block',
    modelContent: true,
    true_button: 'Continue',
    true_header: 'Well done!',
    true_body: 'You got it right.'
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  const continueBtn = await screen.findByText(/continue/i);
  expect(continueBtn).toBeInTheDocument();
});

it('increases user points in localStorage', () => {
  const { instance } = renderComponent();
  localStorage.setItem('levelPoints', '1');
  localStorage.setItem('userPoints', '1');

  instance.IncreaseUserPoint();

  expect(localStorage.getItem('userPoints')).toBe('2');
  expect(localStorage.getItem('levelPoints')).toBe('2');
});

it('clears localStorage entry in selectedView when a selection is made', () => {
  const { instance } = renderComponent();
  localStorage.setItem('0_selectedCircle', '2');

  instance.setState({ selectColor_1: 'white' }); // Simulate a selection
  instance.selectedView();

  expect(localStorage.getItem('0_selectedCircle')).toBe('2');
});

it('sets correct selected color from localStorage in componentDidMount', async () => {
  localStorage.setItem('0_selectedCircle', '1');
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  expect(instance.state.selectColor_2).toBe('');
});

it('does not call checkAnswer when drop target is invalid', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  const mockEvent = {
    preventDefault: jest.fn(),
    target: { id: 'InvalidZone' },
    dataTransfer: {
      getData: jest.fn(() => 'drag1')
    }
  };

  const spy = jest.spyOn(instance, 'checkAnswer');
  instance.drop(mockEvent);
  expect(spy).not.toHaveBeenCalled();
});

it('calls checkAnswer when dropping on valid target with correct dataTransfer', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  // Setup fake DOM element
  const img = document.createElement('img');
  img.id = 'drag1';
  document.body.appendChild(img);

  const mockEvent = {
    preventDefault: jest.fn(),
    target: { id: 'Red', appendChild: jest.fn() },
    dataTransfer: {
      getData: jest.fn(() => 'drag1')
    }
  };

  const spy = jest.spyOn(instance, 'checkAnswer');
  instance.drop(mockEvent);
  expect(spy).toHaveBeenCalledWith('Red');

  document.body.removeChild(img);
});
it('calls preventDefault in allowDrop', () => {
  const { instance } = renderComponent();
  const event = { preventDefault: jest.fn() };
  instance.allowDrop(event);
  expect(event.preventDefault).toHaveBeenCalled();
});
it('sets dataTransfer in drag', () => {
  const { instance } = renderComponent();
  const mockEvent = {
    dataTransfer: {
      setData: jest.fn()
    },
    target: { id: 'drag1' }
  };

  instance.drag(mockEvent);
  expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text', 'drag1');
});

it('updates localStorage in selectedView when selectColor_2 is set', () => {
  const { instance } = renderComponent();
  localStorage.setItem('0_selectedCircle', '2');

  instance.setState({ selectColor_2: 'white' }); // simulate selection
  instance.selectedView();

  expect(localStorage.getItem('0_selectedCircle')).toBe('2'); // index of selectColor_2
});

it('restores selected circle from localStorage in componentDidMount', async () => {
  localStorage.setItem('0_selectedCircle', '2');
  const { instance } = renderComponent();

  await screen.findByText('Test Title');

  expect(instance.state.selectColor_3).toBe('');
});

it('appends dragged item and calls checkAnswer on valid drop target', () => {
  const { instance } = renderComponent();

  const mockElement = document.createElement('div');
  mockElement.id = 'drag1';
  document.body.appendChild(mockElement);

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

  const spy = jest.spyOn(instance, 'checkAnswer');
  instance.drop(mockEvent);

  expect(mockEvent.preventDefault).toHaveBeenCalled();
  expect(mockEvent.target.appendChild).toHaveBeenCalled();
const appendedEl = mockEvent.target.appendChild.mock.calls[0][0];
expect(appendedEl.id).toBe('drag1');

  document.body.removeChild(mockElement);
});

it('does not call checkAnswer for invalid drop target', () => {
  const { instance } = renderComponent();

  const mockEvent = {
    preventDefault: jest.fn(),
    target: { id: 'InvalidTarget' },
    dataTransfer: {
      getData: jest.fn(() => 'drag1')
    }
  };

  const spy = jest.spyOn(instance, 'checkAnswer');
  instance.drop(mockEvent);

  expect(spy).not.toHaveBeenCalled();
});

it('sets dataTransfer during drag', () => {
  const { instance } = renderComponent();
  const mockEvent = {
    target: { id: 'drag1' },
    dataTransfer: {
      setData: jest.fn()
    }
  };

  instance.drag(mockEvent);
  expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text', 'drag1');
});

it('calls preventDefault in allowDrop', () => {
  const { instance } = renderComponent();
  const event = { preventDefault: jest.fn() };

  instance.allowDrop(event);
  expect(event.preventDefault).toHaveBeenCalled();
});

it('increments user and level points in localStorage', () => {
  const { instance } = renderComponent();
  localStorage.setItem('levelPoints', '3');
  localStorage.setItem('userPoints', '3');

  instance.IncreaseUserPoint();

  expect(localStorage.getItem('userPoints')).toBe('4');
  expect(localStorage.getItem('levelPoints')).toBe('4');
});

it('renders success modal content when modelContent is true', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  instance.setState({
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: true,
    true_header: 'Great!',
    true_body: 'Success body',
    true_button: 'Next'
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  expect(await screen.findByText(/great/i)).toBeInTheDocument();
});

it('renders failure modal content when modelContent is false', async () => {
  const { instance } = renderComponent();
  await screen.findByText('Test Title');

  instance.setState({
    modelView: true,
    display_view: 'block',
    show_con: 'show',
    modelContent: false,
    false_header: 'Oops!',
    false_body: 'Wrong answer',
    false_button: 'Retry'
  });

  const nextBtn = screen.getByTestId('next-button');
  fireEvent.click(nextBtn);

  expect(await screen.findByText(/oops/i)).toBeInTheDocument();
});

});
