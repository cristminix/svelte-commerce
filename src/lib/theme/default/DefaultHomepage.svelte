<script lang="ts">
	import { Container, Section } from '$lib/components/layout'
	import { ProductCarousel, CategoryMenu } from '$lib/components/product'
	import {
		HeroBanner,
		OfficialMallSection,
		PromoSection,
		BrandPartnersSection,
		FeaturesSection
	} from '$lib/components/sections'
	import {
		banners as mockBanners,
		categories as mockCategories,
		recommendationProducts as mockRecommendationProducts,
		mallProducts as mockMallProducts,
		brands as mockBrands,
		favProducts as mockFavProducts
	} from '$lib/data/mock'
	import type { ThemeHomepageProps } from '../homepages.js'

	let {
		themeContent,
		brandName,
		storeName,
		featuredProducts = [],
		featuredCategories = [],
		desktopBanners = [],
		loading = false
	}: Partial<ThemeHomepageProps> = $props()
</script>

<Container class="space-y-8 py-6">
	<!-- Hero Banner -->
	<HeroBanner data={mockBanners} />

	<!-- Category Menu -->
	<CategoryMenu data={mockCategories} />

	<!-- Pilihan Khusus Untukmu -->
	<Section title="Pilihan Khusus Untukmu" viewAllHref="/products">
		<ProductCarousel products={mockRecommendationProducts} />
	</Section>

	<!-- Official Mall Section -->
	<OfficialMallSection products={mockMallProducts} />

	<!-- Promo Section -->
	<PromoSection />

	<!-- Favorit Pang -->
	<Section title="Favorit Pang" viewAllHref="/products">
		<ProductCarousel products={mockFavProducts} />
	</Section>

	<!-- Brand Partners Section -->
	<BrandPartnersSection brands={mockBrands} />

	<!-- Features Section -->
	<FeaturesSection />
</Container>
