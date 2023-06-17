import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useWhisper } from '@chengsokdara/use-whisper'

axios.defaults.baseURL = import.meta.env.VITE_BE_URL;

function Recoding() {
  const {
    recording,
    speaking,
    transcript,
    transcribing,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })
  
  const onSubmitButtonClick = () => {
    const transcriptedText = transcript.text || 'test'
    postTranscriptedText(transcriptedText);
  }

  const postTranscriptedText = (text: string) => {
    axios
      .post('memory',{
        content: text
      })
      .then((response) => {
        console.log('response: ', response)
    })
  }

  return (
    <div>
      <p>Recording: {recording}</p>
      <p>Speaking: {speaking}</p>
      <p>Transcripting: {transcribing}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>

      <button onClick={() => onSubmitButtonClick()} disabled={!transcript.text}>Submit</button>
    </div>
  )
}

export default Recoding