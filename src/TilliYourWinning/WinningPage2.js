import React from 'react'
import surface1 from '../images/surface1.png'
import Group1849 from '../images/Group1849.png'
import sun from '../images/sun.png'
import AvengerImage from '../images/AvengerImage.png'
import ChampionImage from '../images/ChampionImage.png'
import NinjaImage from '../images/NinjaImage.png';
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';
import { checkNullAndReturnString } from "../config/Common";
import Rocket_Launch from '../images/Rocket_Launch.gif'





class WinningPage2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceHeight: window.innerHeight,
        }
    }

    return_content(index) {
        var pageIndex = 9
        const { innerGroupLanguageMappingData, innnerGroupLanguageBaseData } = this.props
        if (checkNullAndReturnString(innerGroupLanguageMappingData) && checkNullAndReturnString(innerGroupLanguageMappingData[pageIndex]) && checkNullAndReturnString(innerGroupLanguageMappingData[pageIndex].fieldData[index])) {
            return innerGroupLanguageMappingData[pageIndex].fieldData[index].value
        }
        else if (checkNullAndReturnString(innnerGroupLanguageBaseData) && checkNullAndReturnString(innnerGroupLanguageBaseData[pageIndex]) && checkNullAndReturnString(innnerGroupLanguageBaseData[pageIndex].fieldData[index])) {
            return innnerGroupLanguageBaseData[pageIndex].fieldData[index].value
        }

        else
            return ""
    }

    componentDidMount() {
        // console.log(this.props.innerGroupLanguageMappingData)
        // console.log(this.props.innnerGroupLanguageBaseData)
        window.scrollTo(0, 0);
        window.addEventListener('resize', this.handleResize)
    }

    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });


    render() {
        let { PercentageTotal, totalPoint, scoreCurrentStage, moduleJson } = this.props
        let { deviceHeight } = this.state

        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {

        }
        else {
            var elements = document.getElementsByClassName('mobile-responsive'); // get all elements
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height = "auto"
            }
        }
        if (!moduleJson) {
            return false
        }
        var currentJson = moduleJson.stages[scoreCurrentStage - 1]

        let playingSubmitText = this.return_content(3)
        let playingBodyText = this.return_content(4)
        let PlayingImage = Group1849
        if (totalPoint < 800) {
            playingSubmitText = this.return_content(3)
            playingBodyText = this.return_content(4)
            PlayingImage = Group1849
        }
        else if (totalPoint < 1200) {
            playingSubmitText = this.return_content(5)
            playingBodyText = this.return_content(6)
            PlayingImage = NinjaImage
        }
        else if (totalPoint < 2400) {
            playingSubmitText = this.return_content(7)
            playingBodyText = this.return_content(8)
            PlayingImage = AvengerImage
        }
        else if (totalPoint >= 2400) {
            playingSubmitText = this.return_content(9)
            playingBodyText = this.return_content(10)
            PlayingImage = ChampionImage
        }

        // console.log("moduleJson", moduleJson, scoreCurrentStage)

        let contentFetch = this.return_content(2)

        let DataPushArray = []
        if (moduleJson && moduleJson.stages) {

            let countData = 0
            moduleJson.stages.map((kval, k) => {
                if (kval.theme === "StoryCard" && !kval.demoPage) {
                    var imageChange = surface1
                    if (kval.storyPoints || kval.storyPoints === 0) {
                        var filterJson = kval.content.filter((mval) => { return (mval.theme === "DropToSelection") ? true : false
                    })
                        if (filterJson) {
                            imageChange = MyConstant.keyList.apiURL + 'vp?action=module&key=' + (filterJson[0]?.content.image.fileName || "") + '&id=' + (filterJson[0]?.content.image.fileType || "")
                        }

                    }

                    countData++
                    DataPushArray.push(<div className="col-3 col-sm-3 mb-3" key={k.toString()}
                        style={{ marginLeft: "8%", marginTop: "5%" }}>
                        <div className="" style={{ width: 85, height: 85, }}>
                            <div data-testid={`stage-point-${k}`} style={{
                                backgroundColor: kval.storyPoints || kval.storyPoints === 0 ? "#D6FCF7" : "#9FA4B4", border: "2px solid black", borderRadius: 24, width: "80px", height: "80px",
                                paddingTop: kval.storyPoints ? 10 : 15
                            }} onClick={() => {
                                if (scoreCurrentStage === k) {
                                    this.props.scorePointMove()
                                }

                            }}>

                                <img src={kval.storyPoints || kval.storyPoints === 0 ? imageChange : scoreCurrentStage === k ? sun : imageChange} style={{ width: 50, height: 45 }} alt={""} />

                                {kval.storyPoints || kval.storyPoints === 0 ? <div style={{ fontSize: 10, fontWeight: "700" }}> {kval.storyPoints} Points </div> : ""}
                            </div>
                            <div className=""

                                style={{ paddingTop: 10, color: "#474A57", fontSize: "12px" }}> {contentFetch} {countData}</div>
                        </div>
                    </div>)
                }

                return DataPushArray
            })

        }



        return (<>
            <div className="row ml-0">
                <div className="col-12 col-sm-12 mt-4">
                    <h2 style={{ width: "284px", height: "40px", fontSize: "36px", display: "contents", alignItems: "center", justifyContent: "center" }}>{this.return_content(1)}</h2>
                </div>
            </div>



            <div className="row" style={{ padding: 10, }}>
                {DataPushArray}
            </div>

            {moduleJson.stages.length === scoreCurrentStage ?
                <>
                    <div style={{ width: "90%", height: "auto", backgroundColor: "#FFBD12", marginLeft: "5%", marginTop: "5%", border: "2px solid black", borderRadius: 24, paddingBottom: "5%" }}>

                        <div className="row ml-0" style={{ display: "flex", alignItems: "center" }}>
                            <div className="col-7 col-sm-6">
                                <p style={{
                                    fontSize: "24px", fontWeight: "900",marginTop: "10%"
                                    , fontFamily: "montserrat-medium"
                                }}>{playingBodyText}</p>
                            </div>
                            <div className="col-5 col-sm-6">
                                <img src={PlayingImage} style={{ width: "100px", height: "97px", marginTop: "10%" }} alt={""}/>
                            </div>

                            <div className="col-8 col-sm-6" onClick={() => {
                                this.props.scorePointMove("try-again")
                            }} >
                                <div style={{ color: "white", backgroundColor: "black", borderRadius: 24, paddingTop: "0px", cursor: "pointer" }}><p style={{
                                    fontSize: "12px", marginTop: "5%", fontWeight: "900px", padding: "10px 16px",
                                    fontFamily: "montserrat-medium"
                                }}>{playingSubmitText} </p></div>
                            </div>
                            <div className="col-4 col-sm-6" />

                        </div>
                    </div>
                </> : null}

            <div className="row mt-2 mb-2 pt-4"
                style={moduleJson.stages.length !== scoreCurrentStage ? {
                    position: deviceHeight < 700 ? "" : "absolute",
                    bottom: deviceHeight - deviceHeight
                } : {}} >
                <div className="col-12 col-sm-12" style={{ width: "80%", marginLeft: "3%" }}>
                    {totalPoint > 0 && currentJson && currentJson.storyPoints > 0 ? <span>
                        <img data-testid="rocket-image" className="rocket-image" src={Rocket_Launch} style={{
                            width: 80, height: 60,
                        }} alt={""} />
                    </span> : null}

                    <span data-testid="points-earned" style={{
                        fontFamily: "montserrat-medium", fontSize: 12, fontWeight: 800
                        , color: "#18191F"
                    }}> {totalPoint}  {this.return_content(11)}</span>

                    <div className="progress mb-2">
                        <div data-testid="progress-bar" className="progress-bar" role="progressbar" aria-valuenow={PercentageTotal}
                            aria-valuemin="0" aria-valuemax="100" style={{
                                width: PercentageTotal + "%",
                                backgroundColor: '#61E4C5', borderRadius: "16px",
                                border: PercentageTotal ? "1px solid black" : ""
                            }}>
                        </div>
                    </div>

                </div>
            </div>
        </>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(WinningPage2);
