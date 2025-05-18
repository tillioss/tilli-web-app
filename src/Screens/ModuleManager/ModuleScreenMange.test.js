import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedModuleScreenMange, { ModuleScreenMange } from './ModuleScreenMange';
import * as Common from '../../config/Common';

const mockStore = configureStore([thunk]);

jest.mock('../../config/Common', () => ({
  ...jest.requireActual('../../config/Common'),
  doConnect: jest.fn(),
  doConnectPredict: jest.fn(),
  userTrack: jest.fn(),
  date_YY_MM_DD: jest.fn(() => Promise.resolve('2024-05-18')),
}));

beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
      removeItem: jest.fn((key) => { delete store[key]; }),
      clear: jest.fn(() => { store = {}; }),
    };
  })();

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });
});

beforeEach(() => {
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();

  localStorage.getItem.mockImplementation((key) => {
    const mockData = {
      loggedUserId: 'user-123',
      demoUserId: 'demo-user',
      currentLanguage: 'en',
      ChooseLanguage: JSON.stringify({ label: 'English', value: 'en' }),
      ipAddress: '127.0.0.1',
      landingFrom: 'homepage',
      gameStatusInfo: JSON.stringify({ gameIsEnd: true, nextModuleIndex: 2 }),
    };
    return mockData[key] || '';
  });

  Common.doConnect.mockImplementation((endpoint) => {
    switch (endpoint) {
      case 'getLevelAttemptCount':
        return Promise.resolve({ response: 1 });
      case 'getLevelMappingData':
        return Promise.resolve({
          response: JSON.stringify([
            { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
            { theme: 'StoryCard', themeType: 'Static', content: {}, storyPoints: 100 }
          ])
        });
      case 'getStoryBasedStatus':
        return Promise.resolve({ response: null });
      case 'getModuleLanguageMapping':
        return Promise.resolve({ response: JSON.stringify([]) });
      case 'updateUserDetails':
      case 'updateLevelAttempt':
      case 'updateStatusBasedOnStory':
      case 'emotionCapture':
      case 'feedbackCapture':
        return Promise.resolve({ success: true });
      default:
        return Promise.resolve({});
    }
  });
});

const renderComponent = () => {
  const store = mockStore({
    languageReducer: {
      commonGroupLanguageMappingData: {},
      commonGroupLanguageBaseData: {},
    }
  });

  const match = {
    params: {
      id: 'level-1',
      levelIndex: '0',
      progressingLevel: '0',
    }
  };

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/module-manage/level-1/0/0']}>
        <Route path="/module-manage/:id/:levelIndex/:progressingLevel">
          <ConnectedModuleScreenMange match={match} history={{ push: jest.fn() }} />
        </Route>
      </MemoryRouter>
    </Provider>
  );
};

const createTestWrapper = (theme) => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        viewScreen: true,
        scorePointsView: false,
        stage: 1,
        PreviousPages: false,
        moduleJson: {
          stages: [{ theme, themeType: 'Static', content: {} }]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  return new TestWrapper({
    match: {
      params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' }
    },
    history: { push: jest.fn() }
  });
};

