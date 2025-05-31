import React from 'react';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GodotPlayWrapped from './GodotPlay';
import MyConstant from '../../config/MyConstant';
import MyConfig from '../../config/myConfig';

// Extract raw component
const GodotPlay = GodotPlayWrapped.WrappedComponent;

jest.mock('../../config/MyConstant', () => ({
  keyList: { apiURL: 'https://api/', projectUrl: 'proj' }
}));
jest.mock('../../config/myConfig', () => ({
  isLocal: false
}));

describe('GodotPlay Component', () => {
  let originalLocation;
  let originalRemoveChild;

  beforeAll(() => {
    // Stub global location
    originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    // Preserve original removeChild
    originalRemoveChild = document.body.removeChild.bind(document.body);
  });

  afterAll(() => {
    window.location = originalLocation;
    // Restore removeChild
    document.body.removeChild = originalRemoveChild;
  });

  beforeEach(() => {
    cleanup();
    document.body.innerHTML = '';
    jest.useFakeTimers();

    // Override removeChild to avoid errors when node not present
    document.body.removeChild = (node) => {
      try {
        originalRemoveChild(node);
      } catch (e) {
        // ignore if node not a child
      }
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('injects script and cleanup does not throw', async () => {
    const props = { match: { params: { gameId: 'game123' } } };
    const { unmount } = render(<GodotPlay {...props} />);
    const script = await waitFor(() => document.body.querySelector('script'));
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute('src', `${MyConstant.keyList.apiURL}vp-game-file/module/zip/game123/index.js`);
    expect(() => unmount()).not.toThrow();
  });

  it('does not inject script when no gameId', async () => {
    const props = { match: { params: {} } };
    render(<GodotPlay {...props} />);
    await waitFor(() => expect(document.body.querySelector('script')).toBeNull());
  });

  it('shows failure notice when WebGL unavailable', async () => {
    const fakeEngine = { startGame: jest.fn() };
    const engineFn = jest.fn(() => fakeEngine);
    engineFn.isWebGLAvailable = jest.fn(() => false);
    window.Engine = engineFn;

    const props = { match: { params: { gameId: 'g1' } } };
    render(<GodotPlay {...props} />);
    const script = await waitFor(() => document.body.querySelector('script'));

    act(() => script.onload());
    const notice = await screen.findByText('WebGL not available');
    expect(notice).toBeVisible();
    expect(fakeEngine.startGame).not.toHaveBeenCalled();
  });

  it('updates progress and hides status on successful startGame', async () => {
    const fakeEngine = {
      startGame: jest.fn(({ onProgress }) => {
        onProgress(1, 2);
        return Promise.resolve();
      })
    };
    const engineFn = jest.fn(() => fakeEngine);
    engineFn.isWebGLAvailable = jest.fn(() => true);
    window.Engine = engineFn;

    const props = { match: { params: { gameId: 'g2' } } };
    render(<GodotPlay {...props} />);
    const script = await waitFor(() => document.body.querySelector('script'));

    act(() => script.onload());
    const inner = await waitFor(() => document.getElementById('status-progress-inner'));
    expect(inner.style.width).toBe('50%');
    await waitFor(() => {
      const progress = document.getElementById('status-progress');
      expect(progress.style.display).toBe('none');
    });
    expect(fakeEngine.startGame).toHaveBeenCalled();
  });

  it('shows error message when startGame rejects', async () => {
    const fakeEngine = { startGame: jest.fn(() => Promise.reject(new Error('fail'))) };
    const engineFn = jest.fn(() => fakeEngine);
    engineFn.isWebGLAvailable = jest.fn(() => true);
    window.Engine = engineFn;

    const props = { match: { params: { gameId: 'g3' } } };
    render(<GodotPlay {...props} />);
    const script = await waitFor(() => document.body.querySelector('script'));

    act(() => script.onload());
    const notice = await screen.findByText('fail');
    expect(notice).toBeVisible();
    expect(fakeEngine.startGame).toHaveBeenCalled();
  });

  it('redirects to godot-redirect when local config enabled', async () => {
    MyConfig.isLocal = true;
    const fakeEngine = { startGame: jest.fn(() => Promise.resolve()) };
    const engineFn = jest.fn(() => fakeEngine);
    engineFn.isWebGLAvailable = jest.fn(() => true);
    window.Engine = engineFn;

    const props = { match: { params: { gameId: 'g4' } } };
    render(<GodotPlay {...props} />);
    const script = await waitFor(() => document.body.querySelector('script'));

    act(() => script.onload());
    act(() => jest.advanceTimersByTime(6000));
    expect(window.location.href).toContain(`/${MyConstant.keyList.projectUrl}/godot-redirect`);
    expect(fakeEngine.startGame).toHaveBeenCalled();
  });
});
