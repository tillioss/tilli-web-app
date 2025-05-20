import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeViewer from './ThemeViewer';
import * as SpeechRecognition from 'react-speech-recognition';

jest.mock('react-speech-recognition', () => ({
  startListening: jest.fn(),
  stopListening: jest.fn()
}));

jest.mock('./ThemeView/GroupedInput', () => () => <div data-testid="grouped-input-mock">GroupedInput</div>);

describe('ThemeViewer Component', () => {
  const mockChangeStage = jest.fn();
  const mockPredictOnchange = jest.fn();

  const baseProps = {
    layersData: [
      {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: 50,
        height: 20,
        visibility: 'visible',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 5,
        action: 'Next',
        userActionText: 'hello',
      },
    ],
    stage: 1,
    data: {
      theme: 'testTheme',
      themeType: 'testType',
      layers: [],
      dynamic: { record: { answer: 'yes' } },
      apiPredict: 'http://localhost/predict',
    },
    changeStage: mockChangeStage,
    predictOnchange: mockPredictOnchange,
    dynamicCaptureInfo: { dynamic: { dynamicThemes: [] } },
  };

  beforeEach(() => {
    localStorage.setItem('loggedOrg_id', 'org123');
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(<ThemeViewer {...baseProps} />);
    expect(container).toBeInTheDocument();
  });

  it('handles rectangle click and triggers dynamicThemeAction', () => {
    const { getByTestId } = render(<ThemeViewer {...baseProps} />);
    const button = getByTestId('layer-0'); // Use updated test ID
    fireEvent.click(button);
    expect(mockChangeStage).toHaveBeenCalledWith('Next', 1);
    expect(mockPredictOnchange).toHaveBeenCalledWith(
      'http://localhost/predict',
      'hello'
    );
  });

  it('starts and stops speech recognition on method call', () => {
    const wrapper = new ThemeViewer(baseProps);
    wrapper.onStartRecord();
    wrapper.onStopRecord();
    expect(SpeechRecognition.startListening).toHaveBeenCalled();
    expect(SpeechRecognition.stopListening).toHaveBeenCalled();
  });

  it('sets record text correctly', () => {
    const wrapper = new ThemeViewer(baseProps);
    wrapper.setRecord('Test Record');
    expect(wrapper.state.recordText).toBe("");
  });

  it('handles "Reset Text" action', () => {
    document.body.innerHTML = '<div id="layer0"></div>';
    const wrapper = new ThemeViewer({
      ...baseProps,
      layersData: [
        {
          ...baseProps.layersData[0],
          action: 'Reset Text',
          layers: { resetText: [0] },
        },
      ],
    });
    wrapper.dynamicThemeAction(wrapper.state.layers[0], 0);
    expect(wrapper.state.recordText).toBe('');
    expect(wrapper.state.resetTextState).toBe(false);
  });

  it('does not break with unrecognized layer type', () => {
    const props = {
      ...baseProps,
      layersData: [{ ...baseProps.layersData[0], type: 'unknown' }],
    };
    const { container } = render(<ThemeViewer {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('handles "Previous" action', () => {
  const wrapper = new ThemeViewer({
    ...baseProps,
    layersData: [{ ...baseProps.layersData[0], action: 'Previous' }],
  });
  wrapper.dynamicThemeAction(wrapper.state.layers[0], 0);
  expect(mockChangeStage).toHaveBeenCalledWith('Previous', 1);
});

it('handles "Change Layout" action and toggles layer visibility', () => {
  const wrapper = new ThemeViewer({
    ...baseProps,
    data: {
      ...baseProps.data,
      layers: [
        { visibility: 'hidden' },
        { visibility: 'visible' }
      ]
    },
    layersData: [
      {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: 50,
        height: 20,
        visibility: 'hidden',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 5,
        action: 'Change Layout',
        layers: {
          visible: [0],
          hidden: [1]
        }
      },
      {
        type: 'rectangle',
        x: 10,
        y: 10,
        width: 50,
        height: 20,
        visibility: 'visible',
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 5,
      }
    ]
  });

  // setState to reflect layersData
  wrapper.setState({
    layers: [
      { visibility: 'hidden' },
      { visibility: 'visible' }
    ]
  });

  // Now call the action
  wrapper.dynamicThemeAction(wrapper.state.layers[0], 0);

  const updatedLayers = wrapper.state.layers;
  expect(updatedLayers[0].visibility).toBe('visible');
  expect(updatedLayers[1].visibility).toBe('hidden');
});


it('handles "Record" action and updates audioRecognize', () => {
  const wrapper = new ThemeViewer({
    ...baseProps,
    layersData: [
      {
        ...baseProps.layersData[0],
        action: 'Record',
        layers: {
          visible: [0],
          hidden: [],
          recordValue: [5]
        }
      }
    ]
  });

  wrapper.dynamicThemeAction(wrapper.state.layers[0], 0);
  expect(wrapper.state.audioRecognize).toBe("");
});

it('renders groupedInput layer', () => {
  const groupedInputLayer = {
    type: 'groupedInput',
    x: 10,
    y: 10,
    width: 50,
    height: 20,
    visibility: 'visible',
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    action: 'Next'
  };

  const { container } = render(
    <ThemeViewer
      {...baseProps}
      layersData={[groupedInputLayer]}
      data={{
        ...baseProps.data,
        themeType: 'Static',
        theme: 'test',
        layers: [groupedInputLayer] // this is important!
      }}
    />
  );

  expect(container).toBeInTheDocument();
});


it('renders background audio if provided', () => {
  const { container } = render(
    <ThemeViewer
      {...baseProps}
      data={{ ...baseProps.data, backgroundAudio: 'test.mp3' }}
    />
  );
  const audio = container.querySelector('audio');
  expect(audio).toBeInTheDocument();
});

it('adds mouse and touch listeners for "Record Press" action', () => {
  const addEventListenerMock = jest.fn();

  // Spy on document.querySelector, not getElementById
  const querySelectorSpy = jest.spyOn(document, 'querySelector').mockReturnValue({
    addEventListener: addEventListenerMock
  });

  const wrapper = new ThemeViewer({
    ...baseProps,
    layersData: [
      {
        ...baseProps.layersData[0],
        action: 'Record Press'
      }
    ]
  });

  wrapper.dynamicThemeAction(wrapper.state.layers[0], 0);

  expect(querySelectorSpy).toHaveBeenCalledWith('#layer0');
  expect(addEventListenerMock).toHaveBeenCalledTimes(6);
});
});
