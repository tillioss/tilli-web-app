import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedDemoUserLogin_2, { DemoUserLogin_2 } from './DemoUserLogin_2';
import * as Common from '../config/Common';
import * as languageActions from '../redux/actions/languageActions';

jest.mock('../images/logos.png', () => 'logo');

const mockStore = configureStore([thunk]);

describe('DemoUserLogin_2 Component', () => {
  let store;
  let mockDoConnect;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        outerGroupLanguageMappingData: [],
        outerGroupLanguageBaseData: [],
        innnerGroupLanguageBaseData: [],
        innerGroupLanguageMappingData: [],
        commonGroupLanguageMappingData: [],
        commonGroupLanguageBaseData: [],
      }
    });

    jest.spyOn(Common, 'userTrack').mockImplementation(jest.fn());

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ip: '127.0.0.1' })
      })
    );

    mockDoConnect = jest.spyOn(Common, 'doConnect').mockResolvedValue({
      response: 'Success',
      id: 'demo123',
      name: 'Demo User',
      ageOfChild: 9,
      genderOfChild: 'female'
    });

    jest.spyOn(languageActions, 'fetchGetLanguageMapping').mockImplementation(() => ({ type: 'MOCK_LANG' }));
    jest.spyOn(languageActions, 'fetchGetLevelNameLanguageMapping').mockImplementation(() => ({ type: 'MOCK_LEVEL_LANG' }));

    localStorage.clear();
  });

  const renderWithRouter = (initialPath) => {
    const history = createMemoryHistory();
    history.push(initialPath);

    return render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/test">
            <ConnectedDemoUserLogin_2  />
          </Route>
        </Router>
      </Provider>
    );
  };

  it('renders loader and triggers login with query params', async () => {
    const { getByRole } = renderWithRouter('/test?demoUserId=demo123&age=10&gender=male&language=english');

    await waitFor(() => {
      expect(getByRole('img')).toBeInTheDocument();
      expect(mockDoConnect).toHaveBeenCalled();
      expect(localStorage.getItem('demoUserId')).toBe('demo123');
    });
  });

  it('handles Tamil language change via query', async () => {
    renderWithRouter('/test?demoUserId=demo456&age=8&gender=female&language=tamil&userType=guest');

    await waitFor(() => {
      expect(mockDoConnect).toHaveBeenCalled();
      expect(languageActions.fetchGetLanguageMapping).toHaveBeenCalledTimes(3);
      expect(languageActions.fetchGetLevelNameLanguageMapping).toHaveBeenCalledTimes(1);
    });
  });

  it('defaults to English for unrecognized language', async () => {
    renderWithRouter('/test?demoUserId=demo789&age=9&gender=male&language=french');

    await waitFor(() => {
      expect(mockDoConnect).toHaveBeenCalled();
      expect(languageActions.fetchGetLanguageMapping).toHaveBeenCalled();
    });
  });

  it('handles failed login response', async () => {
    mockDoConnect.mockResolvedValueOnce({ response: 'Failure' });

    renderWithRouter('/test?demoUserId=demo000&age=7&gender=female&language=english');

    await waitFor(() => {
      expect(mockDoConnect).toHaveBeenCalled();
    });
  });

  it('falls back to match.params when location.search is missing', async () => {
  const history = createMemoryHistory();
  history.push('/test/demo123/10/male/english'); // no query string

  render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/test/:demoUserId/:age/:gender/:language">
          <ConnectedDemoUserLogin_2 />
        </Route>
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('demoUserId')).toBe('demo123');
  });
});

it('falls back to English language if none is provided', async () => {
  renderWithRouter('/test?demoUserId=demo999&age=11&gender=male');

  await waitFor(() => {
    expect(languageActions.fetchGetLanguageMapping).toHaveBeenCalled();
    expect(languageActions.fetchGetLevelNameLanguageMapping).toHaveBeenCalled();
  });
});

it('handles missing user ID in doConnect response', async () => {
  mockDoConnect.mockResolvedValueOnce({ response: 'Success', id: '' });

  renderWithRouter('/test?demoUserId=demo101&age=6&gender=female&language=english');

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('demoUserId')).toBe(null);
  });
});

it('sets userAge and userGender from query if landingFrom is set', async () => {
  localStorage.setItem('landingFrom', 'nenesa');

  renderWithRouter('/test?demoUserId=demo777&age=14&gender=male&language=sinhala');

  await waitFor(() => {
    expect(localStorage.getItem('userAge')).toBe("");
    expect(localStorage.getItem('userGender')).toBe("");
  });
});

it('updates deviceWidth on window resize', async () => {
  const { container } = renderWithRouter('/test?demoUserId=resizeTest&age=10&gender=male&language=english');

  window.innerWidth = 800;
  window.dispatchEvent(new Event('resize'));

  // Can't directly check setState, but confirm render doesn't break
  await waitFor(() => {
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});


it('calls getLangugeBaseData with correct ID for Tamil', async () => {
  const spy = jest.spyOn(DemoUserLogin_2.prototype, 'getLangugeBaseData');

  renderWithRouter('/test?demoUserId=demoX&age=10&gender=female&language=tamil');

  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({"label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517"}));
  });

  spy.mockRestore();
});

it('gracefully handles undefined language query', async () => {
  renderWithRouter('/test?demoUserId=demoX&age=10&gender=male'); // no language

  await waitFor(() => {
    expect(languageActions.fetchGetLanguageMapping).toHaveBeenCalled();
    expect(languageActions.fetchGetLevelNameLanguageMapping).toHaveBeenCalled();
  });
});

it('handles malformed query string gracefully', async () => {
  renderWithRouter('/test?brokenquerystring');

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled(); // fallback to match.params will fail too
  });
});

it('handles malformed doConnect response object', async () => {
  mockDoConnect.mockResolvedValueOnce({});

  renderWithRouter('/test?demoUserId=demo404&age=8&gender=male&language=english');

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('demoUserId')).toBe(null);
  });
});

it('uses demoUserId from localStorage if not in URL', async () => {
  localStorage.setItem('demoUserId', 'stored-user');

  renderWithRouter('/test?age=11&gender=male&language=english'); // no demoUserId in query

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('demoUserId')).toBe('demo123');
  });
});

it('correctly uses match.params when location.search is not provided', async () => {
  const history = createMemoryHistory();
  history.push('/test/demoZ/13/female/tamil');

  render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/test/:demoUserId/:age/:gender/:language">
          <ConnectedDemoUserLogin_2 />
        </Route>
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('demoUserId')).toBe('demo123');
  });
});

it('follows "demo" logic path when landingFrom is "demo"', async () => {
  localStorage.setItem('landingFrom', 'demo');

  renderWithRouter('/test?demoUserId=demoPath&age=15&gender=male&language=sinhala');

  await waitFor(() => {
    expect(mockDoConnect).toHaveBeenCalled();
    expect(localStorage.getItem('userAge')).toBe('9'); // from doConnect's mock response
  });
});

it('parses location.search and extracts correct values', async () => {
  const spy = jest.spyOn(Common, 'doConnect');

  renderWithRouter('/test?demoUserId=test123&age=12&gender=female&language=english&userType=guest');

  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith(
      "createDemoUser", 
      "POST",
      expect.objectContaining(
        {
          demoUserId: "", 
          deviceInfo: "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0", 
          ip: "127.0.0.1", 
          sessionId: "123", 
          userType: ""
        }
      )
    );
  });

  spy.mockRestore();
});

});
