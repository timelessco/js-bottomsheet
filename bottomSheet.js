import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

function BottomSheet(props) {
  let {
    snapPoints = ["100%"],
    isDisplayOverlay = false,
    minWidthForWeb = 500,
    draggableArea = ``,
    onOpen = () => {},
    trigger = "",
    content = "",
    init = () => {},
    webLayout = "Modal",
    modalCloseIcon = `<svg width="14" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
  } = props;
  if (trigger && document.querySelector(`#${trigger}`)) {
    document.querySelector(`#${trigger}`).addEventListener("click", () => {
      bottomsheetRequirements(
        trigger,
        content,
        isDisplayOverlay,
        init,
        snapPoints,
        minWidthForWeb,
        draggableArea,
        onOpen,
        modalCloseIcon,
        webLayout
      );
    });
  }
}
function bottomsheetRequirements(
  trigger,
  content,
  isDisplayOverlay,
  init,
  snapPoints,
  minWidthForWeb,
  draggableArea,
  onOpen,
  modalCloseIcon,
  webLayout
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
  // const overlay = document.querySelector(".overlay")
  //   ? document.querySelector(".overlay")
  //   : document.createElement("div");

  // if (isDisplayOverlay) {
  //   overlay.classList.add("overlay");
  //   displayOverlay(overlay);
  // }
  // document.body.appendChild(overlay);
  let isModal = window.innerWidth < minWidthForWeb ? false : true;

  if (targetBottomSheet) {
    createBottomSheet(
      targetBottomSheet,
      snapPoints,
      // overlay,
      isDisplayOverlay,
      minWidthForWeb,
      draggableArea,
      onOpen,
      content,
      init,
      modalCloseIcon,
      webLayout
    );
    // lastSetSnapPoint < window.innerHeight
    //   ? closeBottomSheet(newBottomSheet, isDisplayOverlay)
    //   :
    lastSetSnapPoint > window.innerHeight
      ? openBottomSheet(
          targetBottomSheet,
          snapPoints,
          // overlay,
          isDisplayOverlay,
          onOpen,
          content,
          init,
          minWidthForWeb,
          draggableArea,
          isModal
        )
      : "";
  }
}
function createBottomSheet(
  targetBottomSheet,
  snapPoints,
  // overlay,
  isDisplayOverlay,
  minWidthForWeb,
  draggableArea,
  onOpen,
  content,
  init,
  modalCloseIcon,
  webLayout
) {
  // const newBottomSheet = document.createElement("div");
  targetBottomSheet.style.display = "block";
  let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);

  let lastSnapPoint = +snapPoints[snapPoints.length - 1].replace("%", "");
  let isModal = window.innerWidth < minWidthForWeb ? false : true;

  let modalClose = document.createElement("div");
  modalClose.id = "modal-close";
  modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
  if (
    document.querySelector(`#${targetBottomSheet.id} #modal-close`) &&
    !isModal
  ) {
    targetBottomSheet.removeChild(modalClose);
  }
  if (
    !document.querySelector(`#${targetBottomSheet.id} #modal-close`) &&
    isModal
  ) {
    targetBottomSheet.prepend(modalClose);
  }
  if (window.innerWidth < minWidthForWeb) {
    targetBottomSheet.classList.add("bottomsheet"),
      targetBottomSheet.classList.remove("modal");
  } else {
    if (webLayout === "Modal") {
      targetBottomSheet.classList.add("modal");
    } else {
      targetBottomSheet.classList.add("side-sheet");
    }
    targetBottomSheet.classList.remove("bottomsheet");
  }

  let draggableId = "";

  if (typeof draggableArea === "string") {
    draggableArea = new DOMParser().parseFromString(draggableArea, "text/xml");
    draggableId = draggableArea.childNodes[0].id;
    draggableArea = draggableArea.childNodes[0];
  } else {
    draggableId = draggableArea?.id;
  }
  if (
    !document.querySelector(`#${targetBottomSheet.id} #${draggableId}`) &&
    window.innerWidth < minWidthForWeb
  ) {
    targetBottomSheet.prepend(draggableArea);
  }

  isModal = windowResizeListener(
    targetBottomSheet,
    draggableArea,
    minWidthForWeb,
    draggableId,
    modalCloseIcon,
    snapPoints,
    isDisplayOverlay,
    onOpen,
    content,
    init,
    isModal
  );

  openBottomSheet(
    targetBottomSheet,
    snapPoints,
    // overlay,
    isDisplayOverlay,
    onOpen,
    content,
    init,
    minWidthForWeb,
    draggableArea,
    isModal
  );

  targetBottomSheet.style.overflow = "scroll";

  setTimeout(() => {
    handleDragGesture(
      targetBottomSheet,
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      targetBottomSheet,
      minWidthForWeb,
      // overlay,
      isDisplayOverlay,
      draggableId
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
  modalCloseIcon,
  snapPoints,
  isDisplayOverlay,
  onOpen,
  content,
  init,
  isModal
) {
  let modalClose = document.createElement("div");
  modalClose.id = "modal-close";
  modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);

  window.addEventListener("resize", () => {
    if (window.innerWidth < minWidthForWeb) {
      targetBottomSheet.classList.add("bottomsheet");
      targetBottomSheet.classList.remove("modal");
      if (!document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)) {
        targetBottomSheet.prepend(draggableArea);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #modal-close`)) {
        targetBottomSheet.removeChild(modalClose);
      }
      return false;
    } else {
      targetBottomSheet.classList.add("modal"),
        targetBottomSheet.classList.remove("bottomsheet");
      if (document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)) {
        targetBottomSheet.removeChild(draggableArea);
      }
      if (!document.querySelector(`#${targetBottomSheet.id} #modal-close`)) {
        targetBottomSheet.prepend(modalClose);
      }
      openBottomSheet(
        targetBottomSheet,
        snapPoints,
        // overlay,
        isDisplayOverlay,
        onOpen,
        content,
        init,
        minWidthForWeb,
        draggableArea,
        isModal
      );
      return true;
    }
  });
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
  // overlay,
  isDisplayOverlay,
  onOpen,
  content,
  init,
  minWidthForWeb,
  draggableArea,
  isModal
) {
  document.body.style.overflow = "hidden";

  // isDisplayOverlay ? displayOverlay(overlay) : "";
  targetBottomSheet.style.top = convertToPx(100);
  if (!isModal) {
    anime({
      targets: targetBottomSheet,
      top: `${convertToPx(100)}px`,
      easing: "linear",
      duration: 0,
    });
  }
  setTimeout(() => {
    anime({
      targets: targetBottomSheet,
      top: isModal
        ? "50%"
        : `${
            window.innerHeight - convertToPx(snapPoints[0].replace("%", ""))
          }px`,
      easing: "spring(1, 85, 45, 3)",
      opacity: 1,
      duration: 0,
    });
  }, 10);

  lastSetSnapPoint =
    window.innerHeight - convertToPx(snapPoints[0].replace("%", ""));
  setTimeout(() => {
    onOpen();
  }, 10);
}

