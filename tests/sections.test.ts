import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import HeroBanner from '$lib/components/sections/HeroBanner.svelte'
import OfficialMallSection from '$lib/components/sections/OfficialMallSection.svelte'
import BrandPartnersSection from '$lib/components/sections/BrandPartnersSection.svelte'
import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte'
import PromoSection from '$lib/components/sections/PromoSection.svelte'

describe('Homepage Sections (Phase 4)', () => {
	describe('HeroBanner Component', () => {
		const mockBanners = [
			{
				id: 1,
				image: 'https://example.com/banner1.jpg',
				title: 'Mega Diskon Elektronik',
				subtitle: 'Diskon hingga 70%',
				href: '/promo-1'
			},
			{
				id: 2,
				image: 'https://example.com/banner2.jpg',
				title: 'Fashion Festival',
				subtitle: 'Koleksi terbaru',
				href: '/promo-2'
			}
		]

		it('should render slides, images, and headlines', () => {
			render(HeroBanner, {
				props: {
					banners: mockBanners,
					autoplayInterval: 0
				}
			})

			expect(screen.getByTestId('hero-banner')).toBeInTheDocument()
			expect(screen.getByText('Mega Diskon Elektronik')).toBeInTheDocument()
			expect(screen.getByText('Fashion Festival')).toBeInTheDocument()
		})

		it('should switch slides on next and previous button click', async () => {
			render(HeroBanner, {
				props: {
					banners: mockBanners,
					autoplayInterval: 0
				}
			})

			const nextBtn = screen.getByTestId('banner-next-btn')
			const prevBtn = screen.getByTestId('banner-prev-btn')

			expect(screen.getByTestId('hero-slide-0')).toHaveClass('opacity-100')
			expect(screen.getByTestId('hero-slide-1')).toHaveClass('opacity-0')

			await fireEvent.click(nextBtn)
			expect(screen.getByTestId('hero-slide-0')).toHaveClass('opacity-0')
			expect(screen.getByTestId('hero-slide-1')).toHaveClass('opacity-100')

			await fireEvent.click(prevBtn)
			expect(screen.getByTestId('hero-slide-0')).toHaveClass('opacity-100')
			expect(screen.getByTestId('hero-slide-1')).toHaveClass('opacity-0')
		})

		it('should switch slides on dot indicator click', async () => {
			render(HeroBanner, {
				props: {
					banners: mockBanners,
					autoplayInterval: 0
				}
			})

			const dot1 = screen.getByTestId('banner-dot-1')
			await fireEvent.click(dot1)

			expect(screen.getByTestId('hero-slide-1')).toHaveClass('opacity-100')
		})
	})

	describe('OfficialMallSection Component', () => {
		const mockMallProducts = [
			{
				id: 'mall-1',
				name: 'Official Galaxy S24',
				price: 15999000,
				isOfficial: true,
				rating: 4.9
			}
		]

		const mockStores = [
			{ id: 'store-1', name: 'Samsung Official', slug: 'samsung' },
			{ id: 'store-2', name: 'Nike Indonesia', slug: 'nike' }
		]

		it('should render section title and action link', () => {
			render(OfficialMallSection, {
				props: {
					title: 'Toko Mall Resmi',
					actionText: 'Lihat Semua Mall',
					actionHref: '/official-mall',
					products: mockMallProducts,
					stores: mockStores
				}
			})

			expect(screen.getByTestId('mall-title')).toHaveTextContent('Toko Mall Resmi')
			const actionLink = screen.getByTestId('mall-action-link')
			expect(actionLink).toHaveTextContent('Lihat Semua Mall')
			expect(actionLink).toHaveAttribute('href', '/official-mall')
		})

		it('should render official store brand circles', () => {
			render(OfficialMallSection, {
				props: {
					products: mockMallProducts,
					stores: mockStores
				}
			})

			expect(screen.getByText('Samsung Official')).toBeInTheDocument()
			expect(screen.getByText('Nike Indonesia')).toBeInTheDocument()
		})
	})

	describe('BrandPartnersSection Component', () => {
		const mockBrands = [
			{ id: 1, name: 'Brand A', discount: 'Diskon 50%' },
			{ id: 2, name: 'Brand B', discount: 'Cashback 20%' }
		]

		it('should render brand partners grid with discounts', () => {
			render(BrandPartnersSection, {
				props: {
					title: 'Merek Mitra Pilihan',
					brands: mockBrands
				}
			})

			expect(screen.getByTestId('brand-partners-title')).toHaveTextContent('Merek Mitra Pilihan')
			expect(screen.getByText('Brand A')).toBeInTheDocument()
			expect(screen.getByText('Diskon 50%')).toBeInTheDocument()
			expect(screen.getByText('Brand B')).toBeInTheDocument()
			expect(screen.getByText('Cashback 20%')).toBeInTheDocument()
		})
	})

	describe('FeaturesSection Component', () => {
		it('should render features section with guarantee cards', () => {
			render(FeaturesSection, {
				props: {
					title: 'Layanan Terpercaya'
				}
			})

			expect(screen.getByTestId('features-title')).toHaveTextContent('Layanan Terpercaya')
			expect(screen.getByText('Gratis Ongkir Seluruh Indonesia')).toBeInTheDocument()
			expect(screen.getByText('Jaminan 100% Produk Original')).toBeInTheDocument()
			expect(screen.getByText('Pembayaran Aman & Lengkap')).toBeInTheDocument()
			expect(screen.getByText('Layanan Bantuan 24/7')).toBeInTheDocument()
		})
	})

	describe('PromoSection Component', () => {
		it('should render promotional cards side by side', () => {
			render(PromoSection, {})
			expect(screen.getByTestId('promo-section')).toBeInTheDocument()
			expect(screen.getByText('Buritan Miom Promenya!')).toBeInTheDocument()
			expect(screen.getByText('Katalog Lengkap Produk toco')).toBeInTheDocument()
		})
	})
})
