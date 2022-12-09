import React from "react";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from "../../../config/MyConstant";
import { Style } from "react-style-tag";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class IntroducePersons extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            commonPageData: false,
            deviceHeight: window.innerHeight
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
    render() {

        let { stage, data } = this.props;
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")
        const {deviceHeight } = this.state
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


        var horizontalScreen = false
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
        }
        else {

            horizontalScreen = true
        }

        let languageChoose = JSON.parse(localStorage.getItem("ChooseLanguage"))

        let changeLang = ""
        if (languageChoose) {
            if (languageChoose.label === "Tamil") {
                changeLang = "tamilintro"
            }

        }

        // console.log('content', content);
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
                        <Link onClick={() => this.props.changeStage('Previous', stage)}>
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

                {content.persons.map((ival, index) => {
                    return (<div key={index.toString()}>
                        <div className="row"
                            style={{ marginTop: UWPview ? '65px' : horizontalScreen ? "7%" : deviceHeight > 800 ? 80 : deviceHeight < 570 ? 18 : 20, marginBottom: UWPview ? '95px' : '' }}>
                            <div className="col-4 " style={{
                                backgroundColor: ival.imageBg,
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                                marginLeft: 50,
                                position: 'absolute',
                            }}>
                                <img className={`${content.imageclassname} intro-img`} src={MyConstant.keyList.apiURL +
                                    'vp?action=module&key=' +
                                    ival.image.fileName +
                                    '&id=' +
                                    ival.image.fileType} style={{ ...imagestyle }} alt={""}/>

                            </div>

                            <div className="col-8" style={{
                                paddingLeft: '8%', backgroundColor: ival.bg, marginLeft: 104, borderRadius: 20
                                , paddingBottom: 20, paddingTop: 15
                            }}>
                                <p className='ml-4 mb-0'>
                                    <div className={`${ival.nameClassName}` | "intro-header"} dangerouslySetInnerHTML={{ __html: ival.name }} />
                                </p>

                                <p className="says-content" style={{}}>
                                    <div className="intro-saystext" dangerouslySetInnerHTML={{ __html: ival.says }} />  </p>

                            </div>
                        </div>

                    </div>
                    )
                })}

            </div>
            <div className={"bottom-style " + changeLang}>
                <div style={{ textAlign: "right" }}>
                    <Link onClick={() => this.props.changeStage('Next', stage)}>
                        <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                    </Link>
                </div>
                <div className="progress-div">
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
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(IntroducePersons);

