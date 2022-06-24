import React from "react";
import LeftIcon from '../images/outlineBackIcon.png';
import MyConstant from '../config/MyConstant';
import Family from '../images/family.png';
import YellowRectangle from '../images/yellowrectangle.png';
import OrangeFrame from '../images/orangeframe.png';
import PinkFrame from '../images/pinkframe.png';
import LightFrame from '../images/lightframe.png';
import YellowFrame from '../images/yellowframe.png';
import { connect } from 'react-redux';




class ParentOnboardingScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            innerPageData: false
        }
    }

    async componentDidMount() {



        ///console.log('this state',this.state.innerPageData)
    }

    return_content(pageIndex, index) {
        const { innerPageData } = this.state;

        const { innerGroupLanguageMappingData, innnerGroupLanguageBaseData } = this.props
        if (innerGroupLanguageMappingData && innerGroupLanguageMappingData[pageIndex] && innerGroupLanguageMappingData[pageIndex].fieldData[index]) {
            return innerGroupLanguageMappingData[pageIndex].fieldData[index].value

        }

        else if (innnerGroupLanguageBaseData && innnerGroupLanguageBaseData[pageIndex] && innnerGroupLanguageBaseData[pageIndex].fieldData[index]) {
            return innnerGroupLanguageBaseData[pageIndex].fieldData[index].value

        }

        else
            return ""

    }
    render() {

        const { innerPageData } = this.state;
        return (< React.Fragment>

            <div className="row mt-4 ml-0">
                <div className="col-2" onClick={() => {
                    if (window.location.href.match(/lego/)) {
                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/Parenthome')
                    }
                    else {
                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/Parenthome')
                    }


                }}> <img src={LeftIcon} style={{ height: 48, width: 48 }} /> </div>
                <div className="col-8"> <h4 style={{ fontWeight: 800, fontSize: 24, fontFamily: 'montserrat-bold', }}>
                    {this.return_content(4, 1)}  </h4> </div>
                <div className="col-2"> </div>
            </div>


            <div className="row mt-4">
                
                <div className="col-2" style={{paddingLeft:30}} >
                    <img src={YellowRectangle} style={{ height: 119, width: 116, }} />
                    <img src={Family} style={{ height: 74, width: 86, marginTop: -100, marginLeft: 15, position: 'absolute',display:"flex", }} />
                </div>
                <div className="col-1" />
                <div className="col-8">
                    <p style={{ fontWeight: 800, fontFamily: 'montserrat-bold', color: '#18191F', fontSize: 25, fontWeight: 800, paddingLeft: 50 }}>
                        {this.return_content(4, 2)}  </p>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-1">  </div>
                <div className="col-1">
                    <img src={OrangeFrame} style={{ width: 48, height: 48 }} />
                </div>
                <div className="col-9 ml-4">
                    <div style={{ fontSize: 21, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 3)}   </div>
                    <div style={{ fontSize: 15, fontWeight: '800', fontFamily: 'montserrat-medium', color: '#474A57', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 4)}  </div>
                </div>
                <div className="col-1"> </div>
            </div>


            <div className="row mt-4">
                <div className="col-1">  </div>
                <div className="col-1">
                    <img src={PinkFrame} style={{ width: 48, height: 48 }} />
                </div>
                <div className="col-9 ml-4">
                    <div style={{ fontSize: 21, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 5)} </div>
                    <div style={{ fontSize: 15, fontWeight: '800', fontFamily: 'montserrat-medium', color: '#474A57', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 6)} </div>
                </div>
                <div className="col-1"> </div>
            </div>

            <div className="row mt-4">
                <div className="col-1">  </div>
                <div className="col-1">
                    <img src={LightFrame} style={{ width: 48, height: 48 }} />
                </div>
                <div className="col-9  ml-4" onClick={() => {
                    if (window.location.href.match(/lego/)) {
                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/Empathy')
                    }
                    else {
                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/Empathy')
                    }

                }}>
                    <div style={{ fontSize: 21, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 7)} </div>
                    <div style={{ fontSize: 15, fontWeight: '800', fontFamily: 'montserrat-medium', color: '#474A57', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 8)}</div>
                </div>
                <div className="col-1"> </div>
            </div>



            <div className="row mt-4">
                <div className="col-1">  </div>
                <div className="col-1">
                    <img src={YellowFrame} style={{ width: 48, height: 48 }} />
                </div>
                <div className="col-9 ml-4">
                    <div style={{ fontSize: 21, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 9)} </div>
                    <div style={{ fontSize: 15, fontWeight: '800', fontFamily: 'montserrat-medium', color: '#474A57', textAlign: 'start', marginLeft: 10 }}>
                        {this.return_content(4, 10)} </div>
                </div>
                <div className="col-1"> </div>
            </div>





        </React.Fragment>)


    }

}


const mapStateToProps = (state) => {
    return {

        innnerGroupLanguageBaseData: state.languageReducer.innnerGroupLanguageBaseData,
        innerGroupLanguageMappingData: state.languageReducer.innerGroupLanguageMappingData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentOnboardingScreen);

