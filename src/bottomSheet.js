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
  let { draggableArea = "", content = "" } = props;
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
    _animateOnDrag = {},
    onDragStart = () => {},
    onDragEnd = () => {},
  } = props;

  let lastSetSnapPoint;
  content =
    typeof content !== "string"
      ? Promise.resolve(content).then(value => ({
          value,
        }))
      : content;

  const targetid = trigger
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
  const closeAnimation = `spring(1, 85, 45, 15)`;
  const openAnimation = `spring(1, 85, 35, 5)`;

  function getSnapPointAnimation() {
    return `spring(1, 95, 25, 13)`;
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

  function getCurrentSnapPoint(newBottomSheet) {
    const transform = newBottomSheet?.style?.transform;
    return transform ? transform.slice(11).replace("px)", "") : NaN;
  }

  function cleanUp(targetBottomSheetArg) {
    targetBottomSheetArg.remove();
  }

  function closeModal(targetBottomSheetArg, overlayArg) {
    anime({
      targets: targetBottomSheetArg,
      opacity: 0,
      easing: closeAnimation,
      duration: 0.1,
      translateY: "-40%",
    });
    setTimeout(() => {
      cleanUp(targetBottomSheetArg, overlayArg);
    }, 500);
    hideOverlay(overlay);
  }

  function closeLeftSideSheet(targetBottomSheetArg, overlayArg) {
    anime({
      targets: targetBottomSheetArg,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      if (cleanUpOnClose) {
        cleanUp(targetBottomSheetArg, overlayArg);
      }
    }, 400);
    hideOverlay(overlayArg);
  }
  function closeRightSideSheet(targetBottomSheetArg, overlayArg) {
    anime({
      targets: targetBottomSheetArg,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0,
    });
    setTimeout(() => {
      if (cleanUpOnClose) {
        cleanUp(targetBottomSheetArg, overlayArg);
      }
    }, 400);
    hideOverlay(overlayArg);
  }

  function handleCloseIcons(
    targetBottomSheetArg,
    sideSheetLeft,
    sideSheetRight,
    isWeb,
    draggableId,
    overlayArg,
    modalClose,
  ) {
    if (isWeb) {
      if (
        draggableArea &&
        document.querySelector(`#${targetBottomSheetArg.id} #${draggableId}`)
      ) {
        targetBottomSheetArg.removeChild(draggableArea);
      }
      if (webLayout === "modal") {
        targetBottomSheetArg.classList.add("modal");
      } else {
        targetBottomSheetArg.classList.add("side-sheet");
      }
      targetBottomSheetArg.classList.remove("bottomsheet");
      if (
        !document.querySelector(`#${targetBottomSheetArg.id} #modal-close`) &&
        webLayout === "modal"
      ) {
        targetBottomSheetArg.prepend(modalClose);
      } else if (
        !document.querySelector(`#${targetBottomSheetArg.id} #side-left`) &&
        webLayout === "sideSheetLeft"
      ) {
        targetBottomSheetArg.prepend(sideSheetLeft);
      } else if (
        !document.querySelector(`#${targetBottomSheetArg.id} #side-right`) &&
        webLayout === "sideSheetRight"
      ) {
        targetBottomSheetArg.prepend(sideSheetRight);
        closeRightSideSheet(targetBottomSheetArg);
      }
    } else {
      if (
        draggableId &&
        !document.querySelector(`#${targetBottomSheetArg?.id} #${draggableId}`)
      ) {
        targetBottomSheetArg.prepend(draggableArea);
      }
      if (document.querySelector(`#${targetBottomSheetArg.id} #modal-close`)) {
        targetBottomSheetArg.removeChild(modalClose);
      }
      if (document.querySelector(`#${targetBottomSheetArg.id} #side-left`)) {
        targetBottomSheetArg.removeChild(sideSheetLeft);
      }
      if (document.querySelector(`#${targetBottomSheetArg.id} #side-right`)) {
        targetBottomSheetArg.removeChild(sideSheetRight);
      }

      targetBottomSheetArg.classList.add("bottomsheet");
      targetBottomSheetArg.classList.remove("modal");
      targetBottomSheetArg.classList.remove("side-sheet");
    }
  }

  function windowResizeListener(
    targetBottomSheetArg,
    sideSheetLeft,
    sideSheetRight,
    isWebArg,
    overlayArg,
    modalClose,
    draggableId,
  ) {
    let isWeb = isWebArg;
    window.addEventListener("resize", () => {
      handleCloseIcons(
        targetBottomSheetArg,
        sideSheetLeft,
        sideSheetRight,
        isWeb,
        draggableId,
        overlayArg,
        modalClose,
      );
      if (window.innerWidth < minWidthForModal) isWeb = false;
      else isWeb = true;
      return isWeb;
    });
    return isWeb;
  }

  function close(isWeb = false, dismissibleArg = true) {
    if (displayOverlay && overlay) hideOverlay(overlay);
    document.body.style.overflow = "scroll";
    if (!isWeb) {
      anime({
        targets: targetBottomSheet,
        translateY: `${
          !dismissibleArg
            ? differenceOfWindowHt(checkType(snapPoints[0]))
            : convertToPx(100)
        }px`,
        easing: getSnapPointAnimation(),
        duration: 1,
      });
    } else if (webLayout === "modal") {
      closeModal(targetBottomSheet, overlay);
    } else if (webLayout === "sideSheetLeft") {
      closeLeftSideSheet(targetBottomSheet, overlay);
    } else {
      closeRightSideSheet(targetBottomSheet, overlay);
    }
    lastSetSnapPoint = convertToPx(100);
    setTimeout(() => {
      if (lastSetSnapPoint >= window.innerHeight) {
        if (cleanUpOnClose) cleanUp(targetBottomSheet, overlay);
      }
    }, 500);
    hideOverlay(overlay);
    onClose();
  }

  function open(isWeb = false, openOnLoadArg = false) {
    document.body.style.overflow = "hidden";
    if (displayOverlay) addOverlay(overlay);
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
    } else if (openOnLoadArg) {
      targetBottomSheet.style.opacity = 1;
      targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
        checkType(snapPoints[0]),
      )}px)`;
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
          translateY: `${differenceOfWindowHt(checkType(snapPoints[0]))}px`,
          easing: "spring(1, 85, 15, 3)",
          opacity: 1,
          duration: 1,
        });
      }, 60);
    }
    lastSetSnapPoint = differenceOfWindowHt(checkType(snapPoints[0]));
  }

  function translateToPreviousSnapablePoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
    overlayArg,
    dismissibleArg,
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

    moveBottomSheet(
      newBottomSheet,
      `${
        // TODO: Fix this eslint error
        // eslint-disable-next-line no-nested-ternary
        !dismissibleArg
          ? minSnapPoint <= checkType(snapPoints[0])
            ? differenceOfWindowHt(checkType(snapPoints[0]))
            : differenceOfWindowHt(minSnapPoint)
          : differenceOfWindowHt(minSnapPoint)
      }px`,
      getSnapPointAnimation(),
    );
    lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
    return lastSetSnapPoint;
  }

  function translateToNextSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
    overlayArg,
    isWeb,
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

      return translateToPreviousSnapablePoint(
        convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint,
        dy,
        overlayArg,
        dismissible,
        isWeb,
      );
    }

    return undefined;
  }

  function translateToPreviousSnapPoint(
    convertXy,
    newBottomSheet,
    vy,
    lastSnapPoint,
    dy,
    overlayArg,
    dismissibleArg,
    isWeb,
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
      moveBottomSheet(
        newBottomSheet,
        `${
          // TODO: Fix this eslint error
          // eslint-disable-next-line no-nested-ternary
          !dismissibleArg
            ? minSnapPoint <= checkType(snapPoints[0])
              ? differenceOfWindowHt(checkType(snapPoints[0]))
              : differenceOfWindowHt(minSnapPoint)
            : differenceOfWindowHt(minSnapPoint)
        }px`,
        getSnapPointAnimation(),
      );
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
      overlayArg,
      isWeb,
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
    overlayArg,
    isWeb,
  ) {
    let actualOffset = offset[1];

    if (maxSnapPoint === null) {
      if (active) {
        moveBottomSheet(
          newBottomSheet,
          `${
            // TODO: Fix this
            // eslint-disable-next-line no-nested-ternary
            actualOffset > window.innerHeight
              ? window.innerHeight
              : actualOffset < convertToPx(100 - lastSnapPoint)
              ? convertToPx(100 - lastSnapPoint)
              : actualOffset
          }px`,
          `spring(1, 250, 25, 25)`,
        );
      }
      const previousSnappointInputs = () =>
        translateToPreviousSnapPoint(
          // TODO: Fix this
          // eslint-disable-next-line no-nested-ternary
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
          overlayArg,
          dismissible,
          isWeb,
        );

      if (!active) {
        if (previousSnappointInputs() !== undefined) {
          actualOffset = previousSnappointInputs();
        }
      }
    } else {
      if (active) {
        moveBottomSheet(
          newBottomSheet,
          `${
            // TODO: Fix this eslint error
            // eslint-disable-next-line no-nested-ternary
            actualOffset > window.innerHeight
              ? window.innerHeight
              : actualOffset < convertToPx(100 - lastSnapPoint)
              ? convertToPx(100 - lastSnapPoint)
              : actualOffset
          }px`,
          `spring(1, 250, 25, 25)`,
        );
      }
      const nextSnappointInputs = () =>
        translateToNextSnapPoint(
          // eslint-disable-next-line no-nested-ternary
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
          overlayArg,
          isWeb,
        );

      if (!active) {
        if (nextSnappointInputs() !== undefined) {
          actualOffset = nextSnappointInputs();
        }
      }
    }
  }
  function handleDragGesture(
    draggableTarget,
    currentSnapPointArg,
    lastSnapPoint,
    newBottomSheetArg,
    draggableId,
    overlayArg,
    isWeb,
  ) {
    let currentSnapPoint = currentSnapPointArg;
    const newBottomSheet = newBottomSheetArg;
    // TODO: Fix this
    // eslint-disable-next-line no-unused-vars
    const gesture = new Gesture(
      draggableTarget,
      {
        onDrag: ({
          active,
          velocity: [_vx, vy],
          offset,
          distance: [_dx, dy],
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
                  overlayArg,
                  isWeb,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible, vy);

                if (lastSetSnapPoint >= window.innerHeight) {
                  hideOverlay(overlayArg);
                }
              } else if (
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
                  overlayArg,
                  isWeb,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(isWeb, dismissible, vy);
              }
            } else if (
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
                overlayArg,
                isWeb,
              );
              if (lastSetSnapPoint >= window.innerHeight)
                close(isWeb, dismissible, vy);
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
            newBottomSheet.style.overflow = "scroll";
            newBottomSheet.click();
            newBottomSheet.style.touchAction = "auto";
          }
          if (
            (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
              lastSetSnapPoint === 0) &&
            direction[1] > 0 &&
            targetBottomSheet.scrollTop === 0
          ) {
            newBottomSheet.style.overflow = "hidden";
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

  function createBottomSheet(
    targetBottomSheetProp,
    isWebArg,
    overlayArg,
    openOnLoadArg,
  ) {
    let isWeb = isWebArg;
    const targetBottomSheetArg = targetBottomSheetProp;
    console.log(
      "%ctargetBottomSheetArg",
      "color: #00a3cc",
      targetBottomSheetArg,
    );
    const currentSnapPoint = getCurrentSnapPoint(targetBottomSheetArg);
    const lastSnapPoint = snapPointConversion(
      snapPoints[snapPoints.length - 1],
    );
    const modalClose = document.createElement("div");
    const sideSheetLeft = document.createElement("div");
    const sideSheetRight = document.createElement("div");
    let draggableId = "";

    targetBottomSheetArg.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.classList.add("close-modal");
    modalClose.addEventListener("click", () =>
      closeModal(targetBottomSheetArg, overlayArg),
    );
    sideSheetLeft.id = "side-left";
    sideSheetRight.id = "side-right";
    if (defaultSideSheetClose) {
      sideSheetLeft.addEventListener("click", () => {
        closeLeftSideSheet(targetBottomSheetArg, overlayArg);
      });
      sideSheetRight.addEventListener("click", () =>
        closeRightSideSheet(targetBottomSheetArg, overlayArg),
      );
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
        // TODO: Fix this eslint error
        // eslint-disable-next-line prefer-destructuring
        draggableArea = draggableArea.childNodes[0];
      } else {
        draggableId = draggableArea?.id;
      }
      draggableArea.setAttribute("data-draggable", "1");
      draggableArea.classList.add("draggable");
    }
    handleCloseIcons(
      targetBottomSheetArg,
      sideSheetLeft,
      sideSheetRight,
      isWeb,
      draggableId,
      overlayArg,
      modalClose,
    );
    isWeb = windowResizeListener(
      targetBottomSheetArg,
      sideSheetLeft,
      sideSheetRight,
      isWeb,
      overlayArg,
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
      open(isWeb, openOnLoadArg);
    }
    targetBottomSheetArg.click();
    targetBottomSheetArg.style.overflow = "scroll";
    targetBottomSheetArg.style.touchAction = "auto";
    setTimeout(() => {
      handleDragGesture(
        targetBottomSheetArg,
        currentSnapPoint,
        lastSnapPoint,
        targetBottomSheetArg,
        draggableId,
        overlayArg,
        isWeb,
      );
    }, 400);

    if (document.querySelector(`.bottomsheet #${targetBottomSheetArg.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheetArg.id}`,
      ).style.display = "block";
    }
  }

  function init(openOnLoadProp = false) {
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
    const isWeb = !(window.innerWidth < minWidthForModal);

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
      createBottomSheet(targetBottomSheet, isWeb, overlay, openOnLoadProp);
    } else {
      open(isWeb, openOnLoadProp);
    }
  }

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
}

export default BottomSheet;
