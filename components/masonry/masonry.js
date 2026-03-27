/**
 * Masonry Gallery – vanilla JS
 * CSS columns handle layout. JS handles tab switching, lightbox, and archive rendering.
 */

// ---- Image data by year ----
const galleries = {
  2026: [
    { src: "../assets/images/illustration/2026/pony2.avif" },
    { src: "../assets/images/illustration/2026/pony1.avif" },
    { src: "../assets/images/illustration/2026/mlp1.avif" },
    { src: "../assets/images/illustration/2026/jia2.avif" },
    { src: "../assets/images/illustration/2026/oc3.avif" },
    { src: "../assets/images/illustration/2026/wish2.avif" },
  ],
  2025: [
    { src: "../assets/images/illustration/2025/celine2.avif" },
    { src: "../assets/images/illustration/2025/wish.avif" },
    { src: "../assets/images/illustration/2025/wish_ref.avif" },
    { src: "../assets/images/illustration/2025/wish2.avif" },
    { src: "../assets/images/illustration/2025/celine.avif" },
    { src: "../assets/images/illustration/2025/mane6.avif" },
    { src: "../assets/images/illustration/2025/twilight.avif" },
    { src: "../assets/images/illustration/2025/jia1.avif" },
    { src: "../assets/images/illustration/2025/moully.avif" },
    { src: "../assets/images/illustration/2025/oc1.avif" },
    { src: "../assets/images/illustration/2025/oc4.avif" },
    { src: "../assets/images/illustration/2025/oc2.avif" },
    { src: "../assets/images/illustration/2025/artfight1.avif" },
  ],
};

// ---- Archive data (2024–2016) ----
const archive = {
  2024: [
    { src: "../assets/images/illustration/2024/oc12.avif" },
    { src: "../assets/images/illustration/2024/oc1.avif" },
    { src: "../assets/images/illustration/2024/oc13.avif" },
    { src: "../assets/images/illustration/2024/oc2.avif" },
    { src: "../assets/images/illustration/2024/oc4.avif" },
    { src: "../assets/images/illustration/2024/wish.avif" },
    { src: "../assets/images/illustration/2024/oc5.avif" },
    { src: "../assets/images/illustration/2024/oc6.avif" },
    { src: "../assets/images/illustration/2024/oc9.avif" },
    { src: "../assets/images/illustration/2024/oc10.avif" },
    { src: "../assets/images/illustration/2024/oc11.avif" },
    { src: "../assets/images/illustration/2024/oc7.avif" },
    { src: "../assets/images/illustration/2024/oc8.avif" },
    { src: "../assets/images/illustration/2024/girl.avif" },
    { src: "../assets/images/illustration/2024/smiski.avif" },
  ],
  2023: [
    { src: "../assets/images/illustration/2023/oc.avif" },
    { src: "../assets/images/illustration/2023/oc2.avif" },
    { src: "../assets/images/illustration/2023/oc3.avif" },
    { src: "../assets/images/illustration/2023/oc4.avif" },
    { src: "../assets/images/illustration/2023/oc5.avif" },
    { src: "../assets/images/illustration/2023/wish.avif" },
    { src: "../assets/images/illustration/2023/oc8.avif" },
    { src: "../assets/images/illustration/2023/oc9.avif" },
    { src: "../assets/images/illustration/2023/rarity.avif" },
    { src: "../assets/images/illustration/2023/twi.avif" },
  ],
  2022: [
    { src: "../assets/images/illustration/2022/rei.avif" },
    { src: "../assets/images/illustration/2022/lisa.avif" },
    { src: "../assets/images/illustration/2022/girl.avif" },
    { src: "../assets/images/illustration/2022/dog.avif" },
    { src: "../assets/images/illustration/2022/tsuki.avif" },
    { src: "../assets/images/illustration/2022/celine.avif" },
    { src: "../assets/images/illustration/2022/me.avif" },
    { src: "../assets/images/illustration/2022/zeph.avif" },
    { src: "../assets/images/illustration/2022/belle.avif" },
    { src: "../assets/images/illustration/2022/splat.avif" },
    { src: "../assets/images/illustration/2022/anya.avif" },
  ],
  2021: [
    { src: "../assets/images/illustration/2021/oc3.avif" },
    { src: "../assets/images/illustration/2021/oc4.avif" },
    { src: "../assets/images/illustration/2021/ocs.avif" },
    { src: "../assets/images/illustration/2021/oc2.avif" },
    { src: "../assets/images/illustration/2021/oc5.avif" },
    { src: "../assets/images/illustration/2021/seoryoung.avif" },
    { src: "../assets/images/illustration/2021/oc6.avif" },
    { src: "../assets/images/illustration/2021/oc7.avif" },
    { src: "../assets/images/illustration/2021/twi.avif" },
    { src: "../assets/images/illustration/2021/venti.avif" },
  ],
  2020: [
    { src: "../assets/images/illustration/2020/oc2.avif" },
    { src: "../assets/images/illustration/2020/oc1.avif" },
    { src: "../assets/images/illustration/2020/oc3.avif" },
    { src: "../assets/images/illustration/2020/oc4.avif" },
    { src: "../assets/images/illustration/2020/oc5.avif" },
    { src: "../assets/images/illustration/2020/oc6.avif" },
    { src: "../assets/images/illustration/2020/seoryoung.avif" },
    { src: "../assets/images/illustration/2020/seokyoung.avif" },
  ],
  2019: [
    { src: "../assets/images/illustration/2019/oc2.avif" },
    { src: "../assets/images/illustration/2019/oc3.avif" },
    { src: "../assets/images/illustration/2019/oc4.avif" },
    { src: "../assets/images/illustration/2019/oc5.avif" },
    { src: "../assets/images/illustration/2019/oc6.avif" },
    { src: "../assets/images/illustration/2019/oc7.avif" },
    { src: "../assets/images/illustration/2019/oc1.avif" },
    { src: "../assets/images/illustration/2019/owl.avif" },
  ],
  2018: [
    { src: "../assets/images/illustration/2018/oc3.avif" },
    { src: "../assets/images/illustration/2018/oc4.avif" },
    { src: "../assets/images/illustration/2018/oc5.avif" },
    { src: "../assets/images/illustration/2018/oc6.avif" },
    { src: "../assets/images/illustration/2018/oc7.avif" },
    { src: "../assets/images/illustration/2018/oc8.avif" },
    { src: "../assets/images/illustration/2018/oc9.avif" },
    { src: "../assets/images/illustration/2018/oc1.avif" },
  ],
  2017: [
    { src: "../assets/images/illustration/2017/oc1.avif" },
    { src: "../assets/images/illustration/2017/oc2.avif" },
    { src: "../assets/images/illustration/2017/oc3.avif" },
    { src: "../assets/images/illustration/2017/oc4.avif" },
    { src: "../assets/images/illustration/2017/oc5.avif" },
    { src: "../assets/images/illustration/2017/oc7.avif" },
    { src: "../assets/images/illustration/2017/oc8.avif" },
    { src: "../assets/images/illustration/2017/oc9.avif" },
  ],
  2016: [
    { src: "../assets/images/illustration/2016/frisk.avif" },
    { src: "../assets/images/illustration/2016/girl.avif" },
    { src: "../assets/images/illustration/2016/oc1.avif" },
    { src: "../assets/images/illustration/2016/oc2.avif" },
    { src: "../assets/images/illustration/2016/oc3.avif" },
    { src: "../assets/images/illustration/2016/oc4.avif" },
  ],
};

