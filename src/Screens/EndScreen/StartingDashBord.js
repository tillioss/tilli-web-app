import React from 'react';
import EndDashTilli from '../../images/EndDashTilli.png';
import EHeart from '../../images/EHeart.png';
import Estart from '../../images/Estart.png';
import EHappy from '../../images/EHappy.png';
import { connect } from 'react-redux';
import { checkNullAndReturnString, doConnect } from "../../config/Common";
import image_15 from '../../images/image_15.png';
import image_14 from '../../images/image_14.png';
import image_13 from '../../images/image_13.png';
import outlineRoundIconOnly from '../../images/outlineRoundIconOnly.png';
import { fetchGetLanguageMapping, fetchGetLevelNameLanguageMapping } from '../../redux/actions/languageActions';


export class StartingDashBord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight,
        }
    }

    componentDidMount() {

        this.handleResize();
        window.addEventListener('resize', this.handleResize)

        var elements = document.getElementsByClassName('mobile-responsive'); // get all elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#FFBD12";
        }

        // console.log(this.props.innerGroupLanguageMappingData)
        // console.log(this.props.innnerGroupLanguageBaseData)
    }


    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });
    return_content(index) {
        var pageIndex = 8
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

    async LanguageBaseDataget(e) {

        let getlanuage = localStorage.getItem("currentLanguage")
        if (getlanuage !== e.value) {
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
            this.props.lanuguageJsonUpdate()

            let responseData = await doConnect("getLevelsNameLanguageMapping", "POST", postJson_4);
            if (responseData && responseData.response != null) {
                this.setState({ levelLanguageMappingData: JSON.parse(responseData.response) })
            }
            else {
                this.setState({ levelLanguageMappingData: {} })
            }
        }
    }

    render() {
        let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")

        return (<>
            <div className="row ml-0 st-bg-green" style={{}}>

                <div className="row pt-2  mx-0" >
                    <div className="col-1 ml-1" style={{ cursor: "pointer" }} onClick={() => {
                        let data = { "label": "Sinhala", "value": "6f37e56c-d81a-456b-98a7-dad0a61d1667" }
                        this.LanguageBaseDataget(data)
                    }}>
                        <div style={{ backgroundImage: `url(${outlineRoundIconOnly})`, width: 30, height: 30, backgroundSize: 'cover', position: 'absolute', justifyContent: 'center', alignSelf: 'center', textAlign: 'center' }}>
                            <div style={{
                                width: '75%', position: 'absolute',
                                fontFamily: 'schoolbell-regular',
                            }}>
                                <img src={image_13} style={{ width: 40, height: 40, position: 'absolute', left: '-20%', top: '18%', marginTop: -2 }} alt={""} />

                            </div>
                        </div>
                    </div>
                    <div className="col-1 ml-1" style={{ cursor: "pointer" }}
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
                                <img src={image_14} style={{ width: 20, height: 10, position: 'absolute', left: '10%', marginTop: -1 }} alt={""}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 ml-1" style={{ cursor: "pointer" }} onClick={() => {
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
                    </div>
                </div>

                <div className="col-sm-1 col-lg-1 "> </div>
                <div className="col-12 col-sm-10 col-lg-10">
                    {/* margin-space */}
                    <div className="row pt-3 mt-2">
                        <div className="col-4 col-sm-4 col-lg-4">
                            <div className="st-img-bg" >
                                <img className="st-img" src={EndDashTilli} alt={""}/>
                            </div>

                        </div>

                        <div className="col-8 col-sm-8 col-lg-8">
                            <p className="heading_text" style={{ textAlign: UWPview ? 'left' : 'start' }}> {this.return_content(1)} </p>
                            <p className="heder_sub_text" style={{ textAlign: UWPview ? 'left' : 'start' }} > {this.return_content(2)}</p>
                        </div>

                    </div>
                </div>
                <div className="col-sm-1 col-lg-1"> </div>
            </div>
            <div className="row ml-0" style={{
                backgroundColor: "#FFBD12",
                height: "auto"

            }}>

                <div className="row ml-0 mar-top-row" >
                    <div className="col-sm-1 col-1"> </div>
                    <div className="col-sm-10 col-10">
                        <div className="row mt-3 row-space">
                            <div className="col-sm-3 col-lg-2 col-3">
                                <img className="img_1" src={Estart} alt={""}/>
                            </div>

                            <div className="col-sm-9 col-lg-10 col-9">
                                <p className="img_font" style={{ textAlign: UWPview ? 'left' : 'start' }}
                                >
                                    {this.return_content(3)}</p>
                            </div>

                        </div>

                        <div className="row  row-space">
                            <div className="col-sm-3 col-lg-2 col-3">
                                <img className="img_2" src={EHeart} alt={""}/>
                            </div>
                            <div className="col-sm-9 col-lg-10 col-9">
                                <p className="img_font" style={{ textAlign: UWPview ? 'left' : 'start' }}>
                                    {this.return_content(4)}</p>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-sm-3 col-lg-2 col-3">
                                <img className="img_3" src={EHappy} alt={""}/>
                            </div>
                            <div className="col-sm-9 col-lg-10 col-9">
                                <p className="img_font" style={{ textAlign: UWPview ? 'left' : 'start' }} >
                                    {this.return_content(5)} </p>
                            </div>
                        </div>


                        <div className="row ml-0 pt-5 row-space-btn">
                            <div className="col-sm-4 col-2 col-lg-4"> </div>
                            <div className="col-sm-4 col-8 col-lg-4">
                                <div className="st-btn-text" onClick={() => {
                                    this.props.onPlayDash()
                                }} >
                                    <p>  {this.return_content(6)} </p>
                                </div>

                            </div>
                            <div className="col-sm-4 col-2 col-lg-4"> </div>
                        </div>

                    </div>
                    <div className="col-sm-1 col-1"> </div>
                </div>
            </div>
        </>)
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
        fetchGetLevelNameLanguageMapping: (postJson) => dispatch(fetchGetLevelNameLanguageMapping(postJson)),
        lanuguageJsonUpdate: () => dispatch({ type: 'LANGUAGE_JSON_UPDATE' })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(StartingDashBord);
