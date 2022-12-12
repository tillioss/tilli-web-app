import React from 'react';
import { connect } from 'react-redux';
import { fetchGetLanguageMapping, fetchGetLevelNameLanguageMapping } from '../redux/actions/languageActions';
import { doConnect } from '../config/Common';


class LanguageSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: { label: "Select", value: "Select " },
            optionsData: []
        }
    }



    componentDidMount() {
        //back ground color change ...
        document.body.style.backgroundColor = "white";
        this.getLanguageList();
    }

    checklanguageChoose() {
        let { optionsData } = this.state;
        let getEnglishDetails = optionsData.filter((key) => { return key.label.toLowerCase() === "english" })
        if (!localStorage.getItem("ChooseLanguage")) {
            if (getEnglishDetails.length > 0) {
                this.getLangugeBaseData(getEnglishDetails[0])
            }
        }
    }


    async getLanguageList() {
        const { optionsData } = this.state;
        let postJson = { sessionId: '1223' };
        let responseData = await doConnect("getLanguages", "POST", postJson);
        let datavalue = JSON.parse(responseData.response)
        Object.keys(datavalue).map(ival => {
            optionsData.push({ label: datavalue[ival], value: ival })
            return true
        })
        // selectedOption.push({label:"",value:""})
        this.setState({ "languagesData": JSON.parse(responseData.response), optionsData }, () => {
            this.checklanguageChoose()
        })
    }



    async getLangugeBaseData(e) {
        console.log("this get call")
        localStorage.setItem("currentLanguage", e.value)
        localStorage.setItem("ChooseLanguage", JSON.stringify(e))

        let postJson = { grouptype: "outerPageGroup", languageId: e.value, sessionId: "1223" };
        this.props.fetchGetLanguageMappingData(postJson)

        let postJson_2 = { grouptype: "innerPageGroup", languageId: e.value, sessionId: "1223" };
        this.props.fetchGetLanguageMappingData(postJson_2)

        let postJson_3 = { languageId: e.value, sessionId: "1223" }
        this.props.fetchGetLevelNameLanguageMapping(postJson_3)

        let postJson_4 = { grouptype: "commonPageGroup", languageId: e.value, sessionId: "1223" };
        this.props.fetchGetLanguageMappingData(postJson_4)

    }
    render() {
        let { optionsData } = this.state;
        let viewcontent = []
        optionsData.map((ival, indexvalue) => {
            viewcontent.push(<div className="col-4" id={indexvalue} key={indexvalue} onClick={(e) => {
                e.preventDefault()

                this.getLangugeBaseData(optionsData[e.target.id])
            }} >{ival.label} </div>)
            return true
        })

        return (
            <React.Fragment >
                <div className="container" >
                    <div className="row mx-0">
                        <div className="col-12">
                            <div id="main-menu">
                                <i className="fa fa-language leftalign" aria-hidden="true" id="imgmenu" style={{ color: "black" }}  ></i>
                                <div className="card imghoverdiv" >
                                    <div className="row">
                                        {viewcontent}
                                    </div>
                                </div>
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
        outerGroupLanguageMappingData: state.languageReducer.outerGroupLanguageMappingData,
        outerGroupLanguageBaseData: state.languageReducer.outerGroupLanguageBaseData,
        innnerGroupLanguageBaseData: state.languageReducer.innnerGroupLanguageBaseData,
        innerGroupLanguageMappingData: state.languageReducer.innerGroupLanguageMappingData,
        commonGroupLanguageMappingData: state.languageReducer.commonGroupLanguageMappingData,
        commonGroupLanguageBaseData: state.languageReducer.commonGroupLanguageBaseData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetLanguageMappingData: (postJson) => dispatch(fetchGetLanguageMapping(postJson)),
        fetchGetLevelNameLanguageMapping: (postJson) => dispatch(fetchGetLevelNameLanguageMapping(postJson))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);


