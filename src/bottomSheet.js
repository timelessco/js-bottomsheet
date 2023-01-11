import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es";

import {
  checkType,
  convertToPx,
  differenceOfWindowHt,
  getMobileOperatingSystem,
  snapPointConversion,
} from "./helpers/convertionHelpers";
import { addOverlay, hideOverlay } from "./helpers/overlayHelpers";
import { moveBottomSheet } from "./helpers/translationHelpers";

import "./bottomsheet.css";

function BottomSheet(props) {
  const {
    snapPoints = ["100%"],
    displayOverlay = false,
    minWidthForModal = 700,
    onOpen = () => {},
    onClose = () => {},
    trigger = "",
    onInit = () => {},
    webLayout = "modal",
    openOnLoad = false,
    modalCloseIcon = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg>
    `,
    sideSheetRightIcon = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>
    `,
    defaultSideSheetClose = true,
    cleanUpOnClose = false,
    dismissible = true,
    sideSheetSnapPoints = ["10%", "25%", "50%", "100%"],
    velocityThreshold = 0.9,
    distanceThreshold = 150,
    closeOnOverlayClick = true,
    onDragStart = () => {},
    onDragEnd = () => {},
    scrollableSheet = true,
  } = props;

  let { content = "", draggableArea = `` } = props;

  function getSnapPointAnimation() {
    return `spring(1, 95, 25, 13)`;
  }

  let lastSetSnapPoint;
  content =
    typeof content !== "string"
      ? Promise.resolve(content).then(value => value)
      : content;
  const targetid = trigger
    ? document
        ?.querySelector(`#${trigger}`)
        ?.getAttribute("data-bottomsheet-id")
    : "";
  let targetBottomSheet = targetid
    ? document?.querySelector(`#${targetid}`)
    : "";

  function getCurrentSnapPoint(newBottomSheet) {
    const transformValue = newBottomSheet?.style?.transform
      .slice(11)
      .replace("px)", "");
    if (transformValue) {
      return +transformValue;
    }
    return null;
  }

  let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
  let isWeb = !(window.innerWidth < minWidthForModal);
  const overlay = document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    ? document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    : document.createElement("div");
  overlay.id = `${targetBottomSheet?.id}-overlay`;
  const closeAnimation = `spring(1, 85, 45, 15)`;
  const openAnimation = `spring(1, 85, 35, 5)`;

  function open(
    isWebView = false,
    openOnLoading = false,
    withoutAnimation = false,
  ) {
    if (displayOverlay) {
      addOverlay(overlay);
    }
    if (isWebView) {
      document.body.style.overflow = "hidden";
      if (webLayout === "sideSheetLeft") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.left = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            left: "0",
            width: sideSheetSnapPoints[0],
            easing: openAnimation,
            duration: 1,
          });
        }, 100);
      } else if (webLayout === "sideSheetRight") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.right = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            right: "0",
            width: sideSheetSnapPoints[0],
            easing: openAnimation,
            duration: 1,
          });
        }, 100);
      } else {
        targetBottomSheet.style.top = "50%";
        targetBottomSheet.style.opacity = 0;
        targetBottomSheet.style.transform =
          "translateX(-50%) translateY(-40%) rotateX(-20deg)";
        anime({
          translateY: "-50%",
          targets: targetBottomSheet,
          opacity: 1,
          rotateX: "1deg",
          easing: closeAnimation,
          duration: 0.1,
        });
      }
    } else if (openOnLoading) {
      targetBottomSheet.style.opacity = 1;
      targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
        checkType(snapPoints[0]),
      )}px)`;
    } else if (withoutAnimation) {
      targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
        checkType(snapPoints[0]),
      )}px)`;
    } else {
      document.body.style.overflow = "hidden";
      anime({
        targets: targetBottomSheet,
        translateY: `${convertToPx(100)}px`,
        easing: "linear",
        duration: 1,
      });
      setTimeout(() => {
        anime({
          targets: targetBottomSheet,
          translateY: `${differenceOfWindowHt(checkType(snapPoints[0]))}px`,
          easing: "spring(1, 85, 15, 3)",
          opacity: 1,
          duration: 1,
        });
      }, 60);
    }
    lastSetSnapPoint = differenceOfWindowHt(checkType(snapPoints[0]));
  }

  function cleanUp() {
    targetBottomSheet.remove();
  }

  function closeModal() {
    anime({
      targets: targetBottomSheet,
      opacity: 0,
      easing: closeAnimation,
      duration: 0.1,
      translateY: "-40%",
    });
    setTimeout(() => {
      cleanUp();
    }, 500);
    hideOverlay(overlay);
  }

  function closeLeftSideSheet() {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      if (cleanUpOnClose) cleanUp();
    }, 400);
    hideOverlay(overlay);
  }

  function closeRightSideSheet() {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      if (cleanUpOnClose) cleanUp();
    }, 400);
    hideOverlay(overlay);
  }

  function close(isWebView = false, dismissable = true) {
    if (displayOverlay && overlay) hideOverlay(overlay);
    document.body.style.overflow = "scroll";
    if (!isWebView) {
      anime({
        targets: targetBottomSheet,
        translateY: `${
          !dismissable
            ? differenceOfWindowHt(checkType(snapPoints[0]))
            : convertToPx(120)
        }px`,
        easing: getSnapPointAnimation(),
        duration: 1,
      });
    } else if (webLayout === "modal") {
      closeModal();
    } else if (webLayout === "sideSheetLeft") {
      closeLeftSideSheet();
    } else {
      closeRightSideSheet(targetBottomSheet, overlay);
    }
    lastSetSnapPoint = convertToPx(120);
    setTimeout(() => {
      if (lastSetSnapPoint >= window.innerHeight) {
        if (cleanUpOnClose) cleanUp(targetBottomSheet, overlay);
      }
    }, 500);
    hideOverlay(overlay);
    onClose();
  }

  function handleCloseIcons(
    sideSheetLeft,
    sideSheetRight,
    draggableId,
    modalClose,
  ) {
    if (isWeb) {
      if (
        draggableArea &&
        document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)
      ) {
        targetBottomSheet.removeChild(draggableArea);
      }
      if (webLayout === "modal") {
        targetBottomSheet.classList.add("modal");
      } else {
        targetBottomSheet.classList.add("side-sheet");
      }
      targetBottomSheet.classList.remove("bottomsheet");
      if (
        !document.querySelector(`#${targetBottomSheet.id} #modal-close`) &&
        webLayout === "modal"
      ) {
        targetBottomSheet.prepend(modalClose);
      } else if (
        !document.querySelector(`#${targetBottomSheet.id} #side-left`) &&
        webLayout === "sideSheetLeft"
      ) {
        targetBottomSheet.prepend(sideSheetLeft);
      } else if (
        !document.querySelector(`#${targetBottomSheet.id} #side-right`) &&
        webLayout === "sideSheetRight"
      ) {
        targetBottomSheet.prepend(sideSheetRight);
        closeRightSideSheet();
      }
    } else {
      if (
        draggableId &&
        !document.querySelector(`#${targetBottomSheet?.id} #${draggableId}`)
      ) {
        targetBottomSheet.prepend(draggableArea);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #modal-close`)) {
        targetBottomSheet.removeChild(modalClose);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #side-left`)) {
        targetBottomSheet.removeChild(sideSheetLeft);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #side-right`)) {
        targetBottomSheet.removeChild(sideSheetRight);
      }

      targetBottomSheet.classList.add("bottomsheet");
      targetBottomSheet.classList.remove("modal");
      targetBottomSheet.classList.remove("side-sheet");
    }
  }

  function translateToPreviousSnapablePoint(convertXy, newBottomSheet) {
    let minSnapPoint = 0;
    snapPoints.forEach(element => {
      const elem = snapPointConversion(element);
      if (
        convertToPx(elem) < differenceOfWindowHt(convertXy) &&
        convertToPx(elem) > minSnapPoint
      ) {
        minSnapPoint = convertToPx(elem);
      }
    });

    let value;
    if (!dismissible) {
      if (minSnapPoint <= checkType(snapPoints[0])) {
        value = differenceOfWindowHt(checkType(snapPoints[0]));
      } else {
        value = differenceOfWindowHt(minSnapPoint);
      }
    } else {
      value = differenceOfWindowHt(minSnapPoint);
    }
    moveBottomSheet(newBottomSheet, `${value}px`, getSnapPointAnimation());
    lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
    return lastSetSnapPoint;
  }

  function translateToNextSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
  ) {
    let maxSnapPoint = Infinity;
    snapPoints.forEach(element => {
      const elem = snapPointConversion(element);
      if (
        convertToPx(elem) > differenceOfWindowHt(convertXy) &&
        convertToPx(elem) < maxSnapPoint
      ) {
        maxSnapPoint = convertToPx(elem);
      }
    });
    if (maxSnapPoint !== Infinity) {
      if (vy > velocityThreshold || dy < distanceThreshold) {
        moveBottomSheet(
          newBottomSheet,
          `${differenceOfWindowHt(maxSnapPoint)}px`,
          getSnapPointAnimation(),
        );
        lastSetSnapPoint = differenceOfWindowHt(maxSnapPoint);
        return lastSetSnapPoint;
      }

      return translateToPreviousSnapablePoint(convertXy, newBottomSheet);
    }

    return undefined;
  }

  function translateToPreviousSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
  ) {
    let minSnapPoint = 0;
    snapPoints.forEach(element => {
      const elem = snapPointConversion(element);
      if (
        convertToPx(elem) < differenceOfWindowHt(convertXy) &&
        convertToPx(elem) > minSnapPoint
      ) {
        minSnapPoint = convertToPx(elem);
      }
    });

    if (vy > velocityThreshold || dy > distanceThreshold) {
      let value;
      if (!dismissible) {
        if (minSnapPoint <= checkType(snapPoints[0])) {
          value = differenceOfWindowHt(checkType(snapPoints[0]));
        } else {
          value = differenceOfWindowHt(minSnapPoint);
        }
      } else {
        value = differenceOfWindowHt(minSnapPoint);
      }
      moveBottomSheet(newBottomSheet, `${value}px`, getSnapPointAnimation());
      lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
      return lastSetSnapPoint;
    }
    return translateToNextSnapPoint(
      convertXy,
      newBottomSheet,
      vy,
      lastSnapPoint,
      dy,
      true,
      overlay,
    );
  }

  function handleSnapPoints(
    newBottomSheet,
    minSnapPoint,
    maxSnapPoint,
    active,
    lastSnapPoint,
    vy,
    offset,
    dy,
  ) {
    let actualOffset = offset[1];

    if (maxSnapPoint === null) {
      let value;
      if (actualOffset > window.innerHeight) {
        value = window.innerHeight;
      } else if (actualOffset < convertToPx(100 - lastSnapPoint)) {
        value = convertToPx(100 - lastSnapPoint);
      } else {
        value = actualOffset;
      }
      if (active) {
        moveBottomSheet(newBottomSheet, `${value}px`, `spring(1, 250, 25, 25)`);
      }

      if (!active) {
        if (
          translateToPreviousSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            false,
            overlay,
          ) !== undefined
        ) {
          actualOffset = translateToPreviousSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            false,
            overlay,
          );
        }
      }
    } else {
      let value;
      if (actualOffset > window.innerHeight) {
        value = window.innerHeight;
      } else if (actualOffset < convertToPx(100 - lastSnapPoint)) {
        value = convertToPx(100 - lastSnapPoint);
      } else {
        value = actualOffset;
      }
      if (active) {
        moveBottomSheet(newBottomSheet, `${value}px`, `spring(1, 250, 25, 25)`);
      }
      if (!active) {
        if (
          translateToNextSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            false,
            overlay,
          ) !== undefined
        ) {
          actualOffset = translateToNextSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            false,
            overlay,
          );
        }
      }
    }
  }

  function handleDragGesture(
    draggableTarget,
    lastSnapPoint,
    newBottomSheet,
    draggableId,
  ) {
    Gesture(
      draggableTarget,
      {
        onDrag: ({
          active,
          velocity: [, vy],
          offset,
          distance: [, dy],
          target,
          direction,
        }) => {
          const minSnapPoint = 0;
          const maxSnapPoint = Infinity;
          currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
          if (window.innerWidth < minWidthForModal) {
            if (direction[1] > 0) {
              if (
                draggableId &&
                target === document.querySelector(`#${draggableId}`)
              ) {
                targetBottomSheet.style.overflow = "hidden";
                targetBottomSheet.style.touchAction = "none";
                handleSnapPoints(
                  newBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible);

                if (lastSetSnapPoint >= window.innerHeight) {
                  hideOverlay(overlay);
                }
              } else if (
                newBottomSheet.scrollTop >= 1 &&
                currentSnapPoint <= convertToPx(100 - lastSnapPoint) &&
                (!draggableId ||
                  target !== document.querySelector(`#${draggableId}`))
              ) {
                if (scrollableSheet) {
                  targetBottomSheet.style.overflow = "scroll";
                  targetBottomSheet.style.touchAction = "auto";
                  targetBottomSheet.click();
                }
              } else {
                targetBottomSheet.style.overflow = "hidden";
                targetBottomSheet.style.touchAction = "none";
                handleSnapPoints(
                  newBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible);
              }
            } else if (
              getCurrentSnapPoint(targetBottomSheet) <=
              convertToPx(100 - lastSnapPoint)
            ) {
              if (scrollableSheet) {
                newBottomSheet.click();
                targetBottomSheet.style.overflow = "scroll";
                if (convertToPx(100 - lastSnapPoint) > 0)
                  targetBottomSheet.style.minHeight = "unset";
                targetBottomSheet.style.height = `${convertToPx(
                  lastSnapPoint,
                )}px`;
                targetBottomSheet.style.touchAction = "auto";
              }
            } else {
              targetBottomSheet.style.overflow = "hidden";
              targetBottomSheet.style.touchAction = "none";
              handleSnapPoints(
                newBottomSheet,
                null,
                maxSnapPoint,
                active,
                lastSnapPoint,
                vy,
                offset,
                dy,
              );
              if (lastSetSnapPoint >= window.innerHeight)
                close(isWeb, dismissible);
            }
          }
        },
        onDragStart: ({ direction }) => {
          document.body.style.overflow = "hidden";
          onDragStart(direction);
        },
        onDragEnd: ({ direction }) => {
          currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
          if (
            (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
              lastSetSnapPoint === 0) &&
            direction[1] < 0 &&
            targetBottomSheet.scrollTop >= 0
          ) {
            if (scrollableSheet) {
              targetBottomSheet.style.overflow = "scroll";
              targetBottomSheet.click();
              targetBottomSheet.style.touchAction = "auto";
            }
          }
          if (
            (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
              lastSetSnapPoint === 0) &&
            direction[1] > 0 &&
            targetBottomSheet.scrollTop === 0
          ) {
            targetBottomSheet.style.overflow = "hidden";
          }
          onDragEnd(direction);
        },
      },
      {
        drag: {
          filterTaps: false,
          rubberband: true,
          axis: "y",
          preventDefault: false,
          from: () => [0, getCurrentSnapPoint(newBottomSheet)],
        },
      },
    );
  }

  function windowResizeListener(
    sideSheetLeft,
    sideSheetRight,
    modalClose,
    draggableId,
  ) {
    window.addEventListener("resize", () => {
      handleCloseIcons(sideSheetLeft, sideSheetRight, draggableId, modalClose);
      if (window.innerWidth < minWidthForModal) isWeb = false;
      else isWeb = true;
      return isWeb;
    });
    return isWeb;
  }

  function createBottomSheet() {
    const lastSnapPoint = snapPointConversion(
      snapPoints[snapPoints.length - 1],
    );
    const modalClose = document.createElement("div");
    const sideSheetLeft = document.createElement("div");
    const sideSheetRight = document.createElement("div");
    let draggableId = "";

    targetBottomSheet.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.classList.add("close-modal");
    modalClose.addEventListener("click", () => closeModal());
    sideSheetLeft.id = "side-left";
    if (defaultSideSheetClose) {
      sideSheetLeft.addEventListener("click", () => {
        closeLeftSideSheet();
      });
    }
    sideSheetRight.id = "side-right";
    if (defaultSideSheetClose) {
      sideSheetRight.addEventListener("click", () => closeRightSideSheet());
    }
    modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
    sideSheetLeft.insertAdjacentHTML("afterbegin", sideSheetLeftIcon);
    sideSheetRight.insertAdjacentHTML("afterbegin", sideSheetRightIcon);
    if (draggableArea) {
      if (typeof draggableArea === "string") {
        draggableArea = new DOMParser().parseFromString(
          draggableArea,
          "text/xml",
        );
        draggableId = draggableArea.childNodes[0].id;
        [draggableArea] = draggableArea.childNodes;
      } else {
        draggableId = draggableArea?.id;
      }
      draggableArea.setAttribute("data-draggable", "1");
      draggableArea.classList.add("draggable");
    }
    handleCloseIcons(sideSheetLeft, sideSheetRight, draggableId, modalClose);
    isWeb = windowResizeListener(
      sideSheetLeft,
      sideSheetRight,
      modalClose,
      draggableId,
    );
    setTimeout(() => {
      onOpen();
    }, 300);
    if (
      lastSetSnapPoint &&
      lastSetSnapPoint < window.innerHeight &&
      window.innerWidth < minWidthForModal
    ) {
      close(isWeb, dismissible);
    } else {
      open(isWeb, openOnLoad);
    }
    if (scrollableSheet) {
      targetBottomSheet.click();
      targetBottomSheet.style.overflow = "scroll";
      targetBottomSheet.style.touchAction = "auto";
    }
    setTimeout(() => {
      handleDragGesture(
        targetBottomSheet,
        lastSnapPoint,
        targetBottomSheet,
        draggableId,
      );
    }, 400);

    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheet.id}`,
      ).style.display = "block";
    }
  }

  function init() {
    document.body.style.overflowY = "contain";
    if (onInit) {
      onInit();
    }
    if (content && !targetBottomSheet) {
      document.body.insertAdjacentHTML("beforeend", content);
      targetBottomSheet = targetid
        ? document.querySelector(`#${targetid}`)
        : document.querySelector(
            `#${
              new DOMParser().parseFromString(content, "text/html").body
                .firstChild.id
            }`,
          );
    } else if (content && !targetBottomSheet.innerHTML) {
      targetBottomSheet.innerHTML = new DOMParser().parseFromString(
        content,
        "text/html",
      ).body.firstChild.innerHTML;
    }

    if (
      targetBottomSheet &&
      !document.getElementById(`#${targetBottomSheet.id}`)
    ) {
      document.body.append(targetBottomSheet);
    }
    if (displayOverlay) {
      overlay.classList.add("overlay");
      addOverlay(overlay);
      document.body.appendChild(overlay);
      if (targetBottomSheet && document.querySelector(".overlay")) {
        document.body.insertBefore(overlay, targetBottomSheet);
      }
      if (closeOnOverlayClick) {
        overlay.addEventListener("click", () => {
          close(isWeb, dismissible);
        });
      }
    }
    if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
      createBottomSheet();
    } else {
      open(isWeb, openOnLoad);
    }
  }
  document.addEventListener("click", e => {
    setTimeout(() => {
      if (
        e.target.tagName.toLowerCase() === "input" &&
        getMobileOperatingSystem() === "Android"
      ) {
        moveBottomSheet(targetBottomSheet, "0px", getSnapPointAnimation());
      }
    }, 100);
  });
  if (openOnLoad) {
    init(openOnLoad);
  } else {
    setTimeout(() => {
      if (trigger && document.querySelector(`#${trigger}`)) {
        document.querySelectorAll(`#${trigger}`).forEach(i =>
          i.addEventListener("click", () => {
            init(false);
          }),
        );
      }
    }, 400);
  }

  function destroy() {
    document.getElementById(trigger).removeEventListener("click", () => {
      init(false);
    });
  }
  const self = {
    close,
    init,
    open,
    destroy,
  };
  return self;
}

// export async function replaceInnerContent(bottomsheetID, content) {
//   content = typeof content !== "string" ? await content : content;
//   let draggableItem;
//   if (content && bottomsheetID && document.getElementById(`${bottomsheetID}`)) {
//     draggableItem = document.getElementById(`${bottomsheetID}`).children[0];
//     document.getElementById(`${bottomsheetID}`).innerHTML = "";
//     if (
//       draggableItem &&
//       (draggableItem?.getAttribute("data-draggable") ||
//         draggableItem.children[0] instanceof SVGElement)
//     ) {
//       document.getElementById(`${bottomsheetID}`).appendChild(draggableItem);
//     }
//     document
//       .getElementById(`${bottomsheetID}`)
//       .insertAdjacentHTML("beforeend", content);
//   }
// }

export default BottomSheet;
