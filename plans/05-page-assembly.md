# Fase 5: Perakitan Halaman (Page Assembly & Mock Data)

Tahap terakhir untuk menggabungkan semuanya ke dalam rute beranda (`/`).

## 1. Buat Mock Data (`src/lib/data/mock.ts` atau `.json`)
- Siapkan data statis (JSON) untuk menguji komponen:
  - `banners`: daftar url gambar untuk HeroBanner.
  - `categories`: daftar nama dan ikon kategori.
  - `recommendationProducts`: array object produk untuk rekomendasi.
  - `mallProducts`: array object produk mall.
  - `brands`: daftar logo brand mitra.

## 2. Implementasi di `src/routes/+page.svelte`
- Impor `Header.svelte` dan `Footer.svelte` (Atau letakkan di `src/routes/+layout.svelte` jika berlaku untuk semua halaman).
- Susun komponen bagian (sections) secara berurutan:
  1. `<Header />` (via layout)
  2. `<Container>`
  3. `<HeroBanner data={banners} />`
  4. `<CategoryMenu data={categories} />`
  5. `<Section title="Pilihan Khusus Untukmu">`
       `<ProductCarousel products={recommendationProducts} />`
     `</Section>`
  6. `<OfficialMallSection products={mallProducts} />`
  7. `<PromoSection />`
  8. `<Section title="Favorit Tocol">`
       `<ProductCarousel products={favProducts} />`
     `</Section>`
  9. `<BrandPartnersSection />`
  10. `<FeaturesSection />`
  11. `</Container>`
  12. `<Footer />` (via layout)

## Catatan Tambahan untuk Junior Programmer / AI Model:
- **TDD (Opsional namun disarankan)**: Tulis tes sederhana (Vitest) untuk komponen dasar seperti PriceDisplay dan Badge.
- **Kerjakan bertahap**: Mulailah dari **Fase 1**. Jangan lompat ke tahap merakit halaman sebelum komponen dasar selesai dan dites.
- **Hardcode ke Prop**: Gunakan data statis/hardcode terlebih dahulu di dalam komponen saat tahap pembuatan awal. Setelah komponen terbentuk rapi, baru ubah menggunakan `props` (contoh `export let product;`).
- **Responsivitas**: Perhatikan tampilan di mobile dan desktop. Gunakan Utility classes (Tailwind CSS) seperti `flex-col md:flex-row` atau `grid-cols-2 lg:grid-cols-4` agar desain rapi di semua ukuran layar.
