import React from 'react';
import logos from "../../src/images/logos.png";
import MyConstant from '../config/MyConstant';
import { Style } from "react-style-tag";
import DropDown from "../Component/DropDown";
import LanguageSelect from "../Screens/LanguageSelect";
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { connect } from 'react-redux';



class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Uservalue: 'tilli', Passvalue: 'Tilli123!',
      selectedOption: { label: "Select", value: "Select " },
      optionsData: [],
      LanguageData: false,
      languageMappingData: {}, languageBaseData: {}
    }
    this.onChangeData = this.onChangeData.bind(this);

  }



  componentDidMount() {
    //back ground color change ...

    document.body.style.backgroundColor = "white";

  }





  loginCheck = async () => {
    let { Username, Password } = this.state;
    let postJson = { loginId: Username, password: Password, sessionId: '1223' };
    let that = this;
    let responseData = await doConnect("login", "POST", postJson);
    var json = responseData;
    var response1 = json.response;

    if (response1 == 'Success') {
      if (json.id != '') {
        // this.props.lSetAuthData('loggedUserId', json.id);
        // this.props.lSetAuthData('loggedUserName', json.name);
        // this.props.lSetAuthData('loggedSession', json.sessionId);
        //that.props.navigation.navigate('Home');

        localStorage.setItem("nameOfChild", json.nameOfChild);
        localStorage.setItem("loggedUserId", json.id);

        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')

      }
    } else {
      this.setState({ error: 'Invalid Login Credential!' });
    }
  };

  onChangeData(e, Jsondata) {

    let data = JSON.parse(Jsondata)
    this.setState({ LanguageData: e.label == "hindi" ? false : data })



  }


  returnContent(index) {

    var pageIndex = 1
    const { languageMappingData, languageBaseData } = this.state;
    const { outerGroupLanguageMappingData, outerGroupLanguageBaseData } = this.props



    if (checkNullAndReturnString(outerGroupLanguageMappingData) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex].fieldData[index])) {
      return outerGroupLanguageMappingData[pageIndex].fieldData[index].value

    }
    else if (checkNullAndReturnString(outerGroupLanguageBaseData) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex].fieldData[index])) {
      return outerGroupLanguageBaseData[pageIndex].fieldData[index].value

    }

    else
      return ""
  }


  render() {
    console.log(this.props);
    const { LanguageData } = this.state;
    return (
      <React.Fragment>

        <br />
        <div className="row mx-0" >
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <img style={{ width: 80, height: 80 }} src={logos} />
          </div>
          <div className="col-sm-2"> </div>
        </div>


        <div className="row mx-0">
          <div className="col-sm-2">  </div>
          <div className="col-sm-8"><h5 style={{ color: "black", fontWeight: 'bold' }}>
            {this.returnContent(1)}   </h5> </div>
          <div className="col-sm-2"> </div>
        </div>

        <div className="container">
          {
            this.state.error &&
            <div className="row mx-0">
              <div className="col-sm-3"> </div>
              <div className="col-sm-6">
                <div className="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              </div>
            </div>
          }

          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">

                <input type="text" value={this.state.Username}
                  placeholder={this.returnContent(2)}
                  name="uname" onChange={(e) => {
                    this.setState({ Username: e.target.value })
                  }} />
                <i className="fa fa-user fa-lg"></i>
              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">

              <div className="fontpassword">

                <input type="password" value={this.state.Password}
                  placeholder={this.returnContent(3)}
                  name="psw" onChange={(e) => {
                    this.setState({ Password: e.target.value })
                  }} />
                <i className="fa fa-lock fa-lg"></i>
              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">

              <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={() => { this.loginCheck() }}>

                {this.returnContent(4)}
              </button>
            </div>
            <div className="col-sm-3"> </div>
          </div>


          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <span style={{ fontSize: 20, color: '#18191F' }}>  {this.returnContent(5)} </span> <span style={{ fontSize: 20, color: '#DD3B96', cursor: 'pointer' }} onClick={() => {
                //window.location.href = '/tilli-web/signup'
                this.props.history.push("/tilli-web/signup")
              }}>  {this.returnContent(6)} </span>
              <br />
            </div>
            <div className="col-sm-3"> </div>
          </div>

          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <button style={{ fontSize: 20, backgroundColor: '#FFF', color: '#000' }} onClick={() => this.props.history.push('/' + MyConstant.keyList.projectUrl + '/ForgotPassword')
              }>
                {this.returnContent(8)}
              </button>
            </div>
            <div className="col-sm-3"> </div>
          </div>

        </div>

        <span style={{ fontSize: 20, color: '#18191F', }}> {this.returnContent(7)}  </span>

        <LanguageSelect onChange={this.onChangeData} />

      </React.Fragment>

    );
  }

}



const mapStateToProps = (state) => {
  return {

    outerGroupLanguageMappingData: state.languageReducer.outerGroupLanguageMappingData,
    outerGroupLanguageBaseData: state.languageReducer.outerGroupLanguageBaseData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);



