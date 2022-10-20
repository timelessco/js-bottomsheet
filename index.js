import BottomSheet from "./bottomSheet";
async function fetchContent(ind) {
  let products = await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then(async (json) => {
      return await json.products;
    });

  let content = `<div id="bottomsheet-${ind}" data-bottomsheet> ${products.map(
    (i) => {
      return `<div class="list-items" onclick = "${fun()}" id=target-${
        ind + 1
      } data-bottomsheet-id = bottomsheet-${ind + 1}>
    ${i.title}
    </div>`;
    }
  )} </div>`;
  return content;
}

function fun() {
  // console.log("clicked");
}
BottomSheet({
  trigger: "target-1",
  snapPoints: ["50%", "100%"],
  displayOverlay: true,
  minWidthForModal: 600,
  draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
    </svg>
    </div>`,
  webLayout: "Modal",
  content: await fetchContent(1),
  onOpen: async () => {
    BottomSheet({
      trigger: "target-2",
      snapPoints: ["50%", "100%"],
      displayOverlay: true,
      minWidthForModal: 600,
      draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
        </svg>
        </div>`,
      content: await fetchContent(2),
      webLayout: "sideSheetLeft",
      onOpen: async () => {
        BottomSheet({
          trigger: "target-3",
          snapPoints: ["50%", "100%"],
          displayOverlay: true,
          minWidthForModal: 600,
          draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
    </svg>
    </div>`,
          webLayout: "sideSheetRight",
          content: await fetchContent(3),
        });
      },
    });
  },
});
