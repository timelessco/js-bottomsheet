import anime from "animejs/lib/anime.es";

import { convertToPxWidth } from "./convertionHelpers";

export function moveBottomSheet(targetBottomSheet, top, ease, duration) {
  const result = {
    targets: targetBottomSheet,
    translateY: top,
    easing: ease,
    duration,
  };
  anime(result);
}

export function makeScrollable(targetBottomSheet) {
  targetBottomSheet.style.overflow = "scroll";
  targetBottomSheet.click();
  targetBottomSheet.style.touchAction = "auto";
}

export function makeDraggable(targetBottomSheet) {
  targetBottomSheet.style.overflow = "hidden";
  targetBottomSheet.style.touchAction = "none";
}

export function translateResizableDiv(
  webLayout,
  offset,
  sideSheetMinValue,
  active,
  xy,
  targetBottomSheet,
) {
  let translateX;
  let width;
  if (webLayout === "sideSheetLeft") {
    if (
      Math.round((offset[0] / window.innerWidth) * 100 + sideSheetMinValue) <
      sideSheetMinValue - 5
      // dismissible

      // velocity[0] > 0.5
    ) {
      width = sideSheetMinValue - 5;
    } else
      width = Math.round(
        (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
      );

    if (
      Math.round((offset[0] / window.innerWidth) * 100 + sideSheetMinValue) <
        sideSheetMinValue &&
      !active
      // dismissible

      // velocity[0] > 0.5
    ) {
      if (xy[0] < convertToPxWidth(sideSheetMinValue) - 100)
        translateX = "-105%";
      else width = sideSheetMinValue;
    }
  } else {
    console.log(
      100 -
        Math.round(
          (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
        ),
      sideSheetMinValue,
      "them",
    );
    if (
      100 -
        Math.round(
          (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
        ) <
      sideSheetMinValue - 5
      // dismissible

      // velocity[0] > 0.5
    ) {
      console.log("if");
      width = sideSheetMinValue - 5;
    } else {
      console.log("else");

      width =
        100 -
        Math.round(
          (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
        );
    }
    if (
      100 -
        Math.round(
          (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
        ) <
        sideSheetMinValue &&
      !active
      // dismissible

      // velocity[0] > 0.5
    ) {
      console.log("if2");
      if (
        xy[0] >
        window.innerWidth - (convertToPxWidth(sideSheetMinValue) - 100)
      ) {
        translateX = "105%";
        width = sideSheetMinValue;
      } else width = sideSheetMinValue;
    }
  }

  anime({
    targets: targetBottomSheet,
    width: `${width}%`,
    easing: `spring(1,250, 30, 20)`,
    duration: 0,
    translateX,
    // opacity: `${width === 0 ? 0 : 1}`,
  });
}
