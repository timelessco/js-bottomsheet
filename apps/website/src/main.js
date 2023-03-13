import BottomSheet from "js-bottomsheet";

// eslint-disable-next-line import/no-unresolved
import "js-bottomsheet/bottomsheet.css";

document.body.style.overflow = "hidden";
BottomSheet({
  snapPoints: ["10%", "40%", "100%"],
  draggableArea: `<div id="drag">
  <svg width="36" height="4" viewBox="0 0 36 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="4" rx="2" fill="black" fill-opacity="0.22"/>
  </svg>
  <div class="flex-input"><input class="search" placeholder="Search Maps" /><img src="/assets/avatar.png" width="32px" height="32px" /></div>
  </div>
  `,
  webLayout: "sideSheetLeft",
  dismissible: false,
  content: ` <div id="maps-1" data-bottomsheet>
  <div class="maps-cont">
  <div class="flex-input responsive"><input class="search" placeholder="Search Maps" /><img src="/assets/avatar.png" width="32px" height="32px" /></div>
  
  <div class="flex"><p class="fav">Favorites</p> <p class="more fav">More</p></div><div class="cont-box"> <div class="fav-box" id="map-target"><img src="./assets/home.svg" /><div> <p class="sm">Home</p><p class="xs">12 min</p></div></div><div class="fav-box" id="map-target">
 <img src="./assets/work.svg" /><div> <p class="sm">Work</p><p class="xs">24 min</p></div></div><div class="fav-box" id="map-target">
<img src="./assets/train.svg" /><div><p class="sm">Transit</p><p class="xs">Nearby</p></div> </div><div class="fav-box" id="map-target"><img src="./assets/pin.svg" /><p class="sm">Add</p></div></div><div class="flex"><p class="fav">Recents</p><p class="more fav"  id="target-more" data-bottomsheet-id="recents-sheet">More</p></div><div class="cont-box flex-col"><div class="flex-start" id="map-target" > <img src="./assets/beach.svg" /><div><p class="md" >Palavakkam Beach</p> <p class="xs">Anna Salai, Chennai</p></div></div><div class="flex-start" id="map-target" ><img src="./assets/furniture.svg" /><div><p class="md">Amutha Furniture</p><p class="xs">Keelkattalai, Chennai</p>
</div> </div><div class="flex-start" id="map-target" > <img src="./assets/beach.svg" /><div><p class="md"> ECR Beach</p> <p class="xs">Rajaji Avenue, Chennai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/park.svg" /><div><p class="md" >Kamakoti Nagar Park</p> <p class="xs">Kamakoti Nagar, Pallikaranai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/timeless.svg" /><div><p class="md" >Timeless</p> <p class="xs"> Kamakoti Nagar, Pallikaranai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/rippon.svg" /><div><p class="md" >Rippon Building</p> <p class="xs">Anna Salai, Chennai</p></div></div></div><div class="flex"><p class="fav">My Guides</p></div>
<div class="cont-box flex-col"><div class="flex-start" id="map-target" > <img src="./assets/place.svg" /><div><p class="md" >My Places</p> <p class="xs">6 places</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/frequently.svg" /><div><p class="md" >Frequently</p> <p class="xs">14 places</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/new.svg" /><div><p class="md more" >New Guide</p> </div></div></div>
</div></div>`,
  openOnLoad: true,
  sideSheetMinValue: 20,
  sideSheetMaxValue: 30,
  sideSheetIconPosition: "right",
  resizablePosition: "right",
  resizeHoverEffect: false,
  footerContent: `<button class="dismiss md footer" id="map-2-target" data-bottomsheet-id="maps-2">Dismiss</button>`,
});

const recentsSheet = BottomSheet({
  trigger: `target-more`,
  displayOverlay: false,
  webLayout: "sideSheetLeft",
  sideSheetMinValue: 20,
  sideSheetMaxValue: 30,
  sideSheetIconPosition: "right",
  resizablePosition: "right",
  resizeHoverEffect: false,
  snapPoints: ["100%"],
  draggableArea: `<div id="drag">
  <svg width="36" height="4" viewBox="0 0 36 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="4" rx="2" fill="black" fill-opacity="0.22"/>
  </svg>
  <div class="recents-flex"><p class="recents">Recents</p> <img id="close-recents" src="assets/sheet-close.svg" /> </div>
  </div>
  `,
  onOpen: () => {
    document.getElementById("close-recents").addEventListener("click", () => {
      recentsSheet.close();
    });
  },
  footerContent: `<button class="dismiss md footer" id="map-2-target" data-bottomsheet-id="maps-2">Dismiss</button>`,
});

document.getElementById(`maps-1`).addEventListener("scroll", () => {
  if (document.getElementById(`maps-1`).scrollTop > 0) {
    document.getElementById(
      `drag`,
    ).style.borderBottom = `1px solid rgb(0 0 0 / 15%)`;
  } else {
    document.getElementById(`drag`).style.borderBottom = ``;
  }
});
