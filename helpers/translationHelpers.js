import anime from "animejs/lib/anime.es.js";

export function moveBottomSheet(
  targetBottomSheet,
  top,
  ease,
  duration,
  animateOnDrag,
  reset = false
) {
  let result = {
    targets: targetBottomSheet,
    translateY: top,
    easing: ease,
    duration,
    animateOnDrag,
  };
  animateOnDrag &&
    Object.keys(animateOnDrag).forEach((i) => {
      result = { ...result, [i]: animateOnDrag[i] };
    });
  if (animateOnDrag && reset)
    Object.keys(animateOnDrag).forEach((i) => {
      result = { ...result, [i]: 1 };
    });
  anime(result);
}
