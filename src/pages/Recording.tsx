import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Recording.module.scss';
// https://github.com/chengsokdara/use-whisper
import { useWhisper } from '@chengsokdara/use-whisper';

axios.defaults.baseURL = import.meta.env.VITE_BE_URL;

interface DreamForm {
  dreamText: string | any
  time: number
  feeling: number
  consciousness: number
}
// TODO: need to confirm
interface DensityScore {
  time: number
  feeling: number
  consciousness: number
}

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
  const [formResult, setFormResult] = useState<DreamForm>({
    dreamText: '',
    time: 0,
    feeling: 0,
    consciousness: 0,
  })
  const [densityScore, setDensityScore] = useState<DensityScore>({
    time: 0,
    feeling: 0,
    consciousness: 0
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isFormSelected, setIsFormSelected] = useState(false)
  const [selectedForm, setSelectedForm] = useState('voiceInput')

  const onSubmitButtonClick = () => {
    // console.log('Recorded audio:',transcript.blob)
    postTranscriptedText(transcriptedText);
  }

  const postTranscriptedText = (text: string) => {
    axios
      .post('memory', {
        content: text,
        consciousness: densityScore.consciousness,
        time: densityScore.time,
        feeling:  densityScore.feeling,
      })
      .then((response) => {
        const {
          content,
          time,
          feeling,
          consciousness
        } = response.data
        setFormResult({
          dreamText: content,
          time: time,
          feeling: feeling,
          consciousness: consciousness,
        })
        setIsFormSubmitted(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderSubmitResult = () => {
    const resetForm = () => {
      setIsFormSubmitted(false)
      setIsFormSelected(false)
      setFormResult({
        dreamText: '',
        time: 0,
        feeling: 0,
        consciousness: 0,
      })
      setDensityScore({
        time: 0,
        feeling: 0,
        consciousness: 0
      })
      setSelectedForm('')
      setTranscriptedText('')
    }
    // TODO: Copy update
    return (
      <div className={`${styles.container} ${isFormSubmitted ? styles.visible : styles.hidden}`}>
        <p><b>Success!</b></p>
        <p>submitted result: </p>
        <p>{formResult?.dreamText}</p>
        <br />
        <p>{densityScore?.time}</p>
        <p>{densityScore?.feeling}</p>
        <p>{densityScore?.consciousness}</p>

        <div>
          <button type='button' onClick={resetForm}>Try again</button>
        </div>
          <a href='/'>Back to home</a>
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
    const setFormType = (type: string) => {
      setIsFormSelected(true)
      setSelectedForm(type)
    }
    const handleChange = (e: any) => {
      setDensityScore({ ...densityScore, [e.target?.name]: e.target?.value });
    }

    return (
      <div className={`${styles.container} ${isFormSelected ? styles.hidden : styles.visible}`}>
        <p>Intro</p>
        <div className={styles.inputContainer}>
          <p>
            <label htmlFor="time">Time:</label>
            <input type="range" id="time" name="time" min="0" max="100" step="1" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="feeling">Feeling:</label>
            <input type="range" id="feeling" name="feeling" min="0" max="100" step="1" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="consciousness">Consciousness:</label>
            <input type="range" id="consciousness" name="consciousness" min="0" max="100" step="1" onChange={handleChange} />
          </p>

        </div>
        <div>
          <button onClick={() => setFormType('voiceInput')}>Speech</button>
          <button onClick={() => setFormType('textInput')}>Text</button>
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
