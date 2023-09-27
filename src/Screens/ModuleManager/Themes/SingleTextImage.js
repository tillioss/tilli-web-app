import React from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import MyConstant from '../../../config/MyConstant';
import textboxyellow from '../../../images/combined.png'
import { Link } from 'react-router-dom';


class SingleTextImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHeight: window.innerHeight,
            deviceWidth: window.innerWidth
        }
    }

    componentDidMount() {

        this.handleResize();
        window.addEventListener('resize', this.handleResize)
        window.scrollTo(0, 0);
    }



    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
        deviceWidth: window.innerWidth
    });


    render() {
        let { stage, data } = this.props;
        let { deviceHeight, deviceWidth } = this.state;
        let content = data.content;
        let textimg = ''
        if (Object.keys(content.image).length) {
            textimg = MyConstant.keyList.apiURL + 'vp?action=module&key=' + content.image.fileName + '&id=' + content.image.fileType
        }
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



        var browser = (function () {
            var test = function (regexp) { return regexp.test(window.navigator.userAgent) }
            switch (true) {
                case test(/edg/i): return "Microsoft Edge";
                case test(/trident/i): return "Microsoft Internet Explorer";
                case test(/firefox|fxios/i): return "Mozilla Firefox";
                case test(/opr\//i): return "Opera";
                case test(/ucbrowser/i): return "UC Browser";
                case test(/samsungbrowser/i): return "Samsung Browser";
                case test(/chrome|chromium|crios/i): return "Google Chrome";
                case test(/safari/i): return "Apple Safari";
                default: return "Other";
            }
        })();

        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {

        }
        else {
            deviceHeight = 680
            deviceWidth = 360
        }
        let { trustPointText, totalPoint, PercentageTotal } = this.props


        return (
            <React.Fragment>
                <Style>
                    {`
                      `}
                </Style>
                <div className="module-content module-parent">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className={"row ml-0  "+( deviceHeight < 640  ? "pt-2 ": "pt-4") }>
                            <div className="col-2">
                                <Link to="#" onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48, height: 48 }} src={backImage} alt={""}/>
                                </Link>
                            </div>
                            <div className="col-10" style={{ alignSelf: 'center' }}>
                                <p style={{
                                    //  color: '#474A57',
                                    alignSelf: 'center',
                                }}>
                                    <div className="intro-header" dangerouslySetInnerHTML={{ __html: data.title }} />
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                            </div>
                            <div className="col-9">
                                <div className="img-single" style={{
                                    backgroundImage: `url(${textboxyellow})`, backgroundSize: 'contain',
                                    height: deviceHeight > 800 ? 300 : deviceHeight < 680 ? 180 :  225, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    padding: browser === "Microsoft Edge" && deviceWidth > 600 ? 100 : 0,
                                    width: deviceWidth < 370 ? 300 : "",
                                }}>
                                    <p style={{ width: deviceWidth < 400 ? '90%' : deviceHeight > 800 ? '50%' : '70%', fontSize: deviceHeight > 800 ? 19 : 15, }}>
                                        <div className="single-image-text" dangerouslySetInnerHTML={{ __html: content.text }} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3" style={{ marginTop: -40 }}>
                            <div className="col-1" />
                            <div className="col-9">
                                <img className={`${content.imageclassname}`} style={{
                                    width: '100%',
                                    height: deviceHeight < 680 ? deviceHeight / 3.8 : deviceHeight / 3.3, objectFit: 'contain', ...imagestyle
                                }} src={textimg} alt={""} />
                            </div>
                            <div className="col-2" />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-3" />
                        <div className="col-6 pt-2" onClick={() => this.props.changeStage('Next', stage)} style={{ backgroundColor: '#FFBD12', borderRadius: 15, borderWidth: 2, borderColor: 'black', borderStyle: 'solid', }}>
                            <div dangerouslySetInnerHTML={{ __html: content.bottomtext }} />
                        </div>
                        <div className="col-3" />
                    </div>


                    <div className="bottom-style">                      
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

                </div>
            </React.Fragment>
        )
    }
}

export default SingleTextImage
