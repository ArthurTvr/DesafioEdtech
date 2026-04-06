const swiper = new Swiper(".mySwiper", {
  loop: false,

  navigation: {
    nextEl: ".slider-controls .swiper-button-next",
    prevEl: ".slider-controls .swiper-button-prev",
  },

  pagination: {
    el: ".slider-controls .swiper-pagination",
    clickable: true,
  },
});
// Audio

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");

const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const progressThumb = document.querySelector(".progress-thumb");

const time = document.getElementById("time");

const volumeBtn = document.getElementById("volumeBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumeSlider = document.querySelector(".volume-slider");
const volumeLevel = document.querySelector(".volume-level");
const volumeThumb = document.querySelector(".volume-thumb");

audio.volume = 0.7;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes.toString().padStart(2, "0")}:${secs}`;
}

function updatePlayIcon() {
  playIcon.src = audio.paused
    ? "./assets/images/play.svg"
    : "./assets/images/pause.svg";
}

function updateProgress() {
  if (!progress || !progressContainer || !progressThumb) return;

  const duration = audio.duration;
  const currentTime = audio.currentTime;

  if (!Number.isFinite(duration) || duration <= 0) return;

  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  const containerWidth = progressContainer.clientWidth;
  const thumbWidth = progressThumb.offsetWidth;

  const maxLeft = containerWidth - thumbWidth;
  const thumbLeft = (percent / 100) * maxLeft;

  progressThumb.style.left = `${Math.max(0, thumbLeft)}px`;

  time.textContent = formatTime(currentTime);
}

function setProgressByClick(event) {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;

  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

  const percent = Math.max(0, Math.min(clickX / width, 1));
  audio.currentTime = percent * audio.duration;
}

function updateVolumeUI() {
  if (!volumeLevel || !volumeThumb || !volumeIcon) return;

  const volumePercent = audio.muted ? 0 : audio.volume * 100;
  volumeLevel.style.width = `${volumePercent}%`;
  volumeThumb.style.left = `${volumePercent}%`;

  volumeIcon.src =
    volumePercent === 0
      ? "./assets/images/volume-mute.svg"
      : "./assets/images/volume.svg";
}

function setVolumeByClick(event) {
  const rect = volumeSlider.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;

  let newVolume = clickX / width;
  newVolume = Math.max(0, Math.min(newVolume, 1));

  audio.volume = newVolume;
  audio.muted = newVolume === 0;

  updateVolumeUI();
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayIcon();
});

audio.addEventListener("play", updatePlayIcon);
audio.addEventListener("pause", updatePlayIcon);
audio.addEventListener("ended", updatePlayIcon);

audio.addEventListener("loadedmetadata", () => {
  time.textContent = formatTime(0);
  updateProgress();
});

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgressByClick);

if (volumeSlider) {
  volumeSlider.addEventListener("click", setVolumeByClick);
}

if (volumeBtn) {
  volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateVolumeUI();
  });
}

audio.addEventListener("volumechange", updateVolumeUI);

updatePlayIcon();
updateVolumeUI();
let isDraggingProgress = false;
let isDraggingVolume = false;

function setProgressFromClientX(clientX) {
  const rect = progressContainer.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));

  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

  const percent = x / rect.width;
  audio.currentTime = percent * audio.duration;
  updateProgress();
}

function setVolumeFromClientX(clientX) {
  const rect = volumeSlider.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));

  const volume = x / rect.width;
  audio.volume = volume;
  audio.muted = volume === 0;
  updateVolumeUI();
}

// ===== PROGRESSO =====
progressContainer.addEventListener("mousedown", (e) => {
  isDraggingProgress = true;
  setProgressFromClientX(e.clientX);
});

document.addEventListener("mousemove", (e) => {
  if (isDraggingProgress) {
    setProgressFromClientX(e.clientX);
  }

  if (isDraggingVolume) {
    setVolumeFromClientX(e.clientX);
  }
});

document.addEventListener("mouseup", () => {
  isDraggingProgress = false;
  isDraggingVolume = false;
});

// ===== TOUCH PROGRESSO =====
progressContainer.addEventListener("touchstart", (e) => {
  isDraggingProgress = true;
  setProgressFromClientX(e.touches[0].clientX);
});

document.addEventListener("touchmove", (e) => {
  if (isDraggingProgress) {
    setProgressFromClientX(e.touches[0].clientX);
  }

  if (isDraggingVolume) {
    setVolumeFromClientX(e.touches[0].clientX);
  }
});

document.addEventListener("touchend", () => {
  isDraggingProgress = false;
  isDraggingVolume = false;
});

// ===== VOLUME =====
volumeSlider.addEventListener("mousedown", (e) => {
  isDraggingVolume = true;
  setVolumeFromClientX(e.clientX);
});

volumeSlider.addEventListener("touchstart", (e) => {
  isDraggingVolume = true;
  setVolumeFromClientX(e.touches[0].clientX);
});