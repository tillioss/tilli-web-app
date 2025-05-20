import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageWithThinking from './ImageWithThinking';

jest.mock('react-router-dom', () => ({
  Link: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
}));

describe('ImageWithThinking', () => {
  const defaultProps = {
    stage: 3,
    changeStage: jest.fn(),
    data: {
      title: 'Thinking Title',
      content: { text: 'Here is a thought bubble' },
    },
  };

  const renderComponent = (props = {}) => {
    window.innerWidth = 600;
    return render(<ImageWithThinking {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title text', () => {
    const { getByText } = renderComponent();
    expect(getByText('Thinking Title')).toBeInTheDocument();
  });

  it('renders the thought text inside the styled box with spashes1 background', () => {
    const { container } = renderComponent();

    const thoughtBox = container.querySelector('.font-17-14');
    expect(thoughtBox).toBeInTheDocument();

    expect(thoughtBox.style.backgroundImage).toContain('spashes1');

    expect(thoughtBox.textContent).toBe('Here is a thought bubble');
  });

  it('renders the PeopleIcons4 image with correct dimensions', () => {
    const { container } = renderComponent();
    const iconImg = Array.from(container.querySelectorAll('img')).find((img) =>
        img.src.includes('PeopleIcons4')
    );
    expect(iconImg).toBeTruthy();

    const wrapper = iconImg.parentElement;
    expect(wrapper.style.borderRadius).toBe(`${window.innerWidth / 1.6}px`);
    expect(parseFloat(iconImg.style.width)).toBeCloseTo(window.innerWidth / 1.3);
  });

  it('calls changeStage("Previous", stage) when back arrow is clicked', () => {
    const { container } = renderComponent();
    const backBtn = container.querySelector('.col-2 > div');
    fireEvent.click(backBtn);
    expect(defaultProps.changeStage).toHaveBeenCalledWith('Previous', 3);
  });

  it('calls changeStage("Next", stage) when forward arrow is clicked', () => {
    const { container } = renderComponent();
    const nextBtn = container.querySelector('.forward-step > div');
    fireEvent.click(nextBtn);
    expect(defaultProps.changeStage).toHaveBeenCalledWith('Next', 3);
  });
});
