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
  const [selectedForm, setSelectedForm] = useState('voiceInput')

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

  const renderForm = (selectedForm: string) => {
    const isVoiceInput = selectedForm === 'voiceInput';

    return (
      <div className={`${styles.container} ${isFormSelected ? styles.visible : styles.hidden} ${isFormSubmitted ? styles.hidden : styles.visible}`}>
        <input
          type='text'
          className={styles.text}
          defaultValue={transcript.text}
          onChange={e => setTranscriptedText(e.target.value)}
        />
        
        <div className={styles.buttonsContainer}>
          <div className={`${styles.recordingController} ${!isVoiceInput && styles.hidden}`}>
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
  }
  
  const renderIntro = () => {
    const setForm = (type: string) => {
      setIsFormSelected(true)
      setSelectedForm(type)
    }
    return (
      <div className={`${styles.container} ${isFormSelected ? styles.hidden : styles.visible}`}>
        <p>Intro</p>
        <div>
          <input type="range" />
          <input type="range" />
          <input type="range" />
        </div>
        <div>
          <button onClick={() => setForm('voiceInput')}>Speech</button>
          <button onClick={() => setForm('textInput')}>Text</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.recordingContainer} ${styles.container}`}>
      {renderIntro()}
      {renderForm(selectedForm)}
      {renderSubmitResult()}
    </div>
  )
}

export default Recording
