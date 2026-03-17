// Scroll reveal for About page
// - Adds `is-visible` when elements enter the viewport (matches CSS)
// - Respects reduced motion preferences
// - Designed to be safe if included on non-About pages

(() => {
  const REDUCED_MOTION = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const REVEAL_SELECTOR = [
    ".page-header",
    ".about-section",
    ".about-tool",
    ".about-timeline-item",
    ".about-flair-collapsible",
    ".about-flair-group",
  ].join(",");

  function markImmediatelyVisible(elements) {
    for (const el of elements) el.classList.add("is-visible");
  }

  function init() {
    // Only run if About layout exists (avoids affecting other pages).
    const aboutRoot = document.querySelector(".about-layout");
    if (!aboutRoot) return;

    const elements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    if (elements.length === 0) return;

    // Reduced motion: show everything without animation triggers.
    if (REDUCED_MOTION) {
      markImmediatelyVisible(elements);
      return;
    }

    // If IntersectionObserver isn't supported, just show content.
    if (typeof IntersectionObserver === "undefined") {
      markImmediatelyVisible(elements);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      },
      {
        root: null,
        // Trigger slightly before fully in view for a softer feel.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    for (const el of elements) observer.observe(el);
  }

  function initFlairCollapsible() {
    const details = document.querySelector(".about-flair-collapsible");
    if (!details) return;
    if (details.dataset.flairBound === "true") return;
    details.dataset.flairBound = "true";

    const summary = details.querySelector("summary");
    const content = details.querySelector(".about-flair-content");
    if (!summary || !content) return;

    summary.addEventListener("click", (e) => {
      if (details.open) {
        e.preventDefault();
        content.addEventListener(
          "transitionend",
          function handler() {
            content.removeEventListener("transitionend", handler);
            details.removeAttribute("open");
          },
          { once: true },
        );
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        content.style.padding = "0 1rem";
      } else {
        content.style.removeProperty("max-height");
        content.style.removeProperty("opacity");
        content.style.removeProperty("padding");
      }
    });
  }

  function initAll() {
    init();
    initFlairCollapsible();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    initAll();
  }

  window.addEventListener("site:navigate:end", () => {
    initAll();
  });
})();
