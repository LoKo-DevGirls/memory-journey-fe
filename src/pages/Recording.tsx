import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Recording.module.scss';
// https://github.com/chengsokdara/use-whisper
import { useWhisper } from '@chengsokdara/use-whisper';

axios.defaults.baseURL = import.meta.env.VITE_BE_URL;

function Recording() {
  const {
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    streaming: true,
    removeSilence: true,
  })
  
  const [transcriptedText, setTranscriptedText] = useState('')

  const onSubmitButtonClick = () => {
    // console.log('Recorded audio:',transcript.blob)
    postTranscriptedText(transcriptedText);
  }

  const postTranscriptedText = (text: string) => {
    axios
      .post('memory',{
        content: text
      })
      .then((response) => {
        console.log('response: ', response)
        // TODO: redirect to Submit result page
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.recordingContainer}>
      <input
        type='text'
        className={styles.text}
        defaultValue={transcript.text}
        onChange={e => setTranscriptedText(e.target.value)}
      />
      
      <div className={styles.buttonsContainer}>
        <div>
          <button onClick={() => startRecording()}>Start</button>
          <button onClick={() => pauseRecording()}>Pause</button>
          <button onClick={() => stopRecording()}>Stop</button>
        </div>
        <button
          type='submit'
          disabled={!transcript.text}
          onClick={() => onSubmitButtonClick()}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Recording