/**
 * Graphic Design Portfolio – vanilla JS
 * Left sidebar project list, detail header, image grid, and lightbox.
 */

// ---- Project Data ----
// Add your projects here. Each project has a title, date, description, and deliverables.
const gdProjects = [
  {
    id: "project-1",
    title: "UB Recreation",
    date: "December 2025 – Present",
    description:
      "I design on-brand promotional graphics for University at Buffalo Recreation to support student engagement and campus wellness initiatives.",
    deliverables: [
      {
        src: "../assets/images/graphic_design/unplug&play.avif",
        alt: "Unplug and Play promotional graphic",
        caption:
          "Unplug and Play promotional graphic used for student engagement events.",
        usage: "Campus digital screens + social media",
      },
      {
        src: "../assets/images/graphic_design/intramurals_flyer.avif",
        alt: "Intramurals flyer graphic",
        caption:
          "Intramurals flyer highlighting league dates and registration details.",
        usage: "Print posters + campus bulletin boards",
      },
      {
        src: "../assets/images/graphic_design/giveaway.avif",
        alt: "Giveaway event graphic",
        caption:
          "Giveaway event graphic designed to drive sign-ups and attendance.",
        usage: "Social media + email header",
      },
    ],
    impact: [
      "Supported campus wellness initiatives by increasing visibility of recreation programs.",
      "Provided a consistent promotional system used across multiple channels.",
      "Helped the department communicate event details quickly and clearly.",
    ],
  },
  {
    id: "project-2",
    title: "Project Two",
    date: "Date 20xx",
    description: "WIP WIP WIP",
    deliverables: [
      {
        src: "../assets/images/image3.avif",
        alt: "Project Two graphic",
        caption: "Describe the deliverable and where it was used.",
        usage: "Usage context",
      },
    ],
    impact: ["Outcome or contribution for this project."],
  },
  {
    id: "project-3",
    title: "Project Three",
    date: "Date 20xx",
    description: "WIP WIP WIP",
    deliverables: [
      {
        src: "../assets/images/image4.avif",
        alt: "Project Three graphic 1",
        caption: "Describe the deliverable and where it was used.",
        usage: "Usage context",
      },
      {
        src: "../assets/images/image5.avif",
        alt: "Project Three graphic 2",
        caption: "Describe the deliverable and where it was used.",
        usage: "Usage context",
      },
      {
        src: "../assets/images/image6.avif",
        alt: "Project Three graphic 3",
        caption: "Describe the deliverable and where it was used.",
        usage: "Usage context",
      },
    ],
    impact: ["Outcome or contribution for this project."],
  },
];

// ---- State ----
let activeProjectId = gdProjects.length > 0 ? gdProjects[0].id : null;
let gdSidebarObserver = null;
let gdResizeBound = false;
let gdLightboxKeydownBound = false;

