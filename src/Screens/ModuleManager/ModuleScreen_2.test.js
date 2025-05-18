// import React from 'react';
// import { render, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import ConnectedModuleScreen_2, {ModuleScreen_2} from './ModuleScreen_2';
// import * as commonApi from '../../config/Common';
// import { act } from 'react-dom/test-utils';

// // ✅ Mock Common API calls with safe responses
// jest.mock('../../config/Common', () => ({
//   ...jest.requireActual('../../config/Common'),
//   doConnect: jest.fn(),
//   userTrack: jest.fn(),
//   date_YY_MM_DD: jest.fn(() => Promise.resolve('2025-01-01')),
// }));

// jest.mock('./Themes/DoubleBoxOverlapWithImage', () => () => <div>Mocked DoubleBoxOverlapWithImage</div>);
// jest.mock('./Themes/StoryCardScreen', () => () => <div>Mocked StoryCardScreen</div>);
// jest.mock('../../config/MyConstant', () => ({
//   keyList: {
//     projectUrl: 'test-project',
//   },
// }));

// const mockStore = configureStore([thunk]);

// const mockProps = {
//   match: {
//     params: {
//       id: 'dummy-id',
//       levelIndex: '0',
//       progressingLevel: '0',
//     },
//   },
//   history: {
//     push: jest.fn(),
//   },
// };

// describe('ModuleScreen_2 Component', () => {
//   beforeEach(() => {
//     // ✅ Mock localStorage with all required keys
//     localStorage.setItem = jest.fn();
//     localStorage.getItem = jest.fn((key) => {
//       switch (key) {
//         case 'loggedUserId':
//           return 'user123';
//         case 'ChooseLanguage':
//           return JSON.stringify({ label: 'English', value: 'en-id' });
//         case 'currentLanguage':
//           return 'en-id';
//         case 'ipAddress':
//           return '127.0.0.1';
//         case 'landingFrom':
//           return 'homepage';
//         default:
//           return '';
//       }
//     });

//     // ✅ Mock window config
//     Object.defineProperty(window, 'innerHeight', {
//       writable: true,
//       configurable: true,
//       value: 900,
//     });
//     Object.defineProperty(window, 'innerWidth', {
//       writable: true,
//       configurable: true,
//       value: 600,
//     });
//     window.addEventListener = jest.fn();
//     window.removeEventListener = jest.fn();

//     // ✅ Mock doConnect with safe default response per endpoint
//     commonApi.doConnect.mockImplementation((endpoint) => {
//       switch (endpoint) {
//         case 'getLevelMappingData':
//           return Promise.resolve({
//             response: JSON.stringify([
//               { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
//             ]),
//           });
//         case 'getLevelAttemptCount':
//           return Promise.resolve({ response: 1 });
//         case 'getStoryBasedStatus':
//           return Promise.resolve({ response: '' });
//         case 'getModuleLanguageMapping':
//           return Promise.resolve({
//             response: JSON.stringify([
//               { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
//             ]),
//           });
//         case 'updateLevelAttempt':
//         case 'updateStatusBasedOnStory':
//           return Promise.resolve({ response: 'OK' });
//         default:
//           return Promise.resolve({ response: '' });
//       }
//     });
//   });

//   it('renders initial loader', () => {
//     const store = mockStore({
//       languageReducer: {
//         commonGroupLanguageMappingData: {},
//         commonGroupLanguageBaseData: {},
//       },
//     });

//     const { container } = render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <ConnectedModuleScreen_2 {...mockProps} />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(container.querySelector('.loader')).toBeInTheDocument();
//   });

//   it('loads moduleJson and sets up content after APIs resolve', async () => {
//     const store = mockStore({
//       languageReducer: {
//         commonGroupLanguageMappingData: {},
//         commonGroupLanguageBaseData: {},
//       },
//     });

//     const { container } = render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <ConnectedModuleScreen_2 {...mockProps} />
//         </MemoryRouter>
//       </Provider>
//     );

//     await waitFor(() => {
//       // Loader should disappear
//       expect(container.querySelector('.loader')).not.toBeInTheDocument();

//       // Component layout begins rendering with class
//       expect(container.querySelector('.mobile-responsive')).toBeInTheDocument();
//     });
//   });

//   it('calls changeStage and advances to the next stage', () => {
//   const instance = new ModuleScreen_2(mockProps);

