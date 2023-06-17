import axios from 'axios';
import { useWhisper } from '@chengsokdara/use-whisper'

axios.defaults.baseURL = import.meta.env.VITE_BE_URL;

function Recording() {
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
        // TODO: redirect to visualisation page ?
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {/* <p>Recording: {recording}</p>
      <p>Speaking: {speaking}</p>
      <p>Transcripting: {transcribing}</p> */}
      <p>Transcribed Text: {transcript.text}</p>
      <div className='buttons-container'>
        <button onClick={() => startRecording()}>Start</button>
        <button onClick={() => pauseRecording()}>Pause</button>
        <button onClick={() => stopRecording()}>Stop</button>
      </div>
      <button onClick={() => onSubmitButtonClick()} disabled={!transcript.text}>Submit</button>
    </div>
  )
}

export default Recording