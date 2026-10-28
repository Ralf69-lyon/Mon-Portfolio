/* ============================================================
   Portfolio — script minimal (aucune dépendance).
   1. Ouverture/fermeture des détails d'une réalisation
   2. Apparition des cartes au défilement (IntersectionObserver)
   3. Bouton "retour en haut"
   ============================================================ */

// ---------- 1. Détails des réalisations ----------

const toggles = document.querySelectorAll(".project-toggle");

toggles.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card--project");
    const detail = document.querySelector("#" + button.getAttribute("aria-controls"));
    const isOpen = !detail.hidden;

    detail.hidden = isOpen;
    card.classList.toggle("is-open", !isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

// ---------- 2. Apparition au défilement ----------

const revealItems = document.querySelectorAll(".reveal");

// Réserve : si IntersectionObserver n'est pas disponible, tout est affiché.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // une seule animation par carte
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

// ---------- 3. Bouton retour en haut ----------

const backToTop = document.getElementById("backToTop");

function refreshBackToTop() {
  backToTop.hidden = window.scrollY < 400;
}

window.addEventListener("scroll", refreshBackToTop, { passive: true });
refreshBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
