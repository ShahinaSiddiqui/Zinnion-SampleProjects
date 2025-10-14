document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-video]");
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const closeBtn = lightbox.querySelector(".close-btn");

  // Open video in popup
  triggers.forEach(el => {
    el.addEventListener("click", () => {
      const src = el.dataset.video;
      if (!src) return;
      video.src = src;
      lightbox.hidden = false;
      document.body.classList.add("no-scroll");
    });
  });

  // Close popup
  const closeLightbox = () => {
    video.pause();
    video.src = "";
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});

