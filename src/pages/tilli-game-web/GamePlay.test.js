import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GamePlay, { testSetEngine } from './GamePlay';

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({}));

// Mock project URL
jest.mock('../../config/MyConstant', () => ({
  keyList: { projectUrl: 'testProject' }
}));

function setupDOMElements() {
  const ids = ['status-progress', 'status-progress-inner', 'status-indeterminate', 'status-notice'];
  const elements = {};
  ids.forEach(id => {
    const el = document.createElement('div');
    el.id = id;
    el.style.display = 'none'; // hidden by default

    if (id === 'status-indeterminate') {
      for (let i = 0; i < 8; i++) {
        el.appendChild(document.createElement('div'));
      }
    }

    document.body.appendChild(el);
    elements[id] = el;
  });
  return elements; // ✅ important!
}

describe('GamePlay Component (no real Godot script)', () => {
  let engineMock;
  let elements;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    elements = setupDOMElements();

    engineMock = {
      startGame: jest.fn(() => Promise.resolve())
    };

    window.Engine = jest.fn(() => engineMock);
    window.Engine.isWebGLAvailable = () => true;
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

 const renderWithRouter = () =>
  render(<MemoryRouter><GamePlay /></MemoryRouter>, { container: document.getElementById('root') });

  it('sets engine manually without calling script.onload()', async () => {
    renderWithRouter();

    await act(async () => {
      testSetEngine(window.Engine());
    });

    expect(window.Engine).toHaveBeenCalled();
    expect(engineMock.startGame).toHaveBeenCalled();
  });

  it('renders canvas and status divs', async () => {
    const { container } = renderWithRouter();
    expect(container.querySelector('#canvas')).toBeInTheDocument();
    expect(container.querySelector('#status')).toBeInTheDocument();
  });

  it('appends script and avoids triggering engine logic on load', async () => {
    jest.useFakeTimers();
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');

    await act(async () => {
      renderWithRouter();
    });

    const scriptTag = appendChildSpy.mock.calls
      .map(([node]) => node)
      .find((node) => node.tagName === 'SCRIPT');

    expect(scriptTag).toBeTruthy();
    expect(scriptTag.src).toContain('/testProject/flappy/index.js');

    await act(async () => {
      scriptTag.onload(); // won't trigger real logic due to engine = null
    });

    expect(window.Engine).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('removes the script on unmount', async () => {
  jest.useFakeTimers();

  const appendSpy = jest.spyOn(document.body, 'appendChild');

  await act(async () => {
    renderWithRouter();
    jest.runAllTimers(); // ensures useEffect runs
  });

  const script = appendSpy.mock.calls
    .map(([node]) => node)
    .find((node) => node.tagName === 'SCRIPT');

  expect(script).toBeTruthy();

  const { unmount } = renderWithRouter();
  unmount();

  // Check if script is removed from the DOM
  const scriptInDOM = [...document.getElementsByTagName('script')].find(
    (s) => s.src.includes('index.js')
  );
  expect(scriptInDOM).toBeUndefined();

  jest.useRealTimers();
});

it('displays failure notice when WebGL is not available', async () => {
  // Override the WebGL check to simulate failure
  window.Engine.isWebGLAvailable = () => false;

  const { container } = renderWithRouter();

  await act(async () => {
    testSetEngine(window.Engine()); // sets state
  });

  // Now wait for the DOM to update via the useEffect
  await waitFor(() => {
    const notice = container.querySelector('#status-notice');
    expect(notice).toBeInTheDocument();
    expect(notice.style.display).toBe('block');
    expect(notice.textContent).toContain('WebGL not available');
  });
});

it('displays progress bar during engine loading', async () => {
  engineMock.startGame = jest.fn(({ onProgress }) => {
    // Simulate loading part-way, never reach total
    onProgress(5, 10); // 50%
    return new Promise(() => {}); // never resolves
  });

  const appendSpy = jest.spyOn(document.body, 'appendChild');
  renderWithRouter();

  const scriptTag = appendSpy.mock.calls
    .map(([node]) => node)
    .find((node) => node.tagName === 'SCRIPT');

  await act(async () => {
    scriptTag.onload(); // simulate script loading
  });

  await waitFor(() => {
    const progress = document.getElementById('status-progress');
    const progressInner = document.getElementById('status-progress-inner');
    expect(progress.style.display).toBe('block');
    expect(progressInner.style.width).toBe('50%');
  });
});

it('shows indeterminate spinner when total is 0', async () => {
  engineMock.startGame = jest.fn(({ onProgress }) => {
    // total = 0 → should show indeterminate
    onProgress(1, 0);
    return new Promise(() => {}); // keep it in loading state
  });

  const appendSpy = jest.spyOn(document.body, 'appendChild');
  renderWithRouter();

  const scriptTag = appendSpy.mock.calls
    .map(([node]) => node)
    .find((node) => node.tagName === 'SCRIPT');

  await act(async () => {
    scriptTag.onload();
  });

  await waitFor(() => {
    const indeterminate = document.getElementById('status-indeterminate');
    expect(indeterminate.style.display).toBe('block');
  });
});

it('shows error notice when engine fails to start', async () => {
  engineMock.startGame = jest.fn(() =>
    Promise.reject(new Error('Game load failed'))
  );

  const appendSpy = jest.spyOn(document.body, 'appendChild');
  renderWithRouter();

  const scriptTag = appendSpy.mock.calls
    .map(([node]) => node)
    .find((node) => node.tagName === 'SCRIPT');

  await act(async () => {
    scriptTag.onload();
  });

  await waitFor(() => {
    const notice = document.getElementById('status-notice');
    expect(notice).toBeInTheDocument();
    expect(notice.style.display).toBe('block');
    expect(notice.textContent).toContain('Game load failed');
  });
});

it('does not append duplicate script tags on re-render', async () => {
  const appendSpy = jest.spyOn(document.body, 'appendChild');

  const container = document.createElement('div');
  document.body.appendChild(container);

  const { rerender } = render(
    <MemoryRouter><GamePlay /></MemoryRouter>,
    { container }
  );

  // simulate a re-render of the same component
  rerender(
    <MemoryRouter><GamePlay /></MemoryRouter>
  );

  const scriptTags = appendSpy.mock.calls
    .map(([node]) => node)
    .filter((node) => node.tagName === 'SCRIPT');

  expect(scriptTags.length).toBe(1);
});

});
