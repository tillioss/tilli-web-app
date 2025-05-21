import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AudioRecognize from './AudioRecognize';
import '@testing-library/jest-dom';

// Mock for DropDown component
jest.mock('./DropDown', () => (props) => {
  return (
    <select
      data-testid="dropdown"
      value={props.value.value}
      onChange={(e) =>
        props.onChange({
          label: e.target.options[e.target.selectedIndex].text,
          value: e.target.value,
        })
      }
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

// Fix: Define all mock functions inside the jest.mock scope
jest.mock('react-speech-recognition', () => {
  const startListening = jest.fn();
  const stopListening = jest.fn();
  const resetTranscript = jest.fn();

  let transcriptValue = 'Hello world';
  let browserSupported = true;

  return {
    __esModule: true,
    useSpeechRecognition: () => ({
      transcript: transcriptValue,
      resetTranscript,
    }),
    default: {
      startListening,
      stopListening,
      browserSupportsSpeechRecognition: () => browserSupported,
    },
    __mock__: {
      setTranscript: (val) => {
        transcriptValue = val;
      },
      setSupport: (val) => {
        browserSupported = val;
      },
      startListening,
      stopListening,
      resetTranscript,
    },
  };
});

const mockSpeech = require('react-speech-recognition').__mock__;

describe('AudioRecognize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSpeech.setTranscript('Hello world');
    mockSpeech.setSupport(true);
  });

  it('renders default UI', () => {
    render(<AudioRecognize />);
    expect(screen.getByText('Audio Recognize')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  it('updates language via dropdown', () => {
    render(<AudioRecognize />);
    const dropdown = screen.getByTestId('dropdown');
    fireEvent.change(dropdown, { target: { value: 'ta' } });
    expect(dropdown.value).toBe('ta');
  });

  it('calls startListening with correct language', () => {
    render(<AudioRecognize />);
    fireEvent.click(screen.getByText('Start'));
    expect(mockSpeech.startListening).toHaveBeenCalledWith({
      language: 'en',
      continuous: true,
    });
  });

  it('calls stopListening on Stop', () => {
    render(<AudioRecognize />);
    fireEvent.click(screen.getByText('Stop'));
    expect(mockSpeech.stopListening).toHaveBeenCalledWith({ continuous: false });
  });

  it('calls resetTranscript on Reset', () => {
    render(<AudioRecognize />);
    fireEvent.click(screen.getByText('Reset'));
    expect(mockSpeech.resetTranscript).toHaveBeenCalled();
  });

  it('displays transcript text', () => {
    render(<AudioRecognize />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('displays not supported message when browser not supported', () => {
    mockSpeech.setSupport(false);
    render(<AudioRecognize />);
    expect(screen.getByText('Not supported')).toBeInTheDocument();
  });
});
