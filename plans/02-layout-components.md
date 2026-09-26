# Fase 2: Komponen Layout & Navigasi

Fase ini bertujuan untuk membuat kerangka luar dari halaman web, yaitu Header dan Footer.

## 1. Komponen `Header.svelte`
- **Fungsi**: Navigasi utama di bagian atas halaman.
- **Sub-komponen**:
  - **Logo**: Teks/Gambar "toco".
  - **Bilah Pencarian (`SearchBar.svelte`)**: Input teks dengan ikon pencarian dan tombol filter.
  - **Menu Pengguna**: Ikon/Link untuk Login, Notifikasi, dan Keranjang.
- **Target Mockup**: Bagian paling atas "Header Navigasi", "Bilah Pencarian & Filter", "Menu Pengguna, Login & Keranjang".

## 2. Komponen `Footer.svelte`
- **Fungsi**: Bagian paling bawah halaman yang berisi informasi tambahan.
- **Sub-komponen**:
  - **Metode Pembayaran**: Deretan ikon logo bank/pembayaran (contoh: BCA, Visa, Mastercard).
  - **Media Sosial**: Ikon tautan ke Facebook, Twitter, Instagram.
  - **Link Bantuan**: Daftar tautan (Tentang Kami, Hubungi Kami, dll).
- **Target Mockup**: Bagian terbawah mockup ("Ikon Metode Pembayaran", "Tautan Media Sosial", "Link Informasi & Bantuan Footer").

## 3. Komponen `Section.svelte`
- **Fungsi**: Pembungkus (wrapper) standar untuk setiap blok konten di homepage agar jarak antar bagian (margin/padding) konsisten.
- **Props**:
  - `title` (string, opsional): Judul bagian (contoh: "Pilihan Khusus Untukmu").
  - `actionText` (string, opsional): Teks link di kanan (contoh: "Lihat Semua").
  - `actionHref` (string, opsional): URL link.
