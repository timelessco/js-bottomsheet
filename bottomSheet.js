import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

async function BottomSheet(props) {
  let {
    snapPoints = ["100%"],
    displayOverlay = true,
    minWidthForWeb = 500,
    draggableArea = ``,
    onOpen = () => {},
    trigger = "",
    content = "",
    init = () => {},
    webLayout = "Modal",
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
    cleanUpOnClose = true,
    sideSheetSnapPoints = ["10%", "25%", "50%", "100%"],
  } = props;

  content = typeof content !== "string" ? await content : content;
  setTimeout(() => {
    if (trigger && document.querySelector(`#${trigger}`)) {
      document.querySelectorAll(`#${trigger}`).forEach((i) =>
        i.addEventListener("click", () => {
          bottomsheetRequirements(
            trigger,
            content,
            displayOverlay,
            init,
            snapPoints,
            minWidthForWeb,
            draggableArea,
            onOpen,
            modalCloseIcon,
            webLayout,
            sideSheetLeftIcon,
            sideSheetRightIcon,
            cleanUpOnClose,
            sideSheetSnapPoints
          );
        })
      );
    }
  }, 400);
}
function bottomsheetRequirements(
  trigger,
  content,
  displayOverlay,
  init,
  snapPoints,
  minWidthForWeb,
  draggableArea,
  onOpen,
  modalCloseIcon,
  webLayout,
  sideSheetLeftIcon,
  sideSheetRightIcon,
  cleanUpOnClose,
  sideSheetSnapPoints
) {
  let targetid = document
    .querySelector(`#${trigger}`)
    .getAttribute("data-bottomsheet-id");

  let targetBottomSheet = document.querySelector(`#${targetid}`);

  if (init) {
    init();
  }
  if (content && !targetBottomSheet) {
    document.body.insertAdjacentHTML("beforeend", content);
    targetBottomSheet = document.querySelector(`#${targetid}`);
  }
  const overlay = document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    ? document.querySelector(`#${targetBottomSheet?.id}-overlay`)
    : document.createElement("div");
  overlay.id = `${targetBottomSheet?.id}-overlay`;

  if (displayOverlay) {
    overlay.classList.add("overlay");
    addOverlay(overlay);
    document.body.insertBefore(overlay, targetBottomSheet);
    overlay.addEventListener("click", () => {
      closeBottomSheet(
        targetBottomSheet,
        displayOverlay,
        cleanUpOnClose,
        hideOverlay,
        overlay,
        isWeb,
        webLayout
      );
    });
    // document.body.appendChild(overlay);
  }
  let isWeb = window.innerWidth < minWidthForWeb ? false : true;

  if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
    createBottomSheet(
      targetBottomSheet,
      snapPoints,
      overlay,
      displayOverlay,
      minWidthForWeb,
      draggableArea,
      onOpen,
      content,
      init,
      modalCloseIcon,
      webLayout,
      sideSheetLeftIcon,
      sideSheetRightIcon,
      isWeb,
      cleanUpOnClose,
      sideSheetSnapPoints
    );
    // : "";
  } else {
    // else {
    openBottomSheet(
      targetBottomSheet,
      snapPoints,
      overlay,
      displayOverlay,
      onOpen,
      content,
      init,
      minWidthForWeb,
      draggableArea,
      isWeb,
      webLayout
    );
    // }
  }
}
function createBottomSheet(
  targetBottomSheet,
  snapPoints,
  overlay,
  displayOverlay,
  minWidthForWeb,
  draggableArea,
  onOpen,
  content,
  init,
  modalCloseIcon,
  webLayout,
  sideSheetLeftIcon,
  sideSheetRightIcon,
  isWeb,
  cleanUpOnClose,
  sideSheetSnapPoints
) {
  // const newBottomSheet = document.createElement("div");
  // lastSetSnapPoint = null;
  targetBottomSheet.style.display = "block";
  let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);

  let lastSnapPoint = +snapPoints[snapPoints.length - 1].replace("%", "");
  // let isWeb = window.innerWidth < minWidthForWeb ? false : true;

  let modalClose = document.createElement("div");
  modalClose.id = "modal-close";
  modalClose.addEventListener("click", () =>
    closeModal(targetBottomSheet, cleanUpOnClose, overlay, sideSheetSnapPoints)
  );
  let sideSheetLeft = document.createElement("div");
  sideSheetLeft.id = "side-left";
  sideSheetLeft.addEventListener("click", () =>
    closeLeftSideSheet(
      targetBottomSheet,
      cleanUpOnClose,
      overlay
      // sideSheetSnapPoints
    )
  );
  let sideSheetRight = document.createElement("div");
  sideSheetRight.id = "side-right";
  sideSheetRight.addEventListener("click", () =>
    closeRightSideSheet(
      targetBottomSheet,
      cleanUpOnClose,
      overlay,
      sideSheetSnapPoints
    )
  );
  modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
  sideSheetLeft.insertAdjacentHTML("afterbegin", sideSheetLeftIcon);
  sideSheetRight.insertAdjacentHTML("afterbegin", sideSheetRightIcon);
  let draggableId = "";
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
    webLayout,
    modalClose,
    sideSheetLeft,
    sideSheetRight,
    isWeb,
    minWidthForWeb,
    draggableArea,
    draggableId,
    cleanUpOnClose,
    overlay,
    sideSheetSnapPoints
  );

  // if (
  //   !document.querySelector(`#${targetBottomSheet.id} #${draggableId}`) &&
  //   !isWeb
  // ) {
  //   targetBottomSheet.prepend(draggableArea);
  // }

  isWeb = windowResizeListener(
    targetBottomSheet,
    draggableArea,
    minWidthForWeb,
    draggableId,
    modalClose,
    snapPoints,
    displayOverlay,
    onOpen,
    content,
    init,
    isWeb,
    webLayout,
    sideSheetLeft,
    sideSheetRight,
    cleanUpOnClose,
    overlay,
    sideSheetSnapPoints
  );
  setTimeout(() => {
    onOpen();
  }, 10);
  if (
    lastSetSnapPoint &&
    lastSetSnapPoint < window.innerHeight &&
    window.innerWidth < minWidthForWeb
  ) {
    closeBottomSheet(
      targetBottomSheet,
      displayOverlay,
      cleanUpOnClose,
      hideOverlay,
      overlay
    );
  } else {
    openBottomSheet(
      targetBottomSheet,
      snapPoints,
      overlay,
      displayOverlay,
      onOpen,
      content,
      init,
      minWidthForWeb,
      draggableArea,
      isWeb,
      webLayout
    );
  }
  // openBottomSheet(
  //   targetBottomSheet,
  //   snapPoints,
  //   // overlay,
  //   displayOverlay,
  //   onOpen,
  //   content,
  //   init,
  //   minWidthForWeb,
  //   draggableArea,
  //   isWeb,
  //   webLayout
  // );

  targetBottomSheet.style.overflow = "scroll";

  setTimeout(() => {
    handleDragGesture(
      targetBottomSheet,
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      targetBottomSheet,
      minWidthForWeb,
      displayOverlay,
      draggableId,
      overlay
    );
  }, 10);

  targetBottomSheet.style.overflow = "scroll";

  if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
    document.querySelector(
      `.bottomsheet #${targetBottomSheet.id}`
    ).style.display = "block";
  }
}
function windowResizeListener(
  targetBottomSheet,
  draggableArea,
  minWidthForWeb,
  draggableId,
  modalClose,
  snapPoints,
  displayOverlay,
  onOpen,
  content,
  init,
  isWeb,
  webLayout,
  sideSheetLeft,
  sideSheetRight,
  cleanUpOnClose,
  overlay,
  sideSheetSnapPoints
) {
  window.addEventListener("resize", () => {
    handleCloseIcons(
      targetBottomSheet,
      webLayout,
      modalClose,
      sideSheetLeft,
      sideSheetRight,
      isWeb,
      minWidthForWeb,
      draggableArea,
      draggableId,
      cleanUpOnClose,
      overlay,
      sideSheetSnapPoints
    );
    if (window.innerWidth < minWidthForWeb) isWeb = false;
    else isWeb = true;
    // openBottomSheet(
    //   targetBottomSheet,
    //   snapPoints,
    //   // overlay,
    //   displayOverlay,
    //   onOpen,
    //   content,
    //   init,
    //   minWidthForWeb,
    //   draggableArea,
    //   isWeb,
    //   webLayout
    // );
    return isWeb;
  });
  return isWeb;
}
function moveBottomSheet(targetBottomSheet, top, ease, duration) {
  anime({
    targets: targetBottomSheet,
    top: top,
    easing: ease,
    duration,
  });
}
let lastSetSnapPoint;

