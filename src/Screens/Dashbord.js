import React from 'react';
import Tilly_2 from '../images/Tilli_3.png';
import atomImg from '../images/noun_atom.png';
import heartImg from '../images/noun_Heart.png';
import winImg from '../images/noun_win.png';
import outline_forward from '../images/outline_forward.png';
import image_15 from '../images/image_15.png';
import image_14 from '../images/image_14.png';
import image_13 from '../images/image_13.png';
import outlineRoundIconOnly from '../images/outlineRoundIconOnly.png';
import MyConstant from "../config/MyConstant";
import { Style } from "react-style-tag";
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { connect } from 'react-redux';
import { fetchGetLanguageMapping, fetchGetLevelNameLanguageMapping } from '../redux/actions/languageActions';



class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodydata: [], progressingLevel: 1, points: 0, feellingsTool: 0, nameOfChild: '',
      levelLanguageMappingData: {}, languageMappingData: {}, languageBaseData: {},
      deviceHeight: window.innerWidth
    }
  }


  componentDidMount() {
    this.getLevels();
    this.getGameStatus()
    this.setState({
      nameOfChild: localStorage.getItem("nameOfChild")
    })
    this.getlevelsNameLanguageMappingdata()
    this.getLanguageMappingData()

    if (localStorage.getItem("ChooseLanguage")) {

      this.LanguageBaseDataget(JSON.parse(localStorage.getItem("ChooseLanguage")))
    }


  }

  async getlevelsNameLanguageMappingdata() {
    var language = localStorage.getItem("currentLanguage")

    let postJson = { languageId: language, sessionId: "1223" }
    let responseData = await doConnect("getLevelsNameLanguageMapping", "POST", postJson);


    if (responseData.response != null) {
      this.setState({ levelLanguageMappingData: JSON.parse(responseData.response) })

    }
    else {
      this.setState({ levelLanguageMappingData: {} })
    }


  }
  async getLanguageMappingData() {

    if (localStorage.getItem("currentLanguage")) {

      let postJson = { grouptype: "innerPageGroup", languageId: localStorage.getItem("currentLanguage"), sessionId: "1223" }
      let responseData = await doConnect("getLanguageMappingDataWithBaseData", "POST", postJson);
      var response1 = responseData.dataMap;
      if (response1) {
        this.setState({ languageMappingData: JSON.parse(response1.mappingData), languageBaseData: JSON.parse(response1.baseData) })
      } else {
        //that.setState({ error: 'Invalid Login Credential!' });
      }

    }
  }
  returnContent(index) {

    var pageIndex = 1
    const { innerGroupLanguageMappingData, innnerGroupLanguageBaseData } = this.props


    if (checkNullAndReturnString(innerGroupLanguageMappingData) && checkNullAndReturnString(innerGroupLanguageMappingData[pageIndex]) && checkNullAndReturnString(innerGroupLanguageMappingData[pageIndex].fieldData[index])) {
      return innerGroupLanguageMappingData[pageIndex].fieldData[index].value

    }
    else if (checkNullAndReturnString(innnerGroupLanguageBaseData) && checkNullAndReturnString(innnerGroupLanguageBaseData[pageIndex]) && checkNullAndReturnString(innnerGroupLanguageBaseData[pageIndex].fieldData[index])) {
      return innnerGroupLanguageBaseData[pageIndex].fieldData[index].value

    }

    else
      return ""
  }


  languageRefillData(val) {
    if (checkNullAndReturnString(this.state.levelLanguageMappingData)) {
      return this.state.levelLanguageMappingData[val];
    }
    return ""
  }


  async getGameStatus() {


    let postJson = { sessionId: '1223', userId: localStorage.getItem("loggedUserId") };
    // alert(JSON.stringify(postJson))
    let responseData = await doConnect("getUserGameStatus", "POST", postJson);
    // alert(JSON.stringify(responseData))
    //console.log('postJson get level==>', postJson)
    let json = responseData;
    if (json.response == null) {
      // this.props.setUserInfo('progressingLevel', 0)
      this.setState({ progressingLevel: 1 })
    }
    else {
      // console.log('postJson get==>', JSON.parse(responseData.response))
      //this.props.setUserInfo('progressingLevel', JSON.parse(responseData.response).level)
      // let a = false ? JSON.parse(responseData.response).level : 0
      let a = JSON.parse(responseData.response) ? JSON.parse(responseData.response).level : 1
      this.setState({
        progressingLevel: a,
        points: JSON.parse(responseData.response).points, feellingsTool: JSON.parse(responseData.response).feelingTool,
      })

      localStorage.setItem("userPoints", JSON.parse(responseData.response).points);
    }
  }

  async getLevels() {
    let postJson = { sessionId: '1223', levelId: '' };
    let that = this;
    let responseData = await doConnect("getGameLevels", "POST", postJson);
    let json = responseData;
    // console.log('json level', json)
    if (
      Object.keys(json).length > 0 &&
      json.levelsMap !== null &&
      json.levelsMap !== undefined
    ) {
      let levelsMap = json.levelsMap;
      let levelsDataList = [];
      if (Object.keys(levelsMap).length > 0) {
        Object.keys(levelsMap).forEach((keys) => {
          levelsDataList.push(levelsMap[keys]);
        });
      }
      levelsDataList.sort((a, b) =>
        a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0,
      );
      that.setState({ bodydata: levelsDataList });
    }
  }

  async LanguageBaseDataget(e) {

    localStorage.setItem("ChooseLanguage", JSON.stringify(e))
    localStorage.setItem("currentLanguage", e.value)


    let postJson = { grouptype: "outerPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson)

    let postJson_2 = { grouptype: "innerPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson_2)

    let postJson_3 = { languageId: e.value, sessionId: "1223" }
    this.props.fetchGetLevelNameLanguageMapping(postJson_3)


    let postJson_5 = { grouptype: "commonPageGroup", languageId: e.value, sessionId: "1223" };
    this.props.fetchGetLanguageMappingData(postJson_5)

    let postJson_4 = { languageId: e.value, sessionId: "1223" }
    let responseData = await doConnect("getLevelsNameLanguageMapping", "POST", postJson_4);
    if (responseData.response != null) {
      this.setState({ levelLanguageMappingData: JSON.parse(responseData.response) })

    }
    else {
      this.setState({ levelLanguageMappingData: {} })
    }
  }


  returnLevelContent() {
    let retrunData = []
    //this new code
    this.state.bodydata.map((ival, index) => {

      // if (index == 0) {
      if (index < this.state.progressingLevel) {
        retrunData.push(<div className="col-3 opadding justify-content-center align-self-center"
          key={index.toString()}
          style={{
            borderRadius: 26,
            backgroundColor: '#00C6AE', border: '2px solid #00C6AE',
            width: '100%', whiteSpace: 'nowrap', height: 31, color: "#18191F"
          }} > <span className="ffmedium" style={{ fontWeight: 700, fontSize: 14 }}>{this.returnContent(5)} {index + 1} </span>
        </div>)
      }
      else {
        retrunData.push(<div className="col-3 opadding justify-content-center align-self-center" key={index.toString()} >
          <span className="ffmedium" style={{ paddingTop: 6, width: '100%', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', }}>{this.returnContent(5)} {index + 1} </span>
        </div>)
      }
      return retrunData
    })

  }


  returnBodyContent() {

    let retrunData = []
    //new code
      Object.keys(this.state.bodydata).map((val, index) => {
        let image = this.state.bodydata[val].image;
        let nameModule = this.state.bodydata[val].name
        retrunData.push(
          <React.Fragment key={index.toString()}>
            <div className="col-3" >
              <div>
                <div className="dashboard-level" style={{ backgroundColor: this.state.bodydata[val].color }} onClick={() => {
                  // console.log(index)
                  // if (index == 0) {
                  // console.log(index, "***", this.state.progressingLevel)
                  if (index < this.state.progressingLevel) {
                    let progressLevel = index + 1
                    if (index === this.state.progressingLevel) {
                      progressLevel = this.state.progressingLevel
                    }
                    // console.log("progressLevel", progressLevel)
                    this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/module-manage/' + this.state.bodydata[val].id + '/' + index + '/' + progressLevel)
                    //this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/module/' + this.state.bodydata[val].id + '/' + 0 + '/' + this.state.progressingLevel)
                  }
                }}>
                  {/* {index > 0 ? */}
                  {index + 1 > this.state.progressingLevel ?
                    <React.Fragment>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        opacity: 0.8,
                        backgroundColor: '#BCBFCA',
                        height: 60,
                        zIndex: 2,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '90%',
                        margin: '5%'
                      }}> <i className="fa fa-lock" style={{ fontSize: 30, marginTop: 16, color: 'black' }} aria-hidden="true"></i>
                      </div>
                    </React.Fragment>
                    : null}
                  <img style={{ width: '90%', height: 43, marginTop: 11, maxWidth: 70 }} src={MyConstant.keyList.apiURL +
                    'vp?action=module&key=' +
                    image.fileName +
                    '&id=' +
                    image.fileType} alt={""}/>
                </div>
                <div style={{ paddingTop: 5 }} >
                  <p className="ffmedium" style={{ fontSize: 13, fontWeight: 500 }}>
                    {this.languageRefillData(this.state.bodydata[val].id) ?
                      this.languageRefillData(this.state.bodydata[val].id) : nameModule}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment >
        )
        return retrunData
      })
    

  }

  render() {


    return (
      <React.Fragment>

        <Style>
          {`
                    
                    .ffmedium{
                      font-family:montserrat-medium
                    }
                    .ffbold{
                      font-family:montserrat-extrabold
                    }
                    .opadding{
                      padding-left:0px;
                      padding-right:0px;
                    }
                      `}
        </Style>




        <div className="boxHeight">
          <div className="row pt-2  mx-0" >
            <div className="col-1 ml-2" onClick={() => {
              let data = { "label": "Sinhala", "value": "6f37e56c-d81a-456b-98a7-dad0a61d1667" }
              this.LanguageBaseDataget(data)
            }}>
              <div style={{ backgroundImage: `url(${outlineRoundIconOnly})`, width: 30, height: 30, backgroundSize: 'cover', position: 'absolute', justifyContent: 'center', alignSelf: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '75%', position: 'absolute',
                  //left: '10%',
                  fontFamily: 'schoolbell-regular',
                }}>
                  <img src={image_13} style={{ width: 40, height: 40, position: 'absolute', left: '-20%', top: '18%', marginTop: -2 }} alt={""}/>

                </div>
              </div>



            </div>
            <div className="col-1 ml-2"
              onClick={() => {

                let data = { "label": "Tamil", "value": "0c037198-c7c4-4b2d-8388-9045fdd75f73" }
                this.LanguageBaseDataget(data)
              }}
            >

              <div style={{ backgroundImage: `url(${outlineRoundIconOnly})`, width: 30, height: 30, backgroundSize: 'cover', position: 'absolute', justifyContent: 'center', alignSelf: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '75%', position: 'absolute',
                  left: '7%', top: '35%'
                  , fontFamily: 'schoolbell-regular',
                }}>
                  <img src={image_14} style={{ width: 20, height: 10, position: 'absolute', left: '10%', marginTop: -1 }} alt={""} />

                </div>
              </div>
            </div>
            <div className="col-1 ml-2" onClick={() => {
              let data = { "label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517" }
              this.LanguageBaseDataget(data)
            }}>


              <div style={{ backgroundImage: `url(${outlineRoundIconOnly})`, width: 30, height: 30, backgroundSize: 'cover', position: 'absolute', justifyContent: 'center', alignSelf: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', position: 'absolute', left: '10%', top: '30%', fontFamily: 'schoolbell-regular', }}>
                  <img src={image_15} style={{ width: 15, height: 12, position: 'absolute', left: '15%' }} alt={""}/>

                </div>
              </div>


            </div>
            <div className="col-5" />
            <div className="col-2">
              <img src={outline_forward} style={{ width: 48, height: 48, marginTop: 10 }} alt={""}/>
            </div>
          </div>


          <div className="row vertical-align mx-0">
            <div className="col-4">
              <span className="dashboard-img" style={{ backgroundColor: "#FFD465 !important" }} >
                <img className={"lego_profile"} src={Tilly_2} alt={""} />
              </span>
            </div>
            <div className="col-8">
              <p style={{
                fontFamily: "montserrat-extrabold", fontWeight: 800, fontSize: 32, textAlign: "initial", paddingLeft: 10
              }}>{this.returnContent(1)} </p>
              <p className="ffmedium char-limit" style={{ color: "#18191F", fontSize: 21, fontWeight: 500, marginTop: -20, textAlign: "initial", paddingLeft: 10 }} >
                {this.state.nameOfChild !== "user" ? <span> @ {this.state.nameOfChild} </span> : ""}  </p>
            </div>
          </div>


          <div className="row mx-0 px-2 py-2 point-margin" >
            <div className="col-12" style={{
              background: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#000000',
              borderRadius: 36,
              border: '4px solid #18191F',
              height: 92
            }}>
              <table style={{ height: '100%', width: '100%', }} key={"table"}>
                <tbody>
                  <tr>
                    <td>
                      <table style={{ margin: 'auto' }}>
                        <tbody>
                          <tr>
                            <td><img src={atomImg} alt={""}/></td>
                            <td style={{ padding: '0 2px' }}>
                              <div style={{ color: '#18191F', fontSize: 27, fontFamily: 'montserrat-extrabold', fontWeight: '800', lineHeight: '32px', textAlign: 'left', marginTop: 5 }}>{this.state.points}</div>
                              <div className="ffmedium" style={{ fontSize: 11, color: "#474A57", fontWeight: 500, }}>
                                {this.returnContent(2)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table style={{ margin: 'auto' }}>
                        <tbody>
                          <tr>
                            <td><img src={heartImg} alt={""}/></td>
                            <td style={{ padding: '0 2px' }}>
                              <div style={{ color: '#18191F', fontSize: 27, fontFamily: 'montserrat-extrabold', fontWeight: '800', lineHeight: '32px', textAlign: 'left', marginTop: 5 }}>{this.state.feellingsTool}</div>
                              <div className="ffmedium" style={{ fontSize: 11, color: "#474A57", fontWeight: 500, marginLeft: this.state.deviceHeight < 330 ? -15 : 0 }}>
                                {this.returnContent(3)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table style={{ margin: 'auto' }}>
                        <tbody>
                          <tr>
                            <td><img src={winImg} alt={""} /></td>
                            <td style={{ padding: '0 2px' }}>
                              <div style={{ color: '#18191F', fontSize: 27, fontFamily: 'montserrat-extrabold', fontWeight: '800', lineHeight: '32px', textAlign: 'left', marginTop: 5 }}>{this.state.progressingLevel}</div>
                              <div className="ffmedium" style={{ fontSize: 11, color: "#474A57", fontWeight: 500, }}>
                                {this.returnContent(4)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>



        <div className="row  mx-0 px-2 level-margin"  >
          <div className="col-12 opadding" style={{
            marginTop: 0,
            width: 310, height: 39,
            backgroundColor: '#FFFFFF',
            borderColor: '#000000',
            borderRadius: 26,
            border: '4px solid #000000',
          }}>
            <div className="row" style={{ marginLeft: 0 }}>
              {this.returnLevelContent()}
            </div>
          </div>

        </div>

        <div className="row mt-2  mx-0 level-heading">
          <div className="col-12">
            <p style={{ fontWeight: "bold", fontSize: 18, textAlign: 'left' }}> {this.returnContent(6)} </p>
          </div>
        </div>

        <div className="row mx-0 px-2 module-box">
          {this.returnBodyContent()}
        </div>
      </React.Fragment>

    );

  }

}


const mapStateToProps = (state) => {
  return {

    innnerGroupLanguageBaseData: state.languageReducer.innnerGroupLanguageBaseData,
    innerGroupLanguageMappingData: state.languageReducer.innerGroupLanguageMappingData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetLanguageMappingData: (postJson) => dispatch(fetchGetLanguageMapping(postJson)),
    fetchGetLevelNameLanguageMapping: (postJson) => dispatch(fetchGetLevelNameLanguageMapping(postJson))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashbord);

