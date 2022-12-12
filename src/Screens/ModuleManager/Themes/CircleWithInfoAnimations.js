import React, {} from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';
import image_4 from '../../../images/image_4.png';
import image_5 from '../../../images/image_5.png';
import image_7 from '../../../images/image_7.png';
import { Link } from 'react-router-dom';


class CircleWithInfoAnimations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: [], selectColor_1: "", selectColor_2: "", selectColor_3: "",
            passIndex: [{ index: 1 }, { index: 2 }, { index: 3 }], currentIndex: 0,
            marginLeft_content: 50,
            showIcon: true, ImageView: false,
            deviceHeight: window.innerHeight,
            deviceWidth: window.innerWidth
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        for (var i = 0; i < 1; i++) {
            setTimeout(function () {
                this.setState({ currentIndex: this.state.currentIndex + 1 })
            }.bind(this), 500 * (i + 1))
        }
        window.scrollTo(0, 0);
    }
    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
        deviceWidth: window.innerWidth
    });
    render() {
        const { stage, data } = this.props;

        let { deviceHeight, deviceWidth } = this.state
        let content = data.content;
        let UWPidentity = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")
        let textList = content.text.map((text, index) => {
            return (
                <div className="circle-text-top"
                    key={index}
                    style={
                        {
                            textAlign: 'left',
                            marginLeft: this.state.marginLeft_content,
                            ...text.style, lineHeight: 1.1
                        }}>
                    <div dangerouslySetInnerHTML={{ __html: text.value }} />
                </div>
            );
        });

        let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
        //  console.log('innerWidth',innerWidth);

        let Orientation = false
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
        }
        else {
            deviceHeight = 640
            innerWidth = 360
            Orientation = true
            deviceWidth = 360
        }
        let { trustPointText, totalPoint, PercentageTotal } = this.props

        return (<React.Fragment>
            <Style>
                {`
                    
                      `}
            </Style>


            <div className="module-content module-parent">
                <div className="col-12" style={{ margin: 0, padding: 0 }}>
                    <div className={this.state.deviceHeight < 750 ? "row mt-3 ml-0" : "row mt-4 ml-0"}>
                        <div className="col-2">
                            <Link onClick={() => this.props.changeStage('Previous', stage)}>
                                <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                            </Link>
                        </div>
                        <div className="col-10">
                            {/* <p style={{
                                //color: '#474A57',
                                fontSize: 27,
                                fontFamily: 'montserrat-extrabold',
                                fontWeight: '800',
                                alignSelf: 'center',
                            }}>
                                {data.title}
                                
                            </p> */}
                            <div dangerouslySetInnerHTML={{ __html: data.title }} />
                        </div>
                    </div>
                    <div className={this.state.deviceHeight < 750 ? "mt-2" : "mt-3"}>
                        {textList}
                    </div>
                </div>

                <div style={{
                    backgroundColor: content.circles[2].color,
                    width: Orientation ? innerWidth * 0.9 : UWPidentity ? '60%' : '90%',
                    borderRadius: 100000, marginLeft: Orientation ? "24%" : UWPidentity ? '17%' : '4%', marginRight: "4%",
                    marginTop: deviceWidth > 645 ? deviceWidth - deviceWidth - 70 : UWPidentity ? '6%' : '', height: UWPidentity ? innerWidth * 0.6 : innerWidth * 0.9,
                }}
                    onClick={() => { }}>
                    <div className="row circle-margin" style={{ height: innerWidth * 0.9, margin: 0 }}>
                        <div className="col-9" style={{
                            display: 'inline-grid',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{ backgroundColor: content.circles[1].color, borderRadius: 100000, height: UWPidentity ? innerWidth * 0.9 / (2.0) : innerWidth * 0.9 / (1.3), width: UWPidentity ? innerWidth * 0.9 / (2.0) : innerWidth * 0.9 / (1.3), marginTop: UWPidentity ? '-220px' : '1%', }}>
                                <div className="row" style={{ height: innerWidth * 0.9, margin: 0 }}>
                                    <div className="col-5" style={{
                                        display: 'contents',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 0,
                                        padding: 0,
                                    }}>
                                        <div style={{ backgroundColor: content.circles[0].color, borderRadius: 100000, height: UWPidentity ? innerWidth * 0.9 / (1.9 * 1.9) : innerWidth * 0.9 / (1.5 * 1.5), width: UWPidentity ? innerWidth * 0.9 / (1.9 * 1.9) : innerWidth * 0.9 / (1.5 * 1.5), marginTop: UWPidentity ? '70px' : '21%', }}>
                                            {this.state.currentIndex === 1 ?
                                                <div style={{ paddingTop: '25%' }} className={"questionDivShow"} >
                                                    <img src={image_4} style={{ width: 50, height: 40, marginBottom: 8 }} alt={""}/>
                                                    <div style={{ margin: "0px 10px 0px 10px" }}
                                                        onClick={() => {
                                                            // this.setState({selectColor_1:'white',selectColor_2:"",selectColor_3:''})
                                                        }}>
                                                        {/* <span style={{ backgroundColor: this.state.selectColor_1, fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium' }}> {content.circles[0].name}</span> */}
                                                        <div className={content.circles[0].nameClassName ? content.circles[0].nameClassName : ''} dangerouslySetInnerHTML={{ __html: content.circles[0].name }}
                                                        />
                                                    </div>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-5" style={{
                                        fontSize: 8, display: 'inline',
                                        marginBottom: deviceWidth > 645 ? "76%" : '100%', marginLeft: "48%", marginTop: UWPidentity ? "-88%" : innerWidth > 650 ? '-38%' : '-33%'
                                    }}>
                                        {this.state.currentIndex === 1 ?
                                            <React.Fragment>
                                                <img src={image_7} style={{
                                                    width: 40, height: 40, marginBottom: 10, marginLeft: 30, marginTop: -30
                                                }} alt={""}/>
                                                <div className="row col-12" style={{
                                                    margin: UWPidentity ? "0px 10px 0px 25px" : innerWidth < 600 ? "0px 10px 0px 25px" : "0px 10px 0px 70px", paddingLeft: 0, whiteSpace: 'nowrap'
                                                }}>
                                                    {/* <span style={{ backgroundColor: this.state.selectColor_2, color: "white", fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium',marginLeft:window.innerWidth > 650 ? 40 :0 }}>  {content.circles[1].name}  </span> */}
                                                    <div className={`${innerWidth > 768 ? 'pl-5' : ''} ${content.circles[1].nameClassName}`} dangerouslySetInnerHTML={{ __html: content.circles[1].name }} />
                                                </div>
                                            </React.Fragment>
                                            : null
                                        }
                                    </div>
                                    {this.state.ImageView === 1 && this.state.showIcon ?
                                        <Link onClick={() => this.setState({ showIcon: false })} style={{ zIndex: 2 }}>
                                            <div style={{
                                                backgroundColor: '#ADD8E6', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15, marginTop: -240,
                                                marginLeft: deviceHeight < 680 ? 80 : 150, width: deviceWidth / 2, height: deviceWidth / 2, maxWidth: 270, maxHeight: 225,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 0, position: "fixed", bottom: "14%", right: "35%", minHeight: 200, minWidth: 200
                                            }}>

                                                <div style={{
                                                    backgroundImage: "url(" + MyConstant.keyList.apiURL + 'vp?action=module&key=' + content.image.fileName + '&id=' + content.image.fileType + ")",
                                                    backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                                                    width: "100%", height: "100%", backgroundSize: "100% 100%"
                                                }} >
                                                    <div >
                                                        <p className="circl-img-style">
                                                            {content.imageText}
                                                        </p>
                                                        <div style={{ backgroundColor: '#FFF', borderRadius: 10, textAlign: 'center', width: "20%", position: 'absolute', top: 27, right: 10 }}>
                                                            <i className="fa fa-times" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        // <React.Fragment>
                                        //     <a onClick={() => this.setState({ showIcon: false })}>
                                        //         <p style={{ width: 25, height: 25, marginTop: -250, marginLeft: 285, fontSize: 25, borderRadius: 25, zIndex: 5, fontWeight: 800, backgroundColor: '#FFF', paddingLeft: 5, paddingRight: 5, lineHeight: 1 }}>X</p>
                                        //         <img className={"questionDivShow"}
                                        //             src={MyConstant.keyList.apiURL + 'vp?action=module&key=' + content.image.fileName + '&id=' + content.image.fileType}
                                        //             style={{ width: 147, height: 143, backgroundColor: "#ADD8E6", border: '1px solid #FFCA0F', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15, marginTop: -30, marginLeft: 150, }}
                                        //         />
                                        //     </a>
                                        // </React.Fragment>
                                        : null}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '38%' }} className="col-3">
                            {this.state.currentIndex === 1 ?
                                <React.Fragment>
                                    <img src={image_5} style={{ width: 40, height: 40, marginBottom: 10 }} alt={""} />
                                    <div style={{ width: '100%', whiteSpace: 'nowrap' }} alt={""}>
                                        {/* <span style={{ backgroundColor: this.state.selectColor_3, color: 'white', fontWeight: '700', fontSize: 13, fontFamily: 'montserrat-medium' }}>  {content.circles[2].name}  </span> */}
                                        <div className={content.circles[2].nameClassName ? content.circles[2].nameClassName : ''} style={{ marginLeft: innerWidth > 768 ? 0 : '-7px' }} dangerouslySetInnerHTML={{ __html: content.circles[2].name }} />
                                    </div>
                                </React.Fragment>
                                : null}
                        </div>
                    </div>
                </div>

            </div>

            <div className="bottom-style">
                <div style={{ textAlign: "right" }}>

                    {this.state.currentIndex === 1 ?
                        <Link onClick={() => {
                            if (this.state.ImageView) {
                                this.props.changeStage('Next', stage)
                            }
                            this.setState({ ImageView: true })
                        }}>
                            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""}/>
                        </Link> : null}

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



        </React.Fragment >)
    }
}
export default CircleWithInfoAnimations
