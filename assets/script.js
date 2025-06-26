// ===================================
// CUSC-UIIS Landing Page JavaScript
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. INITIALIZE AOS ANIMATIONS
  // ===================================

  // ===================================
  // 2. NAVBAR SCROLL EFFECTS
  // ===================================
  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Add scrolled class to navbar
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Highlight active nav link based on scroll position
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    highlightActiveNavLink();
  });

  // ===================================
  // 3. SMOOTH SCROLLING FOR NAV LINKS
  // ===================================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // ===================================
  // 4. TYPEWRITER EFFECT FOR HERO TITLE
  // ===================================
  // const typewriterElement = document.getElementById("typewriter");
  // if (typewriterElement) {
  //   const typed = new Typed("#typewriter", {
  //     strings: ["Hệ thống tích hợp Quản lý đào tạo CUSC-UIIS"],
  //     typeSpeed: 50, // tốc độ gõ (ms)
  //     backSpeed: 30,
  //     loop: false,
  //     showCursor: true,
  //     cursorChar: "|",
  //     smartBackspace: false,  // không cần thông minh xóa
  //     backDelay: 999999, // delay dài để chắc chắn không xóa
  //     onComplete: () => {
  //       // Hide cursor after completion
  //       setTimeout(() => {
  //         document.querySelector(".typed-cursor").style.display = "none";
  //       }, 2000);
  //     },
  //   });
  // }

  // ===================================
  // 5. COUNTER ANIMATION FOR STATS
  // ===================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  }

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.getAttribute("data-count"));
            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats-container");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ===================================
  // 6. MODEL SECTION INTERACTIVE TABS
  // ===================================
  const modelButtons = document.querySelectorAll(".model-btn");
  const modelContents = document.querySelectorAll(".model-content");

  modelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Remove active class from all buttons and contents
      modelButtons.forEach((btn) => btn.classList.remove("active"));
      modelContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // ===================================
  // 7. FLOATING ICONS ANIMATION
  // ===================================
  function createFloatingAnimation() {
    const floatingIcons = document.querySelectorAll(".floating-icon");

    floatingIcons.forEach((icon, index) => {
      // Random animation delay
      const delay = Math.random() * 2;
      icon.style.animationDelay = `${delay}s`;

      // Random movement on mouse move
      document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;

        icon.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  createFloatingAnimation();

  // ===================================
  // 8. SCROLL REVEAL ANIMATIONS
  // ===================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe elements for reveal animation
  const revealElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .trust-card, .achievement-card"
  );
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ===================================
  // 9. MODAL ENHANCEMENTS
  // ===================================
  const contactModal = document.getElementById("contactModal");
  if (contactModal) {
    contactModal.addEventListener("show.bs.modal", function () {
      // Add entrance animation
      this.querySelector(".modal-dialog").classList.add("slide-up");
    });

    contactModal.addEventListener("hidden.bs.modal", function () {
      // Remove animation class
      this.querySelector(".modal-dialog").classList.remove("slide-up");
    });
  }

  // ===================================
  // 10. PERFORMANCE OPTIMIZATIONS
  // ===================================

  // Lazy load images
  const images = document.querySelectorAll('img[src*="placeholder"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add loading animation
        img.style.opacity = "0.5";
        img.style.transition = "opacity 0.3s ease";

        // Simulate image load
        setTimeout(() => {
          img.style.opacity = "1";
        }, 300);

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Throttle scroll events
  let scrollTimeout;
  function throttleScroll(callback, delay) {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      callback();
      scrollTimeout = null;
    }, delay);
  }

  // ===================================
  // 11. ACCESSIBILITY ENHANCEMENTS
  // ===================================

  // Keyboard navigation for model buttons
  modelButtons.forEach((button) => {
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Focus management for modal
  if (contactModal) {
    contactModal.addEventListener("shown.bs.modal", function () {
      const firstFocusable = this.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  }

  // ===================================
  // 12. MOBILE OPTIMIZATIONS
  // ===================================

  // Touch events for mobile
  if ("ontouchstart" in window) {
    // Add touch feedback for cards
    const touchCards = document.querySelectorAll(
      ".feature-card, .benefit-card, .trust-card"
    );
    touchCards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)";
      });

      card.addEventListener("touchend", function () {
        this.style.transform = "";
      });
    });
  }

  // Optimize animations for mobile
  function optimizeForMobile() {
    if (window.innerWidth < 768) {
      // Reduce animation complexity on mobile
      const floatingIcons = document.querySelectorAll(".floating-icon");
      floatingIcons.forEach((icon) => {
        icon.style.display = "none";
      });
    }
  }

  optimizeForMobile();
  window.addEventListener("resize", optimizeForMobile);

  // ===================================
  // 13. ERROR HANDLING
  // ===================================

  // Global error handler
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
    // Could send error to analytics service
  });

  // Handle failed image loads
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=200&width=300&text=Image+Not+Found";
      this.alt = "Image not available";
    });
  });

  // ===================================
  // 14. ANALYTICS & TRACKING
  // ===================================

  // Track button clicks
  const ctaButtons = document.querySelectorAll(".btn-cta, .btn-primary");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      console.log("CTA clicked:", buttonText);
      // Could send to analytics service
      // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
  });

  // Track section visibility
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          console.log("Section viewed:", sectionId);
          // Could send to analytics service
          // gtag('event', 'section_view', { 'section_id': sectionId });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  // ===================================
  // 15. INITIALIZATION COMPLETE
  // ===================================

  console.log("CUSC-UIIS Landing Page initialized successfully");

  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded");

  // Infinite Logo Carousel
  initLogoCarousel();
});

// ===================================
// 16. UTILITY FUNCTIONS
// ===================================

// Smooth scroll to element
function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

// Get device type
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

// ===================================
// 17. EXPORT FOR TESTING
// ===================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    scrollToElement,
    formatNumber,
    isInViewport,
    debounce,
    getDeviceType,
  };
}

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Initialize Bootstrap Collapse
const bsCollapse = new bootstrap.Collapse(
  document.querySelector(".navbar-collapse"),
  {
    toggle: false,
  }
);

// ===================================
// 18. CLIENT CAROUSEL
// ===================================
// Infinite Logo Carousel
function initLogoCarousel() {
    const track = document.querySelector('.clients-track');
    if (!track) return;

    // Clone logos for seamless loop
    const logos = track.querySelectorAll('.client-logo');
    const totalLogos = logos.length;
    
    // Optimize animation performance
    track.style.willChange = 'transform';
    
    // Pause animation on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Optimize for mobile devices
    if (window.innerWidth <= 768) {
        track.style.animationDuration = '30s';
    }
}

// Reinitialize on window resize
window.addEventListener('resize', debounce(() => {
    initLogoCarousel();
}, 250));

// Scroll To Top Button
(function () {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;
    window.addEventListener("scroll", function () {
        if (window.scrollY > window.innerHeight * 0.1) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();
