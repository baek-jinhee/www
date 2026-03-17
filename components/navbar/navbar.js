class Navbar {
  constructor() {
    this.navbarContainer = null;
    this.hamburger = null;
    this.navMenu = null;
  }

  init() {
    // Fetch and inject navbar HTML
    fetch("/components/navbar/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        const navbarWrapper = document.createElement("div");
        navbarWrapper.innerHTML = html;
        document.body.insertBefore(
          navbarWrapper.firstElementChild,
          document.body.firstChild,
        );

        // Create top color bar to cover notch/status bar area on Safari mobile
        const topBar = document.createElement("div");
        topBar.classList.add("top-color-bar");
        document.body.insertBefore(topBar, document.body.firstChild);

        this.setupEventListeners();
        this.setActivePage();

        window.__navbarInstance = this;
        window.addEventListener("site:navigate:end", () => {
          this.setActivePage();
        });
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }

  setupEventListeners() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");

    // Create backdrop overlay for blur effect
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add("nav-backdrop");
    document.body.appendChild(this.backdrop);

    if (this.hamburger && this.navMenu) {
      const closeMenu = () => {
        this.navMenu.classList.remove("active");
        this.hamburger.classList.remove("active");
        this.backdrop.classList.remove("active");
      };

      this.hamburger.addEventListener("click", () => {
        this.navMenu.classList.toggle("active");
        this.hamburger.classList.toggle("active");
        this.backdrop.classList.toggle("active");
      });

      this.backdrop.addEventListener("click", closeMenu);

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      window.addEventListener("site:navigate", closeMenu);
      window.addEventListener("site:navigate:end", closeMenu);
    }
  }

  setActivePage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const page = link.getAttribute("data-page");
      const href = link.getAttribute("href");

      // Check if this link should be active
      let isActive = false;

      if (page === "home") {
        // Home is active only on root or index.html
        isActive = currentPath === "/" || currentPath === "/index.html";
      } else if (href) {
        // For other pages, check if the current path matches
        const pageName = href.replace(/^\/pages\//, "").replace(".html", "");
        isActive = currentPath.includes(pageName);
      }

      if (isActive) {
        link.classList.add("active");
      }
    });
  }
}

// Initialize navbar when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = new Navbar();
    navbar.init();
  });
} else {
  const navbar = new Navbar();
  navbar.init();
}