function openBottomSheet(
  targetBottomSheet,
  snapPoints,
  overlay,
  displayOverlay,
  onOpen,
  content,
  init,
  minWidthForWeb,
  draggableArea,
  isWeb,
  webLayout
) {
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
          easing: "spring(1, 85, 45, 3)",
          duration: 0,
        });
      }, 100);
    } else if (webLayout === "sideSheetRight") {
      targetBottomSheet.style.top = 0;
      targetBottomSheet.style.right = `-100%`;
      setTimeout(() => {
        anime({
          targets: targetBottomSheet,
          right: "0",
          easing: "spring(1, 85, 45, 3)",
          duration: 0,
        });
      }, 100);
    } else {
      targetBottomSheet.style.top = "50%";
      targetBottomSheet.style.opacity = 0;
      targetBottomSheet.style.transform = "translate(-50%,-50%) scale(0.9)";
      anime({
        targets: targetBottomSheet,
        opacity: 1,
        scale: 1,
        easing: "spring(1, 85, 45, 2)",
        duration: 1,
      });
    }
  } else {
    targetBottomSheet.style.top = convertToPx(100);

    anime({
      targets: targetBottomSheet,
      top: `${convertToPx(100)}px`,
      easing: "linear",
      duration: 0,
    });
    setTimeout(() => {
      anime({
        targets: targetBottomSheet,
        top: `${
          window.innerHeight - convertToPx(snapPoints[0].replace("%", ""))
        }px`,
        easing: "spring(1, 85, 45, 3)",
        opacity: 1,
        duration: 0,
      });
    }, 10);
  }
  lastSetSnapPoint =
    window.innerHeight - convertToPx(snapPoints[0].replace("%", ""));
}

