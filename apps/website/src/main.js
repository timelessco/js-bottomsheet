import BottomSheet from "js-bottomsheet";

// eslint-disable-next-line import/no-unresolved
import "js-bottomsheet/bottomsheet.css";

BottomSheet({
  snapPoints: ["10%", "40%", "100%"],
  draggableArea: `<div id="drag">
  <svg width="36" height="4" viewBox="0 0 36 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="4" rx="2" fill="black" fill-opacity="0.22"/>
  </svg>

  </div>
  `,
  webLayout: "sideSheetLeft",
  dismissible: false,
  content: ` <div id="maps-1" data-bottomsheet><div class="flex-input"><input class="search" placeholder="Search Maps" /><img src="/assets/avatar.png" width="32px" height="32px" /></div><div class="flex"><p class="fav">Favorites</p> <p class="more fav">More</p></div><div class="cont-box"> <div class="fav-box" id="map-target"><img src="./assets/home.svg" /><div> <p class="sm">Home</p><p class="xs">12 min</p></div></div><div class="fav-box" id="map-target">
 <img src="./assets/work.svg" /><div> <p class="sm">Work</p><p class="xs">24 min</p></div></div><div class="fav-box" id="map-target">
<img src="./assets/train.svg" /><div><p class="sm">Transit</p><p class="xs">Nearby</p></div> </div><div class="fav-box" id="map-target"><img src="./assets/pin.svg" /><p class="sm">Add</p></div></div><div class="flex"><p class="fav">Recents</p><p class="more fav">More</p></div><div class="cont-box flex-col"><div class="flex-start" id="map-target" > <img src="./assets/beach.svg" /><div><p class="md" >Palavakkam Beach</p> <p class="xs">Anna Salai, Chennai</p></div></div><div class="flex-start" id="map-target" ><img src="./assets/furniture.svg" /><div><p class="md">Amutha Furniture</p><p class="xs">Keelkattalai, Chennai</p>
</div> </div><div class="flex-start" id="map-target" > <img src="./assets/beach.svg" /><div><p class="md"> ECR Beach</p> <p class="xs">Rajaji Avenue, Chennai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/park.svg" /><div><p class="md" >Kamakoti Nagar Park</p> <p class="xs">Kamakoti Nagar, Pallikaranai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/timeless.svg" /><div><p class="md" >Timeless</p> <p class="xs"> Kamakoti Nagar, Pallikaranai</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/beach.svg" /><div><p class="md" >Rippon Building</p> <p class="xs">Anna Salai, Chennai</p></div></div></div><div class="flex"><p class="fav">My Guides</p></div>
<div class="cont-box flex-col"><div class="flex-start" id="map-target" > <img src="./assets/place.svg" /><div><p class="md" >My Places</p> <p class="xs">6 places</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/frequently.svg" /><div><p class="md" >Frequently</p> <p class="xs">14 places</p></div></div><div class="flex-start" id="map-target" > <img src="./assets/new.svg" /><div><p class="md more" >New Guide</p> </div></div></div>
<button class="dismiss md">Dismiss</button>
</div>`,
  openOnLoad: true,
  sideSheetMinValue: 20,
  sideSheetMaxValue: 30,
  sideSheetIconPosition: "right",
  resizablePosition: "right",
  scaleOnDrag: false,
});

// const bottomsheet2 = BottomSheet({
//   trigger: `map-target`,
//   snapPoints: ["100%"],
//   webLayout: "sideSheetRight",
//   scaleOnDrag: false,
// });

// document.getElementById("done").addEventListener("click", () => {
//   bottomsheet2.close();
// });

// const bottomsheet3 = BottomSheet({
//   trigger: `target-map-3`,
//   displayOverlay: true,
//   snapPoints: ["35%"],
// });
// document.querySelector(".cancel").addEventListener("click", () => {
//   bottomsheet3.close();
// });

BottomSheet({
  trigger: `target-map-4`,
  displayOverlay: true,
  snapPoints: ["100%"],
});

BottomSheet({
  trigger: `target-map-5`,
  displayOverlay: true,
  snapPoints: ["100%"],
});
