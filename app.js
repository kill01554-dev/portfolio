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

javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     3D FAMILY CAROUSEL
  ========================= */

  const carousel = document.querySelector(".carousel");
  const familyNext = document.querySelector(".family-next");
  const familyPrev = document.querySelector(".family-prev");

  let familyRotation = 0;
  const familyStep = 40;

  function rotateFamily(direction) {
    if (!carousel) return;

    familyRotation += direction * familyStep;
    carousel.style.transform = `rotateY(${familyRotation}deg)`;
  }

  familyNext?.addEventListener("click", () => rotateFamily(-1));
  familyPrev?.addEventListener("click", () => rotateFamily(1));

  /* =========================
     PROJECT SLIDER
  ========================= */

  const projectTrack = document.querySelector(".project-track");
  const projectSlides = document.querySelectorAll(".project-slide");
  const projectNext = document.querySelector(".project-next");
  const projectPrev = document.querySelector(".project-prev");
  const projectDots = document.querySelectorAll(".project-dot");

  let currentProject = 0;
  let autoSlide = null;

  function showProject(index) {
    if (!projectTrack || projectSlides.length === 0) return;

    currentProject =
      (index + projectSlides.length) % projectSlides.length;

    projectTrack.style.transform =
      `translateX(-${currentProject * 100}%)`;

    projectDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentProject);
      dot.setAttribute("aria-current",
        i === currentProject ? "true" : "false");
    });
  }

  function startAutoSlide() {
    clearInterval(autoSlide);

    if (projectSlides.length > 1) {
      autoSlide = setInterval(() => {
        showProject(currentProject + 1);
      }, 5000);
    }
  }

  projectNext?.addEventListener("click", () => {
    showProject(currentProject + 1);
    startAutoSlide();
  });

  projectPrev?.addEventListener("click", () => {
    showProject(currentProject - 1);
    startAutoSlide();
  });

  projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showProject(index);
      startAutoSlide();
    });
  });

  /* Klaviatura */

  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName;

    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (event.key === "ArrowRight") {
      rotateFamily(-1);
    }

    if (event.key === "ArrowLeft") {
      rotateFamily(1);
    }

    if (event.key.toLowerCase() === "d") {
      showProject(currentProject + 1);
      startAutoSlide();
    }

    if (event.key.toLowerCase() === "a") {
      showProject(currentProject - 1);
      startAutoSlide();
    }
  });

  /* Dastlabki holat */
  showProject(0);
  startAutoSlide();

});





/* FON UCHUN ZARRALAR */
const particles = document.getElementById("particles");

for (let i = 0; i < 55; i++) {
  const dot = document.createElement("span");

  dot.className = "particle";
  dot.style.left = Math.random() * 100 + "%";
  dot.style.top = Math.random() * 100 + "%";

  dot.style.setProperty(
    "--speed",
    3 + Math.random() * 7 + "s"
  );

  dot.style.animationDelay =
    -Math.random() * 8 + "s";

  particles.appendChild(dot);
}

/* MOBIL MENYU */
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});
