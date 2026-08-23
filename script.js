document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const topBtn = document.getElementById("topBtn");
  const container = document.getElementById('projectsContainer');

  // 1. Mobile Menu Drawer Toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuBtn.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // 2. Navbar Background Blur on Scroll & Back-to-Top Button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  // 3. Smooth Back to Top
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. Auto Counter for Stats Numbers
  const statNumbers = document.querySelectorAll("[data-target]");
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach((num) => {
      const target = +num.getAttribute("data-target");
      const increment = target / 50;
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          num.innerText = Math.ceil(current);
          setTimeout(updateCount, 30);
        } else {
          num.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Scroll Trigger for Numbers
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    window.addEventListener("scroll", () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (sectionPos < screenPos && !animated) {
        animateStats();
        animated = true;
      }
    });
  }
});
