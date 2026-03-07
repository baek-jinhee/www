/**
 * Contact Form – vanilla JS
 * EmailJS integration with form validation and status feedback.
 */

// ---- EmailJS Configuration ----
// Replace these with your actual EmailJS IDs:
const EMAILJS_PUBLIC_KEY = "0pQYfk1P4ewliqwUd";
const EMAILJS_SERVICE_ID = "service_5mphs0e";
const EMAILJS_TEMPLATE_ID = "template_yxqc8gn";

// ---- Initialise ----
function initContactForm() {
  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("contact-send-btn");
  const status = document.getElementById("contact-status");

  if (!form || !sendBtn || !status) return;

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
  document.addEventListener("DOMContentLoaded", initContactForm);
} else {
  initContactForm();
}
