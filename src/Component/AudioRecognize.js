import React from "react";
import DropDown from "./DropDown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const AudioRecognize1 = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Not supported</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <button
            onClick={() => {
              SpeechRecognition.startListening({
                language: props.laSelect.value,
                continuous: true,
              });
            }}
          >
            Start
          </button>
        </div>
        <div className="col-sm-4">
          <button
            onClick={() => {
              console.log("stop");
              SpeechRecognition.stopListening({ continuous: false });
            }}
          >
            Stop
          </button>
        </div>
        <div className="col-sm-4">
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1"> </div>
        <div className="col-sm-10">
          <p>{transcript}</p>
        </div>
        <div className="col-sm-1"> </div>
      </div>
    </>
  );
};

class AudioRecognize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bg_color: "#FFBD12",
      laSelect: { label: "English", value: "en" },
    };
  }

  onChangeData(value) {
    this.setState({ laSelect: value });
  }
  render() {
    let { laSelect } = this.state;
    return (
      <>
        <div> Audio Recognize </div>
        <div className="row mt-3 mb-3">
          <div className="col-sm-1"> </div>
          <div className="col-sm-3 mt-2"> Select </div>
          <div className="col-sm-4">
            <DropDown
              options={[
                { label: "English", value: "en" },
                { label: "Tamil", value: "ta" },
                { label: "Sinhala", value: "si" },
                { label: "Turkish", value: "tu" },
              ]}
              value={[]}
              onChange={(value) => this.onChangeData(value)}
            />
          </div>
          <div className="col-sm-4"> </div>
        </div>
        <div>
          <AudioRecognize1 laSelect={laSelect} />
        </div>
      </>
    );
  }
}

export default AudioRecognize;
