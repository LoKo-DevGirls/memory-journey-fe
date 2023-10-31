import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Recording.module.scss';
// https://github.com/chengsokdara/use-whisper
import { useWhisper } from '@chengsokdara/use-whisper';
import Loader from '../assets/icon/loader';
import Nav from '../Nav';

const baseUrl = import.meta.env.VITE_BE_URL;
axios.defaults.baseURL = `https://${baseUrl}`;

interface DreamForm {
  dreamText: string | any
  time: number
  feeling: number
  consciousness: number
}

interface DensityScore {
  time: number
  feeling: number
  consciousness: number
}

function Recording() {
  const {
    transcript,
    startRecording,
    stopRecording,
    recording,
    // speaking,
    // transcribing
  } = useWhisper({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    streaming: true, // TODO: turn off if we want to stop transcribing after sent
    timeSlice: 1_000,
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
  const [showLoader, setShowLoader] = useState(false)

  const onSubmitButtonClick = (isVoiceInput: boolean) => {
    // console.log('Recorded audio:',transcript.blob)
    setShowLoader(true);
    const data = isVoiceInput ? transcript.text : transcriptedText;
    postTranscriptedText(data);
  }

  const postTranscriptedText = (text: string | undefined) => {
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
        } = response.data.memory;
        setFormResult({
          dreamText: content,
          time: time,
          feeling: feeling,
          consciousness: consciousness,
        });
        setIsFormSubmitted(true);
        setShowLoader(false);
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
    return (
      <div className={`${styles.container} ${isFormSubmitted ? styles.visible : styles.hidden}`}>
        <p><b>Success!</b></p>
        <p>submitted result: </p>
        <p className={styles.resultText}>{formResult?.dreamText}</p>
        <br />
        <p>Time: {densityScore?.time}</p>
        <p>Feeling: {densityScore?.feeling}</p>
        <p>Consciousness: {densityScore?.consciousness}</p>

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
        <textarea
          className={styles.text}
          defaultValue={transcript.text}
          onChange={e => setTranscriptedText(e.target.value)}
        />
        <div className={styles.buttonsContainer}>
          <div className={`${styles.recordingController} ${!isVoiceInput && styles.hidden}`}>
            {recording 
              ? <div className={styles.recordingIcon}></div>
              : <button onClick={() => startRecording()} disabled={recording}>Start</button>
            }
            <button onClick={() => stopRecording()} disabled={!recording}>Stop</button>
          </div>
          <button
            type='submit'
            disabled={!transcriptedText && !transcript.text}
            onClick={() => onSubmitButtonClick(isVoiceInput)}
            className={styles.submitButton}
          >
            {showLoader ? <Loader /> : 'Submit'}
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
        <div className={styles.inputContainer}>
          <p>
            <label htmlFor="time">Time</label>
            <div className={styles.inputWrapper}>
              <input type="range" id="time" name="time" min="0" max="100" step="1" list='timeValues' onChange={handleChange} />

              <datalist id="timeValues">
                <option value="0" label="old"></option>
                <option value="100" label="recent"></option>
              </datalist>
            </div>
            <span>Is that memory recent or old?</span>
            
          </p>
          <p>
            <label htmlFor="feeling">Feeling</label>
            <div className={styles.inputWrapper}>
              <input type="range" id="feeling" name="feeling" min="0" max="100" step="1" list='feelingValues' onChange={handleChange} />
              <datalist id="feelingValues">
                <option value="0" label="good"></option>
                <option value="100" label="bad"></option>
              </datalist>

            </div>
            <span>Is it a good memory or is it a bad memory?</span>
          </p>
          <p>
            <label htmlFor="consciousness">Consciousness</label>
            <div className={styles.inputWrapper}>
              <input type="range" id="consciousness" name="consciousness" min="0" max="100" step="1" list='consciousnessValues' onChange={handleChange} />
              <datalist id="consciousnessValues">
                <option value="0" label="vivid"></option>
                <option value="100" label="vague"></option>
              </datalist>
            </div>
            <span>How vivid is the memory?</span>
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
      <Nav />

      {renderIntro()}
      {renderForm(selectedForm)}
      {renderSubmitResult()}
    </div>
  )
}

export default Recording
