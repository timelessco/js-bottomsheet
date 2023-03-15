export function snapPointConversion(snapPoint) {
  return typeof snapPoint === "string"
    ? +snapPoint.replace("%", "")
    : +snapPoint;
}

export function convertToPx(percentage) {
  return Math.round((window.innerHeight * percentage) / 100);
}
export function convertToPxWidth(percentage) {
  return Math.round((percentage * window.innerWidth) / 100);
}
export function checkType(value) {
  return typeof value === "string"
    ? convertToPx(+value.replace("%", ""))
    : convertToPx(+value);
}

export function convertToPercentage(px) {
  return Math.round((px / window.innerWidth) * 100);
}

export function differenceOfWindowHt(value) {
  return window.innerHeight - value;
}

export function getCurrentSnapPoint(newBottomSheet) {
  const scalePos = newBottomSheet?.style?.transform.indexOf("scale");
  const transformValue =
    scalePos > 0
      ? newBottomSheet?.style?.transform.slice(11, scalePos).replace("px)", "")
      : newBottomSheet?.style?.transform.slice(11).replace("px)", "");

  if (transformValue) {
    return +transformValue;
  }
  return null;
}
