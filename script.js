document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const topBtn = document.getElementById("topBtn");
  const projectsContainer = document.getElementById("projectsContainer");

  // Projects Data Array
  const projects = [
    {
      number: "01",
      title: "Sales Data Dashboard",
      description: "Interactive Power BI and Excel dashboard visualizing regional sales trends, revenue growth, and profit margins.",
      tags: ["Power BI", "Excel", "Data Viz"],
      iconClass: "fa-solid fa-chart-line",
      cardColorClass: "", // Default blue glow
      link: "#"
    },
    {
      number: "02",
      title: "Customer Churn Analysis",
      description: "Exploratory Data Analysis using Python (Pandas/Seaborn) to identify key factors behind customer retention and loss.",
      tags: ["Python", "Pandas", "Statistics"],
      iconClass: "fa-solid fa-magnifying-glass-chart",
      cardColorClass: "purple-card",
      link: "#"
    },
    {
      number: "03",
      title: "SEO Content Strategy Report",
      description: "Data-backed keyword research and structured content mapping that increased organic site traffic by 40%.",
      tags: ["SEO Writing", "Keyword Research", "Analytics"],
      iconClass: "fa-solid fa-file-contract",
      cardColorClass: "green-card",
      link: "#"
    }
  ];

  // Render Projects to HTML
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(project => `
      <article class="service-card ${project.cardColorClass}">
          <div class="card-top">
              <div class="service-icon ${project.cardColorClass.includes('purple') ? 'purple' : project.cardColorClass.includes('green') ? 'green' : 'blue'}">
                  <i class="${project.iconClass}"></i>
              </div>
              <span class="number">${project.number}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tags">
              ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <a href="${project.link}" class="project-link">
              View Project Details <i class="fa-solid fa-arrow-right"></i>
          </a>
      </article>
    `).join('');
  }

  // Mobile Menu Toggle
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

  // Navbar Background Blur on Scroll & Back-to-Top Button
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

  // Smooth Back to Top
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Auto Counter for Stats Numbers
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
