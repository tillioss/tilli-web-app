import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ModuleScreen from './ModuleScreen';
import * as Common from '../config/Common';

// Mock components used in stages
jest.mock('../Component/Themes/DoubleBoxOverlapWithImage', () => (props) => (
  <div data-testid="DoubleBoxOverlapWithImage">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/ImageWithThinking', () => (props) => (
  <div data-testid="ImageWithThinking">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/QuestionsList', () => (props) => (
  <div data-testid="QuestionsList">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/ChooseCheckboxQuestions', () => (props) => (
  <div data-testid="ChooseCheckboxQuestions">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/CircleWithInfoAnimations', () => (props) => (
  <div data-testid="CircleWithInfoAnimations">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/IntroducePersons', () => (props) => (
  <div data-testid="IntroducePersons">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/PersonWithTextAnimation', () => (props) => (
  <div data-testid="PersonWithTextAnimation">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/DropToSelection', () => (props) => (
  <div data-testid="DropToSelection">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/Success', () => (props) => (
  <div data-testid="Success">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/MeetSinglePerson', () => (props) => (
  <div data-testid="MeetSinglePerson">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/StoryCardScreen', () => (props) => (
  <div data-testid="StoryCardScreen">
    <button data-testid="next-stage" onClick={() => props.changeStage('Next', props.stage)}>Next</button>
    <button data-testid="prev-stage" onClick={() => props.changeStage('Previous', props.stage)}>Previous</button>
  </div>
));
jest.mock('../Component/Themes/AudioQuizScreen', () => (props) => (
  <div data-testid="AudioQuizScreen">
    <button data-testid="finish-stage" onClick={() => props.changeStage('Next', props.stage)}>Finish</button>
  </div>
));


// Global default mock
beforeEach(() => {
  jest.clearAllMocks();

  jest.spyOn(Common, 'doConnect').mockImplementation((endpoint) => {
    if (endpoint === 'getLevelMappingData') {
      return Promise.resolve({
        response: JSON.stringify([
          { theme: 'DoubleBoxOverlapWithImage' },
          { theme: 'ImageWithThinking' },
          { theme: 'QuestionsList' },
          { theme: 'ChooseCheckboxQuestions' },
          { theme: 'CircleWithInfoAnimations' },
          { theme: 'IntroducePersons' },
          { theme: 'PersonWithTextAnimation' },
          { theme: 'DropToSelection' },
          { theme: 'Success' },
          { theme: 'MeetSinglePerson' },
          { theme: 'StoryCardScreen' },
          { theme: 'AudioQuizScreen' }
        ])
      });
    }

    if (endpoint === 'getModuleLanguageMapping') {
      return Promise.resolve({
        response: JSON.stringify([
          { theme: 'DoubleBoxOverlapWithImage' },
          { theme: 'ImageWithThinking' },
          { theme: 'QuestionsList' },
          { theme: 'ChooseCheckboxQuestions' },
          { theme: 'CircleWithInfoAnimations' },
          { theme: 'IntroducePersons' },
          { theme: 'PersonWithTextAnimation' },
          { theme: 'DropToSelection' },
          { theme: 'Success' },
          { theme: 'MeetSinglePerson' },
          { theme: 'StoryCardScreen' },
          { theme: 'AudioQuizScreen' }
        ])
      });
    }

    return Promise.resolve({ response: '{}' });
  });
});

// Helper to render component
function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/level/level1']}>
      <Route path="/level/:id" render={(props) => (
        <ModuleScreen
          {...props}
          match={{
            ...props.match,
            params: { id: 'level1', levelIndex: '0', progressingLevel: '0' }
          }}
        />
      )} />
    </MemoryRouter>
  );
}

// ✅ Final working test
test('renders initial stage correctly', async () => {
  renderWithRouter();
  const stage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(stage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from DoubleBoxOverlapWithImage', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('ImageWithThinking');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from ImageWithThinking', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('QuestionsList');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from QuestionsList', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('ChooseCheckboxQuestions');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from ChooseCheckboxQuestions', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('CircleWithInfoAnimations');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from CircleWithInfoAnimations', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('IntroducePersons');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from IntroducePersons', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('PersonWithTextAnimation');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from PersonWithTextAnimation', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('DropToSelection');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from DropToSelection', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('Success');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the next stage correctly when clicking "Next" from Success', async () => {
  renderWithRouter();

  // Ensure initial stage is loaded
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(initialStage).toBeInTheDocument();

  // Click mock "Next" button inside the component
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));
  fireEvent.click(screen.getByTestId('next-stage'));

  // Expect next stage
  const nextStage = await screen.findByTestId('MeetSinglePerson');
  expect(nextStage).toBeInTheDocument();
});

