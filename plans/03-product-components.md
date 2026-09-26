# Fase 3: Komponen Produk (Molekul & Organisme)

Fase ini menggabungkan komponen fondasi menjadi kartu produk yang utuh.

## 1. Komponen `ProductCard.svelte`
- **Fungsi**: Menampilkan satu produk secara lengkap.
- **Komponen yang digunakan**: `Badge.svelte`, `Rating.svelte`, `PriceDisplay.svelte`, `Button.svelte`.
- **Elemen Internal**:
  - Gambar Produk.
  - Ikon Lencana Verifikasi (Official Store).
  - Judul Produk (dibatasi 2 baris).
- **Props**: Object `product` (berisi id, name, image, price, originalPrice, rating, badges, isOfficial).
- **Target Mockup**: "Kartu Produk Pilihan", "Daftar Toko Resmi Pilihan".

## 2. Komponen `ProductCarousel.svelte`
- **Fungsi**: Wadah yang dapat di-scroll secara horizontal (swipeable di mobile) untuk daftar `ProductCard`.
- **Target Mockup**: Digunakan pada "Bagian Rekomendasi Personal" dan "Pencarian Produk Terpopuler".

## 3. Komponen `CategoryMenu.svelte` (dan `CategoryIcon.svelte`)
- **Fungsi**: Menampilkan ikon-ikon kategori produk di bawah banner.
- **Target Mockup**: "Menu Kategori Produk (Ikon)" - deretan ikon lingkaran dengan teks di bawahnya.

## 4. Komponen `PromoCard.svelte`
- **Fungsi**: Kartu untuk menampilkan promosi spesifik atau link katalog (gambar background penuh dengan teks).
- **Target Mockup**: Bagian "Buritan Miom Promenya!" dan "Link ke Katalog Lengkap".
