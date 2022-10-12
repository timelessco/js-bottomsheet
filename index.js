import BottomSheet from "./bottomSheet";
console.log("js");

document.querySelector("#target-1").addEventListener("click", () => {
  BottomSheet("bottomsheet-1", {
    snapPoints: ["50%", "100%"],
    isDisplayOverlay: false,
    minWidthForModal: 600,
    draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
    </svg>
    </div>`,
    onOpen: () => {
      document.querySelector("#target-2").addEventListener("click", () => {
        console.log("target2");
        BottomSheet("bottomsheet-2", {
          snapPoints: ["50%", "100%"],
          isDisplayOverlay: false,
          minWidthForModal: 600,
          draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
            </svg>
            </div>`,
          onOpen: () => {
            document
              .querySelector("#target-3")
              .addEventListener("click", () => {
                BottomSheet("bottomsheet-3", {
                  snapPoints: ["50%", "100%"],
                  isDisplayOverlay: false,
                  minWidthForModal: 600,
                  draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
                    </svg>
                    </div>`,
                });
              });
          },
        });
      });
    },
  });
});

// const target2 = document.querySelector("#target-2");
// console.dir(target2);
// target2.addEventListener("click", (e) => console.log(e));

// document.querySelectorAll("button").forEach((i) => {
//   console.log(i, "i");
//   i.addEventListener("click", () => {
//     console.log("clicked");
//   });
// });
