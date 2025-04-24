import React from 'react';
import DoubleBoxOverlapWithImage from '../Component/Themes/DoubleBoxOverlapWithImage';
import ImageWithThinking from '../Component/Themes/ImageWithThinking';
import QuestionsList from '../Component/Themes/QuestionsList';
import ChooseCheckboxQuestions from '../Component/Themes/ChooseCheckboxQuestions';
import CircleWithInfoAnimations from '../Component/Themes/CircleWithInfoAnimations';
import PersonWithTextAnimation from '../Component/Themes/PersonWithTextAnimation';
import Success from "../Component/Themes/Success";
import IntroducePersons from '../Component/Themes/IntroducePersons';
import AudioQuizScreen from '../Component/Themes/AudioQuizScreen';
import DropToSelection from '../Component/Themes/DropToSelection';
import MeetSinglePerson from '../Component/Themes/MeetSinglePerson';
import StoryCardScreen from '../Component/Themes/StoryCardScreen';
import backImage from '../images/outlineBackIcon.png';
import nextImage from '../images/outlineRightIcon.png';
import MyConstant from '../config/MyConstant';
import { doConnect } from "../config/Common";
import { Link } from "react-router-dom";

export default class ModuleScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stage: 1,
            moduleJson: null
        }
    }
    componentDidMount() {
        this.getLevelMappingData(this.props.match.params.id)
        this.languagechangeTheme()
        localStorage.setItem('levelPoints', 0)
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
    changeStage = (action, currentStage) => {


        if (action === 'Next') {
            let { moduleJson } = this.state;
            let stages = moduleJson.stages;
            if (currentStage === stages.length) {

                console.log('Final stage');
                console.log('currentStage --> ' + currentStage);
                console.log('stages --> ' + stages.length);

                this.completeFinalStage();
            } else {
                this.setState({ stage: currentStage + 1 });
            }
        } else if (action === 'Previous') {
            if (currentStage === 1) {
                this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')
            } else {
                this.setState({ stage: currentStage - 1 });
            }
        }
    };

    async completeFinalStage() {
        const { levelIndex, progressingLevel, moduleJson } = this.state;

        if (progressingLevel === levelIndex) {

            let postJson = {
                userId: localStorage.getItem("loggedUserId"),
                levelId: this.props.match.params.id,
                levelPoints: 1,
                leveljson: JSON.stringify(moduleJson),
                levelNo: parseInt(progressingLevel) + 1,
                sessionId: "1232323"
            };
            await doConnect("updateLevelAttempt", "POST", postJson);
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')
        }
        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/home/')
    }

    async languagechangeTheme() {
        let postJson = {
            levelId: this.props.match.params.id,
            languageId: localStorage.getItem("currentLanguage"), sessionId: '1223'
        };

        let responseData = await doConnect("getModuleLanguageMapping", "POST", postJson);
        var json = responseData;
        var response = json.response;

        if (response) {
            let { moduleJson } = this.state;
            if (moduleJson) {
                moduleJson["stages"] = JSON.parse(response)
                this.setState({ moduleJson: moduleJson })
            }

        }
    }

    render() {

        let displayPage = this.state.moduleJson && this.state.moduleJson.stages.map((stage, index) => {
            let stageIndex = parseInt(index) + 1;
            if (this.state.stage === stageIndex) {
                let theme = stage.theme;

                console.log('theme', theme)
                switch (theme) {
                    case 'DoubleBoxOverlapWithImage':
                        return (
                            <DoubleBoxOverlapWithImage
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );
                    case 'ImageWithThinking':
                        return (
                            <ImageWithThinking
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );
                    case 'QuestionsList':
                        return (
                            <QuestionsList
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );
                    case 'ChooseCheckboxQuestions':
                        return (
                            <ChooseCheckboxQuestions
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );
                    case 'CircleWithInfoAnimations':
                        return (
                            <CircleWithInfoAnimations
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );


                    case 'IntroducePersons':
                        return (
                            <IntroducePersons
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );

                    case 'PersonWithTextAnimation':
                        return (
                            <PersonWithTextAnimation
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );


                    case 'DropToSelection':
                        return (
                            <DropToSelection
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );


                    case 'AudioQuizScreen':
                        return (
                            <AudioQuizScreen
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );




                    case 'Success':
                        return (
                            <Success
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );

                    case 'MeetSinglePerson':
                        return (
                            <MeetSinglePerson
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
                        );

                    case 'StoryCard':
                        return (
                            <StoryCardScreen
                                {...this.props}
                                changeStage={this.changeStage}
                                stage={this.state.stage}
                                key={stageIndex}
                                data={stage}
                            />
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
        return (
            <div className="mobile-responsive">
                {displayPage}
            </div>
        )
    }
}
