import anime from "animejs/lib/anime.es";

import { convertToPxWidth, getNumber } from "./convertionHelpers";
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
  sideSheetMaxValue,
) {
  let translateX;
  let width;
  let stringValueCalc;

  const minValueinPx = Math.round(
    (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
  );
  const minValueDifference = Math.round(
    (offset[0] / window.innerWidth) * 100 + (100 - sideSheetMinValue),
  );
  if (webLayout === "sideSheetLeft") {
    if (minValueinPx < sideSheetMinValue - 5 && dismissible) {
      width = sideSheetMinValue - 5;
    } else
      width = Math.round(
        (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
      );

    if (minValueinPx < sideSheetMinValue && !active && dismissible) {
      if (xy[0] < convertToPxWidth(sideSheetMinValue) - 100)
        translateX = "-105%";
      else width = sideSheetMinValue;
    }
    if (typeof sideSheetMinValue === "string") {
      if (offset[0] < getNumber(sideSheetMinValue)) {
        if (dismissible && !active) {
          stringValueCalc = 0;
          translateX = "-105%";
        } else stringValueCalc = sideSheetMinValue;
        // eslint-disable-next-line prefer-destructuring
      } else stringValueCalc = offset[0];
    }
  } else {
    if (100 - minValueDifference < sideSheetMinValue - 5 && dismissible) {
      width = sideSheetMinValue - 5;
    } else {
      width = 100 - minValueDifference;
    }
    if (
      100 - minValueDifference < sideSheetMinValue &&
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
    if (typeof sideSheetMinValue === "string") {
      stringValueCalc = -offset[0] + getNumber(sideSheetMinValue);
      if (stringValueCalc < getNumber(sideSheetMinValue)) {
        if (!active && dismissible) {
          stringValueCalc = 0;
          translateX = "105%";
        } else stringValueCalc = sideSheetMinValue;
      }
    }
  }
  anime({
    targets: targetBottomSheet,
    width: `${
      typeof sideSheetMinValue === "string" ? stringValueCalc : `${width}%`
    }`,
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
  if (typeof sideSheetMaxValue === "string") {
    res =
      getNumber(sideSheetMaxValue) -
      +targetBottomSheet.style.width.replace("%", "");
  } else if (webLayout === "sideSheetRight") {
    res = -(
      convertToPxWidth(sideSheetMaxValue) -
      convertToPxWidth(+targetBottomSheet.style.width.replace("%", ""))
    );
  } else {
    res =
      typeof sideSheetMinValue === "string"
        ? sideSheetMinValue
        : convertToPxWidth(sideSheetMinValue) -
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
  if (typeof sideSheetMaxValue === "string") {
    res =
      getNumber(sideSheetMaxValue) -
      +targetBottomSheet.style.width.replace("%", "");
  } else if (webLayout === "sideSheetLeft") {
    res =
      convertToPxWidth(sideSheetMaxValue) -
      convertToPxWidth(+targetBottomSheet.style.width.replace("%", ""));
  } else res = window.innerWidth;

  return res;
};
