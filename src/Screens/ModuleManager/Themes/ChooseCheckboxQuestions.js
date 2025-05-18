import React, { } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import questionIcon from '../../../images/questionIcon.png';
import tickMarkIcon from '../../../images/tickMarkIcon.png';
import { Link } from 'react-router-dom';


class ChooseCheckboxQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: [],
            deviceHeight: window.innerHeight
        };
    }


    componentDidMount() {

        window.addEventListener('resize', this.handleResize)
        const { match } = this.props
        let levelIndex = match.params.levelIndex;

        if (localStorage.getItem(levelIndex + '_selectedData')) {
            console.log(localStorage.getItem(levelIndex + '_selectedData'))
            this.setState({ selectedData: JSON.parse(localStorage.getItem(levelIndex + '_selectedData')) })

        }
        window.scrollTo(0, 0);
    }

    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });
    
    /* istanbul ignore next */
    pushData(data) {
        let selectedData = this.state.selectedData;

        if (selectedData.length > 0 && selectedData.includes(data)) {
            let index = selectedData.indexOf(data);
            if (index !== -1) {
                selectedData.splice(index, 1);
            }
        } else {
            selectedData.push(data);
        }
        this.setState({ selectedData });
    }

    checkedData() {


        const { match } = this.props
        let levelIndex = match.params.levelIndex;

        if (this.state.selectedData.length > 0) {
            localStorage.removeItem(levelIndex + '_selectedData');
            localStorage.setItem(levelIndex + '_selectedData', JSON.stringify(this.state.selectedData));
            console.log(JSON.parse(localStorage.getItem(levelIndex + '_selectedData')))
        }

    }
    render() {
        const { stage, data } = this.props;
        let { deviceHeight } = this.state;
        let content = data.content;
        let selectedData = this.state.selectedData;
        let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        let checkBoxes = content.checkBoxesOption.map((checkBox, index) => {
            let exist = 0;
            if (selectedData.length > 0 && selectedData.includes(checkBox.content)) {
                exist = 1;
            }
            return (
                <div className="col-6 box-margin" style={{ margin: 0, padding: 0, paddingLeft: 10, marginTop: UWPview ? '65px' : '10px', }} key={index}>
                    <Link to="#" onClick={() => this.pushData(checkBox.content)}>
                        <div style={{
                            backgroundColor: exist
                                ? content.colors.checked
                                : content.colors.unChecked,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderStyle: 'solid',
                            width: 34,
                            height: 36,
                            position: 'absolute',
                            left: 20,
                            top: 0,
                        }}>
                            {exist ? (
                                <img
                                    src={tickMarkIcon}
                                    style={{ width: 28, height: 23 }}
                                    resizeMode={'contain'}
                                    alt={""}
                                />
                            ) : null}
                        </div>
                    </Link>
                    <div className="box_width" style={{
                        backgroundColor: exist ? content.colors.box : checkBox.bgcolor, borderRadius: 16, borderWidth: 2, borderStyle: 'solid', marginLeft: 22, marginTop: 20
                        , display: 'flex', alignItems: 'center'
                        , paddingLeft: 10, paddingRight: 10
                    }}>
                        <p style={{ marginTop: 10, marginBottom: 0, fontSize: 16, fontFamily: 'montserrat-medium', lineHeight: 1.0, fontWeight: 400 }}>
                            <div dangerouslySetInnerHTML={{ __html: checkBox.content }} />
                        </p>
                    </div>
                </div>
            );
        });
        return (<React.Fragment>
            <Style>
                {`

  .box_width{
    width: 150px; min-height: 150px;
   }


   @media only screen and (max-width: 600px) {
    .box_width{
        width: 140px; min-height: 140px;
       }
    }
      
       @media only screen and (max-height: 570px) {
        .box_width{
            min-height: 120px !important;
           }
        }
     

                      `}
            </Style>
            <div className="module-content module-parent">
                <div className="col-12" style={{ margin: 0, padding: 0 }}>
                    <div className= {"row ml-0 "+( deviceHeight < 640  ? "pt-2 ": "pt-4") } >
                        <div className="col-2">
                            <Link to="#" onClick={() => {
                                this.checkedData()
                                this.props.changeStage('Previous', stage)
                            }}>
                                <img style={{ width: 48, height: 48 }} src={backImage} alt={""} data-testid="back"/>
                            </Link>
                        </div>
                        <div className="col-10">
                            <p style={{
                                alignSelf: 'center',
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'left', paddingLeft: 15 }}>
                        <img style={{ width: 50, marginLeft: 10 }} src={questionIcon} alt={""}/>
                    </div>
                    <div className={(window.innerWidth < 330 ? "mt-2" : " mt-4")} >
                        <p style={{
                            textAlign: 'start',
                            padding: 0,
                            marginBottom: 0, lineHeight: 1.1, paddingLeft: 24, paddingRight: 10
                        }}>
                            <div className="question-title" dangerouslySetInnerHTML={{ __html: content.questionTitle }} />
                        </p>
                    </div>
                    <div className="row" style={{ paddingLeft: UWPview ? '100px' : window.innerWidth < 330 ? 0 : 15, paddingRight: window.innerWidth < 330 ? 0 : 40, }}>
                        {checkBoxes}
                    </div>
                </div>
               
            </div>

            <div className="bottom-style">
                <div style={{ textAlign: "right" }}>
                    <Link to="#" onClick={() => this.props.changeStage('Next', stage)}>
                        <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} data-testid="next"/>
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
        </React.Fragment>
        )
    }
}
export default ChooseCheckboxQuestions
