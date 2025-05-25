import React from "react";
import logos from "../../src/images/logos.png";
import MyConstant from "../config/MyConstant";
import { connect } from "react-redux";
import { userTrack } from "../config/Common";

class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "english",
      gender: "female",
      age: 5,
    };
  }

  componentDidMount() {
    let { landingFrom } = this.props;
    console.log(landingFrom);
    userTrack(landingFrom, "Landing");
    let language = localStorage.getItem("preferredLanguage")
      ? localStorage.getItem("preferredLanguage")
      : "english";
    this.setState({
      language,
    });

    if (landingFrom === "demo") {
      this.gotoModule();
    }
  }

  setLanguage(language) {
    localStorage.setItem("preferredLanguage", language);
    this.setState({
      language,
    });
  }
  setGender(gender) {
    this.setState({
      gender,
    });
  }
  setAge(age) {
    this.setState({
      age,
    });
  }

  gotoModule() {
    let { language, gender, age } = this.state;
    let { landingFrom } = this.props;
    localStorage.setItem("landingFrom", landingFrom);

    if (landingFrom === "demo") {
      this.props.history.push(
        "/" + MyConstant.keyList.projectUrl + "/redirect-demo"
      );
    } else {
      this.props.history.push(
        "/" +
          MyConstant.keyList.projectUrl +
          "/redirect-demo?gender=" +
          gender +
          "&age=" +
          age +
          "&language=" +
          language
      );
    }

    userTrack(landingFrom, "Clicked to Continue");
  }
  render() {
    let { language, age, gender } = this.state;

    return (
      <div className="manage-container">
        <div className="logo mt-2 mb-5">
          <img className="" src={logos} alt={""} />
        </div>
        <div className="my-2">
          <div className="header-text">Gender</div>
          <div style={{ display: "flex", margin: "10px 25px" }}>
            <div
              data-testid="male-gender-option"
              className={`age-box ${gender === "male" ? "active" : ""}`}
              onClick={() => this.setGender("male")}
            >
              Male
            </div>
            <div
              data-testid="female-gender-option"
              className={`age-box ${gender === "female" ? "active" : ""}`}
              onClick={() => this.setGender("female")}
            >
              Female
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="header-text">Age</div>
          <div style={{ display: "flex", margin: "10px 25px" }}>
            <div
              data-testid="age-5-option"
              className={`age-box ${age === 5 ? "active" : ""}`}
              onClick={() => this.setAge(5)}
            >
              5
            </div>
            <div
              data-testid="age-6-option"
              className={`age-box ${age === 6 ? "active" : ""}`}
              onClick={() => this.setAge(6)}
            >
              6
            </div>
            <div
              data-testid="age-7-option"
              className={`age-box ${age === 7 ? "active" : ""}`}
              onClick={() => this.setAge(7)}
            >
              7
            </div>
            <div
              data-testid="age-8-option"
              className={`age-box ${age === 8 ? "active" : ""}`}
              onClick={() => this.setAge(8)}
            >
              8
            </div>
            <div
              data-testid="age-9-option"
              className={`age-box ${age === 9 ? "active" : ""}`}
              onClick={() => this.setAge(9)}
            >
              9
            </div>
            <div
              data-testid="age-10-option"
              className={`age-box ${age === 10 ? "active" : ""}`}
              onClick={() => this.setAge(10)}
            >
              10
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="header-text">Please Select Preferred Language</div>
        </div>
        <div className="my-2">
          <div
            className={`box ${language === "sinhala" ? "active" : ""}`}
            onClick={() => this.setLanguage("sinhala")}
            data-testid="sinhala-language-option"
          >
            Sinhala
          </div>
        </div>
        <div className="my-2">
          <div
            className={`box ${language === "tamil" ? "active" : ""}`}
            onClick={() => this.setLanguage("tamil")}
            data-testid="tamil-language-option"
          >
            Tamil
          </div>
        </div>
        <div className="my-2">
          <div
            className={`box ${language === "english" ? "active" : ""}`}
            onClick={() => this.setLanguage("english")}
            data-testid="english-language-option"
          >
            English
          </div>
        </div>

        <div className="my-3">
          <div className="submit-div">
            <button data-testid="continue-button" className="submit" onClick={() => this.gotoModule()}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
