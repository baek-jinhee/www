// Homepage hero behavior (idempotent):
// - Match right hero image height to left card on desktop
// - Decode and fade hero images in, then start entrance animation
(() => {
  let homeHeroRunId = 0;
  let homeHeroFallbackTimer = 0;

  function initHomeHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const runId = ++homeHeroRunId;

    const heroContent = document.querySelector(".hero-content");
    const heroImgs = document.querySelectorAll(
      ".hero-image1 img, .hero-image2 > img:first-child",
    );

    if (heroContent) {
      heroContent.classList.remove("ready");
    }

    clearTimeout(homeHeroFallbackTimer);

    function revealImage(img) {
      img.classList.add("loaded");
    }

    function restartChibiAnimation() {
      const chibi = document.querySelector(".hero-chibi");
      if (!chibi) return;

      if (window.innerWidth <= 768) {
        chibi.style.animation = "none";
        return;
      }

      chibi.style.animation = "none";
      void chibi.offsetHeight;
      chibi.style.animation = "";
    }

    function matchRightImageHeight() {
      const card = document.querySelector(".hero-card");
      const image2 = document.querySelector(".hero-image2");
      if (!card || !image2) return;

      if (window.innerWidth > 768) {
        image2.style.height = card.offsetHeight + "px";
      } else {
        image2.style.height = "";
      }
    }

    // Debounced resize binding (avoid stacking listeners across PJAX swaps)
    if (!window.__homeHeroResizeBound) {
      window.__homeHeroResizeBound = true;
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(matchRightImageHeight, 150);
      });
    }

    // Decode each image and fade it in individually
    const decodePromises = [];
    heroImgs.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        revealImage(img);
      } else if (typeof img.decode === "function") {
        const p = img
          .decode()
          .then(function () {
            revealImage(img);
          })
          .catch(function () {
            revealImage(img);
          });
        decodePromises.push(p);
      } else {
        revealImage(img);
      }
    });

    Promise.all(decodePromises).then(function () {
      if (runId !== homeHeroRunId) return;
      matchRightImageHeight();
      restartChibiAnimation();
      if (heroContent) heroContent.classList.add("ready");
    });

    // Fallback: if images take too long, reveal anyway after 1.5s
    homeHeroFallbackTimer = setTimeout(function () {
      if (runId !== homeHeroRunId) return;
      heroImgs.forEach(function (img) {
        revealImage(img);
      });
      matchRightImageHeight();
      restartChibiAnimation();
      if (heroContent) heroContent.classList.add("ready");
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeHero, { once: true });
  } else {
    initHomeHero();
  }

  window.addEventListener("site:navigate:end", () => {
    initHomeHero();
  });
})();
