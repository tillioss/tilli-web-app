import React from 'react';
import MyConstant from '../../config/MyConstant';


export default class GodotRedirect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectPage: false
        }

    }

    async componentDidMount() {
        let getGameInfo = await localStorage.getItem("gameStatusInfo");
        let redirectPage = false
        if (getGameInfo) {
            getGameInfo = JSON.parse(getGameInfo);
            console.log("getGameInfo", getGameInfo)
            if (getGameInfo && Object.keys(getGameInfo).length > 0) {
                redirectPage = true
                let { gameIsEnd, } = getGameInfo;
                if (gameIsEnd === false) {
                    let { id, levelIndex, progressingLevel, nextModuleIndex } = getGameInfo;
                    // let { match } = this.props;
                    // let { params } = match;
                    // let { gameIndex } = params;
                    localStorage.setItem("d_theme_gameIndex", nextModuleIndex)
                    this.props.history.push(`/+${MyConstant.keyList.projectUrl}+/module-manage/+${id}/${levelIndex}/${progressingLevel}`)
                    ///${gameIndex}
                }
                else {
                    localStorage.setItem("d_theme_gameIndex", "")
                    this.props.history.push('/' + MyConstant.keyList.projectUrl + "/home/")
                }
            }
        }
        this.setState({ redirectPage })
    }

    render() {
        let { redirectPage } = this.state
        return (<>
            {redirectPage ? <> ...</> : <> Some thing went wrong ...</>}
        </>)
    }
}