// ---- State ----
let currentYear = 2026;
let isArchive = false;
let hasInitialGalleryRenderCompleted = false;
let lightboxKeydownBound = false;

// ---- Lightbox state ----
let lightboxImageList = [];
let lightboxCurrentIndex = -1;

// ---- Build gallery image HTML (CSS columns handle layout) ----
function buildGalleryHTML(images) {
  let html = "";
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const alt = img.alt || "";
    html += '<img src="' +
      img.src +
      '" alt="' +
      alt +
      '" title="' +
      alt +
      '" loading="lazy" decoding="async" />';
  }
  return html;
}

// ---- Build archive HTML ----
function buildArchiveHTML() {
  let html =
    '<div class="archive-blurb"><p>This is my archived art from 2016\u20132024.</p></div>';

  const years = Object.keys(archive)
    .map(Number)
    .sort(function (a, b) {
      return b - a;
    });

  for (let y = 0; y < years.length; y++) {
    const year = years[y];
    const images = archive[year] || [];

    html += '<details class="archive-year-section">' +
      '<summary class="archive-year-heading">' +
      year +
      " (" +
      images.length +
      ")</summary>" +
      '<div class="archive-year-content">';

    if (images.length > 0) {
      html += '<div class="archive-masonry">';
      for (let i = 0; i < images.length; i++) {
        html += '<img src="' +
          images[i].src +
          '" alt="" loading="lazy" decoding="async" />';
      }
      html += "</div>";
    } else {
      html += '<div class="archive-empty"><p>No images yet.</p></div>';
    }

    html += "</div></details>";
  }

  return html;
}

