import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";
import { hideOverlay, addOverlay } from "./helpers/overlayHelpers";
import { moveBottomSheet } from "./helpers/translationHelpers";
import {
  snapPointConversion,
  checkType,
  convertToPx,
} from "./helpers/convertionHelpers";

function BottomSheet(props) {
  let {
    snapPoints = ["100%"],
    displayOverlay = true,
    minWidthForModal = 500,
    draggableArea = ``,
    onOpen = () => {},
    onClose = () => {},
    trigger = "",
    content = "",
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
    animateOnDrag = {},
  } = props;
  let lastSetSnapPoint;

  content =
    typeof content !== "string"
      ? promise.resolve(content).then((value) => {
          value;
        })
      : content;
  let targetid = trigger
    ? document
        ?.querySelector(`#${trigger}`)
        ?.getAttribute("data-bottomsheet-id")
    : "";
  let targetBottomSheet = targetid
    ? document?.querySelector(`#${targetid}`)
    : "";
  const overlay = document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    ? document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    : document.createElement("div");
  overlay.id = `${targetBottomSheet?.id}-overlay`;
  let closeAnimation = `spring(1, 85, 45, 15)`;
  let openAnimation = `spring(1, 85, 35, 5)`;
  openOnLoad
    ? init(openOnLoad)
    : setTimeout(() => {
        if (trigger && document.querySelector(`#${trigger}`)) {
          document.querySelectorAll(`#${trigger}`).forEach((i) =>
            i.addEventListener("click", () => {
              init(false);
            })
          );
        }
      }, 400);

  function init(openOnLoad = false) {
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
            }`
          );
    } else if (content && !targetBottomSheet.innerHTML) {
      targetBottomSheet.innerHTML = new DOMParser().parseFromString(
        content,
        "text/html"
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
      targetBottomSheet && document.querySelector(".overlay")
        ? document.body.insertBefore(overlay, targetBottomSheet)
        : "";
      if (closeOnOverlayClick) {
        overlay.addEventListener("click", () => {
          close(isWeb, dismissible);
        });
      }
    }
    let isWeb = window.innerWidth < minWidthForModal ? false : true;
    if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
      createBottomSheet(targetBottomSheet, isWeb, overlay, openOnLoad);
    } else {
      open(isWeb, openOnLoad);
    }
  }

  function createBottomSheet(targetBottomSheet, isWeb, overlay, openOnLoad) {
    let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
    let lastSnapPoint = snapPointConversion(snapPoints[snapPoints.length - 1]);
    let modalClose = document.createElement("div");
    let sideSheetLeft = document.createElement("div");
    let sideSheetRight = document.createElement("div");
    let draggableId = "";

    targetBottomSheet.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.addEventListener("click", () =>
      closeModal(targetBottomSheet, overlay)
    );
    sideSheetLeft.id = "side-left";
    defaultSideSheetClose
      ? sideSheetLeft.addEventListener("click", () => {
          closeLeftSideSheet(targetBottomSheet, overlay);
        })
      : "";
    sideSheetRight.id = "side-right";
    defaultSideSheetClose
      ? sideSheetRight.addEventListener("click", () =>
          closeRightSideSheet(targetBottomSheet)
        )
      : "";
    modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
    sideSheetLeft.insertAdjacentHTML("afterbegin", sideSheetLeftIcon);
    sideSheetRight.insertAdjacentHTML("afterbegin", sideSheetRightIcon);
    if (draggableArea) {
      if (typeof draggableArea === "string") {
        draggableArea = new DOMParser().parseFromString(
          draggableArea,
          "text/xml"
        );
        draggableId = draggableArea.childNodes[0].id;
        draggableArea = draggableArea.childNodes[0];
      } else {
        draggableId = draggableArea?.id;
      }
      draggableArea.setAttribute("data-draggable", "1");
    }
    handleCloseIcons(
      targetBottomSheet,
      sideSheetLeft,
      sideSheetRight,
      isWeb,
      draggableId,
      overlay,
      modalClose
    );
    isWeb = windowResizeListener(
      targetBottomSheet,
      sideSheetLeft,
      sideSheetRight,
      isWeb,
      overlay,
      modalClose,
      draggableId
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
    targetBottomSheet.click();
    targetBottomSheet.style.overflow = "scroll";
    targetBottomSheet.style.touchAction = "auto";
    setTimeout(() => {
      handleDragGesture(
        targetBottomSheet,
        currentSnapPoint,
        lastSnapPoint,
        targetBottomSheet,
        draggableId,
        overlay,
        isWeb
      );
    }, 400);

    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheet.id}`
      ).style.display = "block";
    }
  }

  function windowResizeListener(
    targetBottomSheet,
    sideSheetLeft,
    sideSheetRight,
    isWeb,
    overlay,
    modalClose,
    draggableId
  ) {
    window.addEventListener("resize", () => {
      handleCloseIcons(
        targetBottomSheet,
        sideSheetLeft,
        sideSheetRight,
        isWeb,
        draggableId,
        overlay,
        modalClose
      );
      if (window.innerWidth < minWidthForModal) isWeb = false;
      else isWeb = true;
      return isWeb;
    });
    return isWeb;
  }

  function closeModal(
    targetBottomSheet,
    overlay
    // sideSheetSnapPoints
  ) {
    anime({
      targets: targetBottomSheet,
      opacity: 0,
      easing: closeAnimation,
      duration: 0.1,
      translateY: "-40%",
    });
    setTimeout(() => {
      cleanUp(targetBottomSheet, overlay);
    }, 500);
    hideOverlay(overlay);
  }

  function close(isWeb = false, dismissible = true, vy = 7) {
    displayOverlay && overlay ? hideOverlay(overlay) : "";
    document.body.style.overflow = "scroll";
    if (!isWeb) {
      anime({
        targets: targetBottomSheet,
        translateY: `${
          !dismissible
            ? window.innerHeight - checkType(snapPoints[0])
            : convertToPx(100)
        }px`,
        easing: getSnapPointAnimation(vy),
        duration: 1,
      });
    } else {
      if (webLayout === "modal") {
        closeModal(targetBottomSheet, overlay);
      } else if (webLayout === "sideSheetLeft") {
        closeLeftSideSheet(targetBottomSheet, overlay);
      } else {
        closeRightSideSheet(targetBottomSheet, overlay);
      }
    }
    lastSetSnapPoint = convertToPx(100);
    setTimeout(() => {
      if (lastSetSnapPoint >= window.innerHeight) {
        cleanUpOnClose ? cleanUp(targetBottomSheet, overlay) : "";
      }
    }, 500);
    hideOverlay(overlay);
    onClose();
  }

  function handleCloseIcons(
    targetBottomSheet,
    sideSheetLeft,
    sideSheetRight,
    isWeb,
    draggableId,
    overlay,
    modalClose
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
        // closeLeftSideSheet(targetBottomSheet);
      } else if (
        !document.querySelector(`#${targetBottomSheet.id} #side-right`) &&
        webLayout === "sideSheetRight"
      ) {
        targetBottomSheet.prepend(sideSheetRight);
        closeRightSideSheet(targetBottomSheet);
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

      targetBottomSheet.classList.add("bottomsheet"),
        targetBottomSheet.classList.remove("modal");
      targetBottomSheet.classList.remove("side-sheet");
    }
  }

  function open(isWeb = false, openOnLoad = false) {
    document.body.style.overflow = "hidden";
    displayOverlay ? addOverlay(overlay) : "";
    if (isWeb) {
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
    } else {
      if (openOnLoad) {
        targetBottomSheet.style.opacity = 1;
        targetBottomSheet.style.transform = `translateY(${
          window.innerHeight - checkType(snapPoints[0])
        }px)`;
      } else {
        anime({
          targets: targetBottomSheet,
          translateY: `${convertToPx(100)}px`,
          easing: "linear",
          duration: 1,
        });
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            translateY: `${window.innerHeight - checkType(snapPoints[0])}px`,
            easing: "spring(1, 85, 15, 3)",
            opacity: 1,
            duration: 1,
          });
        }, 60);
      }
    }
    lastSetSnapPoint = window.innerHeight - checkType(snapPoints[0]);
  }

  function handleDragGesture(
    draggableTarget,
    currentSnapPoint,
    lastSnapPoint,
    newBottomSheet,
    draggableId,
    overlay,
    isWeb
  ) {
    const gesture = new Gesture(
      draggableTarget,
      {
        onDrag: ({
          active,
          velocity: [vx, vy],
          offset,
          distance: [dx, dy],
          target,
          direction,
        }) => {
          let minSnapPoint = 0;
          let maxSnapPoint = Infinity;
          currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
          if (window.innerWidth < minWidthForModal) {
            if (direction[1] > 0) {
              if (
                draggableId &&
                target === document.querySelector(`#${draggableId}`)
              ) {
                newBottomSheet.style.overflow = "hidden";
                newBottomSheet.style.touchAction = "none";
                handleSnapPoints(
                  newBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                  overlay,
                  isWeb
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible, vy);

                if (lastSetSnapPoint >= window.innerHeight) {
                  hideOverlay(overlay);
                }
              } else {
                if (
                  newBottomSheet.scrollTop >= 1 &&
                  currentSnapPoint <= convertToPx(100 - lastSnapPoint) &&
                  (!draggableId ||
                    target !== document.querySelector(`#${draggableId}`))
                ) {
                  newBottomSheet.style.overflow = "scroll";
                  newBottomSheet.style.touchAction = "auto";
                  newBottomSheet.click();
                } else {
                  newBottomSheet.style.overflow = "hidden";
                  newBottomSheet.style.touchAction = "none";
                  handleSnapPoints(
                    newBottomSheet,
                    minSnapPoint,
                    null,
                    active,
                    lastSnapPoint,
                    vy,
                    offset,
                    dy,
                    overlay,
                    isWeb
                  );
                  if (lastSetSnapPoint >= window.innerHeight)
                    close(isWeb, dismissible, vy);
                }
              }
            } else {
              if (
                getCurrentSnapPoint(targetBottomSheet) <=
                convertToPx(100 - lastSnapPoint)
              ) {
                newBottomSheet.click();
                newBottomSheet.style.overflow = "scroll";
                if (convertToPx(100 - lastSnapPoint) > 0)
                  newBottomSheet.style.minHeight = "unset";
                newBottomSheet.style.height = `${convertToPx(lastSnapPoint)}px`;
                newBottomSheet.style.touchAction = "auto";
              } else {
                newBottomSheet.style.overflow = "hidden";
                newBottomSheet.style.touchAction = "none";
                handleSnapPoints(
                  newBottomSheet,
                  null,
                  maxSnapPoint,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                  overlay,
                  isWeb
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible, vy);
              }
            }
          }
        },
        onDragStart: () => {
          document.body.style.overflow = "hidden";
        },
        onDragEnd: ({ direction }) => {
          currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
          if (
            (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
              lastSetSnapPoint === 0) &&
            direction[1] < 0 &&
            targetBottomSheet.scrollTop >= 1
          ) {
            newBottomSheet.style.overflow = "scroll";
            newBottomSheet.click();
            newBottomSheet.style.touchAction = "auto";
          }
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
      }
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
    overlay,
    isWeb
  ) {
    let actualOffset = offset[1];
    if (maxSnapPoint === null) {
      if (active) {
        moveBottomSheet(
          newBottomSheet,
          `${
            actualOffset > window.innerHeight
              ? window.innerHeight
              : actualOffset < convertToPx(100 - lastSnapPoint)
              ? convertToPx(100 - lastSnapPoint)
              : actualOffset
          }px`,
          `spring(1, 250, 25, 25)`
          // 1
          // animateOnDrag
        );
      }
      if (!active) {
        translateToPreviousSnapPoint(
          actualOffset > window.innerHeight
            ? window.innerHeight
            : actualOffset < convertToPx(100 - lastSnapPoint)
            ? convertToPx(100 - lastSnapPoint)
            : actualOffset,
          newBottomSheet,
          vy,
          lastSnapPoint,
          dy,
          false,
          overlay,
          dismissible,
          isWeb
        ) !== undefined
          ? (offset[1] = translateToPreviousSnapPoint(
              actualOffset > window.innerHeight
                ? window.innerHeight
                : actualOffset < convertToPx(100 - lastSnapPoint)
                ? convertToPx(100 - lastSnapPoint)
                : actualOffset,
              newBottomSheet,
              vy,
              lastSnapPoint,
              dy,
              false,
              overlay,
              dismissible,
              isWeb
            ))
          : "";
      }
    } else {
      if (active) {
        moveBottomSheet(
          newBottomSheet,
          `${
            actualOffset > window.innerHeight
              ? window.innerHeight
              : actualOffset < convertToPx(100 - lastSnapPoint)
              ? convertToPx(100 - lastSnapPoint)
              : actualOffset
          }px`,
          `spring(1, 250, 25, 25)`
        );
      }

      if (!active) {
        translateToNextSnapPoint(
          actualOffset > window.innerHeight
            ? window.innerHeight
            : actualOffset < convertToPx(100 - lastSnapPoint)
            ? convertToPx(100 - lastSnapPoint)
            : actualOffset,
          newBottomSheet,
          vy,
          lastSnapPoint,
          dy,
          false,
          overlay,
          isWeb
        ) !== undefined
          ? (offset[1] = translateToNextSnapPoint(
              actualOffset > window.innerHeight
                ? window.innerHeight
                : actualOffset < convertToPx(100 - lastSnapPoint)
                ? convertToPx(100 - lastSnapPoint)
                : actualOffset,
              newBottomSheet,
              vy,
              lastSnapPoint,
              dy,
              false,
              overlay,
              isWeb
            ))
          : "";
      }
    }
  }

  function getCurrentSnapPoint(newBottomSheet) {
    return +newBottomSheet?.style?.transform.slice(11).replace("px)", "");
  }

  function translateToNextSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
    snappable,
    overlay,
    isWeb
  ) {
    let maxSnapPoint = Infinity;
    snapPoints.forEach((element) => {
      let elem = snapPointConversion(element);
      if (
        convertToPx(elem) > window.innerHeight - convertXy &&
        convertToPx(elem) < maxSnapPoint
      ) {
        maxSnapPoint = convertToPx(elem);
      }
    });

    if (maxSnapPoint !== Infinity) {
      if (snappable) {
        moveBottomSheet(
          newBottomSheet,
          `${window.innerHeight - maxSnapPoint}px`,
          getSnapPointAnimation(vy)
        );
        lastSetSnapPoint = window.innerHeight - maxSnapPoint;
        return lastSetSnapPoint;
      } else {
        if (vy > velocityThreshold || dy < distanceThreshold) {
          moveBottomSheet(
            newBottomSheet,
            `${window.innerHeight - maxSnapPoint}px`,
            getSnapPointAnimation(vy)
          );
          lastSetSnapPoint = window.innerHeight - maxSnapPoint;
          return lastSetSnapPoint;
        } else {
          return translateToPreviousSnapPoint(
            convertXy,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            true,
            overlay,
            dismissible,
            isWeb
          );
        }
      }
    }
  }

  function translateToPreviousSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
    snappable,
    overlay,
    dismissible,
    isWeb
  ) {
    let minSnapPoint = 0;
    snapPoints.forEach((element) => {
      let elem = snapPointConversion(element);
      if (
        convertToPx(elem) < window.innerHeight - convertXy &&
        convertToPx(elem) > minSnapPoint
      ) {
        minSnapPoint = convertToPx(elem);
      }
    });

    if (snappable) {
      moveBottomSheet(
        newBottomSheet,
        `${
          !dismissible
            ? minSnapPoint <= checkType(snapPoints[0])
              ? window.innerHeight - checkType(snapPoints[0])
              : window.innerHeight - minSnapPoint
            : window.innerHeight - minSnapPoint
        }px`,
        getSnapPointAnimation(vy)
      );
      lastSetSnapPoint = window.innerHeight - minSnapPoint;
      return lastSetSnapPoint;
    } else {
      if (vy > velocityThreshold || dy > distanceThreshold) {
        moveBottomSheet(
          newBottomSheet,
          `${
            !dismissible
              ? minSnapPoint <= checkType(snapPoints[0])
                ? window.innerHeight - checkType(snapPoints[0])
                : window.innerHeight - minSnapPoint
              : window.innerHeight - minSnapPoint
          }px`,
          getSnapPointAnimation(vy)
        );
        lastSetSnapPoint = window.innerHeight - minSnapPoint;

        return lastSetSnapPoint;
      } else {
        return translateToNextSnapPoint(
          convertXy,
          newBottomSheet,
          vy,
          lastSnapPoint,
          dy,
          true,
          overlay,
          isWeb
        );
      }
    }
  }

  function closeLeftSideSheet(targetBottomSheet, overlay) {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      cleanUpOnClose ? cleanUp(targetBottomSheet, overlay) : "";
    }, 400);
    hideOverlay(overlay);
  }
  function closeRightSideSheet(targetBottomSheet) {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      cleanUpOnClose ? cleanUp(targetBottomSheet, overlay) : "";
    }, 400);
    hideOverlay(overlay);
  }

  function cleanUp(targetBottomSheet) {
    // targetBottomSheet.innerHTML = "";
    targetBottomSheet.remove();
  }

  function getSnapPointAnimation(vy) {
    return `spring(1, 250, 15, ${vy})`;
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

export async function replaceInnerContent(bottomsheetID, content) {
  content = typeof content !== "string" ? await content : content;
  let draggableItem;
  if (content && bottomsheetID && document.getElementById(`${bottomsheetID}`)) {
    draggableItem = document.getElementById(`${bottomsheetID}`).children[0];
    document.getElementById(`${bottomsheetID}`).innerHTML = "";
    if (
      draggableItem &&
      (draggableItem?.getAttribute("data-draggable") ||
        draggableItem.children[0] instanceof SVGElement)
    ) {
      document.getElementById(`${bottomsheetID}`).appendChild(draggableItem);
    }
    document
      .getElementById(`${bottomsheetID}`)
      .insertAdjacentHTML("beforeend", content);
  }
}

export default BottomSheet;
