import { describe, it, expect, beforeEach } from 'vitest'
import { mount, unmount, createRawSnippet } from 'svelte'
import Page from '../src/routes/(www)/+page.svelte'
import Layout from '../src/routes/(www)/+layout.svelte'
import {
	banners,
	categories,
	recommendationProducts,
	mallProducts,
	brands,
	favProducts
} from '$lib/data/mock'

describe('Phase 5: Page Assembly and Mock Data', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})

	describe('Mock Data Validation', () => {
		it('should have valid banners dataset', () => {
			expect(banners.length).toBeGreaterThan(0)
			for (const banner of banners) {
				expect(banner.title).toBeTruthy()
				expect(banner.image).toMatch(/^https?:\/\//)
			}
		})

		it('should have valid categories dataset with icons', () => {
			expect(categories.length).toBeGreaterThanOrEqual(8)
			for (const category of categories) {
				expect(category.name).toBeTruthy()
				expect(category.icon || category.iconUrl).toBeTruthy()
			}
		})

		it('should have valid recommendationProducts with prices and ratings', () => {
			expect(recommendationProducts.length).toBeGreaterThan(0)
			for (const product of recommendationProducts) {
				expect(product.name).toBeTruthy()
				expect(product.price).toBeGreaterThan(0)
				expect(product.rating).toBeGreaterThanOrEqual(1)
				expect(product.location).toBeTruthy()
			}
		})

		it('should have valid mallProducts with official store attributes', () => {
			expect(mallProducts.length).toBeGreaterThan(0)
			for (const product of mallProducts) {
				expect(product.name).toBeTruthy()
				expect(product.price).toBeGreaterThan(0)
				expect(product.isOfficial).toBe(true)
			}
		})

		it('should have valid brands dataset', () => {
			expect(brands.length).toBeGreaterThanOrEqual(6)
			for (const brand of brands) {
				expect(brand.name).toBeTruthy()
			}
		})

		it('should have valid favProducts dataset', () => {
			expect(favProducts.length).toBeGreaterThan(0)
			for (const product of favProducts) {
				expect(product.name).toBeTruthy()
				expect(product.price).toBeGreaterThan(0)
			}
		})
	})

	describe('Homepage (+page.svelte) Assembly', () => {
		it('renders all required homepage sections in correct sequence', () => {
			const app = mount(Page, {
				target: document.body
			})

			// 1. HeroBanner
			const heroBanner = document.body.querySelector('[data-testid="hero-banner"]')
			expect(heroBanner).not.toBeNull()
			expect(document.body.textContent).toContain(banners[0].title)

			// 2. CategoryMenu
			const categoryMenu = document.body.querySelector('[data-testid="category-menu"]')
			expect(categoryMenu).not.toBeNull()
			expect(document.body.textContent).toContain('Elektronik')

			// 3. Section: Pilihan Khusus Untukmu
			expect(document.body.textContent).toContain('Pilihan Khusus Untukmu')
			expect(document.body.textContent).toContain(recommendationProducts[0].name)

			// 4. OfficialMallSection
			const mallSection = document.body.querySelector('[data-testid="official-mall-section"]')
			expect(mallSection).not.toBeNull()
			expect(document.body.textContent).toContain('Pang Mall')
			expect(document.body.textContent).toContain(mallProducts[0].name)

			// 5. PromoSection
			const promoSection = document.body.querySelector('[data-testid="promo-section"]')
			expect(promoSection).not.toBeNull()

			// 6. Section: Favorit Pang
			expect(document.body.textContent).toContain('Favorit Pang')
			expect(document.body.textContent).toContain(favProducts[0].name)

			// 7. BrandPartnersSection
			const brandSection = document.body.querySelector('[data-testid="brand-partners-section"]')
			expect(brandSection).not.toBeNull()
			expect(document.body.textContent).toContain('Brand Pilihan')

			// 8. FeaturesSection
			const featuresSection = document.body.querySelector('[data-testid="features-section"]')
			expect(featuresSection).not.toBeNull()
			expect(document.body.textContent).toContain('Gratis Ongkir')

			unmount(app)
		})

		it('allows custom props to override mock data', () => {
			const customBanners = [
				{
					id: 99,
					title: 'Custom Test Banner',
					subtitle: 'Custom subtitle for testing',
					image: 'https://images.unsplash.com/custom.jpg'
				}
			]

			const customRecs = [
				{
					id: 'custom-1',
					name: 'Custom Gaming Mouse Pro',
					price: 250000,
					rating: 5,
					location: 'Jakarta'
				}
			]

			const app = mount(Page, {
				target: document.body,
				props: {
					banners: customBanners,
					recommendationProducts: customRecs
				}
			})

			expect(document.body.textContent).toContain('Custom Test Banner')
			expect(document.body.textContent).toContain('Custom Gaming Mouse Pro')

			unmount(app)
		})

		it('renders banners provided from API data (data.banners)', () => {
			const apiBanners = [
				{
					id: 'api-banner-1',
					heading: 'Promo Spesial Ramadhan Dari API',
					description: 'Diskon kilat semua produk',
					img: 'https://images.unsplash.com/promo-api.jpg',
					link: '/c/promo-api',
					active: true
				}
			]

			const app = mount(Page, {
				target: document.body,
				props: {
					data: {
						banners: apiBanners
					}
				}
			})

			expect(document.body.textContent).toContain('Promo Spesial Ramadhan Dari API')
			expect(document.body.textContent).toContain('Diskon kilat semua produk')

			const bannerLink = document.body.querySelector('[data-testid="hero-slide-0"] a')
			expect(bannerLink?.getAttribute('href')).toBe('/c/promo-api')

			unmount(app)
		})

		it('falls back to mock banners when API banners array is empty', () => {
			const app = mount(Page, {
				target: document.body,
				props: {
					data: {
						banners: []
					}
				}
			})

			expect(document.body.textContent).toContain(banners[0].title)

			unmount(app)
		})
	})

	describe('Storefront Layout Integration', () => {
		it('renders Header and Footer layout elements around content slot', () => {
			const app = mount(Layout, {
				target: document.body,
				props: {
					children: createRawSnippet(() => ({
						render: () => '<div data-testid="test-slot-content">Hello Storefront Content</div>'
					}))
				}
			})

			// Header rendered via layout
			const header = document.body.querySelector('header')
			expect(header).not.toBeNull()
			expect(document.body.textContent?.toLowerCase()).toContain('pang')

			// Main slot content
			const slot = document.body.querySelector('[data-testid="test-slot-content"]')
			expect(slot).not.toBeNull()
			expect(slot?.textContent).toBe('Hello Storefront Content')

			// Footer rendered via layout
			const footer = document.body.querySelector('footer')
			expect(footer).not.toBeNull()
			expect(document.body.textContent).toContain('Layanan Pelanggan')

			unmount(app)
		})
	})
})