// ---- Sequential image reveal ----
let revealAbort = null;

function revealImagesSequentially(container, staggerMs) {
  const delay = staggerMs || 80;
  const imgs = container.querySelectorAll("img:not(.revealed)");
  if (!imgs.length) return;

  // Create a new abort token for this run
  const token = {};
  revealAbort = token;

  let i = 0;

  function next() {
    // Stop if a newer reveal has started
    if (revealAbort !== token) return;
    if (i >= imgs.length) return;

    const img = imgs[i];
    i++;

    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("revealed");
      setTimeout(next, delay);
    } else {
      img
        .decode()
        .then(function () {
          if (revealAbort !== token) return;
          img.classList.add("revealed");
          setTimeout(next, delay);
        })
        .catch(function () {
          if (revealAbort !== token) return;
          img.classList.add("revealed");
          setTimeout(next, delay);
        });
    }
  }

  next();
}

// ---- Render gallery (single render, no preload blocking) ----
function setGallery(options) {
  const shouldAnimate = options?.animate !== false;
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  if (isArchive) {
    gallery.innerHTML = buildArchiveHTML();
    attachArchiveToggles(gallery);
  } else {
    const images = galleries[currentYear] || [];
    gallery.innerHTML = buildGalleryHTML(images);
  }

  // Trigger fade-in animation
  if (shouldAnimate) {
    gallery.classList.remove("fade-in");
    void gallery.offsetWidth;
    gallery.classList.add("fade-in");
  } else {
    gallery.classList.remove("fade-in");
  }

  // Sequentially reveal images (non-archive view)
  if (!isArchive) {
    revealImagesSequentially(gallery, shouldAnimate ? 80 : 40);
  }
}

// ---- Archive accordion animation ----
function attachArchiveToggles(gallery) {
  const sections = gallery.querySelectorAll(".archive-year-section");
  for (let i = 0; i < sections.length; i++) {
    const details = sections[i];
    const summary = details.querySelector("summary");
    const content = details.querySelector(".archive-year-content");

    summary.addEventListener("click", function (e) {
      if (details.open) {
        // Closing: animate then remove open
        e.preventDefault();
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        content.style.paddingBottom = "0";
        content.addEventListener("transitionend", function handler() {
          content.removeEventListener("transitionend", handler);
          details.removeAttribute("open");
        });
      } else {
        // Opening: clear inline styles so CSS [open] rules take over
        content.style.removeProperty("max-height");
        content.style.removeProperty("opacity");
        content.style.removeProperty("padding-bottom");
        // Sequentially reveal archive images when section opens
        setTimeout(function () {
          const masonry = content.querySelector(".archive-masonry");
          if (masonry) revealImagesSequentially(masonry, 60);
        }, 50);
      }
    });
  }
}

// ---- Year tab switching ----
function switchYear(year) {
  if (year === "archive") {
    if (isArchive) return;
    isArchive = true;
    currentYear = null;
  } else {
    const parsed = parseInt(year);
    if (!isArchive && parsed === currentYear) return;
    isArchive = false;
    currentYear = parsed;
  }

  // Update active tab button
  const tabs = document.querySelectorAll(".year-tab");
  for (let i = 0; i < tabs.length; i++) {
    const btn = tabs[i];
    if (isArchive) {
      btn.classList.toggle("active", btn.dataset.year === "archive");
    } else {
      btn.classList.toggle(
        "active",
        parseInt(btn.dataset.year) === currentYear,
      );
    }
  }

  // Update gallery class for styling
  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.classList.toggle("archive-view", isArchive);
  }

  setGallery({ animate: hasInitialGalleryRenderCompleted });
  hasInitialGalleryRenderCompleted = true;
}

function setupYearTabs() {
  const tabs = document.querySelectorAll(".year-tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      switchYear(this.dataset.year);
    });
  }
}

// ---- Lightbox (with prev/next navigation) ----

function getLightboxItemFromImage(img) {
  const trigger = img.closest("[data-lightbox-item]");
  const title = (trigger && trigger.dataset.lightboxTitle) ||
    img.dataset.lightboxTitle ||
    "";
  const description = (trigger && trigger.dataset.lightboxDescription) ||
    img.dataset.lightboxDescription ||
    "";
  const alt = img.alt || title;

  return {
    src: img.src,
    alt: alt,
    title: title,
    description: description,
  };
}

function collectImagesFromContainer(container) {
  const imgs = container.querySelectorAll("img");
  const items = [];
  for (let i = 0; i < imgs.length; i++) {
    items.push(getLightboxItemFromImage(imgs[i]));
  }
  return items;
}

