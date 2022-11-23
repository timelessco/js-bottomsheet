import BottomSheet from "../bottomSheet";
let bottomsheet1;

Promise.resolve(fetchAllShows()).then(async (res) => {
  document.querySelector(".scroll-snap-slider").innerHTML = res;
  document.querySelectorAll(`.scroll-snap-slide`).forEach(async (i, index) => {
    bottomsheet1 = BottomSheet({
      trigger: `target-${index}`,
      snapPoints: ["100%"],
      displayOverlay: false,
      minWidthForModal: 600,
      webLayout: "modal",
      content: `<div id="bottomsheet-${index}" data-bottomsheet> ${await getBottomsheet1content(
        i.getAttribute("key")
      )} </div>`,
    });
  });
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

  let content = `${shows.map((i, index) => {
    return `<li id="target-${index}" class="scroll-snap-slide" data-bottomsheet-id = bottomsheet-${index} key = ${i.key}><img src=${i.poster.src}></li>`;
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
       <div class="gradient"></div>
       <div class="container">
       <h1 class="name">${products.name}</h1>
       <span class="genre">Drama · Comedy · 2021</span>
       <p class="description">${products.description}</p>
       <p class="cast">Cast & Crew</p>
      ${products.cast_and_crew.map((i) => `</span>${i.name} </span>`)}
       <div>
       <h2>Season 1</h2>
       ${products.videos.map((item, index) => {
         return `<div class="container-box">
         <img src = ${item.poster} />
         <h4><span class="number">${index + 1}</span> ${item.name}</h4>
         </div>`;
       })}
       </div>
       </div>
    </div>
`;
  return content.replaceAll(",", "");
}
