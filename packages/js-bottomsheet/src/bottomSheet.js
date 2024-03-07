import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es";

import {
  getLeftBounds,
  getRightBounds,
  makeDraggable,
  makeScrollable,
  moveBottomSheet,
  resizableRequirements,
  translateResizableDiv,
} from "./helpers/bottomsheetHelpers";
import {
  checkType,
  convertToPx,
  differenceOfWindowHt,
  getCurrentSnapPoint,
  snapPointConversion,
} from "./helpers/convertionHelpers";
import { addOverlay, hideOverlay } from "./helpers/overlayHelpers";

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
    sideSheetIcon = ``,
    sideSheetIconPosition = `left`,
    sideSheetMinValue = 20,
    sideSheetMaxValue = 50,
    defaultSideSheetClose = true,
    cleanUpOnClose = false,
    dismissible = true,
    rubberband = false,
    velocityThreshold = 0.9,
    distanceThreshold = 150,
    closeOnOverlayClick = true,
    onDragStart = () => {},
    onDragEnd = () => {},
    scrollableSheet = true,
    modalPosition = [50, 50],
    headerContent = ``,
    draggableArea = ``,
    footerContent = ``,
    resizeHoverEffect = false,
  } = props;
  let { content = "" } = props;
  let lastSetSnapPoint;
  let innerHt = window.innerHeight;
  let targetid = trigger
    ? document
        ?.querySelector(`#${trigger}`)
        ?.getAttribute("data-bottomsheet-id")
    : "";

  let targetBottomSheet = targetid
    ? document?.querySelector(`#${targetid}`)
    : "";

  let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
  const springConfig = `spring(1,100,24,15)`;
  const sideSheetSpringConfig = `spring(1,100,20,12)`;
  const quickSpringConfig = `spring(1, 100, 21, 13)`;

  let isWeb = !(window.innerWidth < minWidthForModal);
  const overlay = document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    ? document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    : document.createElement("div");

  content =
    typeof content !== "string"
      ? Promise.resolve(content).then(value => value)
      : content;

  document.addEventListener("resize", () => {
    innerHt = window.innerHeight;

    if (window.innerWidth === minWidthForModal) init();
  });
  if (targetBottomSheet?.id) overlay.id = `${targetBottomSheet?.id}-overlay`;

  function open(openOnLoading, withoutAnimation = false) {
    if (displayOverlay) {
      addOverlay(overlay);
    }
    if (isWeb) {
      document.body.style.overflow = "hidden";

      if (webLayout === "sideSheetLeft") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.left = `-100%`;
        const widthValue =
          typeof sideSheetMinValue === "string"
            ? sideSheetMinValue
            : `${sideSheetMinValue}%`;
        anime({
          targets: targetBottomSheet,
          left: "0",
          width: widthValue,
          opacity: 1,
          easing: sideSheetSpringConfig,
          duration: 1,
          translateX: 0,
        });
      } else if (webLayout === "sideSheetRight") {
        const widthValue =
          typeof sideSheetMinValue === "string"
            ? sideSheetMinValue
            : `${sideSheetMinValue}%`;
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.right = `-100%`;
        targetBottomSheet.style.left = "unset";
        anime({
          targets: targetBottomSheet,
          right: "0",
          opacity: 1,
          width: widthValue,
          easing: sideSheetSpringConfig,
          duration: 1,
          translateX: 0,
        });
      } else {
        targetBottomSheet.style.top = "50%";
        targetBottomSheet.style.transform = `translateX(${-modalPosition[0]}%) translateY(${
          -modalPosition[1] + 10
        }%)`;

        anime({
          translateY: -modalPosition[1],
          targets: targetBottomSheet,
          opacity: 1,
          easing: springConfig,
          duration: 0.1,
        });
      }
    } else {
      targetBottomSheet.style.opacity = 0;
      if (openOnLoading) {
        targetBottomSheet.style.opacity = 1;
        targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
          checkType(snapPoints[0]),
        )}px)`;
      } else if (withoutAnimation) {
        targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
          checkType(snapPoints[0]),
        )}px)`;
      } else {
        targetBottomSheet.style.transform = `translateY(${convertToPx(100)}px)`;
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            translateY: `${differenceOfWindowHt(checkType(snapPoints[0]))}px`,
            easing:
              snapPoints.length === 1 && `${snapPoints[0]}`.includes(100)
                ? quickSpringConfig
                : springConfig,
            opacity: 1,
            duration: 1,
          });
        }, 100);
      }
    }
    lastSetSnapPoint = differenceOfWindowHt(checkType(snapPoints[0]));
  }

  function cleanUp() {
    targetBottomSheet?.remove();
  }

  function closeModal() {
    anime({
      targets: targetBottomSheet,
      easing: springConfig,
      duration: 0.1,
      translateY: `${modalPosition[1] + 10}%`,
    });

    setTimeout(() => {
      anime({
        targets: targetBottomSheet,
        easing: springConfig,
        duration: 0,
        opacity: 0,
      });
    }, 30);
    setTimeout(() => {
      cleanUp();
    }, 400);
    hideOverlay(overlay);
    onClose();
  }

  function closeSideSheet() {
    if (targetBottomSheet.style.width === 0) {
      anime({
        targets: targetBottomSheet,
        easing: sideSheetSpringConfig,
        duration: 0.1,
        translateX: "-120%",
      });
    } else {
      anime({
        targets: targetBottomSheet,
        easing: sideSheetSpringConfig,
        duration: 0.1,
        translateX: "-120%",
      });
    }
  }

  function close(dismissable = true) {
    if (displayOverlay && overlay) {
      hideOverlay(overlay);
      onClose();
    }
    document.body.style.overflow = "scroll";

    if (window.innerWidth < minWidthForModal) {
      anime({
        targets: targetBottomSheet,
        translateY: `${
          !dismissable
            ? differenceOfWindowHt(checkType(snapPoints[0]))
            : convertToPx(120)
        }px`,
        easing: sideSheetSpringConfig,
        duration: 1,
      });
    } else if (webLayout === "modal") {
      closeModal(targetBottomSheet, overlay);
    } else if (webLayout === "sideSheetLeft") {
      closeSideSheet();
    } else {
      closeSideSheet();
    }
    lastSetSnapPoint = convertToPx(120);
    setTimeout(() => {
      if (lastSetSnapPoint >= innerHt) {
        if (cleanUpOnClose) {
          cleanUp(targetBottomSheet, overlay);
        }
      }
    }, 500);
    hideOverlay(overlay);
    onClose();
  }

  function handleCloseIcons(
    sideSheetIconWrapper,
    draggableId,
    modalClose,
    resizableDiv,
  ) {
    if (isWeb) {
      if (
        draggableArea &&
        document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)
      ) {
        targetBottomSheet?.removeChild(draggableArea);
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
        !document.querySelector(`#${targetBottomSheet.id} #side-right`) &&
        !document.querySelector(`#${targetBottomSheet.id} #side-left`) &&
        webLayout !== "modal"
      ) {
        targetBottomSheet.prepend(sideSheetIconWrapper);
        targetBottomSheet.prepend(resizableDiv);

        closeSideSheet();
      }
    } else {
      if (
        draggableId &&
        !document.querySelector(`#${targetBottomSheet?.id} #${draggableId}`)
      ) {
        targetBottomSheet.insertAdjacentHTML("afterbegin", draggableArea);
      }
      if (
        document.querySelector(`#${targetBottomSheet.id} #modal-close`) &&
        modalClose &&
        targetBottomSheet.children
      ) {
        targetBottomSheet?.removeChild(modalClose);
      }
      if (
        document.querySelector(`#${targetBottomSheet.id} #side-left`) ||
        document.querySelector(`#${targetBottomSheet.id} #side-right`)
      ) {
        targetBottomSheet?.removeChild(sideSheetIconWrapper);
        targetBottomSheet?.removeChild(resizableDiv);
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
    moveBottomSheet(newBottomSheet, `${value}px`, springConfig);
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
          springConfig,
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
      if (value >= window.innerHeight) {
        if (displayOverlay && overlay) {
          hideOverlay(overlay);
          onClose();
        }

        value = innerHt + 300;
      }
      moveBottomSheet(newBottomSheet, `${value}px`, springConfig);
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
      if (actualOffset > innerHt) {
        value = innerHt;
      } else if (
        actualOffset < convertToPx(100 - lastSnapPoint) &&
        scrollableSheet
      ) {
        value = convertToPx(100 - lastSnapPoint);
      } else {
        value = actualOffset;
      }
      if (active) {
        anime({
          targets: newBottomSheet,
          translateY: `${value}px`,
          easing: springConfig,
          duration: 0,
        });
      }
      if (!active) {
        if (
          translateToPreviousSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
          ) !== undefined
        ) {
          actualOffset = translateToPreviousSnapPoint(
            value,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
          );
        }
      }
    } else {
      let value;
      if (actualOffset > innerHt) {
        value = innerHt;
      } else if (
        actualOffset < convertToPx(100 - lastSnapPoint) &&
        scrollableSheet
      ) {
        value = convertToPx(100 - lastSnapPoint);
      } else {
        value = actualOffset;
      }
      if (active) {
        anime({
          targets: newBottomSheet,
          translateY: `${value}px`,
          easing: springConfig,
          duration: 0,
        });
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
    resizableDiv,
  ) {
    if (window.innerWidth < minWidthForModal) {
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
            if (direction[1] >= 0) {
              if (
                draggableId &&
                document.querySelector(`#${draggableId}`).contains(target)
              ) {
                makeDraggable(targetBottomSheet);
                handleSnapPoints(
                  targetBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                );

                if (lastSetSnapPoint >= innerHt) {
                  hideOverlay(overlay);
                  onClose();
                }
              } else if (
                targetBottomSheet.scrollTop >= 1 &&
                currentSnapPoint <= convertToPx(100 - lastSnapPoint) &&
                (!draggableId ||
                  target !== document.querySelector(`#${draggableId}`)) &&
                scrollableSheet
              ) {
                makeScrollable(targetBottomSheet);
              } else {
                makeDraggable(targetBottomSheet);
                handleSnapPoints(
                  targetBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                );
              }
            } else if (
              getCurrentSnapPoint(targetBottomSheet) <=
                convertToPx(100 - lastSnapPoint) &&
              scrollableSheet
            ) {
              makeScrollable(targetBottomSheet);
              if (convertToPx(100 - lastSnapPoint) > 0)
                targetBottomSheet.style.minHeight = "unset";
              targetBottomSheet.style.height = `${convertToPx(
                lastSnapPoint,
              )}px`;
            } else {
              if (targetBottomSheet.scrollTop === 0)
                makeDraggable(targetBottomSheet);
              handleSnapPoints(
                targetBottomSheet,
                null,
                maxSnapPoint,
                active,
                lastSnapPoint,
                vy,
                offset,
                dy,
              );
            }
          },
          onDragStart: ({ direction }) => {
            document.body.style.overflow = "hidden";
            onDragStart(direction);
          },
          onDragEnd: ({ direction }) => {
            currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
            if (
              (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
                lastSetSnapPoint === 0) &&
              direction[1] < 0 &&
              targetBottomSheet.scrollTop >= 0 &&
              scrollableSheet
            ) {
              makeScrollable(targetBottomSheet);
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
            bounds: {
              top: !scrollableSheet
                ? convertToPx(100 - lastSnapPoint) + 10
                : -innerHt,
            },
            rubberband: !scrollableSheet && rubberband,
            axis: "y",
            preventDefault: false,
            from: () => [0, getCurrentSnapPoint(targetBottomSheet)],
          },
        },
      );
    } else if (resizableDiv) {
      Gesture(
        resizableDiv,
        {
          onDrag: ({ offset, xy, active }) => {
            translateResizableDiv(
              webLayout,
              offset,
              sideSheetMinValue,
              active,
              xy,
              targetBottomSheet,
              dismissible,
              sideSheetMaxValue,
            );
          },
        },
        {
          drag: {
            axis: "x",
            bounds: {
              left:
                typeof sideSheetMinValue === "string"
                  ? undefined
                  : getLeftBounds(
                      webLayout,
                      sideSheetMaxValue,
                      targetBottomSheet,
                      sideSheetMinValue,
                    ),
              right:
                typeof sideSheetMinValue === "string"
                  ? undefined
                  : getRightBounds(
                      webLayout,
                      sideSheetMaxValue,
                      targetBottomSheet,
                    ),
            },
            rubberband: true,
          },
        },
      );
    }
  }

  function windowResizeListener(
    sideSheetIconWrapper,
    modalClose,
    draggableId,
    resizableDiv,
  ) {
    window.addEventListener("resize", () => {
      handleCloseIcons(
        sideSheetIconWrapper,
        draggableId,
        modalClose,
        resizableDiv,
      );
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
    const sideSheetIconWrapper = document.createElement("div");
    const resizableDiv = document.createElement("div");
    let draggableId = "";

    resizableRequirements(
      webLayout,
      resizableDiv,
      resizeHoverEffect,
      targetBottomSheet,
      isWeb,
    );
    targetBottomSheet.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.classList.add("close-modal");
    modalClose.addEventListener("click", () => closeModal());
    if (sideSheetIconPosition === "left") {
      sideSheetIconWrapper.id = "side-left";
    } else {
      sideSheetIconWrapper.id = "side-right";
    }
    if (defaultSideSheetClose) {
      sideSheetIconWrapper.addEventListener("click", () => {
        closeSideSheet(overlay);
      });
    }
    modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
    if (sideSheetIconWrapper.children.length === 0)
      sideSheetIconWrapper.insertAdjacentHTML("afterbegin", sideSheetIcon);
    if (footerContent) {
      if (
        typeof footerContent === "string" &&
        !document.querySelector(`#${targetBottomSheet.id} .footer`)
      ) {
        targetBottomSheet.insertAdjacentHTML("beforeend", footerContent);
      }
    }
    if (headerContent) {
      if (
        typeof headerContent === "string" &&
        !document.querySelector(`#${targetBottomSheet.id} .header`)
      ) {
        targetBottomSheet.insertAdjacentHTML("beforeend", headerContent);
      }
    }
    if (draggableArea) {
      if (typeof draggableArea === "string") {
        draggableId = "drag";
      } else {
        draggableId = draggableArea?.id;
      }
    }
    handleCloseIcons(
      sideSheetIconWrapper,
      draggableId,
      modalClose,
      resizableDiv,
    );
    isWeb = windowResizeListener(
      sideSheetIconWrapper,
      modalClose,
      draggableId,
      resizableDiv,
    );
    setTimeout(() => {
      onOpen();
    }, 300);
    if (
      lastSetSnapPoint &&
      lastSetSnapPoint < innerHt &&
      window.innerWidth < minWidthForModal
    ) {
      close(dismissible);
    } else {
      open(openOnLoad);
    }
    if (
      scrollableSheet &&
      lastSetSnapPoint === innerHt - convertToPx(lastSnapPoint)
    ) {
      makeScrollable(targetBottomSheet);
    }
    if (scrollableSheet && !isWeb)
      targetBottomSheet.style.height = `${convertToPx(lastSnapPoint)}px`;
    setTimeout(() => {
      handleDragGesture(
        targetBottomSheet,
        lastSnapPoint,
        targetBottomSheet,
        draggableId,
        resizableDiv,
      );
    }, 200);

    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheet.id}`,
      ).style.display = "block";
    }
  }
  function init() {
    targetid = trigger
      ? document
          ?.querySelector(`#${trigger}`)
          ?.getAttribute("data-bottomsheet-id")
      : "";
    document.body.style.overscrollBehavior = "contain";
    targetBottomSheet = targetid ? document?.querySelector(`#${targetid}`) : "";

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
      !document.getElementById(`${targetBottomSheet.id}`)
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
      open(openOnLoad);
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
    }, 300);
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
