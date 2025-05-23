import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WinningPage2 from './WinningPage2';

const mockStore = configureStore([]);
const mockScorePointMove = jest.fn();

const mockProps = {
  PercentageTotal: 75,
  totalPoint: 2500,
  scoreCurrentStage: 3,
  scorePointMove: mockScorePointMove,
  moduleJson: {
    stages: [
      { theme: 'StoryCard', demoPage: false, storyPoints: 200, content: [{ theme: 'DropToSelection', content: { image: { fileName: 'image1.png', fileType: 'png' } } }] },
      { theme: 'StoryCard', demoPage: false, storyPoints: 300, content: [{ theme: 'DropToSelection', content: { image: { fileName: 'image2.png', fileType: 'png' } } }] },
      { theme: 'StoryCard', demoPage: false, storyPoints: 400, content: [{ theme: 'DropToSelection', content: { image: { fileName: 'image3.png', fileType: 'png' } } }] },
    ]
  },
  innerGroupLanguageMappingData: {
    9: {
      fieldData: {
        1: { value: "Victory!" },
        2: { value: "Stage" },
        3: { value: "Try Again" },
        4: { value: "Nice try!" },
        5: { value: "Well done!" },
        6: { value: "Keep pushing!" },
        7: { value: "Great job!" },
        8: { value: "You're a star!" },
        9: { value: "Champion!" },
        10: { value: "Unstoppable!" },
        11: { value: "Points Earned" }
      }
    }
  },
  innnerGroupLanguageBaseData: {},
};

describe('WinningPage2 Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        innerGroupLanguageMappingData: mockProps.innerGroupLanguageMappingData,
        innnerGroupLanguageBaseData: {},
      }
    });
    mockScorePointMove.mockClear();
  });

  it('renders title and stage points correctly', () => {
    render(
      <Provider store={store}>
        <WinningPage2 {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Victory!')).toBeInTheDocument();
    expect(screen.getByText(/Stage 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Stage 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Stage 3/i)).toBeInTheDocument();
  });

  it('displays final card when on last stage', () => {
    const finalProps = { ...mockProps, scoreCurrentStage: 3 };
    render(
      <Provider store={store}>
        <WinningPage2 {...finalProps} />
      </Provider>
    );

    expect(screen.getByText('Unstoppable!')).toBeInTheDocument();
    expect(screen.getByText('Champion!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Champion!'));
    expect(mockScorePointMove).toHaveBeenCalledWith('try-again');
  });

  it('shows rocket image and progress bar correctly', () => {
  render(
    <Provider store={store}>
      <WinningPage2 {...mockProps} />
    </Provider>
  );

  expect(screen.getByTestId('points-earned')).toBeInTheDocument();

  const rocket = screen.getByTestId('rocket-image');
  expect(rocket).toBeInTheDocument();

  const progressBar = screen.getByTestId('progress-bar');
  expect(progressBar).toHaveStyle('width: 75%');
});


  it('handles click on story point image', () => {
  const updatedProps = { ...mockProps, scoreCurrentStage: 2 };
  render(
    <Provider store={store}>
      <WinningPage2 {...updatedProps} />
    </Provider>
  );

  const clickable = screen.getByTestId('stage-point-2');
  fireEvent.click(clickable);
  expect(mockScorePointMove).toHaveBeenCalled();
});

it('shows NinjaImage and related text when totalPoint < 1200', () => {
  const props = { ...mockProps, totalPoint: 1000 };
  render(<Provider store={store}><WinningPage2 {...props} /></Provider>);
  expect(screen.getByText('Keep pushing!')).toBeInTheDocument();
  expect(screen.getByText('Well done!')).toBeInTheDocument();
});

it('falls back to base language data if mapping data is missing', () => {
  const props = {
    ...mockProps,
    innerGroupLanguageMappingData: null,
    innnerGroupLanguageBaseData: {
      9: {
        fieldData: {
          1: { value: 'Backup Victory' },
          2: { value: 'Backup Stage' },
        }
      }
    }
  };
  store = mockStore({ languageReducer: props });
  render(<Provider store={store}><WinningPage2 {...props} /></Provider>);
  expect(screen.getByText('Backup Victory')).toBeInTheDocument();
  expect(screen.getByText(/Backup Stage 1/)).toBeInTheDocument();
});

it('does not show rocket when storyPoints is missing', () => {
  const props = {
    ...mockProps,
    moduleJson: {
      stages: [
        { theme: 'StoryCard', demoPage: false, content: [] }, // No storyPoints
      ]
    },
    scoreCurrentStage: 1,
    totalPoint: 100,
  };
  render(<Provider store={store}><WinningPage2 {...props} /></Provider>);
  expect(screen.queryByTestId('rocket-image')).not.toBeInTheDocument();
});

it('renders nothing if moduleJson is missing', () => {
  const props = { ...mockProps, moduleJson: null };
  const { container } = render(<Provider store={store}><WinningPage2 {...props} /></Provider>);
  expect(container).toBeEmptyDOMElement();
});

it('handles stage with no DropToSelection content gracefully', () => {
  const props = {
    ...mockProps,
    moduleJson: {
      stages: [
        { theme: 'StoryCard', demoPage: false, storyPoints: 150, content: [{ theme: 'OtherTheme' }] }
      ]
    },
    scoreCurrentStage: 1
  };
  render(<Provider store={store}><WinningPage2 {...props} /></Provider>);
  expect(screen.getByText(/Stage 1/)).toBeInTheDocument();
});


});
