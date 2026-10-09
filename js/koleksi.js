/* ============================================================
   Halaman Koleksi Buku — pencarian & filter real-time
   Prinsip: Simple, Fokus, Ergonomis (umpan balik langsung)
   ============================================================ */

const BOOKS = [
  { title: "Laskar Pelangi",            author: "Andrea Hirata",         category: "fiksi",     year: 2005, status: "tersedia", cover: "#2e7d5b" },
  { title: "Bumi Manusia",              author: "Pramoedya Ananta Toer", category: "fiksi",     year: 1980, status: "dipinjam", cover: "#8d6e3b" },
  { title: "Sapiens",                   author: "Yuval Noah Harari",     category: "sejarah",   year: 2011, status: "tersedia", cover: "#c0392b" },
  { title: "This Earth of Ours",        author: "Pramoedya Ananta Toer", category: "sejarah",   year: 1980, status: "tersedia", cover: "#6b4226" },
  { title: "Artificial Intelligence",   author: "Stuart Russell",        category: "teknologi", year: 2020, status: "tersedia", cover: "#1f4e79" },
  { title: "Clean Code",                author: "Robert C. Martin",      category: "teknologi", year: 2008, status: "dipinjam", cover: "#34495e" },
  { title: "A Brief History of Time",   author: "Stephen Hawking",       category: "sains",     year: 1988, status: "tersedia", cover: "#2c3e50" },
  { title: "The Gene",                  author: "Siddhartha Mukherjee",  category: "sains",     year: 2016, status: "tersedia", cover: "#27ae60" },
  { title: "Si Kancil dan Kura-Kura",   author: "M. Natsir",             category: "anak",      year: 2010, status: "tersedia", cover: "#e67e22" },
  { title: "Malin Kundang",             author: "Hamzah Fansuri",        category: "anak",      year: 2008, status: "dipinjam", cover: "#d35400" },
  { title: "Negeri 5 Menara",           author: "Ahmad Fuadi",           category: "fiksi",     year: 2009, status: "tersedia", cover: "#2980b9" },
  { title: "Sejarah Nusantara",         author: "Suryadi",               category: "sejarah",   year: 2018, status: "tersedia", cover: "#7d3c98" },
  { title: "Pemrograman Web Modern",    author: "Erik Thornstrand",      category: "teknologi", year: 2023, status: "tersedia", cover: "#16a085" },
  { title: "Fisika untuk Semua",        author: "Richard Feynman",       category: "sains",     year: 2015, status: "tersedia", cover: "#2c3e50" },
  { title: "Buku Cerita Anak Islam",    author: "Fara Aini",             category: "anak",      year: 2019, status: "tersedia", cover: "#138d75" },
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
      (b) => `
      <article class="book-card">
        <div class="book-cover" style="background:${b.cover}" aria-hidden="true"></div>
        <div class="book-body">
          <span class="book-tag">${labelCategory(b.category)}</span>
          <h3>${b.title}</h3>
          <p class="book-author">${b.author}</p>
          <div class="book-meta">
            <span>Terbit ${b.year}</span>
            <span class="${b.status === "tersedia" ? "status-available" : "status-borrowed"}">
              ${b.status === "tersedia" ? "● Tersedia" : "● Dipinjam"}
            </span>
          </div>
        </div>
      </article>`
    )
    .join("");

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
