export function snapPointConversion(snapPoint) {
  return typeof snapPoint === "string"
    ? +snapPoint.replace("%", "")
    : +snapPoint;
}

export function checkType(value) {
  return typeof value === "string"
    ? convertToPx(+value.replace("%", ""))
    : +value;
}

export function convertToPx(percentage) {
  return Math.round((window.innerHeight * percentage) / 100);
}

export function convertToPercentage(px) {
  return Math.round((px / window.innerWidth) * 100);
}