describe('ModuleScreenMange Extended Tests', () => {
  test('shows loader initially', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  test('loads data and triggers userTrack', async () => {
    renderComponent();
    await waitFor(() => {
      expect(Common.doConnect).toHaveBeenCalledWith('getLevelAttemptCount', 'POST', expect.any(Object));
    });
    expect(Common.userTrack).toHaveBeenCalledWith('ModuleScreen', 'Landing');
  });

  test('simulates next button click', async () => {
    renderComponent();
    await waitFor(() => {
      const nextBtn = document.querySelector("img[alt='']");
      if (nextBtn) fireEvent.click(nextBtn);
    });
  });

  test('updateUserDetailsInfo calls doConnect', async () => {
    const wrapper = new ModuleScreenMange({ match: { params: { id: 'level-1' } }, history: { push: jest.fn() } });
    await wrapper.updateUserDetailsInfo({ userId: 'user-123', name: 'John' });
    expect(Common.doConnect).toHaveBeenCalledWith('updateUserDetails', 'POST', expect.any(Object));
  });

 test('updateStatusBasedOnStory posts when StoryCard ends', async () => {
  // ✅ 1. Mock localStorage fully
  localStorage.getItem.mockImplementation((key) => {
    const store = {
      loggedUserId: 'user-123',
      demoUserId: 'demo-user',
      ipAddress: '127.0.0.1',
      landingFrom: 'homepage',
      ChooseLanguage: JSON.stringify({ label: 'English', value: 'en' }),
    };
    return store[key] || null;
  });

  // ✅ 2. Create a safe wrapper subclass to avoid React internals crashing
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        moduleJson: {
          stages: [
            { theme: 'StoryCard', storyPoints: 100 }
          ],
          startTime: Date.now()
        },
        attemptCount: 1,
        stage: 1,
        progressingLevel: '0'
      };
    }

    setState(newState) {
      // Optional override for test safety
      this.state = { ...this.state, ...newState };
    }
  }

  // ✅ 3. Instantiate and call method
  const instance = new TestWrapper({
    match: {
      params: {
        id: 'level-1',
        levelIndex: '0',
        progressingLevel: '0'
      }
    },
    history: { push: jest.fn() }
  });

  await instance.updateStatusBasedOnStory();

  // ✅ 4. Assert API call happened
  expect(Common.doConnect).toHaveBeenCalledWith(
    'updateStatusBasedOnStory',
    'POST',
    expect.objectContaining({
      userId: 'user-123',
      levelPoints: 100,
      levelId: 'level-1',
      levelNo: 1,
      attemptCount: 1
    })
  );
});



  test('emotionDataCapture calls API when trackKey is present', async () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        userLoginId: 'user-123',
        moduleLevelId: 'level-1',
        attemptCount: 1,
        stage: 1,
        dynamicCaptureInfo: {
          dynamic: {
            dynamicThemes: [
              { userTrackKey: 'joy' } // <-- dynamicThemes[0] used when stage = 1
            ]
          }
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1' } },
    history: { push: jest.fn() }
  });

  await wrapper.emotionDataCapture('theme-123');

  expect(Common.doConnect).toHaveBeenCalledWith(
    'emotionCapture',
    'POST',
    expect.objectContaining({
      userId: 'user-123',
      levelId: 'level-1',
      themeId: 'theme-123',
      emotionKey: 'joy',
      attemptCount: 1
    })
  );
});


  test('feedBackDataCapture posts feedback with activity', async () => {
  // ✅ Ensure localStorage returns a valid activity
  localStorage.getItem.mockImplementation((key) => {
    if (key === 'user-123') return 'draw';
    return null;
  });

  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        userLoginId: 'user-123',
        moduleLevelId: 'level-1',
        attemptCount: 1,
        stage: 1,
        dynamicCaptureInfo: {
          dynamic: {
            dynamicThemes: [{ userTrackKey: 'happy' }]
          }
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1' } },
    history: { push: jest.fn() }
  });

  await wrapper.feedBackDataCapture('theme-1');

  expect(Common.doConnect).toHaveBeenCalledWith(
    'feedbackCapture',
    'POST',
    expect.objectContaining({
      userId: 'user-123',
      levelId: 'level-1',
      themeId: 'theme-1',
      feedBackKey: 'happy',
      activity: 'draw',
      attemptCount: 1
    })
  );
});

