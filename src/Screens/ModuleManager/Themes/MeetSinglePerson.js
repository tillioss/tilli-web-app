import React, { forwardRef } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';
import heart from '../../../images/heart.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class MeetSinglePerson extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight
        };
    }

    componentDidMount() {

        this.handleResize();
        window.addEventListener('resize', this.handleResize)

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
        let { stage, data, themeType } = this.props;
        let { deviceHeight } = this.state;
        let content = data.content;

        var imagePath = "";
        var getType = ""
        if (this.props.themeType === "StoryCard") {
            imagePath = MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.json.fileName + '&id=' + data.content.image.json.fileType
            getType = data.content.image.json.fileType
        }
        else {
            imagePath = MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.fileName + '&id=' + data.content.image.fileType
            getType = data.content.image.fileType
        }
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

            deviceHeight = 680
        }

        let { trustPointText, totalPoint, PercentageTotal } = this.props

        return (<React.Fragment>

            <Style>
                {`

.row
{
    margin-left:0px !important
}
`}
            </Style>
            <div className="module-parent-meet-single-person">
                <div className={"row"}
                    style={{ backgroundColor: content.color_1, height: deviceHeight > 750 ? "" : deviceHeight * 0.9 / (2.7) }}>
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className={"row ml-0  " + (deviceHeight < 640 ? "pt-2 " : "pt-4")}>

                            <div className="col-2">
                                <Link to="#" onClick={() => {

                                    let preStageData = this.props.moduleJson.stages[this.props.parentindex - 1]
                                    let preStageData_2 = this.props.moduleJson.stages[this.props.parentindex - 2]
                                                              
                                    //score point view condition 
                                    if (themeType === "StoryCard") {
                                        if (preStageData.theme === preStageData_2.theme) {
                                            this.props.changeScreen('Previous', this.props.parentindex)
                                        }
                                         else if (preStageData_2.theme === "Ask Age" || preStageData_2.theme === "Ask Gender") {
                                            this.props.changeScreen('Previous', this.props.parentindex)
                                        }
                                        else {
                                            this.props.changeStage('Previous', this.props.parentindex)
                                        }
                                    }
                                    else {
                                        if (preStageData.theme === preStageData_2.theme) {
                                            this.props.changeScreen('Previous', stage)
                                        }                                       
                                        else {
                                            this.props.changeStage('Previous', stage)
                                        }
                                    }
                                }}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} alt={""}/>
                                </Link>
                            </div>
                            <div className="col-8" style={{ alignSelf: 'center' }}>
                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-1" />
                        <div className="col-10" >
                            <div style={{
                                backgroundColor: content.color_2,
                                borderRadius: deviceHeight > 750 ? 230 / 2 : deviceHeight * 0.9 / (2.5) / 2,
                                width: deviceHeight > 750 ? 230 : deviceHeight * 0.9 / (2.5) / 2, height: deviceHeight > 750 ? 230 : deviceHeight * 0.9 / (2.5) / 2
                            }}>

                                <img
                                    className={`${content.imageclassname}`}
                                    src={imagePath}
                                    style={getType === "gif" ? { width: "100%", height: "auto", ...imagestyle } :
                                        deviceHeight < 750 ? { height: deviceHeight * 0.9 / (4.1) } :
                                            { width: "auto", height: 250, ...imagestyle }} alt={""}/>
                            </div>
                        </div>
                        <div className="col-1" />

                    </div>
                </div>



                <div className={deviceHeight > 800 ? "row mt-4" : deviceHeight > 700 ? "row mt-1" : "row"} style={{ paddingTop: 15 }}>
                    <div className="col-1" />
                    <div className="col-10" >
                        <p style={{

                        }}><div className="msp-header" dangerouslySetInnerHTML={{ __html: content.personName }} /></p>
                    </div>
                    <div className={deviceHeight > 800 ? "row mt-4" : deviceHeight > 700 ? "row mt-1" : "row"} >
                        <div className="col-sm-2" />
                        <div className="col-12 col-sm-8 col-xs-12 " >
                            <p style={{ textAlign: 'center', }}>
                                <div className="msp-body" dangerouslySetInnerHTML={{ __html: content.body }} />
                            </p>
                        </div>
                        <div className="col-sm-2" />

                        <div className={deviceHeight > 800 ? "row mt-2" : deviceHeight > 700 ? "row mt-1" : "row"} >
                            <div className="col-1" />
                            <div className="col-10" >
                                <p style={{}}>
                                    <div className="msp-question" dangerouslySetInnerHTML={{ __html: content.question }} />
                                </p>

                            </div>
                            <div className="col-1" />
                        </div>

                        <div className={deviceHeight > 800 ? "row mt-4" : deviceHeight > 700 ? "row " : "row"}  >
                            <div className="col-1" />
                            <div className="col-10" style={{ border: '2px solid #18191F', borderRadius: 16 }} >

                                <p className="row" style={{ fontSize: 20, fontWeight: "500", fontFamily: "montserrat-medium", paddingTop: 10 }}>

                                    <span className="col-2">  <img style={{ width: 22, height: 20 }} src={heart} alt={""}/> </span>
                                    <div className="col-8 msp-btmtxt" style={{ padding: 0, marginBottom: '-1rem' }} dangerouslySetInnerHTML={{ __html: content.bottomText }} onClick={() => {


                                        if (themeType === "StoryCard") {

                                            this.props.changeindex('Next', stage)
                                        }
                                        else {
                                            this.props.changeStage('Next', stage)
                                        }

                                    }} />

                                    <span className="col-2" style={{}} onClick={() => {


                                        if (themeType === "StoryCard") {

                                            this.props.changeindex('Next', stage)
                                        }
                                        else {
                                            this.props.changeStage('Next', stage)
                                        }

                                    }}>  <img style={{ width: 31, height: 31 }} src={nextImage} alt={""} /> </span>
                                </p>
                            </div>
                            <div className="col-1" />
                        </div>

                    </div>

                    <div className="col-2" />
                </div>
            </div>
            <div className="bottom-style">
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
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(MeetSinglePerson);

