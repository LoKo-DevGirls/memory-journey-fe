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
  const [formResult, setFormResult] = useState({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isFormSelected, setIsFormSelected] = useState(false)
  const [isVoiceInput, setIsVoiceInput] = useState(false)

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
        // TODO: redirect to Submit result
        setFormResult(response)
        setIsFormSubmitted(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderSubmitResult = () => {
    // const {
    //   text,
    //   score
    // } = formResult
    const text = 'test'
    const score = [123, 456, 789]

    const resetForm = () => {
      setIsFormSubmitted(false)
      setIsFormSelected(false)
    }

    return (
      <div className={`${styles.container} ${isFormSubmitted ? styles.visible : styles.hidden}`}>
        <p><b>Success!</b></p>
        <p>submitted result: </p>
        <p>{text}</p>
        <p>{score}</p>

        <div>
          <button type='button' onClick={resetForm}>Try again</button>
          <a href='/'>Back to home</a>
        </div>
      </div>
    )
  }

  const renderForm = (isVoiceInput: boolean) => (
    <div className={`${styles.container} ${isFormSelected ? styles.visible : styles.hidden} ${isFormSubmitted ? styles.hidden : styles.visible}`}>
      <input
        type='text'
        className={styles.text}
        defaultValue={transcript.text}
        onChange={e => setTranscriptedText(e.target.value)}
      />
      
      <div className={styles.buttonsContainer}>
        <div className={styles.recordingController}>
          <button onClick={() => startRecording()}>Start</button>
          <button onClick={() => pauseRecording()}>Pause</button>
          <button onClick={() => stopRecording()}>Stop</button>
        </div>
        <button
          type='submit'
          disabled={!transcriptedText}
          onClick={() => onSubmitButtonClick()}
        >
          Submit
        </button>
      </div>
    </div>
  )
  
  const renderIntro = () => {
    return (
      <div className={`${styles.container} ${isFormSelected ? styles.hidden : styles.visible}`}>
        Intro
        <button onClick={() => setIsFormSelected(true)}>Select form</button>
      </div>
    )
  }

  return (
    <div className={`${styles.recordingContainer} ${styles.container}`}>
      {renderForm(isVoiceInput)}
      {renderIntro()}
      {renderSubmitResult()}
    </div>
  )
}

export default Recording
