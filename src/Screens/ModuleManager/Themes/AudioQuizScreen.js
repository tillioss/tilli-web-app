import React, { useEffect } from "react";
import backImage from '../../../images/fillIconOnly.png';
import nextImage from '../../../images/outlineRightIcon.png';
import repeatImage from '../../../images/repeat.png';
import outlineIconOnlyImage from '../../../images/outlineIconOnly.png';
import outlineIconRedImage from '../../../images/outlineIconRed.png';
import nounVoiceRecordImage from '../../../images/nounVoiceRecord.png';
import people_set from '../../../images/people_set.png';
import down_black from '../../../images/down_black.png';
import MyConstant from '../../../config/MyConstant';
import { connect } from 'react-redux';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Link } from 'react-router-dom';

var SupportedBrowser = !SpeechRecognition.browserSupportsSpeechRecognition()


const AudioRecognize1 = ({ data, index_value, deviceHeight, imagePath, viewType, bg_color, matchString, detectHorizontal, return_content, returnButtonContent, resetInput, onTranscriptChange }) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    useEffect(() => {
        if (transcript !== "") {
            data.content.feelingsDataList[index_value].results = transcript
            onTranscriptChange(data);
        }
    }, [transcript, data, index_value, onTranscriptChange]);

    useEffect(() => {
        resetTranscript()
    }, [index_value, data, resetTranscript]);
    return (
        <React.Fragment>
            <div
                className={"row " + (deviceHeight < 640 ? "pt-2 " : "pt-4")}>
                <div className="col-2" />
                <div className="col-3 pl-1" style={{ marginTop: "auto" }}>
                    <img
                        className={`${data.content.imageclassname} audio-img`}
                        src={imagePath}
                        style={{}} alt={""} />
                </div>

                {viewType === "answer" || viewType === "onrecord" ?
                    <React.Fragment>
                        <div className={"col-7"} style={{ display: "flex", marginTop: "auto" }}>
                            <div className={"record-font pl-1"} dangerouslySetInnerHTML={{ __html: data.content.feelingsDataList[index_value].questions.replace('strong', 'span') }} />
                        </div>

                    </React.Fragment>
                    : null}

                <div className="col-11 audio-scroll" style={{
                    height: deviceHeight > 750 ? 230 : deviceHeight * 0.9 / (2.7),
                    width: 327,
                    marginLeft: 32,
                    marginRight: 16,
                    backgroundColor: data.content.changeColorBox ? data.content.changeColorBox : bg_color,
                    borderWidth: 2,
                    borderColor: '#18191F',
                    boxSizing: 'border-box',
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center', borderStyle: 'solid',
                    display: bg_color === '#FFBD12' ? 'flex' : "inline-block",
                }}>
                    {viewType === 'question' ?

                        <p className={"audio-font " + (matchString ? "lego-font" : "")}  >
                            <div dangerouslySetInnerHTML={{ __html: data.content.feelingsDataList[index_value].questions }} /></p> :
                        <React.Fragment>
                            <div className="row ml-0 audio-scroll" style={{
                                height: 150, width: "100%",
                                padding: "25px 0px 25px 0px "
                            }}>


                                {!SupportedBrowser ?
                                    <p className="Speakdiv" id={'Speak'} >
                                        {data.content.feelingsDataList[index_value].results}
                                    </p> : null}


                            </div>
                        </React.Fragment>
                    }

                </div>
                <div className="col-1"> </div>
            </div>


            <div className="row">
                <div className="col-10"> </div>
                <div className="col-2">
                </div>
            </div>


            {viewType === 'question' ?
                <React.Fragment>
                    {SupportedBrowser ? <div className="record-text" style={{ color: "red", fontSize: 14 }}>
                        {return_content(1, 4)}
                    </div> : <div className="record-text">
                        {return_content(1, 2)}
                    </div>}

                    <div className="row  mt-2 mb-2" >
                        <div className="col-3" />
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <img src={down_black} style={{ width: 30, height: 15 }} alt={""} />
                        </div>
                        <div className="col-3" />
                    </div>

                </React.Fragment>
                : null}
            <div className="row">
                <div className="col-3" />

                {returnButtonContent(detectHorizontal)}

                <div className="col-3 pt-2" >
                    {viewType === 'answer' ?
                        <div className="col-2" onClick={
                            (e) => {
                            data.content.feelingsDataList[index_value].results = "";
                            resetTranscript();
                            resetInput(data)}
                        }>
                            <img className="repeat-img" src={repeatImage} style={{ width: 42, height: 40 }} alt={""}  />
                        </div>

                        : null}
                </div>
            </div>

        </React.Fragment>

    )

}

class AudioQuizScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index_value: 0, Viewstate: false, bg_color: "#FFBD12",
            pitchArray: [-0.31999993324279785, 1, 1.4800000190734863, 1.7200000286102295, 2.440000057220459, 0.16000008583068848, 2.8000001907348633, 3.0399999618530273, 4.600000381469727, 4.4800004959106445],
            checkstate: "SpeechRecognition.startListening", commonPageData: false,
            deviceHeight: window.innerHeight,
            devicewidth: window.innerWidth,
            viewType: "question"

        }
        this.return_content = this.return_content.bind(this);
        this.returnButtonContent = this.returnButtonContent.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.onTranscriptChange = this.onTranscriptChange.bind(this);
    }

    
    componentDidMount() {

        this.handleResize();
        window.addEventListener('resize', this.handleResize)
        window.scrollTo(0, 0);

        if (!SupportedBrowser) {
            var btn = document.querySelector('#onSpeaking');
            if (btn) {
                var that = this
                btn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.onStartRecord()
                })

                btn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.onStopRecord()

                })
                btn.addEventListener('touchleave', function () {
                    console.log('btn moving end');
                })
                btn.addEventListener('touchcancel', function () {
                    console.log('btn moving cancel');
                })
            }
        }

    }

    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
        devicewidth: window.innerWidth,
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

    async changeInnerIndex() {
        let { data, stage } = this.props
        let { index_value } = this.state

        let copyhtmlQuestion = data.content.feelingsDataList[index_value].questions
        var plainText = copyhtmlQuestion.replace(/<[^>]*>/g, '');
        plainText = plainText.replace(/^\s+|\s+$/gm, '');
        data.content.feelingsDataList[index_value].questionText = plainText

        if (data.content.feelingsDataList.length !== index_value + 1) {
            
            this.setState({ index_value: index_value + 1, bg_color: "#FFBD12", viewType: "question" })
        }
        else if (data.content.feelingsDataList.length === index_value + 1) {
            await this.setState({ Viewstate: true })

            if (this.props.themeType === "StoryCard") {
                this.props.changeindex('Next', stage)
            }
            else {
                this.props.changeStage('Next', stage)
            }
        }

    }


    onStartRecord() {
        if (!SupportedBrowser) {
            console.log("onstart.");
            let languageChoose = JSON.parse(localStorage.getItem("ChooseLanguage"))
            let changeLang = "en"
            if (languageChoose) {
                if (languageChoose.label === "Tamil") {
                    changeLang = "ta"
                }
                else if (languageChoose.label === "English") {
                    changeLang = "en"
                }
                else if (languageChoose.label === "Sinhala") {
                    changeLang = "si"
                }

            }

            SpeechRecognition.startListening({
                language: changeLang
                , continuous: true,
            })
        }
        this.setState({ viewType: "onrecord" })
    }

    
    async onStopRecord() {
        if (!SupportedBrowser) {
            SpeechRecognition.stopListening({ continuous: false })
            console.log("onstop")
        }

        this.setState({ viewType: "answer" })
    }

    bgColorChg() {
        let { viewType } = this.state
        if (viewType === 'answer') {
            this.setState({ bg_color: '#FFBD12' })
        }
        else {
            this.setState({ bg_color: '#FF89BB' })
        }
    }

    
    enableEventListener() {
        console.log("event listener")
        if (!SupportedBrowser) {
            var btn = document.querySelector('#onSpeaking');
            if (btn) {
                var that = this
                btn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.onStartRecord()
                })

                btn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.onStopRecord()

                })
                btn.addEventListener('touchleave', function () {
                    console.log('btn moving end');
                })
                btn.addEventListener('touchcancel', function () {
                    console.log('btn moving cancel');
                })
            }
        }
    }

    
    returnButtonContent(detectHorizontal) {
        let { viewType, deviceHeight } = this.state
        if (!SupportedBrowser) {
            return (<div className="col-6" style={{ textAlign: 'center' }}
                onClick={() => {
                    if (viewType === "question") {
                        this.setState({ viewType: "answer" }, () => {
                            this.enableEventListener()
                        })
                        this.bgColorChg()
                    }
                }}
            >

                {viewType === 'question' ?
                    <React.Fragment>
                        <div className="audiospeak-img" >
                            <Link to="#" className="col-2" onClick={() => {
                                if (detectHorizontal) {
                                    window.scrollTo(0, 0);
                                }
                            }}>
                                <img src={outlineIconOnlyImage} style={{ width: 60, height: 60 }} alt={""} />
                                <img src={nounVoiceRecordImage} style={{ width: 47, height: 42, position: "absolute", bottom: -10, left: 22 }} alt={""} />

                            </Link>
                        </div>
                    </React.Fragment> :
                    <React.Fragment>

                        <div className="audiospeak-img" style={{ marginTop: "27%" }} id="onSpeaking"

                            onMouseDown={(e) => {
                                this.onStartRecord()
                            }} onMouseUp={() => { this.onStopRecord() }}

                            onClick={async () => {
                            }} > <p style={{ fontSize: deviceHeight < 570 ? 10 : 12 }}>{this.return_content(1, 7)}</p>

                            <Link to="#" className="col-2">
                                <img src={viewType === 'answer' ? outlineIconOnlyImage : outlineIconRedImage} style={{ width: 60, height: 60, }} alt={""} />
                                <img src={nounVoiceRecordImage} style={{ width: 47, height: 42, position: "absolute", bottom: -10, left: 22 }} alt={""} />
                            </Link>
                        </div>

                    </React.Fragment>}
            </div>)
        }
        else {
            return (<div className="col-6" style={{ textAlign: 'center' }}
                id="onSpeaking" onClick={() => {
                    if (viewType === "question") {
                        this.setState({ viewType: "answer" })
                        this.bgColorChg()
                    }
                }} >

                {viewType === 'question' ?
                    <React.Fragment>
                        <div  >
                            <Link to="#" className="col-2" onClick={() => {
                                if (detectHorizontal) {
                                    window.scrollTo(0, 0);
                                }

                            }}>
                                <button className="btn btn-warning" style={{ background: "gainsboro", border: "gainsboro", width: "75%", fontWeight: 700, fontFamily: 'montserrat-medium', }}> {this.return_content(1, 5)} </button>
                            </Link>
                        </div>
                    </React.Fragment> :
                    <React.Fragment>

                        <div style={{ marginTop: "14%" }} onClick={async () => {
                            this.setState({ viewType: "question" })
                            this.bgColorChg()

                        }} >
                            <Link to="#" className="col-2">
                                <button className="btn btn-warning" style={{ background: "gainsboro", border: "gainsboro", width: "85%", fontWeight: 700, fontFamily: 'montserrat-medium', }} >{this.return_content(1, 6)}</button>
                            </Link>
                        </div>

                    </React.Fragment>}
            </div>)
        }
    }

    onTranscriptChange(data) {
        this.setState({ data })
    }

    resetInput(data) {
        
        this.setState({ data })
    }
    render() {
        const { stage, data } = this.props
        const { index_value, bg_color } = this.state;
        let { deviceHeight, viewType } = this.state
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        // console.log(data)
        let matchString = window.location.href.match(/lego/)

        var detectHorizontal = false
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {

        }
        else {

            deviceHeight = 680
            detectHorizontal = true
        }


        var imagePath = ""
        if (this.props.themeType === "StoryCard") {
            
            if (data.content.image) {
                imagePath = MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.json.fileName + '&id=' + data.content.image.json.fileType
            }
            else {
                imagePath = people_set
            }
        }
        
        else {
            if (data.content.image) {
                
                imagePath = MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.fileName + '&id=' + data.content.image.fileType
            } else {
                imagePath = people_set
            }
        }
        let imagestyle = {};
        
        if (data.content.imagestyle)
            var imgstyle = data.content.imagestyle.split(',')

        
        if (imgstyle && imgstyle.length > 1) {
            imgstyle.map(ival => {
                let i = ival.split(':');
                if (i.length > 1) {
                    imagestyle[i[0]] = JSON.parse(i[1]);
                }
                return true
            })
        }

        var BroswerNotSupported = <>
            <div className={"row " + (deviceHeight < 640 ? "pt-2 " : "pt-4")}>
                <div className="col-2" />
                <div className="col-3 pl-1" style={{ marginTop: "auto" }}>
                    <img
                        className={`${data.content.imageclassname} audio-img`}
                        src={imagePath}
                        alt={""} />
                </div>

                {viewType === "answer" || viewType === "onrecord" ?
                    <React.Fragment>
                        <div className={"col-7"} style={{ display: "flex", marginTop: "auto" }}>
                            <div className={"record-font pl-1"} dangerouslySetInnerHTML={{ __html: data.content.feelingsDataList[index_value].questions.replace('strong', 'span') }} />
                        </div>

                    </React.Fragment>
                    : null}

                <div className="col-11 audio-scroll" style={{
                    height: deviceHeight > 750 ? 230 : deviceHeight * 0.9 / (2.7),
                    width: 327,
                    marginLeft: 32,
                    marginRight: 16,
                    backgroundColor: data.content.changeColorBox ? data.content.changeColorBox : bg_color,
                    borderWidth: 2,
                    borderColor: '#18191F',
                    boxSizing: 'border-box',
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center', borderStyle: 'solid',
                    display: bg_color === '#FFBD12' ? 'flex' : "inline-block",
                }}>

                    {viewType === 'question' ?
                        <p className={"audio-font " + (matchString ? "lego-font" : "")}  >
                            <div dangerouslySetInnerHTML={{ __html: data.content.feelingsDataList[index_value].questions }} /></p> :
                        <React.Fragment>
                            <div className="row ml-0 audio-scroll" style={{height: 150, width: "100%", padding: "25px 0px 25px 0px "}}>
                                <div className="row ml-0">
                                    <div className="col-12 col-sm-12">
                                        <textarea style={{ width: "100%" }} className="rectextType" rows="3"
                                            value={data.content.feelingsDataList[index_value].results} onChange={
                                                
                                                (e) => {
                                                data.content.feelingsDataList[index_value].results = e.target.value;
                                                this.setState({ data })
                                               }
                                               } />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }

                </div>
                <div className="col-1"> </div>
            </div>

            <div className="row">
                <div className="col-10"> </div>
                <div className="col-2">
                </div>
            </div>


            {viewType === 'question' ?
                <React.Fragment>
                    {SupportedBrowser ? <div className="record-text" style={{ color: "red", fontSize: 14 }}>
                        {this.return_content(1, 4)}
                    </div> : <div className="record-text">
                        {this.return_content(1, 2)}
                    </div>}

                    <div className="row  mt-2 mb-2" >
                        <div className="col-3" />
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <img src={down_black} style={{ width: 30, height: 15 }} alt={""} />
                        </div>
                        <div className="col-3" />
                    </div>

                </React.Fragment>
                : null}
            <div className="row">
                <div className="col-3" />
                {this.returnButtonContent(detectHorizontal)}
                <div className="col-3 pt-2" >
                    {viewType === 'answer' ?
                        <div className="col-2" onClick={(e) => {
                            data.content.feelingsDataList[index_value].results = "";
                            this.setState({ data, })
                        }}>
                            <img className="repeat-img" src={repeatImage} style={{ width: 42, height: 40 }} alt={""} data-testid="repeat"/>
                        </div>

                        : null}
                </div>
            </div>
        </>

        
        return (<div>
            <div className="module-parent-audio-screen">
                <div className="row ml-0 mt-4" >
                    <div className="col-2">
                        {this.props.themeType === "StoryCard" ?
                            <Link to="#"
                                onClick={() => {
                                    SpeechRecognition.stopListening({ continuous: false });
                                    this.props.changeindex('Previous', stage)
                                }}>
                                <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                            </Link>
                            :
                            <Link to="#" onClick={() => {
                                SpeechRecognition.stopListening({ continuous: false });
                                this.props.changeStage('Previous', stage)
                            }}>
                                <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                            </Link>}

                    </div>
                    <div className="col-8" style={{ alignSelf: 'center' }}> <h4 style={{
                        fontFamily: 'montserrat-extrabold', fontWeight: "800",
                        textAlign: 'center',
                    }}>  <div dangerouslySetInnerHTML={{ __html: data.title }} />
                    </h4> </div>
                    <div className="col-2">  </div>
                </div>

                <div style={{ marginTop: '0px' }}>
                    {/* condition writting not supported record ** mozila fire box app text area type not supported   */}
                    {SupportedBrowser ? <>
                        {BroswerNotSupported}
                    </> : <>
                        <AudioRecognize1 datavalue={this.props.data} data={data} index_value={index_value} deviceHeight={deviceHeight} imagePath={imagePath} viewType={viewType} bg_color={bg_color} matchString={matchString} detectHorizontal={detectHorizontal} return_content={this.return_content} returnButtonContent={this.returnButtonContent} resetInput={this.resetInput} onTranscriptChange={this.onTranscriptChange} />
                    </>}

                </div>


            </div>

            <div className="bottom-style ">

                <div style={{ position: "absolute", right: 10, bottom: 60 }}>

                    {this.state.Viewstate ?
                        <React.Fragment>
                            {this.props.themeType === "StoryCard" ?
                                <Link to="#" onClick={() => {
                                    SpeechRecognition.stopListening({ continuous: false });
                                    this.props.changeindex('Next', stage)

                                }} >
                                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                                </Link>
                                : <Link to="#" onClick={() => {
                                    SpeechRecognition.stopListening({ continuous: false })
                                    this.props.changeStage('Next', stage)
                                }} >
                                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                                </Link>}

                        </React.Fragment>
                        : null}

                    {!this.state.Viewstate ?
                        <React.Fragment>
                            {this.props.themeType === "StoryCard" ?
                                <Link to="#" onClick={() => {
                                    SpeechRecognition.stopListening({ continuous: false });
                                    this.changeInnerIndex()
                                    if (detectHorizontal) {
                                        window.scrollTo(0, 0);
                                    }

                                }} >
                                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} data-testid="next"/>
                                </Link>
                                : <Link to="#" onClick={() => {
                                    SpeechRecognition.stopListening({ continuous: false });
                                    this.changeInnerIndex()
                                }} >
                                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} data-testid="next"/>
                                </Link>
                            }

                        </React.Fragment>
                        : null}

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


        </div>)
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
export default connect(mapStateToProps, mapDispatchToProps)(AudioQuizScreen);