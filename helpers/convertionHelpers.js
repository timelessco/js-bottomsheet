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

export function differenceOfWindowHt(value) {
  return window.innerHeight - value;
}

export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

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
