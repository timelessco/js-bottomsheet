import {
  snapPointConversion,
  checkType,
  convertToPx,
  differenceOfWindowHt,
  getMobileOperatingSystem,
} from "./helpers/convertionHelpers";
import { hideOverlay, addOverlay } from "./helpers/overlayHelpers";
import { moveBottomSheet } from "./helpers/translationHelpers";
import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

function BottomSheet(props) {
  let {
    snapPoints = ["100%"],
    displayOverlay = false,
    minWidthForModal = 700,
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
    defaultSideSheetClose = true,
    cleanUpOnClose = false,
    dismissible = true,
    velocityThreshold = 0.9,
    distanceThreshold = 150,
    closeOnOverlayClick = true,
    onDragStart = () => {},
    onDragEnd = () => {},
    sideSheetIcon = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    sideSheetSnapPoints = ["10%", "25%", "50%", "100%"],
    animateOnDrag = {},
    sideSheetIconPosition = `left`,
    sideSheetOpenValue = "50%",
    sideSheetCloseValue = "30%",
    scaleOnDrag = true,
    scaleItems = [],
    scaleValues = [],
    springConfig = `spring(1, 95, 25, 13)`,
    scrollableSheet = true,
    resizableSheet = true,
    resizablePosition = "left",
  } = props;
  let lastSetSnapPoint;
  let bottomSheets = document.querySelectorAll(`[data-bottomsheet]`);
  window.onload = () => {
    localStorage.removeItem("array");
  };
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
  let scaleValue = 0.93;

  document.addEventListener("click", (e) => {
    setTimeout(() => {
      if (
        e.target.tagName.toLowerCase() === "input" &&
        getMobileOperatingSystem() === "Android"
      ) {
        moveBottomSheet(targetBottomSheet, "0px", getSnapPointAnimation());
      }
    }, 100);
  });
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
    // document.body.style.overflowY = "contain";
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
    let bottomsheetArray = JSON.parse(localStorage.getItem("array")) || [];
    if (
      !bottomsheetArray.length ||
      (bottomsheetArray.length &&
        bottomsheetArray?.indexOf(targetBottomSheet.id) === -1 &&
        targetBottomSheet.id.length > 0)
    ) {
      bottomsheetArray?.push(targetBottomSheet.id);
      let obj = {};
      bottomsheetArray.forEach((i) => {
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
          bottomsheetArray[bottomsheetArray.length - 1]
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
      targetBottomSheet && document.querySelector(".overlay")
        ? document.body.insertBefore(overlay, targetBottomSheet)
        : "";
      if (closeOnOverlayClick) {
        overlay.addEventListener("click", () => {
          close(dismissible, bottomsheetArray);
        });
      }
    }
    let isWeb = window.innerWidth < minWidthForModal ? false : true;
    if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
      createBottomSheet(
        targetBottomSheet,
        isWeb,
        overlay,
        openOnLoad,
        bottomsheetArray
      );
    } else {
      open(isWeb, openOnLoad, false, bottomsheetArray);
    }
  }

  function createBottomSheet(
    targetBottomSheet,
    isWeb,
    overlay,
    openOnLoad,
    bottomsheetArray
  ) {
    let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
    let lastSnapPoint = snapPointConversion(snapPoints[snapPoints.length - 1]);
    let modalClose = document.createElement("div");
    let sideSheetIconWrapper = document.createElement("div");
    let draggableId = "";
    let resizableDiv = document.createElement("div");
    resizableDiv.innerHTML =
      '<svg width="18" height="47" viewBox="0 0 8 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0V26.5" stroke="black"/><path d="M7 0V26.5" stroke="black"/><path d="M1 0V26.5" stroke="black"/></svg>';
    if (resizablePosition === "left") {
      resizableDiv.style.left = "0";
    } else {
      resizableDiv.style.right = "0";
    }
    // resizableDiv.innerHTML = "hello";
    resizableDiv.id = "resizable";
    targetBottomSheet.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.classList.add("close-modal");
    modalClose.addEventListener("click", () =>
      closeModal(targetBottomSheet, overlay)
    );
    if (sideSheetIconPosition === "left") {
      sideSheetIconWrapper.id = "side-left";
    } else {
      sideSheetIconWrapper.id = "side-right";
    }
    defaultSideSheetClose
      ? sideSheetIconWrapper.addEventListener("click", () => {
          closeSideSheet(overlay);
        })
      : "";
    modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
    if (sideSheetIconWrapper.children.length === 0)
      sideSheetIconWrapper.insertAdjacentHTML("afterbegin", sideSheetIcon);
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
      draggableArea.classList.add("draggable");
    }
    handleCloseIcons(
      targetBottomSheet,
      sideSheetIconWrapper,
      isWeb,
      draggableId,
      overlay,
      modalClose,
      resizableDiv
    );
    isWeb = windowResizeListener(
      targetBottomSheet,
      sideSheetIconWrapper,
      isWeb,
      overlay,
      modalClose,
      draggableId,
      resizableDiv
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
      open(isWeb, openOnLoad, false, bottomsheetArray);
    }
    if (scrollableSheet) {
      targetBottomSheet.click();
      targetBottomSheet.style.overflow = "scroll";
      targetBottomSheet.style.touchAction = "auto";
    }
    setTimeout(() => {
      handleDragGesture(
        targetBottomSheet,
        currentSnapPoint,
        lastSnapPoint,
        targetBottomSheet,
        draggableId,
        overlay,
        isWeb,
        bottomsheetArray,
        resizableDiv
      );
    }, 400);

    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(
        `.bottomsheet #${targetBottomSheet.id}`
      ).style.display = "block";
    }
  }
  function observeMutation(bottomsheetArray) {
    var config = { attributes: true, childList: true };
    var callback = function (mutationsList) {
      for (var mutation of mutationsList) {
        if (
          mutation.type == "attributes" &&
          window.innerWidth < minWidthForModal &&
          scaleOnDrag
        ) {
          stackAnimation(bottomsheetArray);
        }
      }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetBottomSheet, config);
  }
  function windowResizeListener(
    targetBottomSheet,
    sideSheetIconWrapper,
    isWeb,
    overlay,
    modalClose,
    draggableId,
    resizableDiv
  ) {
    window.addEventListener("resize", () => {
      handleCloseIcons(
        targetBottomSheet,
        sideSheetIconWrapper,
        isWeb,
        draggableId,
        overlay,
        modalClose,
        resizableDiv
      );
      if (window.innerWidth < minWidthForModal) isWeb = false;
      else isWeb = true;
      return isWeb;
    });
    return isWeb;
  }

  function closeModal(targetBottomSheet, overlay) {
    anime({
      targets: targetBottomSheet,
      opacity: 0,
      easing: springConfig,
      duration: 0.1,
      translateY: "-40%",
    });
    setTimeout(() => {
      cleanUp(targetBottomSheet, overlay);
    }, 500);
    hideOverlay(overlay);
  }

  function close(
    dismissible = true,
    bottomsheetArray = JSON.parse(localStorage.getItem("array"))
  ) {
    displayOverlay && overlay ? hideOverlay(overlay) : "";
    document.body.style.overflow = "scroll";

    if (window.innerWidth < minWidthForModal) {
      anime({
        targets: targetBottomSheet,
        translateY: `${
          !dismissible
            ? differenceOfWindowHt(checkType(snapPoints[0]))
            : convertToPx(120)
        }px`,
        easing: getSnapPointAnimation(),
        duration: 1,
      });
      let bottomInd;
      if (bottomsheetArray && bottomsheetArray.includes(targetBottomSheet))
        bottomInd = bottomsheetArray.findIndex(
          (i) => document.getElementById(i) === targetBottomSheet
        );
      if (bottomInd > -1) {
        bottomsheetArray.splice(bottomInd, 1);
      }
      if (bottomsheetArray)
        localStorage.setItem("array", JSON.stringify(bottomsheetArray));
      else localStorage.setItem("array", []);

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
    } else {
      if (webLayout === "modal") {
        closeModal(targetBottomSheet, overlay);
      } else if (webLayout === "sideSheetLeft") {
        closeSideSheet(overlay);
      } else {
        closeSideSheet(overlay);
      }
    }
    lastSetSnapPoint = convertToPx(120);
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
    sideSheetIconWrapper,
    isWeb,
    draggableId,
    overlay,
    modalClose,
    resizableDiv
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
      targetBottomSheet.classList.add("bottomsheet"),
        targetBottomSheet.classList.remove("modal");
      targetBottomSheet.classList.remove("side-sheet");
    }
  }

  function open(
    isWeb = false,
    openOnLoad = false,
    withoutAnimation = false,
    bottomsheetArray
  ) {
    displayOverlay ? addOverlay(overlay) : "";
    if (isWeb) {
      document.body.style.overflow = "hidden";

      if (webLayout === "sideSheetLeft") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.left = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            left: "0",
            width: sideSheetOpenValue,
            opacity: 1,
            easing: springConfig,
            duration: 1,
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
            width: sideSheetOpenValue,
            easing: springConfig,
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
          easing: springConfig,
          duration: 0.1,
        });
      }
    } else {
      if (bottomsheetArray)
        localStorage.setItem("array", JSON.stringify(bottomsheetArray));
      else localStorage.setItem("array", []);
      if (openOnLoad) {
        targetBottomSheet.style.opacity = 1;
        targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
          checkType(snapPoints[0])
        )}px)`;
      } else {
        if (withoutAnimation) {
          targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(
            checkType(snapPoints[0])
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
    }
    lastSetSnapPoint = differenceOfWindowHt(checkType(snapPoints[0]));
  }

  function handleDragGesture(
    draggableTarget,
    currentSnapPoint,
    lastSnapPoint,
    newBottomSheet,
    draggableId,
    overlay,
    isWeb,
    bottomsheetArray,
    resizableDiv
  ) {
    if (window.innerWidth < minWidthForModal) {
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
            ...props
          }) => {
            console.log(active, "hereejknrkj");
            let minSnapPoint = 0;
            let maxSnapPoint = Infinity;
            currentSnapPoint = getCurrentSnapPoint(newBottomSheet);

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
                  close(dismissible, bottomsheetArray);

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
                  if (scrollableSheet) {
                    newBottomSheet.style.overflow = "scroll";
                    newBottomSheet.style.touchAction = "auto";
                    newBottomSheet.click();
                  }
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
                    close(dismissible, bottomsheetArray);
                }
              }
            } else {
              if (
                getCurrentSnapPoint(targetBottomSheet) <=
                convertToPx(100 - lastSnapPoint)
              ) {
                if (scrollableSheet) {
                  newBottomSheet.click();
                  newBottomSheet.style.overflow = "scroll";
                  if (convertToPx(100 - lastSnapPoint) > 0)
                    newBottomSheet.style.minHeight = "unset";
                  newBottomSheet.style.height = `${convertToPx(
                    lastSnapPoint
                  )}px`;
                  newBottomSheet.style.touchAction = "auto";
                }
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
                  close(dismissible, bottomsheetArray);
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
                newBottomSheet.style.overflow = "scroll";
                newBottomSheet.click();
                newBottomSheet.style.touchAction = "auto";
              }
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
        }
      );
    } else {
      if (resizableDiv) {
        new Gesture(
          resizableDiv,
          {
            onDrag: ({ offset }) => {
              anime({
                targets: targetBottomSheet,
                width: `${
                  webLayout === "sideSheetLeft"
                    ? Math.round((offset[0] / window.innerWidth) * 100 + 50)
                    : 100 -
                      Math.round((offset[0] / window.innerWidth) * 100 + 50)
                }%`,
                easing: "linear",
                duration: 0,
              });
            },
          },
          {
            drag: {
              axis: "x",
            },
          }
        );
      }
    }
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
    console.log(active, "act");

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
        );
      }
      function previousSnappointInputs() {
        return translateToPreviousSnapPoint(
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
        );
      }
      if (!active) {
        previousSnappointInputs() !== undefined
          ? (offset[1] = previousSnappointInputs())
          : "";
      }
    } else {
      // if (convertToPx(100 - lastSnapPoint) === lastSetSnapPoint && active) {
      //   moveBottomSheet(
      //     newBottomSheet,
      //     `${actualOffset}px`,
      //     `spring(1, 250, 25, 25)`
      //   );
      // } else
      if (active) {
        if (!scrollableSheet) {
          moveBottomSheet(
            newBottomSheet,
            `${
              actualOffset > window.innerHeight
                ? window.innerHeight
                : actualOffset < convertToPx(100 - lastSnapPoint) - 200
                ? convertToPx(100 - lastSnapPoint) - 200
                : actualOffset
            }px`,
            `spring(1, 250, 25, 25)`
          );
        } else
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
      function nextSnappointInputs() {
        // console.log(
        //   "here",
        //   actualOffset,
        //   convertToPx(100 - lastSnapPoint),
        //   actualOffset < convertToPx(100 - lastSnapPoint)
        //     ? convertToPx(100 - lastSnapPoint)
        //     : actualOffset
        // );

        return translateToNextSnapPoint(
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
        );
      }
      if (!active) {
        // console.log("here");
        nextSnappointInputs() !== undefined
          ? (offset[1] = nextSnappointInputs())
          : "";
      }
    }
  }

  function getCurrentSnapPoint(newBottomSheet) {
    return +newBottomSheet?.style?.transform.slice(
      11,
      newBottomSheet?.style?.transform.indexOf("px")
    );
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
        convertToPx(elem) > differenceOfWindowHt(convertXy) &&
        convertToPx(elem) < maxSnapPoint
      ) {
        maxSnapPoint = convertToPx(elem);
      }
    });
    if (maxSnapPoint !== Infinity) {
      if (snappable) {
        moveBottomSheet(
          newBottomSheet,
          `${differenceOfWindowHt(maxSnapPoint)}px`,
          getSnapPointAnimation()
        );
        lastSetSnapPoint = differenceOfWindowHt(maxSnapPoint);
        return lastSetSnapPoint;
      } else {
        if (vy > velocityThreshold || dy < distanceThreshold) {
          moveBottomSheet(
            newBottomSheet,
            `${differenceOfWindowHt(maxSnapPoint)}px`,
            getSnapPointAnimation()
          );
          lastSetSnapPoint = differenceOfWindowHt(maxSnapPoint);
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
        convertToPx(elem) < differenceOfWindowHt(convertXy) &&
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
              ? differenceOfWindowHt(checkType(snapPoints[0]))
              : differenceOfWindowHt(minSnapPoint)
            : differenceOfWindowHt(minSnapPoint)
        }px`,
        getSnapPointAnimation()
      );
      lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
      return lastSetSnapPoint;
    } else {
      if (vy > velocityThreshold || dy > distanceThreshold) {
        moveBottomSheet(
          newBottomSheet,
          `${
            !dismissible
              ? minSnapPoint <= checkType(snapPoints[0])
                ? differenceOfWindowHt(checkType(snapPoints[0]))
                : differenceOfWindowHt(minSnapPoint)
              : differenceOfWindowHt(minSnapPoint)
          }px`,
          getSnapPointAnimation()
        );
        lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
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

  function closeSideSheet(overlay) {
    if (targetBottomSheet.style.width === sideSheetCloseValue) {
      anime({
        targets: targetBottomSheet,
        width: sideSheetOpenValue,
        easing: springConfig,
        duration: 0.1,
      });
    } else {
      anime({
        targets: targetBottomSheet,
        width: sideSheetCloseValue,
        easing: springConfig,
        duration: 0.1,
      });
    }
    setTimeout(() => {
      cleanUpOnClose ? cleanUp(targetBottomSheet, overlay) : "";
    }, 400);
    hideOverlay(overlay);
  }
  let scaledValue = 1;
  function stackAnimation(bottomsheetArray) {
    let actualIndex;
    let scaleIndex;
    bottomsheetArray.forEach((i, index) => {
      if (
        i === targetBottomSheet.id &&
        bottomsheetArray[index - 1] &&
        document.getElementById(bottomsheetArray[index - 1]) &&
        getCurrentSnapPoint(
          document.getElementById(bottomsheetArray[index - 1])
        ) === 0 &&
        snapPoints[snapPoints.length - 1].includes("95")
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
        bottomsheetArray.forEach((item, ind) => {
          // if (ind !== index - 1)
          // if (document.getElementById(item).style.top === "50px")
          //   anime({
          //     targets: `#${item}`,
          //     top: "0px",
          //     easing: `linear`,
          //     duration: 1,
          //   });
        });
        if (
          index - 1 > 0 &&
          getCurrentSnapPoint(document.getElementById(bottomsheetArray[index]))
        ) {
          bottomsheetArray.slice(0, index - 1).forEach((item) => {
            anime({
              targets: `#${item}`,
              top: "50px",
              easing: `linear`,
              duration: 1,
            });
          });
        } else {
          bottomsheetArray.slice(0, index - 1).forEach((item) => {
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
  function cleanUp(targetBottomSheet) {
    targetBottomSheet.remove();
  }

  function getSnapPointAnimation() {
    return `spring(1, 95, 25, 13)`;
  }
  function destroy() {
    document.getElementById(trigger).removeEventListener("click", () => {
      init(false);
    });
  }
  function moveSideSheetTo(value) {
    if (window.innerWidth > minWidthForModal) {
      anime({
        targets: targetBottomSheet,
        // padding: 0,
        width: value,
        easing: springConfig,
        duration: 0.1,
      });
    }
  }
  const self = {
    close,
    init,
    open,
    destroy,
    moveSideSheetTo,
  };
  return self;
}
export default BottomSheet;
