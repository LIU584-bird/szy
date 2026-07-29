(function () {
  "use strict";

  const config = window.LOVE_CONFIG;
  const cover = document.getElementById("cover");
  const story = document.getElementById("story");
  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");

  function setText(selector, value) {
    document.querySelector(selector).textContent = value;
  }

  function fillContent() {
    document.title = `送给${config.recipient}的一封信`;
    setText("#coverTitle", config.coverTitle);
    setText("#coverHint", config.coverHint);
    setText("#heroTitle", config.heroTitle);
    setText("#heroSubtitle", config.heroSubtitle);
    setText("#finalTitle", config.finalTitle);
    setText("#finalMessage", config.finalMessage);
    document.querySelectorAll("[data-recipient]").forEach((node) => { node.textContent = config.recipient; });
    document.querySelectorAll("[data-sender]").forEach((node) => { node.textContent = config.sender; });
    document.getElementById("today").textContent = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric", month: "long", day: "numeric"
    }).format(new Date());

    const letterContent = document.getElementById("letterContent");
    config.letter.forEach((paragraph) => {
      const node = document.createElement("p");
      node.textContent = paragraph;
      letterContent.appendChild(node);
    });

    const photoList = document.getElementById("photoList");
    config.photos.forEach((photo, index) => {
      const card = document.createElement("figure");
      card.className = "photo-card reveal";
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = `${config.recipient}的照片 ${index + 1}`;
      image.loading = index === 0 ? "eager" : "lazy";
      image.addEventListener("error", () => {
        card.classList.add("photo-missing");
        image.remove();
        const placeholder = document.createElement("div");
        placeholder.className = "photo-placeholder";
        placeholder.innerHTML = `<span>＋</span><strong>照片位置 ${index + 1}</strong><small>${photo.src}</small>`;
        card.prepend(placeholder);
      }, { once: true });
      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;
      card.append(image, caption);
      photoList.appendChild(card);
    });
    music.src = config.music;
  }

  function updateMusicButton() {
    musicButton.textContent = music.paused ? "♫" : "Ⅱ";
    musicButton.classList.toggle("playing", !music.paused);
  }

  function playMusic() {
    music.play().then(updateMusicButton).catch(updateMusicButton);
  }

  function openStory() {
    cover.classList.add("opening");
    playMusic();
    window.setTimeout(() => {
      cover.hidden = true;
      story.classList.add("visible");
      story.setAttribute("aria-hidden", "false");
      window.scrollTo(0, 0);
      observeReveals();
    }, 650);
  }

  function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  }

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    document.getElementById("progressBar").style.width = `${Math.min(percent, 100)}%`;
  }

  document.getElementById("openButton").addEventListener("click", openStory);
  musicButton.addEventListener("click", () => music.paused ? playMusic() : music.pause());
  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  document.getElementById("replayButton").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", updateProgress, { passive: true });
  document.addEventListener("WeixinJSBridgeReady", playMusic, false);
  fillContent();
}());
