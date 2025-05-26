import React from 'react';
import drag_drop from '../../images/drag_drop.png';
import DragAndDrop from './ThemeView/DragAndDrop';
import GroupedInput from './ThemeView/GroupedInput';
import LabelAnimation from './ThemeView/LabelAnimation';
import AudioRecognize from './ThemeView/AudioRecognize';
import SpeechRecognition from 'react-speech-recognition'


export default class ThemeViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: this.props.layersData,
            deviceHeight: "",
            deviceWidth: "",
            audioRecognize: "",
            recordText: "",
            loggedOrg_id: "",
            resetTextState: false
        }
        this.dynamicThemeAction = this.dynamicThemeAction.bind(this);
        this.setRecord = this.setRecord.bind(this);
    }

    async componentDidMount() {
        // let { themeId } = this.props.match.params;
        let height = this.mobile.clientHeight;
        let width = this.mobile.clientWidth;
        let loggedOrg_id = await localStorage.getItem("loggedOrg_id");

        this.setState({
            deviceHeight: height,
            deviceWidth: width,
            // themeId,
            loggedOrg_id,
        }, () => {
            // this.getLayers();
        })

    }


    dynamicThemeAction(layer, index) {
        let { stage, data } = this.props
        let { layers } = this.state;
        let action = layer.action;
        let visible;
        let hidden;
        let audioRecognize;
        let that = this;
        let themeName = data.theme;
        let themeType = data.themeType;
        let currentStageIndex = stage - 1;
        let apiPredict = data.apiPredict;
        let infoTheme = { themeName, themeType, chooseLayer: layer, layers: data.layers, stageIndex: currentStageIndex, layerIndex: index }
        if (data && typeof (data.dynamic) !== "undefined" && typeof (data.dynamic.record) !== "undefined") {
            infoTheme.speechText = data.dynamic.record.answer;
            infoTheme.userActionText = data.dynamic.record.answer
        }
        if (data && typeof (data.changeLayerIndex) !== "undefined") {
            infoTheme.changeLayerIndex = data.changeLayerIndex;
            infoTheme.changeLayer = data.changeLayer
            if (typeof (data.changeLayer.userActionText) !== "undefined" && data.changeLayer.userActionText !== "") {
                infoTheme.userActionText = data.changeLayer.userActionText
            }

            if (typeof (data.changeLayer.userTrackKey) !== "undefined" && data.changeLayer.userTrackKey !== "") {
                infoTheme.userTrackKey = data.changeLayer.userTrackKey
            }

            delete data.changeLayerIndex
            delete data.changeLayer
        }
        switch (action) {
            case "Next":
                if (typeof (layer.userActionText) !== "undefined" && layer.userActionText !== "") {
                    infoTheme.userActionText = layer.userActionText
                }
                if (typeof (infoTheme.userActionText) !== "undefined" && infoTheme.userActionText !== "" && typeof (apiPredict) !== "undefined" && apiPredict !== "") {
                    this.props.predictOnchange(apiPredict, infoTheme.userActionText)
                }

                if (typeof (layer.userTrackKey) !== "undefined" && layer.userTrackKey !== "") {
                    infoTheme.userTrackKey = layer.userTrackKey
                }

                that.captureDetails("Next", infoTheme)
                this.props.changeStage("Next", stage);
                break;
            case "Previous":
                this.props.changeStage("Previous", stage);
                break;
            case "Change Layout":
            case "Checked Layout":
                visible = layer.layers.visible;
                hidden = layer.layers.hidden;
                visible.map((row) => {
                    layers[row].visibility = "visible";
                    return visible
                })
                hidden.map((row) => {
                    layers[row].visibility = "hidden";
                    return hidden

                })
                data.changeLayerIndex = index;
                data.changeLayer = layer;
                that.captureDetails("Checked Layout", infoTheme)
                break;
            case "Record":
                visible = layer.layers.visible;
                hidden = layer.layers.hidden;
                audioRecognize = layer.layers.recordValue[0];
                visible.map((row) => {
                    layers[row].visibility = "visible";
                    return visible
                })
                hidden.map((row) => {
                    layers[row].visibility = "hidden";
                    return hidden
                })
                this.setState({
                    audioRecognize
                })
                break;
            case "Record Press":
                let btn = document.querySelector('#layer' + index)
                btn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("start");
                    that.onStartRecord()
                })

                btn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("end")
                    that.onStopRecord()

                })
                btn.addEventListener('touchleave', function () {
                    console.log('btn moving end');
                })
                btn.addEventListener('touchcancel', function () {
                    console.log('btn moving cancel');
                })

                //diff
                btn.addEventListener("mousedown", (e) => {
                    this.mouseEnterfunction()
                }, false);
                btn.addEventListener("mouseup", (e) => {
                    this.mouseMouseLeavefunction()
                }, false);
                break;
            case "Reset Text":
                let resetDiv = "layer" + layer.layers.resetText[0];
                if (resetDiv) {
                    document.getElementById(resetDiv).innerHTML = "";
                    this.setState({ recordText: "", resetTextState: true })
                }
                break;
            default:
        }

        this.setState({ layers }, () => {
            // if (action == "Next" && layers.length - 1 == index) {
            //     console.log("action-->", action)
            //     navigation.goBack()
            // } else if (action == "Previous" && index == 0) {
            //     console.log("<--action", action)
            //     navigation.push("/" + MyConstant.keyList.projectUrl + "/home")
            // }
        })
    }

    onStartRecord() {
        SpeechRecognition.startListening({
            language: "en",
            continuous: true,
        })
    }
    onStopRecord() {
        SpeechRecognition.stopListening({ continuous: false })
    }

    setRecord(text) {
        this.setState({recordText: text})
    }

    mouseEnterfunction() {
        var that = this
        that.onStartRecord()
    }

    mouseMouseLeavefunction() {
        var that = this
        that.onStopRecord()
    }
    layerBuildRecord(layer, index, recordText) {
        let builder;
        let { deviceHeight } = this.state;
        switch (layer.type) {
            case "rectangle":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: layer.borderRadius + "px",
                    }}
                    key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                    {recordText}
                </div>
                break;
            default:
        }

        return builder;
    }
    layerBuild(layer, index) {
        let builder;
        let { deviceHeight, deviceWidth } = this.state;
        switch (layer.type) {
            case "rectangle":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: layer.borderRadius + "px",
                    }}
                    key={index}
                    id={"layer" + index}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                </div>
                break;
            case "groupedInput":
                builder = <GroupedInput dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "labelAnimation":
                builder = <LabelAnimation dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "dragAndDrop":
                builder = <DragAndDrop dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "ellipse":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "px",
                        height: layer.height + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: layer.borderRadius + "px",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                </div>
                break;
            case "circle":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: parseInt((layer.radius / 100) * deviceWidth) + "px",
                        height: parseInt((layer.radius / 100) * deviceWidth) + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: "50%",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                </div>
                break;
            case "text":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        minHeight: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }}
                    key={index}
                    id={"layer" + index}
                    dangerouslySetInnerHTML={{ __html: layer.text }}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                </div>
                break;
            case "image":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                    <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} alt={""} />
                </div>
                break;
            case "video":
                builder = <div
                    className={`layer`}
                    data-testid={`layer-${index}`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {this.dynamicThemeAction(layer, index)}}
                >
                    <video style={{ width: "100%", height: "100%" }} >
                        <source src={layer.video ? layer.video : drag_drop} />
                    </video>
                </div>
                break;
            default:
        }
        return builder;
    }

    captureDetails(type, infoTheme,) {
        let { dynamicCaptureInfo } = this.props
        let { themeType, stageIndex } = infoTheme;
        dynamicCaptureInfo.themeType = themeType;

        if (typeof (infoTheme.changeLayer) !== "undefined") {
            infoTheme.changeLayer.layers.hidden.map((row) => {
                infoTheme.layers[row].visibility = "visible";
                return true
            })
            infoTheme.changeLayer.layers.visible.map((row) => {
                infoTheme.layers[row].visibility = "hidden";
                return true
            })
        }

        dynamicCaptureInfo.dynamic.dynamicThemes[stageIndex] = infoTheme;
    }
    render() {
        let { layers, audioRecognize, recordText, } = this.state;
        let { data } = this.props

        let audioFileFind = ""
        if (data && data.backgroundAudio && data.backgroundAudio !== "") {
            audioFileFind = data.backgroundAudio
        }

        return <div className="mobile-responsive tilli-web"
            ref={(e) => { this.mobile = e }}
            data-testid="theme-container"
        >
            <div className="dynamic-form"
                style={{ position: "relative", height: "100%" }}
            >

                {
                    layers.map((layer, index) => {
                        return audioRecognize === index ? <AudioRecognize resetTextState={this.state.resetTextState}
                            recordText={recordText}
                            updateResetText={() => {
                                this.setState({ resetTextState: false })
                            }}
                            setRecord={this.setRecord}>{this.layerBuildRecord(layer, index, recordText)}</AudioRecognize> : this.layerBuild(layer, index)
                    })
                }
            </div>
            {audioFileFind && audioFileFind !== "" && <div
                style={{ display: "none" }}
            >
                <audio controls autoPlay >
                    <source src={audioFileFind} type="audio/ogg" />
                    <source src={audioFileFind} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>}
        </div>;
    }
}