function revealGraphicDesignPage() {
  const layout = document.querySelector(".gd-layout");
  if (!layout) return;

  const elements = Array.from(
    document.querySelectorAll(".page-header, .gd-layout"),
  );
  if (elements.length === 0) return;

  const reducedMotion =
    typeof window !== "undefined" &&
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

// ---- Render Sidebar ----
function renderSidebar() {
  const list = document.querySelector(".gd-project-list");
  if (!list) return;

  list.innerHTML = "";

  gdProjects.forEach(function (project) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("gd-project-btn");
    if (project.id === activeProjectId) {
      btn.classList.add("active");
    }
    btn.dataset.projectId = project.id;
    btn.textContent = project.title;

    btn.addEventListener("click", function () {
      selectProject(project.id);
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// ---- Render Project Detail ----
function renderProjectDetail(project) {
  const titlePanel = document.querySelector(".gd-title");
  const main = document.querySelector(".gd-main");
  if (!titlePanel || !main) return;

  if (!project) {
    titlePanel.innerHTML =
      '<div class="gd-empty">Select a project to view</div>';
    main.innerHTML = '<div class="gd-empty">Select a project to view</div>';
    return;
  }

  const deliverablesGrid = (project.deliverables || [])
    .map(function (item) {
      return (
        '<figure class="gd-deliverable">' +
        '<div class="gd-deliverable-media">' +
        '<img src="' +
        escapeHtml(item.src) +
        '" alt="' +
        escapeHtml(item.alt || "") +
        '" loading="lazy" decoding="async" />' +
        "</div>" +
        '<figcaption class="gd-deliverable-caption">' +
        '<p class="gd-deliverable-title">' +
        escapeHtml(item.caption || "") +
        "</p>" +
        '<p class="gd-deliverable-usage">' +
        escapeHtml(item.usage || "") +
        "</p>" +
        "</figcaption>" +
        "</figure>"
      );
    })
    .join("");

  const titleHtml =
    '<div class="gd-detail-header">' +
    '<h2 class="gd-detail-title">' +
    escapeHtml(project.title) +
    "</h2>" +
    '<div class="gd-detail-date">' +
    escapeHtml(project.date) +
    "</div>" +
    '<p class="gd-detail-description">' +
    escapeHtml(project.description || "") +
    "</p>" +
    "</div>";

  const mainHtml =
    "<!-- Deliverables: responsive grid with captions -->" +
    '<section class="gd-section">' +
    '<h3 class="gd-section-title">Final Deliverables</h3>' +
    '<div class="gd-deliverables-grid">' +
    deliverablesGrid +
    "</div>" +
    "</section>";

  titlePanel.innerHTML = titleHtml;
  main.innerHTML = mainHtml;

  syncTitleHeight();
}

function syncTitleHeight() {
  const sidebar = document.querySelector(".gd-sidebar");
  const titlePanel = document.querySelector(".gd-title");
  if (!sidebar || !titlePanel) return;

  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(min-width: 901px)").matches;

  if (!isDesktop) {
    titlePanel.style.height = "";
    titlePanel.style.minHeight = "";
    return;
  }

  const sidebarHeight = sidebar.offsetHeight;
  if (!sidebarHeight) return;
  titlePanel.style.height = `${sidebarHeight}px`;
  titlePanel.style.minHeight = `${sidebarHeight}px`;
}

function observeTitleHeight() {
  if (gdSidebarObserver) return;
  if (typeof ResizeObserver === "undefined") return;

  const sidebar = document.querySelector(".gd-sidebar");
  if (!sidebar) return;

  gdSidebarObserver = new ResizeObserver(() => {
    syncTitleHeight();
  });
  gdSidebarObserver.observe(sidebar);
}

// ---- Select Project ----
function selectProject(projectId) {
  activeProjectId = projectId;

  // Update active button
  document.querySelectorAll(".gd-project-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.projectId === projectId);
  });

  // Find project data
  const project = gdProjects.find(function (p) {
    return p.id === projectId;
  });

  renderProjectDetail(project || null);
}

// ---- Lightbox ----
function createGdLightbox() {
  if (document.querySelector(".gd-lightbox-overlay")) return;

  const overlay = document.createElement("div");
  overlay.classList.add("gd-lightbox-overlay");
  overlay.innerHTML = '<img src="" alt="Lightbox image" />';
  overlay.style.visibility = "hidden";

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      overlay.style.visibility = "hidden";
    }
  });

  if (!gdLightboxKeydownBound) {
    gdLightboxKeydownBound = true;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;

      const activeOverlay = document.querySelector(".gd-lightbox-overlay");
      if (!activeOverlay) return;
      activeOverlay.classList.remove("active");
      activeOverlay.style.visibility = "hidden";
    });
  }

  document.body.appendChild(overlay);
}

function openGdLightbox(src, alt) {
  const overlay = document.querySelector(".gd-lightbox-overlay");
  if (!overlay) return;

  const img = overlay.querySelector("img");
  img.src = src;
  img.alt = alt || "";
  overlay.style.visibility = "visible";
  overlay.classList.add("active");
}

// Event delegation: single listener on .gd-main handles all image clicks
function setupGdLightboxDelegation() {
  const main = document.querySelector(".gd-main");
  if (!main) return;

  main.addEventListener("click", function (e) {
    const img = e.target.closest(".gd-deliverables-grid img");
    if (img) {
      openGdLightbox(img.src, img.alt);
    }
  });
}

// ---- Utility ----
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ---- Initialise ----
function initGraphicDesign() {
  const root = document.querySelector(".gd-layout");
  if (!root) return;
  if (root.dataset.gdInit === "true") return;
  root.dataset.gdInit = "true";

  createGdLightbox();
  setupGdLightboxDelegation();
  renderSidebar();

  if (activeProjectId) {
    selectProject(activeProjectId);
  }

  observeTitleHeight();
  syncTitleHeight();
  if (!gdResizeBound) {
    gdResizeBound = true;
    window.addEventListener("resize", syncTitleHeight);
  }

  revealGraphicDesignPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGraphicDesign);
} else {
  initGraphicDesign();
}

window.addEventListener("site:navigate:end", () => {
  initGraphicDesign();
});
