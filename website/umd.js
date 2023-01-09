/* global BottomSheet */
import "./style.css";

async function fetchAllShows() {
  const res = await fetch(
    "https://strapi.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows]&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src",
  );
  const jsonRes = await res.json();
  const shows = jsonRes.data[2].shows
    .concat(jsonRes.data[5].shows)
    .concat(jsonRes.data[7].shows);

  return shows;
}

async function fetchShow(key) {
  const res = await fetch(
    `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`,
  );
  const jsonRes = await res.json();
  const show = jsonRes.data[0];

  return show;
}

async function getBottomsheet1content(show) {
  const content = `
    <div class="list-items">
      <div class="img-wrapper">
        <img src=${show.banner.src} />
        <div class="gradient"></div>
      </div>
      <div class="container">
        <h1 class="name">${show.name}</h1>
        <span class="genre">Drama · Comedy · 2021</span>
        <p class="description">${show.description}</p>
        <p class="cast">Cast & Crew</p>
        ${show.cast_and_crew.map(i => `</span>${i.name} </span>`).join("")}
        <div>
          <h2>Season 1</h2>
          ${show.videos
            .map((item, index) => {
              return `<div class="container-box">
              <img src=${item.poster} />
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

const allShows = await fetchAllShows();
const allShowsHTML = allShows
  .map((show, index) => {
    return `<li
    id="target-${index}"
    class="scroll-snap-slide"
    data-bottomsheet-id="bottomsheet-${index}"
    key=${show.key}
  >
    <img src=${show.poster.src} />
  </li>`;
  })
  .join("");
document.querySelector(".scroll-snap-slider").innerHTML = allShowsHTML;

document.querySelectorAll(`.scroll-snap-slide`).forEach(async (i, index) => {
  const show = await fetchShow(allShows[index].key);
  const bottomSheetContent = await getBottomsheet1content(show);

  BottomSheet({
    trigger: `target-${index}`,
    snapPoints: ["100%"],
    minWidthForModal: 600,
    webLayout: "modal",
    content: `<div id="bottomsheet-${index}" data-bottomsheet>
      ${bottomSheetContent}
    </div>`,
    displayOverlay: true,
  });
});
