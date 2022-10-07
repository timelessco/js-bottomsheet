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
      +currentSnapPoint < 0
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
      innerScrollableContent,
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      newBottomSheet,
      targetBottomSheet,
      minWidthForModal,
      overlay,
      isDisplayOverlay
    );

    handleDragGesture(
      document.querySelector(`#draggable-area`),
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      newBottomSheet,
      targetBottomSheet,
      minWidthForModal,
      overlay,
      isDisplayOverlay
    );
  }, 10);

  newBottomSheet.style.overflow = "scroll";

  if (targetBottomSheet && targetBottomSheet.cloneNode(true))
    newBottomSheet.appendChild(targetBottomSheet.cloneNode(true));
  document.body.appendChild(newBottomSheet);
}
function moveBottomSheet(targetBottomSheet, translateY, ease, duration) {
  anime({
    targets: targetBottomSheet,
    translateY: translateY,
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
  anime({
    targets: targetBottomSheet,
    translateY: `-${snapPoints[0]}`,
    easing: "spring(1, 85, 45, 3)",
    duration: 0,
  });
  lastSetSnapPoint = snapPoints[0].replace("%", "");
}

function closeBottomSheet(targetBottomSheet, overlay, isDisplayOverlay) {
  isDisplayOverlay ? hideOverlay(overlay) : "";
  // document.body.style.overflow = "scroll";
  anime({
    targets: targetBottomSheet,
    translateY: `10%`,
    easing: "spring(1, 85, 45, 3)",
  });
  lastSetSnapPoint = "10%";
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
  return newBottomSheet?.style?.transform
    .slice(11)
    .replace("%)", "")
    .replace("px)", "");
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
      }) => {
        let minSnapPoint = 0;
        let maxSnapPoint = Infinity;
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        let innerScrollableContent = document.querySelector(
          `#${newBottomSheet.id} #${targetBottomSheet.id}`
        );

        if (window.innerWidth < minWidthForModal) {
          // if(active){

          // }
          if (my > 0) {
            let type;

            if (
              innerScrollableContent.scrollTop >= 1 &&
              -currentSnapPoint >= lastSnapPoint - 10 &&
              draggableTarget !== document.querySelector(`#draggable-area`)
            ) {
              innerScrollableContent.style.overflow = "scroll";
              innerScrollableContent.click();
            } else {
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";

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
                draggableTarget
              );
              if (-currentSnapPoint <= 0 && isDisplayOverlay)
                hideOverlay(overlay);
            }
          } else {
            let type;
            newBottomSheet.style.overflow = "hidden";
            document.querySelector(
              `#${newBottomSheet.id} #${targetBottomSheet.id}`
            ).style.overflow = "hidden";
            if (-currentSnapPoint >= lastSnapPoint) {
              innerScrollableContent.style.overflow = "scroll";
              innerScrollableContent.style.height = `${lastSnapPoint - 10}%`;
              innerScrollableContent.click();
            } else {
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";

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
                draggableTarget
              );
            }
            displayOverlay(overlay);
          }
        }
      },
      onDragStart: () => {
        document.body.style.overflow = "hidden";
      },
      onDragEnd: (state) => {
        let innerScrollableContent = document.querySelector(
          `#${newBottomSheet.id} #${targetBottomSheet.id}`
        );
        // currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (+lastSetSnapPoint >= -10 && isDisplayOverlay) hideOverlay(overlay);

        if (lastSetSnapPoint >= lastSnapPoint) {
          innerScrollableContent.style.overflow = "scroll";
          innerScrollableContent.click();
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        rubberband: true,
        axis: "y",
        // bounds: { top: -100 },
      },
    }
  );
}
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
  draggableTarget
) {
  let convertXy = ((window.screen.height - xy[1]) / window.screen.height) * 100;

  if (maxSnapPoint === null) {
    if (active) {
      moveBottomSheet(
        newBottomSheet,
        draggableTarget === document.querySelector(`#draggable-area`)
          ? convertXy < 0
            ? 0
            : -convertXy
          : xy[1] / 50 + convertXy < 0
          ? 0
          : -xy[1] / 50 - convertXy,
        `linear`,
        30
      );
    }
    if (!active) {
      translateToPreviousSnapPoint(
        snapPoints,
        draggableTarget === document.querySelector(`#draggable-area`)
          ? convertXy
          : xy[1] / 50 + convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint
      );
    }
    // } else {
    //   translateToPreviousSnapPoint(snapPoints, convertXy, newBottomSheet, vy);
    // }
  } else {
    if (active) {
      moveBottomSheet(
        newBottomSheet,
        draggableTarget === document.querySelector(`#draggable-area`)
          ? convertXy > 100
            ? -100
            : -convertXy
          : xy[1] / 50 + convertXy > 100
          ? 100
          : -xy[1] / 50 - convertXy,
        `linear`,
        30
      );
    }
    if (!active) {
      translateToNextSnapPoint(
        snapPoints,
        draggableTarget === document.querySelector(`#draggable-area`)
          ? convertXy
          : xy[1] / 50 + convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint,
        false
      );
    }
    //   } else {
    //     translateToNextSnapPoint(
    //       snapPoints,
    //       convertXy,
    //       newBottomSheet,
    //       vy,
    //       false
    //     );
    //   }
  }
}

function translateToNextSnapPoint(
  snapPoints,
  convertXy,
  newBottomSheet,
  vy,
  lastSnapPoint,
  snappable
) {
  let maxSnapPoint = Infinity;
  snapPoints.forEach((element) => {
    let elem =
      typeof element === "number" ? element : +element.replace("%", "");

    if (elem > convertXy && elem < maxSnapPoint) {
      maxSnapPoint = elem;
    }
  });
  if (maxSnapPoint !== Infinity) {
    if (snappable) {
      moveBottomSheet(
        newBottomSheet,
        `-${maxSnapPoint}`,
        `spring(1, 85, 14 ${vy})`,
        1
      );
      lastSetSnapPoint = maxSnapPoint;
    } else {
      if (vy > 1) {
        moveBottomSheet(
          newBottomSheet,
          `-${maxSnapPoint}`,
          `spring(1, 85, 14, ${vy})`,
          1
        );
        lastSetSnapPoint = maxSnapPoint;
      } else {
        translateToPreviousSnapPoint(
          snapPoints,
          convertXy,
          newBottomSheet,
          vy,
          lastSnapPoint,
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
  snappable
) {
  let minSnapPoint = 0;
  snapPoints.forEach((element) => {
    let elem =
      typeof element === "number" ? element : +element.replace("%", "");

    if (elem < convertXy && elem > minSnapPoint) {
      minSnapPoint = elem;
    }
  });
  // if (minSnapPoint !== 0) {
  if (snappable) {
    moveBottomSheet(
      newBottomSheet,
      `-${minSnapPoint}`,
      `spring(1, 85, 45, ${vy})`,
      1
    );
    lastSetSnapPoint = minSnapPoint;
  } else {
    console.log(vy, "vy");
    if (vy > 1) {
      moveBottomSheet(
        newBottomSheet,
        `-${minSnapPoint}`,
        `spring(1, 85, 45, ${vy})`,
        1
      );
      lastSetSnapPoint = minSnapPoint;
    } else {
      translateToNextSnapPoint(
        snapPoints,
        convertXy,
        newBottomSheet,
        vy,
        lastSnapPoint,
        true
      );
    }
  }
}
export default BottomSheet;
