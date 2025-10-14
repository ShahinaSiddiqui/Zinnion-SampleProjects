document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-video]");
  const lightbox = document.getElementById("video-lightbox");
  const video = document.getElementById("lightbox-video");
  const closeBtn = lightbox.querySelector(".close-btn");

  const openLightbox = (src) => {
    video.src = src;
    lightbox.hidden = false;
    // force reflow so CSS transition starts cleanly
    void lightbox.offsetWidth;
    lightbox.classList.add("show");
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    video.pause();
    video.src = "";
    document.body.classList.remove("no-scroll");
    // wait for fade-out before hiding
    setTimeout(() => (lightbox.hidden = true), 300);
  };

  // open
  triggers.forEach(el => {
    el.addEventListener("click", () => {
      const src = el.dataset.video;
      if (src) openLightbox(src);
    });
  });

  // close
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
