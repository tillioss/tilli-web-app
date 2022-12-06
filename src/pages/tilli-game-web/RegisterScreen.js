import React from 'react';
import { withRouter } from 'react-router-dom';
import Gmail from "../../images/tilli-game-web/Gmail.png"
import MyConstant from '../../config/MyConstant';
import { connect } from 'react-redux';
import { setGameAuthData, setGameMultipleAuthData, reSetGameAuthData } from '../../redux/actions';
import { toast } from 'react-toastify';
import { doConnect } from "../../config/Common";



class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenType: true,
            mailValidationChecking: false
        }
    }
    componentDidMount() {

    }

    async validationCheck() {
        let { createPassword, createEmailId } = this.props;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (createEmailId.trim() === '') {
            toast.error("Please Enter Mail!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        else if (reg.test(createEmailId) == false) {
            toast.error("Please Enter Your Correct MailId!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        if (!createPassword) {
            toast.error("Please Enter Your Password!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        return true
    }

   async emailIdChecking() {
        let { createEmailId } = this.props;
        let postJson = { sessionId: "1223", emailId: createEmailId }
        //emailId : String,sessionId: String
        // console.log("postJson", postJson)
        let result = new Promise( async(resolve) => {
        let responseData = await doConnect("checkEmailIdAlreadyExist", "POST", postJson);
        let responseMsg = responseData.response;
        if (responseMsg) {
            toast.error("This email id already using!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        resolve(responseMsg);
    });
        return result
    }

    render() {
        let { hiddenType } = this.state
        let { createPassword, createEmailId, path } = this.props
        return (
            <div className='page-setup'>
                <h2 className='text-center mt-2 site-color' > Welcome! </h2>
                <h5 className='text-center mt-2' > Create your Tilli account </h5>
                <div className='row mx-0 mt-2 align-items-center'>
                    <div className='col-sm-3 register-text-align pr-1'>
                        <label className='bold-text-style mb-0 pt-0'> Email ID : </label>
                    </div>
                    <div className='col-sm-7 pl-0 pr-0'>
                        <input type={"text"} id="emailId" value={createEmailId} placeholder={"Enter Email Address"} className='form-control text-input-style' onChange={(e) => {
                            this.props.setGameMultipleAuthData({ createEmailId: e.target.value })
                        }} onFocus={() => {
                            document.getElementById("emailId").scrollIntoView();

                        }} />
                    </div>
                </div>

                <div className='row mx-0 mt-2'>
                    <div className='col-sm-3 register-text-align pr-1'>
                        <label className='bold-text-style mb-0 pt-2' > Password : </label>
                    </div>
                    <div className='col-sm-7 pl-0 pr-0'>
                        <div className='form-group div-password '>
                            <input type={hiddenType ? "password" : "text"} id="password" value={createPassword} placeholder={"Enter Password"} className="form-control  text-input-style password-text"
                                onChange={(e) => {
                                    this.props.setGameMultipleAuthData({ createPassword: e.target.value })
                                }}
                                onFocus={() => {
                                    document.getElementById("password").scrollIntoView();
                                }}
                            />
                            <span className="pwd-hidden-text" onClick={() => {
                                this.setState({ hiddenType: !hiddenType })
                            }}>{!hiddenType ? "Hide" : "Show"} </span>
                        </div>
                    </div>
                </div>

                <div className='row mx-0 mt-2'>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5' ></div>
                    <div className=' text-center col-sm-4 col-xs-6 col-md-2 col-lg-2  col-xl-2 p-3'>
                        <div className='language-btn-style btn-regi' onClick={async () => {
                            let inputValidate = await this.validationCheck()
                            if (inputValidate) {
                                let mailIdValidaate = await this.emailIdChecking()
                                if (!mailIdValidaate) {
                                    this.props.history.push(path + "/createprofile")
                                }
                            }
                        }}>Sign Up</div>
                    </div>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5' ></div>
                </div>
                <h5 className='text-center mt-2' > or </h5>

                <div className='row mx-0 mt-2'>
                    <div className='col-sm-12 text-center'>
                        <div className='gmail-div' onClick={() => {
                            // if (this.validationCheck()) {
                            //     this.props.history.push(path + "/createprofile")
                            // }
                        }} >
                            <div className='gmail-img-div' >
                                <img className='gmail-img' src={Gmail} />
                            </div>
                            <div className='gmail-text-div'>
                                <p className='bold-text-style div-vertical-center'> Continue With Gmail</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center mt-2 mb-2 libre-franklin-reg'>
                    By signing up, you accept our <span className='site-color'>Terms of Use</span> and  <span className='site-color'>Privacy Policy</span>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        createEmailId: state.gameAuthReducer.createEmailId,
        createPassword: state.gameAuthReducer.createPassword,
        state,
    };
};

const mapDispatchToProps = {
    setGameAuthData,
    setGameMultipleAuthData,
    reSetGameAuthData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen))