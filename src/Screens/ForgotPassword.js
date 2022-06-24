import React from 'react';
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { connect } from 'react-redux';
import MyConstant from '../config/MyConstant';



class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            show: false
        }
    }

    returnContent(index) {
        var pageIndex = 3
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
    submit = async () => {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.state.email.match(mailformat)) {
            this.setState({ error: '' })
        } else{
            this.setState({ error: 'Invalid email address' })
            return false;

        }
        let postJson = { email: this.state.email, sessionId: '1223' };
        let responseData = await doConnect("sendForgotPassword", "POST", postJson);
        var json = responseData;
        console.log('json', json)
        var response1 = json.responseMessage;
        console.log(response1);
        if (response1 == 'Success') {
            this.setState({ show: true })
        } else {
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row mx-0">
                    <div className="col-sm-2">  </div>
                    <div className="col-sm-8"><h5 style={{ color: "black", fontWeight: 'bold' }}>
                        Forgot Password</h5> </div>
                    <div className="col-sm-2"> </div>
                </div>

                <div className="container">
                    { 
                    this.state.error &&
                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div class="alert alert-danger" role="alert">
                            {this.state.error}     </div>
                        </div>
                    </div>
                     }
                    {
                        this.state.show &&
                        <div className="row mx-0">
                            <div className="col-sm-3"> </div>
                            <div className="col-sm-6">
                                <div class="alert alert-success" role="alert">
                                    Reset link has been sent to your mail. Please check inbox and spam folder in your mail
                </div>
                            </div>
                        </div>
                    }

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div className="fontuser">

                                <input type="text" value={this.state.email}
                                    placeholder={this.returnContent(1)}
                                    onChange={(e) => {
                                        this.setState({ email: e.target.value })
                                    }} />
                                <i className="fa fa-user fa-lg"></i>
                            </div>

                        </div>
                        <div className="col-sm-3"> </div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={this.submit}>
                                {this.returnContent(2)}
                            </button>
                        </div>
                        <div className="col-sm-3"> </div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <button style={{ backgroundColor: '#FFF', color: '#000' }} type="submit" onClick={() => this.props.history.push('/' + MyConstant.keyList.projectUrl + '/')}>
                                {this.returnContent(3)}
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);



