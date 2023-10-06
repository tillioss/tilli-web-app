import React, { Component } from 'react';
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';
import Back_Button from '../images/Back_Button.png'
import YogaCat from '../images/Yoga_Cat.png';
import BubblePopping from '../images/Bubble_Popping.png';
import RainbowBreathing from '../images/RainbowBreathing.png';
import Water from '../images/Water.png';
import Hug from '../images/Hug.png';
import emptyLogo from '../images/Group2065.png';
import emptyemoji from '../images/empty.png';
import coloring from '../images/coloring.png';
import scaredEmoji from '../images/scaredEmoji.png';
import sadEmoji from '../images/sadEmoji.png';
import surprisedEmoji from '../images/surprisedEmoji.png';
import disgustedEmoji from '../images/disgustedEmoji.png';
import angryEmoji from '../images/angryEmoji.png';
import happyEmoji from '../images/happyEmoji.png';
import { doConnect } from "../config/Common";


var activityData = [{ label: "Self Hug", image: Hug, value: "SelfHugActivity" },
{ label: "Water Drinking", image: Water, value: "WaterDrinkingActivity" },
{ label: "Bubble Pop", image: BubblePopping, value: "BubblePopActivity" },
{ label: "Rainbow Breathing", image: RainbowBreathing, value: "RainbowActivity" },
{ label: "Yoga", image: YogaCat, value: "YogaActivity" },
{ label: "Colouring", image: coloring, value: "ColoringActivity" }]

