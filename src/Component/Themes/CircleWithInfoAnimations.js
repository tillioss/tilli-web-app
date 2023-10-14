import React from 'react';
import { Style } from "react-style-tag";
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from '../../config/MyConstant';
import image_4 from '../../images/image_4.png';
import image_5 from '../../images/image_5.png';
import image_7 from '../../images/image_7.png';
import { Link } from "react-router-dom";

class CircleWithInfoAnimations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: [],
            selectColor_1: "",
            selectColor_2: "",
            selectColor_3: "",
            passIndex: [{ index: 1 }, { index: 2 }, { index: 3 }],
            currentIndex: 0,
            marginLeft_content: 50,
            showIcon: true,
            ImageView: false
        };
    }

    componentDidMount() {
        for (var i = 0; i < 1; i++) {
            setTimeout(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 })
            }, 1000 * (i + 1));
        }
    }

    render() {
        const { stage, data } = this.props;
        let content = data.content;
        let textList = content.text.map((text, index) => {
            return (
                <div
                    key={index}
                    style={{
                        color: '#474A57',
                        fontSize: 27,
                        fontFamily: 'montserrat-bold',
                        fontWeight: 800,
                        textAlign: 'left',
                        marginLeft: this.state.marginLeft_content,
                        ...text.style,
                        lineHeight: 1.1
                    }}
                >
                    {text.value}
                </div>
            );
        });

        let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
        return (
            <React.Fragment>
                <Style>
                    {`
                    
                      `}
                </Style>
                <div className="module-content">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className="row mt-4 ml-0">
                            <div className="col-2">
                                <Link to="#" onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                                </Link>
                            </div>
                            <div className="col-10">
                                <p style={{
                                    fontSize: 27,
                                    fontFamily: 'montserrat-extrabold',
                                    fontWeight: '800',
                                    alignSelf: 'center',
                                }}>
                                    {data.title}
                                </p>
                            </div>
                        </div>
                        {textList}

                        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>

                        </div>

                    </div>
                    <div
                        style={{ backgroundColor: content.circles[2].color, height: innerWidth * 0.9, width: '90%', margin: '5%', borderRadius: 100000 }}
                        onClick={() => { }}>
                        <div className="row" style={{ height: innerWidth * 0.9, margin: 0 }}>
                            <div className="col-9" style={{
                                display: 'inline-grid',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <div style={{ marginTop: '1%', backgroundColor: content.circles[1].color, height: innerWidth * 0.9 / (1.3), width: innerWidth * 0.9 / (1.3), borderRadius: 100000 }}>
                                    <div className="row" style={{ height: innerWidth * 0.9, margin: 0 }}>
                                        <div className="col-5" style={{
                                            display: 'contents',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 0,
                                            padding: 0
                                        }}>
                                            <div style={{ marginTop: '21%', backgroundColor: content.circles[0].color, height: innerWidth * 0.9 / (1.5 * 1.5), width: innerWidth * 0.9 / (1.5 * 1.5), borderRadius: 100000 }}>

                                                {this.state.currentIndex === 1 ?
                                                    <div style={{ paddingTop: '25%' }} className={"questionDivShow"} >
                                                        <img src={image_4} style={{ width: 50, height: 40, marginBottom: 8 }} alt={""} />
                                                        <div style={{ margin: "0px 10px 0px 10px" }}
                                                            onClick={() => {
                                                                this.setState({selectColor_1:'white',selectColor_2:"",selectColor_3:''})
                                                            }}>
                                                            <span style={{ backgroundColor: this.state.selectColor_1, fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium' }}> {content.circles[0].name}</span>
                                                        </div>
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="col-1"></div>
                                        <div className="col-5" style={{ fontSize: 8, display: 'inline', marginBottom: '100%', marginLeft: "48%", marginTop: '-33%' }}>
                                            {this.state.currentIndex === 1 ?
                                                <React.Fragment>
                                                    <img src={image_7} style={{ width: 40, height: 40, marginBottom: 10, marginLeft: 30, marginTop: -30 }} alt={""} />
                                                    <div className="row col-12" style={{ margin: "0px 10px 0px 25px", paddingLeft: 0, whiteSpace: 'nowrap' }}>
                                                        <span style={{ backgroundColor: this.state.selectColor_2, color: "white", fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium' }}>  {content.circles[1].name}  </span>
                                                    </div>
                                                </React.Fragment>
                                                : null}
                                        </div>
                                        {this.state.ImageView === 1 && this.state.showIcon ?
                                            <Link onClick={() => this.setState({ showIcon: false })} style={{ zIndex: 2 }}>
                                                <div style={{ backgroundColor: '#ADD8E6', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15, marginTop: -240, marginLeft: 150, width: 147, height: 148, }}>
                                                    <div style={{ backgroundImage: `url(${MyConstant.keyList.apiURL + 'vp?action=module&key=' + content.image.fileName + '&id=' + content.image.fileType})`, width: 147, height: 148, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
                                                        <p style={{ backgroundColor: '#FFF', borderRadius: 10, marginLeft: 125, textAlign: 'center' }}>
                                                            <i className="fa fa-times" aria-hidden="true"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                            : null}
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '38%' }} className="col-3">
                                {this.state.currentIndex === 1 ?
                                    <React.Fragment>
                                        <img src={image_5} style={{ width: 40, height: 40, marginBottom: 10 }} alt={""} />
                                        <div style={{ width: '100%', whiteSpace: 'nowrap' }}>
                                            <span style={{ backgroundColor: this.state.selectColor_3, color: 'white', fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium' }}>  {content.circles[2].name}  </span>
                                        </div>
                                    </React.Fragment>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-9" />
                        <div className="col-3" style={{ marginTop: window.innerHeight / 13, padding: 0, textAlign: 'end', marginLeft: 0, marginRight: 0, paddingRight: '5%' }}>
                            {this.state.currentIndex === 1 ?
                                <Link onClick={() => {
                                    if (this.state.ImageView) {
                                        this.props.changeStage('Next', stage)
                                    }
                                    this.setState({ ImageView: true })
                                }}>
                                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                                </Link> : null}
                        </div>
                    </div>
                </div>
                <div className="forward-step">
                    {this.state.currentIndex === 1 ?
                        <Link onClick={() => {
                            if (this.state.ImageView) {
                                this.props.changeStage('Next', stage)
                            }
                            this.setState({ ImageView: true })
                        }}>
                            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                        </Link> : null}
                </div>
            </React.Fragment>
        );
    }
}
export default CircleWithInfoAnimations;
