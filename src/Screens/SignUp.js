import React from 'react';
import image from "../../src/images/tilli.jpg";
import MyConstant from '../config/MyConstant';
import lockPng from '../images/lock.png';
import userPng from '../images/user.png';
import { Style } from "react-style-tag";
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { connect } from 'react-redux';
import Input from "../Component/Input";


class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Uservalue: 'tilli',
      Passvalue: 'Tilli123!',
      languageMappingData: {},
      languageBaseData: {},
      errors: {
        email: "",
        password: "",
        verifyPassword: "",
        name: "",
        ageOfTheChild: "",
        nameOfTheChild: "",
        passcode: ""
      },
      firstSubmit: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    //back ground color change ...
    document.body.style.backgroundColor = "white";
  }

   user_create = async () => {

    if (this.state.firstSubmit == false) {
      for (var key in this.state.errors) {
        let value = typeof this.state[key] === "undefined" ? "" : this.state[key];
        let errors = this.validation(key, value);
        this.setState({
          errors: errors
        });
      }
    }
    this.setState({
      firstSubmit: true
    });

    let {
      name,
      email,
      password,
      ageOfTheChild,
      nameOfTheChild,
      passcode,
    } = this.state;

    let postJson = {
      emailId: email,
      password: password,
      name: name,
      ageOfChild: ageOfTheChild,
      nameOfChild: nameOfTheChild,
      passcode: passcode,
      sessionId: '123',
    };


    let that = this;
    if (Object.keys(this.state.errors).length === 0) {
      let responseData = await doConnect("createUser", "POST", postJson);
      let json = responseData;
      let response1 = json.response;
      if (response1 == 'Success') {
        //that.props.navigation.navigate('SignIn');
        window.location = '/' + MyConstant.keyList.projectUrl + '/'
      }
      
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let errors = this.validation(name, value);
    this.setState({
      [name]: value,
      errors: errors
    });
  }

  validation(name, value) {
    let errors = this.state.errors;
    let length = value.length;
    switch (name) {
      case "email":
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(value) == false) {
          errors[name] = "Please enter valid email address.";
        } else {
          delete errors[name]
        }
        break;
      case "password":
        if (value.trim() === '') {
          errors[name] = "Please enter password.";
        } else if (length < 6) {
          errors[name] = "Min 6 characters required.";
        } else {
          delete errors[name]
        }
        break;
      case "verifyPassword":
        let password = this.state.password;
        if (value != password) {
          errors[name] = "Password and Verify Password does not match.";
        } else {
          delete errors[name]
        }
        break;
      case "name":
        if (value.trim() === '') {
          errors[name] = "Please enter name.";
        } else {
          delete errors[name]
        }
        break;
      case "ageOfTheChild":
        if (value.trim() === '') {
          errors[name] = "Please enter age of the child.";
        } else if (/^\+?(0|[1-9]\d*)$/.test(value) == false) {
          errors[name] = "Please enter valid age.";
        } else {
          delete errors[name]
        }
        break;
      case "nameOfTheChild":
        if (value.trim() === '') {
          errors[name] = "Please enter name of the child.";
        } else {
          delete errors[name]
        }
        break;
      case "passcode":
        if (value.trim() === '') {
          errors[name] = "Please enter passcode.";
        } else if (length < 4) {
          errors[name] = "Min 4 characters required.";
        } else {
          delete errors[name]
        }
        break;
    }

    return errors;
  }

  loginCheck() {

    if (this.state.Uservalue == this.state.Username && this.state.Passvalue == this.state.Password) {

      window.location = '/' + MyConstant.keyList.projectUrl + '/Dashbord'
    }
    else {
      alert('Incorrect User Name Password')
    }

  }

  returnContent(index) {

    var pageIndex = 2
    const { languageMappingData, languageBaseData } = this.state;

    const { outerGroupLanguageMappingData, outerGroupLanguageBaseData } = this.props

    if (checkNullAndReturnString(outerGroupLanguageMappingData) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex].fieldData[index])) {
      return outerGroupLanguageMappingData[pageIndex].fieldData[index].value;
    } else if (checkNullAndReturnString(outerGroupLanguageBaseData) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex].fieldData[index])) {
      return outerGroupLanguageBaseData[pageIndex].fieldData[index].value;
    } else
      return ""
  }
  checkemail = async () => {
    let postJson = { emailId: this.state.email, sessionId: '1223' };
    let responseData = await doConnect("checkEmailIdAlreadyExist", "POST", postJson);
    var json = responseData;
    var response1 = json.response;
    console.log('response1', response1)
    if (response1) {
      let errors = this.state.errors;
      errors.email = "This email already exsist";
      this.setState({ errors });
    }
  }

  render() {

    let { email, password, verifyPassword, name, ageOfTheChild, nameOfTheChild, passcode, errors } = this.state;

    return (
      <React.Fragment>

        <br />
        <div className="row mx-0" >
          <div className="col-sm-2"> </div>
          <div className="col-sm-8"> </div>
          <div className="col-sm-2"> </div>
        </div>


        <div className="row mx-0">
          <div className="col-sm-2"> </div>
          <div className="col-sm-8"><h5 style={{ color: "black", fontWeight: 'bold' }}> {this.returnContent(1)}</h5> </div>
          <div className="col-sm-2"> </div>
        </div>


        <div className="container">
          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">
                <Input
                  type="text"
                  className={(typeof errors['email'] != "undefined" && errors['email'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(2)} style={{ paddingLeft: 15 }}
                  name="email"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['email'] != "undefined" && errors['email'] != "") ? errors['email'] : ""}
                  onBlur={this.checkemail}
                />
              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">

              <div className="fontpassword">
                <Input
                  type="password"
                  className={(typeof errors['password'] != "undefined" && errors['password'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(3)} style={{ paddingLeft: 15 }}
                  name="password"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['password'] != "undefined" && errors['password'] != "") ? errors['password'] : ""}
                />

              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">
                <Input
                  type="password"
                  className={(typeof errors['verifyPassword'] != "undefined" && errors['verifyPassword'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(4)} style={{ paddingLeft: 15 }}
                  name="verifyPassword"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['verifyPassword'] != "undefined" && errors['verifyPassword'] != "") ? errors['verifyPassword'] : ""}
                />
              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>

          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">
                <Input
                  type="text"
                  className={(typeof errors['name'] != "undefined" && errors['name'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(5)} style={{ paddingLeft: 15 }}
                  name="name"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['name'] != "undefined" && errors['name'] != "") ? errors['name'] : ""}
                />
              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>


          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">
                <Input
                  type="text"
                  className={(typeof errors['ageOfTheChild'] != "undefined" && errors['ageOfTheChild'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(6)} style={{ paddingLeft: 15 }}
                  name="ageOfTheChild"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['ageOfTheChild'] != "undefined" && errors['ageOfTheChild'] != "") ? errors['ageOfTheChild'] : ""}
                />
              </div>
            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">
                <Input
                  type="text"
                  className={(typeof errors['nameOfTheChild'] != "undefined" && errors['nameOfTheChild'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(7)} style={{ paddingLeft: 15 }}
                  name="nameOfTheChild"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['nameOfTheChild'] != "undefined" && errors['nameOfTheChild'] != "") ? errors['nameOfTheChild'] : ""}
                />

              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>



          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <div className="fontuser">

                <Input
                  type="password"
                  className={(typeof errors['passcode'] != "undefined" && errors['passcode'] != "") ? "custom-invalid" : ""}
                  placeholder={this.returnContent(8)} style={{ paddingLeft: 15 }}
                  name="passcode"
                  handleInputChange={this.handleInputChange}
                  error={(typeof errors['passcode'] != "undefined" && errors['passcode'] != "") ? errors['passcode'] : ""}
                />

              </div>

            </div>
            <div className="col-sm-3"> </div>
          </div>


          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">

              <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={() => {
                this.user_create()
              }} >{this.returnContent(9)}</button>
            </div>
            <div className="col-sm-3"> </div>
          </div>
          {/* {JSON.stringify(this.props.outerGroupLanguageMappingData)}
{JSON.stringify(this.props.outerGroupLanguageBaseData)} */}

          <div className="row mx-0">
            <div className="col-sm-3"> </div>
            <div className="col-sm-6">
              <span style={{ fontSize: 20, color: '#18191F' }}> {this.returnContent(10)}   </span> <span style={{ fontSize: 20, cursor: 'pointer', color: '#00C6AE' }} onClick={() => {
                this.props.history.push("/tilli-web")
              }}>  {this.returnContent(11)}.</span>

            </div>
            <div className="col-sm-3"> </div>
          </div>


        </div>



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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);





