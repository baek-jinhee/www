/**
 * Masonry Gallery – vanilla JS
 * Responsive column layout with lightbox, resize handling, and year tabs.
 */

// ---- Image data by year ----
const galleries = {
  2026: [
    {
      src: "../assets/images/illustration/mane6.avif",
      alt: "First image",
      w: 2256,
      h: 1504,
    },
    {
      src: "../assets/images/illustration/celine.avif",
      alt: "Second image",
      w: 1504,
      h: 1840,
    },
    {
      src: "../assets/images/illustration/pony2.avif",
      alt: "Third image",
      w: 1688,
      h: 1592,
    },
    {
      src: "../assets/images/illustration/wish.avif",
      alt: "Fourth image",
      w: 662,
      h: 1466,
    },
    {
      src: "../assets/images/illustration/wish_ref.avif",
      alt: "Fifth image",
      w: 1504,
      h: 1504,
    },

    {
      src: "../assets/images/illustration/wish2.avif",
      alt: "Sixth image",
      w: 3416,
      h: 2744,
    },
    {
      src: "../assets/images/illustration/pony1.avif",
      alt: "7th image",
      w: 300,
      h: 400,
    },
  ],
  2025: [
    // Add your 2025 images here with the same format:
    // { src: "../assets/images/example.avif", alt: "Description", w: 1200, h: 800 },
  ],
};

// ---- State ----
let currentYear = 2026;
let columnHeights;
let columnStrings;

// ---- Column helpers ----
function getNumColumns() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 1000) return 2;
  if (window.innerWidth < 1200) return 3;
  return 4;
}

function addImageToColumns(img) {
  const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
  const imageHeight = (img.h / img.w) * 100;

  columnStrings[shortestColumn] += '<img src="' +
    img.src +
    '" alt="' +
    img.alt +
    '" title="' +
    img.alt +
    '" loading="lazy" />';

  columnHeights[shortestColumn] += imageHeight;
}

function setGallery() {
  const images = galleries[currentYear] || [];
  const numCols = getNumColumns();
  columnHeights = new Array(numCols).fill(0);
  columnStrings = new Array(numCols).fill("");

  images.forEach(addImageToColumns);

  let galleryHTML = "";
  for (let i = 0; i < columnStrings.length; i++) {
    galleryHTML += "<div>" + columnStrings[i] + "</div>";
  }

  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.innerHTML = galleryHTML;
    gallery.classList.remove("fade-in");
    void gallery.offsetWidth;
    gallery.classList.add("fade-in");
    attachLightboxListeners();
  }
}

// ---- Year tab switching ----
function switchYear(year) {
  if (year === currentYear) return;
  currentYear = year;

  // Update active tab button
  document.querySelectorAll(".year-tab").forEach(function (btn) {
    btn.classList.toggle("active", parseInt(btn.dataset.year) === year);
  });

  // Re-render gallery
  const images = galleries[currentYear] || [];
  preloadImages(images).then(function () {
    setGallery();
  });
  setGallery();
}

function setupYearTabs() {
  document.querySelectorAll(".year-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchYear(parseInt(btn.dataset.year));
    });
  });
}

// ---- Lightbox ----
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

function attachLightboxListeners() {
  const galleryImages = document.querySelectorAll("#gallery img");
  galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img.src, img.alt);
    });
  });
}

// ---- Preload images ----
function preloadImages(imageList) {
  return Promise.all(
    imageList.map(function (item) {
      return new Promise(function (resolve) {
        const img = new Image();
        img.src = item.src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    }),
  );
}

// ---- Resize handling (debounced) ----
let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    setGallery();
  }, 150);
}

// ---- Initialise ----
function initMasonry() {
  createLightbox();
  setupYearTabs();

  const images = galleries[currentYear] || [];
  preloadImages(images).then(function () {
    setGallery();
  });
  setGallery();
  window.addEventListener("resize", handleResize);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMasonry);
} else {
  initMasonry();
}
