import React from "react";
import MyConstant from "../config/MyConstant";
import LanguageSelect from "../Screens/LanguageSelect";
import { doConnect } from "../config/Common";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            innerPageData: false
        }
        this.onChangeData = this.onChangeData.bind(this)

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

    async Logout() {

        let postJson = { sessionId: '1223', userId: localStorage.getItem("loggedUserId") };
        console.log('logout=>', postJson)
        await doConnect("logout", "POST", postJson);
        //removed choosecheckboxselected 
        localStorage.removeItem("0_selectedData");
        localStorage.removeItem("loggedUserId");
        if (window.location.href.match(/lego/)) {
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego')
        }
        else {
            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/')
        }

    }

    onChangeData(e) {

    }
    render() {

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));


