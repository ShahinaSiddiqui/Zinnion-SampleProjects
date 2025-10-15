/* =========================================
   ZINNION VIDEO LIGHTBOX SCRIPT (MOBILE-FRIENDLY)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".btn[data-video]");
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const caption = document.getElementById("video-caption");
  const closeBtn = lightbox.querySelector(".close-btn");

  // helper: open popup
  const openLightbox = (src, titleText) => {
    video.src = src;
    caption.textContent = titleText || "Zinnion Learning Experience";
    lightbox.hidden = false;
    void lightbox.offsetWidth; // reflow for animation
    lightbox.classList.add("show");
    document.body.classList.add("no-scroll");
  };

  // helper: close popup
  const closeLightbox = () => {
    lightbox.classList.remove("show");
    video.pause();
    video.src = "";
    caption.textContent = "";
    document.body.classList.remove("no-scroll");
    setTimeout(() => (lightbox.hidden = true), 350);
  };

  // --- Fix for mobile taps ---
  // use both click + touchstart for broader coverage
  triggers.forEach(btn => {
    ["click", "touchstart"].forEach(evtType => {
      btn.addEventListener(evtType, e => {
        e.preventDefault();
        e.stopPropagation();
        const src = btn.dataset.video;
        const titleEl = btn.closest(".project-copy")?.querySelector("h2");
        const titleText = titleEl ? titleEl.textContent.trim() : "";
        if (src) openLightbox(src, titleText);
      }, { passive: true });
    });
  });

  // close triggers
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // safety: make sure the overlay never intercepts taps when hidden
  const observer = new MutationObserver(() => {
    if (lightbox.hidden || !lightbox.classList.contains("show")) {
      lightbox.style.pointerEvents = "none";
    } else {
      lightbox.style.pointerEvents = "auto";
    }
  });
  observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden", "class"] });
});
