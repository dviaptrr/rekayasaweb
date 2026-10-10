/* ============================================================
   Script utama:
   - Navigasi mobile (ergonomis)
   - Animasi "reveal" ala perpustakaan: kartu muncul saat masuk viewport
   ============================================================ */

/* --- Animasi reveal (halus & profesional) --- */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasObserver = "IntersectionObserver" in window;

  let observer = null;
  if (!reduceMotion && hasObserver) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }

  // Dipakai juga oleh koleksi.js setiap kali kartu dirender ulang
  window.revealInit = function () {
    document.querySelectorAll(".reveal:not([data-reveal])").forEach((el) => {
      el.setAttribute("data-reveal", "1");
      if (observer) observer.observe(el);
      else el.classList.add("is-visible");
    });
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  /* --- Navigasi mobile --- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    const setToggleIcon = (open) => {
      toggle.innerHTML = open
        ? '<span class="mdi mdi-close" aria-hidden="true"></span>'
        : '<span class="mdi mdi-menu" aria-hidden="true"></span>';
    };

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      setToggleIcon(open);
    });

    // Tutup menu saat memilih halaman
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        setToggleIcon(false);
      })
    );
  }

  /* --- Aktifkan reveal untuk elemen statis (mis. koleksi unggulan) --- */
  if (window.revealInit) window.revealInit();
});
