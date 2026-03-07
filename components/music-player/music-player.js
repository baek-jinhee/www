class MusicPlayer {
  constructor(containerId = "music-player-widget") {
    this.songs = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.volume = 70;
    this.containerId = containerId;
    this.isCollapsed = true;
    this.isInitialLoad = true;

    // Create audio element
    this.audio = new Audio();
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.nextSong());
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration());

    // Initialize the widget
    this.initializeWidget();
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
                        <div class="album-art-mini">
                            <i class="fa-solid fa-music"></i>
                        </div>
                        <div class="player-header-info">
                            <div class="song-title-display" id="songTitleHeader">cool music ₍ᐢ. .ᐢ₎ ₊˚⊹♡</div>
                        </div>
                    </div>
                    <button id="toggleBtn" class="toggle-btn" title="Toggle Player">
                        <i class="fa-solid fa-chevron-up"></i>
                    </button>
                </div>
                <div class="player-container">
                    <div class="player-display">
                        <div class="album-art">
                            <img id="albumArt" src="https://via.placeholder.com/200" alt="Album Art">
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
  }

  initializeElements() {
    this.playBtn = document.getElementById("playBtn");
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
    this.songTitleHeader = document.getElementById("songTitleHeader");
    this.updateCollapsedState();
  }

  attachEventListeners() {
    this.playBtn.addEventListener("click", () => this.togglePlay());
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
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateCollapsedState();
  }

  updateCollapsedState() {
    if (this.isCollapsed) {
      if (this.isInitialLoad) {
        this.playerContainer.style.display = "none";
        this.isInitialLoad = false;
      } else {
        this.playerContainer.classList.add("collapse");
        this.playerContainer.addEventListener(
          "animationend",
          () => {
            if (this.isCollapsed) {
              this.playerContainer.style.display = "none";
            }
          },
          { once: true },
        );
      }
      this.toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    } else {
      this.playerContainer.classList.remove("collapse");
      this.playerContainer.style.display = "flex";
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
    this.songTitle.textContent = song.title;
    this.artistName.textContent = song.artist;
    this.albumArt.src = song.albumArt || "https://via.placeholder.com/200";
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

  setVolume(value) {
    this.volume = value;
    this.audio.volume = value / 100;
    this.volumePercent.textContent = value + "%";
  }

  toggleMute() {
    if (this.audio.volume > 0) {
      this.audio.volume = 0;
      this.volumeBtn.style.opacity = "0.5";
    } else {
      this.audio.volume = this.volume / 100;
      this.volumeBtn.style.opacity = "1";
    }
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
    if (this.isPlaying) {
      icon.className = "fa-solid fa-pause";
    } else {
      icon.className = "fa-solid fa-play";
    }
  }

  formatTime(time) {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = MusicPlayer;
}