function closeBottomSheet(targetBottomSheet, isDisplayOverlay) {
  // isDisplayOverlay ? hideOverlay(overlay) : "";
  document.body.style.overflow = "scroll";
  anime({
    targets: targetBottomSheet,
    top: `${convertToPx(100)}px`,
    easing: "spring(1, 85, 45, 3)",
  });
  lastSetSnapPoint = convertToPx(100);
}

// function displayOverlay(overlay) {
//   overlay.classList.add("display");
// }

function hideOverlay(overlay) {
  if (overlay.classList.contains("display")) {
    overlay.classList.remove("display");
  }
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
  isDisplayOverlay,
  draggableId
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
            if (target === document.querySelector(`#${draggableId}`)) {
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
                newOffset
              );
              // if (currentSnapPoint <= 10 && isDisplayOverlay)
              //   hideOverlay(overlay);
            } else {
              if (
                newBottomSheet.scrollTop >= 1 &&
                currentSnapPoint <= convertToPx(100 - lastSnapPoint) &&
                target !== document.querySelector(`#${draggableId}`)
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
                  newOffset
                );
                // if (currentSnapPoint <= 10 && isDisplayOverlay)
                //   hideOverlay(overlay);
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
                newOffset
              );
            }
            // displayOverlay(overlay);
          }
        }
      },
      onDragStart: () => {
        document.body.style.overflow = "hidden";
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        // if (+lastSetSnapPoint >= -10 && isDisplayOverlay) hideOverlay(overlay);
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
  newOffset
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
        false
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
            false
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
        false
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
            false
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
  snappable
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
          true
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
  snappable
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
    return lastSetSnapPoint;
  } else {
    if (vy > 0.9 || dy > 150) {
      moveBottomSheet(
        newBottomSheet,
        `${window.innerHeight - minSnapPoint}px`,
        `spring(1, 250, 15, ${vy})`
      );
      lastSetSnapPoint = window.innerHeight - minSnapPoint;
      return lastSetSnapPoint;
    } else {
      return translateToNextSnapPoint(
        snapPoints,
        convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint,
        dy,
        true
      );
    }
  }
}

function convertToPx(percentage) {
  return Math.round((window.innerHeight * percentage) / 100);
}
export default BottomSheet;
