import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import CategoryIcon from '$lib/components/product/CategoryIcon.svelte'
import CategoryMenu from '$lib/components/product/CategoryMenu.svelte'
import ProductCard from '$lib/components/product/ProductCard.svelte'
import ProductCarousel from '$lib/components/product/ProductCarousel.svelte'
import PromoCard from '$lib/components/product/PromoCard.svelte'

describe('Product Components (Phase 3)', () => {
	describe('CategoryIcon Component', () => {
		it('should render category name and circular container', () => {
			render(CategoryIcon, {
				props: {
					name: 'Elektronik',
					icon: 'electronic',
					slug: 'elektronik'
				}
			})
			expect(screen.getByTestId('category-name')).toHaveTextContent('Elektronik')
			expect(screen.getByTestId('category-circle')).toBeInTheDocument()
			expect(screen.getByTestId('category-icon-item')).toHaveAttribute('href', '/elektronik')
		})

		it('should render custom image when image prop is provided', () => {
			render(CategoryIcon, {
				props: {
					name: 'Fashion',
					image: 'https://example.com/fashion.png'
				}
			})
			const img = screen.getByRole('img')
			expect(img).toHaveAttribute('src', 'https://example.com/fashion.png')
			expect(img).toHaveAttribute('alt', 'Fashion')
		})

		it('should trigger onclick handler when clicked', async () => {
			const handleClick = vi.fn()
			render(CategoryIcon, {
				props: {
					name: 'Makanan',
					onclick: handleClick
				}
			})
			const item = screen.getByTestId('category-icon-item')
			await fireEvent.click(item)
			expect(handleClick).toHaveBeenCalledTimes(1)
		})
	})

	describe('CategoryMenu Component', () => {
		it('should render category items list', () => {
			const mockCategories = [
				{ id: '1', name: 'Elektronik', icon: 'electronic', slug: 'elektronik' },
				{ id: '2', name: 'Fashion Pria', icon: 'fashion', slug: 'fashion-pria' },
				{ id: '3', name: 'Makanan', icon: 'food', slug: 'makanan' }
			]

			render(CategoryMenu, {
				props: { data: mockCategories }
			})

			expect(screen.getByText('Elektronik')).toBeInTheDocument()
			expect(screen.getByText('Fashion Pria')).toBeInTheDocument()
			expect(screen.getByText('Makanan')).toBeInTheDocument()
		})

		it('should trigger oncategoryclick when a category is selected', async () => {
			const handleCategoryClick = vi.fn()
			const mockCategories = [
				{ id: '1', name: 'Kamera', icon: 'electronic' }
			]

			render(CategoryMenu, {
				props: {
					categories: mockCategories,
					oncategoryclick: handleCategoryClick
				}
			})

			const item = screen.getByTestId('category-icon-item')
			await fireEvent.click(item)
			expect(handleCategoryClick).toHaveBeenCalledWith(mockCategories[0])
		})
	})

	describe('ProductCard Component', () => {
		const baseProduct = {
			id: 'prod-1',
			name: 'Smart TV QLED 55" 4K UHD',
			price: 5999000,
			originalPrice: 8999000,
			rating: 4.9,
			reviews: 120,
			image: 'https://example.com/tv.jpg',
			slug: 'smart-tv-55',
			storeName: 'Samsung Official Store',
			isOfficial: true,
			bonusPoints: 500
		}

		it('should render product information completely', () => {
			render(ProductCard, {
				props: { product: baseProduct }
			})

			expect(screen.getByTestId('product-title')).toHaveTextContent('Smart TV QLED 55" 4K UHD')
			expect(screen.getByTestId('selling-price')).toHaveTextContent('Rp 5.999.000')
			expect(screen.getByTestId('original-price')).toHaveTextContent('Rp 8.999.000')
			expect(screen.getByTestId('rating-score')).toHaveTextContent('4.9')
			expect(screen.getByTestId('rating-reviews')).toHaveTextContent('(120)')
			expect(screen.getByTestId('product-store')).toHaveTextContent('Samsung Official Store')
		})

		it('should render official store badge when isOfficial is true', () => {
			render(ProductCard, {
				props: { product: baseProduct }
			})
			expect(screen.getByTestId('official-badge')).toBeInTheDocument()
		})

		it('should render discount badge when discounted', () => {
			render(ProductCard, {
				props: { product: baseProduct }
			})
			const discountBadge = screen.getByTestId('discount-badge')
			expect(discountBadge).toBeInTheDocument()
			expect(discountBadge).toHaveTextContent('33% Off')
		})

		it('should render bonus points badge when bonusPoints provided', () => {
			render(ProductCard, {
				props: { product: baseProduct }
			})
			expect(screen.getByTestId('bonus-points-badge')).toHaveTextContent('Poin +500')
		})

		it('should trigger onaddtocart callback on Add to Cart button click', async () => {
			const handleAddToCart = vi.fn()
			render(ProductCard, {
				props: {
					product: baseProduct,
					onaddtocart: handleAddToCart
				}
			})

			const addBtn = screen.getByTestId('add-to-cart-btn')
			await fireEvent.click(addBtn)
			expect(handleAddToCart).toHaveBeenCalledWith(baseProduct)
		})
	})

	describe('ProductCarousel Component', () => {
		const mockProducts = [
			{ id: '1', name: 'Produk 1', price: 10000 },
			{ id: '2', name: 'Produk 2', price: 20000 },
			{ id: '3', name: 'Produk 3', price: 30000 }
		]

		it('should render all products inside carousel', () => {
			render(ProductCarousel, {
				props: { products: mockProducts }
			})

			const items = screen.getAllByTestId('carousel-item')
			expect(items).toHaveLength(3)
			expect(screen.getByText('Produk 1')).toBeInTheDocument()
			expect(screen.getByText('Produk 2')).toBeInTheDocument()
			expect(screen.getByText('Produk 3')).toBeInTheDocument()
		})

		it('should render previous and next buttons', () => {
			render(ProductCarousel, {
				props: { products: mockProducts }
			})
			expect(screen.getByTestId('carousel-prev-btn')).toBeInTheDocument()
			expect(screen.getByTestId('carousel-next-btn')).toBeInTheDocument()
		})
	})

	describe('PromoCard Component', () => {
		it('should render promo card title, subtitle, badge, and CTA link', () => {
			render(PromoCard, {
				props: {
					title: 'Buritan Miom Promenya!',
					subtitle: 'Dapatkan diskon hingga 70% dan cashback melimpah',
					badge: 'Promo Terbatas',
					ctaText: 'Katalog Lengkap',
					ctaHref: '/katalog'
				}
			})

			expect(screen.getByTestId('promo-title')).toHaveTextContent('Buritan Miom Promenya!')
			expect(screen.getByTestId('promo-subtitle')).toHaveTextContent('Dapatkan diskon hingga 70% dan cashback melimpah')
			expect(screen.getByText('Promo Terbatas')).toBeInTheDocument()
			const cta = screen.getByTestId('promo-cta')
			expect(cta).toHaveTextContent('Katalog Lengkap')
			expect(cta).toHaveAttribute('href', '/katalog')
		})
	})
})
