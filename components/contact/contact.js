/**
 * Contact Form – vanilla JS
 * EmailJS integration with form validation and status feedback.
 */

// ---- EmailJS Configuration ----
// Replace these with your actual EmailJS IDs:
const EMAILJS_PUBLIC_KEY = "0pQYfk1P4ewliqwUd";
const EMAILJS_SERVICE_ID = "service_5mphs0e";
const EMAILJS_TEMPLATE_ID = "template_yxqc8gn";

const REDUCED_MOTION = typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initContactHeaderReveal() {
  const header = document.querySelector(".page-header");
  if (!header) return;
  if (header.dataset.revealBound === "true") return;
  header.dataset.revealBound = "true";

  if (REDUCED_MOTION || typeof IntersectionObserver === "undefined") {
    header.classList.add("is-visible");
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
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    },
  );

  observer.observe(header);
}

function restartPagedollAnimation() {
  if (REDUCED_MOTION) return;
  const pagedoll = document.querySelector(".contact-pagedoll img");
  if (!pagedoll) return;
  pagedoll.style.animation = "none";
  void pagedoll.offsetHeight;
  pagedoll.style.animation = "";
}

// ---- Initialise ----
function initContactForm() {
  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("contact-send-btn");
  const status = document.getElementById("contact-status");

  if (!form || !sendBtn || !status) return;
  if (form.dataset.contactBound === "true") return;
  form.dataset.contactBound = "true";

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('[name="from_name"]');
    const email = form.querySelector('[name="from_email"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showStatus(status, "Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email.value.trim())) {
      showStatus(status, "Please enter a valid email address.", "error");
      return;
    }

    // Disable button and show sending state
    sendBtn.disabled = true;
    sendBtn.classList.add("sending");
    sendBtn.textContent = "Sending...";
    status.textContent = "";
    status.className = "contact-status";

    // Check if EmailJS is loaded
    if (typeof emailjs === "undefined") {
      showStatus(
        status,
        "Email service not loaded. Please refresh and try again.",
        "error",
      );
      resetButton(sendBtn);
      return;
    }

    // Send via EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form).then(
      function () {
        showStatus(
          status,
          "Message sent! I'll get back to you soon ♡",
          "success",
        );
        form.reset();
        resetButton(sendBtn);
      },
      function (error) {
        console.error("EmailJS error:", error);
        showStatus(
          status,
          "Something went wrong. Please try again later.",
          "error",
        );
        resetButton(sendBtn);
      },
    );
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = "contact-status " + type;
}

function resetButton(btn) {
  btn.disabled = false;
  btn.classList.remove("sending");
  btn.textContent = "Send Message";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Init on DOM ready ----
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
    initContactHeaderReveal();
    restartPagedollAnimation();
  });
} else {
  initContactForm();
  initContactHeaderReveal();
  restartPagedollAnimation();
}

window.addEventListener("site:navigate:end", () => {
  initContactForm();
  initContactHeaderReveal();
  restartPagedollAnimation();
});