function closeBottomSheet(
  targetBottomSheet,
  displayOverlay,
  cleanUpOnClose,
  hideOverlay,
  overlay,
  isWeb,
  webLayout
) {
  displayOverlay ? hideOverlay(overlay) : "";
  document.body.style.overflow = "scroll";

  if (!isWeb) {
    anime({
      targets: targetBottomSheet,
      top: `${convertToPx(100)}px`,
      easing: "spring(1, 85, 45, 3)",
    });
  } else {
    if (webLayout === "Modal") {
      closeModal(
        targetBottomSheet,
        cleanUpOnClose,
        overlay
        // sideSheetSnapPoints
      );
    }
  }

  lastSetSnapPoint = convertToPx(100);
  setTimeout(() => {
    if (lastSetSnapPoint >= window.innerHeight && cleanUpOnClose) {
      cleanUp(targetBottomSheet, overlay);
    }
  }, 500);
}

function addOverlay(overlay) {
  overlay.classList.add("display");
}

function hideOverlay(overlay) {
  if (overlay?.classList?.contains("display")) {
    overlay.classList.remove("display");
  }
  if (overlay) overlay.remove();
}

function getCurrentSnapPoint(newBottomSheet) {
  return newBottomSheet?.style?.top.replace("%", "").replace("px", "");
}

