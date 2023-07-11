import React, { Component } from 'react';
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ParentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify_State: true,
            innerPageData: false
        }
    }

    componentDidMount() {
    }

    return_content(pageIndex, index) {

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
        return (
            <React.Fragment>
                <div className="row mx-0" style={{ marginTop: 25 }}>
                    <div className="col-12">
                        <h4 style={{ fontWeight: 'bold' }}> {this.return_content(2, 1)}  </h4>
                    </div>
                </div>

                <div className="row mx-0">
                    <div className="col-12">
                        <div className="fontpassword">
                            <input type="password"
                                placeholder={this.return_content(2, 2)}
                                name="psw" onChange={(e) => {
                                    this.setState({ Password: e.target.value })
                                }} />
                            <i className="fa fa-lock fa-lg"></i>
                        </div>
                    </div>
                </div>

                <div className="row mx-0">
                    <div className="col-12">
                        <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={() => {


                            if (window.location.href.match(/lego/)) {
                                this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/Parenthome')
                            }
                            else {
                                this.props.history.push('/' + MyConstant.keyList.projectUrl + '/Parenthome')
                            }

                        }} >  {this.return_content(2, 3)}  </button>
                    </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParentScreen));

