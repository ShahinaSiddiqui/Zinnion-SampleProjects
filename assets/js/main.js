document.addEventListener("DOMContentLoaded", () => {
  // DOWNLOAD BUTTON HANDLER
  const downloadBtn = document.querySelector(".download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const originalText = downloadBtn.textContent;
      downloadBtn.textContent = "Downloading...";
      downloadBtn.classList.add("downloading");

      // revert text back after 1.8 seconds
      setTimeout(() => {
        downloadBtn.textContent = originalText;
        downloadBtn.classList.remove("downloading");
      }, 1800);
    });
  }
});