function handleDragGesture(
  draggableTarget,
  currentSnapPoint,
  lastSnapPoint,
  snapPoints,
  newBottomSheet,
  minWidthForWeb,
  displayOverlay,
  draggableId,
  overlay
) {
  const gesture = new Gesture(
    draggableTarget,
    {
      onDrag: ({
        active,
        movement: [mx, my],
        velocity: [vx, vy],
        xy,
        offset,
        distance: [dx, dy],
        target,
      }) => {
        let minSnapPoint = 0;
        let maxSnapPoint = Infinity;
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (window.innerWidth < minWidthForWeb) {
          if (my > 0) {
            let type;
            if (
              draggableId &&
              target === document.querySelector(`#${draggableId}`)
            ) {
              // document.querySelector(`#${draggableId}`).focus();
              // document.querySelector(`#${draggableId}`).click();
              newBottomSheet.style.overflow = "hidden";
              newBottomSheet.style.touchAction = "none";

              let newOffset = offset[1];
              handleSnapPoints(
                snapPoints,
                newBottomSheet,
                currentSnapPoint,
                minSnapPoint,
                null,
                active,
                lastSnapPoint,
                type,
                my,
                vy,
                xy,
                offset,
                dy,
                draggableTarget,
                newOffset,
                overlay
              );
              if (lastSetSnapPoint >= window.innerHeight) hideOverlay(overlay);
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

                let newOffset = offset[1];
                handleSnapPoints(
                  snapPoints,
                  newBottomSheet,
                  currentSnapPoint,
                  minSnapPoint,
                  null,
                  active,
                  lastSnapPoint,
                  type,
                  my,
                  vy,
                  xy,
                  offset,
                  dy,
                  draggableTarget,
                  newOffset,
                  overlay
                );
                if (lastSetSnapPoint >= window.innerHeight)
                  hideOverlay(overlay);
              }
            }
          } else {
            let type;
            // document.querySelector(
            //   `#${newBottomSheet.id} #${targetBottomSheet.id}`
            // ).style.overflow = "hidden";
            if (currentSnapPoint <= convertToPx(100 - lastSnapPoint)) {
              newBottomSheet.style.overflow = "scroll";
              newBottomSheet.style.height = `${convertToPx(
                lastSnapPoint - 10
              )}px`;
              newBottomSheet.style.touchAction = "auto";
              newBottomSheet.click();
            } else {
              newBottomSheet.style.overflow = "hidden";
              newBottomSheet.style.touchAction = "none";

              let newOffset = offset[1];

              handleSnapPoints(
                snapPoints,
                newBottomSheet,
                currentSnapPoint,
                null,
                maxSnapPoint,
                active,
                lastSnapPoint,
                type,
                my,
                vy,
                xy,
                offset,
                dy,
                draggableTarget,
                newOffset,
                overlay
              );
            }
            // addOverlay(overlay);
          }
        }
      },
      onDragStart: () => {
        document.body.style.overflow = "hidden";
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        // if (+lastSetSnapPoint >= -10 && displayOverlay) hideOverlay(overlay);
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (
          (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
            lastSetSnapPoint === 0) &&
          my < 0
        ) {
          newBottomSheet.style.overflow = "scroll";
          newBottomSheet.click();
          newBottomSheet.style.touchAction = "auto";
        }
        // if (
        //   (currentSnapPoint <= convertToPx(100 - lastSnapPoint) ||
        //     lastSetSnapPoint === 0) &&
        //   my > 0 &&
        //   newBottomSheet.offsetTop === 0
        // ) {
        //   newBottomSheet.style.overflow = "hidden";
        //   newBottomSheet.style.touchAction = "none";

        //   newBottomSheet.click();
        // }
        dragFlag++;
      },
    },
    {
      drag: {
        filterTaps: false,
        rubberband: true,
        axis: "y",
        preventDefault: false,
      },
    }
  );
}
let oldOffset;
let snapped = false;
let dragFlag = 0;

function handleSnapPoints(
  snapPoints,
  newBottomSheet,
  currentSnapPoint,
  minSnapPoint,
  maxSnapPoint,
  active,
  lastSnapPoint,
  type,
  my,
  vy,
  xy,
  offset,
  dy,
  draggableTarget,
  newOffset,
  overlay
) {
  let convertXy = ((window.screen.height - xy[1]) / window.screen.height) * 100;

  let actualOffset =
    dragFlag === 0 ? convertToPx(snapPoints[0].replace("%", "")) : offset[1];

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
        `spring(1, 250, 25, ${dragFlag === 0 ? 0.3 : 25})`,
        1
      );
      snapped = false;
    }
    if (!active) {
      translateToPreviousSnapPoint(
        snapPoints,
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
        overlay
      ) !== undefined
        ? (offset[1] = translateToPreviousSnapPoint(
            snapPoints,
            actualOffset > window.innerHeight
              ? window.innerHeight
              : actualOffset < convertToPx(100 - lastSnapPoint)
              ? convertToPx(100 - lastSnapPoint)
              : actualOffset,
            newBottomSheet,
            vy,
            lastSnapPoint,
            false,
            overlay
          ))
        : "";
      snapped = true;
      oldOffset = offset[1];
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
        `spring(1, 250, 25,  ${dragFlag === 0 ? 0.3 : 25})`,
        1
      );
      snapped = false;
    }

    if (!active) {
      translateToNextSnapPoint(
        snapPoints,
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
        overlay
      ) !== undefined
        ? (offset[1] = translateToNextSnapPoint(
            snapPoints,
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
            overlay
          ))
        : "";
      snapped = true;
      oldOffset = offset[1];
    }
  }
}