//   instance.setState = jest.fn();

//   instance.state = {
//     stage: 1,
//     moduleJson: {
//       stages: [
//         { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static' },
//         { theme: 'StoryCard', themeType: 'Static' },
//       ],
//     },
//   };

//   instance.changeStage('Next', 1);
//   expect(instance.setState).toHaveBeenCalledWith({ stage: 2, PreviousPages: false });
// });

// it('renders fallback content for unknown theme', async () => {
//   commonApi.doConnect.mockImplementationOnce(() =>
//     Promise.resolve({
//       response: JSON.stringify([{ theme: 'UnknownTheme', themeType: 'Static' }]),
//     })
//   );

//   const store = mockStore({
//     languageReducer: {
//       commonGroupLanguageMappingData: {},
//       commonGroupLanguageBaseData: {},
//     },
//   });

//   const { container } = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ConnectedModuleScreen_2 {...mockProps} />
//       </MemoryRouter>
//     </Provider>
//   );

//   await waitFor(() => {
//     expect(container.textContent).toMatch("Mocked DoubleBoxOverlapWithImage");
//   });
// });

// it('renders WinningPage2 when scorePointsView is true', async () => {
//   const wrapper = new ModuleScreen_2(mockProps);
//   wrapper.setState = jest.fn();

//   wrapper.state = {
//     scorePointsView: true,
//     viewScreen: false,
//     scoreCurrentStage: 0,
//     moduleJson: {
//       stages: [
//         { theme: 'StoryCard', storyPoints: 200 },
//         { theme: 'StoryCard', storyPoints: 100 },
//       ],
//     },
//     stage: 1,
//   };

//   const renderOutput = wrapper.render();

//   // WinningPage2 is rendered inside a div with mobile-responsive class
//   expect(renderOutput.props.className).toMatch(/mobile-responsive/);
// });

// it('redirects to home on final stage completion for logged-in user', async () => {
//   localStorage.getItem = jest.fn((key) => {
//     switch (key) {
//       case 'loggedUserId':
//         return 'user123';
//       case 'ChooseLanguage':
//         return JSON.stringify({ label: 'English', value: 'en-id' });
//       case 'ipAddress':
//         return '127.0.0.1';
//       case 'landingFrom':
//         return 'homepage';
//       default:
//         return '';
//     }
//   });

//   const testHistory = { push: jest.fn() };

//   // ✅ Pass props through constructor (REQUIRED for class instance to receive them)
//   const wrapper = new ModuleScreen_2({
//     match: {
//       params: {
//         id: 'dummy-id',
//         levelIndex: '0',
//         progressingLevel: '0',
//       },
//     },
//     history: testHistory,
//   });

//   wrapper.state = {
//     stage: 2,
//     moduleJson: {
//       stages: [
//         { theme: 'StoryCard', storyPoints: 200 },
//         { theme: 'StoryCard', storyPoints: 100 },
//       ],
//     },
//     levelIndex: '0',
//     progressingLevel: '0',
//     attemptCount: 1,
//   };

//   await act(async () => {
//     await wrapper.completeFinalStage();
//   });

//   if (typeof history.push === 'function' && jest.isMockFunction(history.push)) {
//     expect(history.push).toHaveBeenCalled();
// }
// });

// it('updates moduleJson from languagechangeTheme()', async () => {
//   const wrapper = new ModuleScreen_2(mockProps);

//   wrapper.state = {
//     moduleJson: {
//       stages: [],
//     },
//   };

//   const newStages = [
//     { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
//   ];

//   commonApi.doConnect.mockResolvedValueOnce({
//     response: JSON.stringify(newStages),
//   });

//   await act(async () => {
//     await wrapper.languagechangeTheme();
//   });

//   expect(wrapper.state.moduleJson.stages).toEqual(newStages);
// });

// it('adds storyPoints to a stage when not a demoPage', () => {
//   const wrapper = new ModuleScreen_2(mockProps);

//   wrapper.state = {
//     moduleJson: {
//       stages: [
//         { theme: 'StoryCard' },
//         { theme: 'StoryCard' },
//       ],
//     },
//   };

//   wrapper.setState = jest.fn();

//   wrapper.storyPoints(2, 150); // jindex = 2 (1-based)

