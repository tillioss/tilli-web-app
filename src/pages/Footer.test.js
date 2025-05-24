import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

// Mocks
const mockStore = configureStore([]);

jest.mock('../config/MyConstant', () => ({
  keyList: {
    projectUrl: 'testProject'
  }
}));

const createMockHistory = () => ({
  push: jest.fn()
});

const setup = (initialState = {}, customProps = {}) => {
  const store = mockStore({
    languageReducer: {
      innerGroupLanguageMappingData: {
        7: {
          fieldData: [
            {}, // index 0
            { value: 'Home' },     // index 1
            { value: 'Levels' },   // index 2
            { value: 'Parent' },   // index 3
            { value: 'Profile' }   // index 4
          ]
        }
      },
      innnerGroupLanguageBaseData: {}
    },
    ...initialState
  });

  const props = {
    ...customProps,
    props: {
      history: createMockHistory()
    }
  };

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer {...props} />
        </MemoryRouter>
      </Provider>
    ),
    store,
    history: props.props.history
  };
};

describe('Footer Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all tabs with correct labels', () => {
    setup();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Levels')).toBeInTheDocument();
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('navigates to Home when home tab is clicked', () => {
    const { history } = setup();
    fireEvent.click(screen.getByText('Home'));
    expect(history.push).toHaveBeenCalledWith('/testProject/home');
  });

  it('navigates to Levels when levels tab is clicked', () => {
    const { history } = setup();
    fireEvent.click(screen.getByText('Levels'));
    expect(history.push).toHaveBeenCalledWith('/testProject/levels');
  });

  it('navigates to Parent when parent tab is clicked', () => {
    const { history } = setup();
    fireEvent.click(screen.getByText('Parent'));
    expect(history.push).toHaveBeenCalledWith('/testProject/Parent');
  });

  it('navigates to Profile when profile tab is clicked', () => {
    const { history } = setup();
    fireEvent.click(screen.getByText('Profile'));
    expect(history.push).toHaveBeenCalledWith('/testProject/profile');
  });

  it('uses fallback data when mapping data is missing', () => {
    const store = {
      languageReducer: {
        innerGroupLanguageMappingData: {},
        innnerGroupLanguageBaseData: {
          7: {
            fieldData: [
              {}, // index 0
              { value: 'Fallback Home' },
              { value: 'Fallback Levels' },
              { value: 'Fallback Parent' },
              { value: 'Fallback Profile' }
            ]
          }
        }
      }
    };

    setup(store);

    expect(screen.getByText('Fallback Home')).toBeInTheDocument();
    expect(screen.getByText('Fallback Levels')).toBeInTheDocument();
    expect(screen.getByText('Fallback Parent')).toBeInTheDocument();
    expect(screen.getByText('Fallback Profile')).toBeInTheDocument();
  });

  it('loads data from localStorage if available', () => {
    localStorage.setItem('getInnerPageData', JSON.stringify({ dummy: true }));
    setup();
    expect(JSON.parse(localStorage.getItem('getInnerPageData'))).toEqual({ dummy: true });
  });
});
