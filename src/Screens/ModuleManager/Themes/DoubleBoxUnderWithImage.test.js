import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import DoubleBoxUnderWithImage from './DoubleBoxUnderWithImage';

// Mock image imports
jest.mock('../../../images/outlineBackIcon.png', () => 'backImage.png');
jest.mock('../../../images/outlineRightIcon.png', () => 'nextImage.png');
jest.mock('../../../config/MyConstant', () => ({
  keyList: {
    apiURL: 'http://localhost/',
  },
}));

describe('DoubleBoxUnderWithImage Component', () => {
  const mockChangeStage = jest.fn();

  const defaultProps = {
    stage: 1,
    changeStage: mockChangeStage,
    data: {
      title: 'Test Title',
      content: {
        text: 'Test text content here.',
        boxBgColor_1: '#FF89BB',
        boxBgColor_2: '#FFBD12',
        image: {
          fileName: 'testImage.png',
          fileType: 'image/png',
        },
      },
    },
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <MemoryRouter>
        <DoubleBoxUnderWithImage {...props} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and text content', () => {
    renderComponent();

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test text content here.')).toBeInTheDocument();
  });

  test('renders image if present in content', () => {
    renderComponent();

    const image = screen.getByTestId("image");
    expect(image).toHaveAttribute(
      'src',
      'http://localhost/vp?action=module&key=testImage.png&id=image/png'
    );
  });

  test('renders blank image box if image key is empty', () => {
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
    renderComponent(props);

    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(2);
  });

  test('calls changeStage with "Previous" on back button click', () => {
    renderComponent();

    const backBtn = screen.getAllByRole('link')[0];
    fireEvent.click(backBtn);

    expect(mockChangeStage).toHaveBeenCalledWith('Previous', 1);
  });

  test('calls changeStage with "Next" on next button click', () => {
    renderComponent();

    const links = screen.getAllByRole('link');
    const nextBtn = links[links.length - 1];
    fireEvent.click(nextBtn);

    expect(mockChangeStage).toHaveBeenCalledWith('Next', 1);
  });

  test('resizes on window resize event', () => {
    renderComponent();

    const initialHeight = window.innerHeight;
    window.innerHeight = 700;
    fireEvent(window, new Event('resize'));

    // You can check DOM changes if used, or just validate no error
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Restore height
    window.innerHeight = initialHeight;
  });

  test('applies pt-2 class when deviceHeight is less than 640', () => {
  // Mock innerHeight
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 600,
  });

  const { container } = render(
    <MemoryRouter>
      <DoubleBoxUnderWithImage {...defaultProps} />
    </MemoryRouter>
  );

  const targetDiv = container.querySelector('.row.ml-0.pt-2');
  expect(targetDiv).toBeInTheDocument();
});

test('applies pt-4 class when deviceHeight is greater than or equal to 640', () => {
  // Mock innerHeight
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 800,
  });

  const { container } = render(
    <MemoryRouter>
      <DoubleBoxUnderWithImage {...defaultProps} />
    </MemoryRouter>
  );

  const targetDiv = container.querySelector('.row.ml-0.pt-4');
  expect(targetDiv).toBeInTheDocument();
});
});
