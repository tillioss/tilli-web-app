import React from "react";
import MyConstant from "../config/MyConstant";
import LanguageSelect from "../Screens/LanguageSelect";
import { connect } from 'react-redux';
import { doConnect } from "../config/Common";





class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            innerPageData: false
        }
        this.onChangeData = this.onChangeData.bind(this)

    }

    async componentDidMount() {



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

   async Logout() {


        let postJson = { sessionId: '1223', userId: localStorage.getItem("loggedUserId") };
        console.log('logout=>', postJson)
        let that = this;
        let responseData = await doConnect("logout", "POST", postJson);

        //removed choosecheckboxselected 
        localStorage.removeItem("0_selectedData");
        localStorage.removeItem("loggedUserId");
        if (window.location.href.match(/lego/)) {
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego')
        }
        else {
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/')
        }
        //window.location='/'+MyConstant.keyList.projectUrl
        // localStorage.clear();


    }


    onChangeData(e) {
        //alert(e)

    }
    render() {

        const { innerPageData } = this.state;
        return (<React.Fragment>
            <div className="row ml-0 mt-5" style={{ borderStyle: "solid", borderColor: "black" }}>
                <div className="col-12">{this.return_content(6, 2)}</div>
                <LanguageSelect onChange={this.onChangeData} ParentPage={"Profile"} />
            </div>

            <div className="row ml-0 mt-3" style={{}}>
                <div className="col-1"> </div>
                <div className="col-10">
                    <button style={{ borderColor: '#18191F', borderRadius: 10 }} type="submit" onClick={() => {
                        this.Logout()
                    }}> {this.return_content(6, 1)} </button>

                </div>
                <div className="col-1"> </div>
            </div>
        </React.Fragment>)
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);


