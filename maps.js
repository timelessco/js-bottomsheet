import BottomSheet from "./lib/bottomsheet.es";

let bottomsheet1 = BottomSheet({
  snapPoints: ["20%", "40%", "100%"],
  draggableArea: `<div id="drag">
  <svg  width="45" height="7" viewBox="0 0 45 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="45" height="7" rx="3.5" fill="#38383D"/>
  </svg>
  </div>
  `,
  dismissible: false,
  content: ` <div id="maps-1" data-bottomsheet><input class="search" placeholder="Search Maps" /><div class="flex">
 <p class="fav">Favourites</p> <!-- <p class="more">More</p> --></div><div class="cont-box"> <div class="fav-box" id="map-target" data-bottomsheet-id="maps-2"><figure class="round"><img src="./assets/home.svg" width="30" height="30" /></figure> <p class="sm">Home</p></div><div class="fav-box" id="map-target" data-bottomsheet-id="maps-2">
<figure class="round"> <img src="./assets/work.svg" width="30" height="30" /></figure> <p class="sm">Work</p></div><div class="fav-box" id="map-target" data-bottomsheet-id="maps-2">
<figure class="round"><img src="./assets/train.svg" width="30" height="30" /></figure><p class="sm">Transit</p> </div><div class="fav-box" id="map-target" data-bottomsheet-id="maps-2"><figure class="round"><img src="./assets/pin.svg" width="30" height="30" /></figure><p class="sm">6th street</p></div></div><div class="flex"><p class="fav">Recents</p></div><div class="cont-box"><div><div class="flex-start" id="map-target" data-bottomsheet-id="maps-2" ><figure class="round-2"> <img src="./assets/pin.svg" width="20" height="20" /></figure><div><p class="md" >Dropped Pin</p> <p class="xs">Chennai</p></div></div><div class="flex-start" id="map-target" data-bottomsheet-id="maps-2" ><figure class="round-2"><img src="./assets/arrow.svg" width="18" height="18" /></figure><div><p class="md">6th street</p><p class="xs">From my location</p>
</div> </div></div></div><div class="share"><button class="surround" id="target-map-3" data-bottomsheet-id="maps-3" ><p class="more">Share My Location</p></button><button class="surround" id="target-map-3" data-bottomsheet-id="maps-3"> <p class="more">Mark My Location</p></button><button class="surround" id="target-map-3" data-bottomsheet-id="maps-3"> <p class="more">Report An Issue</p></button><button class="surround" id="target-map-3" data-bottomsheet-id="maps-3"><p class="more">Report An Issue</p></button></div></div>`,
  openOnLoad: true,
});

let bottomsheet2 = BottomSheet({
  trigger: `map-target`,
});
document.getElementById("done").addEventListener("click", () => {
  bottomsheet2.close();
});

let bottomsheet3 = BottomSheet({
  trigger: `target-map-3`,
  displayOverlay: true,
  snapPoints: ["35%"],
});
document.querySelector(".cancel").addEventListener("click", () => {
  bottomsheet3.close();
});
