/**
 * Graphic Design Portfolio – vanilla JS
 * Left sidebar project list, detail header, image grid, and lightbox.
 */

// ---- Project Data ----
// Add your projects here. Each project has a title, date, description, and images array.
const gdProjects = [
  {
    id: "project-1",
    title: "UB Recreation",
    date: "December 2025 -- Present",
    description:
      "I design on-brand promotional graphics for University at Buffalo Recreation to support student engagement and campus wellness initiatives.",
    images: [
      {
        src: "../assets/images/graphic_design/unplug&play.avif",
        alt: "Project 1 - Image 1",
      },
      {
        src: "../assets/images/graphic_design/intramurals_flyer.avif",
        alt: "Project 1 - Image 2",
      },
      {
        src: "../assets/images/graphic_design/giveaway.avif",
        alt: "Project 1 - Image 2",
      },
    ],
  },
  {
    id: "project-2",
    title: "Project Two",
    date: "Date 20xx",
    description: "WIP WIP WIP",
    images: [
      { src: "../assets/images/image3.avif", alt: "Project 2 - Image 1" },
    ],
  },
  {
    id: "project-3",
    title: "Project Three",
    date: "Date 20xx",
    description: "WIP WIP WIP",
    images: [
      { src: "../assets/images/image4.avif", alt: "Project 3 - Image 1" },
      { src: "../assets/images/image5.avif", alt: "Project 3 - Image 2" },
      { src: "../assets/images/image6.avif", alt: "Project 3 - Image 3" },
    ],
  },
];

// ---- State ----
let activeProjectId = gdProjects.length > 0 ? gdProjects[0].id : null;

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
  const main = document.querySelector(".gd-main");
  if (!main) return;

  if (!project) {
    main.innerHTML = '<div class="gd-empty">Select a project to view</div>';
    return;
  }

  // Build detail header
  let html = '<div class="gd-detail-header">' +
    '<h2 class="gd-detail-title">' +
    escapeHtml(project.title) +
    "</h2>" +
    '<div class="gd-detail-date">' +
    escapeHtml(project.date) +
    "</div>" +
    '<p class="gd-detail-description">' +
    escapeHtml(project.description) +
    "</p>" +
    "</div>";

  // Build image grid
  if (project.images && project.images.length > 0) {
    html += '<div class="gd-image-grid">';
    project.images.forEach(function (img) {
      html += '<img src="' +
        escapeHtml(img.src) +
        '" alt="' +
        escapeHtml(img.alt) +
        '" title="' +
        escapeHtml(img.alt) +
        '" loading="lazy" />';
    });
    html += "</div>";
  }

  main.innerHTML = html;

  // Trigger fade-in animation
  main.classList.remove("fade-in");
  // Force reflow so the animation restarts
  void main.offsetWidth;
  main.classList.add("fade-in");

  // Attach lightbox listeners to new images
  attachGdLightboxListeners();
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

function openGdLightbox(src, alt) {
  const overlay = document.querySelector(".gd-lightbox-overlay");
  if (!overlay) return;

  const img = overlay.querySelector("img");
  img.src = src;
  img.alt = alt || "";
  overlay.classList.add("active");
}

function attachGdLightboxListeners() {
  const images = document.querySelectorAll(".gd-image-grid img");
  images.forEach(function (img) {
    img.addEventListener("click", function () {
      openGdLightbox(img.src, img.alt);
    });
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
  createGdLightbox();
  renderSidebar();

  if (activeProjectId) {
    selectProject(activeProjectId);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGraphicDesign);
} else {
  initGraphicDesign();
}