function updateLightboxMeta(item) {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;

  const details = overlay.querySelector(".lightbox-details");
  const titleEl = overlay.querySelector(".lightbox-title");
  const descriptionEl = overlay.querySelector(".lightbox-description");
  if (!details || !titleEl || !descriptionEl) return;

  const title = (item && (item.title || item.alt)) || "";
  const description = (item && item.description) || "";

  if (!title && !description) {
    titleEl.textContent = "";
    descriptionEl.textContent = "";
    details.classList.add("is-empty");
    return;
  }

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  details.classList.remove("is-empty");
}

function findImageIndexInContainer(container, targetImage) {
  const imgs = container.querySelectorAll("img");
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i] === targetImage) {
      return i;
    }
  }
  return -1;
}

function createLightbox() {
  if (document.querySelector(".lightbox-overlay")) return;

  const overlay = document.createElement("div");
  overlay.classList.add("lightbox-overlay");
  overlay.innerHTML =
    '<button class="lightbox-arrow lightbox-prev" aria-label="Previous image">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="15 18 9 12 15 6"></polyline>' +
    "</svg>" +
    "</button>" +
    '<div class="lightbox-content">' +
    '<div class="lightbox-image-wrapper">' +
    '<img src="" alt="" />' +
    "</div>" +
    '<div class="lightbox-details is-empty">' +
    '<h3 class="lightbox-title"></h3>' +
    '<p class="lightbox-description"></p>' +
    "</div>" +
    "</div>" +
    '<button class="lightbox-arrow lightbox-next" aria-label="Next image">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="9 18 15 12 9 6"></polyline>' +
    "</svg>" +
    "</button>" +
    '<div class="lightbox-counter"></div>';
  overlay.style.visibility = "hidden";

  // Close on overlay background click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // Prev / Next buttons
  overlay
    .querySelector(".lightbox-prev")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      navigateLightbox(-1);
    });

  overlay
    .querySelector(".lightbox-next")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      navigateLightbox(1);
    });

  // Keyboard navigation
  if (!lightboxKeydownBound) {
    lightboxKeydownBound = true;
    document.addEventListener("keydown", function (e) {
      const activeOverlay = document.querySelector(".lightbox-overlay.active");
      if (!activeOverlay) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateLightbox(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateLightbox(1);
      }
    });
  }

  // Touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoved = false;

  overlay.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchMoved = false;
    },
    { passive: true },
  );

  overlay.addEventListener(
    "touchmove",
    function () {
      touchMoved = true;
    },
    { passive: true },
  );

  overlay.addEventListener("touchend", function (e) {
    if (!touchMoved) return;
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;

    // Only trigger if horizontal swipe is dominant and long enough
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        navigateLightbox(1); // swipe left = next
      } else {
        navigateLightbox(-1); // swipe right = prev
      }
    }
  });

  document.body.appendChild(overlay);
}

function closeLightbox() {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  const img = overlay.querySelector(".lightbox-image-wrapper img");
  if (img) {
    img.removeAttribute("src");
    img.alt = "";
  }
  updateLightboxMeta(null);
  overlay.classList.remove("active");
  overlay.style.visibility = "hidden";
  lightboxCurrentIndex = -1;
  lightboxImageList = [];
}

function navigateLightbox(direction) {
  if (lightboxImageList.length <= 1) return;

  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  const img = overlay.querySelector(".lightbox-image-wrapper img");
  if (!img) return;

  // Calculate new index with wrapping
  let newIndex = lightboxCurrentIndex + direction;
  if (newIndex < 0) newIndex = lightboxImageList.length - 1;
  if (newIndex >= lightboxImageList.length) newIndex = 0;

  lightboxCurrentIndex = newIndex;

  // Determine slide direction for animation
  const slideClass = direction > 0
    ? "lightbox-slide-left"
    : "lightbox-slide-right";

  // Animate out
  img.classList.add(slideClass);
  img.style.opacity = "0";

  setTimeout(function () {
    const nextItem = lightboxImageList[lightboxCurrentIndex];
    img.src = nextItem.src;
    img.alt = nextItem.alt || "";
    updateLightboxMeta(nextItem);
    img.classList.remove("lightbox-slide-left", "lightbox-slide-right");

    // Animate in from opposite side
    const enterClass = direction > 0
      ? "lightbox-slide-right"
      : "lightbox-slide-left";
    img.classList.add(enterClass);

    // Force reflow
    void img.offsetWidth;

    img.classList.remove(enterClass);
    img.style.opacity = "";

    updateLightboxCounter();
  }, 180);
}

