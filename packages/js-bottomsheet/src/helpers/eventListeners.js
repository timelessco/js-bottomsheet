import anime from "animejs";

export function resizeHover(targetBottomSheet, isWeb, resizableDiv, webLayout) {
  document.body.addEventListener("mousemove", e => {
    if (
      isWeb &&
      resizableDiv &&
      (webLayout === "sideSheetLeft" || webLayout === "sideSheetRight")
    ) {
      const compareValue =
        webLayout === "sideSheetLeft"
          ? resizableDiv.offsetLeft
          : resizableDiv.getBoundingClientRect().right;
      if (e.clientX > compareValue - 160 && e.clientX < compareValue + 160) {
        anime({
          targets: targetBottomSheet,
          borderLeft:
            webLayout === "sideSheetLeft"
              ? "unset"
              : `1px solid rgba(81, 203, 238, ${
                  1 - Math.abs(compareValue - e.clientX) / 100
                })`,
          borderRight:
            webLayout === "sideSheetLeft"
              ? `1px solid rgba(81, 203, 238, ${
                  1 - Math.abs(compareValue - e.clientX) / 100
                })`
              : "unset",
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
