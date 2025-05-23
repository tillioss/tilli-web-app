import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import MeetSinglePerson from './MeetSinglePerson';

// Mock images and constants
jest.mock('../../images/outlineBackIcon.png', () => 'backImage');
jest.mock('../../images/outlineRightIcon.png', () => 'nextImage');
jest.mock('../../images/heart.png', () => 'heartImage');
jest.mock('../../config/MyConstant', () => ({
  keyList: {
    apiURL: 'https://api.test.com/',
  },
}));

// Create a mock Redux store
const mockStore = createStore(() => ({
  languageReducer: {
    commonGroupLanguageMappingData: {
      1: {
        fieldData: {
          1: { value: 'Hello' },
        },
      },
    },
    commonGroupLanguageBaseData: {
      1: {
        fieldData: {
          1: { value: 'Base Hello' },
        },
      },
    },
  },
}));

// Define mock props
const mockProps = {
  stage: 1,
  parentindex: 0,
  themeType: 'StoryCard',
  changeStage: jest.fn(),
  changeindex: jest.fn(),
  data: {
    title: 'Test Title',
    content: {
      color_2: '#abcdef',
      personName: 'John Doe',
      body: 'This is the body text.',
      question: 'What do you think?',
      bottomText: 'Tap to continue',
      image: {
        fileName: 'john.png',
        fileType: 'image/png',
      },
    },
  },
};

describe('MeetSinglePerson Component', () => {
  it('renders all key content and handles navigation clicks', () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MeetSinglePerson {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    // Title and content checks
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Hello John Doe')).toBeInTheDocument();
    expect(getByText('This is the body text.')).toBeInTheDocument();
    expect(getByText('What do you think?')).toBeInTheDocument();
    expect(getByText('Tap to continue')).toBeInTheDocument();

    const backButton = getByTestId("back");
    const nextButton = getByTestId("next");

    // Simulate back button click
    fireEvent.click(backButton);
    expect(mockProps.changeStage).toHaveBeenCalledWith('Previous', 0);

    // Simulate next button click
    fireEvent.click(nextButton);
    expect(mockProps.changeindex).toHaveBeenCalledWith('Next', 1);
  });
});
