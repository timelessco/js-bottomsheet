import anime from "animejs/lib/anime.es.js";

export function moveBottomSheet(targetBottomSheet, top, ease, duration) {
  let result = {
    targets: targetBottomSheet,
    translateY: top,
    easing: ease,
    duration,
  };
  anime(result);
}
