import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AudioRecognize from "./AudioRecognize";

jest.mock("react-speech-recognition", () => ({
  useSpeechRecognition: jest.fn(() => ({
    transcript: "",
    resetTranscript: jest.fn(),
  })),
}));

describe("AudioRecognize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls setRecord when transcript is not empty", () => {
    const setRecordMock = jest.fn();
    const useSpeechRecognitionMock = jest.requireMock(
      "react-speech-recognition"
    );
    useSpeechRecognitionMock.useSpeechRecognition.mockReturnValue({
      transcript: "Hello, world!",
      resetTranscript: jest.fn(),
    });

    render(
      <AudioRecognize
        setRecord={setRecordMock}
        resetTextState={false}
        updateResetText={() => {}}
      >
        <div>A Child Component</div>
      </AudioRecognize>
    );

    expect(setRecordMock).toHaveBeenCalledWith("Hello, world!");
  });

  test("resets transcript and calls updateResetText when resetTextState is true", () => {
    const resetTranscriptMock = jest.fn();
    const updateResetTextMock = jest.fn();
    const useSpeechRecognitionMock = jest.requireMock(
      "react-speech-recognition"
    );
    useSpeechRecognitionMock.useSpeechRecognition.mockReturnValue({
      transcript: "Hello, world!",
      resetTranscript: resetTranscriptMock,
    });

    render(
      <AudioRecognize
        setRecord={() => {}}
        resetTextState={true}
        updateResetText={updateResetTextMock}
      >
        <div>A Child Component</div>
      </AudioRecognize>
    );

    expect(resetTranscriptMock).toHaveBeenCalled();
    expect(updateResetTextMock).toHaveBeenCalled();
  });
});
