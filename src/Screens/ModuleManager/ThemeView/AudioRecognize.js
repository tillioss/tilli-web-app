import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
var SupportedBrowser = !SpeechRecognition.browserSupportsSpeechRecognition()

const AudioRecognize = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    useEffect(() => {
        console.log(transcript)
        if(transcript !== "") {
            props.setRecord(transcript)
        }
    }, [transcript]);

    return props.children
}
export default AudioRecognize;