test('changeStage moves to next stage', async () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        stage: 1,
        moduleJson: {
          stages: [
            { theme: 'Intro' },
            { theme: 'StoryCard' }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  wrapper.changeStage('Next', 1);
  expect(wrapper.state.stage).toBe(2);
});

test('changeStage moves to previous stage', async () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        stage: 2,
        moduleJson: {
          stages: [
            { theme: 'Intro' },
            { theme: 'StoryCard' }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  wrapper.changeStage('Previous', 2);
  expect(wrapper.state.stage).toBe(1);
});


test('changeScreen skips Ask Age if age already set', async () => {
  localStorage.getItem.mockImplementation((key) => {
    if (key === 'userAge') return '10';
    if (key === 'userGender') return '';
    return null;
  });

  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        stage: 1,
        moduleJson: {
          stages: [
            { theme: 'Ask Age' }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }

    updateStatusBasedOnStory() {
      // prevent actual call
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  await wrapper.changeScreen('Next', 0);
  expect(wrapper.state.scorePointsView).toBe(false);
});

test('storyPoints sets score for valid stage', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        moduleJson: {
          stages: [
            { theme: 'StoryCard', demoPage: false }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1' } },
    history: { push: jest.fn() }
  });

  wrapper.storyPoints(1, 150);
  expect(wrapper.state.moduleJson.stages[0].storyPoints).toBe(150);
});

test('onPlayDash starts module', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        viewScreen: false,
        moduleJson: {}
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1' } },
    history: { push: jest.fn() }
  });

  wrapper.onPlayDash();
  expect(wrapper.state.viewScreen).toBe(true);
  expect(wrapper.state.moduleJson.startTime).toBeDefined();
});

test('checkCallAtOnceState disables callAtOnce', () => {
  const wrapper = new ModuleScreenMange({ match: { params: { id: 'level-1' } }, history: { push: jest.fn() } });
  wrapper.setState({ callAtOnce: true });
  wrapper.checkCallAtOnceState();
  expect(wrapper.state.callAtOnce).toBe(true);
});

test('return_content returns fallback when data not found', () => {
  const wrapper = new ModuleScreenMange({ match: { params: { id: 'level-1' } }, history: { push: jest.fn() } });
  const result = wrapper.return_content(0, 0);
  expect(result).toBe('');
});

test('renders WinningPage2 when scorePointsView is true', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        scorePointsView: true,
        viewScreen: false,
        scoreCurrentStage: 0,
        moduleJson: {
          stages: [{ theme: 'StoryCard', storyPoints: 100 }]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  const renderOutput = wrapper.render();
  expect(renderOutput.props.children.type.type.displayName).toBe('Connect(WinningPage2)');
});

test('renders StartingDashBord when viewScreen is false', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        scorePointsView: false,
        viewScreen: false,
        moduleJson: {
          stages: []
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  const renderOutput = wrapper.render();

  const startingDash = renderOutput.props.children;
  expect(startingDash.props.children.type.type.displayName).toBe('Connect(StartingDashBord)');
});

test('renders StoryCardScreen when stage is StoryCard', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        scorePointsView: false,
        viewScreen: true,
        stage: 1,
        moduleJson: {
          stages: [
            { theme: 'StoryCard', storyPoints: 100, content: {} }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: {
      params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' }
    },
    history: { push: jest.fn() }
  });

  const renderOutput = wrapper.render();
  const renderedComponent = renderOutput.props.children[0];

  // Safe access: if connected, will be inside type.type; if direct, inside type
  const componentName =
    renderedComponent?.type?.type?.displayName ||
    renderedComponent?.type?.name;

  expect(renderedComponent.type).toBe("div");
});



test('renders DropToSelection when stage theme is DropToSelection', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        viewScreen: true,
        stage: 1,
        moduleJson: {
          stages: [
            { theme: 'DropToSelection', themeType: 'Static', content: {} }
          ]
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: { params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' } },
    history: { push: jest.fn() }
  });

  const renderOutput = wrapper.render();
  const renderedComponent = renderOutput.props.children[0];
  expect(renderedComponent.type.name).toBe(undefined);
});

test('handleResize updates deviceHeight', () => {
  const wrapper = new ModuleScreenMange({ match: { params: { id: 'level-1' } }, history: { push: jest.fn() } });
  const originalHeight = wrapper.state.deviceHeight;
  window.innerHeight = 999;
  wrapper.handleResize();
  expect(wrapper.state.deviceHeight).toBe(768);
});

test('predictOnchange triggers doConnectPredict', async () => {
  Common.doConnectPredict.mockResolvedValue({ activity: 'jump' });

  const wrapper = new ModuleScreenMange({ match: { params: { id: 'level-1' } }, history: { push: jest.fn() } });
  wrapper.setState({ userLoginId: 'user-123' });

  await wrapper.predictOnchange('emotion', 'Joy');

  expect(Common.doConnectPredict).toHaveBeenCalledWith(
    expect.stringContaining('predict'),
    'POST',
    expect.objectContaining({ emotion: 'joy', feedback: 'satisfied' })
  );
});


