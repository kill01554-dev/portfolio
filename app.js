/* =========================================
   3D FAMILY CAROUSEL
========================================= */

const carousel = document.querySelector(".carousel");

const familyNext = document.querySelector(".family-next");
const familyPrev = document.querySelector(".family-prev");

let familyRotation = 0;

const familyStep = 40;

/* NEXT */

familyNext.addEventListener("click", () => {
  familyRotation -= familyStep;

  carousel.style.transform = `rotateY(${familyRotation}deg)`;
});

/* PREVIOUS */

familyPrev.addEventListener("click", () => {
  familyRotation += familyStep;

  carousel.style.transform = `rotateY(${familyRotation}deg)`;
});

/* KEYBOARD */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    familyRotation -= familyStep;

    carousel.style.transform = `rotateY(${familyRotation}deg)`;
  }

  if (event.key === "ArrowLeft") {
    familyRotation += familyStep;

    carousel.style.transform = `rotateY(${familyRotation}deg)`;
  }
});

/* =========================================
   PROJECT SLIDER
========================================= */

const projectTrack = document.querySelector(".project-track");

const projectSlides = document.querySelectorAll(".project-slide");

const projectNext = document.querySelector(".project-next");

const projectPrev = document.querySelector(".project-prev");

const projectDots = document.querySelectorAll(".project-dot");

let currentProject = 0;

const totalProjects = projectSlides.length;

/* SHOW SLIDE */

function showProject(index) {
  if (index < 0) {
    currentProject = totalProjects - 1;
  } else if (index >= totalProjects) {
    currentProject = 0;
  } else {
    currentProject = index;
  }

  projectTrack.style.transform = `translateX(-${currentProject * 100}%)`;

  projectDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentProject);
  });
}

/* NEXT */

projectNext.addEventListener("click", () => {
  showProject(currentProject + 1);
});

/* PREVIOUS */

projectPrev.addEventListener("click", () => {
  showProject(currentProject - 1);
});

/* DOTS */

projectDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showProject(index);
  });
});

/* KEYBOARD FOR PROJECT */

document.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    showProject(currentProject + 1);
  }

  if (event.key === "a") {
    showProject(currentProject - 1);
  }
});

/* =========================================
   AUTO PROJECT SLIDER
========================================= */

let autoSlide = setInterval(() => {
  showProject(currentProject + 1);
}, 5000);

/* RESET AUTOPLAY AFTER CLICK */

function resetAutoSlide() {
  clearInterval(autoSlide);

  autoSlide = setInterval(() => {
    showProject(currentProject + 1);
  }, 5000);
}

projectNext.addEventListener("click", resetAutoSlide);

projectPrev.addEventListener("click", resetAutoSlide);

projectDots.forEach((dot) => {
  dot.addEventListener("click", resetAutoSlide);
});

/* =========================================
   START
========================================= */

showProject(0);
