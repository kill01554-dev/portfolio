document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. 3D FAMILY CAROUSEL
  ========================================= */

  const familyCarousel = document.querySelector(".carousel");
  const familyNext = document.querySelector(".family-next");
  const familyPrev = document.querySelector(".family-prev");

  let familyRotation = 0;
  const familyStep = 40;

  function rotateFamily(direction) {
    if (!familyCarousel) return;

    familyRotation += direction * familyStep;

    familyCarousel.style.transform = `rotateY(${familyRotation}deg)`;
  }

  familyNext?.addEventListener("click", () => {
    rotateFamily(-1);
  });

  familyPrev?.addEventListener("click", () => {
    rotateFamily(1);
  });

  /* =========================================
     2. OILAM PROJECT SLIDER
  ========================================= */

  const projectSlider = document.querySelector(".project-slider");

  const projectTrack = projectSlider?.querySelector(".project-track");

  const projectSlides = projectSlider
    ? projectSlider.querySelectorAll(".project-slide")
    : [];

  const projectNext = projectSlider?.querySelector(".project-next");

  const projectPrev = projectSlider?.querySelector(".project-prev");

  const projectDots = projectSlider
    ? projectSlider.querySelectorAll(".project-dot")
    : [];

  const currentSlideNumber = projectSlider?.querySelector(".current-slide");

  let currentProject = 0;
  let autoSlideTimer = null;
  let touchStartX = 0;

  const totalProjects = projectSlides.length;
  const AUTOPLAY_DELAY = 5000;

  /* =========================================
     SLIDE NI KO'RSATISH
  ========================================= */

  function showProject(index) {
    if (!projectTrack || totalProjects === 0) return;

    currentProject = (index + totalProjects) % totalProjects;

    projectTrack.style.transform = `translateX(-${currentProject * 100}%)`;

    /* DOTS */

    projectDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentProject;

      dot.classList.toggle("active", isActive);

      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    /* SLIDE HOLATI */

    projectSlides.forEach((slide, slideIndex) => {
      slide.setAttribute(
        "aria-hidden",
        slideIndex === currentProject ? "false" : "true",
      );
    });

    /* SLIDE RAQAMI */

    if (currentSlideNumber) {
      currentSlideNumber.textContent = String(currentProject + 1).padStart(
        2,
        "0",
      );
    }
  }

  /* =========================================
     AVTOMATIK SLIDER
  ========================================= */

  function stopAutoSlide() {
    if (autoSlideTimer !== null) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();

    if (
      totalProjects < 2 ||
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    autoSlideTimer = setInterval(() => {
      showProject(currentProject + 1);
    }, AUTOPLAY_DELAY);
  }

  function restartAutoSlide() {
    startAutoSlide();
  }

  /* =========================================
     NEXT BUTTON
  ========================================= */

  projectNext?.addEventListener("click", () => {
    showProject(currentProject + 1);
    restartAutoSlide();
  });

  /* =========================================
     PREVIOUS BUTTON
  ========================================= */

  projectPrev?.addEventListener("click", () => {
    showProject(currentProject - 1);
    restartAutoSlide();
  });

  /* =========================================
     DOT BUTTONS
  ========================================= */

  projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showProject(index);
      restartAutoSlide();
    });
  });

  /* =========================================
     KEYBOARD CONTROL
  ========================================= */

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const tagName = target?.tagName;

    if (
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      tagName === "SELECT" ||
      target?.isContentEditable
    ) {
      return;
    }

    if (event.key === "ArrowRight" && projectSlider) {
      showProject(currentProject + 1);
      restartAutoSlide();
    } else if (event.key === "ArrowLeft" && projectSlider) {
      showProject(currentProject - 1);
      restartAutoSlide();
    } else if (event.key.toLowerCase() === "d" && projectSlider) {
      showProject(currentProject + 1);
      restartAutoSlide();
    } else if (event.key.toLowerCase() === "a" && projectSlider) {
      showProject(currentProject - 1);
      restartAutoSlide();
    }
  });

  /* =========================================
     TELEFONDA SWIPE QILISH
  ========================================= */

  projectSlider?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );

  projectSlider?.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;

      const difference = touchEndX - touchStartX;

      if (Math.abs(difference) < 50) return;

      showProject(difference < 0 ? currentProject + 1 : currentProject - 1);

      restartAutoSlide();
    },
    { passive: true },
  );

  /* =========================================
     SLIDER USTIGA BORGANDA TO'XTATISH
  ========================================= */

  projectSlider?.addEventListener("mouseenter", stopAutoSlide);

  projectSlider?.addEventListener("mouseleave", startAutoSlide);

  projectSlider?.addEventListener("focusin", stopAutoSlide);

  projectSlider?.addEventListener("focusout", (event) => {
    if (!projectSlider.contains(event.relatedTarget)) {
      startAutoSlide();
    }
  });

  /* =========================================
     TAB YOPILGANDA SLIDERNI TO'XTATISH
  ========================================= */

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  /* =========================================
     SLIDERNI ISHGA TUSHIRISH
  ========================================= */

  showProject(0);
  startAutoSlide();

  /* =========================================
     3. BACKGROUND PARTICLES
  ========================================= */

  const particles = document.getElementById("particles");

  if (particles && !particles.dataset.initialized) {
    particles.dataset.initialized = "true";

    for (let i = 0; i < 55; i++) {
      const dot = document.createElement("span");

      dot.className = "particle";

      dot.style.left = `${Math.random() * 100}%`;

      dot.style.top = `${Math.random() * 100}%`;

      dot.style.setProperty("--speed", `${3 + Math.random() * 7}s`);

      dot.style.animationDelay = `${-Math.random() * 8}s`;

      particles.appendChild(dot);
    }
  }

  /* =========================================
     4. MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector(".navbar nav");

  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
});
