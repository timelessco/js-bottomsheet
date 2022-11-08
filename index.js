import BottomSheet from "./bottomSheet";
import { replaceInnerContent } from "./bottomSheet";
// import Carousel from "vanilla-js-carousel";

async function fetchContent(key, ind) {
  let products = await fetch(
    `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`
  )
    .then((res) => res.json())
    .then(async (json) => {
      return json.data[0];
    });

  let content = `<div id="bottomsheet-${ind}" data-bottomsheet> 
       <div class="list-items">
    ${products.name}
    </div>
  </div>`;
  return content;
}

async function fetchInnerContent(key, ind) {
  let products = await fetch(
    `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`
  )
    .then((res) => res.json())
    .then(async (json) => {
      return json.data[0];
    });
  let content = `
       <div class="list-items">
       <img src=${products.banner.src}>
       <h1>${products.name}</h1>
       <p>${products.description}</p>
       <div>
       ${products.videos.map((item) => {
         return `<div>
         <img src = ${item.poster} />
         <h3>${item.name}</h3>
         </div>`;
       })}
       </div>
       <button id="target-2" class="watch-now" data-bottomsheet-id="bottomsheet-2" key=${
         products.banner.src
       } data-key=${key} > watch now</button>
    </div>
`;
  return content.replaceAll(",", "");
}

async function fetchAllShows() {
  let shows = await fetch(
    "https://strapi.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows][fields][2]=featured&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src"
  )
    .then((res) => res.json())
    .then(async (json) => {
      let res = json.data[2].shows
        .concat(json.data[5].shows)
        .concat(json.data[7].shows);
      return res;
    });

  let content = `${shows.map((i) => {
    return `<li id="target-1" class="scroll-snap-slide" data-bottomsheet-id = bottomsheet-${1} key = ${
      i.key
    }><img src=${i.poster.src}></li>`;
  })}`;
  return content.replaceAll(",", "");
}
let bottomsheet1;
Promise.resolve(fetchAllShows()).then((res) => {
  document.querySelector(".scroll-snap-slider").innerHTML = res;

  bottomsheet1 = BottomSheet({
    trigger: "target-1",
    snapPoints: ["100%"],
    displayOverlay: true,
    minWidthForModal: 600,
    // draggableArea: `<div id="draggable-area"><svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <rect opacity="0.3" width="32" height="3" rx="1.5" fill="white"/>
    //   </svg>
    //   </div>`,
    webLayout: "Modal",
    content: fetchContent(
      document.querySelector(`#target-1`).attributes.key.value,
      1
    ),
    onOpen: async () => {
      setTimeout(async () => {
        console.log(await bottomsheet1, "thois");
      }, 1000);

      BottomSheet({
        trigger: "target-2",
        snapPoints: ["100%"],
        displayOverlay: true,
        minWidthForModal: 600,
        content: getBottomsheet2Content(
          document?.querySelector(`#target-2`)?.getAttribute("key") ||
            "https://ntvb.tmsimg.com/assets/p19867874_b_h8_ae.jpg",
          document?.querySelector(`#target-2`)?.getAttribute("data-key"),
          true
        ),
        webLayout: "Modal",
        sideSheetSnapPoints: ["25%", "50%", "100%"],
        onOpen: async () => {
          BottomSheet({
            trigger: "target-3",
            snapPoints: ["37%"],
            displayOverlay: true,
            minWidthForModal: 600,
            content: getBottomsheet3content(
              document?.querySelector(`#target-3`)?.getAttribute("key") ||
                `prj-01g3b8b6fbx9xybeq532bshx5k`
            ),
            // webLayout: "sideSheetLeft",
            sideSheetSnapPoints: ["25%", "50%", "100%"],
          });
        },
      });
      document.querySelectorAll(`#target-2`).forEach((i, id) => {
        i.addEventListener("click", () => {
          replaceInnerContent(
            "bottomsheet-2",
            getBottomsheet2Content(
              i.getAttribute("key") ||
                "https://ntvb.tmsimg.com/assets/p19867874_b_h8_ae.jpg",
              i.getAttribute("data-key"),
              false
            )
          );
        });
      });
    },
  });

  document.querySelectorAll(`#target-1`).forEach((i, id) => {
    i.addEventListener("click", () => {
      replaceInnerContent(
        "bottomsheet-1",
        fetchInnerContent(i.attributes.key.value, 1)
      );
    });
  });
});

function getBottomsheet2Content(src, key, bottomsheet = false) {
  return `${bottomsheet ? `<div id="bottomsheet-2" data-bottomsheet>` : ""}
  <div class="mid">
    <img src= ${src} />
    <div class="blur"></div>
  </div>
  <div class="universal">
   <div aria-hidden="true" style="padding-bottom: 80.7754%"></div>
      <img
        alt="Universal FYC Home"
        src="https://mondo-staging.vercel.app/_next/image?url=%2Fimages%2Fextended-logo.png&w=640&q=75"
        decoding="async"
        data-nimg="future-fill"
        style="position: absolute; color: transparent"
    />
  </div>
  <div
    class="see-all"
    id="target-3"
    key=${key}
    data-bottomsheet-id="bottomsheet-3"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <div style="transform: rotate(270deg) translateZ(0px); width: max-content">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 9 16"
        fill="none"
        style="width: 20px"
      >
        <path
          d="M8 15L0.999999 8.2L8 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
    <span class="uppercase">see all episodes</span>
  </div>
  ${bottomsheet ? `</div>` : ""}
`;
}

async function getBottomsheet3content(key) {
  let products;
  if (key !== undefined) {
    products = await fetch(
      `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`
    )
      .then((res) => res.json())
      .then(async (json) => {
        return json.data[0];
      });
  }
  let res = `<div id="bottomsheet-3" data-bottomsheet>
  <h4>See all episodes</h4>

  <ul class="scroll-snap-slider">
  ${products?.videos.map((items, index) => {
    return `<li class="scroll-snap-slide">
    <img src=${items.poster} style="border-radius:20px"/>
    </li>`;
  })}
</ul></div>`;
  return res.replaceAll(",", "");
}
