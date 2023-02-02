import anime from "animejs";

import { convertToPxWidth } from "./convertionHelpers";

export function resizeHover(targetBottomSheet, isWeb, resizableDiv, webLayout) {
  document.body.addEventListener("mousemove", e => {
    if (
      isWeb &&
      resizableDiv &&
      (webLayout === "sideSheetLeft" || webLayout === "sideSheetRight")
    ) {
      if (
        e.clientX > resizableDiv.offsetLeft - 60 &&
        e.clientX < resizableDiv.offsetLeft + 60
      ) {
        console.log(resizableDiv.offsetLeft - e.clientX);
        anime({
          targets: targetBottomSheet,
          borderRight: `1px solid rgba(81, 203, 238, ${
            1 - Math.abs(resizableDiv.offsetLeft - e.clientX) / 100
          })`,
          easing: `spring(1, 200, 20, 3)`,
          duration: 2,
        });
      } else {
        anime({
          targets: targetBottomSheet,
          borderRight: `1px solid white`,
          easing: `spring(1, 200, 20, 3)`,
          duration: 2,
        });
      }
    }
  });
}