test('navigates to the previous stage correctly when clicking "Previous"', async () => {
  renderWithRouter();

  // Go to stage 2 first
  const initialStage = await screen.findByTestId('DoubleBoxOverlapWithImage');
  fireEvent.click(screen.getByTestId('next-stage'));

  const secondStage = await screen.findByTestId('ImageWithThinking');
  expect(secondStage).toBeInTheDocument();

  // Click "Previous" to go back
  fireEvent.click(screen.getByTestId('prev-stage'));

  const backToFirst = await screen.findByTestId('DoubleBoxOverlapWithImage');
  expect(backToFirst).toBeInTheDocument();
});

test('completes final stage and redirects when progressingLevel === levelIndex', async () => {
  const historyPush = jest.fn();

  jest.spyOn(Common, 'doConnect').mockImplementation((endpoint) => {
    if (endpoint === 'getLevelMappingData' || endpoint === 'getModuleLanguageMapping') {
      return Promise.resolve({
        response: JSON.stringify([
          { theme: 'DoubleBoxOverlapWithImage' },
          { theme: 'CircleWithInfoAnimations' },
          { theme: 'AudioQuizScreen' }
        ])
      });
    }
    if (endpoint === 'updateLevelAttempt') {
      return Promise.resolve({ success: true });
    }
    return Promise.resolve({ response: '{}' });
  });

  render(
    <MemoryRouter initialEntries={['/level/level1']}>
      <Route path="/level/:id" render={(props) => (
        <ModuleScreen
          {...props}
          match={{
            ...props.match,
            params: { id: 'level1', levelIndex: '2', progressingLevel: '2' } // equal → triggers updateLevelAttempt
          }}
          history={{ push: historyPush }}
        />
      )} />
    </MemoryRouter>
  );

  // Go to final stage
  fireEvent.click(await screen.findByTestId('next-stage')); // 1 → 2
  fireEvent.click(await screen.findByTestId('prev-stage')); // 2 → 1 → optional
  fireEvent.click(await screen.findByTestId('next-stage')); // 1 → 2
  fireEvent.click(await screen.findByTestId('next-stage')); // 2 → 3 (AudioQuiz)
  fireEvent.click(await screen.findByTestId('finish-stage')); // complete

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(expect.stringContaining('/home'));
  });
});

test('renders default case with unknown theme and shows navigation buttons', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation((endpoint) => {
    if (endpoint === 'getLevelMappingData' || endpoint === 'getModuleLanguageMapping') {
      return Promise.resolve({
        response: JSON.stringify([
          { theme: 'MysteryThemeX' }
        ])
      });
    }
    return Promise.resolve({ response: '{}' });
  });

  renderWithRouter();

  // Wait for fallback/default render to appear
  await waitFor(() => {
    expect(screen.getByTestId('next-stage')).toBeInTheDocument();
    expect(screen.getByTestId('prev-stage')).toBeInTheDocument();
  });
});

test('renders safely when getLevelMappingData returns empty array', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation((endpoint) => {
    if (endpoint === 'getLevelMappingData') {
      return Promise.resolve({ response: JSON.stringify([]) }); // empty stages
    }
    if (endpoint === 'getModuleLanguageMapping') {
      return Promise.resolve({ response: JSON.stringify([]) });
    }
    return Promise.resolve({ response: '{}' });
  });

  const { container } = renderWithRouter();

  // Should render container even if no stages
  await waitFor(() => {
    const wrapper = container.querySelector('.mobile-responsive');
    expect(wrapper).toBeInTheDocument();
  });
});

test('handles invalid JSON response without crashing', async () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  jest.spyOn(Common, 'doConnect').mockImplementationOnce(() =>
    Promise.resolve({ response: 'INVALID JSON!!!' })
  );

  const { container } = renderWithRouter();

  await waitFor(() => {
    const wrapper = container.querySelector('.mobile-responsive');
    expect(wrapper).toBeInTheDocument();
  });

  expect(errorSpy).toHaveBeenCalled();
  errorSpy.mockRestore();
});

test('clicking "Previous" on first stage redirects to home', async () => {
  const historyPush = jest.fn();

  render(
    <MemoryRouter initialEntries={['/level/level1']}>
      <Route path="/level/:id" render={(props) => (
        <ModuleScreen
          {...props}
          match={{ ...props.match, params: { id: 'level1', levelIndex: '0', progressingLevel: '1' } }}
          history={{ push: historyPush }}
        />
      )} />
    </MemoryRouter>
  );

  const btn = await screen.findByTestId('prev-stage');
  fireEvent.click(btn);

  expect(historyPush).toHaveBeenCalledWith(expect.stringContaining('/home'));
});

test('languagechangeTheme does not crash if moduleJson is not yet set', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation((endpoint) => {
    if (endpoint === 'getLevelMappingData') {
      return Promise.resolve({ response: JSON.stringify([]) });
    }
    if (endpoint === 'getModuleLanguageMapping') {
      return Promise.resolve({ response: JSON.stringify([{ theme: 'Whatever' }]) });
    }
    return Promise.resolve({ response: '{}' });
  });

  const { container } = renderWithRouter();
  await waitFor(() => {
    expect(container.querySelector('.mobile-responsive')).toBeInTheDocument();
  });
});

