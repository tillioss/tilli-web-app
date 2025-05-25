import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: "",
            password: "",
            errors: {},
            testUserName: "tilli@teqbahn.com",
            testPassword: "5R2Z#v3F",
            hiddenType: true
        }
    }
    componentDidMount() {

    }


    loginCheck() {
        let { emailId, password, testUserName, testPassword } = this.state
        let errors = {};
        if (emailId.trim() === '') {
            errors["email"] = "Please Enter Your MailId!";
            toast.error("Please Enter Mail!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else if (/(.+)@(.+){2,}\.(.+){2,}/.test(emailId) === false) {
            errors["email"] = "Please Enter Your Correct Mail!";
            toast.error("Please Enter Your Correct MailId!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (password.trim() === '') {
            errors["password"] = "Please Enter Your Password!";
            toast.error("Please Enter Your Password!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        this.setState({ errors })


        if (Object.keys(errors).length === 0) {
            if (testUserName === emailId && testPassword === password) {
                let { path } = this.props
                setTimeout(() => {
                    localStorage.setItem("TilliGameLoggedIn", true)
                    this.props.history.push(path);
                }, 1000)
            }
            else {
                toast.error("Incorrect Login Details!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    render() {
        let { emailId, password,hiddenType } = this.state
        return (
            <div className='page-setup'>
                <h2 className='text-center mt-2 site-color' > Welcome! </h2>
                <h5 className='text-center mt-2' > Sign In your Tilli account </h5>
                <div className='row mx-0 mt-2 align-items-center'>
                    <div className='col-sm-3 register-text-align pr-1'>
                        <label className='bold-text-style mb-0 pt-0'> Email ID : </label>
                    </div>
                    <div className='col-sm-7 pl-0 pr-0'>
                        <input type={"text"} id="emailId" placeholder={"Enter Email Address"} value={emailId} className='form-control text-input-style' onChange={(e) => {
                            this.setState({ emailId: e.target.value })
                        }}
                            onFocus={() => {
                                var elem = document.getElementById("emailId");
                                elem.scrollIntoView();
                            }}
                        />
                    </div>
                </div>

                <div className='row mx-0 mt-2'>
                    <div className='col-sm-3 register-text-align pr-1'>
                        <label className='bold-text-style  mb-0 pt-2' > Password : </label>
                    </div>
                    <div className='col-sm-7 pl-0 pr-0'>
                        <div className='form-group div-password '>
                            <input type={hiddenType ? "password" : "text"} id="password" value={password} placeholder={"Enter Password"} className="form-control  text-input-style password-text" onChange={(e) => {
                                this.setState({ password: e.target.value })
                            }}
                                onFocus={() => {
                                    var elem = document.getElementById("password");
                                    elem.scrollIntoView();

                                }}
                            />
                            <span class="pwd-hidden-text" onClick={() => {
                                this.setState({ hiddenType: !hiddenType })
                            }}>{!hiddenType ? "Hide" : "Show"}</span>
                        </div>
                    </div>
                </div>

                <div className='row mx-0 mt-2'>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5'></div>
                    <div className='col-sm-4 col-xs-6 col-md-2 col-lg-2  col-xl-2'>
                        <div className='text-center pl-4 pr-4 language-btn-style btn-max-width' onClick={() => {
                            this.loginCheck()
                        }}>Sign In</div>
                    </div>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5'></div>
                </div>

            </div>
        )
    }
}

export default withRouter(Login)