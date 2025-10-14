/* =========================================
   Zinnion — Video Lightbox
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Buttons that trigger the lightbox
  const triggers = document.querySelectorAll(".btn[data-video]");

  // Lightbox elements
  const lightbox = document.getElementById("video-lightbox");
  const video    = document.getElementById("lightbox-video");
  const caption  = document.getElementById("video-caption");
  const closeBtn = lightbox.querySelector(".close-btn");

  // Safety: if JS fails to find elements, bail quietly
  if (!lightbox || !video || !caption || !closeBtn) return;

  // Open
  function openLightbox(src, titleText){
    // show using display/opacity (avoid 'hidden' attribute issues)
    lightbox.style.display = "flex";
    requestAnimationFrame(() => lightbox.classList.add("show"));

    video.src = src || "";
    caption.textContent = titleText || "";
    document.body.classList.add("no-scroll");
    lightbox.setAttribute("aria-hidden", "false");
  }

  // Close
  function closeLightbox(){
    lightbox.classList.remove("show");
    setTimeout(() => {
      lightbox.style.display = "none";
      video.pause();
      video.removeAttribute("src"); // fully unload video
      caption.textContent = "";
      document.body.classList.remove("no-scroll");
      lightbox.setAttribute("aria-hidden", "true");
    }, 220);
  }

  // Bind button clicks
  triggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.getAttribute("data-video");
      const title = btn.closest(".project")?.querySelector("h2")?.textContent?.trim() || "Zinnion Project";
      if (src) openLightbox(src, title);
    });
  });

  // Close actions
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(); // only backdrop
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") closeLightbox();
  });
});