function translateToNextSnapPoint(
  snapPoints,
  convertXy,
  newBottomSheet,
  vy,
  lastSnapPoint,
  dy,
  snappable,
  overlay
) {
  let maxSnapPoint = Infinity;
  snapPoints.forEach((element) => {
    let elem =
      typeof element === "number" ? element : +element.replace("%", "");

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
        `spring(1, 250, 15, ${vy})`,
        1
      );
      lastSetSnapPoint = window.innerHeight - maxSnapPoint;
      return lastSetSnapPoint;
    } else {
      if (vy > 0.9 || dy > 150) {
        moveBottomSheet(
          newBottomSheet,
          `${window.innerHeight - maxSnapPoint}px`,
          `spring(1, 250, 15, ${vy})`
        );
        lastSetSnapPoint = window.innerHeight - maxSnapPoint;
        return lastSetSnapPoint;
      } else {
        return translateToPreviousSnapPoint(
          snapPoints,
          convertXy,
          newBottomSheet,
          vy,
          lastSnapPoint,
          dy,
          true,
          overlay
        );
      }
    }
  }
}
function translateToPreviousSnapPoint(
  snapPoints,
  convertXy,
  newBottomSheet,
  vy,
  lastSnapPoint,
  dy,
  snappable,
  overlay
) {
  let minSnapPoint = 0;
  snapPoints.forEach((element) => {
    let elem =
      typeof element === "number" ? element : +element.replace("%", "");

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
      `${window.innerHeight - minSnapPoint}px`,
      `spring(1, 250, 15, ${vy})`
    );
    lastSetSnapPoint = window.innerHeight - minSnapPoint;
    if (lastSetSnapPoint >= window.innerHeight) hideOverlay(overlay);
    return lastSetSnapPoint;
  } else {
    if (vy > 0.9 || dy > 150) {
      moveBottomSheet(
        newBottomSheet,
        `${window.innerHeight - minSnapPoint}px`,
        `spring(1, 250, 15, ${vy})`
      );
      lastSetSnapPoint = window.innerHeight - minSnapPoint;
      if (lastSetSnapPoint >= window.innerHeight) hideOverlay(overlay);

      return lastSetSnapPoint;
    } else {
      return translateToNextSnapPoint(
        snapPoints,
        convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint,
        dy,
        true,
        overlay
      );
    }
  }
}
function handleCloseIcons(
  targetBottomSheet,
  webLayout,
  modalClose,
  sideSheetLeft,
  sideSheetRight,
  isWeb,
  minWidthForWeb,
  draggableArea,
  draggableId,
  cleanUpOnClose,
  overlay,
  sideSheetSnapPoints
) {
  if (isWeb) {
    if (
      draggableArea &&
      document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)
    ) {
      targetBottomSheet.removeChild(draggableArea);
    }
    if (webLayout === "Modal") {
      targetBottomSheet.classList.add("modal");
    } else {
      targetBottomSheet.classList.add("side-sheet");
    }
    targetBottomSheet.classList.remove("bottomsheet");
    if (
      !document.querySelector(`#${targetBottomSheet.id} #modal-close`) &&
      webLayout === "Modal"
    ) {
      targetBottomSheet.prepend(modalClose);
    } else if (
      !document.querySelector(`#${targetBottomSheet.id} #side-left`) &&
      webLayout === "sideSheetLeft"
    ) {
      targetBottomSheet.prepend(sideSheetLeft);
      closeLeftSideSheet(
        targetBottomSheet,
        cleanUpOnClose,
        overlay
        // sideSheetSnapPoints
      );
    } else if (
      !document.querySelector(`#${targetBottomSheet.id} #side-right`) &&
      webLayout === "sideSheetRight"
    ) {
      targetBottomSheet.prepend(sideSheetRight);
      closeRightSideSheet(
        targetBottomSheet,
        cleanUpOnClose,
        overlay,
        sideSheetSnapPoints
      );
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
function closeLeftSideSheet(
  targetBottomSheet,
  cleanUpOnClose,
  overlay,
  sideSheetSnapPoints
) {
  if (
    convertToPercentage(targetBottomSheet.clientWidth) >= 0 &&
    convertToPercentage(targetBottomSheet.clientWidth) <
      +sideSheetSnapPoints[sideSheetSnapPoints.length - 1].replace("%", "")
  ) {
    let max = Infinity;
    sideSheetSnapPoints.map((i) => {
      if (
        +i.replace("%", "") >
          convertToPercentage(targetBottomSheet.clientWidth) &&
        +i.replace("%", "") < max
      ) {
        max = +i.replace("%", "");
      }
      anime({
        targets: targetBottomSheet,
        width: `${max}%`,
        easing: "spring(1, 85, 45, 3)",
        duration: 0,
      });
    });
  } else {
    let min = 0;
    sideSheetSnapPoints.map((i) => {
      if (
        +i.replace("%", "") <
          convertToPercentage(targetBottomSheet.clientWidth) &&
        +i.replace("%", "") > min
      ) {
        min = +i.replace("%", "");
      }
      anime({
        targets: targetBottomSheet,
        width: `${min}%`,
        easing: "spring(1, 85, 45, 3)",
        duration: 0,
      });
    });
  }

  // cleanUpOnClose
  //   ? setTimeout(() => {
  //       cleanUp(targetBottomSheet, overlay);
  //     }, 500)
  //   : "";
}
function closeRightSideSheet(
  targetBottomSheet,
  cleanUpOnClose,
  overlay,
  sideSheetSnapPoints
) {
  if (
    convertToPercentage(targetBottomSheet.clientWidth) >= 0 &&
    convertToPercentage(targetBottomSheet.clientWidth) <
      +sideSheetSnapPoints[sideSheetSnapPoints.length - 1].replace("%", "")
  ) {
    let max = Infinity;
    sideSheetSnapPoints.map((i) => {
      if (
        +i.replace("%", "") >
          convertToPercentage(targetBottomSheet.clientWidth) &&
        +i.replace("%", "") < max
      ) {
        max = +i.replace("%", "");
      }
      anime({
        targets: targetBottomSheet,
        width: `${max}%`,
        easing: "spring(1, 85, 45, 3)",
        duration: 0,
      });
    });
  } else {
    let min = 0;
    sideSheetSnapPoints.map((i) => {
      if (
        +i.replace("%", "") <
          convertToPercentage(targetBottomSheet.clientWidth) &&
        +i.replace("%", "") > min
      ) {
        min = +i.replace("%", "");
      }
      anime({
        targets: targetBottomSheet,
        width: `${min}%`,
        easing: "spring(1, 85, 45, 3)",
        duration: 0,
      });
    });
  }
}
function closeModal(
  targetBottomSheet,
  cleanUpOnClose,
  overlay
  // sideSheetSnapPoints
) {
  anime({
    targets: targetBottomSheet,
    opacity: 0,
    scale: 0.9,
    easing: "spring(1, 85, 45, 2)",
    duration: 0,
  });
  cleanUpOnClose
    ? setTimeout(() => {
        cleanUp(targetBottomSheet, overlay);
      }, 500)
    : "";
}
function convertToPx(percentage) {
  return Math.round((window.innerHeight * percentage) / 100);
}
function convertToPercentage(px) {
  return Math.round((px / window.innerWidth) * 100);
}
function cleanUp(targetBottomSheet, overlay) {
  targetBottomSheet.remove();
  targetBottomSheet.innerHTML = "";
  hideOverlay(overlay);
}

export async function replaceInnerContent(bottomsheetID, content) {
  content = typeof content !== "string" ? await content : content;
  let draggableItem;
  if (content && bottomsheetID && document.getElementById(`${bottomsheetID}`)) {
    // if (
    //   document.getElementById(`${bottomsheetID}`) &&
    //   document.getElementById(`${bottomsheetID}`)?.childNodes &&
    //   document.getElementById(`${bottomsheetID}`)?.childNodes[0] &&
    //   document
    //     .getElementById(`${bottomsheetID}`)
    //     ?.childNodes[0]?.getAttribute("data-draggable")
    // ) {
    draggableItem = document.getElementById(`${bottomsheetID}`).children[0];

    // }
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
    // document.getElementById(`${bottomsheetID}`).innerHTML = content;
  }
}
export default BottomSheet;
