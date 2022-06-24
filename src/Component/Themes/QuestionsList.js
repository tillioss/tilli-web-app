import React, { Component } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';

import qus_image_1 from '../../images/qus_image_1.png';
import qus_image_2 from '../../images/qus_image_2.png';


class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionVisible: [], viewState: false
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
            }.bind(this), 1200 * (index))

        })


    }
    render() {
        let { stage, data } = this.props;
        let content = data.content;
        //console.log("content",content )
        return (
            <React.Fragment>
                <Style>
                    {`
                    .font-family{
                        font-family: 'Montserrat', sans-serif;
                    }
                      `}
                </Style>
                <div className="module-content">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className="row mt-4 ml-0 ">
                            <div className="col-2">
                                <a onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} />
                                </a>
                            </div>
                            <div className="col-10">
                                <p style={{
                                    //color: '#474A57',
                                    fontSize: 27,
                                    fontFamily: 'montserrat-extrabold',
                                    fontWeight: '800',
                                    alignSelf: 'center',
                                }}>
                                    {data.title}

                                </p>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-3" style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
                                <div style={{
                                    backgroundImage: `url(${qus_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: "contain",
                                    height: 36, width: 38,display: 'flex', justifyContent: 'center',alignItems:'center'
                                }} >
                                    <img src={qus_image_2} style={{ width: 16, height: 23, }} />
                                </div>

                            </div>

                            <div className="col-9" style={{ textAlign: 'left',padding:0 }}>

                                <p style={{
                                    color: '#221E1F',
                                    fontSize: 17,
                                    fontFamily: 'montserrat-medium',
                                    lineHeight: 1.0, fontWeight: 600, color: '#221E1F',marginTop:0, paddingLeft: 10
                                }}>
                                    {content.questionTitle}

                                </p>
                            </div>
                        </div>

                        {content.questionList.map((quiz, index) => {
                            return (
                                <div className="col-12 mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={this.state.questionVisible[index] ? "questionDivShow" : "hide "} style={{
                                        borderRadius: 16, backgroundColor: quiz.color, borderStyle: 'solid', borderWidth: 1, paddingLeft: 10, paddingRight: 10,
                                        width: 279, minHeight: 100, borderColor: "white",
                                    }}>
                                        <p className="font-20-18" style={{
                                            color: '#000000',
                                            fontFamily: 'montserrat-medium',
                                            textAlign: 'center',
                                            fontWeight: 400,
                                            margin: 0, paddingLeft: 10, minHeight: '100%', alignItems: 'center',
                                            display: 'flex', justifyContent: 'center'
                                        }}>
                                            {quiz.question}
                                        </p>
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
                <div className="forward-step">
                    {this.state.viewState ? <a onClick={() => this.props.changeStage('Next', stage)}>
                        <img style={{ width: 44, height: 44 }} src={nextImage} />
                    </a> : null}
                </div>
            </React.Fragment>
        )
    }
}
export default QuestionsList;
