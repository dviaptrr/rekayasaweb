/* ============================================================
   Halaman Koleksi Buku — pencarian & filter real-time
   Prinsip: Simple, Fokus, Ergonomis (umpan balik langsung)
   ============================================================ */

const BOOKS = [
  { title: "Laskar Pelangi",            author: "Andrea Hirata",         category: "fiksi",     year: 2005, status: "tersedia", cover: "#2e7d5b", img: "assets/covers/laskar-pelangi.svg" },
  { title: "Bumi Manusia",              author: "Pramoedya Ananta Toer", category: "fiksi",     year: 1980, status: "dipinjam", cover: "#8d6e3b", img: "assets/covers/bumi-manusia.svg" },
  { title: "Sapiens",                   author: "Yuval Noah Harari",     category: "sejarah",   year: 2011, status: "tersedia", cover: "#c0392b", img: "assets/covers/sapiens.svg" },
  { title: "This Earth of Ours",        author: "Pramoedya Ananta Toer", category: "sejarah",   year: 1980, status: "tersedia", cover: "#6b4226", img: "assets/covers/this-earth-of-ours.svg" },
  { title: "Artificial Intelligence",   author: "Stuart Russell",        category: "teknologi", year: 2020, status: "tersedia", cover: "#1f4e79", img: "assets/covers/artificial-intelligence.svg" },
  { title: "Clean Code",                author: "Robert C. Martin",      category: "teknologi", year: 2008, status: "dipinjam", cover: "#34495e", img: "assets/covers/clean-code.svg" },
  { title: "A Brief History of Time",   author: "Stephen Hawking",       category: "sains",     year: 1988, status: "tersedia", cover: "#2c3e50", img: "assets/covers/a-brief-history-of-time.svg" },
  { title: "The Gene",                  author: "Siddhartha Mukherjee",  category: "sains",     year: 2016, status: "tersedia", cover: "#27ae60", img: "assets/covers/the-gene.svg" },
  { title: "Si Kancil dan Kura-Kura",   author: "M. Natsir",             category: "anak",      year: 2010, status: "tersedia", cover: "#e67e22", img: "assets/covers/si-kancil-dan-kura-kura.svg" },
  { title: "Malin Kundang",             author: "Hamzah Fansuri",        category: "anak",      year: 2008, status: "dipinjam", cover: "#d35400", img: "assets/covers/malin-kundang.svg" },
  { title: "Negeri 5 Menara",           author: "Ahmad Fuadi",           category: "fiksi",     year: 2009, status: "tersedia", cover: "#2980b9", img: "assets/covers/negeri-5-menara.svg" },
  { title: "Sejarah Nusantara",         author: "Suryadi",               category: "sejarah",   year: 2018, status: "tersedia", cover: "#7d3c98", img: "assets/covers/sejarah-nusantara.svg" },
  { title: "Pemrograman Web Modern",    author: "Erik Thornstrand",      category: "teknologi", year: 2023, status: "tersedia", cover: "#16a085", img: "assets/covers/pemrograman-web-modern.svg" },
  { title: "Fisika untuk Semua",        author: "Richard Feynman",       category: "sains",     year: 2015, status: "tersedia", cover: "#2c3e50", img: "assets/covers/fisika-untuk-semua.svg" },
  { title: "Buku Cerita Anak Islam",    author: "Fara Aini",             category: "anak",      year: 2019, status: "tersedia", cover: "#138d75", img: "assets/covers/buku-cerita-anak-islam.svg" },
];

// DOM elements
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const bookGrid = document.getElementById("bookGrid");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const totalCount = document.getElementById("totalCount");

let activeCategory = "semua";
let query = "";

// Render kartu buku (HTML aman dari karakter khusus)
function render() {
  const q = query.trim().toLowerCase();

  const filtered = BOOKS.filter((b) => {
    const matchCategory = activeCategory === "semua" || b.category === activeCategory;
    const matchQuery =
      q === "" ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  bookGrid.innerHTML = filtered
    .map(
      (b, i) => `
      <article class="book-card reveal" style="--i:${i}">
        <div class="book-cover">
          <img src="${b.img}" alt="Sampul buku ${b.title} karya ${b.author}" loading="lazy" width="300" height="420">
        </div>
        <div class="book-body">
          <span class="book-tag">${labelCategory(b.category)}</span>
          <h3>${b.title}</h3>
          <p class="book-author">${b.author}</p>
          <div class="book-meta">
            <span>Terbit ${b.year}</span>
            <span class="${b.status === "tersedia" ? "status-available" : "status-borrowed"}">
              <i class="mdi ${b.status === "tersedia" ? "mdi-check-circle" : "mdi-close-circle"}" aria-hidden="true"></i>
              ${b.status === "tersedia" ? "Tersedia" : "Dipinjam"}
            </span>
          </div>
        </div>
      </article>`
    )
    .join("");

  // Aktifkan animasi reveal untuk kartu yang baru dirender
  if (window.revealInit) window.revealInit();

  resultCount.textContent = filtered.length;
  totalCount.textContent = BOOKS.length;
  emptyState.hidden = filtered.length !== 0;
}

function labelCategory(cat) {
  return { fiksi: "Fiksi", sejarah: "Sejarah", teknologi: "Teknologi", sains: "Sains", anak: "Anak" }[cat] || cat;
}

// Event: pencarian (umpan balik langsung saat mengetik)
searchInput.addEventListener("input", (e) => {
  query = e.target.value;
  render();
});

// Event: filter kategori
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.category;
    render();
  });
});

render();
