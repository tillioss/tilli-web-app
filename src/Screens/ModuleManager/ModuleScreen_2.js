import React from 'react';
import DoubleBoxOverlapWithImage from './Themes/DoubleBoxOverlapWithImage';
import ImageWithThinking from './Themes/ImageWithThinking';
import QuestionsList from './Themes/QuestionsList';
import ChooseCheckboxQuestions from './Themes/ChooseCheckboxQuestions';
import CircleWithInfoAnimations from './Themes/CircleWithInfoAnimations';
// import PersonWithTextAnimation from './Themes/PersonWithTextAnimation';
// import Success from "./Themes/Success";
import IntroducePersons from './Themes/IntroducePersons';
import AudioQuizScreen from './Themes/AudioQuizScreen';
import DropToSelection from './Themes/DropToSelection';
import MeetSinglePerson from './Themes/MeetSinglePerson';
import StoryCardScreen from './Themes/StoryCardScreen';
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from '../../config/MyConstant';
import { doConnect } from "../../config/Common";
import DoubleBoxUnderWithImage from './Themes/DoubleBoxUnderWithImage';
import SingleTextImage from './Themes/SingleTextImage';
import StartingDashBord from '../EndScreen/StartingDashBord';
import WinningPage2 from '../../TilliYourWinning/WinningPage2';
import { connect } from 'react-redux';
import { userTrack, date_YY_MM_DD } from '../../config/Common';
import AskGender from './Themes/AskGender';
import AskAge from './Themes/AskAge';
import ThemeViewer from './ThemeViewer';
import { Link } from "react-router-dom";


