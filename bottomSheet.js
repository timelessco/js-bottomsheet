import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

function BottomSheet(targetid, props) {
  let {
    snapPoints,
    isDisplayOverlay = true,
    minWidthForModal = 500,
    draggableArea = ``,
  } = props;
  let targetBottomSheet = document.querySelector(`#${targetid}`);
  let newBottomSheet = document.querySelector(
    `#bottomsheet-${targetBottomSheet.id}`
  );
  const overlay = document.querySelector(".overlay")
    ? document.querySelector(".overlay")
    : document.createElement("div");

  let currentSnapPoint = getCurrentSnapPoint(newBottomSheet);

  targetBottomSheet.style.display = "hidden";
  if (isDisplayOverlay) {
    overlay.classList.add("overlay");
    displayOverlay(overlay);
  }

  document.body.appendChild(overlay);

  // document.body.addEventListener("click", (e) => {
  //   closeBottomSheet(newBottomSheet, overlay, isDisplayOverlay);
  // });

  // newBottomSheet?.addEventListener("click", (e) => {
  //   console.log("click");
  //   e.preventDefault();
  // });

  // document.querySelectorAll("button").forEach((i) => {
  //  i.
  // });
  if (targetBottomSheet)
    if (!newBottomSheet)
      createBottomSheet(
        targetBottomSheet,
        snapPoints,
        overlay,
        isDisplayOverlay,
        minWidthForModal,
        draggableArea
      );
    else
      lastSetSnapPoint < window.innerHeight
        ? closeBottomSheet(newBottomSheet, overlay, isDisplayOverlay)
        : openBottomSheet(
            newBottomSheet,
            snapPoints,
            overlay,
            isDisplayOverlay
          );
}

function createBottomSheet(
  targetBottomSheet,
  snapPoints,
  overlay,
  isDisplayOverlay,
  minWidthForModal,
  draggableArea
) {
  const newBottomSheet = document.createElement("div");
  let currentSnapPoint = getCurrentSnapPoint(newBottomSheet);

  let lastSnapPoint = +snapPoints[snapPoints.length - 1].replace("%", "");
  newBottomSheet.id = `bottomsheet-${targetBottomSheet.id}`;
  window.addEventListener("resize", () => {
    window.innerWidth < minWidthForModal
      ? (newBottomSheet.classList.add("bottomsheet"),
        newBottomSheet.classList.remove("modal"))
      : (newBottomSheet.classList.add("modal"),
        newBottomSheet.classList.remove("bottomsheet"));
  });
  window.innerWidth < minWidthForModal
    ? (newBottomSheet.classList.add("bottomsheet"),
      newBottomSheet.classList.remove("modal"))
    : (newBottomSheet.classList.add("modal"),
      newBottomSheet.classList.remove("bottomsheet"));

  newBottomSheet.insertAdjacentHTML("beforeend", draggableArea);

  openBottomSheet(newBottomSheet, snapPoints, overlay, isDisplayOverlay);

  newBottomSheet.style.overflow = "scroll";

  setTimeout(() => {
    document.querySelector(
      `#${newBottomSheet.id} #${targetBottomSheet.id}`
    ).style.marginTop = `${
      document.querySelector("#draggable-area")?.clientHeight
    }px`;
    let innerScrollableContent = document.querySelector(
      `#${newBottomSheet.id} #${targetBottomSheet.id}`
    );
    // document.body.addEventListener("click", (e) => {
    //   if (e.target.tagName.toLowerCase() === "input") {
    //     moveBottomSheet(newBottomSheet, "-100%", `spring(1, 85, 15, 3)`);
    //     e.preventDefault();
    //   } else {
    //   }
    // });
    handleDragGesture(
      newBottomSheet,
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      newBottomSheet,
      targetBottomSheet,
      minWidthForModal,
      overlay,
      isDisplayOverlay
    );

    // handleDragGesture(
    //   document.querySelector(`#draggable-area`),
    //   currentSnapPoint,
    //   lastSnapPoint,
    //   snapPoints,
    //   newBottomSheet,
    //   targetBottomSheet,
    //   minWidthForModal,
    //   overlay,
    //   isDisplayOverlay
    // );
  }, 10);

  newBottomSheet.style.overflow = "scroll";

  if (targetBottomSheet && targetBottomSheet.cloneNode(true))
    newBottomSheet.appendChild(targetBottomSheet.cloneNode(true));
  document.body.appendChild(newBottomSheet);
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
  isDisplayOverlay
) {
  document.body.style.overflow = "hidden";

  isDisplayOverlay ? displayOverlay(overlay) : "";
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

  lastSetSnapPoint =
    window.innerHeight - convertToPx(snapPoints[0].replace("%", ""));
}

