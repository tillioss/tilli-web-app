import React, {useEffect } from "react";
import { useSpeechRecognition } from 'react-speech-recognition'

const AudioRecognize = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    useEffect(() => {
        console.log(transcript)
        if (transcript !== "") {
            props.setRecord(transcript)
        }
    }, [transcript,props]);

    React.useEffect(() => {
        if (props.resetTextState) {
            console.log("reset-->")
            resetTranscript()
            props.updateResetText()
        }
    });

    return props.children
}
export default AudioRecognize;