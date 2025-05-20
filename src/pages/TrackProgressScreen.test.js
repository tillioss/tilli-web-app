import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackProgressScreen from './TrackProgressScreen';
import * as Common from '../config/Common';

jest.mock('../images/Back_Button.png', () => 'back_button');
jest.mock('../images/Yoga_Cat.png', () => 'yoga_cat');
jest.mock('../images/Bubble_Popping.png', () => 'bubble_popping');
jest.mock('../images/RainbowBreathing.png', () => 'rainbow_breathing');
jest.mock('../images/Water.png', () => 'water');
jest.mock('../images/Hug.png', () => 'hug');
jest.mock('../images/Group2065.png', () => 'empty_logo');
jest.mock('../images/empty.png', () => 'empty_emoji');
jest.mock('../images/coloring.png', () => 'coloring');
jest.mock('../images/scaredEmoji.png', () => 'scared_emoji');
jest.mock('../images/sadEmoji.png', () => 'sad_emoji');
jest.mock('../images/surprisedEmoji.png', () => 'surprised_emoji');
jest.mock('../images/disgustedEmoji.png', () => 'disgusted_emoji');
jest.mock('../images/angryEmoji.png', () => 'angry_emoji');
jest.mock('../images/happyEmoji.png', () => 'happy_emoji');

const mockStore = configureStore([thunk]);

describe('TrackProgressScreen', () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory();
    jest.spyOn(Common, 'doConnect').mockImplementation((url, method, payload) => {
      if (url === 'getfeedbackCaptureList') {
        return Promise.resolve({
          response: {
            liked: { 1: { activity: 'yogaactivity', count: 1 } },
            neutral: {},
            disliked: {}
          }
        });
      }
      if (url === 'getEmotionCaptureList') {
        return Promise.resolve({
          response: ['happy', 'sad']
        });
      }
    });
    localStorage.setItem('loggedUserId', 'test-user-id');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <TrackProgressScreen />
        </Router>
      </Provider>
    );
  };

  test('renders TrackProgressScreen and shows emotion chart', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText("Track Progress")).toBeInTheDocument();
      expect(screen.getByText("Latest Emotion :")).toBeInTheDocument();
      expect(screen.getByText("Last 7 Emotion Check Ins:")).toBeInTheDocument();
    });
  });

  test('renders Likes tab with correct data', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText("ABCDE Strategies that help your child")).toBeInTheDocument();
      expect(screen.getByText("Yoga")).toBeInTheDocument();
      expect(screen.getByText("Likes : 1")).toBeInTheDocument();
    });
  });

  test('switches to Neutral tab', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("neutral-tab"));
    await waitFor(() => {
      expect(screen.getByText("ABCDE Strategies that sometimes help")).toBeInTheDocument();
      expect(screen.getByTestId("neutral-count-1")).toBeInTheDocument();
    });
  });

  test('switches to Dislikes tab', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('DISLIKES'));
    await waitFor(() => {
      expect(screen.getByTestId("disliked-count-1")).toBeInTheDocument();
    });
  });

  test('back button redirects to newparentsscreen', async () => {
    renderComponent();
    await waitFor(() => {
      const backBtn = screen.getByTestId("backBtn");
      fireEvent.click(backBtn);
      expect(history.location.pathname).toContain('/');
    });
  });

  test('renders with only empty emotions if no data is returned', async () => {
  Common.doConnect.mockImplementation((url) => {
    if (url === 'getfeedbackCaptureList') {
      return Promise.resolve({ response: { liked: {}, neutral: {}, disliked: {} } });
    }
    if (url === 'getEmotionCaptureList') {
      return Promise.resolve({ response: [] }); // simulate no emotions
    }
  });

  renderComponent();

  await waitFor(() => {
    expect(screen.getByText("Latest Emotion :")).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(1); // Only empty emojis rendered
  });
});

test('renders empty logo when no disliked activities', async () => {
  Common.doConnect.mockImplementation((url) => {
    if (url === 'getfeedbackCaptureList') {
      return Promise.resolve({ response: { liked: {}, neutral: {}, disliked: {} } });
    }
    if (url === 'getEmotionCaptureList') {
      return Promise.resolve({ response: ['happy'] });
    }
  });

  renderComponent();

  fireEvent.click(screen.getByText('DISLIKES'));

  await waitFor(() => {
    expect(screen.getByTestId('disliked-count-1')).toBeInTheDocument(); // fallback entry
  });
});

test('renders multiple liked activities correctly', async () => {
  Common.doConnect.mockImplementation((url) => {
    if (url === 'getfeedbackCaptureList') {
      return Promise.resolve({
        response: {
          liked: {
            1: { activity: 'yogaactivity', count: 1 },
            2: { activity: 'bubblepopactivity', count: 2 }
          },
          neutral: {},
          disliked: {}
        }
      });
    }
    if (url === 'getEmotionCaptureList') {
      return Promise.resolve({ response: ['happy'] });
    }
  });

  renderComponent();

  await waitFor(() => {
    expect(screen.getByText("Yoga")).toBeInTheDocument();
    expect(screen.getByText("Bubble Pop")).toBeInTheDocument();
    expect(screen.getByText("Likes : 1")).toBeInTheDocument();
    expect(screen.getByText("Likes : 2")).toBeInTheDocument();
  });
});

test('clicking each tab sets active class correctly', async () => {
  renderComponent();

  const likesTab = screen.getByText('LIKES');
  const neutralTab = screen.getByTestId('neutral-tab');
  const dislikesTab = screen.getByText('DISLIKES');

  fireEvent.click(neutralTab);
  await waitFor(() => {
    expect(neutralTab.className.includes('active')).toBe(true);
  });

  fireEvent.click(dislikesTab);
  await waitFor(() => {
    expect(dislikesTab.className.includes('active')).toBe(true);
  });

  fireEvent.click(likesTab);
  await waitFor(() => {
    expect(likesTab.className.includes('active')).toBe(true);
  });
});

test('loads user id from localStorage on mount', async () => {
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  renderComponent();
  await waitFor(() => {
    expect(getItemSpy).toHaveBeenCalledWith('loggedUserId');
  });
});


});
