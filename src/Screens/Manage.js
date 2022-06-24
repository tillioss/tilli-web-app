import React from 'react';
import logos from "../../src/images/logos.png";
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "english"
    }
  }

  componentDidMount() {
    let language = localStorage.getItem("preferredLanguage") ? localStorage.getItem("preferredLanguage") : "english";
    this.setState({
      language
    })
  }

  setLanguage(language) {
    localStorage.setItem("preferredLanguage", language);
    this.setState({
      language
    })
  }

  gotoModule() {
    let { language } = this.state;
    this.props.history.push('/' + MyConstant.keyList.projectUrl + '/demo?gender=female&age=7&language='+language)
  }
  render() {
    let { language } = this.state;

    return <div className="manage-container">
      <div className="logo my-2">
        <img className="" src={logos} />
      </div>
      <div className="my-2">
        <div className="header-text">Please Select Preferred Language</div>
      </div>
      <div className="my-2">
        <div className={`box ${language === "sinhala" ? "active" : ""}`} onClick={() => this.setLanguage('sinhala')}>Sinhala</div>
      </div>
      <div className="my-2">
        <div className={`box ${language === "tamil" ? "active" : ""}`} onClick={() => this.setLanguage('tamil')}>Tamil</div>
      </div>
      <div className="my-2">
        <div className={`box ${language === "english" ? "active" : ""}`} onClick={() => this.setLanguage('english')}>English</div>
      </div>
      <div className="my-5">
        <div className="submit-div">
          <button className="submit" onClick={() => this.gotoModule()}>Continue</button>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Manage);