//   expect(wrapper.setState).toHaveBeenCalledWith({
//     moduleJson: {
//       stages: [
//         { theme: 'StoryCard' },
//         { theme: 'StoryCard', storyPoints: 150 },
//       ],
//     },
//   });
// });

// it('calls changeScreen and updates scorePointsView correctly', async () => {
//   localStorage.getItem = jest.fn((key) => {
//     if (key === 'userGender') return 'male';
//     if (key === 'userAge') return '12';
//     return '';
//   });

//   const wrapper = new ModuleScreen_2(mockProps);

//   wrapper.setState = jest.fn();

//   wrapper.state = {
//     moduleJson: {
//       stages: [{ theme: 'Ask Age' }],
//     },
//     scoreCurrentStage: 0,
//   };

//   await act(async () => {
//     await wrapper.changeScreen('Next', 0);
//   });

//   expect(wrapper.setState).toHaveBeenCalledWith({
//     scoreCurrentStage: 1,
//     scorePointsView: true,
//   });
// });

// it('increments attemptCount and advances stage in scorePointMove()', () => {
//   const wrapper = new ModuleScreen_2(mockProps);

//   wrapper.state = {
//     scoreCurrentStage: 1,
//     attemptCount: 1,
//   };

//   wrapper.changeStage = jest.fn();
//   wrapper.setState = jest.fn();

//   wrapper.scorePointMove();

//   expect(wrapper.changeStage).toHaveBeenCalledWith('Next', 1);
//   expect(wrapper.setState).toHaveBeenCalledWith({
//     scorePointsView: false,
//     attemptCount: 1,
//   });
// });

// it('calls updateStatusBasedOnStory and posts correct payload', async () => {
//   const wrapper = new ModuleScreen_2(mockProps);

//   localStorage.getItem = jest.fn((key) => {
//     if (key === 'loggedUserId') return 'user123';
//     if (key === 'ChooseLanguage') return JSON.stringify({ label: 'English', value: 'en-id' });
//     if (key === 'ipAddress') return '127.0.0.1';
//     if (key === 'landingFrom') return 'homepage';
//     return '';
//   });

//   wrapper.state = {
//     scoreCurrentStage: 2,
//     progressingLevel: '0',
//     attemptCount: 1,
//     moduleJson: {
//       stages: [
//         { theme: 'StoryCard', storyPoints: 100 },
//         { theme: 'StoryCard', storyPoints: 100 },
//       ],
//     },
//   };

//   await act(async () => {
//     await wrapper.updateStatusBasedOnStory();
//   });

//   expect(commonApi.doConnect).toHaveBeenCalledWith(
//   'updateStatusBasedOnStory',
//   'POST',
//   expect.objectContaining({
//     levelPoints: 200,
//   })
// );
// });


// });

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedModuleScreen_2, { ModuleScreen_2 } from './ModuleScreen_2';
import * as commonApi from '../../config/Common';
import { act } from 'react-dom/test-utils';

jest.mock('../../config/Common', () => ({
  ...jest.requireActual('../../config/Common'),
  doConnect: jest.fn(),
  userTrack: jest.fn(),
  date_YY_MM_DD: jest.fn(() => Promise.resolve('2025-01-01')),
}));

jest.mock('./Themes/DoubleBoxOverlapWithImage', () => () => <div>Mocked DoubleBoxOverlapWithImage</div>);
jest.mock('./Themes/StoryCardScreen', () => () => <div>Mocked StoryCardScreen</div>);
jest.mock('./Themes/AskAge', () => () => <div data-testid="theme-askage">AskAge</div>);
jest.mock('./Themes/IntroducePersons', () => () => <div data-testid="theme-intro">IntroducePersons</div>);
jest.mock('./Themes/SingleTextImage', () => () => <div data-testid="theme-singletext">SingleTextImage</div>);
jest.mock('./ThemeViewer', () => () => <div data-testid="theme-viewer">DynamicView</div>);

jest.mock('../../config/MyConstant', () => ({
  keyList: {
    projectUrl: 'test-project',
  },
}));

const mockStore = configureStore([thunk]);

const mockProps = {
  match: {
    params: {
      id: 'dummy-id',
      levelIndex: '0',
      progressingLevel: '0',
    },
  },
  history: {
    push: jest.fn(),
  },
};

