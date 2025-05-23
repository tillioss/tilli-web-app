import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StoryCardScreen from './StoryCardScreen';

jest.mock('./AudioQuizScreen', () => (props) => (
    <div data-testid={`AudioQuizScreen-${props.stage}`}>
      <button
          data-testid="audio-next"
          onClick={() => props.changeindex('Next', props.stage)}
      >
        NextAudio
      </button>
      <button
          data-testid="audio-prev"
          onClick={() => props.changeindex('Previous', props.stage)}
      >
        PrevAudio
      </button>
    </div>
));

jest.mock('./MeetSinglePerson', () => (props) => (
    <div data-testid={`MeetSinglePerson-${props.stage}`}>
      <button
          data-testid="meet-next"
          onClick={() => props.changeindex('Next', props.stage)}
      >
        NextMeet
      </button>
      <button
          data-testid="meet-prev"
          onClick={() => props.changeindex('Previous', props.stage)}
      >
        PrevMeet
      </button>
    </div>
));

jest.mock('./DropToSelection', () => (props) => (
    <div data-testid={`DropToSelection-${props.stage}`}>
      <button
          data-testid="drop-next"
          onClick={() => props.changeindex('Next', props.stage)}
      >
        NextDrop
      </button>
      <button
          data-testid="drop-prev"
          onClick={() => props.changeindex('Previous', props.stage)}
      >
        PrevDrop
      </button>
    </div>
));

describe('StoryCardScreen', () => {
  const parentStage = 99;

  it('renders AudioQuizScreen when content[0].theme is "AudioQuizScreen"', () => {
    const data = {
      theme: 'xyz',
      content: [
        { theme: 'AudioQuizScreen', foo: 'bar' },
        { theme: 'MeetSinglePerson' },
      ],
    };
    render(<StoryCardScreen data={data} stage={parentStage} />);

    expect(screen.getByTestId('AudioQuizScreen-0')).toBeInTheDocument();
    expect(screen.queryByTestId('MeetSinglePerson-1')).toBeNull();
    expect(screen.queryByTestId('DropToSelection-0')).toBeNull();
  });

  it('renders MeetSinglePerson when content[0].theme is "MeetSinglePerson"', () => {
    const data = {
      theme: 'abc',
      content: [
        { theme: 'MeetSinglePerson', name: 'Alice' },
        { theme: 'DropToSelection' },
      ],
    };
    render(<StoryCardScreen data={data} stage={parentStage} />);
    expect(screen.getByTestId('MeetSinglePerson-0')).toBeInTheDocument();
    expect(screen.queryByTestId('AudioQuizScreen-0')).toBeNull();
  });

  it('renders DropToSelection when content[0].theme is "DropToSelection"', () => {
    const data = {
      theme: 'foo',
      content: [
        { theme: 'DropToSelection', items: [1, 2] },
        { theme: 'AudioQuizScreen' },
      ],
    };
    render(<StoryCardScreen data={data} stage={parentStage} />);
    expect(screen.getByTestId('DropToSelection-0')).toBeInTheDocument();
  });

  it('navigates forward and backward through the array via changeindex', () => {
    const data = {
      theme: 'mixed',
      content: [
        { theme: 'AudioQuizScreen' },
        { theme: 'MeetSinglePerson' },
        { theme: 'DropToSelection' },
      ],
    };
    render(<StoryCardScreen data={data} stage={parentStage} />);

    expect(screen.getByTestId('AudioQuizScreen-0')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('audio-next'));
    expect(screen.getByTestId('MeetSinglePerson-1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('meet-next'));
    expect(screen.getByTestId('DropToSelection-2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('drop-prev'));
    expect(screen.getByTestId('MeetSinglePerson-1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('meet-prev'));
    expect(screen.getByTestId('AudioQuizScreen-0')).toBeInTheDocument();
  });

  it('does not render anything when content array is empty', () => {
    const data = { theme: 'none', content: [] };
    const { container } = render(<StoryCardScreen data={data} stage={parentStage} />);
    expect(container).toBeEmptyDOMElement();
  });
});
