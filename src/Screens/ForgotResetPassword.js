import React from 'react';
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { connect } from 'react-redux';
import MyConstant from '../config/MyConstant';
import { Link } from "react-router-dom";

class ForgotResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            newpass: '',
            confirmpass: '',
            error: '',
            userId: this.props.match.params.userId,
            id: this.props.match.params.id,
            success: ''
        }
    }

    returnContent(index) {
        var pageIndex = 4;
        const { outerGroupLanguageMappingData, outerGroupLanguageBaseData } = this.props
        if (checkNullAndReturnString(outerGroupLanguageMappingData) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageMappingData[pageIndex].fieldData[index])) {
            return outerGroupLanguageMappingData[pageIndex].fieldData[index].value
        }
        else if (checkNullAndReturnString(outerGroupLanguageBaseData) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex]) && checkNullAndReturnString(outerGroupLanguageBaseData[pageIndex].fieldData[index])) {
            return outerGroupLanguageBaseData[pageIndex].fieldData[index].value
        }
        else
            return ""
    }
    validation = (value) => {
        if (value.trim() === '') {
            this.setState({ error: "Please enter password." });
            return false;
        }
        if (value.length < 6) {
            this.setState({ error: "Min 6 characters required." });
            return false;
        }
        this.setState({ error: "" });

    }
    submit =async  () => {
        // if (this.state.otp.trim() === '') {
        //     this.setState({ error: "Please enter OTP." });
        //     return false;
        // } 
        if (this.state.newpass.trim() === '') {
            this.setState({ error: "Please enter new password." });
            return false;
        }
        if (this.state.newpass.length < 6) {
            this.setState({ error: "Min 6 characters required in new password." });
            return false;
        }
        if (this.state.confirmpass.trim() === '') {
            this.setState({ error: "Please enter confirn password." });
            return false;
        }
        if (this.state.confirmpass.length < 6) {
            this.setState({ error: "Min 6 characters required in confirm password." });
            return false;
        }
        if (this.state.confirmpass !== this.state.newpass) {
            this.setState({ error: "Password mismatch." });
            return false;
        }
        this.setState({ error: "" });

        let postJson = { id: this.state.id, userId: this.state.userId, sessionId: '1223', otp: "", password: this.state.newpass };
        let responseData = await doConnect("updateForgotPassword", "POST", postJson);
        var json = responseData;
        console.log('json', json)
        var response1 = json.response;
        if (response1 === 'Success') {
            this.setState({
                success: <p>Password has been updated.Click <Link  onClick={() => this.props.history.push('/' + MyConstant.keyList.projectUrl + '/')}>here</Link> to login</p>
            });
        } else {
        }
    }

    render() {
        console.log(this.state.error);
        return (
            <React.Fragment>
                <div className="row mx-0">
                    <div className="col-sm-2">  </div>
                    <div className="col-sm-8"><h5 style={{ color: "black", fontWeight: 'bold' }}>
                        Reset Password</h5> </div>
                    <div className="col-sm-2"> </div>
                </div>

                <div className="container">
                    {
                        this.state.error.length ?
                            <div className="row mx-0">
                                <div className="col-sm-3"> </div>
                                <div className="col-sm-6">
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                </div>
                            </div>
                            : null}
                    {
                        this.state.success ?
                            <div className="row mx-0">
                                <div className="col-sm-3"> </div>
                                <div className="col-sm-6">
                                    <div class="alert alert-success" role="alert">
                                        {this.state.success}
                                    </div>
                                </div>
                            </div>
                            : null}

                    {/* <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div className="fontuser">

                                <input type="text" value={this.state.otp}
                                    placeholder={this.returnContent(1)}
                                    onChange={(e) => {
                                        this.setState({ otp: e.target.value })
                                    }} />
                                <i className="fa fa-user fa-lg"></i>
                            </div>

                        </div>
                        <div className="col-sm-3"> </div>
                    </div> */}

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div className="fontuser">

                                <input type="password" value={this.state.newpass}
                                    placeholder={this.returnContent(2)}
                                    onChange={(e) => {
                                        this.setState({ newpass: e.target.value })
                                    }} />
                                <i className="fa fa-lock fa-lg"></i>
                            </div>

                        </div>
                        <div className="col-sm-3"> </div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div className="fontuser">

                                <input type="password" value={this.state.confirmpass}
                                    placeholder={this.returnContent(3)}
                                    onChange={(e) => {
                                        this.setState({ confirmpass: e.target.value })
                                    }} />
                                <i className="fa fa-lock fa-lg"></i>
                            </div>

                        </div>
                        <div className="col-sm-3"> </div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={this.submit}>
                                {this.returnContent(4)}
                            </button>
                        </div>
                        <div className="col-sm-3"> </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }

}



const mapStateToProps = (state) => {
    return {
        outerGroupLanguageMappingData: state.languageReducer.outerGroupLanguageMappingData,
        outerGroupLanguageBaseData: state.languageReducer.outerGroupLanguageBaseData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotResetPassword);



