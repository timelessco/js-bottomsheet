import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es";

import {
  checkType,
  convertToPx,
  differenceOfWindowHt,
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
    sideSheetIcon = ``,
    sideSheetIconPosition = `left`,
    sideSheetMinValue = 20,
    sideSheetMaxValue = 50,
    scaleOnDrag = false,
    // scaleItems = [],
    // scaleValues = [],
    defaultSideSheetClose = true,
    cleanUpOnClose = false,
    dismissible = true,
    // sideSheetSnapPoints = ["10%", "25%", "50%", "100%"],
    velocityThreshold = 0.9,
    distanceThreshold = 150,
    closeOnOverlayClick = true,
    onDragStart = () => {},
    onDragEnd = () => {},
    scrollableSheet = true,
    // resizableSheet = true,
    resizablePosition = "left",
  } = props;

  let { content = "", draggableArea = `` } = props;
  let lastSetSnapPoint;
  // const bottomSheets = document.querySelectorAll(`[data-bottomsheet]`);
  // window.onload = () => {
  //   localStorage.removeItem("array");
  // };
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
  const springConfig = `spring(1,250,20,13)`;
  const scaleValue = 0.93;

  function open(bottomsheetArray, openOnLoading, withoutAnimation = false) {
    if (displayOverlay) {
      addOverlay(overlay);
    }
    if (isWeb) {
      document.body.style.overflow = "hidden";

      if (webLayout === "sideSheetLeft") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.left = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            left: "0",
            width: `${sideSheetMinValue}%`,
            opacity: 1,
            easing: springConfig,
            duration: 1,
            translateX: 0,
          });
        }, 100);
      } else if (webLayout === "sideSheetRight") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.right = `-100%`;
        targetBottomSheet.style.left = "unset";
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            right: "0",
            opacity: 1,
            width: `${sideSheetMinValue}%`,
            easing: springConfig,
            duration: 1,
            translateX: 0,
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
          easing: springConfig,
          duration: 0.1,
          translateX: 0,
        });
      }
    } else {
      if (bottomsheetArray)
        localStorage.setItem("array", JSON.stringify(bottomsheetArray));
      else localStorage.setItem("array", []);
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
      easing: springConfig,
      duration: 0.1,
      translateY: "-40%",
    });
    setTimeout(() => {
      cleanUp();
    }, 500);
    hideOverlay(overlay);
  }

  function closeSideSheet() {
    if (targetBottomSheet.style.width === 0) {
      anime({
        targets: targetBottomSheet,
        width: "0",
        easing: springConfig,
        duration: 0.1,
      });
    } else {
      anime({
        targets: targetBottomSheet,
        width: "0",
        easing: springConfig,
        duration: 0.1,
      });
    }
  }

  function close(
    dismissable = true,
    bottomsheetArray = JSON.parse(localStorage.getItem("array")),
  ) {
    if (displayOverlay && overlay) {
      hideOverlay(overlay);
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
        easing: springConfig,
        duration: 1,
      });
      let bottomInd;
      if (bottomsheetArray && bottomsheetArray.includes(targetBottomSheet))
        bottomInd = bottomsheetArray.findIndex(
          i => document.getElementById(i) === targetBottomSheet,
        );
      if (bottomInd > -1) {
        bottomsheetArray.splice(bottomInd, 1);
      }
      if (bottomsheetArray)
        localStorage.setItem("array", JSON.stringify(bottomsheetArray));
      else localStorage.removeItem("array");

      // if (scaleOnDrag) {
      //   bottomsheetArray?.forEach((item, index) => {
      //     if (index !== targetBottomSheet.id)
      //       anime({
      //         targets: `#${item}`,
      //         top: "0px",
      //         easing: `linear`,
      //         duration: 1,
      //       });
      //   });
      // }
    } else if (webLayout === "modal") {
      closeModal(targetBottomSheet, overlay);
    } else if (webLayout === "sideSheetLeft") {
      closeSideSheet();
    } else {
      closeSideSheet();
    }
    lastSetSnapPoint = convertToPx(120);
    setTimeout(() => {
      if (lastSetSnapPoint >= window.innerHeight) {
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
        targetBottomSheet.prepend(draggableArea);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #modal-close`)) {
        targetBottomSheet.removeChild(modalClose);
      }
      if (
        document.querySelector(`#${targetBottomSheet.id} #side-left`) ||
        document.querySelector(`#${targetBottomSheet.id} #side-right`)
      ) {
        targetBottomSheet.removeChild(sideSheetIconWrapper);
        targetBottomSheet.removeChild(resizableDiv);
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
      if (actualOffset > window.innerHeight) {
        value = window.innerHeight;
      } else if (actualOffset < convertToPx(100 - lastSnapPoint)) {
        value = convertToPx(100 - lastSnapPoint);
      } else {
        value = actualOffset;
      }
      if (active) {
        moveBottomSheet(newBottomSheet, `${value}px`, springConfig);
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
        moveBottomSheet(newBottomSheet, `${value}px`, springConfig);
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
    bottomsheetArray,
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
                  overlay,
                  isWeb,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(dismissible, bottomsheetArray);

                if (lastSetSnapPoint >= window.innerHeight) {
                  hideOverlay(overlay);
                }
              } else if (
                targetBottomSheet.scrollTop >= 1 &&
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
                  targetBottomSheet,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  vy,
                  offset,
                  dy,
                  overlay,
                  isWeb,
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  close(dismissible, bottomsheetArray);
              }
            } else if (
              getCurrentSnapPoint(targetBottomSheet) <=
              convertToPx(100 - lastSnapPoint)
            ) {
              if (scrollableSheet) {
                targetBottomSheet.click();
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
                targetBottomSheet,
                null,
                maxSnapPoint,
                active,
                lastSnapPoint,
                vy,
                offset,
                dy,
                overlay,
                isWeb,
              );
              if (lastSetSnapPoint >= window.innerHeight)
                close(dismissible, bottomsheetArray);
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
            from: () => [0, getCurrentSnapPoint(targetBottomSheet)],
          },
        },
      );
    } else if (resizableDiv) {
      Gesture(
        resizableDiv,
        {
          onDrag: ({ offset, direction }) => {
            let translateX;
            if (webLayout === "sideSheetLeft") {
              if (
                Math.round(
                  (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
                ) < sideSheetMinValue &&
                direction[0] <= 0
                // velocity[0] > 0.5
              ) {
                translateX = "-105%";
              }
            } else if (
              100 -
                Math.round(
                  (offset[0] / window.innerWidth) * 100 +
                    (100 - sideSheetMinValue),
                ) <
                sideSheetMinValue &&
              direction[0] >= 0
            ) {
              translateX = "105%";
            }

            anime({
              targets: targetBottomSheet,
              width: `${
                webLayout === "sideSheetLeft"
                  ? Math.round(
                      (offset[0] / window.innerWidth) * 100 + sideSheetMinValue,
                    )
                  : 100 -
                    Math.round(
                      (offset[0] / window.innerWidth) * 100 +
                        (100 - sideSheetMinValue),
                    )
              }%`,
              easing: `spring(1,250,20,25)`,
              duration: 0,
              translateX,
              // opacity: `${width === 0 ? 0 : 1}`,
            });
          },
        },
        {
          drag: {
            axis: "x",
            bounds: {
              left:
                webLayout === "sideSheetRight"
                  ? -(
                      Math.round(
                        (window.innerWidth * sideSheetMaxValue) / 100,
                      ) -
                      Math.round(
                        (window.innerWidth *
                          +targetBottomSheet.style.width.replace("%", "")) /
                          100,
                      )
                    )
                  : -window.innerWidth,
              right:
                webLayout === "sideSheetLeft"
                  ? Math.round((window.innerWidth * sideSheetMaxValue) / 100) -
                    Math.round(
                      (window.innerWidth *
                        +targetBottomSheet.style.width.replace("%", "")) /
                        100,
                    )
                  : window.innerWidth,
              top: -50,
              bottom: 50,
            },
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

  function createBottomSheet(bottomsheetArray) {
    const lastSnapPoint = snapPointConversion(
      snapPoints[snapPoints.length - 1],
    );
    const modalClose = document.createElement("div");
    const sideSheetIconWrapper = document.createElement("div");
    const resizableDiv = document.createElement("div");
    // resizableDiv.innerHTML =
    //   '<svg width="18" height="47" viewBox="0 0 8 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0V26.5" stroke="black"/><path d="M7 0V26.5" stroke="black"/><path d="M1 0V26.5" stroke="black"/></svg>';
    if (resizablePosition === "left") {
      resizableDiv.style.left = "0";
    } else {
      resizableDiv.style.right = "0";
    }
    // resizableDiv.innerHTML = "hello";
    resizableDiv.id = "resizable";
    let draggableId = "";

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
      lastSetSnapPoint < window.innerHeight &&
      window.innerWidth < minWidthForModal
    ) {
      close(dismissible, bottomsheetArray);
    } else {
      open(bottomsheetArray, openOnLoad);
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
        bottomsheetArray,
        resizableDiv,
      );
    }, 400);

    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheet.id}`,
      ).style.display = "block";
    }
  }
  function stackAnimation(bottomsheetArray) {
    // let actualIndex;
    // let scaleIndex;

    bottomsheetArray.forEach((i, index) => {
      if (
        i === targetBottomSheet.id
        // bottomsheetArray[index - 1] &&
        // document.getElementById(bottomsheetArray[index - 1]) &&
        // getCurrentSnapPoint(
        //   document.getElementById(bottomsheetArray[index - 1]),
        // ) === 0 &&
        // snapPoints[snapPoints.length - 1].includes("95")
      ) {
        anime({
          targets: `#${bottomsheetArray[index - 1]}`,
          scale:
            scaleValue +
            ((1 - scaleValue) / window.innerHeight) *
              getCurrentSnapPoint(targetBottomSheet),
          easing: `linear`,
          duration: 0.1,
          // translateY: "0%",
        });
        // anime({
        //   targets: `#${i}`,
        //   translateY: "10%",
        // });
        // bottomsheetArray.forEach((item, ind) => {
        // if (ind !== index - 1)
        // if (document.getElementById(item).style.top === "50px")
        //   anime({
        //     targets: `#${item}`,
        //     top: "0px",
        //     easing: `linear`,
        //     duration: 1,
        //   });
        // });
        if (
          index - 1 > 0 &&
          getCurrentSnapPoint(document.getElementById(bottomsheetArray[index]))
        ) {
          bottomsheetArray.slice(0, index - 1).forEach(item => {
            anime({
              targets: `#${item}`,
              top: "50px",
              easing: `linear`,
              duration: 1,
            });
          });
        } else {
          bottomsheetArray.slice(0, index - 1).forEach(item => {
            anime({
              targets: `#${item}`,
              // top: "0px",
              easing: `linear`,
              duration: 1,
            });
          });
        }
      }
    });
    // if (scaleItems.length) {
    //   scaleItems.forEach((i, index) => {
    //     if (
    //       document.getElementById(i) &&
    //       scaledValue !==
    //         scaleValues[index] +
    //           ((1 - scaleValues[index]) / window.innerHeight) *
    //             getCurrentSnapPoint(targetBottomSheet).toFixed(1)
    //     ) {
    //       anime({
    //         targets: `#${i}`,
    //         scale:
    //           scaleValues[index] +
    //           ((1 - scaleValues[index]) / window.innerHeight) *
    //             getCurrentSnapPoint(targetBottomSheet),
    //         easing: `linear`,
    //         duration: 0.1,
    //       });

    //       scaledValue =
    //         scaleValues[index] +
    //         ((1 - scaleValues[index]) / window.innerHeight) *
    //           getCurrentSnapPoint(targetBottomSheet).toFixed(1);
    //     }
    //   });
    // } else {
    //   bottomSheets.forEach((i, index) => {
    //     if (
    //       i.style.display &&
    //       i.style.transform &&
    //       getCurrentSnapPoint(i) &&
    //       getCurrentSnapPoint(i) < window.innerHeight
    //     ) {
    //       actualIndex = index;
    //       if (index === 0) {
    //         scaleIndex = bottomSheets.length - 1;
    //       } else if (index === bottomSheets.length - 1) {
    //         scaleIndex = 0;
    //       } else {
    //         scaleIndex = index - 1;
    //       }
    //     }
    //   });
    //   // }
    //   if (scaleIndex && bottomSheets[scaleIndex]) {
    //     anime({
    //       targets: `#${bottomSheets[scaleIndex].id}`,
    //       scale:
    //         scaleValue +
    //         ((1 - scaleValue) / window.innerHeight) *
    //           getCurrentSnapPoint(bottomSheets[actualIndex]),
    //       easing: `spring(1, 95, 25, 23)`,
    //       duration: 1,
    //     });
    //   }
    // }
  }
  function observeMutation(bottomsheetArray) {
    const config = { attributes: true, childList: true };
    const callback = mutationsList => {
      mutationsList.forEach(mutation => {
        if (
          mutation.type === "attributes" &&
          window.innerWidth < minWidthForModal &&
          scaleOnDrag
        ) {
          stackAnimation(bottomsheetArray);
        }
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetBottomSheet, config);
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
    const bottomsheetArray = JSON.parse(localStorage.getItem("array")) || [];
    if (
      !bottomsheetArray.length ||
      (bottomsheetArray.length &&
        bottomsheetArray?.indexOf(targetBottomSheet.id) === -1 &&
        targetBottomSheet.id.length > 0)
    ) {
      bottomsheetArray?.push(targetBottomSheet.id);
      const obj = {};
      bottomsheetArray.forEach(i => {
        obj[i] = false;
      });
    }

    if (
      targetBottomSheet &&
      !document.getElementById(`#${targetBottomSheet.id}`)
    ) {
      document.body.append(targetBottomSheet);
    }
    if (
      bottomsheetArray.length > 1 &&
      targetBottomSheet ===
        document.getElementById(
          bottomsheetArray[bottomsheetArray.length - 1],
        ) &&
      snapPoints[snapPoints.length - 1].includes("100") &&
      scaleOnDrag
    ) {
      snapPoints[snapPoints.length - 1] = "95%";
    }
    observeMutation(bottomsheetArray);

    if (displayOverlay) {
      overlay.classList.add("overlay");
      addOverlay(overlay);
      document.body.appendChild(overlay);
      if (targetBottomSheet && document.querySelector(".overlay")) {
        document.body.insertBefore(overlay, targetBottomSheet);
      }
      if (closeOnOverlayClick) {
        overlay.addEventListener("click", () => {
          close(bottomsheetArray, isWeb, dismissible);
        });
      }
    }
    if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
      createBottomSheet(bottomsheetArray);
    } else {
      open(bottomsheetArray, openOnLoad);
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