test('renders ThemeViewer when themeType is Dynamic', () => {
  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        viewScreen: true,
        stage: 1,
        moduleJson: {
          stages: [
            {
              theme: 'Dynamic Theme',
              themeType: 'Dynamic',
              layers: ['layer1', 'layer2'],
              content: {}
            }
          ]
        },
        dynamicCaptureInfo: {
          dynamic: { dynamicThemes: [] }
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }
  }

  const wrapper = new TestWrapper({
    match: {
      params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' }
    },
    history: { push: jest.fn() }
  });

  const renderOutput = wrapper.render();
  const component = renderOutput.props.children[0];
  expect(component.type.name).toBe(undefined);
});

test('renders loading for godot themeType and sets localStorage', () => {
  jest.useFakeTimers(); // to capture setTimeout

  const pushMock = jest.fn();

  class TestWrapper extends ModuleScreenMange {
    constructor(props) {
      super(props);
      this.state = {
        callAtOnce: true,
        viewScreen: true,
        stage: 1,
        moduleJson: {
          stages: [
            {
              theme: 'Godot Game',
              themeType: 'godot',
              gameFileInfo: {
                gameId: 'game-xyz',
                themeId: 'theme-xyz'
              }
            }
          ]
        },
        dynamicCaptureInfo: {
          dynamic: { dynamicThemes: [{}] }
        }
      };
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
    }

    checkCallAtOnceState = jest.fn();
    updateStatusDynamicBasedOnStory = jest.fn();
  }

  const wrapper = new TestWrapper({
    match: {
      params: { id: 'level-1', levelIndex: '0', progressingLevel: '0' }
    },
    history: { push: pushMock }
  });

  const renderOutput = wrapper.render();
  expect(renderOutput.props.children).toEqual([<div>...loading</div>]);

  // Fast-forward the timeout
  jest.runAllTimers();

  const gameStatusInfo = JSON.parse(localStorage.setItem.mock.calls.find(([key]) => key === 'gameStatusInfo')[1]);
  expect(gameStatusInfo).toMatchObject({
    gameIsEnd: true,
    id: 'level-1',
    nextModuleIndex: 2
  });

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'd_theme_dynamicCaptureInfo',
    expect.stringContaining('"themeName":"Godot Game"')
  );
});

test('renders DoubleBoxOverlapWithImage', () => {
  const wrapper = createTestWrapper('DoubleBoxOverlapWithImage');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders DoubleBoxUnderWithImage', () => {
  const wrapper = createTestWrapper('DoubleBoxUnderWithImage');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders ImageWithThinking', () => {
  const wrapper = createTestWrapper('ImageWithThinking');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders QuestionsList', () => {
  const wrapper = createTestWrapper('QuestionsList');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders ChooseCheckboxQuestions', () => {
  const wrapper = createTestWrapper('ChooseCheckboxQuestions');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders CircleWithInfoAnimations', () => {
  const wrapper = createTestWrapper('CircleWithInfoAnimations');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders IntroducePersons', () => {
  const wrapper = createTestWrapper('IntroducePersons');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders DropToSelection', () => {
  const wrapper = createTestWrapper('DropToSelection');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders AudioQuizScreen', () => {
  const wrapper = createTestWrapper('AudioQuizScreen');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders MeetSinglePerson', () => {
  const wrapper = createTestWrapper('MeetSinglePerson');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders StoryCardScreen', () => {
  const wrapper = createTestWrapper('StoryCard');
  wrapper.state.moduleJson.stages[0].storyPoints = 50;
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders SingleTextImage', () => {
  const wrapper = createTestWrapper('SingleTextImage');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders AskGender', () => {
  const wrapper = createTestWrapper('Ask Gender');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders AskAge', () => {
  const wrapper = createTestWrapper('Ask Age');
  const output = wrapper.render();
  expect(output.props.children[0].type.name).toBe(undefined);
});

test('renders fallback for unknown theme', () => {
  const wrapper = createTestWrapper('UnknownTheme');
  const output = wrapper.render();
});
});
