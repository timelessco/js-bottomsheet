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
  content: `<div id="bottomsheet-1" data-bottomsheet="" class="modal" style="display: block; top: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); overflow: scroll;"><div id="modal-close"><svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"></path>
  </svg>
  </div> <div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  iPhone 9
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  iPhone X
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Samsung Universe 9
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  OPPOF19
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Huawei P30
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  MacBook Pro
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Samsung Galaxy Book
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Microsoft Surface Laptop 4
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Infinix INBOOK
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  HP Pavilion 15-DK1056WM
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  perfume Oil
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Brown Perfume
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Fog Scent Xpressio Perfume
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Non-Alcoholic Concentrated Perfume Oil
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Eau De Perfume Spray
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Hyaluronic Acid Serum
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Tree Oil 30ml
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Oil Free Moisturizer 100ml
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Skin Beauty Serum.
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Freckle Treatment Cream- 15gm
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  - Daal Masoor 500 grams
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Elbow Macaroni - 400 gm
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Orange Essence Food Flavou
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  cereals muesli fruit nuts
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Gulab Powder 50 Gram
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Plant Hanger For Home
  </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
  Flying Wooden Bird
  </div> </div>`,
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
      content: `<div id="bottomsheet-1" data-bottomsheet="" class="modal" style="display: block; top: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); overflow: scroll;"><div id="modal-close"><svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"></path>
      </svg>
      </div> <div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      iPhone 9
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      iPhone X
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Samsung Universe 9
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      OPPOF19
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Huawei P30
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      MacBook Pro
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Samsung Galaxy Book
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Microsoft Surface Laptop 4
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Infinix INBOOK
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      HP Pavilion 15-DK1056WM
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      perfume Oil
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Brown Perfume
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Fog Scent Xpressio Perfume
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Non-Alcoholic Concentrated Perfume Oil
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Eau De Perfume Spray
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Hyaluronic Acid Serum
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Tree Oil 30ml
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Oil Free Moisturizer 100ml
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Skin Beauty Serum.
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Freckle Treatment Cream- 15gm
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      - Daal Masoor 500 grams
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Elbow Macaroni - 400 gm
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Orange Essence Food Flavou
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      cereals muesli fruit nuts
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Gulab Powder 50 Gram
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Plant Hanger For Home
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Flying Wooden Bird
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      3D Embellishment Art Lamp
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Handcraft Chinese style
      </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
      Key Holder
      </div> </div>`,
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
          content: `<div id="bottomsheet-1" data-bottomsheet="" class="modal" style="display: block; top: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); overflow: scroll;"><div id="modal-close"><svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"></path>
          </svg>
          </div> <div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          iPhone 9
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          iPhone X
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Samsung Universe 9
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          OPPOF19
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Huawei P30
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          MacBook Pro
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Samsung Galaxy Book
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Microsoft Surface Laptop 4
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Infinix INBOOK
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          HP Pavilion 15-DK1056WM
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          perfume Oil
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Brown Perfume
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Fog Scent Xpressio Perfume
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Non-Alcoholic Concentrated Perfume Oil
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Eau De Perfume Spray
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Hyaluronic Acid Serum
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Tree Oil 30ml
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Oil Free Moisturizer 100ml
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Skin Beauty Serum.
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Freckle Treatment Cream- 15gm
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          - Daal Masoor 500 grams
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Elbow Macaroni - 400 gm
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Orange Essence Food Flavou
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          cereals muesli fruit nuts
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Gulab Powder 50 Gram
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Plant Hanger For Home
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Flying Wooden Bird
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          3D Embellishment Art Lamp
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Handcraft Chinese style
          </div>,<div class="list-items" onclick="undefined" id="target-2" data-bottomsheet-id="bottomsheet-2">
          Key Holder
          </div> </div>`,
        });
      },
    });
  },
});
