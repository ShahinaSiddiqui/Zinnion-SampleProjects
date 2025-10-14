document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".btn[data-video]"); // only buttons
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const caption = document.getElementById("video-caption");
  const closeBtn = lightbox.querySelector(".close-btn");

  const openLightbox = (src, titleText) => {
    video.src = src;
    caption.textContent = titleText || "Zinnion Learning Experience";
    lightbox.hidden = false;
    void lightbox.offsetWidth; // reset for transition
    lightbox.classList.add("show");
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    video.pause();
    video.src = "";
    caption.textContent = "";
    document.body.classList.remove("no-scroll");
    setTimeout(() => (lightbox.hidden = true), 350);
  };

  // open on button click only
  triggers.forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const src = btn.dataset.video;
      const titleEl = btn.closest(".project-copy")?.querySelector("h2");
      const titleText = titleEl ? titleEl.textContent.trim() : "";
      if (src) openLightbox(src, titleText);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