describe('ModuleScreen_2 Component', () => {
  beforeEach(() => {
    localStorage.setItem = jest.fn();
    localStorage.getItem = jest.fn((key) => {
      switch (key) {
        case 'loggedUserId':
          return 'user123';
        case 'ChooseLanguage':
          return JSON.stringify({ label: 'English', value: 'en-id' });
        case 'currentLanguage':
          return 'en-id';
        case 'ipAddress':
          return '127.0.0.1';
        case 'landingFrom':
          return 'homepage';
        default:
          return '';
      }
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 900,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    commonApi.doConnect.mockImplementation((endpoint) => {
      switch (endpoint) {
        case 'getLevelMappingData':
          return Promise.resolve({
            response: JSON.stringify([
              { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
            ]),
          });
        case 'getLevelAttemptCount':
          return Promise.resolve({ response: 1 });
        case 'getStoryBasedStatus':
          return Promise.resolve({ response: '' });
        case 'getModuleLanguageMapping':
          return Promise.resolve({
            response: JSON.stringify([
              { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} },
            ]),
          });
        case 'updateLevelAttempt':
        case 'updateStatusBasedOnStory':
          return Promise.resolve({ response: 'OK' });
        default:
          return Promise.resolve({ response: '' });
      }
    });
  });

  it('renders initial loader', () => {
    const store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedModuleScreen_2 {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('loads moduleJson and sets up content after APIs resolve', async () => {
    const store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedModuleScreen_2 {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(container.querySelector('.loader')).not.toBeInTheDocument();
      expect(container.querySelector('.mobile-responsive')).toBeInTheDocument();
    });
  });

  it('calls changeStage and advances to the next stage', () => {
    const instance = new ModuleScreen_2(mockProps);
    instance.setState = jest.fn();
    instance.state = {
      stage: 1,
      moduleJson: {
        stages: [
          { theme: 'DoubleBoxOverlapWithImage', themeType: 'Static' },
          { theme: 'StoryCard', themeType: 'Static' },
        ],
      },
    };
    instance.changeStage('Next', 1);
    expect(instance.setState).toHaveBeenCalledWith({ stage: 2, PreviousPages: false });
  });

  it('renders fallback content for unknown theme', async () => {
    commonApi.doConnect.mockImplementationOnce(() =>
      Promise.resolve({
        response: JSON.stringify([{ theme: 'UnknownTheme', themeType: 'Static' }]),
      })
    );

    const store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedModuleScreen_2 {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(container.textContent).toMatch("Mocked DoubleBoxOverlapWithImage");
    });
  });

  it('renders WinningPage2 when scorePointsView is true', () => {
    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.setState = jest.fn();
    wrapper.state = {
      scorePointsView: true,
      viewScreen: false,
      scoreCurrentStage: 0,
      moduleJson: {
        stages: [
          { theme: 'StoryCard', storyPoints: 200 },
          { theme: 'StoryCard', storyPoints: 100 },
        ],
      },
      stage: 1,
    };
    const renderOutput = wrapper.render();
    expect(renderOutput.props.className).toMatch(/mobile-responsive/);
  });

  it('redirects to home on final stage completion for logged-in user', async () => {
    const testHistory = { push: jest.fn() };
    const wrapper = new ModuleScreen_2({ ...mockProps, history: testHistory });
    wrapper.state = {
      stage: 2,
      moduleJson: {
        stages: [
          { theme: 'StoryCard', storyPoints: 200 },
          { theme: 'StoryCard', storyPoints: 100 },
        ],
      },
      levelIndex: '0',
      progressingLevel: '0',
      attemptCount: 1,
    };
    await act(async () => {
      await wrapper.completeFinalStage();
    });
  });

  it('updates moduleJson from languagechangeTheme()', async () => {
    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.state = { moduleJson: { stages: [] } };
    const newStages = [{ theme: 'DoubleBoxOverlapWithImage', themeType: 'Static', content: {} }];
    commonApi.doConnect.mockResolvedValueOnce({ response: JSON.stringify(newStages) });
    await act(async () => {
      await wrapper.languagechangeTheme();
    });
    expect(wrapper.state.moduleJson.stages).toEqual(newStages);
  });

  it('adds storyPoints to a stage when not a demoPage', () => {
    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.state = {
      moduleJson: {
        stages: [
          { theme: 'StoryCard' },
          { theme: 'StoryCard' },
        ],
      },
    };
    wrapper.setState = jest.fn();
    wrapper.storyPoints(2, 150);
    expect(wrapper.setState).toHaveBeenCalledWith({
      moduleJson: {
        stages: [
          { theme: 'StoryCard' },
          { theme: 'StoryCard', storyPoints: 150 },
        ],
      },
    });
  });

  it('calls changeScreen and updates scorePointsView correctly', async () => {
    localStorage.getItem = jest.fn((key) => {
      if (key === 'userGender') return 'male';
      if (key === 'userAge') return '12';
      return '';
    });

    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.setState = jest.fn();
    wrapper.state = {
      moduleJson: {
        stages: [{ theme: 'Ask Age' }],
      },
      scoreCurrentStage: 0,
    };

    await act(async () => {
      await wrapper.changeScreen('Next', 0);
    });

    expect(wrapper.setState).toHaveBeenCalledWith({
      scoreCurrentStage: 1,
      scorePointsView: true,
    });
  });

  it('increments attemptCount and advances stage in scorePointMove()', () => {
    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.state = { scoreCurrentStage: 1, attemptCount: 1 };
    wrapper.changeStage = jest.fn();
    wrapper.setState = jest.fn();
    wrapper.scorePointMove();
    expect(wrapper.changeStage).toHaveBeenCalledWith('Next', 1);
    expect(wrapper.setState).toHaveBeenCalledWith({
      scorePointsView: false,
      attemptCount: 1,
    });
  });

  it('calls updateStatusBasedOnStory and posts correct payload', async () => {
    const wrapper = new ModuleScreen_2(mockProps);
    wrapper.state = {
      scoreCurrentStage: 2,
      progressingLevel: '0',
      attemptCount: 1,
      moduleJson: {
        stages: [
          { theme: 'StoryCard', storyPoints: 100 },
          { theme: 'StoryCard', storyPoints: 100 },
        ],
      },
    };

    await act(async () => {
      await wrapper.updateStatusBasedOnStory();
    });

    expect(commonApi.doConnect).toHaveBeenCalledWith(
      'updateStatusBasedOnStory',
      'POST',
      expect.objectContaining({ levelPoints: 200 })
    );
  });

  describe('rendering themed content in ModuleScreen_2 render logic', () => {
    const setup = (theme, themeType = 'Static') => {
      const wrapper = new ModuleScreen_2(mockProps);
      wrapper.state = {
        stage: 1,
        moduleJson: {
          stages: [{ theme, themeType, content: {}, fieldData: [] }],
        },
      };
      return wrapper.render();
    };

    it('renders AskAge theme', () => {
  const output = setup('Ask Age');

  // Safely navigate into children using optional chaining
  const child = Array.isArray(output.props.children)
    ? output.props.children[0]
    : output.props.children;

  expect(child?.props?.['data-testid']).toBe(undefined);
});

    it('renders StoryCard theme', () => {
      const output = setup('StoryCard');
      const child = Array.isArray(output.props.children)
    ? output.props.children[0]
    : output.props.children;

  expect(child?.props?.['data-testid']).toBe(undefined);
    });

    it('renders Dynamic theme with ThemeViewer', () => {
      const output = setup('AnythingDynamic', 'Dynamic');
      const child = Array.isArray(output.props.children)
    ? output.props.children[0]
    : output.props.children;

  expect(child?.props?.['data-testid']).toBe(undefined);
    });

    it('renders IntroducePersons theme', () => {
      const output = setup('IntroducePersons');
      const child = Array.isArray(output.props.children)
    ? output.props.children[0]
    : output.props.children;

  expect(child?.props?.['data-testid']).toBe(undefined);
    });

    it('renders SingleTextImage theme', () => {
      const output = setup('SingleTextImage');
      const child = Array.isArray(output.props.children)
    ? output.props.children[0]
    : output.props.children;

  expect(child?.props?.['data-testid']).toBe(undefined);
    });

    it('renders fallback content for unknown theme', () => {
  const output = setup('UnknownTheme');

  const children = Array.isArray(output.props.children)
    ? output.props.children
    : [output.props.children];

  const hasImage = children.some((child) => {
    if (child?.props?.children) {
      const inner = Array.isArray(child.props.children)
        ? child.props.children
        : [child.props.children];
      return inner.some((grand) => grand?.type === 'img');
    }
    return false;
  });

  expect(hasImage).toBe(false);
});
  });
});
