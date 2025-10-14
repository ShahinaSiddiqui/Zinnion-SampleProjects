/* ===== Lightbox ===== */
.video-lightbox {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 30px;
}
.video-lightbox.show {
  display: flex;
  opacity: 1;
}

/* Keep content centered and responsive */
.lightbox-content {
  position: relative;
  width: 80%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.4s ease;
}

/* === Frame and Video === */
.video-frame {
  width: 100%;
  border: 8px solid #d58a00; /* brand color */
  border-radius: 14px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 25px rgba(213, 138, 0, 0.4);
}

/* The video fills the frame area immediately */
#lightbox-video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  background: #000;
}

/* === Caption band === */
.video-caption {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  margin-top: 10px;
  border-radius: 8px;
  background: rgba(213, 138, 0, 0.25); /* lighter shade of brand color */
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.3px;
  font-size: 0.95rem;
  animation: fadeIn 0.5s ease;
}

/* === Close button === */
.close-btn {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #000;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, background 0.2s ease;
}
.close-btn:hover {
  transform: scale(1.08);
  background: #d58a00;
  color: #000;
}

/* Keep background scroll disabled while open */
.no-scroll {
  overflow: hidden;
}

/* Fade animation */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
