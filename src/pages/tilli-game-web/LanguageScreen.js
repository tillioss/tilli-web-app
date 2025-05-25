import React from 'react';
import { withRouter } from 'react-router-dom';
import DropDown from "../../Component/TilliGameWebDropDown"
import Sri_Lanka_Flag from "../../images/tilli-game-web/Sri_Lanka_Flag.png"
import UK_Flag from "../../images/tilli-game-web/UK_Flag.png"
import TickImg from "../../images/tilli-game-web/WhiteTick.png"
import { readJsonFile, keyReadData } from "../../config/Common"
import US_Flag from "../../images/tilli-game-web/US_Flag.png"



class LanguageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryOptions: [],
            selectedCountry: { label: "United States- English", value: "United States- English", extra: { image: US_Flag } },
            hideDropDown: true,
        }
    }
    componentDidMount() {
        this.readJson()
    }

    async readJson() {
        let jsonData = await readJsonFile("selectlanguagescreen")
        this.setState({ jsonData }, () => {
            this.readkey()
        })
    }

    async readkey() {
        let { jsonData } = this.state
        let responseLanguage = await keyReadData(jsonData.eventContext.eventList, "language")
        let countryOptions = []
        let selectedCountry = {}
            responseLanguage.value.map((value) => {
            let ukImg = ["United Kingdom- English",]
            let selectImg = ["United States- English"]
            let img = ""
            if (ukImg.includes(value)) {
                img = UK_Flag
            }
            else if (selectImg.includes(value)) {
                img = US_Flag
            }
            else {
                img = Sri_Lanka_Flag
            }

            let obj = { label: value, value: value, extra: { image: img } }

            if (selectImg.includes(value)) {
                selectedCountry = obj
            }
            countryOptions.push(obj)
            return countryOptions
        })
        this.setState({ countryOptions, selectedCountry })
    }
    render() {
        let { countryOptions, selectedCountry } = this.state
        let { path } = this.props
        const customStyles = () => ({
            control: (styles) => ({
                ...styles,
            }),
            menu: (base) => ({
                ...base,
                background: "#FFF",
                color: "#000"
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            option: (base, { data, isDisabled, isFocused, isSelected }) => {
                return {
                    ...base,
                    backgroundColor: isSelected ? "#DD3B96" : "#fff",
                };
            }

        });

        return <div className='page-setup'>
            <div className='language-select'>
                <div className='row mx-0'>
                    <div className='col-md-3 col-sm-3 col-xs-3'></div>
                    <div className='col-md-6 col-sm-6 col-xs-6'>
                        <div className='form-group'>
                            <label className='input-style label-center'>Select Language</label>
                            <DropDown
                                selectedOption={selectedCountry}
                                onChange={(e) => {
                                    this.setState({
                                        selectedCountry: e
                                    })
                                }}
                                options={countryOptions}
                                isDisabled={false}
                                isMulti={false}
                                placeholder={"placeHolder"}
                                styles={customStyles()}
                                formatOptionLabel={function ({ value, label, extra }) {
                                    let showTickIcon = false
                                    if (selectedCountry) {
                                        let select_val = selectedCountry.value;
                                        if (select_val === value) {
                                            showTickIcon = true
                                        }
                                    }

                                    return <div style={{ display: "flex", }}>
                                        <div style={{ width: 30 }}>
                                            <img style={{ width: 25, height: 25, }} src={extra.image} alt={""}/>
                                        </div>
                                        <div style={{ flex: 1, fontSize: 18, fontWeight: 300, color: showTickIcon ? "#FFFFF1" : "#333333" }}>{label}</div>
                                        {showTickIcon && <div style={{ width: 20 }}>
                                            <img data-testid={`tick-icon-${value}`} style={{ width: 20, height: 20 }} src={TickImg} alt={""}/>
                                        </div>}

                                    </div>;
                                }}
                                pageType={"language"}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='language-select-button'>
                <div className='mx-0 row'>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5' ></div>
                    <div className='text-center col-sm-4 col-xs-6 col-md-2 col-lg-2 col-xl-2' >
                        <div className='language-btn-style btn-max-width' onClick={() => {
                            this.props.history.push(path + "/create-account")
                        }}>Continue</div>
                    </div>
                    <div className='col-sm-4 col-xs-3 col-md-5 col-lg-5 col-xl-5' ></div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(LanguageScreen)