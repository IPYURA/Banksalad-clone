const mainSlideLength = 6;
let currentPosition = 0;
let currentMainIndex = 0;
let miniSliderCurrentIndex = 0;
let auto;
let device = "";

const makeClone = () => {
  const slideWrap = document.querySelector(".slideWrap");
  const slide = document.querySelectorAll(".slide");
  for (let i = 0; i < mainSlideLength; i++) {
    let cloneSlideSet = slide[i].cloneNode(true);
    cloneSlideSet.classList.add("clone");
    slideWrap.appendChild(cloneSlideSet);
  }
  for (let i = mainSlideLength - 1; i >= 0; i--) {
    let cloneSlideSet = slide[i].cloneNode(true);
    cloneSlideSet.classList.add("clone");
    slideWrap.prepend(cloneSlideSet);
  }
};

const pagerView = (currentIndex) => {
  const pagers = document.querySelectorAll(".pager li");
  pagers.forEach((pager, index) => {
    index === currentIndex
      ? (pager.style.background = "#0099ff")
      : (pager.style.background = "");
  });
};

const resetSliderPosition = () => {
  const slideFrame = document.querySelector(".slideWrap");
  setTimeout(() => {
    slideFrame.style.transition = "none";
    slideFrame.style.left = "-600vw";
    currentMainIndex = 0;
  }, 500);
  setTimeout(() => {
    slideFrame.style.transition = "all 0.3s linear";
  }, 600);
};

const moveMainSlider = () => {
  const slideFrame = document.querySelector(".slideWrap");
  const slideLocation = [
    "-600vw",
    "-700vw",
    "-800vw",
    "-900vw",
    "-1000vw",
    "-1100vw",
    "-1200vw",
  ];
  slideFrame.style.left = slideLocation[currentMainIndex];
};

const autoSlide = () => {
  auto = setInterval(() => {
    currentMainIndex++;
    moveMainSlider();
    pagerView(currentMainIndex);

    if (currentMainIndex === mainSlideLength) {
      pagerView(0);
      resetSliderPosition();
    }
  }, 2500);
};

const stopSlide = () => {
  clearInterval(auto);
};

const clickPager = () => {
  const pagerWrap = document.querySelector(".pager");
  const pagers = document.querySelectorAll(".pager li");
  pagers.forEach((pager, index) => {
    pager.addEventListener("click", () => {
      stopSlide();
      currentMainIndex = index;
      pagerView(currentMainIndex);
      moveMainSlider();
    });
  });
  pagerWrap.addEventListener("mouseenter", () => {
    stopSlide();
  });
};

const hoverSlide = () => {
  const slideFrame = document.querySelector(".slideWrap");
  slideFrame.addEventListener("mouseenter", () => {
    stopSlide();
  });
  slideFrame.addEventListener("mouseleave", () => {
    autoSlide();
  });
};

const gnbMenuHover = () => {
  const gnbMenu = document.querySelectorAll(".gnb > li");
  const gnbContents = document.querySelectorAll(".lnbWrap");
  gnbMenu.forEach((element, index) => {
    element.addEventListener("mouseenter", () => {
      gnbContents.forEach((content, idx) => {
        if (index === idx) {
          content.style.display = "flex";
        } else {
          content.style.display = "none";
        }
        content.addEventListener("mouseleave", () => {
          content.style.display = "none";
        });
      });
    });
  });
};

const mobileNavOpen = () => {
  const mobileNavButton = document.querySelector(".openNavButton");
  const openNav = document.querySelector(".openNav");
  const openNavSpan = document.querySelectorAll(".openNavButton span");
  mobileNavButton.addEventListener("click", () => {
    openNav.classList.toggle("opened");
    openNavSpan.forEach((span) => {
      span.classList.toggle("open");
    });
  });
};

const lnbOpen = () => {
  const lnbOpenButtons = document.querySelectorAll(
    ".openNavContainer > li > .fa-angle-down"
  );
  const mobileLnbs = document.querySelectorAll(".mb-lnbContainer");
  lnbOpenButtons.forEach((lnbOpenBtn, index) => {
    lnbOpenBtn.addEventListener(
      "click",
      () => {
        mobileLnbs[index].classList.toggle("visible");
      },
      true
    );
  });
};

const checkLimit = (currentNum, maxIndex) => {
  if (currentNum > maxIndex) {
    miniSliderCurrentIndex = 0;
  }
  if (currentNum < 0) {
    miniSliderCurrentIndex = maxIndex;
  }
};

const setMoveDirection = (maxIndex, isNext) => {
  isNext ? miniSliderCurrentIndex++ : miniSliderCurrentIndex--;
  checkLimit(miniSliderCurrentIndex, maxIndex);
};

const moveMiniSlider = (target) => {
  let slideLocation = [];
  device === "MOBILE"
    ? (slideLocation = ["0", "-44vw", "-88vw", "-132vw"])
    : (slideLocation = ["0", "-204.5px", "-409px", "-613.5px"]);
  target.style.marginLeft = slideLocation[miniSliderCurrentIndex];
};

const clickPrevBtn = () => {
  const sliderCategory = ["amout1", "amount2", "amount3", "amount4"];
  const prevBtns = document.querySelectorAll(".pickPrev");
  prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener("click", (e) => {
      let str = String(e.target.parentNode.classList);
      sliderCategory.forEach((category, idx) => {
        if (str.includes(category)) {
          setMoveDirection(idx, false);
        }
      });
      moveMiniSlider(e.target.parentNode);
    });
  });
};

const clickNextBtn = () => {
  const sliderCategory = ["amout1", "amount2", "amount3", "amount4"];
  const nextBtns = document.querySelectorAll(".pickNext");
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", (e) => {
      let str = String(e.target.parentNode.classList);
      sliderCategory.forEach((category, idx) => {
        if (str.includes(category)) {
          setMoveDirection(idx, true);
        }
      });
      moveMiniSlider(e.target.parentNode);
    });
  });
};

const checkDevice = () => {
  if (window.innerWidth > 717) {
    device = "TABLET/PC";
  } else if (window.innerWidth <= 717) {
    device = "MOBILE";
  }
};

window.addEventListener("scroll", () => {
  const mobileHeader = document.querySelector(".mobileHeader");
  const header = document.querySelector("header");
  if (scrollY > 90) {
    header.classList.add("active");
    mobileHeader.classList.add("mobileActive");
  } else {
    header.classList.remove("active");
    mobileHeader.classList.remove("mobileActive");
  }
});

window.addEventListener("resize", () => {
  checkDevice();
});

window.addEventListener("load", () => {
  makeClone();
  pagerView(0);
  autoSlide();
  checkDevice();
});

clickPager();
lnbOpen();
gnbMenuHover();
mobileNavOpen();
hoverSlide();
clickPrevBtn();
clickNextBtn();
