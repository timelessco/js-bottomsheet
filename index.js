import BottomSheet from "./bottomSheet";
console.log("js");

document.querySelector("#target-1").addEventListener("click", () => {
  console.log("click");
  BottomSheet("bottomsheet-1", {
    snapPoints: ["50%", "100%"],
    isDisplayOverlay: false,
    minWidthForModal: 600,
    draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
    </svg>
    </div>`,
  });
});
