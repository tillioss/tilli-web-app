import React from 'react';
import { withRouter } from 'react-router-dom';
import MyConstant from '../../config/MyConstant';
import { connect } from 'react-redux';
import { setGameAuthData, setGameMultipleAuthData, reSetGameAuthData } from '../../redux/actions';
import { toast } from 'react-toastify';
import { doConnect } from "../../config/Common";


class ParentPasswordSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }
    componentDidMount() {
        let { createPassword, createEmailId } = this.props;
        if (!createEmailId && !createPassword) {
            this.props.history.push(MyConstant.keyList.projectUrl)
        }
    }

    setPassword(str) {
        let { createParentPassCode } = this.props;
        if (str === "delete") {
            createParentPassCode = createParentPassCode.substring(0, createParentPassCode.length - 1)
        } else if (createParentPassCode.length < 4) {
            createParentPassCode += str;
        }
        this.props.setGameMultipleAuthData({
            createParentPassCode
        })
    }

    async createUserPost() {
        //emailId:String, password: String,nameOfChild:String, ageOfChild: String,schoolName: String, className: String,genderOfChild:String,passcode:String,sessionId: String
        let { createEmailId, createPassword, childName, ageSelected, schoolSelected, classSelected, gender, createParentPassCode, path } = this.props
        if (createEmailId && createPassword) {
            let postJson = { emailId: createEmailId, password: createPassword, nameOfChild: childName, ageOfChild: ageSelected.value, schoolName: schoolSelected.value, className: classSelected.value, genderOfChild: gender, passcode: createParentPassCode, sessionId: "1223" }
            console.log("postJson", postJson)
            let responseData = await doConnect("createGameUser", "POST", postJson);
            // console.log("responseData", responseData)
            let responseMsg = responseData.response;
            if (responseMsg == "Success") {
                toast.success("Register Successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    // this.props.setGameMultipleAuthData({
                    //     createEmailId: "",
                    //     createPassword: "",
                    //     childName: "",
                    //     ageSelected: {},
                    //     schoolSelected: {},
                    //     classSelected: {},
                    //     createParentPassCode: "",
                    // })
                    this.props.history.push(path + "/start-game")
                }, 2000)
            }

        } else {
            this.props.history.push(MyConstant.keyList.projectUrl)
        }

    }
    render() {
        let { createParentPassCode, path } = this.props;
        return <div className='page-setup'>
            <h2 className='text-center mt-2 site-color' > Dear Parent, </h2>
            <h5 className='text-center mt-2' > Please enter your year of birth </h5>
            <div className='row mx-0 row-password'>
                <div className='col-sm-6'>
                    <div className='row-dots'>
                        <div className={`passsword-dots ${createParentPassCode.length >= 1 ? "active" : ""}`}></div>
                        <div className={`passsword-dots ${createParentPassCode.length >= 2 ? "active" : ""}`}></div>
                        <div className={`passsword-dots ${createParentPassCode.length >= 3 ? "active" : ""}`}></div>
                        <div className={`passsword-dots ${createParentPassCode.length >= 4 ? "active" : ""}`}></div>
                    </div>
                    <div className='row-content mt-3'>
                        This information is not stored
                    </div>
                </div>
                <div className='col-sm-1' />
                <div className='col-sm-4'>
                    <div className='row-number'>
                        <div className='number' onClick={() => this.setPassword(1)}>1</div>
                        <div className='number maxwidth' onClick={() => this.setPassword(2)}>2</div>
                        <div className='number' onClick={() => this.setPassword(3)}>3</div>
                    </div>
                    <div className='row-number'>
                        <div className='number' onClick={() => this.setPassword(4)}>4</div>
                        <div className='number maxwidth' onClick={() => this.setPassword(5)}>5</div>
                        <div className='number' onClick={() => this.setPassword(6)}>6</div>
                    </div>
                    <div className='row-number'>
                        <div className='number' onClick={() => this.setPassword(7)}>7</div>
                        <div className='number maxwidth' onClick={() => this.setPassword(8)}>8</div>
                        <div className='number' onClick={() => this.setPassword(9)}>9</div>
                    </div>
                    <div className='row-number'>
                        <div className='number'></div>
                        <div className='number maxwidth' onClick={() => this.setPassword(0)}>0</div>
                        <div className='number' onClick={() => this.setPassword("delete")}>
                            <div className='delete'>
                                <i className='fa fa-times'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mx-0 my-3'>
                <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5'></div>
                <div className='col-sm-4 col-xs-6 col-md-2 col-lg-2  col-xl-2'>
                    <div className={`text-center pl-4 pr-4 language-btn-style btn-max-width  ${createParentPassCode.length === 4 ? "" : "disabled"}`} onClick={() => {
                        if (createParentPassCode.length === 4) {
                            this.createUserPost()
                            // this.props.history.push(path + "/start-game")
                        }
                    }}>Continue</div>
                </div>
                <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5' ></div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        createEmailId: state.gameAuthReducer.createEmailId,
        createPassword: state.gameAuthReducer.createPassword,
        childName: state.gameAuthReducer.childName,
        ageSelected: state.gameAuthReducer.ageSelected,
        schoolSelected: state.gameAuthReducer.schoolSelected,
        classSelected: state.gameAuthReducer.classSelected,
        gender: state.gameAuthReducer.gender,
        createParentPassCode: state.gameAuthReducer.createParentPassCode,
        state,
    };
};

const mapDispatchToProps = {
    setGameAuthData,
    setGameMultipleAuthData,
    reSetGameAuthData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParentPasswordSetup))
