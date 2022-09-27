import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

function BottomSheet(targetid, props) {
  let {
    snapPoints,
    isDisplayOverlay = true,
    minWidthForModal = 500,
    draggableArea = `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
  </svg>
  </div>`,
    clickOutsideToClose = true,
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
  if (clickOutsideToClose) {
    // document.body.addEventListener("click", (e) => {
    //   console.log("close");
    //   closeBottomSheet(newBottomSheet, overlay, isDisplayOverlay);
    // });
    // newBottomSheet?.addEventListener("click", (e) => {
    //   console.log("closedkk");
    //   e.stopPropagation();
    // });
  }
  document.body.appendChild(overlay);

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

  // document?.body?.addEventListener("click", (e) => {
  //   if (e.target.tagName.toLowerCase() === "input") {
  //     e.target.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //       inline: "start",
  //     });
  //   }
  // });
  let lastSnapPoint = +snapPoints[snapPoints.length - 1].replace("%", "");
  let firstSnapPoint = +snapPoints[0].replace("%", "");
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
      document.querySelector("#draggable-area").clientHeight
    }px`;
    let innerScrollableContent = document.querySelector(
      `#${newBottomSheet.id} #${targetBottomSheet.id}`
    );
    handleDragGesture(
      innerScrollableContent,
      currentSnapPoint,
      lastSnapPoint,
      snapPoints,
      newBottomSheet,
      targetBottomSheet,
      minWidthForModal,
      overlay,
      isDisplayOverlay,
      firstSnapPoint
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
      isDisplayOverlay,
      firstSnapPoint
    );
  }, 10);

  newBottomSheet.style.overflow = "scroll";

  if (targetBottomSheet && targetBottomSheet.cloneNode(true))
    newBottomSheet.appendChild(targetBottomSheet.cloneNode(true));
  document.body.appendChild(newBottomSheet);
}
function moveBottomSheet(targetBottomSheet, translateY, ease) {
  anime({
    targets: targetBottomSheet,
    translateY: translateY,
    easing: ease,
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
    easing: "spring(1, 85, 13, 3)",
  });
  lastSetSnapPoint = snapPoints[0];
}

function closeBottomSheet(targetBottomSheet, overlay, isDisplayOverlay) {
  isDisplayOverlay ? hideOverlay(overlay) : "";
  // document.body.style.overflow = "scroll";
  anime({
    targets: targetBottomSheet,
    translateY: `10%`,
    easing: "spring(1, 85, 13, 3)",
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
  isDisplayOverlay,
  firstSnapPoint
) {
  const gesture = new Gesture(
    draggableTarget,
    {
      onDrag: ({
        active,
        movement: [mx, my],
        cancel,
        velocity: [vx, vy],
        offset,
      }) => {
        let innerScrollableContent = document.querySelector(
          `#${newBottomSheet.id} #${targetBottomSheet.id}`
        ); // if (
        //   -currentSnapPoint === lastSnapPoint &&
        //   draggableTarget !== document.querySelector(`#draggable-area`)
        // ) {
        //   innerScrollableContent.style.overflow = "scroll";
        // }
        // else {

        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);

        if (window.innerWidth < minWidthForModal) {
          if (my > 0) {
            console.log(my);
            let type;
            if (
              innerScrollableContent.scrollTop !== 0 &&
              lastSetSnapPoint === lastSnapPoint &&
              draggableTarget !== document.querySelector(`#draggable-area`)
            ) {
              innerScrollableContent.style.overflow = "scroll";
              innerScrollableContent.click();
              newBottomSheet.click();
              targetBottomSheet.click();
            } else {
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";

              handleSnapPoints(
                snapPoints,
                newBottomSheet,
                currentSnapPoint,
                active,
                lastSnapPoint,
                type,
                my,
                vy,
                offset
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

            if (
              lastSetSnapPoint >= lastSnapPoint &&
              innerScrollableContent.scrollTop === 0
            ) {
              innerScrollableContent.style.overflow = "scroll";
              targetBottomSheet.click();
              innerScrollableContent.click();
              newBottomSheet.click();
              innerScrollableContent.style.height = `${lastSnapPoint - 10}%`;
            } else {
              newBottomSheet.style.overflow = "hidden";
              innerScrollableContent.style.overflow = "hidden";

              handleSnapPoints(
                snapPoints,
                newBottomSheet,
                currentSnapPoint,
                active,
                lastSnapPoint,
                type,
                my,
                vy,
                offset
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
          innerScrollableContent.focus();
          newBottomSheet.focus();
          targetBottomSheet.focus();
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        rubberband: true,
        axis: "y",
        bounds: { top: -100 },
      },
    }
  );
}

function handleSnapPoints(
  snapPoints,
  newBottomSheet,
  currentSnapPoint,
  active,
  lastSnapPoint,
  type,
  my,
  vy
) {
  let minSnapPoint = 0;
  let maxSnapPoint = Infinity;
  snapPoints.forEach((element) => {
    type = typeof element;
    let elem =
      typeof element === "number" ? element : +element.replace("%", "");

    let last =
      typeof lastSetSnapPoint === "number"
        ? lastSetSnapPoint
        : +lastSetSnapPoint.replace("%", "");

    if (!active) {
      if (my > 0) {
        if (elem < last && elem > minSnapPoint) {
          minSnapPoint = elem;
        }
      } else {
        if (elem > last && elem < maxSnapPoint) {
          maxSnapPoint = elem;
        }
      }
    }
  });
  if (my > 0) {
    moveBottomSheet(
      newBottomSheet,
      active
        ? +currentSnapPoint + my / 100
        : `-${minSnapPoint}${type === "number" ? "px " : "%"}`,
      `spring(1, 85, 13, ${vy})`
    );

    if (!active) lastSetSnapPoint = minSnapPoint;
  } else {
    moveBottomSheet(
      newBottomSheet,
      active
        ? -currentSnapPoint + my / 30 > lastSnapPoint - 30
          ? `-${lastSnapPoint}%`
          : Math.round(+currentSnapPoint + my / 30)
        : `-${maxSnapPoint}${type === "number" ? "px " : "%"}`,
      `spring(1, 85, 13, ${vy})`
    );
    if (!active) lastSetSnapPoint = maxSnapPoint;
  }
}
export default BottomSheet;