function updateLightboxCounter() {
  const counter = document.querySelector(".lightbox-counter");
  if (!counter) return;

  if (lightboxImageList.length <= 1) {
    counter.textContent = "";
    return;
  }

  counter.textContent = lightboxCurrentIndex + 1 + " / " +
    lightboxImageList.length;
}

function updateArrowVisibility() {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  const prev = overlay.querySelector(".lightbox-prev");
  const next = overlay.querySelector(".lightbox-next");
  const hasMultiple = lightboxImageList.length > 1;
  prev.style.display = hasMultiple ? "" : "none";
  next.style.display = hasMultiple ? "" : "none";
}

function openLightbox(clickedImage, container) {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  const img = overlay.querySelector(".lightbox-image-wrapper img");
  if (!img) return;
  overlay.style.visibility = "visible";

  // Reset any leftover transition classes
  img.classList.remove("lightbox-slide-left", "lightbox-slide-right");
  img.style.opacity = "";

  // Build the list of images scoped to the clicked image's container
  lightboxImageList = collectImagesFromContainer(container);

  // Find index of clicked image
  lightboxCurrentIndex = findImageIndexInContainer(container, clickedImage);
  if (lightboxCurrentIndex === -1) {
    // Fallback: image not found in list, just show it solo
    lightboxImageList = [getLightboxItemFromImage(clickedImage)];
    lightboxCurrentIndex = 0;
  }

  const currentItem = lightboxImageList[lightboxCurrentIndex];
  img.src = currentItem.src;
  img.alt = currentItem.alt || "";
  updateLightboxMeta(currentItem);

  updateArrowVisibility();
  updateLightboxCounter();
  overlay.classList.add("active");
}

// Event delegation: one listener each for gallery and featured cards.
function setupLightboxDelegation() {
  const containers = [
    { element: document.getElementById("gallery"), isGallery: true },
    {
      element: document.querySelector(".illustration-featured-grid"),
      isGallery: false,
    },
  ];

  for (let i = 0; i < containers.length; i++) {
    const containerConfig = containers[i];
    const container = containerConfig.element;
    if (!container) continue;

    container.addEventListener("click", function (e) {
      const clicked = e.target;
      if (!(clicked instanceof Element)) return;

      let img = null;
      const lightboxItem = clicked.closest("[data-lightbox-item]");
      if (lightboxItem && container.contains(lightboxItem)) {
        img = lightboxItem.querySelector("img");
      } else {
        const directImg = clicked.closest("img");
        if (directImg && container.contains(directImg)) {
          img = directImg;
        }
      }
      if (!img) return;

      // Scope archive clicks to the opened year section; other views stay local.
      const archiveMasonry = containerConfig.isGallery
        ? img.closest(".archive-masonry")
        : null;
      const lightboxContainer = archiveMasonry || container;

      openLightbox(img, lightboxContainer);
    });
  }
}

// ---- Page Header Reveal ----
function revealIllustrationPage() {
  const layout = document.querySelector(".illustration-layout");
  if (!layout) return;

  const elements = Array.from(
    document.querySelectorAll(".page-header, .illustration-layout"),
  );
  if (elements.length === 0) return;

  const reducedMotion = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    for (const el of elements) el.classList.add("is-visible");
    return;
  }

  for (const el of elements) el.classList.remove("is-visible");
  void layout.offsetHeight;
  for (const el of elements) el.classList.add("is-visible");
}

// ---- Reset gallery state ----
function resetMasonryState() {
  isArchive = false;
  currentYear = 2026;

  const tabs = document.querySelectorAll(".year-tab");
  for (let i = 0; i < tabs.length; i++) {
    const btn = tabs[i];
    const year = parseInt(btn.dataset.year);
    btn.classList.toggle("active", year === currentYear);
    if (btn.dataset.year === "archive") {
      btn.classList.remove("active");
    }
  }

  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.classList.toggle("archive-view", false);
  }
}

// ---- Initialise ----
function initMasonry() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  if (gallery.dataset.masonryInit === "true") {
    resetMasonryState();
    hasInitialGalleryRenderCompleted = false;
    setGallery({ animate: false });
    hasInitialGalleryRenderCompleted = true;
    revealIllustrationPage();
    return;
  }
  gallery.dataset.masonryInit = "true";

  resetMasonryState();
  createLightbox();
  setupYearTabs();
  setupLightboxDelegation();
  hasInitialGalleryRenderCompleted = false;
  setGallery({ animate: false });
  hasInitialGalleryRenderCompleted = true;
  revealIllustrationPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMasonry);
} else {
  initMasonry();
}

window.addEventListener("site:navigate:end", () => {
  initMasonry();
});
