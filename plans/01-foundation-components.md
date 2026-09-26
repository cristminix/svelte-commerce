# Fase 1: Komponen Fondasi (Foundation Components)

Fase ini berfokus pada pembuatan komponen dasar (atom & molekul) yang akan digunakan ulang di banyak tempat. Pastikan komponen-komponen ini sefleksibel mungkin.

## 1. Typography & Colors (Setup)
- **Tugas**: Definisikan variabel CSS (atau Tailwind config) untuk warna utama (kuning, teks gelap, latar belakang), ukuran font, dan jarak (spacing) sesuai mockup.
- **File**: `tailwind.config.js` / `src/app.css`

## 2. Komponen `Badge.svelte`
- **Fungsi**: Menampilkan label kecil seperti "Lencana Diskon", "Produk Baru", atau "Poin Bonus".
- **Props**:
  - `text` (string): Teks lencana.
  - `variant` (string): 'discount' (merah), 'bonus' (kuning/emas), 'neutral' (abu-abu).
- **Target Mockup**: Lencana diskon "50% Off", Label Poin Bonus.

## 3. Komponen `Rating.svelte`
- **Fungsi**: Menampilkan rating bintang (1-5) dan jumlah ulasan.
- **Props**:
  - `score` (number): Nilai rating (contoh: 4.9).
  - `reviews` (number): Jumlah ulasan (contoh: 120).
- **Target Mockup**: Bagian bawah nama produk yang menampilkan ikon bintang.

## 4. Komponen `PriceDisplay.svelte`
- **Fungsi**: Menampilkan harga produk, menangani tampilan harga normal vs diskon.
- **Props**:
  - `price` (number): Harga akhir/diskon.
  - `originalPrice` (number, opsional): Harga sebelum diskon (dicoret).
- **Target Mockup**: Harga Normal (dicoret) & Harga Diskon (teks tebal merah/hitam).

## 5. Komponen `Button.svelte`
- **Fungsi**: Tombol interaktif generik.
- **Props**:
  - `variant` (string): 'primary' (kuning), 'outline', 'ghost'.
  - `size` (string): 'sm', 'md', 'lg'.
  - `icon` (boolean): Apakah ada ikon (seperti tombol keranjang).
- **Target Mockup**: Tombol "Tambah ke Keranjang", Tombol navigasi.
