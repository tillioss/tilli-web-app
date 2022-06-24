import React from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';

class DoubleBoxUnderWithImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight,
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }
    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });
    render() {
        let { stage, data } = this.props;
        let { deviceHeight } = this.state
        let content = data.content;
        // console.log(content);
        let checkingImage = Object.keys(content.image).length
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
                        <div className={"row ml-0  "+( deviceHeight < 640  ? "pt-2 ": "pt-4") }>
                            <div className="col-2">
                                <a onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} />
                                </a>
                            </div>
                            <div className="col-10" style={{ alignSelf: 'center' }}>
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
                    </div>

                    {checkingImage != 0 ?
                        <div className="row" style={{ marginTop: 0, }}>
                            <div className="col-3" />
                            <div className="col-6 text-center" style={{ display: "flex", }}>
                                <img style={{ width: 227, height: 233 }} src={MyConstant.keyList.apiURL +
                                    'vp?action=module&key=' +
                                    content.image.fileName +
                                    '&id=' +
                                    content.image.fileType} />
                            </div>
                            <div className="col-3" />
                        </div>
                        :

                        <div className="row" style={{ marginTop: 0, }}>
                            <div className="col-3" />
                            <div className="col-6 text-center" style={{ width: 227, height: 233 }}>

                            </div>
                            <div className="col-3" />
                        </div>
                    }

                    <div style={{}}>
                        <div style={{ marginLeft: '5%', marginRight: '5%', }}>
                            <div className="pink"
                                style={{
                                    position: 'absolute', minHeight: window.innerHeight / 3.5,
                                    backgroundColor: content.boxBgColor_1
                                }} >
                                <p className=""
                                    style={{
                                        //color: '#474A57',
                                        fontFamily: 'montserrat-medium',
                                        fontWeight: '400',
                                        margin: 0, paddingLeft: 5, paddingRight: 5, textAlign: 'center',
                                        fontFamily: 14, lineHeight: 1.5,

                                    }}>
                                    {content.text}
                                </p>
                            </div>
                        </div>
                        <div style={{
                            marginLeft: '7%',
                            marginRight: '7%',
                        }}>
                            <div className="yellow"
                                style={{
                                    position: 'absolute', minHeight: window.innerHeight / 3.4,
                                    backgroundColor: content.boxBgColor_2
                                }} >
                            </div>
                        </div>
                    </div>

                </div>
                <div className="forward-step" style={{position:"absolute",bottom: deviceHeight - deviceHeight + 50, }}>
                    <a onClick={() => this.props.changeStage('Next', stage)}>
                        <img style={{ width: 44, height: 44 }} src={nextImage} />
                    </a>
                </div>
            </React.Fragment >
        )
    }
}

export default DoubleBoxUnderWithImage
