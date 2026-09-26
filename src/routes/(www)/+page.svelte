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
		banners: propBanners,
		categories = mockCategories,
		recommendationProducts = mockRecommendationProducts,
		mallProducts = mockMallProducts,
		brands = mockBrands,
		favProducts = mockFavProducts,
		data
	}: Props = $props()

	// Prioritize explicitly passed prop banners, then API banners from load data, then mockBanners fallback
	const banners = $derived.by<BannerItem[]>(() => {
		if (propBanners && propBanners.length > 0) {
			return propBanners
		}

		const apiBanners = data?.banners
		if (Array.isArray(apiBanners) && apiBanners.length > 0) {
			const formatted = apiBanners
				.filter((item: any) => item && (item.active === undefined || item.active))
				.map((item: any) => ({
					id: item.id || item._id,
					image: item.image || item.img || item.imgCdn || item.url || '',
					title: item.title || item.heading || '',
					subtitle: item.subtitle || item.description || '',
					href: item.href || item.link || '#'
				}))
				.filter((item: BannerItem) => Boolean(item.image))

			if (formatted.length > 0) {
				return formatted
			}
		}

		return mockBanners
	})
</script>

<svelte:head>
	<title>Pang - Jual Beli Online Mudah & Terpercaya</title>
	<meta
		name="description"
		content="Pang Marketplace Indonesia - Pilihan Khusus Untukmu, Official Mall, Promo Menarik, dan Brand Ternama"
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

	<!-- 8. Favorit Pang -->
	<Section title="Favorit Pang" viewAllHref="/products">
		<ProductCarousel products={favProducts} />
	</Section>

	<!-- 9. Brand Partners Section -->
	<BrandPartnersSection {brands} />

	<!-- 10. Features Section -->
	<FeaturesSection />
</Container>
