import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import CircleWithInfoAnimations from './CircleWithInfoAnimations';

// Mock Link from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, onClick, ...props }) => (
    <div onClick={onClick} data-testid={props['data-testid'] || 'mock-link'}>
      {children}
    </div>
  ),
}));

jest.useFakeTimers();

const defaultProps = {
  stage: 0,
  changeStage: jest.fn(),
  data: {
    title: 'Test Title',
    content: {
      text: [
        { value: 'Test Line 1', style: {} },
        { value: 'Test Line 2', style: { color: 'blue' } },
      ],
      circles: [
        { name: 'Inner Circle', color: '#ff0000' },
        { name: 'Middle Circle', color: '#00ff00' },
        { name: 'Outer Circle', color: '#0000ff' },
      ],
      image: { fileName: 'testImage', fileType: 'png' },
    },
  },
};

describe('CircleWithInfoAnimations', () => {
  let ref;
  let instance;

  beforeEach(() => {
    ref = React.createRef();
    render(
      <MemoryRouter>
        <CircleWithInfoAnimations {...defaultProps} ref={ref} />
      </MemoryRouter>
    );
    instance = ref.current;
  });

  test('renders title and text content', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Line 1')).toBeInTheDocument();
    expect(screen.getByText('Test Line 2')).toBeInTheDocument();
  });

  test('initial state is correct', () => {
    expect(instance.state.currentIndex).toBe(0);
    expect(instance.state.ImageView).toBe(false);
    expect(instance.state.showIcon).toBe(true);
  });

  test('increments currentIndex after timeout', () => {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(instance.state.currentIndex).toBe(1);
  });

  test('renders circle names after currentIndex = 1', () => {
    act(() => {
      instance.setState({ currentIndex: 1 });
    });

    expect(screen.getByTestId('circle-name-1')).toHaveTextContent('Inner Circle');
    expect(screen.getByTestId('circle-name-2')).toHaveTextContent('Middle Circle');
    expect(screen.getByTestId('circle-name-3')).toHaveTextContent('Outer Circle');
  });

  test('back button triggers changeStage with "Previous"', () => {
    const backButton = screen.getByTestId('back-link');
    fireEvent.click(backButton);
    expect(defaultProps.changeStage).toHaveBeenCalledWith('Previous', 0);
  });

  test('forward button toggles ImageView on first click', () => {
    act(() => {
      instance.setState({ currentIndex: 1 });
    });

    const forwardLink = screen.getByTestId('forward-link');
    fireEvent.click(forwardLink);
    expect(instance.state.ImageView).toBe(true);
  });

  test('forward button triggers changeStage on second click', () => {
    act(() => {
      instance.setState({ currentIndex: 1, ImageView: true });
    });

    const forwardLink = screen.getByTestId('forward-link');
    fireEvent.click(forwardLink);
    expect(defaultProps.changeStage).toHaveBeenCalledWith('Next', 0);
  });

  test('image overlay can be closed by clicking icon', () => {
  act(() => {
    instance.setState({ currentIndex: 1, ImageView: 1, showIcon: true });
  });

  const overlayClose = screen.getByTestId('overlay-close');
  fireEvent.click(overlayClose);

  expect(instance.state.showIcon).toBe(false);
});
});