class ModuleScreen_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stage: 1,
            moduleJson: null,
            PreviousPages: false,
            viewScreen: true,
            scorePointsView: false,
            scoreCurrentStage: 0,
            attemptCount: 0,
            deviceHeight: window.innerHeight,

        }
        this.scorePointMove = this.scorePointMove.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.getLevelAttemptCount()
        this.getLevelMappingData(this.props.match.params.id)
        this.languagechangeTheme()
        userTrack("ModuleScreen", "Landing")

        localStorage.setItem('levelPoints', 0)
        localStorage.setItem('totalPoints', 0)
        this.setState({ levelIndex: this.props.match.params.levelIndex, progressingLevel: this.props.match.params.progressingLevel })
    }
    async getLevelMappingData(levelId) {
        let postJson = { levelId: levelId, sessionId: '1223' };
        let responseData = await doConnect("getLevelMappingData", "POST", postJson);
        var json = responseData;
        var response = JSON.parse(json.response);
        this.setState({
            moduleJson: {
                stages: response
            }
        })
    }
    changeStage = (action, currentStage, Type) => {

        if (action === 'Next') {
            let { moduleJson } = this.state;
            let stages = moduleJson.stages;
            let scoreBordScreen = false

            if (stages && stages[currentStage] && stages[currentStage].theme && stages[currentStage].theme === "StoryCard") {
                console.log("story next", currentStage, stages[currentStage])
                stages[currentStage].startTime = new Date().getTime()
                stages[currentStage].EndTIme = ""
            }

            if (!Type) {
                if (stages && stages[currentStage] && stages[currentStage].theme) {
                    if (stages[currentStage].theme === "Ask Age" || stages[currentStage].theme === "Ask Gender") {
                        currentStage = currentStage + 1
                    }
                }

            }

            if (Type && Type === "scorepoint") {
                scoreBordScreen = true
            }



            console.log("stage", currentStage)
            if (currentStage === stages.length) {
                console.log('Final stage');
                console.log('currentStage --> ' + currentStage);
                console.log('stages --> ' + stages.length);

                this.completeFinalStage();
            } else {
                if (scoreBordScreen) {
                    this.setState({ scorePointsView: scoreBordScreen })
                }
                else {
                    this.setState({ stage: currentStage + 1, PreviousPages: false });
                }
            }
        } else if (action === 'Previous') {
            console.log("log-->", currentStage)
            let { moduleJson } = this.state;
            let stages = moduleJson.stages;
            let scoreBordScreen = false
            if (!Type) {
                console.log("***", stages[currentStage])

            }


            if (currentStage === 1) {
                // navigation.navigate('Home');
                if (localStorage.getItem("loggedUserId")) {
                    this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')
                    // this.setState({ viewScreen: false })
                }
                else {
                    console.log("please logout")
                    // this.setState({ viewScreen: false })
                }
            } else {
                this.setState({ stage: currentStage - 1, PreviousPages: true, scorePointsView: scoreBordScreen });
            }
        }


    };


    completeFinalStage() {
        this.updateAttemptData()
        this.redirect_Page()
    }

    async updateAttemptData() {
        const { levelIndex, progressingLevel, moduleJson } = this.state;
        localStorage.removeItem(levelIndex + "_selectedData")
        let loginId = localStorage.getItem("loggedUserId") ? localStorage.getItem("loggedUserId") : localStorage.getItem("demoUserId")

        console.log("moduleJson -->time-->", moduleJson)
        var userpoint = 0
        this.state.moduleJson.stages && this.state.moduleJson.stages.map((ival, i) => {
            if (ival.theme === "StoryCard" && ival.storyPoints) {
                userpoint = userpoint + ival.storyPoints
            }
            return true
        })
        let convertDate = await date_YY_MM_DD(new Date().getTime())
        var deviceInfo = window.navigator.userAgent;
        var ipAddress = localStorage.getItem("ipAddress");
        var landingFrom = localStorage.getItem("landingFrom");
        let postJson = {
            userId: loginId,
            levelId: this.props.match.params.id,
            levelPoints: userpoint,
            leveljson: JSON.stringify(moduleJson),
            levelNo: parseInt(progressingLevel) + 1,
            sessionId: "1232323",
            attemptCount: this.state.attemptCount,
            ip: ipAddress ? ipAddress : "",
            deviceInfo: deviceInfo, userTime: new Date().getTime(),
            landingFrom: landingFrom ? landingFrom : "",
            dateString: convertDate,
        };

        console.log('updateAttempt-->', postJson)
        await doConnect("updateLevelAttempt", "POST", postJson);

    }

    redirect_Page() {

        console.log("loggedUserId", localStorage.getItem("loggedUserId"))
        console.log("demoUserId", localStorage.getItem("demoUserId"))
        if (localStorage.getItem("loggedUserId")) {
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')
        }
        else {
            //url wise condtion
            if (!localStorage.getItem("loggedUserId")) {
                this.state.moduleJson.stages.map((kval, k) => {
                    if (kval.theme === "StoryCard") {
                        delete kval.storyPoints
                    }
                    return true
                })
                this.setState({ scoreCurrentStage: 0, stage: 1, viewScreen: false, moduleJson: this.state.moduleJson })
            }
            else {
                console.log("logout normal login ")
            }



        }
    }

    async languagechangeTheme() {
        let postJson = {
            levelId: this.props.match.params.id,
            languageId: localStorage.getItem("currentLanguage"), sessionId: '1223'
        };
        console.log('postJson==>', postJson, localStorage.getItem("currentLanguage"))
        let responseData = await doConnect("getModuleLanguageMapping", "POST", postJson);
        var json = responseData;
        var response = json.response;
        if (response) {
            let { moduleJson } = this.state;
            if (moduleJson) {
                moduleJson["stages"] = JSON.parse(response)
                //console.log('responseData', this.state.moduleJson["stages"])
                this.setState({ moduleJson: moduleJson })
            }

        }

    }


    storyPoints(jindex, point) {

        let { moduleJson } = this.state
        if (!moduleJson.stages[jindex - 1].demoPage) {
            moduleJson.stages[jindex - 1].storyPoints = point
        }

        // console.log(moduleJson.stages[jindex - 1])
        // console.log("this", this.state.moduleJson.stages)
        // alert(point)
        this.setState({ moduleJson: moduleJson })
    }
    onPlayDash() {
        let { moduleJson } = this.state

        moduleJson.startTime = new Date().getTime()
        moduleJson.EndTIme = ""
        console.log("moduleJson time->", moduleJson)
        this.setState({ viewScreen: true, moduleJson })
    }

    async changeScreen(action, cstage) {

        let { moduleJson } = this.state
        let stages = moduleJson.stages;
        let scorePoint = true

        if (stages && stages[cstage] && stages[cstage].theme) {
            let findNextThemeIndex = cstage
            let getUserGender = await localStorage.getItem("userGender")
            let getUserAge = await localStorage.getItem("userAge")
            if (stages[findNextThemeIndex].theme === "Ask Age" || stages[findNextThemeIndex].theme === "Ask Gender") {
                console.log("getUserGender", getUserGender)
                console.log("getUserAge", getUserAge)
                if (action !== "Previous" && (getUserAge === "" || getUserGender === "")) {
                    scorePoint = false
                    this.changeStage("Next", cstage, true)
                }
                if (action === "Next") {
                    cstage = cstage + 1
                }
                else if (action === "Previous") {
                    // cstage = cstage - 1
                    scorePoint = true
                }

            }
            // console.log("stages[findNextThemeIndex]", stages[cstage])
            // console.log("stages[findNextThemeIndex]", stages[findNextThemeIndex])
        }
        await this.setState({ scoreCurrentStage: action === "Previous" ? cstage - 1 : cstage, scorePointsView: scorePoint })
        this.updateStatusBasedOnStory()
    }

    scorePointMove(arg) {
        let { scoreCurrentStage, attemptCount } = this.state
        let attemptCountInc = typeof arg === "undefined" ? attemptCount : attemptCount + 1
        console.log("attemptCountInc", arg, attemptCountInc);
        this.changeStage("Next", scoreCurrentStage)
        this.setState({
            scorePointsView: false,
            attemptCount: attemptCountInc
        })

    }

    async getLevelAttemptCount() {
        let loginId = localStorage.getItem("loggedUserId") ? localStorage.getItem("loggedUserId") : localStorage.getItem("demoUserId")
        let postJson = { userId: loginId, levelId: this.props.match.params.id };
        let responseData = await doConnect("getLevelAttemptCount", "POST", postJson);

        var json = responseData;
        //var response = JSON.parse(json.response);
        console.log("getLevelAttemptCount-->", json.response)
        this.setState({ attemptCount: json.response })
        this.getStoryBasedStatus()
    }

    async updateStatusBasedOnStory() {

        let loginId = localStorage.getItem("loggedUserId") ? localStorage.getItem("loggedUserId") : localStorage.getItem("demoUserId")

        let { moduleJson, progressingLevel } = this.state

        if (moduleJson.stages && moduleJson.stages[this.state.scoreCurrentStage - 1]) {
            moduleJson.stages[this.state.scoreCurrentStage - 1].EndTIme = new Date().getTime()
        }

        if (moduleJson.stages.length === this.state.scoreCurrentStage) {
            moduleJson.EndTIme = new Date().getTime()
        }

        let stroyJSon = {}
        stroyJSon.stroyJSon = moduleJson
        stroyJSon.nexstory = this.state.scoreCurrentStage
        stroyJSon.status = moduleJson.stages.length === this.state.scoreCurrentStage ? "Complete" : "Paused"
        stroyJSon.language = JSON.parse(localStorage.getItem("ChooseLanguage")) ? JSON.parse(localStorage.getItem("ChooseLanguage")) : { "label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517" }

        console.log("post stroyJSon", stroyJSon)
        //userId: String, levelId: String, attemptCount: Integer, statusJson:String,levelPoints: Integer, leveljson: String, levelNo: Integer,ip: String, deviceInfo: String, userTime: Long, landingFrom: String


        var userpoint = 0
        moduleJson.stages && this.state.moduleJson.stages.map((ival, i) => {
            if (ival.theme === "StoryCard" && ival.storyPoints) {
                userpoint = userpoint + ival.storyPoints
            }
            return true
        })

        var deviceInfo = window.navigator.userAgent;
        var ipAddress = localStorage.getItem("ipAddress");
        var landingFrom = localStorage.getItem("landingFrom");


        let postJson = {
            userId: loginId, levelId: this.props.match.params.id,
            attemptCount: this.state.attemptCount, statusJson: JSON.stringify(stroyJSon),
            levelPoints: userpoint, leveljson: JSON.stringify(moduleJson),
            levelNo: parseInt(progressingLevel) + 1, ip: ipAddress ? ipAddress : "",
            deviceInfo: deviceInfo ? deviceInfo : "", userTime: new Date().getTime(),
            landingFrom: landingFrom ? landingFrom : ""
        };
        console.log("postJson update*", postJson)
        let responseData = await doConnect("updateStatusBasedOnStory", "POST", postJson);
        console.log("responseData", responseData)

        if (moduleJson.stages.length === this.state.scoreCurrentStage) {
            console.log("**story is complete***")
            await this.updateAttemptData()
        }
    }

    async getStoryBasedStatus() {

        let loginId = localStorage.getItem("loggedUserId") ? localStorage.getItem("loggedUserId") : localStorage.getItem("demoUserId")
        let postJson = {
            userId: loginId, levelId: this.props.match.params.id,
            attemptCount: this.state.attemptCount,
        };

        let languageType = JSON.parse(localStorage.getItem("ChooseLanguage")) ? JSON.parse(localStorage.getItem("ChooseLanguage")) : { "label": "English", "value": "dbc995a7-0715-4c80-aeef-35f77e9fb517" }
        let responseData = await doConnect("getStoryBasedStatus", "POST", postJson);
        var json = responseData;
        if (json && json.response) {
            let responseData = JSON.parse(json.response)
            let dynamicTheme = false
            if (responseData.stroyJSon) {
                let findDynamic = responseData.stroyJSon.stages.filter((e) => { return e.themeType === "Dynamic" })
                if (findDynamic && findDynamic.length > 0) {
                    dynamicTheme = true
                }
            }

            if (!dynamicTheme) {
                if (responseData.status === "Paused" && responseData.language && responseData.language.label === languageType.label) {
                    this.setState({ moduleJson: responseData.stroyJSon, stage: responseData.nexstory + 1, scorePointsView: true, scoreCurrentStage: responseData.nexstory, viewScreen: true, loading: false })
                }
                else {
                    this.setState({ loading: false })
                }
            } else {
                this.setState({ loading: false })
            }


        } else {
            this.setState({ loading: false })
        }


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




    async updateUserDetailsInfo(postdata) {
        var postJson = postdata;
        let responseData = await doConnect("updateUserDetails", "POST", postJson);
        console.log("responseData", responseData)
    }

    previousScorePagefun(type, index) {
        this.setState({ scorePointsView: true, })
    }
    render() {
        let { viewScreen, scorePointsView, scoreCurrentStage } = this.state
        var horizontalScreen = ""
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
            horizontalScreen = ""
        }
        else {
            horizontalScreen = "horizontal"
        }

        let languageChoose = JSON.parse(localStorage.getItem("ChooseLanguage"))

        let changeLang = ""
        if (languageChoose) {
            if (languageChoose.label === "Tamil") {
                changeLang = "tamil"
            }
            else if (languageChoose.label === "Sinhala") {
                changeLang = "singala"
            }

        }

        var classNameForDevice = "mobile-responsive " + changeLang + " " + horizontalScreen
        if (window.navigator.appVersion.toLowerCase().includes("iphone")) {
            classNameForDevice = "mobile-responsive-ios " + changeLang + " " + horizontalScreen
        }

        let storyCount = 0
        let totalPoint = 0
        let PercentageTotal = 0

        if (this.state.moduleJson) {
            console.log(this.state.moduleJson.stages)
            this.state.moduleJson.stages.map((kval, k) => {
                if (kval.theme === "StoryCard") {
                    storyCount = storyCount + 1
                }

                if (kval.storyPoints) {
                    totalPoint = totalPoint + kval.storyPoints
                }
                return false
            })
        }

        let trustPointText = this.return_content(1, 3)

        let displayPage = this.state.moduleJson && this.state.moduleJson.stages.map((stage, index) => {
            let stageIndex = parseInt(index) + 1;
            if (this.state.stage === stageIndex) {
                let theme = stage.theme;
                console.log('theme', theme,)
                let total = totalPoint / parseInt(storyCount * 200)
                // console.log("total", total)
                PercentageTotal = total.toString().substring(0, 5) * 100
                // console.log("PercentageTotal", PreTotal)
                let progressDiv = ""
                // let progressDiv=""
                let themeType = stage.themeType;

                switch (themeType) {
                    case 'Dynamic':
                        return (
                            <div className='app-content' key={index.toString()}>
                                <ThemeViewer
                                    layersData={stage.layers}
                                    navigation={this.props.history}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                />
                            </div>
                        );
                    default:
                }

                switch (theme) {
                    case 'DoubleBoxOverlapWithImage':
                        return (
                            <div key={index.toString()}>
                                <DoubleBoxOverlapWithImage
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );

                    case 'DoubleBoxUnderWithImage':
                        return (
                            <div key={index.toString()}>
                                <DoubleBoxUnderWithImage
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                />

                                {progressDiv}
                            </div>
                        );
                    case 'ImageWithThinking':
                        return (
                            <div key={index.toString()}>
                                <ImageWithThinking
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );
                    case 'QuestionsList':
                        return (
                            <div key={index.toString()}>
                                <QuestionsList
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );
                    case 'ChooseCheckboxQuestions':
                        return (
                            <div key={index.toString()}>
                                <ChooseCheckboxQuestions
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );
                    case 'CircleWithInfoAnimations':
                        return (
                            <div key={index.toString()}>
                                <CircleWithInfoAnimations
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );


                    case 'IntroducePersons':
                        return (
                            <div key={index.toString()}>
                                <IntroducePersons
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );

                    //         case 'PersonWithTextAnimation':
                    //         return (
                    //             <PersonWithTextAnimation
                    //             {...this.props}
                    //             changeStage={this.changeStage}
                    //             stage={this.state.stage}
                    //             key={stageIndex}
                    //             data={stage}
                    //             />
                    //         );


                    case 'DropToSelection':
                        return (
                            <div key={index.toString()}>
                                <DropToSelection
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    changeindex={() => {
                                        this.changeStage('Next', this.state.stage);
                                    }}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />

                                {progressDiv}
                            </div>
                        );


                    case 'AudioQuizScreen':
                        return (
                            <div key={index.toString()}>
                                <AudioQuizScreen
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                                {progressDiv}
                            </div>
                        );




                    // case 'Success':
                    //     return (
                    //         <Success
                    //             {...this.props}
                    //             changeStage={this.changeStage}
                    //             stage={this.state.stage}
                    //             key={stageIndex}
                    //             data={stage}
                    //         />
                    //     );

                    case 'MeetSinglePerson':
                        return (
                            <div key={index.toString()}>
                                <MeetSinglePerson
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                                {progressDiv}
                            </div>
                        );

                    case 'StoryCard':
                        return (
                            <div key={index.toString()}>
                                <StoryCardScreen
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    moduleJson={this.state.moduleJson}
                                    PreviousPages={this.state.PreviousPages}
                                    storyPoints={(jindex, point) => { this.storyPoints(jindex, point) }}
                                    changeScreen={(action, cstage) => { this.changeScreen(action, cstage) }}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}

                                />
                                {progressDiv}
                            </div>
                        );
                    // return null;

                    case 'SingleTextImage':
                        return (
                            <div key={index.toString()}>
                                <SingleTextImage
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    moduleJson={this.state.moduleJson}
                                    PreviousPages={this.state.PreviousPages}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                />
                            </div>
                        );


                    case 'Ask Gender':
                        return (
                            <div key={index.toString()}>
                                <AskGender
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    moduleJson={this.state.moduleJson}
                                    PreviousPages={this.state.PreviousPages}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                    updateUserDetailsInfo={(post) => { this.updateUserDetailsInfo(post) }}
                                    previousScorePage={(typeValue, stage_Index) => { this.previousScorePagefun(typeValue, stage_Index) }}
                                />
                            </div>
                        );

                    case 'Ask Age':
                        return (
                            <div key={index.toString()}>
                                <AskAge
                                    {...this.props}
                                    changeStage={this.changeStage}
                                    stage={this.state.stage}
                                    key={stageIndex}
                                    data={stage}
                                    moduleJson={this.state.moduleJson}
                                    PreviousPages={this.state.PreviousPages}
                                    PercentageTotal={PercentageTotal}
                                    trustPointText={trustPointText}
                                    totalPoint={totalPoint}
                                    updateUserDetailsInfo={(post) => { this.updateUserDetailsInfo(post) }}
                                    previousScorePage={(typeValue, stage_Index) => { this.previousScorePagefun(typeValue, stage_Index) }}
                                />
                            </div>
                        );

                    default:
                        return (<React.Fragment>{theme}

                            (<React.Fragment>{theme}

                                <div style={{ position: 'absolute', bottom: window.innerHeight / 15, right: '5%', zIndex: 3 }} >
                                    <Link onClick={() => this.changeStage('Next', this.state.stage)}>
                                        <img style={{ width: window.innerHeight / 15 }} src={nextImage} alt={""} />
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <Link onClick={() => this.changeStage('Previous', this.state.stage)}>
                                        <img style={{ width: window.innerHeight / 10 }} src={backImage} alt={""} />
                                    </Link>
                                </div>
                            </React.Fragment>

                        </React.Fragment>)

                }
            }
            return true
        });

        if (this.state.loading) {
            return (<>
                <div className="loader center-loader"></div>
            </>)
        }
        else {
            if (scorePointsView) {
                return (<div className={classNameForDevice}>
                    <WinningPage2 PercentageTotal={PercentageTotal} totalPoint={totalPoint} scoreCurrentStage={scoreCurrentStage} scorePointMove={this.scorePointMove}
                        moduleJson={this.state.moduleJson}
                    />
                </div>)
            }
            if (viewScreen) {
                return (
                    <div className={classNameForDevice}>
                        {displayPage}
                    </div>
                )
            }

            if (!viewScreen) {
                return (
                    <>
                        {this.state.moduleJson ?
                            <div className={classNameForDevice} style={{ backgroundColor: "rgb(255, 189, 18)" }}>
                                <StartingDashBord onPlayDash={() => this.onPlayDash()}
                                    lanuguageJsonUpdate={() => {
                                        this.languagechangeTheme()
                                    }} />
                            </div>
                            : null}
                    </>)
            }


        }
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

export {ModuleScreen_2};
export default connect(mapStateToProps, mapDispatchToProps)(ModuleScreen_2);
