import React from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';
import { Link } from 'react-router-dom';

class DoubleBoxOverlapWithImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight,
            deviceWidth: window.innerWidth,
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        window.scrollTo(0, 0);
    }
    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
        deviceWidth: window.innerWidth,
    });
    render() {
        var { stage, data } = this.props;
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        let { deviceHeight } = this.state
        var content = data.content;
        var imagestyle = {};
        if (content.imagestyle)
            var imgstyle = content.imagestyle.split(',')
        if (imgstyle && imgstyle.length > 1) {
            imgstyle.map(ival => {
                var i = ival.split(':');
                if (i.length > 1) {
                    imagestyle[i[0]] = JSON.parse(i[1]);
                }
                return true
            })
        }

        var detectHorizontal = false
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {

        }
        else {
            detectHorizontal = true
            deviceHeight = 680
            var elements = document.getElementsByClassName('mobile-responsive'); // get all elements
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height = "680px"
            }

        }
        return (
            <React.Fragment>
                <Style>
                    {`
                    .center {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: '100%'; 
                      }
                    .pink {
                        width: 90%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 3px solid #18191F;
                        background-color:#FF89BB; 
                        border-radius:20px;
                        z-Index:2;
                      }
                      .yellow {
                        width: 86%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 3px solid #18191F;
                        background-color:#FFBD12; 
                        border-radius:20px;
                        z-Index:1;
                      }
                      `}
                </Style>
                <div className="module-content module-parent">
                    <div className="col-12">
                        <div className={"row " + (deviceHeight < 640 ? "pt-2 " : "pt-4")} >
                            <div className="col-2">
                                <Link to="#" onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                                </Link>
                            </div>
                            <div className="col-10" style={{ alignSelf: 'center' }}>
                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: deviceHeight / 10,
                    }}>
                        <div style={{
                            marginLeft: '5%',
                            marginRight: '5%',
                        }}>
                            <div className="pink" style={{ position: 'absolute', minHeight: deviceHeight / 2.1, backgroundColor: content.color }} >
                                <div className={`${content.nameClassName}`} dangerouslySetInnerHTML={{ __html: content.text }} />
                            </div>
                        </div>
                        <div style={{
                            marginLeft: '7%',
                            marginRight: '7%',
                        }}>
                            <div className="yellow" style={{ position: 'absolute', minHeight: deviceHeight / 2 }} >
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: deviceHeight < 570 ? "10%" : '17%', left: '5%', zIndex: 3 }} >
                        <img style={{ width: deviceHeight / 5, }} src={MyConstant.keyList.apiURL +
                            'vp?action=module&key=' +
                            content.image.fileName +
                            '&id=' +
                            content.image.fileType} alt={""} />
                    </div>
                </div>

                <div className="bottom-style">
                    <div style={{ textAlign: "right" }}>
                        <Link to="#" onClick={() => {
                            if (detectHorizontal) {
                                var elements = document.getElementsByClassName('mobile-responsive'); // get all elements
                                for (var i = 0; i < elements.length; i++) {
                                    elements[i].style.height = "auto"
                                }
                            }
                            this.props.changeStage('Next', stage)
                        }
                        }>
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


            </React.Fragment >
        )
    }
}

export default DoubleBoxOverlapWithImage
