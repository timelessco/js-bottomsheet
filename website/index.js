import BottomSheet from "../src/bottomSheet";

async function fetchAllShows() {
  const shows = await fetch(
    "https://strapi.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows]&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src",
  )
    .then(res => res.json())
    .then(async json => {
      const res = json.data[2].shows
        .concat(json.data[5].shows)
        .concat(json.data[7].shows);
      return res;
    });
  return shows;
}
async function getIndividualShows(key) {
  const products = await fetch(
    `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`,
  )
    .then(res => res.json())
    .then(async json => {
      return json.data[0];
    });
  return products;
}
async function getBottomsheet1content(key) {
  const shows = await getIndividualShows(key);
  const content = `
       <div class="list-items">
       <div class="img-wrapper">
       <img src=${shows.banner.src}>
       <div class="gradient"></div>
       </div>
       <div class="container">
       <h1 class="name">${shows.name}</h1>
       <span class="genre">Drama · Comedy · 2021</span>
       <p class="description">${shows.description}</p>
       <p class="cast">Cast & Crew</p>
      ${shows.cast_and_crew.map(i => `</span>${i.name} </span>`).join("")}
       <div>
       <h2>Season 1</h2>
       ${shows.videos
         .map((item, index) => {
           return `<div class="container-box">
         <img src = ${item.poster} />
         <h4><span class="number">${index + 1}</span> ${item.name}</h4>
         </div>`;
         })
         .join("")}
       </div>
       </div>
    </div>
`;
  return content;
}
const showsContent = await fetchAllShows();
const showsHTML = `${showsContent
  .map((i, index) => {
    return `<li id="target-${index}" class="scroll-snap-slide" data-bottomsheet-id = bottomsheet-${index} key = ${i.key}><img src=${i.poster.src}></li>`;
  })
  .join("")}`;
document.querySelector(".scroll-snap-slider").innerHTML = showsHTML;
document.querySelectorAll(`.scroll-snap-slide`).forEach(async (i, index) => {
  const content = await getBottomsheet1content(i.getAttribute("key"));
  BottomSheet({
    trigger: `target-${index}`,
    snapPoints: ["100%"],
    displayOverlay: false,
    minWidthForModal: 600,
    webLayout: "modal",
    content: `<div id="bottomsheet-${index}" data-bottomsheet> ${content} </div>`,
  });
});
