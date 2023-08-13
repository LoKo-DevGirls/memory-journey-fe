import styles from '../styles/Landing.module.scss';

function Landing() {

  return (
    <div className={styles.paragraphContainer} >
      <div className="container">
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

        <a href="/recording/">Record your Memories</a>
        <a href="/archive/">Memory Archives</a>
        <a href="/research/">Research</a>
      </div>
    </div>
  )
}

export default Landing