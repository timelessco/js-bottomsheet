import BottomSheet from "js-bottomsheet";

import "js-bottomsheet/bottomsheet.css";
import "scroll-snap-slider";
import { fetchAllShows, getIndividualShows } from "./helpers/apiCalls";
import {
  bottomsheet1Content,
  getBottomsheet2Content,
  modalCloseIcon,
} from "./helpers/dynamicContent";
import { posterImagesOnResize } from "./helpers/resizeListeners";

document.body.style.overflow = "scroll";

async function getBottomsheet1content(key, ind) {
  const shows = await getIndividualShows(key);

  const content = bottomsheet1Content(shows, ind);
  return content;
}

const showsContent = await fetchAllShows();
const response = showsContent.slice(0, 1).concat(showsContent.slice(4));
const showsHTML = `${response
  .map((i, index) => {
    if (i.poster.src) {
      return `<li id="target-${index}" class="scroll-snap-slide" data-bottomsheet-id = bottomsheet-${index} key = ${i.key}><img src=${i.poster.src}>
    <div class="li-overlay"></div>
    </li>`;
    }
    return null;
  })
  .join("")}`;
document.querySelectorAll(".scroll-snap-slider").forEach(i => {
  i.innerHTML = showsHTML;
});
posterImagesOnResize(response);

document.querySelector(".linear-grad").style.display = "block";

document.querySelectorAll(`.scroll-snap-slide`).forEach(async (i, index) => {
  const content = await getBottomsheet1content(i.getAttribute("key"), index);
  const showsBottomsheet = BottomSheet({
    trigger: `target-${index}`,
    snapPoints: [100],
    minWidthForModal: 700,
    webLayout: "modal",
    scrollableSheet: true,
    // modalPosition: [-50, 0],
    scaleOnDrag: true,
    content: content
      ? `<div id="bottomsheet-${index}" data-bottomsheet> ${content} </div>`
      : `<div id="bottomsheet-${index}" data-bottomsheet><img src="assets/banner-blur.png"> </div>`,
    displayOverlay: true,
    onClose: () => {
      if (window.innerWidth < 700) {
        document
          .querySelector(".nav")
          .setAttribute(
            "style",
            "backdrop-filter:blur(20px), -webkit-backdrop-filter: blur(20px)",
          );
      } else {
        document
          .querySelector(".nav")
          .setAttribute("style", "backdrop-filter:blur(30px)");
      }
    },
    onOpen: () => {
      document.querySelector(".nav").style.cssText = `backdrop-filter:none;
      filter:none; -webkit-backdrop-filter: none`;
      document.querySelectorAll("#close-1").forEach(icon =>
        icon.addEventListener("click", () => {
          showsBottomsheet.close();
        }),
      );

      const stack = BottomSheet({
        trigger: `watch-now-${index}`,
        snapPoints: ["100%"],
        displayOverlay: true,
        minWidthForModal: 700,
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
        // modalPosition: [-50, 0],
        sideSheetSnapPoints: ["50%", "100%"],
        onOpen: () => {
          document.querySelector(
            ".overlay",
          ).style.cssText = `backdrop-filter:none;
          filter:none`;
          if (document.querySelector("#x-icon"))
            document.querySelectorAll("#x-icon").forEach(item =>
              item.addEventListener("click", () => {
                stack.close();
              }),
            );
        },
        onClose: () => {
          if (window.innerWidth > 700) {
            document.querySelector(
              ".overlay",
            ).style.cssText = `backdrop-filter:blur(100px);
            filter:blur(20px); opacity: 1`;
          }
        },
        modalCloseIcon,
      });
    },

    modalCloseIcon,
  });
});
