import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GodotRedirect from './GodotRedirect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MyConstant from '../../config/MyConstant';

// ✅ Mock MyConstant
jest.mock('../../config/MyConstant', () => ({
  keyList: {
    projectUrl: 'my-project',
  },
}));

// ✅ Manual localStorage mock
beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => (store[key] = value),
      clear: () => (store = {}),
      removeItem: (key) => delete store[key],
    };
  })();
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

// ✅ Util: render with history
function renderWithRouter(component, history) {
  return render(<Router history={history}>{component}</Router>);
}

describe('GodotRedirect Component', () => {
  it('redirects to module-manage if game is not ended', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn(); // mock push

    const gameData = {
      gameIsEnd: false,
      id: 'game123',
      levelIndex: 1,
      progressingLevel: 2,
      nextModuleIndex: 5,
    };

    localStorage.setItem('gameStatusInfo', JSON.stringify(gameData));

    renderWithRouter(<GodotRedirect history={history} />, history);

    await waitFor(() => {
      expect(localStorage.getItem('d_theme_gameIndex')).toBe(5);
      expect(history.push).toHaveBeenCalledWith('/my-project/module-manage/game123/1/2');
    });
  });

  it('redirects to home if game has ended', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const gameData = {
      gameIsEnd: true,
      id: 'game456',
      levelIndex: 0,
      progressingLevel: 1,
      nextModuleIndex: 3,
    };

    localStorage.setItem('gameStatusInfo', JSON.stringify(gameData));

    renderWithRouter(<GodotRedirect history={history} />, history);

    await waitFor(() => {
      expect(localStorage.getItem('d_theme_gameIndex')).toBe(null);
      expect(history.push).toHaveBeenCalledWith('/my-project/home/');
    });
  });

  it('renders fallback when gameStatusInfo is missing', async () => {
    const history = createMemoryHistory();
    const { findByText } = renderWithRouter(<GodotRedirect history={history} />, history);
    expect(await findByText(/some thing went wrong/i)).toBeInTheDocument();
  });

  it('renders fallback when gameStatusInfo is malformed JSON', async () => {
    const history = createMemoryHistory();
    localStorage.setItem('gameStatusInfo', '{bad json');

    const { findByText } = renderWithRouter(<GodotRedirect history={history} />, history);
    expect(await findByText(/some thing went wrong/i)).toBeInTheDocument();
  });

  it('renders fallback when gameStatusInfo is an empty object', async () => {
    const history = createMemoryHistory();
    localStorage.setItem('gameStatusInfo', '{}');

    const { findByText } = renderWithRouter(<GodotRedirect history={history} />, history);
    expect(await findByText(/some thing went wrong/i)).toBeInTheDocument();
  });
});
