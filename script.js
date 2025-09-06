// 4-7-8 Breathing Animation (inhale-hold-exhale)
document.addEventListener("DOMContentLoaded", () => {
  // Ripple effect on load
  document.body.classList.add("pulsate");
  setTimeout(() => {
    document.body.classList.remove("pulsate");
  }, 3000); // match animation duration

  // Burger menu and sidebar logic
  const burgerMenu = document.getElementById("burgerMenu");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeSidebar = document.getElementById("closeSidebar");

  burgerMenu.addEventListener("click", () => {
    sidebarMenu.classList.add("open");
    sidebarMenu.focus();
  });

  closeSidebar.addEventListener("click", () => {
    sidebarMenu.classList.remove("open");
    burgerMenu.focus();
  });

  // Close sidebar with Escape key
  sidebarMenu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebarMenu.classList.remove("open");
      burgerMenu.focus();
    }
  });

  // Background sound logic
  const bgSoundBtns = document.querySelectorAll(".bg-sound-btn");
  let bgAudio = null;
  const bgSounds = {
    woods: "sounds/woods.mp3",
    river: "sounds/river.mp3",
    white_noise: "sounds/white_noise.mp3",
  };

  function stopBgAudio() {
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      bgAudio = null;
    }
  }

  bgSoundBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      bgSoundBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const sound = btn.getAttribute("data-sound");
      stopBgAudio();
      if (sound && sound !== "none" && bgSounds[sound]) {
        bgAudio = new Audio(bgSounds[sound]);
        bgAudio.loop = true;
        bgAudio.volume = 0.5;
        bgAudio.play();
      }
    });
  });

  // Breathing logic
  const circle = document.getElementById("breathe478Circle");
  const text = document.getElementById("breathe478Text");

  // Single audio track for the whole cycle
  let cycleAudio = new Audio("sounds/cycle.mp3");
  cycleAudio.loop = true;
  cycleAudio.volume = 0.6;

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
    },
    {
      label: "Hold",
      duration: 7000,
      scale: 1.3,
      color: "#C1C9E5",
      shadow: "0 0 100px 30px #C1C9E588",
    },
    {
      label: "Exhale",
      duration: 8000,
      scale: 0.7,
      color: "#283246",
      shadow: "0 0 60px 0 #28324688",
    },
  ];

  function breathePhaseLoop() {
    if (!running) return;

    const currentPhase = phases[phase];
    text.textContent = currentPhase.label;
    circle.style.transform = `scale(${currentPhase.scale})`;
    circle.style.background = currentPhase.color;
    circle.style.boxShadow = currentPhase.shadow;

    phase = (phase + 1) % phases.length;
    timeoutId = setTimeout(breathePhaseLoop, currentPhase.duration);
  }

  // iOS audio unlock workaround
  let audioUnlocked = false;
  function unlockAllAudio() {
    if (audioUnlocked) return;
    cycleAudio.muted = true;
    cycleAudio
      .play()
      .then(() => {
        cycleAudio.pause();
        cycleAudio.currentTime = 0;
        cycleAudio.muted = false;
      })
      .catch(() => {});
    audioUnlocked = true;
  }

  // Start/stop breathing on circle click
  circle.addEventListener("click", () => {
    unlockAllAudio();
    if (!running) {
      running = true;
      phase = 0;
      cycleAudio.currentTime = 0;
      cycleAudio.play().catch(() => {});
      breathePhaseLoop();
    } else {
      running = false;
      cycleAudio.pause();
      cycleAudio.currentTime = 0;
      text.textContent = "Click to begin";
      circle.style.transform = "scale(1)";
      circle.style.background = "#8D9DDA";
      circle.style.boxShadow = "0 0 40px 0 rgba(141,157,218,0.2)";
      clearTimeout(timeoutId);
    }
  });
});
