document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("pulsate");
});

class TimerApp {
  constructor() {
    // DOM Elements
    this.minuteInput = document.getElementById("minutes");
    this.playPauseButton = document.getElementById("playPause");
    this.resetButton = document.getElementById("reset");
    this.countdownDisplay = document.getElementById("countdown");
    this.settings = document.getElementById("timerContainer");
    this.musicOnOff = document.getElementById("musicOn");
    this.musicSelect = document.getElementById("musicSelect");
    this.toggleInterval = document.getElementById("toggleInterval");
    this.intervalInput = document.getElementById("interval");
    this.soundMenu = document.getElementById("soundMenu");
    this.soundToggle = document.getElementById("soundToggle");
    this.volumeSlider = document.getElementById("volumeSlider");
    // Guided button
    const guidedBtn = document.getElementById("btn-guided");
    if (guidedBtn) {
      guidedBtn.addEventListener("click", () => this.changeToGuided());
    }

    // Timer State
    this.countdownInterval = null;
    this.timeLeft = 0;
    this.isPaused = false;
    this.intervalTime = 0;
    this.intervalDuration = 1;
    this.hasPlayedStartBell = false;

    // Audio State
    this.audioUnlocked = false;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.buffers = {}; // Web Audio buffers for bells

    this.audioFiles = {
      "river.mp3": new Audio("sounds/river.mp3"),
      "woods.mp3": new Audio("sounds/woods.mp3"),
      "white_noise.mp3": new Audio("sounds/white_noise.mp3"),
    };

    // Minimal breathing gongs for 4-7-8 app
    document.addEventListener("DOMContentLoaded", () => {
      const circle = document.getElementById("breathe478Circle");
      const text = document.getElementById("breathe478Text");
      const soundInhale = document.getElementById("breatheInhaleSound");
      const soundHold = document.getElementById("breatheHoldSound");
      const soundExhale = document.getElementById("breatheExhaleSound");
      let running = false;
      let phase = 0;
      let timeoutId = null;
      const phases = [
        {
          label: "Inhale",
          duration: 4000,
          scale: 1.3,
          color: "#8D9DDA",
          shadow: "0 0 80px 20px #8D9DDA88",
          sound: soundInhale,
        },
        {
          label: "Hold",
          duration: 7000,
          scale: 1.3,
          color: "#C1C9E5",
          shadow: "0 0 100px 30px #C1C9E588",
          sound: soundHold,
        },
        {
          label: "Exhale",
          duration: 8000,
          scale: 0.7,
          color: "#283246",
          shadow: "0 0 60px 0 #28324688",
          sound: soundExhale,
        },
      ];
      function breatheLoop() {
        if (!running) return;
        const p = phases[phase];
        text.textContent = p.label;
        circle.style.transition = `transform ${
          p.duration / 1000
        }s cubic-bezier(0.4,0,0.2,1), background 1s, box-shadow 1.5s`;
        circle.style.transform = `scale(${p.scale})`;
        circle.style.background = p.color;
        circle.style.boxShadow = p.shadow;
        if (p.sound) {
          p.sound.currentTime = 0;
          p.sound.play();
        }
        timeoutId = setTimeout(() => {
          phase = (phase + 1) % phases.length;
          breatheLoop();
        }, p.duration);
      }
      circle.addEventListener("click", () => {
        if (!running) {
          running = true;
          phase = 0;
          breatheLoop();
        } else {
          running = false;
          text.textContent = "Click to begin";
          circle.style.transform = "scale(1)";
          circle.style.background = "#8D9DDA";
          circle.style.boxShadow = "0 0 40px 0 rgba(141,157,218,0.2)";
          clearTimeout(timeoutId);
        }
      });
    });
  }
}
