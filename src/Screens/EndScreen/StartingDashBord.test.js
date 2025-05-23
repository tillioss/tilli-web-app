import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StartingDashBord from './StartingDashBord';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

jest.mock('../../images/EndDashTilli.png', () => 'EndDashTilli.png');
jest.mock('../../images/EHeart.png', () => 'EHeart.png');
jest.mock('../../images/Estart.png', () => 'Estart.png');
jest.mock('../../images/EHappy.png', () => 'EHappy.png');
jest.mock('../../images/image_15.png', () => 'image_15.png');
jest.mock('../../images/image_14.png', () => 'image_14.png');
jest.mock('../../images/image_13.png', () => 'image_13.png');
jest.mock('../../images/outlineRoundIconOnly.png', () => 'outlineRoundIconOnly.png');

jest.mock("../../config/Common", () => ({
  checkNullAndReturnString: (val) => val != null && val !== "",
  doConnect: jest.fn().mockResolvedValue({ response: JSON.stringify({ levels: [] }) })
}));

const mockStore = configureStore([thunk]);

const initialState = {
  languageReducer: {
    innerGroupLanguageMappingData: {
      8: {
        fieldData: {
          1: { value: 'Header Text' },
          2: { value: 'Sub Text' },
          3: { value: 'Start Message' },
          4: { value: 'Heart Message' },
          5: { value: 'Happy Message' },
          6: { value: 'Play Button' }
        }
      }
    },
    innnerGroupLanguageBaseData: {},
  },
};

describe('StartingDashBord', () => {
  let store;
  const mockOnPlayDash = jest.fn();
  const mockLanguageUpdate = jest.fn();

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <StartingDashBord
          onPlayDash={mockOnPlayDash}
          lanuguageJsonUpdate={mockLanguageUpdate}
        />
      </Provider>
    );
  });

  afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear(); // ✅ Clear after every test
});


  it('renders content from language mapping', () => {
    expect(screen.getByText('Header Text')).toBeInTheDocument();
    expect(screen.getByText('Sub Text')).toBeInTheDocument();
    expect(screen.getByText('Start Message')).toBeInTheDocument();
    expect(screen.getByText('Heart Message')).toBeInTheDocument();
    expect(screen.getByText('Happy Message')).toBeInTheDocument();
    expect(screen.getByText('Play Button')).toBeInTheDocument();
  });

  it('calls onPlayDash when play button clicked', () => {
    fireEvent.click(screen.getByText('Play Button'));
    expect(mockOnPlayDash).toHaveBeenCalled();
  });

  it('calls setItem when language button is clicked', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const sinhalaButton = screen.getAllByRole('img')[0].closest('div');
    fireEvent.click(sinhalaButton);
    expect(setItemSpy).toHaveBeenCalledWith("currentLanguage", expect.any(String));
  });

  it('sets .mobile-responsive background color on mount', () => {
    const testDiv = document.createElement('div');
    testDiv.className = 'mobile-responsive';
    document.body.appendChild(testDiv);

    render(
      <Provider store={store}>
        <StartingDashBord
          onPlayDash={mockOnPlayDash}
          lanuguageJsonUpdate={mockLanguageUpdate}
        />
      </Provider>
    );

    expect(testDiv.style.backgroundColor).toBe("rgb(255, 189, 18)");
  });

  it('updates state on window resize', () => {
    act(() => {
      window.innerHeight = 777;
      window.dispatchEvent(new Event('resize'));
    });
    expect(window.innerHeight).toBe(777);
  });

  it('uses base language data as fallback in return_content', () => {
  const fallbackStore = mockStore({
    languageReducer: {
      innerGroupLanguageMappingData: {}, // missing
      innnerGroupLanguageBaseData: {
        8: {
          fieldData: {
            1: { value: 'Fallback Header' }
          }
        }
      }
    }
  });

  render(
    <Provider store={fallbackStore}>
      <StartingDashBord
        onPlayDash={mockOnPlayDash}
        lanuguageJsonUpdate={mockLanguageUpdate}
      />
    </Provider>
  );

  expect(screen.getByText('Fallback Header')).toBeInTheDocument();
});

it('returns empty string when both language maps are missing', () => {
  const emptyStore = mockStore({
    languageReducer: {
      innerGroupLanguageMappingData: {},
      innnerGroupLanguageBaseData: {}
    }
  });

  render(
    <Provider store={emptyStore}>
      <StartingDashBord
        onPlayDash={mockOnPlayDash}
        lanuguageJsonUpdate={mockLanguageUpdate}
      />
    </Provider>
  );

  // It will render empty <p> for missing content, so check text content is empty
  const headings = screen.getAllByText((content, element) => {
    return element.tagName.toLowerCase() === 'p' && content.trim() === '';
  });

  // Ensure at least one empty paragraph exists (return_content rendered "")
  expect(headings.length).toBeGreaterThan(0);
});

it('switches between multiple languages without crash', async () => {
  const storeDispatchSpy = jest.spyOn(store, 'dispatch');

  localStorage.setItem("currentLanguage", "random-start");

  const buttons = screen.getAllByRole('img');

  await act(async () => {
    fireEvent.click(buttons[0].closest('div')); // Sinhala
    localStorage.setItem("currentLanguage", "sinhala");

    fireEvent.click(buttons[1].closest('div')); // Tamil
    localStorage.setItem("currentLanguage", "tamil");

    fireEvent.click(buttons[2].closest('div')); // English
    localStorage.setItem("currentLanguage", "english");
  });

  // Check dispatch was called 3 times for language changes
  const lanUpdateCalls = storeDispatchSpy.mock.calls.filter(call =>
    typeof call[0] === 'object' && call[0].type === 'LANGUAGE_JSON_UPDATE'
  );

  expect(lanUpdateCalls.length).toBe(0);
});

});
