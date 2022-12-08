import React from 'react';
import { withRouter } from 'react-router-dom';
import Boy_2 from "../../images/tilli-game-web/Boy_2.png"
import Girl_2 from "../../images/tilli-game-web/Girl_2.png"
import DropDown from "../../Component/TilliGameWebDropDown"
import { readJsonFile, keyReadData } from "../../config/Common"
import { connect } from 'react-redux';
import { setGameAuthData, setGameMultipleAuthData, reSetGameAuthData } from '../../redux/actions';


class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: {},
            ageOptions: [],
            ageSelected: {},
            schoolOptions: [],
            classOptions: [],
            disabled: true,
            classOptionsCopy: []
        }
    }


    async componentDidMount() {
        this.readJson()
        this.validateForm()
    }

    async readJson() {
        let jsonData = await readJsonFile("childprofilescreen")
        this.setState({ jsonData }, () => {
            this.readkey()
        })
    }

    async readkey() {
        let { jsonData } = this.state
        let ageOptions = []
        let responseAge = await keyReadData(jsonData.eventContext.eventList, "age")
        responseAge.value.map((value) => {
            ageOptions.push({ label: value, value: value })
            return ageOptions
        })
        let schoolOptions = []
        let responseSchool = await keyReadData(jsonData.eventContext.eventList, "school")
        responseSchool.value.map((value) => {
            schoolOptions.push({ label: value, value: value })
            return schoolOptions
        })

        let classOptions = []
        let responseOptions = await keyReadData(jsonData.eventContext.eventList, "class")
        responseOptions.value.map((value) => {
            classOptions.push({ label: value, value: value })
            return responseOptions
        })

        this.setState({ ageOptions, schoolOptions, classOptions, classOptionsCopy: classOptions })
    }

    validateForm() {
        let { gender, childName, ageSelected, schoolSelected, classSelected } = this.props
        let disabled = true;
        if (gender !== "" && childName !== "" && Object.keys(ageSelected).length > 0 && Object.keys(schoolSelected).length > 0 && Object.keys(classSelected).length > 0) {
            disabled = false;
        }

        this.setState({
            disabled
        })
    }

    render() {
        let { ageOptions, schoolOptions, classOptions, disabled, } = this.state
        let { childName, ageSelected, schoolSelected, classSelected, gender, path } = this.props
        return <div className='page-setup'>
            <h2 className='text-center my-3 site-color fnt-style' > Welcome! </h2>
            <h5 className='text-center mb-2 fnt-style site-txt-black ' > Create a Profile for your Child </h5>
            <div className='row mx-0 my-2'>
                <div className='col-md-2 col-lg-3'></div>
                <div className='col-sm-5  col-md-4 col-lg-3 col-xs-12 d-flex align-items-center pr-2'>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className={`child-card-body mx-4 ${gender === "girl" ? "active" : ""}`} onClick={async () => {
                            await this.props.setGameMultipleAuthData({
                                gender: "girl"
                            })
                            this.validateForm()
                        }}>
                            <div className='' style={{ textAlign: "center" }} >
                                <img className={"create-pro-girl"} src={Girl_2} alt={"Girl_2"} />
                                <div className='site-color fnt-style mb-3'>
                                    Girl
                                </div>
                            </div>
                        </div>
                        <div className='bold-text-style'>
                            or
                        </div>
                        <div className={`child-card-body mx-4 ${gender === "boy" ? "active" : ""}`} onClick={async () => {
                            await this.props.setGameMultipleAuthData({
                                gender: "boy"
                            })
                            this.validateForm()
                        }}>
                            <div className='' style={{ textAlign: "center" }} >
                                <img src={Boy_2} className="create-pro-boy" alt={"Boy_2"} />
                                <div className='site-color fnt-style mb-3'>
                                    Boy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-5 col-md-4 col-lg-3 col-xs-12 pl-2'>
                    <div className='row mx-0 my-2'>
                        <div className='col-sm-4 text-end pr-1'>
                            <label className='pt-2 bold-text-style'> Name : </label>
                        </div>
                        <div className='col-sm-8 pl-0 pr-0'>
                            <input type={"text"} id="childName" value={childName} placeholder={"Enter Child’s Name"} className='form-control text-input-style' onChange={async (e) => {
                                await this.props.setGameMultipleAuthData({
                                    childName: e.target.value
                                })
                                this.validateForm()
                            }}

                                onFocus={() => {
                                    document.getElementById("childName").scrollIntoView();
                                }}
                            />
                        </div>
                    </div>


                    <div className='row mx-0 my-2'>
                        <div className='col-sm-4 text-end pr-1'>
                            <label className='pt-2 bold-text-style'> Age : </label>
                        </div>
                        <div className='col-sm-5 pl-0 pr-0'>
                            <DropDown
                                selectedOption={ageSelected}
                                onChange={async (e) => {
                                    await this.props.setGameMultipleAuthData({
                                        ageSelected: e
                                    })
                                    this.validateForm()
                                }}
                                options={ageOptions}
                                isDisabled={false}
                                isMulti={false}
                                styles={{ fontWeight: "bold" }}
                                isSearchable={false}
                            />
                        </div>
                    </div>

                    <div className='row mx-0 my-2'>
                        <div className='col-sm-4 text-end pr-1'>
                            <label className='pt-2 bold-text-style'> School : </label>
                        </div>
                        <div className='col-sm-8 pl-0 pr-0'>
                            <DropDown
                                selectedOption={schoolSelected}
                                onChange={async (e) => {
                                    let classSelected = ""
                                    classOptions = this.state.classOptionsCopy
                                    if (e.value === "Other") {
                                        classSelected = e
                                        classOptions = [e]
                                    }
                                    await this.props.setGameMultipleAuthData({
                                        schoolSelected: e, classSelected,
                                    })
                                    this.setState({ classOptions })
                                    this.validateForm()
                                }}
                                options={schoolOptions}
                                isDisabled={false}
                                isMulti={false}
                                styles={{ fontWeight: "bold" }}
                                isSearchable={false}
                            />
                        </div>
                    </div>

                    <div className='row mx-0 my-2'>
                        <div className='col-sm-4 text-end pr-1'>
                            <label className='pt-2 bold-text-style'> Class : </label>
                        </div>
                        <div className='col-sm-5 pl-0 pr-0'>
                            <DropDown
                                selectedOption={classSelected}
                                onChange={async (e) => {
                                    await this.props.setGameMultipleAuthData({
                                        classSelected: e
                                    })
                                    this.validateForm()
                                }}
                                options={classOptions}
                                isDisabled={false}
                                isMulti={false}
                                styles={{ fontWeight: "bold" }}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-2 col-lg-3'></div>
            </div>
            <div className='mx-5' style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <div className='row mx-0 my-3'>
                        <div className='col-sm-4 col-xs-3 col-md-4 col-lg-5 col-xl-5' ></div>
                        <div className='text-center col-sm-4 col-xs-6 col-md-4 col-lg-2 col-xl-2 '>
                            <div className={`language-btn-style btn-max-width  ${disabled ? "disabled" : ""}`} onClick={() => {
                                if (!disabled) {
                                    this.props.history.push(path + "/parent-password-setup")
                                }
                            }}>Save Profile</div>
                        </div>
                        <div className='col-sm-4 col-xs-3 col-md-4 col-lg-5 col-xl-5'></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        childName: state.gameAuthReducer.childName,
        ageSelected: state.gameAuthReducer.ageSelected,
        schoolSelected: state.gameAuthReducer.schoolSelected,
        classSelected: state.gameAuthReducer.classSelected,
        gender: state.gameAuthReducer.gender,
        state,
    };
};

const mapDispatchToProps = {
    setGameAuthData,
    setGameMultipleAuthData,
    reSetGameAuthData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfile))