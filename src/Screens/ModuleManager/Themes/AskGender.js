import React from "react";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from "../../../config/MyConstant";
import { Style } from "react-style-tag";
import { connect } from 'react-redux';
import down_black from '../../../images/down_black.png';
import { Link } from 'react-router-dom';


class AskGender extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commonPageData: false,
            deviceHeight: window.innerHeight,
            chooseGender: "",
            errorText: ""
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        window.scrollTo(0, 0);

    }

    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });

    return_content(pageIndex, index) {
        const { commonGroupLanguageMappingData, commonGroupLanguageBaseData } = this.props
        if (commonGroupLanguageMappingData && commonGroupLanguageMappingData[pageIndex] && commonGroupLanguageMappingData[pageIndex].fieldData[index]) {
            return commonGroupLanguageMappingData[pageIndex].fieldData[index].value
        }
        else if (commonGroupLanguageBaseData && commonGroupLanguageBaseData[pageIndex] && commonGroupLanguageBaseData[pageIndex].fieldData[index]) {
            return commonGroupLanguageBaseData[pageIndex].fieldData[index].value
        }
        else
            return ""
    }

    updateDetails_Info(type) {
        //userId: String, age: String, gender: String
        let UserId = ""
        if (localStorage.getItem("demoUserId")) {
            UserId = localStorage.getItem("demoUserId")
        }
        else if (localStorage.getItem("loggedUserId")) {
            UserId = localStorage.getItem("loggedUserId")
        }

        var getLanuguage = localStorage.getItem("ChooseLanguage")
        var languageName = ""
        if (getLanuguage) {
            getLanuguage = JSON.parse(getLanuguage)
            languageName = getLanuguage.label.toLowerCase()
        }
        localStorage.setItem("userGender", type)
        let postJson = { userId: UserId, age: "", gender: type, language: languageName }
        console.log(postJson)
        this.props.updateUserDetailsInfo(postJson)

    }

    choose_Gender(type) {
        this.setState({ chooseGender: type, errorText: "" })
    }
    render() {

        let { stage, data } = this.props;
        // let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")
        const { deviceHeight } = this.state
        let { chooseGender, errorText } = this.state
        let content = data.content;
        let imagestyle = {};
        if (content.imagestyle)
            var imgstyle = content.imagestyle.split(',')
        if (imgstyle && imgstyle.length > 1) {
            imgstyle.map(ival => {
                let i = ival.split(':');
                if (i.length > 1) {
                    imagestyle[i[0]] = JSON.parse(i[1]);
                }
                return true
            })
        }

        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
        }
        else {

        }

        let languageChoose = JSON.parse(localStorage.getItem("ChooseLanguage"))

        let changeLang = ""
        if (languageChoose) {
            if (languageChoose.label === "Tamil") {
                changeLang = "tamilintro"
            }
        }
        let imagePath = ""
        if (data.content.image) {
            imagePath = MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.fileName + '&id=' + data.content.image.fileType
        }

        // console.log('content', content);

        let row_Array = []
        let testIndex = 0
        let columnArray = []
        let i = ""
        for (i = 5; i <= 12; i++) {
            testIndex++
            // console.log("*", i, "-->", testIndex)
            columnArray.push(<div className="col-sm-2 mt-3">
                <div className="box-sizing" style={{ width: 55, height: 56, border: "2px solid #18191F", borderRadius: 16, backgroundColor: "#FFBD12", }}>
                    <p style={{ marginTop: "20%", fontWeight: "800", fontFamily: "Montserrat", fontSize: 16, color: "#000000" }}>{i}</p>
                </div>
            </div>)
            if (testIndex === 4) {
                testIndex = 0
                row_Array.push(<div className="row  mt-2 mb-2" >
                    <div className="col-sm-2"></div>
                    {columnArray}
                    {/* <div className="col-sm-1"></div> */}
                </div >)
                columnArray = []
            }
        }


        return (<React.Fragment>
            <Style>
                {`
                    .font-family{
                        font-family: 'Montserrat', sans-serif;
                    }
                      `}
            </Style>
            <div className="module-parent">
                <div className={"row ml-0 " + (deviceHeight < 640 ? "pt-2 " : "pt-4")}>
                    <div className="col-2">
                        <Link to="#" onClick={() => {
                            // this.props.previousScorePage('Previous', stage,)
                            if (chooseGender) {
                            }
                            else {
                                this.setState({ errorText: "Please Choose Gender" })
                            }
                        }}>
                            <img style={{ width: 48, height: 48 }} src={backImage} alt={""}/>
                        </Link>
                    </div>
                    <div className="col-10">
                        <p style={{
                            // color: '#474A57',
                            alignSelf: 'center',
                        }}>
                            <div className="intro-header" dangerouslySetInnerHTML={{ __html: data.title }} />
                        </p>
                    </div>
                </div>


                <div className="row ml-0 askGender-divHeight" style={{ height: 400 }}>
                    <div className="col-sm-2 col-3" style={{ width: 219, height: 142 }} >
                        <img className="img-size-askGender" style={{ width: 220, height: 420 }} src={imagePath} alt={""}/>
                    </div>
                    <div className="col-sm-8 col-8" style={{ backgroundColor: "#15CED5", width: "auto", height: 133, position: "inherit", borderRadius: 10, marginTop: "8%", paddingTop: "7%" }}>
                        <div dangerouslySetInnerHTML={{ __html: content.question }}></div>
                    </div>
                    <div className="col-sm-2 col-1" ></div>
                </div>


                <div dangerouslySetInnerHTML={{ __html: content.question_2 }}></div>

                <div className="row  mt-2 mb-2" >
                    <div className="col-3" />
                    <div className="col-6" style={{ textAlign: 'center' }}>
                        <img src={down_black} style={{ width: 30, height: 15 }} alt={""} />
                    </div>
                    <div className="col-3" />
                </div>

                {/* <div className="row  mt-2 mb-2" >
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <div className="box-sizing" style={{ width: 55, height: 56, border: "2px solid #18191F", borderRadius: 16, backgroundColor: "#FFBD12", }}>
                            <p style={{ marginTop: "20%" }}>5</p>
                        </div>
                    </div>                
                    <div className="col-sm-1"></div>
                </div> */}
                {/* {row_Array} */}
                {/* */}
                <div className="row  mt-4 ml-0" >
                    <div className="col-sm-4  col-3 "></div>
                    <div className={"col-sm-4   col-6 " + content.chooseType_1_ClassName} style={{ backgroundColor: "#FFBD12", borderRadius: 16, borderWidth: 2, borderColor: chooseGender === "female" ? "#DC143C" : "black", borderStyle: "solid", cursor: "pointer" }} onClick={() => {
                        this.choose_Gender("female")
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: content.chooseType_1 }}></div>
                    </div>
                    <div className="col-sm-4  col-3 "></div>
                </div>

                <div className="row  mt-4 ml-0" >
                    <div className="col-sm-4  col-3"></div>
                    <div className={"col-sm-4  col-6 " + content.chooseType_2_ClassName} style={{ backgroundColor: "#FFBD12", borderRadius: 16, borderWidth: 2, borderColor: chooseGender === "male" ? "#DC143C" : "black", borderStyle: "solid", cursor: "pointer" }} onClick={() => {
                        this.choose_Gender("male")
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: content.chooseType_2 }}></div>
                    </div>
                    <div className="col-sm-4  col-3 "></div>
                </div>


                <div className="row  mt-4 ml-0" >
                    <div className="col-sm-4 col-3"></div>
                    <div className={"col-sm-4 col-6 " + content.chooseType_3_ClassName} style={{ backgroundColor: "#FFBD12", borderRadius: 16, borderWidth: 2, borderColor: chooseGender === "tell_me_later" ? "#DC143C" : "black", borderStyle: "solid", cursor: "pointer" }} onClick={() => {
                        this.choose_Gender("tell_me_later")
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: content.chooseType_3 }}></div>
                    </div>
                    <div className="col-sm-4 col-3 "></div>
                </div>
                <p className="font-family pt-3" style={{ color: "red", fontSize: 12 }}>{errorText}</p>
            </div>
            <div className={"bottom-style " + changeLang}>
                <div style={{ textAlign: "right" }}>
                    <Link  to="#" onClick={() => {
                        if (chooseGender) {
                            this.updateDetails_Info(chooseGender)
                            this.props.changeStage('Next', stage, "scorepoint")
                        }
                        else {
                            this.setState({ errorText: "Please Choose Gender" })
                        }

                    }}>
                        <img style={{ width: 44, height: 44 }} src={nextImage} alt={""}/>
                    </Link>
                </div>
                {/* <div className="progress-div">
                    <div style={{ flex: 1 }} >
                        {trustPointText} {totalPoint}
                    </div>
                </div>
                <div>
                    <div className="progress  barDesign">
                        <div className="progress-bar"
                            role="progressbar" style={{
                                width: PercentageTotal + "%", backgroundColor: "#FFBD12",
                                border: totalPoint ? "1px solid #18191F" : ""
                            }} aria-valuenow={PercentageTotal} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div> */}
            </div>
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {

        commonGroupLanguageMappingData: state.languageReducer.commonGroupLanguageMappingData,
        commonGroupLanguageBaseData: state.languageReducer.commonGroupLanguageBaseData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AskGender);

