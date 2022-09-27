import BottomSheet from "./bottomSheet";
console.log("js");

document.querySelector("#target-1").addEventListener("click", () => {
  console.log("click");
  BottomSheet("bottomsheet-1", {
    snapPoints: ["10%", "50%", "100%"],
    isDisplayOverlay: false,
    minWidthForModal: 600,
  });
});
