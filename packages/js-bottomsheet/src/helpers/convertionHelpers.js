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
    : +value;
}

export function convertToPercentage(px) {
  return Math.round((px / window.innerWidth) * 100);
}

export function differenceOfWindowHt(value) {
  return window.innerHeight - value;
}

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

export function getCurrentSnapPoint(newBottomSheet) {
  let scalePos = newBottomSheet?.style?.transform.indexOf("scale");
  const transformValue =
    scalePos > 0
      ? newBottomSheet?.style?.transform.slice(11, scalePos).replace("px)", "")
      : newBottomSheet?.style?.transform.slice(11).replace("px)", "");

  if (transformValue) {
    return +transformValue;
  }
  return null;
}
