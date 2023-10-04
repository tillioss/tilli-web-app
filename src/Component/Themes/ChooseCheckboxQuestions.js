import React from "react";
import { Style } from "react-style-tag";
import backImage from "../../images/outlineBackIcon.png";
import nextImage from "../../images/outlineRightIcon.png";
import questionIcon from "../../images/questionIcon.png";
import tickMarkIcon from "../../images/tickMarkIcon.png";
import { Link } from "react-router-dom";

class ChooseCheckboxQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let levelIndex = match.params.levelIndex;

    if (localStorage.getItem(levelIndex + "_selectedData")) {
      console.log(localStorage.getItem(levelIndex + "_selectedData"));
      this.setState({
        selectedData: JSON.parse(
          localStorage.getItem(levelIndex + "_selectedData")
        ),
      });
    }
  }
  pushData(data) {
    let selectedData = this.state.selectedData;

    if (selectedData.length > 0 && selectedData.includes(data)) {
      let index = selectedData.indexOf(data);
      if (index !== -1) {
        selectedData.splice(index, 1);
      }
    } else {
      selectedData.push(data);
    }
    this.setState({ selectedData });
  }

  checkedData() {
    const { match } = this.props;
    let levelIndex = match.params.levelIndex;

    if (this.state.selectedData.length > 0) {
      localStorage.removeItem(levelIndex + "_selectedData");
      localStorage.setItem(
        levelIndex + "_selectedData",
        JSON.stringify(this.state.selectedData)
      );
      console.log(
        JSON.parse(localStorage.getItem(levelIndex + "_selectedData"))
      );
    }
  }
  render() {
    const { stage, data } = this.props;
    let content = data.content;
    let selectedData = this.state.selectedData;

    let checkBoxes = content.checkBoxesOption.map((checkBox, index) => {
      let exist = 0;
      if (selectedData.length > 0 && selectedData.includes(checkBox.content)) {
        exist = 1;
      }
      return (
        <div
          className="col-6"
          style={{ margin: 0, padding: 0, paddingLeft: 10, marginTop: 10 }}
          key={index}
        >
          <Link onClick={() => this.pushData(checkBox.content)}>
            <div
              style={{
                backgroundColor: exist
                  ? content.colors.checked
                  : content.colors.unChecked,
                borderRadius: 12,
                borderWidth: 2,
                borderStyle: "solid",
                width: 34,
                height: 36,
                position: "absolute",
                left: 20,
                top: 0,
              }}
            >
              {exist ? (
                <img
                  src={tickMarkIcon}
                  style={{ width: 28, height: 23 }}
                  resizeMode={"contain"}
                  alt={""}
                />
              ) : null}
            </div>
          </Link>
          <div
            className="box_width"
            style={{
              backgroundColor: exist ? content.colors.box : checkBox.bgcolor,
              borderRadius: 16,
              borderWidth: 2,
              borderStyle: "solid",
              marginLeft: 30,
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <p
              style={{
                paddingTop: 10,
                fontSize: 16,
                fontFamily: "montserrat-medium",
                lineHeight: 1.0,
                fontWeight: 400,
              }}
            >
              {checkBox.content}
            </p>
          </div>
        </div>
      );
    });
    return (
      <React.Fragment>
        <Style>
          {`

  .box_width{
    width: 150px; min-height: 150px;
   }


   @media only screen and (max-width: 600px) {
    .box_width{
        width: 128px; min-height: 133px;
       }
  }

                      `}
        </Style>
        <div className="module-content">
          <div className="col-12" style={{ margin: 0, padding: 0 }}>
            <div className="row mt-4 ml-0">
              <div className="col-2">
                <Link
                  onClick={() => {
                    this.checkedData();
                    this.props.changeStage("Previous", stage);
                  }}
                >
                  <img
                    style={{ width: 48, height: 48 }}
                    src={backImage}
                    alt={""}
                  />
                </Link>
              </div>
              <div className="col-10">
                <p
                  style={{
                    //color: '#474A57',
                    fontSize: 27,
                    fontFamily: "montserrat-extrabold",
                    fontWeight: "800",
                    alignSelf: "center",
                  }}
                >
                  {data.title}
                </p>
              </div>
            </div>
            <div style={{ textAlign: "left", paddingLeft: 15 }}>
              <img
                style={{ width: 50, marginLeft: 10 }}
                src={questionIcon}
                alt={""}
              />
            </div>
            <div className="mt-1">
              <p
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: "montserrat-regular",
                  fontWeight: "400",
                  textAlign: "center",
                  padding: 0,
                  marginBottom: 0,
                  lineHeight: 1.1,
                  paddingLeft: 24,
                  paddingRight: 10,
                }}
              >
                {content.questionTitle}
              </p>
            </div>
            <div
              className="row"
              style={{
                paddingLeft: 15,
                paddingRight: 40,
                paddingTop: window.innerHeight / 25,
              }}
            >
              {checkBoxes}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-9"></div>
            <div
              className="col-3"
              style={{
                marginTop: window.innerHeight / 13,
                padding: 0,
                textAlign: "end",
                marginLeft: 0,
                marginRight: 0,
                paddingRight: "5%",
              }}
            ></div>
          </div>
        </div>
        <div className="forward-step">
          <Link
            onClick={() => {
              this.checkedData();
              this.props.changeStage("Next", stage);
            }}
            style={{ textAlign: "end", width: "100%" }}
          >
            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
export default ChooseCheckboxQuestions;
