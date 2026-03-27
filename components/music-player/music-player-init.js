// Shared music player bootstrap.
// - Shuffles playlist on page load
// - Reuses the same player on desktop and mobile
(() => {
  if (window.__musicPlayerInit) return;
  window.__musicPlayerInit = true;

  const playlist = [
    {
      title: "Love Cherry Motion",
      artist: "Choerry",
      url: "/assets/music/lovechoerrymotion.opus",
      albumArt: "/assets/music/lcm.avif",
    },
    {
      title: "Grapes",
      artist: "glaive",
      url: "/assets/music/grapes_glaive.opus",
      albumArt: "/assets/music/glaive_grapes.avif",
    },
    {
      title: "me & u",
      artist: "succducc",
      url: "/assets/music/meandu.opus",
      albumArt: "/assets/music/meandu.avif",
    },
  ];

  function shuffleInPlace(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  const shuffledPlaylist = playlist.slice();
  shuffleInPlace(shuffledPlaylist);

  let player = null;

  function initMusicPlayer() {
    if (player) return;
    if (typeof MusicPlayer === "undefined") return;
    const container = document.getElementById("music-player-widget");
    if (!container) return;

    player = new MusicPlayer();
    player.setSongs(shuffledPlaylist);
    window.__musicPlayerInstance = player;
  }

  initMusicPlayer();
})();
