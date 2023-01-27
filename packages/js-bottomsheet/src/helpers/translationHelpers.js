import anime from "animejs/lib/anime.es";

export function moveBottomSheet(targetBottomSheet, top, ease, duration) {
  const result = {
    targets: targetBottomSheet,
    translateY: top,
    easing: ease,
    duration,
  };
  anime(result);
}
