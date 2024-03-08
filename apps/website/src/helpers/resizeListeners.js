export const resizeListeners = () => {
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
};

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
