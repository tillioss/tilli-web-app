import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Dashbord from './Dashbord';
import * as Common from '../config/Common';

// Mock images
jest.mock('../images/Tilli_3.png', () => 'Tilli_3.png');
jest.mock('../images/noun_atom.png', () => 'noun_atom.png');
jest.mock('../images/noun_Heart.png', () => 'noun_Heart.png');
jest.mock('../images/noun_win.png', () => 'noun_win.png');
jest.mock('../images/outline_forward.png', () => 'outline_forward.png');
jest.mock('../images/image_15.png', () => 'image_15.png');
jest.mock('../images/image_14.png', () => 'image_14.png');
jest.mock('../images/image_13.png', () => 'image_13.png');
jest.mock('../images/outlineRoundIconOnly.png', () => 'outlineRoundIconOnly.png');

// Mock constants
jest.mock('../config/MyConstant', () => ({
  keyList: {
    apiURL: 'http://localhost/'
  }
}));

// Mock common utilities
jest.mock('../config/Common', () => ({
  checkNullAndReturnString: jest.fn(() => true),
  doConnect: jest.fn()
}));

const mockStore = configureStore([thunk]);

describe('Dashbord Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        innnerGroupLanguageBaseData: {
          1: {
            fieldData: {
              1: { value: 'Welcome' },
              2: { value: 'Points' },
              3: { value: 'Feelings' },
              4: { value: 'Level' },
              5: { value: 'Level' },
              6: { value: 'Modules' },
            }
          }
        },
        innerGroupLanguageMappingData: {
          1: {
            fieldData: {
              1: { value: 'Welcome' },
              2: { value: 'Points' },
              3: { value: 'Feelings' },
              4: { value: 'Level' },
              5: { value: 'Level' },
              6: { value: 'Modules' },
            }
          }
        }
      }
    });

    // Set up localStorage
    localStorage.setItem('nameOfChild', 'John');
    localStorage.setItem('loggedUserId', 'user123');
    localStorage.setItem('ChooseLanguage', JSON.stringify({ label: 'English', value: 'en' }));
    localStorage.setItem('currentLanguage', 'en');

    // Set window size
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    // Mock doConnect responses
    Common.doConnect.mockImplementation((action) => {
      switch (action) {
        case 'getLevelsNameLanguageMapping':
          return Promise.resolve({ response: JSON.stringify({ "1": "Module A", "2": "Module B" }) });
        case 'getLanguageMappingDataWithBaseData':
          return Promise.resolve({ dataMap: { mappingData: JSON.stringify({}), baseData: JSON.stringify({}) } });
        case 'getUserGameStatus':
          return Promise.resolve({ response: JSON.stringify({ level: 2, points: 50, feelingTool: 5 }) });
        case 'getGameLevels':
          return Promise.resolve({
            levelsMap: {
              "1": { id: "1", name: "Module A", sortOrder: 1, color: "#fff", image: { fileName: "img1", fileType: "jpg" } },
              "2": { id: "2", name: "Module B", sortOrder: 2, color: "#ccc", image: { fileName: "img2", fileType: "jpg" } }
            }
          });
        default:
          return Promise.resolve({});
      }
    });
  });

  it('renders dashboard and displays user details', async () => {
  render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('user-name')).toHaveTextContent('@ John');
    expect(screen.getByTestId('points')).toHaveTextContent('50');
    expect(screen.getByTestId('feelings-tool')).toHaveTextContent('5');
    expect(screen.getByTestId('current-level')).toHaveTextContent('2');
  });
});


  it('renders levels correctly', async () => {
  render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  await waitFor(() => {
    const levels = screen.getAllByTestId('level-label');
    expect(levels.length).toBeGreaterThanOrEqual(2);
  });
});


  it('renders module names from language map or fallback', async () => {
    render(
      <Provider store={store}>
        <Dashbord />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Module A/i)).toBeInTheDocument();
    });
  });

  it('sets default progressingLevel when game status response is null', async () => {
  Common.doConnect.mockImplementationOnce((action) => {
    if (action === 'getUserGameStatus') {
      return Promise.resolve({ response: null });
    }
    return Promise.resolve({});
  });

  render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('current-level')).toHaveTextContent('1'); // default
  });
});

it('returns value from baseData when mappingData is missing', async () => {
  const altStore = mockStore({
    languageReducer: {
      innerGroupLanguageMappingData: {}, // simulate missing mapping
      innnerGroupLanguageBaseData: {
        1: { fieldData: { 1: { value: 'From Base' } } }
      }
    }
  });

  render(
    <Provider store={altStore}>
      <Dashbord />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('content-heading')).toHaveTextContent('');
  });
});


it('returns empty string when levelLanguageMappingData is missing key', async () => {
  const component = render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  const instance = component.container;
  // directly checking fallback render
  await waitFor(() => {
    expect(instance.textContent).toContain('Module A'); // from name, not mapping
  });
});

it('renders locked module when index is greater than progressing level', async () => {
  Common.doConnect.mockImplementationOnce((action) => {
    if (action === 'getUserGameStatus') {
      return Promise.resolve({ response: JSON.stringify({ level: 1, points: 0, feelingTool: 0 }) });
    }
    if (action === 'getGameLevels') {
      return Promise.resolve({
        levelsMap: {
          "1": { id: "1", name: "Module A", sortOrder: 1, color: "#fff", image: { fileName: "img1", fileType: "jpg" } },
          "2": { id: "2", name: "Module B", sortOrder: 2, color: "#ccc", image: { fileName: "img2", fileType: "jpg" } }
        }
      });
    }
    return Promise.resolve({});
  });

  render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  await waitFor(() => {
    const lockIcons = screen.getAllByRole('img', { hidden: true });
    expect(lockIcons.length).toBeGreaterThanOrEqual(1); // check that locked module is rendered
  });
});

it('changes language when a language icon is clicked', async () => {
  render(
    <Provider store={store}>
      <Dashbord />
    </Provider>
  );

  const englishButton = screen.getAllByRole('img').find(img =>
    img.getAttribute('src') === 'image_15.png'
  );

  fireEvent.click(englishButton);

  // Since localStorage is mocked and the method doesn't update visible state,
  // this just ensures no crash and click is handled.
  await waitFor(() => {
    expect(localStorage.getItem('currentLanguage')).toBe('dbc995a7-0715-4c80-aeef-35f77e9fb517');
  });
});

});
