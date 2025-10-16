/* =========================================
   ZINNION VIDEO LIGHTBOX SCRIPT (FINAL + FIXED ✕ BUTTON)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".btn[data-video]");
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const caption = document.getElementById("video-caption");
  const closeBtn = lightbox.querySelector(".close-btn");

  // --- Open Lightbox ---
  const openLightbox = (src, titleText) => {
    video.src = src;
    caption.textContent = titleText || "Zinnion Learning Experience";
    lightbox.hidden = false;
    void lightbox.offsetWidth;
    lightbox.classList.add("show");
    document.body.classList.add("no-scroll");
  };

  // --- Close Lightbox ---
  const closeLightbox = () => {
    lightbox.classList.remove("show");
    video.pause();
    video.src = "";
    caption.textContent = "";
    document.body.classList.remove("no-scroll");
    setTimeout(() => (lightbox.hidden = true), 350);
  };

  // --- Open on click/tap only (not hover) ---
  triggers.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.dataset.video;
      const titleEl = btn.closest(".project-copy")?.querySelector("h2");
      const titleText = titleEl ? titleEl.textContent.trim() : "";
      if (src) openLightbox(src, titleText);
    });
  });

  // --- Close via button or ESC key only ---
  closeBtn.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // --- Disable closing by clicking outside the video frame ---
  lightbox.addEventListener("click", e => {
    e.stopPropagation();
  });

  // --- Safety: maintain pointer events ---
  const observer = new MutationObserver(() => {
    if (lightbox.hidden || !lightbox.classList.contains("show")) {
      lightbox.style.pointerEvents = "none";
    } else {
      lightbox.style.pointerEvents = "auto";
    }
  });
  observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden", "class"] });
});
