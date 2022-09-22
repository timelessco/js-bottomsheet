import { Gesture } from "@use-gesture/vanilla";
import anime from "animejs/lib/anime.es.js";

function BottomSheet(targetid, props) {
  let { snapPoints, isDisplayOverlay = true, minWidthForModal = 500 } = props;
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

  if (targetBottomSheet)
    if (!newBottomSheet)
      createBottomSheet(
        targetBottomSheet,
        snapPoints,
        overlay,
        isDisplayOverlay,
        minWidthForModal
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
  minWidthForModal
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

  openBottomSheet(newBottomSheet, snapPoints, overlay, isDisplayOverlay);

  newBottomSheet.style.overflow = "scroll";
  targetBottomSheet.style.overflow = "scroll";

  const gesture = new Gesture(
    newBottomSheet,
    {
      onDrag: ({ active, movement: [mx, my], cancel, velocity: [vx, vy] }) => {
        let minSnapPoint = 0;
        let maxSnapPoint = Infinity;
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (window.innerWidth < minWidthForModal) {
          if (my > 0) {
            let type;
            if (
              newBottomSheet.scrollTop !== 0 &&
              -currentSnapPoint === lastSnapPoint
            ) {
              newBottomSheet.style.overflow = "scroll";
              targetBottomSheet.style.overflow = "scroll";
            } else {
              newBottomSheet.style.overflow = "hidden";
              targetBottomSheet.style.overflow = "hidden";

              snapPoints.forEach((element) => {
                type = typeof element;
                let elem =
                  typeof element === "number"
                    ? element
                    : +element.replace("%", "");
                if (elem < -currentSnapPoint && elem > minSnapPoint) {
                  minSnapPoint = elem;
                }
              });

              moveBottomSheet(
                newBottomSheet,
                active
                  ? +currentSnapPoint + my / 100
                  : `-${minSnapPoint}${type === "number" ? "px " : "%"}`,
                `active` ? "easeOutElastic" : `spring(1, 85, 13, ${vy})`
              );
              // console.log(-currentSnapPoint);
              if (-currentSnapPoint <= 0 && isDisplayOverlay)
                hideOverlay(overlay);
            }
          } else if (my < 0) {
            let type;
            newBottomSheet.style.overflow = "hidden";
            targetBottomSheet.style.overflow = "hidden";

            if (-currentSnapPoint >= lastSnapPoint) {
              newBottomSheet.style.overflow = "scroll";
              targetBottomSheet.style.overflow = "scroll";
              document.querySelector(
                `#${newBottomSheet.id} #${targetBottomSheet.id}`
              ).style.paddingBottom = `${100 - lastSnapPoint}%`;
              // newBottomSheet.style.paddingBottom = `${100 - lastSnapPoint}%`;
            } else {
              newBottomSheet.style.overflow = "hidden";
              targetBottomSheet.style.overflow = "hidden";
            }

            snapPoints.forEach((element) => {
              type = typeof element;
              let elem =
                typeof element === "number"
                  ? element
                  : +element.replace("%", "");

              if (elem > -currentSnapPoint && elem < maxSnapPoint) {
                maxSnapPoint = elem;
              }
            });

            moveBottomSheet(
              newBottomSheet,
              active
                ? -currentSnapPoint + my / 10 > lastSnapPoint - 30
                  ? `-${lastSnapPoint}%`
                  : Math.round(+currentSnapPoint + my / 30)
                : `-${maxSnapPoint}${type === "number" ? "px " : "%"}`,
              active ? "easeOutElastic" : `spring(1, 85, 13, ${vy})`
            );
            // overlay.classList.add("display");
            displayOverlay(overlay);
          }
          // }
        }
      },
      onDragEnd: (state) => {
        console.log(-currentSnapPoint);
        if (+currentSnapPoint >= -10 && isDisplayOverlay) hideOverlay(overlay);
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

  // newBottomSheet.style.overflow = "scroll";
  // targetBottomSheet.style.overflow = "scroll";

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
}

function closeBottomSheet(targetBottomSheet, overlay, isDisplayOverlay) {
  isDisplayOverlay ? hideOverlay(overlay) : "";
  document.body.style.overflow = "scroll";
  anime({
    targets: targetBottomSheet,
    translateY: `10%`,
    easing: "spring(1, 85, 13, 3)",
  });
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
export default BottomSheet;
