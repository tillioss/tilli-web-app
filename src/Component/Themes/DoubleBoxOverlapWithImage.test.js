import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DoubleBoxOverlapWithImage from './DoubleBoxOverlapWithImage';

jest.mock('../../config/MyConstant', () => ({
  keyList: { apiURL: 'http://api/' },
}));

jest.mock('react-router-dom', () => ({
  Link: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
}));

describe('DoubleBoxOverlapWithImage', () => {
  const defaultProps = {
    stage: 5,
    changeStage: jest.fn(),
    data: {
      title: 'Test Title',
      content: {
        text: 'Overlap Text',
        image: { fileName: 'file1', fileType: 'jpg' },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.innerHeight = 800;
    window.innerWidth = 600;
  });

  const renderComponent = (props = {}) =>
      render(<DoubleBoxOverlapWithImage {...defaultProps} {...props} />);

  it('renders the title', () => {
    const { getByText } = renderComponent();
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the content text inside the pink box', () => {
    const { getByText, container } = renderComponent();
    const textEl = getByText('Overlap Text');
    expect(textEl).toBeInTheDocument();
    expect(textEl.closest('.pink')).toHaveClass('pink');
  });

  it('renders the yellow box behind the pink box', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.yellow')).toBeInTheDocument();
  });

  it('renders the image with correct src and computed width', () => {
    const { container } = renderComponent();
    const imgs = container.querySelectorAll('img');

    const contentImg = imgs[1];
    expect(contentImg.src).toBe(
        'http://api/vp?action=module&key=file1&id=jpg'
    );
    expect(contentImg).toHaveStyle('width: 160px');
  });

  it('calls changeStage("Previous", stage) when back arrow is clicked', () => {
    const { container } = renderComponent();
    const backBtn = container.querySelector('.col-2 > div');
    fireEvent.click(backBtn);

    expect(defaultProps.changeStage)
        .toHaveBeenCalledWith('Previous', defaultProps.stage);
  });

  it('calls changeStage("Next", stage) when forward arrow is clicked', () => {
    const { container } = renderComponent();
    const nextBtn = container.querySelector('.forward-step > div');
    fireEvent.click(nextBtn);
    expect(defaultProps.changeStage).toHaveBeenCalledWith(
        'Next',
        defaultProps.stage
    );
  });

  it('applies correct marginTop style to the boxes container', () => {
    const { container } = renderComponent();
    const wrapper = Array.from(container.querySelectorAll('div')).find(
        (d) => d.style.marginTop === '80px'
    );
    expect(wrapper).toBeTruthy();
  });
});
