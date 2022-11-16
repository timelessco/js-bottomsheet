import BottomSheet from "./bottomSheet";
import { replaceInnerContent } from "./bottomSheet";

let bottomsheet1;
Promise.resolve(fetchAllShows()).then(async (res) => {
  document.querySelector(".scroll-snap-slider").innerHTML = res;
  bottomsheet1 = BottomSheet({
    trigger: "target-1",
    snapPoints: ["100%"],
    displayOverlay: false,
    minWidthForModal: 600,
    webLayout: "modal",
    content: `<div id="bottomsheet-${1}" data-bottomsheet> </div>`,
  });

  document.querySelectorAll(`#target-1`).forEach((i, id) => {
    i.addEventListener("click", async () => {
      await replaceInnerContent(
        "bottomsheet-1",
        getBottomsheet1content(i.attributes.key.value, 1)
      );
    });
  });
  (await bottomsheet1).moveSideSheet();
});

async function fetchAllShows() {
  let shows = await fetch(
    "https://strapi.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows]&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src"
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

async function getBottomsheet1content(key) {
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
    </div>
`;
  return content.replaceAll(",", "");
}
