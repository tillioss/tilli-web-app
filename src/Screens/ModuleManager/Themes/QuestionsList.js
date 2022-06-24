import React, { Component } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';

import qus_image_1 from '../../../images/qus_image_1.png';
import qus_image_2 from '../../../images/qus_image_2.png';
import Rocket_Launch from '../../../images/Rocket_Launch.gif';



class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionVisible: [], viewState: false,
            deviceHeight: window.innerHeight
        }
    }
    componentDidMount() {
        let { stage, data } = this.props;
        var questionVisible = this.state.questionVisible
        let content = data.content;
        console.log(content.questionList.length)
        content.questionList.map((quiz, index) => {
            setTimeout(async function () {
                questionVisible[index] = true


                await this.setState({ questionVisible: questionVisible })

                if (index + 1 == content.questionList.length) {
                    await this.setState({ viewState: true })
                }
            }.bind(this), 900 * (index))

        })
        this.handleResize();
        window.addEventListener('resize', this.handleResize)

        window.scrollTo(0, 0);
    }
    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });
    render() {
        let { stage, data } = this.props;
        let { deviceHeight } = this.state;
        let { trustPointText, totalPoint, PercentageTotal } = this.props

        let content = data.content;
        //console.log("content",content )

        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
        }
        else {

            deviceHeight = 680
        }
        return (
            <React.Fragment>
                <Style>
                    {`
                    .font-family{
                        font-family: 'Montserrat', sans-serif;
                    }
                      `}
                </Style>
                <div className="module-content module-parent">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className={"row ml-0 " + (deviceHeight < 640 ? "pt-2 " : "pt-4")}>
                            <div className="col-2">
                                <a onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} />
                                </a>
                            </div>
                            <div className="col-10">

                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-3" style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
                                <div style={{
                                    backgroundImage: `url(${qus_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: "contain",
                                    height: 36, width: 38, display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <img src={qus_image_2} style={{ width: 16, height: 23, }} />
                                </div>

                            </div>

                            <div className="col-9" style={{ textAlign: 'left', padding: 0 }}>


                                <div className={`${content.className} pl-2`} dangerouslySetInnerHTML={{ __html: content.questionTitle }} />
                            </div>
                        </div>

                        {content.questionList.map((quiz, index) => {
                            return (
                                <div key={index.toString()}
                                    className={`col-12 ${deviceHeight > 800 ? "mt-4" : deviceHeight > 700 ? "mt-3" : "mt-2"} `}
                                    style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={this.state.questionVisible[index] ? "questionDivShow" : "hide "} style={{
                                        borderRadius: 16, backgroundColor: quiz.color, borderStyle: 'solid', borderWidth: 1, padding: deviceHeight < 700 ? 4 : 10,
                                        width: 279, minHeight: "auto", borderColor: "white",
                                    }}>

                                        <div className={deviceHeight < 580 ? "pt-2 question-font" : ` question-font  ${quiz.className}`} dangerouslySetInnerHTML={{ __html: quiz.question }} />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="row mt-3">
                            <div className="col-9" />
                            <div className="col-3" style={{ padding: 0, textAlign: 'end', marginLeft: 0, marginRight: 0, paddingRight: '5%' }}>
                                {/* {this.state.viewState ?    <a onClick={() => this.props.changeStage('Next', stage)}>
                                    <img style={{ width: 44,height:44}} src={nextImage} />
                                </a> : null} */}


                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-style">
                    <div style={{ textAlign: "right" }}>
                        <a onClick={() => this.props.changeStage('Next', stage)}>
                            <img style={{ width: 44, height: 44 }} src={nextImage} />
                        </a>
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


            </React.Fragment>
        )
    }
}
export default QuestionsList;
