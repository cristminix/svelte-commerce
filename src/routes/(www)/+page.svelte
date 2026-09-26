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
		favProducts as mockFavProducts,
		type BannerItem,
		type CategoryItem,
		type ProductItem,
		type BrandItem
	} from '$lib/data/mock'

	interface Props {
		banners?: BannerItem[]
		categories?: CategoryItem[]
		recommendationProducts?: ProductItem[]
		mallProducts?: ProductItem[]
		brands?: BrandItem[]
		favProducts?: ProductItem[]
		data?: any
	}

	let {
		banners = mockBanners,
		categories = mockCategories,
		recommendationProducts = mockRecommendationProducts,
		mallProducts = mockMallProducts,
		brands = mockBrands,
		favProducts = mockFavProducts,
		data
	}: Props = $props()
</script>

<svelte:head>
	<title>Toco - Jual Beli Online Mudah & Terpercaya</title>
	<meta
		name="description"
		content="Toco Marketplace Indonesia - Pilihan Khusus Untukmu, Official Mall, Promo Menarik, dan Brand Ternama"
	/>
</svelte:head>

<Container class="space-y-8 py-6">
	<!-- 3. Hero Banner -->
	<HeroBanner data={banners} />

	<!-- 4. Category Menu -->
	<CategoryMenu data={categories} />

	<!-- 5. Pilihan Khusus Untukmu -->
	<Section title="Pilihan Khusus Untukmu" viewAllHref="/products">
		<ProductCarousel products={recommendationProducts} />
	</Section>

	<!-- 6. Official Mall Section -->
	<OfficialMallSection products={mallProducts} />

	<!-- 7. Promo Section -->
	<PromoSection />

	<!-- 8. Favorit Toco -->
	<Section title="Favorit Toco" viewAllHref="/products">
		<ProductCarousel products={favProducts} />
	</Section>

	<!-- 9. Brand Partners Section -->
	<BrandPartnersSection {brands} />

	<!-- 10. Features Section -->
	<FeaturesSection />
</Container>
