/* Sonali Sahoo – Portfolio scripts (vanilla JS) */
document.documentElement.classList.add("js");

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const toTop = document.getElementById("toTop");

/* 1. Mobile hamburger menu */
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* 2. Sticky navbar shadow + back-to-top button */
function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
  toTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
/* Smooth scrolling for links is handled by CSS (scroll-behavior: smooth). */

/* 3. Highlight the nav link of the section on screen */
const links = [...navLinks.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));

/* 4. Scroll reveal */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* 5. Contact form validation (no backend: shows a success message only) */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const rules = {
  name: v => v.trim().length >= 2 || "Enter your name.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
  subject: v => v.trim().length >= 3 || "Enter a subject.",
  message: v => v.trim().length >= 10 || "Write at least 10 characters."
};
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  Object.keys(rules).forEach(id => {
    const field = form.elements[id];
    const result = rules[id](field.value);
    const ok = result === true;
    document.getElementById(id + "Err").textContent = ok ? "" : result;
    field.classList.toggle("invalid", !ok);
    field.setAttribute("aria-invalid", !ok);
    if (!ok) valid = false;
  });
  status.className = "status " + (valid ? "ok" : "bad");
  status.textContent = valid
    ? "Thank you! Your message has been received."
    : "Please fix the highlighted fields and try again.";
  if (valid) form.reset();
});