var emotionsData = [
    { label: "Happy", value: "happy", image: happyEmoji },
    { label: "Sad", value: "sad", image: sadEmoji },
    { label: "Angry", value: "angry", image: angryEmoji },
    { label: "Surprised", value: "surprised", image: surprisedEmoji },
    { label: "Scared", value: "scared", image: scaredEmoji },
    { label: "Disgusted", value: "disgusted", image: disgustedEmoji },
    { label: "", value: "empty", image: emptyemoji },
]
class TrackProgressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabTxt: "likes",
            listData: {},
            loopLikedCount: 3,
            loopLikedArr: [],
            loopNeutralCount: 3,
            loopNeutralArr: [],
            loopDislikedCount: 3,
            loopDislikedArr: [],
            emojiData: [],
            emptyEmojiCount: 7,
            latestEmotion: [],
            userLoginId: "",
            levelId: "1f458dea-3f9c-4dba-9ed8-d5c0b17848af",
            themeId: "5629453e-aa4f-4df0-a42c-dcd1ba03950a"
        }
    }

    componentDidMount() {


        let loginId = localStorage.getItem("loggedUserId");
        this.setState({ userLoginId: loginId }, () => {
            this.feedBackList()
            this.getEmotionDataCapture()
        })
    }

    async feedBackList() {
        let { userLoginId, levelId, loopLikedCount, loopNeutralCount, loopDislikedCount, themeId } = this.state;
        var postJson = {
            "userId": userLoginId,
            "levelId": levelId,
            "themeId": themeId
        }
        console.log(postJson)

        let responseData = await doConnect("getfeedbackCaptureList", "POST", postJson);
        if (responseData) {
            let count = loopLikedCount - Object.keys(responseData.response.liked).length
            let loopLikedArr = []
            for (let i = 0; i < count; i++) {
                loopLikedArr.push(i)
            }
            let countNeutral = loopNeutralCount - Object.keys(responseData.response.neutral).length
            let loopNeutralArr = []
            for (let i = 0; i < countNeutral; i++) {
                loopNeutralArr.push(i)
            }

            let countDisliked = loopDislikedCount - Object.keys(responseData.response.disliked).length
            let loopDislikedArr = []
            for (let i = 0; i < countDisliked; i++) {
                loopDislikedArr.push(i)
            }
            this.setState({ listData: responseData.response, loopLikedCount: count, loopLikedArr: loopLikedArr, loopNeutralArr: loopNeutralArr, loopNeutralCount: countNeutral, loopDislikedArr: loopDislikedArr, loopDislikedCount: countDisliked })
        }

    }
    async getEmotionDataCapture() {
        let { userLoginId, levelId, emptyEmojiCount, themeId } = this.state;
        var postJson = {
            "userId": userLoginId,
            "levelId": levelId,
            "themeId": themeId
        }
        let responseData = await doConnect("getEmotionCaptureList", "POST", postJson);
        let emojiData = responseData.response
        let emotionsCount = emptyEmojiCount - emojiData.length
        let emptyArr = []
        for (let i = 0; i < emotionsCount; i++) {
            emptyArr.push("empty")
        }
        let LatestEmoji = [...emojiData, ...emptyArr]
        let latestEmoFilter = emotionsData.filter((e) => {
            return e.value === LatestEmoji[0]
        })
        this.setState({ emojiData: LatestEmoji.reverse(), emptyEmojiCount: emotionsCount, latestEmotion: latestEmoFilter })

    }
    render() {
        let { tabTxt, listData,loopLikedArr, loopNeutralArr, loopDislikedArr, emojiData, latestEmotion } = this.state
        return (
            <React.Fragment>
                <div className='trackProgBody'>
                    <div className='emotionChat'>
                       <div className='headers mt-2'>
                            <div className='d-flex justify-content-start backbtn ml-3' style={{ width: '10%' }}>
                                <img src={Back_Button} style={{ width: '50px' }} onClick={() => { this.props.history.push('/' + MyConstant.keyList.projectUrl + '/newparentsscreen') }} alt=""/>
                            </div>
                            <div className='d-flex justify-content-center mt-2 mx-4 headtext' style={{ width: '68%' }}>
                                <h3 className='headerStr'>Track Progress</h3>
                            </div>
                        </div>

                        <div className='emotionChatBoxContainer d-flex justify-content-center align-items-center'>
                            <div className='emotionChatBox'>
                                <div className='containerOne'>
                                    <p className='headingemotion'>Emotion Chart </p>
                                </div>
                                <p className='mt-1 latestemotionText'>Latest Emotion :</p>
                                {latestEmotion.length > 0 && latestEmotion[0].value !== "empty" && <>
                                    <div className='emojicontainer'>
                                        <img src={latestEmotion[0].image} style={{ width: '100px' }} className='emotion_emoji' alt=""/>
                                    </div>
                                    <p className='emotionType'>{latestEmotion[0].label}</p>
                                </>
                                }
                                <div className='latestemotions'>
                                    <div className='emo_box'><p className='emotionscheck mt-1'>Last 7 Emotion Check Ins: </p></div>
                                    <div className='emotions_list mt-4 py-3'>
                                        {emojiData.map((emojies) => {
                                            var emojiSeven = emotionsData.filter((e) => {
                                                return emojies === e.value
                                            })
                                            return <img src={emojiSeven[0].image} style={{ width: '37px' }} className='mx-1 latestseven_Emoji' alt=""/>
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='strategies'>
                        <div className='container_strategies'>
                            <div className="tabs">
                                <div className={`tab ${tabTxt === "likes" ? "active" : ""}`} onClick={(e) => { this.setState({ tabTxt: "likes" }) }}>LIKES</div>
                                <div className={`tab ${tabTxt === "neutral" ? "active" : ""}`} onClick={(e) => { this.setState({ tabTxt: "neutral" }) }}>NEUTRAL</div>
                                <div className={`tab ${tabTxt === "dislikes" ? "active" : ""}`} onClick={(e) => { this.setState({ tabTxt: "dislikes" }) }}>DISLIKES</div>
                            </div>
                            {tabTxt === "likes" &&
                                <div className='stg_games'>
                                    <div className='mt-1 gmHeader'>
                                        <p className='ABCDE_Strategies_Txt'>
                                            ABCDE Strategies that help your child
                                        </p>
                                    </div>
                                    {listData.liked && Object.keys(listData.liked).map((e) => {
                                        let { activity, count } = listData.liked[e];
                                        let imgFilter = activityData.filter((e) => {
                                            return e.value.toLowerCase() === activity
                                        })
                                        return <div className='ABCDE_Strategies_games'>
                                            <img src={imgFilter[0].image} style={{ width: '60px' }} className='mx-2' alt=""/>
                                            <div className='gameTitle mx-3'>
                                                <div className='gameName mt-1'>{imgFilter[0].label}</div>
                                                <div className='gameLikes'>Likes : {count}</div>
                                            </div>
                                        </div>
                                    })}
                                    {
                                        loopLikedArr.map((e) => {
                                            return <div className='ABCDE_Strategies_games'>
                                                <img src={emptyLogo} style={{ width: '60px' }} className='mx-2' alt=""/>
                                                <div className='gameTitle mx-3'>
                                                    <div className='gameName mt-1'>Not Applicable</div>
                                                    <div className='gameLikes'>Likes: 0</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                            {tabTxt === "neutral" &&
                                <div className='stg_games'>
                                    <div>
                                        <p className='ABCDE_Strategies_Txt mt-1'>
                                            ABCDE Strategies that sometimes help
                                        </p>
                                    </div>
                                    {listData.neutral && Object.keys(listData.neutral).map((e) => {
                                        let { activity, count } = listData.neutral[e];
                                        let imgFilter = activityData.filter((e) => {
                                            return e.value.toLowerCase() === activity
                                        })
                                        return <div className='ABCDE_Strategies_games'>
                                            <img src={imgFilter[0].image} style={{ width: '60px' }} className='mx-2' alt=""/>
                                            <div className='gameTitle mx-3'>
                                                <div className='gameName mt-1'>{imgFilter[0].label}</div>
                                                <div className='gameLikes'>Neutral : {count}</div>
                                            </div>
                                        </div>
                                    })}
                                    {
                                        loopNeutralArr.map((e) => {
                                            return <div className='ABCDE_Strategies_games'>
                                                <img src={emptyLogo} style={{ width: '60px' }} className='mx-2' alt=""/>
                                                <div className='gameTitle mx-3'>
                                                    <div className='gameName mt-1'>Not Applicable</div>
                                                    <div className='gameLikes'>Neutral: 0</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                            {tabTxt === "dislikes" &&
                                <div className='stg_games'>
                                    {listData.disliked && Object.keys(listData.disliked).map((e) => {
                                        let { activity, count } = listData.disliked[e];
                                        let imgFilter = activityData.filter((e) => {
                                            return e.value.toLowerCase() === activity
                                        })
                                        return <div className='ABCDE_Strategies_games'>
                                            <img src={imgFilter[0].image} style={{ width: '60px' }} className='mx-2' alt=""/>
                                            <div className='gameTitle mx-3'>
                                                <div className='gameName mt-1'>{imgFilter[0].label}</div>
                                                <div className='gameLikes'>Disliked : {count}</div>
                                            </div>
                                        </div>
                                    })}
                                    {
                                        loopDislikedArr.map((e) => {
                                            return <div className='ABCDE_Strategies_games'>
                                                <img src={emptyLogo} style={{ width: '60px' }} className='mx-2' alt=""/>
                                                <div className='gameTitle mx-3'>
                                                    <div className='gameName mt-1'>Not Applicable</div>
                                                    <div className='gameLikes'>Disliked: 0</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackProgressScreen);

