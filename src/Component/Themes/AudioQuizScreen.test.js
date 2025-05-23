import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AudioQuizScreen from './AudioQuizScreen';
import * as SpeechRecognition from 'react-speech-recognition';

// --- Mocks for images ---
jest.mock('../../images/fillIconOnly.png', () => 'backImage');
jest.mock('../../images/outlineRightIcon.png', () => 'nextImage');
jest.mock('../../images/repeat.png', () => 'repeatImage');
jest.mock('../../images/outlineIconOnly.png', () => 'outlineIconOnlyImage');
jest.mock('../../images/outlineIconRed.png', () => 'outlineIconRedImage');
jest.mock('../../images/nounVoiceRecord.png', () => 'nounVoiceRecordImage');
jest.mock('../../images/people_set.png', () => 'peopleSetImage');
jest.mock('../../images/down_black.png', () => 'downBlackImage');

// --- Mocks for Speech Recognition ---
jest.mock('react-speech-recognition', () => ({
  useSpeechRecognition: () => ({ transcript: 'I feel happy' }),
  browserSupportsSpeechRecognition: jest.fn(),
  startListening: jest.fn(),
  stopListening: jest.fn(),
}));

const mockStore = configureStore([thunk]);

const setup = (overrides = {}) => {
  const store = mockStore({
    languageReducer: {
      commonGroupLanguageMappingData: {},
      commonGroupLanguageBaseData: {},
    },
    ...overrides,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <AudioQuizScreen
          data={{
            title: 'Feelings Quiz',
            content: {
              feelingsDataList: [
                { questions: 'How are you?', results: '' },
                { questions: 'What made you feel this way?', results: '' },
              ],
            },
          }}
          stage={1}
          themeType="StoryCard"
          changeindex={jest.fn()}
          changeStage={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );
};

describe('AudioQuizScreen', () => {
  beforeEach(() => {
    SpeechRecognition.browserSupportsSpeechRecognition.mockReturnValue(true);
  });

  it('renders the title and first question', () => {
    setup();
    expect(screen.getByText('Feelings Quiz')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('handles mic button clicks (start/stop listening)', async () => {
  setup();

  const micStart = screen.getByTestId("record-button");
  fireEvent.click(micStart);

  expect(SpeechRecognition.startListening).toHaveBeenCalled();

  // Wait for stop button to appear due to state change
  const micStop = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop);

  expect(SpeechRecognition.stopListening).toHaveBeenCalled();
});

  it('completes all questions and shows next arrow', async () => { 
  setup();

  const micStart1 = screen.getByTestId("record-button");
  fireEvent.click(micStart1);
  expect(SpeechRecognition.startListening).toHaveBeenCalled();

  const micStop1 = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop1);
  expect(SpeechRecognition.stopListening).toHaveBeenCalled();

  const micStart2 = await screen.findByTestId("record-button");
  fireEvent.click(micStart2);

  const micStop2 = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop2);

  await waitFor(() => {
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });
});

  it('renders input box when speech not supported', () => {
    SpeechRecognition.browserSupportsSpeechRecognition.mockReturnValue(false);
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not crash if Speak element is missing', async () => {
  setup();

  // Remove Speak element before clicking stop
  const micStart = screen.getByTestId("record-button");
  fireEvent.click(micStart);

  const micStop = await screen.findByTestId("stop-record-button");

  // simulate missing Speak element
  const speak = document.getElementById("Speak");
  if (speak) speak.remove();

  fireEvent.click(micStop); // Should not crash

  expect(SpeechRecognition.stopListening).toHaveBeenCalled();
});

it('moves to second question if not at end of list', async () => {
  setup();

  const micStart = screen.getByTestId("record-button");
  fireEvent.click(micStart);

  const micStop = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop);

  await waitFor(() => {
    expect(screen.getByText('What made you feel this way?')).toBeInTheDocument();
  });
});

it('clicking next arrow calls changeindex when themeType is StoryCard', async () => {
  const mockChangeIndex = jest.fn();

  render(
    <Provider store={mockStore({ languageReducer: {} })}>
      <MemoryRouter>
        <AudioQuizScreen
          data={{
            title: 'Feelings Quiz',
            content: {
              feelingsDataList: [
                { questions: 'Q1', results: '' },
                { questions: 'Q2', results: '' },
              ],
            },
          }}
          stage={1}
          themeType="StoryCard"
          changeindex={mockChangeIndex}
          changeStage={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByTestId("record-button"));
  fireEvent.click(await screen.findByTestId("stop-record-button"));
  fireEvent.click(await screen.findByTestId("record-button"));
  fireEvent.click(await screen.findByTestId("stop-record-button"));

  const nextArrow = await screen.findByTestId("next-image");
  fireEvent.click(nextArrow);

  expect(mockChangeIndex).toHaveBeenCalledWith("Next", 1);
});


it('clears answer on repeat button click', async () => {
  setup();

  const micStart = screen.getByTestId("record-button");
  fireEvent.click(micStart);

  const repeatBtn = await screen.findByTestId("repeat-button");
  fireEvent.click(repeatBtn);

  const questionText = screen.getByText(/How are you\?/i);
  expect(questionText).toBeInTheDocument();
});

it('renders content from base language data when mapping is missing', () => {
  const store = mockStore({
    languageReducer: {
      commonGroupLanguageMappingData: {}, // missing mapping
      commonGroupLanguageBaseData: {
        1: {
          fieldData: {
            2: { value: 'Base fallback text' },
          },
        },
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AudioQuizScreen
          data={{
            title: 'Feelings Quiz',
            content: {
              feelingsDataList: [{ questions: 'Q1', results: '' }, { questions: 'Q2', results: '' }],
            },
          }}
          stage={1}
          themeType="StoryCard"
          changeindex={jest.fn()}
          changeStage={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Base fallback text')).toBeInTheDocument();
});

it('calls changeStage when themeType is not StoryCard', async () => {
  const changeStage = jest.fn();

  render(
    <Provider store={mockStore({ languageReducer: {} })}>
      <MemoryRouter>
        <AudioQuizScreen
          data={{
            title: 'Feelings Quiz',
            content: {
              feelingsDataList: [
                { questions: 'Q1', results: '' },
                { questions: 'Q2', results: '' },
              ],
            },
          }}
          stage={1}
          themeType="OtherTheme"
          changeindex={jest.fn()}
          changeStage={changeStage}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByTestId("record-button"));
  fireEvent.click(await screen.findByTestId("stop-record-button"));
  fireEvent.click(await screen.findByTestId("record-button"));
  fireEvent.click(await screen.findByTestId("stop-record-button"));

  const nextBtn = await screen.findByTestId("next-image");
  fireEvent.click(nextBtn);

  expect(changeStage).toHaveBeenCalledWith("Next", 1);
});

it('triggers Viewstate after single question is completed', async () => {
  render(
    <Provider store={mockStore({ languageReducer: {} })}>
      <MemoryRouter>
        <AudioQuizScreen
          data={{
            title: 'Single Q',
            content: {
              feelingsDataList: [
                { questions: 'Only question', results: '' },
              ],
            },
          }}
          stage={0}
          themeType="StoryCard"
          changeindex={jest.fn()}
          changeStage={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByTestId("record-button"));
  fireEvent.click(await screen.findByTestId("stop-record-button"));

  const nextBtn = await screen.findByTestId("next-image");
  expect(nextBtn).toBeInTheDocument();
});

it('toggles bg_color between yellow and pink on mic toggle', async () => {
  setup();

  const micStart = screen.getByTestId("record-button");
  fireEvent.click(micStart);
  const micStop = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop);

  // Start again to toggle
  const micStart2 = await screen.findByTestId("record-button");
  fireEvent.click(micStart2);

  const micStop2 = await screen.findByTestId("stop-record-button");
  fireEvent.click(micStop2);

  // If you add `data-testid="question-box"` to colored box, you can check its style
  const questionBox = screen.getByTestId("question-box");
  expect(questionBox).toHaveStyle('background-color: #FFBD12');
});

});
