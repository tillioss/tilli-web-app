import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import GameRoute from './GameRoute';

jest.mock('./SplashScreen', () => () => <div data-testid="SplashScreen" />);
jest.mock('./LanguageScreen', () => () => <div data-testid="LanguageScreen" />);
jest.mock('./RegisterScreen', () => () => <div data-testid="RegisterScreen" />);
jest.mock('./ParentPasswordSetup', () => () => <div data-testid="ParentPasswordSetup" />);
jest.mock('./CreateProfile', () => () => <div data-testid="CreateProfile" />);
jest.mock('./GamePlay', () => () => <div data-testid="GamePlay" />);

describe('GameRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithRoute = (initialPath) => {
  const history = createMemoryHistory();
  history.push(initialPath);

  render(
    <Router history={history}>
      <Route path="/game">
        <GameRoute />
      </Route>
    </Router>
  );

  return history;
};

  test('redirects to /login if not logged in', async () => {
    const history = renderWithRoute('/game/');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game/login');
    });
  });

  test('renders SplashScreen when logged in and path is /', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/');
    expect(screen.getByTestId('SplashScreen')).toBeInTheDocument();
  });

  test('renders LanguageScreen', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/language');
    expect(screen.getByTestId('LanguageScreen')).toBeInTheDocument();
  });

  test('renders RegisterScreen', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/create-account');
    expect(screen.getByTestId('RegisterScreen')).toBeInTheDocument();
  });

  test('renders ParentPasswordSetup', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/parent-password-setup');
    expect(screen.getByTestId('ParentPasswordSetup')).toBeInTheDocument();
  });

  test('renders CreateProfile', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/createprofile');
    expect(screen.getByTestId('CreateProfile')).toBeInTheDocument();
  });

  test('renders GamePlay', () => {
    localStorage.setItem("TilliGameLoggedIn", "true");
    renderWithRoute('/game/start-game');
    expect(screen.getByTestId('GamePlay')).toBeInTheDocument();
  });
});
