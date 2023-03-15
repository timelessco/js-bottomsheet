import BottomSheet from "js-bottomsheet";

// eslint-disable-next-line import/no-unresolved
import "js-bottomsheet/bottomsheet.css";
import "scroll-snap-slider";

document.body.style.overflow = "scroll";
async function fetchAllShows() {
  const shows = await fetch(
    "https://strapi2.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows]&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src",
  )
    .then(res => res.json())
    .then(async json => {
      const res = json.data[0].shows.concat(json.data[2].shows);
      // .concat(json.data[7].shows);
      return res;
    });
  return shows;
}
async function getIndividualShows(key) {
  const products = await fetch(
    `https://strapi2.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`,
  )
    .then(res => res.json())
    .then(async json => {
      return json.data[0];
    });
  return products;
}
async function getBottomsheet1content(key, ind) {
  const shows = await getIndividualShows(key);

  const content = `
  <div class="list-items">
  <div class="img-wrapper">
    <img src=${shows.banner.src}>
    <svg class="close-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_5593_50546)">
        <circle cx="16" cy="16" r="16" fill="black" fill-opacity="0.58" />
      </g>
      <path d="M20.8001 11.2001L11.2001 20.8001" stroke="white" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
      <path d="M11.2001 11.2001L20.8001 20.8001" stroke="white" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
      <defs>
        <filter id="filter0_b_5593_50546" x="-19" y="-19" width="70" height="70" filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="9.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5593_50546" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5593_50546" result="shape" />
        </filter>
      </defs>
    </svg>

    <div class="gradient"></div>
    <button class="watch-now md" id=watch-now-${ind} data-bottomsheet-id=second-stack-${ind}> <svg class="watch-svg"
        width="8" height="13" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M0.121352 0.744663C-2.85542e-07 0.907787 0 1.19998 0 1.78437V9.21563C0 9.80002 -2.85542e-07 10.0922 0.121352 10.2553C0.227105 10.3975 0.388983 10.4864 0.564992 10.4991C0.766962 10.5136 1.01119 10.3556 1.49965 10.0396L7.24303 6.32395C7.6669 6.04973 7.87883 5.91262 7.95203 5.73828C8.01599 5.58595 8.01599 5.41405 7.95203 5.26172C7.87883 5.08738 7.6669 4.95027 7.24303 4.67605L1.49966 0.960416C1.0112 0.644405 0.766963 0.4864 0.564992 0.500917C0.388983 0.513568 0.227105 0.602508 0.121352 0.744663Z"
          fill="black" />
      </svg>
      watch now</button>
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
          <img src="assets/outstanding.svg" width="35px" height="35px" />
          <div>
            <p class="outstanding">“Outstanding Directing in a Comedy Series of This Year”</p>
            <p class="glad">GLAAD Media Awards</p>
          </div>
        </div>
      </div>
      <div class="poster-img">
        <img src="https://image.tmdb.org/t/p/original/q32wjcRi7Ix4DAqFA8kR7KGneyo.jpg" />
      </div>
    </div>

    <div>
      <div class="flex-start-n">
        <h2>Season 1</h2> <img src="assets/arrow-down.svg" class="arrow" />
      </div>
      ${shows.videos
        .map((item, index) => {
          return `<div class="container-box">
        <img src='assets/white.png' class="white-play" />
        <figure class="seasons-figure">
        <img src=${item.poster} class="seasons" />
        </figure>
        <div class="seasons-text">
          <h4><span class="number">${index + 1}</span> ${item.name}</h4>
          <p>Just as Camille thinks she's in total control of her life, her ex shows up on her block making her question
            her choices.</p>
        </div>
      </div>`;
        })
        .join("")}
    </div>
  </div>
  <button class="watch-now" id=watch-now-${ind} data-bottomsheet-id=second-stack-${ind}> watch now</button>
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
  const content = await getBottomsheet1content(i.getAttribute("key"), index);
  const showsBottomsheet = BottomSheet({
    trigger: `target-${index}`,
    snapPoints: ["100%"],
    minWidthForModal: 600,
    webLayout: "modal",
    scrollableSheet: true,
    modalPosition: [-50, 0],
    scaleOnDrag: true,
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
      const stack = BottomSheet({
        trigger: `watch-now-${index}`,
        snapPoints: ["100%"],
        displayOverlay: true,
        minWidthForModal: 600,
        content: getBottomsheet2Content(
          document?.querySelector(`#target-2`)?.getAttribute("key") ||
            "https://ntvb.tmsimg.com/assets/p19867874_b_h8_ae.jpg",
          document?.querySelector(`#target-2`)?.getAttribute("data-key"),
          index,
          true,
        ),
        scrollableSheet: false,
        scaleOnDrag: true,
        webLayout: "modal",
        modalPosition: [-50, 0],
        sideSheetSnapPoints: ["50%", "100%"],
        onOpen: () => {
          document.querySelector("#x-icon").addEventListener("click", () => {
            stack.close();
          });
        },
        modalCloseIcon: `<figure class="x-icon-figure"><svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_1_250)">
            <circle cx="20" cy="20" r="20" fill="black" fill-opacity="0.58" />
        </g>
        <path d="M26 14L14 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 14L26 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
            <filter id="filter0_b_1_250" x="-19" y="-19" width="78" height="78" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="9.5" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_250" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_250" result="shape" />
            </filter>
        </defs>
    </svg></figure>`,
      });
    },
    modalCloseIcon: ` <figure class="x-icon-figure"><svg width="100%" height="100%" viewBox="0 0 40 40" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_1_250)">
      <circle cx="20" cy="20" r="20" fill="black" fill-opacity="0.58" />
    </g>
    <path d="M26 14L14 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14 14L26 26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <filter id="filter0_b_1_250" x="-19" y="-19" width="78" height="78" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="9.5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_250" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_250" result="shape" />
      </filter>
    </defs>
  </svg></figure>`,
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

function getBottomsheet2Content(src, key, index, bottomsheet = false) {
  return `${
    bottomsheet
      ? `<div id=second-stack-${index} class="second-stack" data-bottomsheet>`
      : ""
  }
    <div class="second blur"></div>
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
    <div class="universal"><input placeholder="enter access code" class="access-input"/>
    <button class="watch-now univ"> <svg class="watch-svg" width="8" height="13" viewBox="0 0 8 11" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M0.121352 0.744663C-2.85542e-07 0.907787 0 1.19998 0 1.78437V9.21563C0 9.80002 -2.85542e-07 10.0922 0.121352 10.2553C0.227105 10.3975 0.388983 10.4864 0.564992 10.4991C0.766962 10.5136 1.01119 10.3556 1.49965 10.0396L7.24303 6.32395C7.6669 6.04973 7.87883 5.91262 7.95203 5.73828C8.01599 5.58595 8.01599 5.41405 7.95203 5.26172C7.87883 5.08738 7.6669 4.95027 7.24303 4.67605L1.49966 0.960416C1.0112 0.644405 0.766963 0.4864 0.564992 0.500917C0.388983 0.513568 0.227105 0.602508 0.121352 0.744663Z"
          fill="black" />
      </svg>
      watch now</button>
    </div>
  ${bottomsheet ? `</div>` : ""}
`;
}
