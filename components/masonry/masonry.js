/**
 * Masonry Gallery – vanilla JS
 * CSS columns handle layout. JS handles tab switching, lightbox, and archive rendering.
 */

// ---- Image data by year ----
const galleries = {
  2026: [
    {
      src: "../assets/images/illustration/mane6.avif",
      alt: "First image",
    },
    {
      src: "../assets/images/illustration/celine.avif",
      alt: "Second image",
    },
    {
      src: "../assets/images/illustration/pony2.avif",
      alt: "Third image",
    },
    {
      src: "../assets/images/illustration/wish.avif",
      alt: "Fourth image",
    },
    {
      src: "../assets/images/illustration/wish_ref.avif",
      alt: "Fifth image",
    },
    {
      src: "../assets/images/illustration/wish2.avif",
      alt: "Sixth image",
    },
    {
      src: "../assets/images/illustration/pony1.avif",
      alt: "7th image",
    },
  ],
  2025: [],
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

// ---- Render gallery (single render, no preload blocking) ----
function setGallery() {
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
  gallery.classList.remove("fade-in");
  // Force reflow to restart animation
  void gallery.offsetWidth;
  gallery.classList.add("fade-in");
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

  setGallery();
}

function setupYearTabs() {
  const tabs = document.querySelectorAll(".year-tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      switchYear(this.dataset.year);
    });
  }
}

// ---- Lightbox (event delegation, created once) ----
function createLightbox() {
  if (document.querySelector(".lightbox-overlay")) return;

  const overlay = document.createElement("div");
  overlay.classList.add("lightbox-overlay");
  overlay.innerHTML = '<img src="" alt="Lightbox image" />';

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
    }
  });

  document.body.appendChild(overlay);
}

function openLightbox(src, alt) {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  const img = overlay.querySelector("img");
  img.src = src;
  img.alt = alt || "";
  overlay.classList.add("active");
}

// Event delegation: single listener on #gallery handles all image clicks
function setupLightboxDelegation() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.addEventListener("click", function (e) {
    const img = e.target.closest("img");
    if (img) {
      openLightbox(img.src, img.alt);
    }
  });
}

// ---- Resize: only rebuild if column count actually changed ----
// CSS handles responsive column-count via media queries, so JS
// does not need to rebuild on resize at all. The only case where
// a rebuild would matter is if the archive view is open and the
// number of columns for the archive-masonry sections changed,
// but since CSS columns handle that too, no JS rebuild is needed.
//
// We keep a minimal resize handler only for edge cases where the
// gallery view mode (archive vs normal) might benefit from a rebuild
// (e.g., if you later add JS-dependent column logic). For now it's
// essentially a no-op since CSS columns are fully responsive.

// ---- Initialise ----
function initMasonry() {
  createLightbox();
  setupYearTabs();
  setupLightboxDelegation();
  setGallery();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMasonry);
} else {
  initMasonry();
}
