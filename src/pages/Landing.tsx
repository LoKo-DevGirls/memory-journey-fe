import styles from '../styles/Landing.module.scss';
import { useState } from 'react';

function Landing() {
  const [isKorean, setIsKorean] = useState(false)

  const renderLanguageSwitch = () => {
    return (
      <div className={styles.switch}>
        <button onClick={() => setIsKorean(true)}>KO</button>
        <button onClick={() => setIsKorean(false)}>EN</button>
      </div>
    )
  }

  return (
    <div className={styles.paragraphContainer} >
      {renderLanguageSwitch()}
      <div className="container">
        {isKorean ?
        <p className={`${styles.paragraph} ${styles.korean}`}>
          나의 가장 오래된 기억 중 하나는 실크 이불에서 느껴지는 부드러운 감촉과 감고있는 눈에서 느껴지는 오렌지 빛의 따뜻한 햇살이다. 
          <br />
          <br />
          내가 기억하는 가장 오래된 망상은 내가 생각을 할수 있다는 것에 새삼 신기해하며 다른 사람들의 머리속에서도 나랑 비슷한 생각들이 일어나고 있는지 호기심이 들었던 것이다. 
          <br />
          <br />
          언젠가 나의 가장 오래된 기억은 무엇이었을까 의문이 들었고 그때 이후로 나는 종종 예전의 나로 돌아가서 그때의 생각과 느낌들을 떠올리곤 한다. 
          <br />
          <br />
          아주 오래된 기억을 되살리려고 할때... 어젯밤 꿈을 기억내려할때... 나는 멍해지며 내가 기억하지 못하는 순간들을 상상한다. 
          <br />
          <br />
          내가 처음 마주한 엄마의 얼굴, 태어나면서 처음 울었던 순간과 피부에 맞닿는 첫 공기의 냄새, 깊은 기억 속 느꼈던 첫 심장 소리...
        </p>:
        <p className={styles.paragraph}>
        One of my earliest memories is the sensation of a silky bedspread, smooth on my skin, as I lay beneath the thin covers. Through closed eyelids, I could feel the warm glow of orange sunlight permeating under the duvet.
        <br />
        <br />
        One of my oldest reveries is the awe-inspiring notion of being able to think, to exist as a thinking being. It sparked a curiosity within me, wondering if others, too, harbored similar thoughts in their minds, like echoes of my own musings.
        <br />
        <br />
        Sometimes, I find myself pondering about what my earliest memory might have been. Since then, I often revisit my past self, immersing in the thoughts and emotions of that time.
        <br />
        <br />
        When I try to recall very old memories or remember last night's dream, I find myself drifting off and imagining moments that I can't remember. I imagine the first time I saw my mother's face, the moment I cried when I was born, the feeling of the first breath touching my skin, and the deep memory of the first heartbeat I felt.
        </p>
        }

        <div className={styles.btnContainer}>
          <a href="/recording/">Record your Memories</a>
          <a href="/archive/">Memory Archives</a>
          <a href="/research/">Research</a>
        </div>
      </div>
    </div>
  )
}

export default Landing