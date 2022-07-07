import React, { Component } from 'react';
import { Style } from "react-style-tag";
import MyConstant from "../config/MyConstant";
import Star from "../images/Star.png";
import box from "../images/box.png";
import Ellipse from "../images/Ellipse.png";

import Starred from "../images/Starred.png";
import boxred from "../images/Boxred.png";
import Ellipsered from "../images/Ellipsered.png";
import { connect } from 'react-redux';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'home',
            innerPageData: false
        }
    }



    componentDidMount() {
        if (this.props.page) {
            this.setState({ currentPage: this.props.page })
        }

        if (localStorage.getItem("getInnerPageData")) {

            this.setState({ innerPageData: JSON.parse(localStorage.getItem("getInnerPageData")) })

        }

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

        return (
            <React.Fragment>
                <Style>
                    {`
                    .fa {
                        color: #EEEFF4;
                    }
                    .checked {
                        color: red;
                    }
               `}
                </Style>
                <div className="row mx-0 footer-tab">
                    <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div onClick={() => {
                            this.setState({ currentPage: 'home' })
                            if (window.location.href.match(/lego/)) {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/home')
                            }
                            else {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/home')
                            }

                        }}>
                            <div >
                                {/* <i style={{fontSize:28}} className={`fa fa-circle fa-3x ${this.state.currentPage==='home' ? 'checked' : ''}`}></i> */}
                                {this.state.currentPage === 'home' ?
                                    <div>
                                        <img src={Ellipsered} style={{ width: 24, height: 24 }} />
                                    </div>
                                    :
                                    <div>

                                        <img src={Ellipse} style={{ width: 24, height: 24, }} />
                                    </div>
                                }
                            </div>
                            <div className="mt-1">
                                <span style={{ fontSize: 12, fontFamily: "montserrat-bold", fontWeight: "bold" }} >
                                    {this.return_content(7, 1)}   </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ flexDirection: 'column' }} onClick={() => {
                            this.setState({ currentPage: 'levels' })
                            if (window.location.href.match(/lego/)) {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/levels')
                            }
                            else {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/levels')
                            }
                        }}>
                            <div>
                                {/* <span style={{fontSize:28}} className={`fa fa-star fa-3x ${this.state.currentPage==='levels' ? 'checked': ''}`} ></span> */}

                                {this.state.currentPage === 'levels' ?
                                    <div>
                                        <img src={Starred} style={{ width: 24, height: 24 }} />
                                    </div>
                                    :
                                    <div>

                                        <img src={Star} style={{ width: 24, height: 24, }} />
                                    </div>
                                }


                            </div>
                            <div className="mt-1">

                                <span style={{ fontSize: 12, fontFamily: "montserrat-bold", fontWeight: "bold" }} >
                                    {this.return_content(7, 2)}  </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ flexDirection: 'column' }} onClick={() => {
                            this.setState({ currentPage: 'Parent' })
                            //keyList.projectUrl
                            if (window.location.href.match(/lego/)) {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/Parent')
                            }
                            else {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/Parent')
                            }
                        }}>
                            <div>
                                {/* <span  style={{fontSize:28}} className={`fa fa-square fa-3x ${this.state.currentPage==='parents' ? 'checked': ''}`}></span> */}

                                {this.state.currentPage === 'Parent' ?
                                    <div>
                                        <img src={boxred} style={{ width: 24, height: 24, }} />
                                    </div>
                                    :
                                    <div>

                                        <img src={box} style={{ width: 24, height: 24, }} />
                                    </div>
                                }


                            </div>
                            <div className="mt-1">

                                <span style={{ fontSize: 12, fontFamily: "montserrat-bold", fontWeight: "bold" }} >
                                    {this.return_content(7, 3)}   </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ flexDirection: 'column' }} onClick={() => {

                            this.setState({ currentPage: 'profile' })
                            if (window.location.href.match(/lego/)) {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/profile')
                            }
                            else {
                                this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/profile')
                            }
                        }}>
                            <div>
                                {/* <span style={{fontSize:28}} className={`fa fa-circle fa-3x ${this.state.currentPage==='profile' ? 'checked': ''}`}></span> */}

                                {this.state.currentPage === 'profile' ?
                                    <div>
                                        <img src={Ellipsered} style={{ width: 24, height: 24 }} />
                                    </div>
                                    :
                                    <div>

                                        <img src={Ellipse} style={{ width: 24, height: 24, }} />
                                    </div>
                                }




                            </div>
                            <div className="mt-1">

                                <span style={{ fontSize: 12, fontFamily: "montserrat-bold", fontWeight: "bold" }} >
                                    {this.return_content(7, 4)}    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Footer);



