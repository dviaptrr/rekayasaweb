# Prototype Website — Perpustakaan Nusantara

Website prototype statis (HTML + CSS + JavaScript) tanpa framework.
Buka **`index.html`** di browser, atau jalankan lewat XAMPP:
`http://localhost/tes.ai/index.html`

## Struktur Halaman (3 halaman utama)

| Halaman | File | Fungsi |
|---|---|---|
| **Beranda (Home)** | `index.html` | Hero, statistik, layanan, koleksi unggulan, CTA |
| **Profil / About** | `profil.html` | Tentang kami, visi-misi, timeline sejarah, fasilitas, tim |
| **Koleksi Buku** *(halaman utama)* | `koleksi.html` | Pencarian real-time + filter kategori + status ketersediaan |

## Prinsip Web Application Design yang Diterapkan (8 prinsip)

1. **Komposisi** — Layout hero memakai grid 2 kolom (teks + kartu statistik) dengan hierarki jelas: kicker → judul → paragraf → tombol aksi.
2. **Keseimbangan (Balance)** — Grid 3 & 4 kolom pada kartu layanan/fasilitas/tim; distribusi ruang yang sama rata antar blok.
3. **Kontras** — Warna primer biru tua (#1f4e79) vs aksen emas (#e8a33d), teks gelap di atas latar terang, tombol utama vs tombol outline, status "Tersedia" (hijau) vs "Dipinjam" (merah).
4. **Ruang Kosong (White Space)** — Skala spasi konsisten (`--sp-xs` s.d. `--sp-xxl`), padding section 4–6rem, jarak antar kartu.
5. **Simple** — Desain bersih, minimal dekorasi, satu pesan utama per halaman, chip filter sederhana, tanpa elemen yang tidak perlu.
6. **Fokus (Focus)** — Satu aksi utama per halaman ("Lihat Koleksi", "Daftar", toolbar pencarian sebagai fokus halaman koleksi); nav aktif ditandai garis bawah aksen.
7. **Konsistensi (Consistency)** — Header, footer, tombol, kartu, tipografi, dan skala warna identik di ketiga halaman (token CSS `:root`).
8. **Ergonomis** — Navigasi mobile (hamburger), target klik ≥ 44px, `:focus-visible` untuk keyboard, `aria-live` pada hasil pencarian, kontras teks terbaca, `prefers-reduced-motion`, serta umpan balik langsung saat mengetik.
9. **Semiotik (bonus)** — Ikon/emoji bermakna: 📚 = perpustakaan, 🔍 = pencarian, 📭 = hasil kosong, 👤 = tim, ikon kategori per jenis buku.

## Fitur Interaktif

- Pencarian buku real-time berdasarkan judul/penulis (`js/koleksi.js`)
- Filter kategori (Semua, Fiksi, Sejarah, Teknologi, Sains, Anak)
- Hitungan hasil + empty state
- Menu navigasi responsif
