import React, { } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import spashes1 from '../../../images/spashes1.png';
import PeopleIcons4 from '../../../images/PeopleIcons4.png';
import nextImage from '../../../images/outlineRightIcon.png';
import { Link } from 'react-router-dom';


class ImageWithThinking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight,
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        window.scrollTo(0, 0);
    }

    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });

    render() {
        let { stage, data } = this.props;
        let { trustPointText, totalPoint, PercentageTotal } = this.props
        let { deviceHeight } = this.state
        let content = data.content;
        let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
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
            innerWidth = 380
            deviceHeight = 680
        }
        let imageinnerwidth = innerWidth / 1.8
        let imageinnerheight = innerWidth / 1.8
        let imgheight = innerWidth / 1.6
        let imgtextboxheight = 200
        let boxpadding = '10% 10% 20%'
        if (deviceHeight >= 800 && deviceHeight <= 850) {
            imageinnerwidth = innerWidth / 1.4
            imageinnerheight = innerWidth / 1.4
            imgheight = innerWidth / 1.3
            imgtextboxheight = 280
            boxpadding = '21% 10% 20%'
            console.log("true", deviceHeight)

        }
        else {
            console.log("false", deviceHeight)
        }

        if (window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")) {
            imageinnerwidth = innerWidth / 2.1
            imageinnerheight = innerWidth / 2.1
            imgheight = innerWidth / 1.9
        }

        return (
            <React.Fragment>
                <Style>
                    {`
                      `}
                </Style>
                <div className="module-content module-parent">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className= {"row ml-0 "+( deviceHeight < 640  ? "pt-2 ": "pt-4") }>
                            <div className="col-2">
                                <Link onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} alt={""}/>
                                </Link>
                            </div>
                            <div className="col-10" style={{ alignSelf: 'center' }}>

                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </div>
                        </div>
                        <div className="row  mx-0" style={{ marginTop: 20 }}>
                            <div className="offset-2 col-10" style={{ backgroundImage: `url(${spashes1})`, minHeight: imgtextboxheight, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', }}>
                                <div style={{ padding: boxpadding }}>
                                    <div className="imgttext" dangerouslySetInnerHTML={{ __html: content.text }} />
                                </div>
                            </div>

                        </div>
                        <div className="row mx-0">
                            <div style={{ backgroundColor: '#FFC7DE', borderRadius: innerWidth / 1.8, width: imageinnerwidth, height: imageinnerheight, borderStyle: 'solid', marginLeft: '5%' }}>
                                <img className={`${content.imageclassname}`} style={{ width: imgheight, ...imagestyle }} src={PeopleIcons4} alt={""} />
                            </div>


                        </div>
                    </div>
                </div>


                <div className="bottom-style">
                    <div style={{ textAlign: "right" }}>
                        <Link onClick={() => this.props.changeStage('Next', stage)}>
                            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""}/>
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
export default ImageWithThinking
