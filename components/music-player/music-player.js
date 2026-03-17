// deno-lint-ignore no-unused-vars
class MusicPlayer {
  constructor(containerId = "music-player-widget") {
    this.transparentPixel =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    this.songs = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.volume = 70;
    this.containerId = containerId;
    this.isCollapsed = true;
    this.isInitialLoad = true;
    this.storageKeyCollapsed = "music_player_collapsed";
    this.closeTimerId = null;

    // Create audio element
    this.audio = new Audio();
    // Avoid downloading full tracks until the user hits play.
    this.audio.preload = "metadata";
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.nextSong());
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration());

    this.restoreState();

    // Initialize the widget
    this.initializeWidget();
  }

  restoreState() {
    try {
      const stored = localStorage.getItem(this.storageKeyCollapsed);
      if (stored === "true") this.isCollapsed = true;
      if (stored === "false") this.isCollapsed = false;
    } catch {
      // ignore storage failures
    }
  }

  persistState() {
    try {
      localStorage.setItem(this.storageKeyCollapsed, String(this.isCollapsed));
    } catch {
      // ignore storage failures
    }
  }

  initializeWidget() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with ID "${this.containerId}" not found`);
      return;
    }

    // Inject HTML
    container.innerHTML = `
            <div class="music-player">
                <div class="player-header">
                    <div class="player-header-content">
                        <div class="player-header-info">
                            <div class="player-header-title">
                                <i class="fa-solid fa-music" aria-hidden="true"></i>
                                <span>cool music ( ᵔ ᵕ ᵔ ) +*:♡</span>
                            </div>
                        </div>
                    </div>
                    <div class="player-header-actions">
                        <button id="playBtnMini" class="control-btn mini-play-btn" title="Play/Pause">
                            <i class="fa-solid fa-play"></i>
                        </button>
                        <button id="toggleBtn" class="toggle-btn" title="Toggle Player" aria-label="Expand player">
                        <i class="fa-solid fa-chevron-up"></i>
                        </button>
                    </div>
                </div>
                <div class="player-container" hidden>
                    <div class="player-display">
                        <div class="album-art">
                            <img
                              id="albumArt"
                              src="${this.transparentPixel}"
                              alt=""
                              loading="lazy"
                              decoding="async"
                              fetchpriority="low"
                            >
                        </div>
                    </div>

                    <div class="player-controls">
                        <div class="song-info-wrapper">
                            <div class="song-title-display" id="songTitle">Song Title</div>
                            <div class="song-artist-display" id="artistName">Artist Name</div>
                        </div>

                        <div class="controls-bottom">
                            <div class="progress-container">
                                <span id="currentTime" class="time">0:00</span>
                                <input type="range" id="progressBar" class="progress-bar" value="0" min="0" max="100">
                                <span id="duration" class="time">0:00</span>
                            </div>

                            <div class="buttons-container">
                                <button id="prevBtn" class="control-btn" title="Previous">
                                    <i class="fa-solid fa-backward"></i>
                                </button>
                                <button id="playBtn" class="control-btn play-btn" title="Play">
                                    <i class="fa-solid fa-play"></i>
                                </button>
                                <button id="nextBtn" class="control-btn" title="Next">
                                    <i class="fa-solid fa-forward"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Initialize DOM elements
    this.initializeElements();
    this.attachEventListeners();
    this.mountAnimation();
  }

  mountAnimation() {
    // Soft "emerge" animation after insertion.
    requestAnimationFrame(() => {
      if (this.musicPlayerEl) this.musicPlayerEl.classList.add("is-mounted");
    });
  }

  initializeElements() {
    this.playBtn = document.getElementById("playBtn");
    this.playBtnMini = document.getElementById("playBtnMini");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.progressBar = document.getElementById("progressBar");
    this.currentTimeEl = document.getElementById("currentTime");
    this.durationEl = document.getElementById("duration");
    this.songTitle = document.getElementById("songTitle");
    this.artistName = document.getElementById("artistName");
    this.albumArt = document.getElementById("albumArt");
    this.albumArtContainer = this.albumArt.parentElement;
    this.toggleBtn = document.getElementById("toggleBtn");
    this.playerContainer = document.querySelector(".player-container");
    this.playerHeader = document.querySelector(".player-header");
    this.musicPlayerEl = document.querySelector(".music-player");
    this.updateCollapsedState();
  }

  attachEventListeners() {
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.playBtnMini.addEventListener("click", (e) => {
      e.stopPropagation();
      this.togglePlay();
    });
    this.prevBtn.addEventListener("click", () => this.previousSong());
    this.nextBtn.addEventListener("click", () => this.nextSong());
    this.progressBar.addEventListener(
      "input",
      (e) => this.seek(e.target.value),
    );
    this.toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleCollapse();
    });
    this.playerHeader.addEventListener("click", () => this.toggleCollapse());
    this.playerHeader.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleCollapse();
      }
    });

    document.addEventListener("pointerdown", (e) => {
      if (this.isCollapsed) return;
      if (!this.musicPlayerEl) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!this.musicPlayerEl.contains(target)) {
        this.isCollapsed = true;
        this.updateCollapsedState();
        this.persistState();
      }
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateCollapsedState();
    this.persistState();
  }

  updateCollapsedState() {
    if (this.isCollapsed) {
      if (this.musicPlayerEl) {
        this.musicPlayerEl.classList.remove("is-expanded");
      }

      if (this.isInitialLoad) {
        this.playerContainer.style.display = "none";
        this.playerContainer.hidden = true;
        this.isInitialLoad = false;
      } else {
        this.playerContainer.classList.add("collapse");
        this.playerContainer.addEventListener(
          "animationend",
          () => {
            if (!this.isCollapsed) return;
            this.playerContainer.style.display = "none";
            this.playerContainer.hidden = true;
          },
          { once: true },
        );
      }
      this.toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    } else {
      this.playerContainer.hidden = false;
      this.playerContainer.classList.remove("collapse");
      this.playerContainer.style.display = "grid";
      if (this.musicPlayerEl) this.musicPlayerEl.classList.add("is-expanded");
      this.toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    }
  }

  setSongs(songs) {
    this.songs = songs;
    this.currentIndex = 0;
    this.loadSong();
  }

  loadSong() {
    if (this.songs.length === 0) return;

    const song = this.songs[this.currentIndex];
    this.audio.src = song.url;
    // Trigger a lightweight metadata request (duration) without fetching the whole file.
    this.audio.load();
    this.songTitle.textContent = song.title;
    this.artistName.textContent = song.artist;
    this.albumArt.src = song.albumArt || this.transparentPixel;
    this.progressBar.value = 0;
    this.currentTimeEl.textContent = "0:00";
    this.durationEl.textContent = "0:00";
  }

  togglePlay() {
    if (this.songs.length === 0) return;

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.audio.src) {
      this.audio.play();
      this.isPlaying = true;
      this.updatePlayButton();
      this.albumArtContainer.classList.add("spinning");
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    this.albumArtContainer.classList.remove("spinning");
  }

  nextSong() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this.loadSong();
    if (this.isPlaying) this.play();
  }

  previousSong() {
    this.currentIndex = (this.currentIndex - 1 + this.songs.length) %
      this.songs.length;
    this.loadSong();
    if (this.isPlaying) this.play();
  }

  seek(value) {
    const seekTime = (value / 100) * this.audio.duration;
    this.audio.currentTime = seekTime;
  }

  updateProgress() {
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.value = percent || 0;
    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
  }

  updateDuration() {
    this.durationEl.textContent = this.formatTime(this.audio.duration);
  }

  updatePlayButton() {
    this.playBtn.classList.toggle("playing", this.isPlaying);

    const icon = this.playBtn.querySelector("i");
    const miniIcon = this.playBtnMini.querySelector("i");
    if (this.isPlaying) {
      icon.className = "fa-solid fa-pause";
      miniIcon.className = "fa-solid fa-pause";
    } else {
      icon.className = "fa-solid fa-play";
      miniIcon.className = "fa-solid fa-play";
    }
  }

  formatTime(time) {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}
