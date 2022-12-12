import React from 'react';
import { connect } from 'react-redux';
import logos from "../../src/images/logos.png";
import MyConstant from '../config/MyConstant';
import { fetchGetLanguageMapping, fetchGetLevelNameLanguageMapping } from '../redux/actions/languageActions';
import { doConnect, userTrack } from '../config/Common'




class DemoUserLogin_2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      deviceWidth: window.innerWidth,
      getResponce: false
    }
  }

  componentDidMount() {
    let { landingFrom } = this.props;
    if (landingFrom) {
      localStorage.setItem("landingFrom", landingFrom);
    }
    this.setState({ getResponce: true })
    var that = this;
    fetch(MyConstant.keyList.apiURL + "myIP").then((res) => res.json()).then((json) => {
      var deviceInfo = window.navigator.userAgent;
      var ipAddress = json.ip
      localStorage.setItem("ipAddress", ipAddress);
      that.UserLogin(ipAddress, deviceInfo)
    });
    // var deviceInfo = window.navigator.userAgent;
    // var ipAddress = ""
    // that.UserLogin(ipAddress, deviceInfo)
    if (landingFrom === "nenesa") {
      userTrack("nenesa", "Landing")
    }
  }

  handleResize = () => this.setState({
    deviceWidth: window.innerWidth,
  });

  async UserLogin(ipAddress, deviceInfo) {
    let { match, location } = this.props
    // console.log("this", this.props)
    //localStorage.removeItem("demoUserId");
    console.log(localStorage.getItem("demoUserId"))

    let age = ""
    let gender = ""
    let demoUserId = ""
    let languageChange = ""
    let userType = ""

    if (localStorage.getItem("demoUserId")) {
      demoUserId = localStorage.getItem("demoUserId")
    }

    if (location.search) {

      let data_1 = location.search.split("?")
      let data_2 = data_1[1].split("&")
      data_2.map((ival, i) => {

        let equalSplit = ival.split("=")
        console.log(equalSplit[0])
        if (equalSplit[0] === "gender") {
          gender = equalSplit[1]
        }
        else if (equalSplit[0] === "age") {
          age = equalSplit[1]
        }
        else if (equalSplit[0] === "demoUserId") {
          demoUserId = equalSplit[1]
        }
        else if (equalSplit[0] === "language") {
          languageChange = equalSplit[1]
        }
        else if (equalSplit[0] === "userType") {
          userType = equalSplit[1]
        }
        return true
      })

    }
    else if (match.params.age && match.params.gender) {
      age = match.params.age
      gender = match.params.gender
      demoUserId = match.params.demoUserId
      languageChange = match.params.language
    }
    //sessionId: String,demoUserId:String,userType: Option[String] = None,ip: Option[String] = None, deviceInfo: Option[String] = None

    // let postJson = { sessionId: "123", age, gender, demoUserId, userType, ip: ipAddress, deviceInfo: deviceInfo,language :languageChange}


    let postJson = { sessionId: "123", demoUserId, userType, ip: ipAddress, deviceInfo: deviceInfo, }
    let eventtType = "createDemoUser"

    let landingFormPage = localStorage.getItem("landingFrom")
    console.log(landingFormPage)

    if (landingFormPage && landingFormPage !== "demo") {
      eventtType = "createDemo2User"
      postJson = { sessionId: "123", age, gender, demoUserId, userType, ip: ipAddress, deviceInfo: deviceInfo, language: languageChange }
    }

    console.log("postJson-->", postJson)
    console.log("eventtType-->", eventtType)

    if (languageChange.toLowerCase() === "tamil") {
      this.getLangugeBaseData({ "label": "Tamil", "value": "0c037198-c7c4-4b2d-8388-9045fdd75f73" })
    }
    else if (languageChange.toLowerCase() === "english") {
      this.getLangugeBaseData({ "label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517" })

    } else if (languageChange.toLowerCase() === "sinhala") {
      this.getLangugeBaseData({ "label": "Sinhala", "value": "6f37e56c-d81a-456b-98a7-dad0a61d1667" })
    }
    else {
      this.getLangugeBaseData({ "label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517" })
    }
    // console.log("languageChange", languageChange)

    let responseData = await doConnect(eventtType, "POST", postJson);
        var json = responseData;
        console.log("json", json)
        var response1 = json.response;
        console.log(responseData)
        if (response1 === 'Success') {
          if (json.id !== '') {
            this.setState({ getResponce: false })
            localStorage.setItem("nameOfChild", json.name);
            // localStorage.setItem("loggedUserId", json.id)
            localStorage.setItem("demoUserId", json.id)

            if (landingFormPage && landingFormPage !== "demo") {

              localStorage.setItem("userAge", age)
              localStorage.setItem("userGender", gender)
            }
            else {
              localStorage.setItem("userAge", json.ageOfChild)
              localStorage.setItem("userGender", json.genderOfChild)
            }

            // this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/home/')
            // let test = "/8ea8622f-2f22-4e11-8946-65b7a580577d/0/0"
            //  let test = "/7e90729e-d904-4c54-a6a6-913ff472d5bf/0/0"

            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/module/11a13ad4-7877-4c5c-81d1-88d29435eb0a/5/5')

            //  this.props.history.push('/' + MyConstant.keyList.projectUrl + '/module'+test)
          }
        } else {
          this.setState({ errorLogin: 'Invalid Login Credential!' });
        }

  }

  async getLangugeBaseData(e) {

    console.log("this get call", e)

    localStorage.setItem("ChooseLanguage", JSON.stringify(e))
    localStorage.setItem("currentLanguage", e.value)

    let postJson = { grouptype: "outerPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson)

    let postJson_2 = { grouptype: "innerPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson_2)

    let postJson_3 = { languageId: e.value, sessionId: "1223" }
    this.props.fetchGetLevelNameLanguageMapping(postJson_3)

    let postJson_4 = { grouptype: "commonPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson_4)
  }

  render() {

    let { getResponce, deviceWidth } = this.state;
    // var baseUrl = "https://teqbahn.com"
    //var baseUrl = "http://192.168.43.110:3000"
    // let detailsUser = baseUrl + "/" + MyConstant.keyList.projectUrl + "/demouserlogin2?sessionId=123&gender=male&age=7"
    return (
      <div>

        <div className={deviceWidth > 500 ? "row mx-0 pt-3 mb-2 mt-5" : "row mx-0 pt-3 mb-2 mt-3"} >
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <img style={{ width: 150, height: 150 }} src={logos} alt={""}/>
          </div>
          <div className="col-sm-2"> </div>
        </div>

        {getResponce ? <>

          <div className="row mt-5">
            <div className="col-sm-5 col-4"></div>
            <div className="col-sm-3 col-4 col-xs-12 ">
              <div class="loader center-loader"></div>
            </div>
            <div className="col-sm-4 col-4 "></div>
          </div>
        </> : ""}

      </div>);
  }
}



const mapStateToProps = (state) => {
  return {
    outerGroupLanguageMappingData: state.languageReducer.outerGroupLanguageMappingData,
    outerGroupLanguageBaseData: state.languageReducer.outerGroupLanguageBaseData,
    innnerGroupLanguageBaseData: state.languageReducer.innnerGroupLanguageBaseData,
    innerGroupLanguageMappingData: state.languageReducer.innerGroupLanguageMappingData,
    commonGroupLanguageMappingData: state.languageReducer.commonGroupLanguageMappingData,
    commonGroupLanguageBaseData: state.languageReducer.commonGroupLanguageBaseData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetLanguageMappingData: (postJson) => dispatch(fetchGetLanguageMapping(postJson)),
    fetchGetLevelNameLanguageMapping: (postJson) => dispatch(fetchGetLevelNameLanguageMapping(postJson))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DemoUserLogin_2);



