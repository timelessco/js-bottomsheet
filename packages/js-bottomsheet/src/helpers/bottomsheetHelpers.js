import anime from "animejs/lib/anime.es";

import { convertToPxWidth } from "./convertionHelpers";
import { resizeHover } from "./eventListeners";

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
  dismissible,
) {
  let translateX;
  let width;
  if (webLayout === "sideSheetLeft") {
    if (
      Math.round((offset[0] / window.innerWidth) * 100 + sideSheetMinValue) <
        sideSheetMinValue - 5 &&
      dismissible
    ) {
      width = sideSheetMinValue - 5;
    } else
      width = Math.round(
        (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
      );

    if (
      Math.round((offset[0] / window.innerWidth) * 100 + sideSheetMinValue) <
        sideSheetMinValue &&
      !active &&
      dismissible
    ) {
      if (xy[0] < convertToPxWidth(sideSheetMinValue) - 100)
        translateX = "-105%";
      else width = sideSheetMinValue;
    }
  } else {
    if (
      100 -
        Math.round(
          (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
        ) <
        sideSheetMinValue - 5 &&
      dismissible
    ) {
      width = sideSheetMinValue - 5;
    } else {
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
      !active &&
      dismissible
    ) {
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
  });
}

export const findIndexOfSheet = (bottomsheetArray, targetBottomSheet) => {
  let bottomInd;
  if (bottomsheetArray && bottomsheetArray.includes(targetBottomSheet.id))
    bottomInd = bottomsheetArray.findIndex(
      i => document.getElementById(i) === targetBottomSheet,
    );

  return bottomInd;
};

export const resizableRequirements = (
  webLayout,
  resizableDiv,
  resizeHoverEffect,
  targetBottomSheet,
  isWeb,
) => {
  if (webLayout === "sideSheetRight") {
    resizableDiv.style.left = "0";
  } else {
    resizableDiv.style.right = "0";
  }
  resizableDiv.id = "resizable";
  resizableDiv.classList.add("resizable-div");
  if (resizeHoverEffect)
    resizeHover(targetBottomSheet, isWeb, resizableDiv, webLayout);
};

export const getLeftBounds = (
  webLayout,
  sideSheetMaxValue,
  targetBottomSheet,
  sideSheetMinValue,
) => {
  let res;
  if (webLayout === "sideSheetRight") {
    res = -(
      convertToPxWidth(sideSheetMaxValue) -
      convertToPxWidth(+targetBottomSheet.style.width.replace("%", ""))
    );
  } else {
    res =
      convertToPxWidth(sideSheetMinValue) -
      convertToPxWidth(+targetBottomSheet.style.width.replace("%", ""));
  }
  return res;
};

export const getRightBounds = (
  webLayout,
  sideSheetMaxValue,
  targetBottomSheet,
) => {
  let res;
  if (webLayout === "sideSheetLeft")
    res =
      convertToPxWidth(sideSheetMaxValue) -
      convertToPxWidth(+targetBottomSheet.style.width.replace("%", ""));
  else res = window.innerWidth;
  return res;
};
