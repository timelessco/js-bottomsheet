import BottomSheet from "js-bottomsheet";

// eslint-disable-next-line import/no-unresolved
import "js-bottomsheet/bottomsheet.css";
import "scroll-snap-slider";

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
       <svg class="close-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_5593_50546)">
<circle cx="16" cy="16" r="16" fill="black" fill-opacity="0.58"/>
</g>
<path d="M20.8001 11.2001L11.2001 20.8001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.2001 11.2001L20.8001 20.8001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<filter id="filter0_b_5593_50546" x="-19" y="-19" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="9.5"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5593_50546"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5593_50546" result="shape"/>
</filter>
</defs>
</svg>

       <div class="gradient"></div>
       <button class="watch-now md"> watch now</button>
       </div>
       <div class="container">
       <div class="details">
       <div class="flex-order">
       <h1 class="name">${shows.name}</h1>
       <span class="genre">Drama · Comedy · 2021</span>
       <p class="description">${shows.description}</p>
       <p class="cast">Cast & Crew</p>
      <p class="cast-names">${shows.cast_and_crew
        .map(i => `</span>${i.name} </span>`)
        .join("")}</p>
        <div class="awards-div">
        <img src="assets/outstanding.svg" width="35px" height="35px"/>
        <div>
        <p class="outstanding">“Outstanding Directing in a Comedy Series of This Year”</p>
        <p class="glad">GLAAD Media Awards</p>
        </div>
        </div>
        </div>
        <div class="poster-img">
        <img src="https://image.tmdb.org/t/p/original/q32wjcRi7Ix4DAqFA8kR7KGneyo.jpg"/>
        </div>
        </div>
       
       <div>
       <div class="flex-start-n">
       <h2>Season 1</h2> <img src="assets/arrow-down.svg" class="arrow" />
       </div>
       ${shows.videos
         .map((item, index) => {
           return `<div class="container-box">
           <img src ='assets/white.png' class="white-play"/>
         <img src = ${item.poster} class="seasons"/>
         <div class="seasons-text"><h4><span class="number">${
           index + 1
         }</span> ${item.name}</h4>
         <p>Just as Camille thinks she's in total control of her life, her ex shows up on her block making her question her choices.</p>
         </div></div>`;
         })
         .join("")}
       </div>
       </div>
       <button class="watch-now"> watch now</button>

    </div>
`;
  return content;
}

const showsContent = await fetchAllShows();
const showsHTML = `${showsContent
  .map((i, index) => {
    return `<li id="target-${index}" class="scroll-snap-slide" data-bottomsheet-id = bottomsheet-${index} key = ${i.key}><img src=${i.poster.src}>
    <div class="li-overlay"></div>
    </li>`;
  })
  .join("")}`;
document.querySelectorAll(".scroll-snap-slider").forEach(i => {
  i.innerHTML = showsHTML;
});
if (window.innerWidth < 700) {
  document.querySelector(".banner-im").src = showsContent[0].poster.src;
} else {
  document.querySelector(".banner-im").src = showsContent[0].banner.src;
}
document.querySelector(".banner-im").style.filter = "none";
window.addEventListener("resize", () => {
  if (window.innerWidth < 700) {
    document.querySelector(".banner-im").src = showsContent[0].poster.src;
  } else {
    document.querySelector(".banner-im").src = showsContent[0].banner.src;
  }
});

document.querySelector(".linear-grad").style.display = "block";
document.querySelectorAll(`.scroll-snap-slide`).forEach(async (i, index) => {
  const content = await getBottomsheet1content(i.getAttribute("key"));

  const showsBottomsheet = BottomSheet({
    trigger: `target-${index}`,
    snapPoints: ["70%"],
    minWidthForModal: 600,
    webLayout: "modal",
    scrollableSheet: false,
    modalTranslate: [-50, 0],
    content: content
      ? `<div id="bottomsheet-${index}" data-bottomsheet> ${content} </div>`
      : `<div id="bottomsheet-${index}" data-bottomsheet><img src="assets/banner-blur.png"> </div>`,
    displayOverlay: true,
    onOpen: () => {
      document.querySelectorAll(".close-icon").forEach(icon =>
        icon.addEventListener("click", () => {
          showsBottomsheet.close();
        }),
      );
    },
    modalCloseIcon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_28_1042)">
    <circle cx="20" cy="20" r="20" fill="black" fill-opacity="0.58"/>
    </g>
    <path d="M26 14L14 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 14L26 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <filter id="filter0_b_28_1042" x="-19" y="-19" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="9.5"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_28_1042"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_28_1042" result="shape"/>
    </filter>
    </defs>
    </svg>

  `,
  });
});
if (window.innerWidth < 700) {
  document.querySelector(".banner-im").src =
    "https://image.tmdb.org/t/p/original/q32wjcRi7Ix4DAqFA8kR7KGneyo.jpg";
} else {
  document.querySelector(".banner-im").src =
    "https://ntvb.tmsimg.com/assets/p19867874_b_h8_ae.jpg";
}
window.addEventListener("resize", () => {
  if (window.innerWidth < 700) {
    document.querySelector(".banner-im").src =
      "https://image.tmdb.org/t/p/original/q32wjcRi7Ix4DAqFA8kR7KGneyo.jpg";
  } else {
    document.querySelector(".banner-im").src =
      "https://ntvb.tmsimg.com/assets/p19867874_b_h8_ae.jpg";
  }
});
