import React from 'react'

import shuffleImage from '../images/shuffle.png';
import rewindImage from '../images/rewind.png';
import repeatImage from '../images/repeat.png';
import fastForwardImage from '../images/fastForward.png';
import outlineIconOnlyImage from '../images/outlineIconOnly.png';
import nounVoiceRecordImage from '../images/nounVoiceRecord.png';
import heartImage from '../images/heart.png';
import DropDown from "./DropDown";


import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
const AudioRecognize1 = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <div>Not supported</div>
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <button onClick={ () => {
                        SpeechRecognition.startListening({ language: props.laSelect.value,continuous: true, })
                    }}>Start</button>
                </div>
                <div className="col-sm-4">
                    <button onClick={()=>{
                        console.log("stop");
                       SpeechRecognition.stopListening({ continuous: false })
                    }}>Stop</button>
                </div>
                <div className="col-sm-4">
                    <button onClick={resetTranscript}>Reset</button>
                </div>

            </div>
            <div className="row">
                <div className="col-sm-1"> </div>
                <div className="col-sm-10">  <p>{transcript}</p> </div>
                <div className="col-sm-1"> </div>
            </div>
        </>
    )
}

class AudioRecognize extends React.Component {


    constructor(props) {
        super(props)
        this.state = { bg_color: "#FFBD12", laSelect: { label: "English", value: "en" } }
    }

    onChangeData(value) {
        console.log("value", value)
        this.setState({ laSelect: value })
    }
    render() {
        let { laSelect } = this.state
        return (<>
            <div> Audio Recognize  </div>
            <div className="row mt-3 mb-3">
                <div className="col-sm-1"> </div>
                <div className="col-sm-3 mt-2">  Select </div>
                <div className="col-sm-4">
                    <DropDown
                        options={[{ label: "English", value: "en" }, { label: "Tamil", value: "ta" },
                        { label: "Sinhala", value: "si" }, { label: "Turkish", value: "tu" }]}
                        value={[]}
                        onChange={(value) => this.onChangeData(value)}
                    /> </div>
                <div className="col-sm-4"> </div>
            </div>
            <div>  <AudioRecognize1 laSelect={laSelect} /></div></>)
        // const { bg_color } = this.state;


        // return (<React.Fragment>
        //     <div className="row">
        //         <div className="col-1">  </div>
        //         <div className="col-10" style={{
        //             height: 357,
        //             marginTop: 40,
        //             marginLeft: 32,
        //             marginRight: 16,
        //             backgroundColor: bg_color,
        //             borderWidth: 2,
        //             borderColor: '#18191F',
        //             boxSizing: 'border-box',
        //             borderRadius: 16,
        //             alignItems: 'center',
        //             justifyContent: 'center', borderStyle: 'solid'
        //         }}>
        //             {/* FF89BB */}

        //             <p style={{
        //                 fontFamily: 'montserrat-medium',
        //                 fontWeight: '500',
        //                 fontSize: 27,
        //                 lineHeight: 12,
        //                 textAlign: 'center',
        //                 color: '#FFFFFF',
        //                 marginTop: 20
        //             }}> asdfsd</p>

        //         </div>
        //         <div className="col-1"> </div>

        //     </div>


        //     <div className="row mt-4">
        //         <div className="col-10"> </div>
        //         <div className="col-2"> <img src={heartImage} style={{ width: 32, height: 30 }} /> </div>
        //     </div>

        //     <div className="row mt-4">
        //         <div className="col-1"> </div>

        //         <div className="col-2" >
        //             <img src={shuffleImage} style={{ width: 42, height: 40 }} />

        //         </div>

        //         <div className="col-2">
        //             <img src={rewindImage} style={{ width: 42, height: 40 }} />
        //         </div>


        //         <div className="col-2" onClick={() => {
        //             if (bg_color == '#FF89BB') {
        //                 this.setState({ bg_color: '#FFBD12' })
        //             }
        //             else {
        //                 this.setState({ bg_color: '#FF89BB' })
        //             }

        //         }}>
        //             <img src={outlineIconOnlyImage} style={{ width: 42, height: 40 }} />
        //             <img src={nounVoiceRecordImage} style={{ width: 42, height: 40, marginTop: "-84%" }} />

        //         </div>


        //         <div className="col-2"><img src={fastForwardImage} style={{ width: 42, height: 40 }} /> </div>

        //         <div className="col-2"> <img src={repeatImage} style={{ width: 42, height: 40 }} />   </div>

        //         <div className="col-1"> </div>

        //     </div>

        // </React.Fragment>)
    }
}

export default AudioRecognize
