export const posterImagesOnResize = response => {
  if (window.innerWidth < 700) {
    document.querySelector(".banner-im").src = response[0].poster.src;
  } else {
    document.querySelector(".banner-im").src = response[0].banner.src;
  }
  document.querySelector(".banner-im").style.filter = "none";
  window.addEventListener("resize", () => {
    if (window.innerWidth < 700) {
      document.querySelector(".banner-im").src = response[0].poster.src;
    } else {
      document.querySelector(".banner-im").src = response[0].banner.src;
    }
  });
};
