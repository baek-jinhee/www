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

// ---- Archive data (2024–2016) ----
const archive = {
  2024: [
    { src: "../assets/images/illustration/2024/oc12.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc1.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc13.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/wish.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc6.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc9.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc10.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc11.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc7.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/oc8.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/girl.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2024/smiski.avif", w: 1200, h: 800 },
  ],
  2023: [
    { src: "../assets/images/illustration/2023/oc.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/wish.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc8.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/oc9.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/rarity.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2023/twi.avif", w: 1200, h: 800 },
  ],
  2022: [
    { src: "../assets/images/illustration/2022/rei.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/lisa.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/girl.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/dog.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/tsuki.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/celine.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/me.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/zeph.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/belle.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/splat.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2022/anya.avif", w: 1200, h: 800 },
  ],
  2021: [
    { src: "../assets/images/illustration/2021/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/ocs.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/oc5.avif", w: 1200, h: 800 },
    {
      src: "../assets/images/illustration/2021/seoryoung.avif",
      w: 1200,
      h: 800,
    },
    { src: "../assets/images/illustration/2021/oc6.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/oc7.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/twi.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2021/venti.avif", w: 1200, h: 800 },
  ],
  2020: [
    { src: "../assets/images/illustration/2020/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2020/oc1.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2020/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2020/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2020/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2020/oc6.avif", w: 1200, h: 800 },
    {
      src: "../assets/images/illustration/2020/seoryoung.avif",
      w: 1200,
      h: 800,
    },
    {
      src: "../assets/images/illustration/2020/seokyoung.avif",
      w: 1200,
      h: 800,
    },
  ],
  2019: [
    { src: "../assets/images/illustration/2019/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc6.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc7.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/oc1.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2019/owl.avif", w: 1200, h: 800 },
  ],
  2018: [
    { src: "../assets/images/illustration/2018/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc6.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc7.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc8.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc9.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2018/oc1.avif", w: 1200, h: 800 },
  ],
  2017: [
    { src: "../assets/images/illustration/2017/oc1.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc4.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc5.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc7.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc8.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2017/oc9.avif", w: 1200, h: 800 },
  ],
  2016: [
    { src: "../assets/images/illustration/2016/frisk.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2016/girl.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2016/oc1.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2016/oc2.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2016/oc3.avif", w: 1200, h: 800 },
    { src: "../assets/images/illustration/2016/oc4.avif", w: 1200, h: 800 },
  ],
};

// ---- State ----
let currentYear = 2026;
let isArchive = false;
let columnHeights;
let columnStrings;

// ---- Column helpers ----
function getNumColumns() {
  if (window.innerWidth < 480) return 2;
  if (window.innerWidth < 600) return 2;
  if (window.innerWidth < 1000) return 2;
  if (window.innerWidth < 1200) return 3;
  return 4;
}

function getArchiveNumColumns() {
  if (window.innerWidth < 480) return 2;
  if (window.innerWidth < 600) return 3;
  if (window.innerWidth < 1000) return 4;
  if (window.innerWidth < 1200) return 5;
  return 6;
}

var roundRobinIndex = 0;

function addImageToColumns(img) {
  const col = roundRobinIndex % columnHeights.length;
  roundRobinIndex++;

  columnStrings[col] += '<img src="' +
    img.src +
    '" alt="' +
    img.alt +
    '" title="' +
    img.alt +
    '" loading="lazy" />';
}

function buildMasonryHTML(images) {
  const numCols = getNumColumns();
  columnHeights = new Array(numCols).fill(0);
  columnStrings = new Array(numCols).fill("");
  roundRobinIndex = 0;

  images.forEach(addImageToColumns);

  let html = "";
  for (let i = 0; i < columnStrings.length; i++) {
    html += "<div>" + columnStrings[i] + "</div>";
  }
  return html;
}

function setGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  if (isArchive) {
    renderArchive(gallery);
  } else {
    const images = galleries[currentYear] || [];
    gallery.innerHTML = buildMasonryHTML(images);
  }

  gallery.classList.remove("fade-in");
  void gallery.offsetWidth;
  gallery.classList.add("fade-in");
  attachLightboxListeners();
}

function renderArchive(gallery) {
  let html = "";

  // Blurb
  html += '<div class="archive-blurb">' +
    "<p>This is my archived art from 2016\u20132024.</p>" +
    "</div>";

  // Render each year newest to oldest
  const years = Object.keys(archive)
    .map(Number)
    .sort(function (a, b) {
      return b - a;
    });

  years.forEach(function (year) {
    const images = archive[year] || [];
    const hasImages = images.length > 0;

    html += '<details class="archive-year-section">' +
      '<summary class="archive-year-heading">' +
      year +
      " (" +
      images.length +
      ")" +
      "</summary>" +
      '<div class="archive-year-content">';

    if (hasImages) {
      const numCols = getArchiveNumColumns();
      columnHeights = new Array(numCols).fill(0);
      columnStrings = new Array(numCols).fill("");
      roundRobinIndex = 0;
      images.forEach(addImageToColumns);

      html += '<div class="archive-masonry">';
      for (let i = 0; i < columnStrings.length; i++) {
        html += "<div>" + columnStrings[i] + "</div>";
      }
      html += "</div>";
    } else {
      html += '<div class="archive-empty">' + "<p>No images yet.</p>" +
        "</div>";
    }

    html += "</div></details>";
  });

  gallery.innerHTML = html;

  // Animate archive dropdowns and attach lightbox listeners
  gallery.querySelectorAll(".archive-year-section").forEach(function (details) {
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
        // Attach lightbox after opening
        requestAnimationFrame(function () {
          attachLightboxListeners();
        });
      }
    });
  });
}

// ---- Year tab switching ----
function switchYear(year) {
  if (year === "archive") {
    if (isArchive) return;
    isArchive = true;
    currentYear = null;
  } else {
    year = parseInt(year);
    if (!isArchive && year === currentYear) return;
    isArchive = false;
    currentYear = year;
  }

  // Update active tab button
  document.querySelectorAll(".year-tab").forEach(function (btn) {
    if (isArchive) {
      btn.classList.toggle("active", btn.dataset.year === "archive");
    } else {
      btn.classList.toggle(
        "active",
        parseInt(btn.dataset.year) === currentYear,
      );
    }
  });

  // Update gallery class for styling
  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.classList.toggle("archive-view", isArchive);
  }

  // Re-render gallery
  if (isArchive) {
    const allImages = [];
    Object.values(archive).forEach(function (imgs) {
      allImages.push.apply(allImages, imgs);
    });
    preloadImages(allImages).then(function () {
      setGallery();
    });
    setGallery();
  } else {
    const images = galleries[currentYear] || [];
    preloadImages(images).then(function () {
      setGallery();
    });
    setGallery();
  }
}

function setupYearTabs() {
  document.querySelectorAll(".year-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchYear(btn.dataset.year);
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
  const galleryImages = document.querySelectorAll(
    "#gallery img, .archive-masonry img",
  );
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
