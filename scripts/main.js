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

//cards

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const buttons = card.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      // fecha todos
      cards.forEach((c) => c.classList.remove("active"));

      // se não estava ativo, abre
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });
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
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes.toString().padStart(2, "0")}:${secs}`;
}

function updatePlayIcon() {
  playIcon.src = audio.paused
    ? "./assets/images/audio/play.svg"
    : "./assets/images/audio/pause.svg";
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
      ? "./assets/images/audio/volume-mute.svg"
      : "./assets/images/audio/volume.svg";
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

volumeSlider.addEventListener("mousedown", (e) => {
  isDraggingVolume = true;
  setVolumeFromClientX(e.clientX);
});

volumeSlider.addEventListener("touchstart", (e) => {
  isDraggingVolume = true;
  setVolumeFromClientX(e.touches[0].clientX);
});

// resposta discursiva
const textareaDiscursiva = document.getElementById("textarea-discursiva");
const btnResponder = document.getElementById("btnResponder");
const btnAlterar = document.getElementById("btnAlterar");
const feedbackDiscursiva = document.getElementById("feedbackDiscursiva");
const fecharFeedback = document.getElementById("fecharFeedbackDiscursiva");

const STORAGE_KEY = "atividadeDiscursiva";

function salvarEstadoDiscursiva() {
  const estado = {
    texto: textareaDiscursiva.value,
    respondido: textareaDiscursiva.disabled,
    feedbackVisivel: feedbackDiscursiva.classList.contains("ativo"),
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

function atualizarBotoesIniciais() {
  const temTexto = textareaDiscursiva.value.trim() !== "";

  if (!textareaDiscursiva.disabled) {
    btnResponder.disabled = !temTexto;

    if (temTexto) {
      btnResponder.classList.add("ativo");
    } else {
      btnResponder.classList.remove("ativo");
    }

    btnAlterar.disabled = true;
  }
}

function responderAtividade() {
  if (textareaDiscursiva.value.trim() === "") return;

  feedbackDiscursiva.classList.add("ativo");

  btnResponder.disabled = true;
  btnResponder.classList.remove("ativo");

  btnAlterar.disabled = false;
  textareaDiscursiva.disabled = true;

  salvarEstadoDiscursiva();
}

function alterarAtividade() {
  textareaDiscursiva.disabled = false;
  feedbackDiscursiva.classList.remove("ativo");

  btnAlterar.disabled = true;

  const temTexto = textareaDiscursiva.value.trim() !== "";
  btnResponder.disabled = !temTexto;

  if (temTexto) {
    btnResponder.classList.add("ativo");
  } else {
    btnResponder.classList.remove("ativo");
  }

  salvarEstadoDiscursiva();
}

function restaurarEstadoDiscursiva() {
  const salvo = sessionStorage.getItem(STORAGE_KEY);

  if (!salvo) {
    btnResponder.disabled = true;
    btnAlterar.disabled = true;
    btnResponder.classList.remove("ativo");
    return;
  }

  const estado = JSON.parse(salvo);

  textareaDiscursiva.value = estado.texto || "";
  textareaDiscursiva.disabled = !!estado.respondido;

  if (estado.respondido) {
    btnResponder.disabled = true;
    btnResponder.classList.remove("ativo");
    btnAlterar.disabled = false;
  } else {
    const temTexto = textareaDiscursiva.value.trim() !== "";
    btnResponder.disabled = !temTexto;
    btnAlterar.disabled = true;

    if (temTexto) {
      btnResponder.classList.add("ativo");
    } else {
      btnResponder.classList.remove("ativo");
    }
  }

  if (estado.feedbackVisivel) {
    feedbackDiscursiva.classList.add("ativo");
  } else {
    feedbackDiscursiva.classList.remove("ativo");
  }
}

textareaDiscursiva.addEventListener("input", () => {
  if (!textareaDiscursiva.disabled) {
    atualizarBotoesIniciais();
    salvarEstadoDiscursiva();
  }
});

btnResponder.addEventListener("click", responderAtividade);
btnAlterar.addEventListener("click", alterarAtividade);

fecharFeedback.addEventListener("click", () => {
  feedbackDiscursiva.classList.remove("ativo");
  salvarEstadoDiscursiva();
});

restaurarEstadoDiscursiva();

if (!textareaDiscursiva.disabled) {
  atualizarBotoesIniciais();
}

//OBJETIVA

const opcoesObjetiva = document.querySelectorAll(
  '.opcao-objetiva input[type="checkbox"]',
);
const btnResponderObjetiva = document.getElementById("btnResponderObjetiva");
const btnAlterarObjetiva = document.getElementById("btnAlterarObjetiva");
const feedbackObjetiva = document.getElementById("feedbackObjetiva");
const fecharFeedbackObjetiva = document.getElementById(
  "fecharFeedbackObjetiva",
);

const STORAGE_KEY_OBJETIVA = "atividadeObjetiva";

function atualizarVisualObjetiva() {
  opcoesObjetiva.forEach((input) => {
    const opcao = input.closest(".opcao-objetiva");
    opcao.classList.toggle("selecionada", input.checked);
  });
}

function salvarEstadoObjetiva() {
  const estado = {
    selecionados: [...opcoesObjetiva]
      .filter((input) => input.checked)
      .map((input) => input.id),
    respondido: btnResponderObjetiva.disabled && !btnAlterarObjetiva.disabled,
    feedbackVisivel: feedbackObjetiva.classList.contains("ativo"),
    bloqueada: opcoesObjetiva[0].disabled,
  };

  sessionStorage.setItem(STORAGE_KEY_OBJETIVA, JSON.stringify(estado));
}

function atualizarBotoesObjetiva() {
  const temSelecionado = [...opcoesObjetiva].some((input) => input.checked);

  if (!opcoesObjetiva[0].disabled) {
    btnResponderObjetiva.disabled = !temSelecionado;

    if (temSelecionado) {
      btnResponderObjetiva.classList.add("ativo");
    } else {
      btnResponderObjetiva.classList.remove("ativo");
    }

    btnAlterarObjetiva.disabled = true;
  }
}

function responderObjetiva() {
  const temSelecionado = [...opcoesObjetiva].some((input) => input.checked);
  if (!temSelecionado) return;

  feedbackObjetiva.classList.add("ativo");

  btnResponderObjetiva.disabled = true;
  btnResponderObjetiva.classList.remove("ativo");

  btnAlterarObjetiva.disabled = false;

  opcoesObjetiva.forEach((input) => {
    input.disabled = true;
  });

  salvarEstadoObjetiva();
}

function alterarObjetiva() {
  feedbackObjetiva.classList.remove("ativo");

  btnAlterarObjetiva.disabled = true;

  opcoesObjetiva.forEach((input) => {
    input.disabled = false;
  });

  const temSelecionado = [...opcoesObjetiva].some((input) => input.checked);
  btnResponderObjetiva.disabled = !temSelecionado;

  if (temSelecionado) {
    btnResponderObjetiva.classList.add("ativo");
  } else {
    btnResponderObjetiva.classList.remove("ativo");
  }

  salvarEstadoObjetiva();
}

function restaurarEstadoObjetiva() {
  const salvo = sessionStorage.getItem(STORAGE_KEY_OBJETIVA);

  if (!salvo) {
    btnResponderObjetiva.disabled = true;
    btnAlterarObjetiva.disabled = true;
    btnResponderObjetiva.classList.remove("ativo");
    return;
  }

  const estado = JSON.parse(salvo);

  opcoesObjetiva.forEach((input) => {
    input.checked = estado.selecionados.includes(input.id);
    input.disabled = !!estado.bloqueada;
  });

  atualizarVisualObjetiva();

  if (estado.bloqueada) {
    btnResponderObjetiva.disabled = true;
    btnResponderObjetiva.classList.remove("ativo");
    btnAlterarObjetiva.disabled = false;
  } else {
    const temSelecionado = [...opcoesObjetiva].some((input) => input.checked);
    btnResponderObjetiva.disabled = !temSelecionado;
    btnAlterarObjetiva.disabled = true;

    if (temSelecionado) {
      btnResponderObjetiva.classList.add("ativo");
    } else {
      btnResponderObjetiva.classList.remove("ativo");
    }
  }

  if (estado.feedbackVisivel) {
    feedbackObjetiva.classList.add("ativo");
  } else {
    feedbackObjetiva.classList.remove("ativo");
  }
}

opcoesObjetiva.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      opcoesObjetiva.forEach((outroInput) => {
        if (outroInput !== input) {
          outroInput.checked = false;
        }
      });
    }

    atualizarVisualObjetiva();
    atualizarBotoesObjetiva();
    salvarEstadoObjetiva();
  });
});

btnResponderObjetiva.addEventListener("click", responderObjetiva);
btnAlterarObjetiva.addEventListener("click", alterarObjetiva);

fecharFeedbackObjetiva.addEventListener("click", () => {
  feedbackObjetiva.classList.remove("ativo");
  salvarEstadoObjetiva();
});

restaurarEstadoObjetiva();

if (!opcoesObjetiva[0].disabled) {
  atualizarBotoesObjetiva();
}

//FAQ
const faqItems = document.querySelectorAll(".faq-item");

function atualizarSetasFaq() {
  faqItems.forEach((item) => {
    const arrow = item.querySelector(".faq-arrow");

    if (item.open) {
      arrow.src = "./assets/images/faq/arrow-up-white.svg";
    } else {
      arrow.src = "./assets/images/faq/arrow-down-green.svg";
    }
  });
}
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});

atualizarSetasFaq();
