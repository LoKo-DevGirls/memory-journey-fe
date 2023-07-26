import { useEffect, useRef } from 'react';
import styles from '../styles/Landing.module.scss';

function Landing() {
  const initAnimate = () => {
    let MESSAGES = [];
    MESSAGES.push({ delay: 0, text: "Incoming transmission..." });
    MESSAGES.push({ delay: 1200, text: "You don't talk to anybody." });
    MESSAGES.push({ delay: 2200, text: "You don't interact with anybody." });
    MESSAGES.push({ delay: 3600, text: "Your whole sense of reality is, pretty warped..." });
    MESSAGES.push({ delay: 5200, text: "Does it bother you that we're not real?" });

    let container = document.getElementById("messageContainer");
    let message = document.getElementById("message");
    let animateButton = document.getElementById("animate");
    let paragraphs = [];
    let requestAnimationFrameId = null;

    function scramble(element, text, options) {
      // Default properties.
      let defaults = {
        probability: 0.2,
        glitches: '-|/\\',
        blank: '',
        duration: text.length * 40,
        ease: 'easeInOutQuad',
        delay: 0.0
      };

      // Convert the element to a DOM node.
      let el = element.nodeType === 1 ? element : document.querySelector(element);
      let settings = Object.assign({}, defaults, options);

      // Convenience methods.
      function shuffle() {
        return Math.random() < 0.5 ? 1 : -1;
      }
      function wrap(text, classes) {
        let span = document.createElement("span");
        span.className = classes;
        span.appendChild(document.createTextNode(text));
        return span;
      }

      // Glitch values.
      let glitchText = settings.glitches;
      let glitchCharacters = glitchText.split('');
      let glitchLength = glitchCharacters.length;
      let glitchProbability = settings.probability;
      let glitches = glitchCharacters.map(letter => wrap(letter, 'glitch'));

      // Ghost values.
      let ghostText = el.textContent;
      let ghostCharacters = ghostText.split('');
      let ghostLength = ghostCharacters.length;
      let ghosts = ghostCharacters.map(letter => wrap(letter, 'ghost'));

      // Text values.
      let textCharacters = text.split('');
      let textLength = textCharacters.length;

      // Order and output arrays.
      let order = Array.from({ length: textLength }, (_, i) => i).sort(shuffle);
      let output = [];

      // Build the output array.
      for (let i = 0; i < textLength; i++) {
        let glitchIndex = Math.floor(Math.random() * (glitchLength - 1));
        let glitchCharacter = glitches[glitchIndex];
        let ghostCharacter = ghosts[i] || settings.blank;
        let addGlitch = Math.random() < glitchProbability;
        let character = addGlitch ? glitchCharacter : ghostCharacter;
        output.push(character);
      }

      // Animate the text.
      let start;
      function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        for (let i = 0; i < Math.floor(progress / settings.duration * (textLength - 1)); i++) {
          let index = order[i];
          output[index] = textCharacters[index];
        }

        el.innerHTML = output.map(node => node.outerHTML || node.textContent).join('');

        if (progress < settings.duration) {
          requestAnimationFrameId = requestAnimationFrame(step);
        } else {
          el.innerHTML = text;
        }
      }

      // Animate the text.
      setTimeout(() => {
        requestAnimationFrameId = requestAnimationFrame(step);
      }, settings.delay);
    }

    function animate() {
      for ((data, index) in MESSAGES) {
        let element = paragraphs.shift();
        element.textContent = '';
        let options = { delay: delay };
        scramble(element, text, options);
      }
    }

    function initialise() {
      animateButton.addEventListener('click', animate);
      for (let { text } of MESSAGES) {
        let paragraph = document.createElement('p');
        message.appendChild(paragraph);
        paragraphs.push(paragraph);
      }
      animate();
    }

    initialise();
  }

  useEffect(() => {
    initAnimate();
  }, [])
  
  return (
    <div className={`${styles.landingContainer} ${styles.container}`}>
      <div className="container">
        <div id="messageContainer" >
          <div id="message">
            <a id="animate" href="#">Transmit</a>
          </div>
        </div>
        <a href="/recording/">Record your Memories</a>
        {/* <a href="/archive/">Memory Archives</a>
        <a href="/research/">Research</a> */}
      </div>
    </div>
  )
};

export default Landing;