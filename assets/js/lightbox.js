/* ========================================= 
   ZINNION VIDEO LIGHTBOX SCRIPT (Stable)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".btn[data-video]");
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const caption = document.getElementById("video-caption");
  const closeBtn = lightbox.querySelector(".close-btn");

  // --- Function: Open Lightbox ---
  const openLightbox = (src, titleText) => {
    if (!src) return;

    // Set video source
    video.src = src;
    video.load();

    // Set caption
    caption.textContent = titleText || "Zinnion Learning Experience";

    // Show lightbox
    lightbox.hidden = false;
    void lightbox.offsetWidth; // trigger reflow for animation
    lightbox.classList.add("show");

    // Disable body scroll
    document.body.classList.add("no-scroll");

    // Auto play after small delay for stability
    setTimeout(() => {
      video.play().catch(() => {});
    }, 250);
  };

  // --- Function: Close Lightbox ---
  const closeLightbox = () => {
    video.pause();
    video.currentTime = 0;
    video.removeAttribute("src");
    caption.textContent = "";

    lightbox.classList.remove("show");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      lightbox.hidden = true;
    }, 300);
  };

  // --- Button Click Events ---
  triggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const src = btn.dataset.video;
      const titleEl = btn.closest(".project-copy")?.querySelector("h2");
      const titleText = titleEl ? titleEl.textContent.trim() : "";

      openLightbox(src, titleText);
    });
  });

  // --- Close Button ---
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeLightbox();
    });
  }

  // --- Click outside closes popup ---
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // --- ESC key closes popup ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
});
