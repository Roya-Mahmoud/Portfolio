/**
 * Roya Mahmoud Portfolio - Interactive Scripts
 * Handles mobile navigation, tab filtering, scroll reveal, and smooth navigation.
 */
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = document.querySelectorAll(".nav-links a");

  // --- 1. Responsive Mobile Navigation ---
  if (menuBtn && navLinks) {
    const toggleMenu = (forceClose = false) => {
      const willBeOpen = forceClose ? false : !navLinks.classList.contains("open");
      navLinks.classList.toggle("open", willBeOpen);
      menuBtn.classList.toggle("active", willBeOpen);
      menuBtn.setAttribute("aria-expanded", String(willBeOpen));
    };

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navAnchors.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(true));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(true);
      }
    });

    // Close menu on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        toggleMenu(true);
      }
    });

    // Auto close when resized to desktop viewport
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && navLinks.classList.contains("open")) {
        toggleMenu(true);
      }
    });
  }

  // --- 2. Dynamic Universal Case Study Loader (project.html) ---
  const isProjectPage = currentPath === "project.html";
  let activeProjectCategory = null;

  if (isProjectPage) {
    const projectData = {
      velvet: {
        category: "uiux",
        title: "Velvet – Fabric Mobile App Case Study | Roya Mahmoud",
        metaDesc: "Velvet fabric mobile app UI/UX case study by Roya Mahmoud — e-commerce mobile app for exploring premium fabrics.",
        backHref: "uiux.html",
        backLabel: "Back to UI/UX Projects",
        image: "assets/velvet_casestudy.png",
        alt: "Velvet – Fabric Mobile App case study by Roya Mahmoud, showing UI screens, user flows, brand colors, and interactive prototype"
      },
      yummy: {
        category: "uiux",
        title: "Yummy Bite – Food Delivery App Case Study | Roya Mahmoud",
        metaDesc: "Yummy Bite food delivery app UI/UX case study by Roya Mahmoud — modern, warm UI kit for meal exploration and fast checkout.",
        backHref: "uiux.html",
        backLabel: "Back to UI/UX Projects",
        image: "assets/yummy_casestudy.png",
        alt: "Yummy Bite – Food Delivery App case study by Roya Mahmoud, showing UI screens, user flows, and visual design"
      },
      zakaty: {
        category: "uiux",
        title: "Zakaty – Zakat & Charity App Case Study | Roya Mahmoud",
        metaDesc: "Zakaty UI/UX case study by Roya Mahmoud — a smart Islamic finance companion for calculating and managing Zakat.",
        backHref: "uiux.html",
        backLabel: "Back to UI/UX Projects",
        image: "assets/zakaty_casestudy.png",
        alt: "Zakaty – Zakat and Charity App case study by Roya Mahmoud, showing UI screens, user flows, and visual design"
      },
      trusteye: {
        category: "uiux",
        title: "TrustEye – AI Image Verification & Protection App Case Study | Roya Mahmoud",
        metaDesc: "TrustEye AI image verification platform and photo protection mobile app UI/UX case study by Roya Mahmoud.",
        backHref: "uiux.html",
        backLabel: "Back to UI/UX Projects",
        image: "assets/trusteye_casestudy.png",
        alt: "TrustEye – AI Image Verification & Protection App Case Study by Roya Mahmoud, showing AI analysis screens, tampering detection, and verification flow"
      },
      skillup: {
        category: "uiux",
        title: "SkillUp – Career Development Platform Case Study | Roya Mahmoud",
        metaDesc: "SkillUp career development platform UI/UX case study by Roya Mahmoud — focused on upskilling, mentorship, and professional growth.",
        backHref: "uiux.html",
        backLabel: "Back to UI/UX Projects",
        isComingSoon: true,
        heading: "SkillUp – Career Development Platform",
        desc: "A comprehensive career development platform UI/UX case study focused on upskilling, mentorship, and professional growth. Full case study coming soon."
      },
      ewaste: {
        category: "web",
        title: "E-Waste – Recycling Platform Web Design Case Study | Roya Mahmoud",
        metaDesc: "E-Waste recycling platform web design case study by Roya Mahmoud — clean, eco-friendly web platform for selling, recycling, and tracking devices through certified recycling centers.",
        backHref: "web.html",
        backLabel: "Back to Web Design Projects",
        image: "assets/E-waste_casestudy.png",
        alt: "E-Waste – Recycling Platform Web Design case study by Roya Mahmoud, showing responsive web layouts, eco-friendly branding, device trade-in flow, and modern user interface"
      },
      bookhouse: {
        category: "web",
        title: "BookHouse – Online Bookstore Web Design Case Study | Roya Mahmoud",
        metaDesc: "BookHouse online bookstore web design case study by Roya Mahmoud — modern and elegant bookstore experience with clean navigation, curated categories, and an intuitive e-commerce layout.",
        backHref: "web.html",
        backLabel: "Back to Web Design Projects",
        image: "assets/Bookhouse_casestudy.png",
        alt: "BookHouse – Online Bookstore Web Design case study by Roya Mahmoud, showing bookstore storefront, category navigation, book details, and seamless checkout design"
      }
    };

    // Aliases for friendly IDs and backward compatibility
    projectData["project1_uiux"] = projectData.velvet;
    projectData["project2_uiux"] = projectData.yummy;
    projectData["project3_uiux"] = projectData.zakaty;
    projectData["project4_uiux"] = projectData.trusteye;
    projectData["project5_uiux"] = projectData.skillup;
    projectData["project1_web"] = projectData.ewaste;
    projectData["e-waste"] = projectData.ewaste;
    projectData["project2_web"] = projectData.bookhouse;

    // Detect projectId from search params (?id=...) or hash (#...)
    const params = new URLSearchParams(window.location.search);
    const rawId = (params.get("id") || params.get("project") || window.location.hash.replace("#", "") || "velvet").toLowerCase();
    const project = projectData[rawId] || projectData.velvet;
    activeProjectCategory = project.category;

    // Set page title and meta description
    document.title = project.title;
    const metaEl = document.getElementById("metaDesc");
    if (metaEl) metaEl.setAttribute("content", project.metaDesc);

    // Set back link destination and label
    const backLink = document.getElementById("projectBackLink");
    const backText = document.getElementById("projectBackText");
    if (backLink && backText) {
      backLink.href = project.backHref;
      backLink.setAttribute("aria-label", project.backLabel);
      backText.textContent = project.backLabel;
    }

    // Set content (image or coming-soon state)
    const imgEl = document.getElementById("projectImage");
    const csBox = document.getElementById("projectComingSoon");
    const csHeading = document.getElementById("csHeading");
    const csDesc = document.getElementById("csDesc");

    if (project.isComingSoon) {
      if (imgEl) imgEl.style.display = "none";
      if (csBox) {
        csBox.style.display = "flex";
        if (csHeading) csHeading.textContent = project.heading;
        if (csDesc) csDesc.textContent = project.desc;
      }
    } else {
      if (csBox) csBox.style.display = "none";
      if (imgEl) {
        imgEl.src = project.image;
        imgEl.alt = project.alt;
        imgEl.style.display = "block";
      }
    }
  }

  // --- 3. Active Navigation Tab Highlight ---
  navAnchors.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || link.classList.contains("nav-cta")) return;

    const isHome = href === "index.html" && (currentPath === "index.html" || currentPath === "");
    const isUIUX = href === "uiux.html" && (
      currentPath === "uiux.html" ||
      (currentPath.includes("project") && currentPath.includes("uiux")) ||
      (isProjectPage && activeProjectCategory === "uiux")
    );
    const isWeb = href === "web.html" && (
      currentPath === "web.html" ||
      (currentPath.includes("project") && currentPath.includes("web")) ||
      (isProjectPage && activeProjectCategory === "web")
    );

    if (isHome || isUIUX || isWeb) {
      link.classList.add("active-page");
    } else {
      link.classList.remove("active-page");
    }
  });

  // --- 3. Smooth In-Page Scrolling for Hash Links ---
  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const pagePart = href.substring(0, hashIndex);
        const targetId = href.substring(hashIndex + 1);
        const isCurrentPage =
          pagePart === "" ||
          pagePart === currentPath ||
          (pagePart === "index.html" && (currentPath === "index.html" || currentPath === ""));

        if (isCurrentPage) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
            history.pushState(null, null, "#" + targetId);
          }
        }
      }
    });
  });

  // --- 4. Portfolio Tabs & Category Filtering (Home Page) ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (tabButtons.length > 0 && projectCards.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const selected = button.dataset.tab;
        projectCards.forEach((card) => {
          const category = card.dataset.category;
          const shouldShow = selected === "all" || selected === category;
          card.classList.toggle("hidden", !shouldShow);
        });
      });
    });
  }

  // --- 5. Scroll Reveal Animations ---
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length > 0) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("visible"));
    }
  }
});
