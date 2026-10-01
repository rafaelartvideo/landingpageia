const header = document.querySelector(".site-header");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const photoFrame = document.querySelector("#photoFrame");
const year = document.querySelector("#currentYear");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks?.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".faq-list details[open]").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((element, index) => {
    if (index > 1) {
      element.style.transitionDelay = String(Math.min((index % 3) * 0.07, 0.14)) + "s";
    }
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}

if (photoFrame && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const visual = photoFrame.closest(".hero-visual");

  visual?.addEventListener("mousemove", (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    photoFrame.style.transform =
      "perspective(900px) rotateY(" + x * 4 + "deg) rotateX(" + y * -4 + "deg) translate3d(0, -2px, 0)";
  });

  visual?.addEventListener("mouseleave", () => {
    photoFrame.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)";
  });
}