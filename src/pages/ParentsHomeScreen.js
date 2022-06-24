import React, { Component } from 'react';
import LeftIcon from '../images/outlineBackIcon.png';
import PlayIcon from '../images/triangle.png';
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';



class ParentsHomeScreen extends React.Component {
    constructor(props) {
        super(props)
        {
            this.state = { innerPageData: false }
        }
    }


    async componentDidMount() {


        if (localStorage.getItem("getInnerPageData")) {

            await this.setState({ innerPageData: JSON.parse(localStorage.getItem("getInnerPageData")) })

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


                <div className="row mt-4 ml-0">
                    <div className="col-2" onClick={() => {
                        if (window.location.href.match(/lego/)) {
                            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/Parent')
                        }
                        else {
                            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/Parent')
                        }

                    }}> <img src={LeftIcon} style={{ height: 48, width: 48 }} /> </div>
                    <div className="col-8"> <h4 style={{ fontWeight: 800, fontFamily: 'montserrat-bold', fontSize: 27 }}> {this.return_content(3, 1)}  </h4> </div>
                    <div className="col-2"> </div>
                </div>

                <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10" style={{ borderRadius: 16, backgroundColor: '#FF89BB', border: '2px solid #18191F', padding: 10, margin: 10 }}>
                        <div className="row">
                            <div className="col-4">  <h4 style={{ fontSize: 27, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F' }}>
                                {this.return_content(3, 2)}   </h4>  </div>
                        </div>

                        <div className="row">
                            <div className="col-12">   <p style={{ fontSize: 13, fontWeight: '500', fontFamily: 'montserrat-medium', marginTop: 5, color: '#18191F', display: 'flex', textAlign: 'start' }}>
                                {this.return_content(3, 3)}  </p>  </div>
                        </div>

                        <div className="row">
                            <div className="col-10">  </div>
                            <div className="col-2">
                                <span style={{ backgroundColor: '#FFFFFF', width: 30, height: 30, borderRadius: 15 }} onClick={() => {
                                    if (window.location.href.match(/lego/)) {
                                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/ParentOnboarding')
                                    }
                                    else {
                                        this.props.history.push('/' + MyConstant.keyList.projectUrl + '/ParentOnboarding')
                                    }
                                }}>  <img src={PlayIcon} style={{ width: 30, height: 30 }} /> </span>
                            </div>
                        </div>


                    </div>
                    <div className="col-1"> </div>
                </div>



                <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10" style={{ borderRadius: 16, backgroundColor: '#D6FCF7', border: '2px solid #18191F', flexDirection: 'column', padding: 10, margin: 10 }}>
                        <div className="row">
                            <div className="col-4">  <h4 style={{ fontSize: 27, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', whiteSpace: 'nowrap' }}>
                                {this.return_content(3, 4)}  </h4>  </div>
                        </div>
                        <div className="row">
                            <div className="col-12">   <p style={{ fontSize: 13, fontWeight: '500', fontFamily: 'montserrat-medium', marginTop: 5, color: '#18191F', display: 'flex', textAlign: 'start' }}>
                                {this.return_content(3, 5)}    </p>  </div>
                        </div>

                        <div className="row">
                            <div className="col-10">  </div>
                            <div className="col-2">
                                <span style={{ backgroundColor: '#FFFFFF', width: 30, height: 30, borderRadius: 15 }}>  <img src={PlayIcon} style={{ width: 30, height: 30 }} /> </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"> </div>
                </div>


                <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10" style={{ borderRadius: 16, backgroundColor: '#FFF4CC', border: '2px solid #18191F', flexDirection: 'column', padding: 10, margin: 10 }}>
                        <div className="row">
                            <div className="col-4">  <h4 style={{ fontSize: 27, fontWeight: '800', fontFamily: 'montserrat-bold', color: '#18191F', whiteSpace: 'nowrap' }}>
                                {this.return_content(3, 6)}  </h4>  </div>
                        </div>
                        <div className="row">
                            <div className="col-12">   <p style={{ fontSize: 13, fontWeight: '500', fontFamily: 'montserrat-medium', marginTop: 5, color: '#18191F', display: 'flex', textAlign: 'start' }}>
                                {this.return_content(3, 7)}  </p>  </div>
                        </div>

                        <div className="row">
                            <div className="col-10">  </div>
                            <div className="col-2">
                                <span style={{ backgroundColor: '#FFFFFF', width: 30, height: 30, borderRadius: 15 }}>  <img src={PlayIcon} style={{ width: 30, height: 30 }} /> </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"> </div>
                </div>


                <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10">

                        <button style={{ borderColor: '#18191F', borderRadius: 10, fontFamily: 'montserrat-bold', fontWeight: 800 }} type="submit" >
                            {this.return_content(3, 8)}
                        </button>
                    </div>
                    <div className="col-1"> </div>
                </div>
            </React.Fragment>
        )


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
export default connect(mapStateToProps, mapDispatchToProps)(ParentsHomeScreen);
