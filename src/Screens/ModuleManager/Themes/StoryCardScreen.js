import React from "react";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from "../../../config/MyConstant";
import { Style } from "react-style-tag";
import AudioQuizScreen from './AudioQuizScreen';
import DropToSelection from './DropToSelection';
import MeetSinglePerson from './MeetSinglePerson';


export default class StoryCardScreen extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            checkindex: 0,
        }
        this.changeindex = this.changeindex.bind(this)
    }

    changeindex = (Type, index) => {
        let { moduleJson, key, stage } = this.props;

        if (Type == "Next" && this.state.checkindex + 1 === moduleJson.stages[stage - 1].content.length) {
            //this.props.changeStage('Next',stage);
            this.props.changeScreen("Next", stage)

        } else if (Type == "Next") {
            this.setState({ checkindex: index + 1 })
        }
        else if (Type == "Previous") {
            this.setState({ checkindex: index - 1 })
        }

    }

    componentDidMount() {
        let { moduleJson, key, stage } = this.props;

        if (this.props.PreviousPages && this.state.checkindex == 0) {
            this.setState({ checkindex: moduleJson.stages[stage - 1].content.length - 1 })
        }
        window.scrollTo(0, 0);
    }

    render() {
        const { data, stage, key } = this.props;
        const { checkindex } = this.state
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        let arraypush = [];
        Object.keys(data.content).map((ival, index) => {
            if (data.content[index].theme == "MeetSinglePerson" && index == checkindex) {
                arraypush.push(
                    <div key={index.toString()}>
                        <MeetSinglePerson
                            {...this.props}
                            // changeStage={this.changeStage}
                            stage={index}
                            // key={stageIndex}
                            data={data.content[index]}
                            themeType={data.theme}
                            changeindex={this.changeindex}
                            parentindex={this.props.stage}
                            PercentageTotal={PercentageTotal}
                            trustPointText={trustPointText}
                            totalPoint={totalPoint}
                        />
                    </div>
                )
            }

            if (data.content[index].theme == "AudioQuizScreen" && index == checkindex) {

                arraypush.push(
                    <div key={index.toString()}>
                        <AudioQuizScreen
                            {...this.props}
                            // changeStage={this.changeStage}
                            stage={index}
                            // key={stageIndex}
                            data={data.content[index]}
                            themeType={data.theme}
                            changeindex={this.changeindex}
                            PercentageTotal={PercentageTotal}
                            trustPointText={trustPointText}
                            totalPoint={totalPoint}
                        />
                    </div>
                )


            }

            if (data.content[index].theme == "DropToSelection" && index == checkindex) {

                arraypush.push(
                    <div key={index.toString()}>
                        <DropToSelection
                            {...this.props}
                            // changeStage={this.changeStage}
                            stage={index}
                            // key={stageIndex}
                            data={data.content[index]}
                            themeType={data.theme}
                            changeindex={this.changeindex}
                            parentindex={this.props.stage}
                            PercentageTotal={PercentageTotal}
                            trustPointText={trustPointText}
                            totalPoint={totalPoint}
                        />
                    </div>
                )


            }

        });


        return (<React.Fragment>
            {/* {JSON.stringify(data.content)} */}
            {arraypush}
        </React.Fragment>)
    }

}