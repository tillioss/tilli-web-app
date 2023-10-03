import React, { useState } from "react";
import backImage from "../../images/fillIconOnly.png";
import nextImage from "../../images/outlineRightIcon.png";
import repeatImage from "../../images/repeat.png";
import outlineIconOnlyImage from "../../images/outlineIconOnly.png";
import outlineIconRedImage from "../../images/outlineIconRed.png";
import nounVoiceRecordImage from "../../images/nounVoiceRecord.png";
import people_set from "../../images/people_set.png";
import down_black from "../../images/down_black.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

class AudioQuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index_value: 0,
      Viewstate: false,
      bg_color: "#FFBD12",
      pitchArray: [
        -0.31999993324279785, 1, 1.4800000190734863, 1.7200000286102295,
        2.440000057220459, 0.16000008583068848, 2.8000001907348633,
        3.0399999618530273, 4.600000381469727, 4.4800004959106445,
      ],
      checkstate: "SpeechRecognition.startListening",
      commonPageData: false,
    };
  }


  return_content(pageIndex, index) {
    const { commonGroupLanguageMappingData, commonGroupLanguageBaseData } =
      this.props;

    if (
      commonGroupLanguageMappingData &&
      commonGroupLanguageMappingData[pageIndex] &&
      commonGroupLanguageMappingData[pageIndex].fieldData[index]
    ) {
      return commonGroupLanguageMappingData[pageIndex].fieldData[index].value;
    } else if (
      commonGroupLanguageBaseData &&
      commonGroupLanguageBaseData[pageIndex] &&
      commonGroupLanguageBaseData[pageIndex].fieldData[index]
    ) {
      return commonGroupLanguageBaseData[pageIndex].fieldData[index].value;
    } else return "";
  }

  render() {
    const { stage, data } = this.props;
    const { index_value, bg_color } = this.state;

    const AudioRecognize1 = () => {
      const { transcript } = useSpeechRecognition();
      const [datavalue, setCount] = useState(
        data.content.feelingsDataList[index_value].results
      );

      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
          <div>
            <div className="row">
              <div className="col-6" style={{ marginTop: 20 }}>
                {data.content.feelingsDataList[index_value].questions}{" "}
              </div>
              <div className="col-6">
                <input
                  type={"text"}
                  value={datavalue}
                  onChange={(e) => {
                    data.content.feelingsDataList[index_value].results =
                      e.target.value;
                    setCount(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row" style={{ marginTop: 40 }}>
              <div className="col-5"> </div>
              <Link
                onClick={async () => {
                  if (
                    data.content.feelingsDataList[index_value].results.length
                  ) {
                    if (
                      data.content.feelingsDataList.length !==
                      index_value + 1
                    ) {
                      this.setState({ index_value: index_value + 1 });
                    } else if (
                      data.content.feelingsDataList.length ===
                      index_value + 1
                    ) {
                      await this.setState({ Viewstate: true });
                    }
                  }
                }}
              >
                <button type="button" class="btn btn-success">
                  Next
                </button>
              </Link>
              <div className="col-4"> </div>
            </div>
          </div>
        );
      }

      return (
        <React.Fragment>
          {}

          <div className="row">
            <div className="row ">
              <div className="col-2" />

              <div className="col-3">
                <img
                  src={people_set}
                  style={{
                    width: 97,
                    height: 159,
                    marginBottom: -50,
                    marginLeft: "25%",
                  }}
                  alt={""}
                />
              </div>

              {bg_color === "#FF89BB" ? (
                <React.Fragment>
                  <div
                    className="col-7"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "montserrat-medium",
                        fontWeight: "500",
                        fontSize: 15,
                        paddingLeft: 10,
                        height: 0,
                      }}
                    >
                      {data.content.feelingsDataList[index_value].questions}
                    </p>
                  </div>
                </React.Fragment>
              ) : null}
            </div>

            <div
              className="col-11"
              style={{
                height: 251,
                width: 327,
                marginTop: 40,
                marginLeft: 32,
                marginRight: 16,
                backgroundColor: bg_color,
                borderWidth: 2,
                borderColor: "#18191F",
                boxSizing: "border-box",
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "solid",
                display: bg_color === "#FFBD12" ? "flex" : "inline-block",
              }}
            >
              {}
              {bg_color === "#FFBD12" ? (
                <p
                  style={{
                    fontFamily: "montserrat-medium",
                    fontWeight: "500",
                    fontSize: 27,
                    lineHeight: 1.2,
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  {" "}
                  {data.content.feelingsDataList[index_value].questions}
                </p>
              ) : (
                <React.Fragment>
                  <div
                    className="row"
                    style={{
                      paddingBottom: 25,
                      paddingTop: 25,
                      height: 150,
                      width: "100%",
                      padding: 20,
                    }}
                  >
                    <p
                      id={"Speak"}
                      style={{
                        fontFamily: "montserrat-medium",
                        fontWeight: "500",
                        fontSize: 24,
                        lineHeight: 1.4,
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {transcript}
                      {data.content.feelingsDataList[index_value].results}
                    </p>
                  </div>

                  <div className="row">
                    
                  </div>

                  {}
                </React.Fragment>
              )}
            </div>
            <div className="col-1"> </div>
          </div>

          <div className="row mt-4">
            <div className="col-10"> </div>
            <div className="col-2">
              
            </div>
          </div>

          {bg_color === "#FFBD12" ? (
            <React.Fragment>
              <p
                style={{
                  fontSize: 26,
                  color: "#FF9692",
                  fontWeight: 700,
                  fontFamily: "montserrat-medium",
                }}
              >
                {this.return_content(1, 2)}
              </p>
              <div
                className="row"
                style={{ marginBottom: 15, marginTop: -10, marginLeft: 1 }}
              >
                <div className="col-3" />
                <div className="col-6" style={{ textAlign: "center" }}>
                  <img
                    src={down_black}
                    style={{ width: 30, height: 15 }}
                    alt={""}
                  />
                </div>
                <div className="col-3" />
              </div>
            </React.Fragment>
          ) : null}
          <div
            className="row"
            style={{ marginBottom: 15, marginTop: -10, marginLeft: 1 }}
          >
            <div className="col-3" />
            <div className="col-6" style={{ textAlign: "center" }}>
              {bg_color === "#FFBD12" ? (
                <React.Fragment>
                  <div>
                    <Link
                      className="col-2"
                      onClick={() => {
                        SpeechRecognition.startListening({ continuous: true });
                        if (bg_color === "#FF89BB") {
                          this.setState({ bg_color: "#FFBD12" });
                        } else {
                          this.setState({ bg_color: "#FF89BB" });
                        }
                      }}
                    >
                      <img
                        src={outlineIconOnlyImage}
                        style={{ width: 60, height: 60 }}
                        alt={""}
                      />
                      <img
                        src={nounVoiceRecordImage}
                        style={{
                          width: 47,
                          height: 42,
                          position: "absolute",
                          bottom: -10,
                          left: 22,
                        }}
                        alt={""}
                      />
                    </Link>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    style={{ marginTop: "14%" }}
                    onClick={async () => {
                      SpeechRecognition.stopListening({ continuous: false });
                      if (bg_color === "#FF89BB") {
                        this.setState({ bg_color: "#FFBD12" });
                      } else {
                        this.setState({ bg_color: "#FF89BB" });
                      }
                      if (
                        document.getElementById("Speak") &&
                        document.getElementById("Speak").textContent.length !==
                          0
                      ) {
                        data.content.feelingsDataList[index_value].results =
                          document.getElementById("Speak").textContent;
                        this.setState({ data });

                        if (
                          data.content.feelingsDataList[index_value].results
                            .length
                        ) {
                          if (
                            data.content.feelingsDataList.length !==
                            index_value + 1
                          ) {
                            this.setState({
                              index_value: index_value + 1,
                              bg_color: "#FFBD12",
                            });
                          } else if (
                            data.content.feelingsDataList.length ===
                            index_value + 1
                          ) {
                            await this.setState({
                              Viewstate: true,
                              bg_color: "#FFBD12",
                            });
                            console.log("Viewstate", this.state.Viewstate);
                          }
                        }
                      }
                    }}
                  >
                    <Link className="col-2">
                      <img
                        src={outlineIconRedImage}
                        style={{ width: 60, height: 60 }}
                        alt={""}
                      />
                      <img
                        src={nounVoiceRecordImage}
                        style={{
                          width: 47,
                          height: 42,
                          position: "absolute",
                          bottom: -10,
                          left: 22,
                        }}
                        alt={""}
                      />
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="col-3">
              {bg_color === "#FF89BB" ? (
                <div
                  className="col-2"
                  onClick={(e) => {
                    data.content.feelingsDataList[index_value].results = "";
                    this.setState({ data });
                  }}
                >
                  <img
                    src={repeatImage}
                    style={{ width: 42, height: 40 }}
                    alt={""}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </React.Fragment>
      );
    };

    return (
      <div>
        <div className="row ml-0 mt-4">
          <div className="col-2">
            {this.props.themeType === "StoryCard" ? (
              <Link
                onClick={() => {
                  SpeechRecognition.stopListening({ continuous: false });
                  this.props.changeindex("Previous", stage);
                }}
              >
                <img
                  style={{ width: 48, height: 48 }}
                  src={backImage}
                  alt={""}
                />
              </Link>
            ) : (
              <Link
                onClick={() => {
                  SpeechRecognition.stopListening({ continuous: false });
                  this.props.changeStage("Previous", stage);
                }}
              >
                <img
                  style={{ width: 48, height: 48 }}
                  src={backImage}
                  alt={""}
                />
              </Link>
            )}
          </div>
          <div className="col-8" style={{ alignSelf: "center" }}>
            {" "}
            <h4
              style={{
                fontFamily: "montserrat-extrabold",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              {" "}
              {data.title}
            </h4>{" "}
          </div>
          <div className="col-2"> </div>
        </div>

        <div style={{ marginTop: "0px" }}>
          {/* {returncontent} */}
          <AudioRecognize1 datavalue={this.props.data} />
        </div>

        

        {this.state.Viewstate ? (
          <React.Fragment>
            <div
              style={{
                position: "absolute",
                marginTop: "2%",
                right: "5%",
                zIndex: 3,
              }}
            >
              {this.props.themeType === "StoryCard" ? (
                <Link
                  onClick={() => {
                    SpeechRecognition.stopListening({ continuous: false });
                    this.props.changeindex("Next", stage);
                  }}
                >
                  <img
                    style={{ width: 44, height: 44 }}
                    src={nextImage}
                    alt={""}
                  />
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    SpeechRecognition.stopListening({ continuous: false });
                    this.props.changeStage("Next", stage);
                  }}
                >
                  <img
                    style={{ width: 44, height: 44 }}
                    src={nextImage}
                    alt={""}
                  />
                </Link>
              )}
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commonGroupLanguageMappingData:
      state.languageReducer.commonGroupLanguageMappingData,
    commonGroupLanguageBaseData:
      state.languageReducer.commonGroupLanguageBaseData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioQuizScreen);
