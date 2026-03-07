export class Stack {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      randomRotation: false,
      sensitivity: 200,
      sendToBackOnClick: true,
      autoplay: false,
      autoplayDelay: 3000,
      pauseOnHover: false,
      cards: [],
      ...options,
    };

    this.stack = [];
    this.isPaused = false;
    this.autoplayInterval = null;
    this.dragState = null;

    this.init();
  }

  init() {
    this.container.classList.add("stack-container");

    // Build the stack array (bottom to top)
    this.stack = this.options.cards.map((content, index) => ({
      id: index + 1,
      content,
    }));

    this.render();
    this.setupAutoplay();

    if (this.options.pauseOnHover) {
      this.container.addEventListener("mouseenter", () => {
        this.isPaused = true;
        this.stopAutoplay();
      });
      this.container.addEventListener("mouseleave", () => {
        this.isPaused = false;
        this.setupAutoplay();
      });
    }
  }

  render() {
    this.container.innerHTML = "";

    this.stack.forEach((card, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("stack-card-wrapper");

      const cardEl = document.createElement("div");
      cardEl.classList.add("stack-card");

      if (typeof card.content === "string") {
        // Treat as image URL
        const img = document.createElement("img");
        img.src = card.content;
        img.alt = `card-${card.id}`;
        img.draggable = false;
        cardEl.appendChild(img);
      } else if (card.content instanceof HTMLElement) {
        cardEl.appendChild(card.content.cloneNode(true));
      }

      wrapper.appendChild(cardEl);
      this.container.appendChild(wrapper);

      // Apply stacked rotation
      const stackPosition = this.stack.length - index - 1;
      const randomRotate = this.options.randomRotation
        ? Math.random() * 10 - 5
        : 0;
      const rotation = stackPosition * 4 + randomRotate;
      const scale = 1 + index * 0.06 - this.stack.length * 0.06;

      cardEl.style.transform = `rotateZ(${rotation}deg) scale(${scale})`;
      cardEl.style.transformOrigin = "90% 90%";

      // z-index: higher index = on top
      wrapper.style.zIndex = index;

      // Drag handling
      this.setupDrag(wrapper, card.id);

      // Click to send to back
      if (this.options.sendToBackOnClick) {
        wrapper.addEventListener("click", () => {
          if (!this.dragState || !this.dragState.didDrag) {
            this.sendToBack(card.id);
          }
        });
      }
    });
  }

  setupDrag(wrapper, cardId) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    const onPointerDown = (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      currentX = 0;
      currentY = 0;
      wrapper.classList.add("dragging");
      wrapper.style.transition = "none";
      this.dragState = { didDrag: false };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      currentX = (clientX - startX) * 0.6;
      currentY = (clientY - startY) * 0.6;

      if (Math.abs(currentX) > 3 || Math.abs(currentY) > 3) {
        this.dragState = { didDrag: true };
      }

      const rotateX = (currentY / 100) * -60;
      const rotateY = (currentX / 100) * 60;

      wrapper.style.transform =
        `translate(${currentX}px, ${currentY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.classList.remove("dragging");
      wrapper.style.transition =
        "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      const offsetX = Math.abs(currentX);
      const offsetY = Math.abs(currentY);

      if (
        offsetX > this.options.sensitivity ||
        offsetY > this.options.sensitivity
      ) {
        this.sendToBack(cardId);
      } else {
        wrapper.style.transform = "translate(0, 0)";
      }

      // Reset didDrag after a tick so click handler can read it
      setTimeout(() => {
        if (this.dragState) this.dragState.didDrag = false;
      }, 0);
    };

    // Mouse events
    wrapper.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // Touch events
    wrapper.addEventListener("touchstart", onPointerDown, { passive: false });
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);
  }

  sendToBack(id) {
    const index = this.stack.findIndex((card) => card.id === id);
    if (index === -1) return;
    const [card] = this.stack.splice(index, 1);
    this.stack.unshift(card);
    this.render();
  }

  setupAutoplay() {
    this.stopAutoplay();
    if (this.options.autoplay && this.stack.length > 1 && !this.isPaused) {
      this.autoplayInterval = setInterval(() => {
        const topCard = this.stack[this.stack.length - 1];
        this.sendToBack(topCard.id);
      }, this.options.autoplayDelay);
    }
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}
