import anime from "animejs/lib/anime.es";

export function hideOverlay(overlay) {
  anime({
    targets: overlay,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0,
  });
  setTimeout(() => {
    if (overlay?.classList?.contains("display")) {
      overlay.classList.remove("display");
    }
    if (overlay) overlay.remove();
  }, 300);

  document.body.style.overflow = "scroll";
  // targetBottomSheet.innerHTML = "";
}

export function addOverlay(overlay) {
  overlay.classList.add("display");
  anime({
    targets: overlay,
    opacity: 1,
    easing: "spring(1, 85, 35, 12)",
    duration: 0,
  });
}
