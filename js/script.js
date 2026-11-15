

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // DARK / LIGHT MODE
  // ==============================

  const themeBtn = document.getElementById("themeBtn");

  const applyTheme = (theme) => {
    document.body.classList.toggle("light", theme === "light");

    if (themeBtn) {
      themeBtn.textContent = theme === "light" ? "☀" : "☾";
      themeBtn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
      themeBtn.setAttribute("title",
        theme === "light" ? "Light Mode" : "Night Mode"
      );
    }

    localStorage.setItem("portfolioTheme", theme);
  };

  const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("light")
        ? "light"
        : "dark";

      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }


  // ==============================
  // MOBILE NAVIGATION
  // ==============================

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  const closeMenu = () => {
    if (!navMenu || !menuBtn) return;

    navMenu.classList.remove("show");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  };

  if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navMenu.classList.toggle("show");

      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("show") &&
        !navMenu.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // ==============================
  // DYNAMIC TYPING EFFECT
  // ==============================

  const roleText = document.getElementById("roleText");

  const roles = [
    "CSE Student",
    "Web Developer",
    "Tech Enthusiast",
    "Programmer"
  ];

  if (roleText) {

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      roleText.textContent = currentRole.substring(0, charIndex);

      let speed = isDeleting ? 55 : 110;

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        speed = 1500;
      }

      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }


  // ==============================
  // DYNAMIC HOVER EFFECT
  // ==============================

  const hoverElements = document.querySelectorAll(
    ".about-card, .contact-card, .skill-card, .project-card, .profile-circle"
  );

  hoverElements.forEach((element) => {

    element.classList.add("dynamic-hover");

    element.addEventListener("pointermove", (event) => {

      if (event.pointerType === "touch") return;

      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);

    });

    element.addEventListener("pointerleave", () => {

      element.style.removeProperty("--mouse-x");
      element.style.removeProperty("--mouse-y");

    });

  });


  // ==============================
  // SMOOTH SECTION NAVIGATION
  // ==============================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // ==============================
  // CURRENT YEAR
  // ==============================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