function closeBottomSheet(targetBottomSheet, overlay, isDisplayOverlay) {
  isDisplayOverlay ? hideOverlay(overlay) : "";
  // document.body.style.overflow = "scroll";
  anime({
    targets: targetBottomSheet,
    top: `${convertToPx(100)}px`,
    easing: "spring(1, 85, 45, 3)",
  });
  lastSetSnapPoint = convertToPx(100);
}

function displayOverlay(overlay) {
  overlay.classList.add("display");
}

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
  targetBottomSheet,
  minWidthForModal,
  overlay,
  isDisplayOverlay
) {
  const gesture = new Gesture(
    draggableTarget,
    {
      onDrag: ({
        active,
        movement: [mx, my],
        cancel,
        velocity: [vx, vy],
        xy,
        offset,
        distance: [dx, dy],
        target,
      }) => {
        let minSnapPoint = 0;
        let maxSnapPoint = Infinity;
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        let innerScrollableContent = document.querySelector(
          `#${newBottomSheet.id} #${targetBottomSheet.id}`
        );
        if (window.innerWidth < minWidthForModal) {
          if (my > 0) {
            let type;
            if (target === document.querySelector(`#draggable-area`)) {
              document.querySelector(`#draggable-area`).focus();
              document.querySelector(`#draggable-area`).click();
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";
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
              if (currentSnapPoint <= 10 && isDisplayOverlay)
                hideOverlay(overlay);
            } else {
              if (
                innerScrollableContent.scrollTop >= 1 &&
                currentSnapPoint <= 100 &&
                target !== document.querySelector(`#draggable-area`)
              ) {
                innerScrollableContent.style.overflow = "scroll";
                // innerScrollableContent.click();
              } else {
                newBottomSheet.style.overflow = "hidden";
                innerScrollableContent.style.overflow = "hidden";
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
                if (currentSnapPoint <= 10 && isDisplayOverlay)
                  hideOverlay(overlay);
              }
            }
          } else {
            let type;
            newBottomSheet.style.overflow = "hidden";
            document.querySelector(
              `#${newBottomSheet.id} #${targetBottomSheet.id}`
            ).style.overflow = "hidden";

            if (currentSnapPoint <= 10) {
              innerScrollableContent.style.overflow = "scroll";
              innerScrollableContent.style.height = `${lastSnapPoint - 10}%`;
              // innerScrollableContent.click();
            } else {
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";
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
            displayOverlay(overlay);
          }
        }
      },
      onDragStart: () => {
        document.body.style.overflow = "hidden";
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        let innerScrollableContent = document.querySelector(
          `#${newBottomSheet.id} #${targetBottomSheet.id}`
        );
        // currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (+lastSetSnapPoint >= -10 && isDisplayOverlay) hideOverlay(overlay);
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);

        if ((currentSnapPoint <= 100 || lastSetSnapPoint === 0) && my < 0) {
          innerScrollableContent.style.overflow = "scroll";
          innerScrollableContent.click();
        }
        if (
          (currentSnapPoint <= 100 || lastSetSnapPoint === 0) &&
          my > 0 &&
          innerScrollableContent.offsetTop === 0
        ) {
          innerScrollableContent.style.overflow = "hidden";
          innerScrollableContent.click();
        }
        dragFlag++;
      },
    },
    {
      drag: {
        filterTaps: true,
        rubberband: true,
        axis: "y",
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

  // if (dragFlag === 0) {
  //   offset[1] = 650;
  // }
  let actualOffset = snapped ? oldOffset : offset[1];

  if (maxSnapPoint === null) {
    if (active) {
      moveBottomSheet(
        newBottomSheet,
        `${
          actualOffset > window.innerHeight
            ? window.innerHeight
            : actualOffset < 0
            ? 0
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
        actualOffset > window.innerHeight ? window.innerHeight : actualOffset,
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
              : actualOffset,
            newBottomSheet,
            vy,
            lastSnapPoint,
            false
          ))
        : "";
      snapped = true;
    }
  } else {
    if (active) {
      moveBottomSheet(
        newBottomSheet,
        `${actualOffset < 0 ? 0 : actualOffset}px`,
        `spring(1, 250, 25,  ${dragFlag === 0 ? 0.3 : 25})`,
        1
      );
      snapped = false;
    }

    if (!active) {
      translateToNextSnapPoint(
        snapPoints,
        actualOffset < 0 ? 0 : actualOffset,
        newBottomSheet,
        vy,
        lastSnapPoint,
        dy,
        false
      ) !== undefined
        ? (offset[1] = translateToNextSnapPoint(
            snapPoints,
            actualOffset < 0 ? 0 : actualOffset,
            newBottomSheet,
            vy,
            lastSnapPoint,
            dy,
            false
          ))
        : "";
      snapped = true;
    }

    // } else {
    //   translateToNextSnapPoint(
    //     snapPoints,
    //     convertXy,
    //     newBottomSheet,
    //     vy,
    //     false
    //   );
    // }
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
  // if (minSnapPoint !== 0) {
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

// export default BottomSheet;
