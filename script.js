const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const byId = new Map(
  links.map((link) => [link.getAttribute("href").replace("#", ""), link])
);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    links.forEach((link) => link.classList.remove("is-active"));
    byId.get(visible.target.id)?.classList.add("is-active");
  },
  {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0.2, 0.4, 0.6],
  }
);

sections.forEach((section) => observer.observe(section));
