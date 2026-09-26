import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Badge from '$lib/components/foundation/Badge.svelte'
import Rating from '$lib/components/foundation/Rating.svelte'
import PriceDisplay from '$lib/components/foundation/PriceDisplay.svelte'
import Button from '$lib/components/foundation/Button.svelte'

const createTextSnippet = (content: string) =>
	createRawSnippet<[]>(() => ({
		render: () => `<span>${content}</span>`
	}))

describe('Foundation Components', () => {
	describe('Badge Component', () => {
		it('should render text prop correctly', () => {
			render(Badge, {
				props: { text: '50% Off' }
			})
			const badge = screen.getByTestId('badge')
			expect(badge).toBeInTheDocument()
			expect(badge).toHaveTextContent('50% Off')
		})

		it('should render discount variant with red styles', () => {
			render(Badge, {
				props: { text: '50% Off', variant: 'discount' }
			})
			const badge = screen.getByTestId('badge')
			expect(badge).toHaveAttribute('data-variant', 'discount')
			expect(badge).toHaveClass('bg-red-600', 'text-white')
		})

		it('should render bonus variant with gold/amber styles', () => {
			render(Badge, {
				props: { text: 'Poin +500', variant: 'bonus' }
			})
			const badge = screen.getByTestId('badge')
			expect(badge).toHaveAttribute('data-variant', 'bonus')
			expect(badge).toHaveClass('bg-[#FFF3D6]', 'text-[#B87A00]')
		})

		it('should render neutral variant with gray styles by default', () => {
			render(Badge, {
				props: { text: 'Produk Baru' }
			})
			const badge = screen.getByTestId('badge')
			expect(badge).toHaveAttribute('data-variant', 'neutral')
			expect(badge).toHaveClass('bg-gray-100', 'text-gray-700')
		})

		it('should render snippet children when provided', () => {
			render(Badge, {
				props: {
					children: createTextSnippet('Custom Snippet')
				}
			})
			expect(screen.getByText('Custom Snippet')).toBeInTheDocument()
		})

		it('should accept and apply custom classes', () => {
			render(Badge, {
				props: { text: 'Custom', class: 'my-custom-badge' }
			})
			const badge = screen.getByTestId('badge')
			expect(badge).toHaveClass('my-custom-badge')
		})
	})

	describe('Rating Component', () => {
		it('should render score correctly in compact mode', () => {
			render(Rating, {
				props: { score: 4.9 }
			})
			const scoreEl = screen.getByTestId('rating-score')
			expect(scoreEl).toHaveTextContent('4.9')
		})

		it('should render review count when provided', () => {
			render(Rating, {
				props: { score: 4.8, reviews: 120 }
			})
			const reviewsEl = screen.getByTestId('rating-reviews')
			expect(reviewsEl).toHaveTextContent('(120)')
		})

		it('should omit review count when reviews prop is omitted', () => {
			render(Rating, {
				props: { score: 4.5 }
			})
			expect(screen.queryByTestId('rating-reviews')).toBeNull()
		})

		it('should render 5 stars when showStars is true', () => {
			render(Rating, {
				props: { score: 4, showStars: true, maxStars: 5 }
			})
			expect(screen.getByTestId('star-1')).toBeInTheDocument()
			expect(screen.getByTestId('star-5')).toBeInTheDocument()

			// Star 4 should be filled, star 5 should not be filled
			expect(screen.getByTestId('star-4')).toHaveClass('fill-amber-400')
			expect(screen.getByTestId('star-5')).toHaveClass('fill-gray-200')
		})

		it('should provide an accessible aria-label', () => {
			render(Rating, {
				props: { score: 4.9, reviews: 88 }
			})
			const rating = screen.getByTestId('rating')
			expect(rating).toHaveAttribute('aria-label', 'Rating 4.9 dari 5 bintang, 88 ulasan')
		})
	})

	describe('PriceDisplay Component', () => {
		it('should render formatted selling price in IDR', () => {
			render(PriceDisplay, {
				props: { price: 284990 }
			})
			const sellingPrice = screen.getByTestId('selling-price')
			expect(sellingPrice).toHaveTextContent('Rp 284.990')
			expect(screen.queryByTestId('original-price')).toBeNull()
		})

		it('should render original price with line-through when discounted', () => {
			render(PriceDisplay, {
				props: { price: 150000, originalPrice: 300000 }
			})
			const sellingPrice = screen.getByTestId('selling-price')
			const originalPrice = screen.getByTestId('original-price')

			expect(sellingPrice).toHaveTextContent('Rp 150.000')
			expect(sellingPrice).toHaveClass('text-red-600')
			expect(originalPrice).toHaveTextContent('Rp 300.000')
			expect(originalPrice).toHaveClass('line-through')
		})

		it('should show discount percentage badge when showDiscountBadge is true', () => {
			render(PriceDisplay, {
				props: { price: 150000, originalPrice: 300000, showDiscountBadge: true }
			})
			const badge = screen.getByTestId('price-discount-badge')
			expect(badge).toBeInTheDocument()
			expect(badge).toHaveTextContent('50%')
		})

		it('should support different size variants (sm, md, lg)', () => {
			const { rerender } = render(PriceDisplay, {
				props: { price: 50000, size: 'sm' }
			})
			expect(screen.getByTestId('selling-price')).toHaveClass('text-sm')

			rerender({ price: 50000, size: 'lg' })
			expect(screen.getByTestId('selling-price')).toHaveClass('text-xl')
		})
	})

	describe('Button Component', () => {
		it('should render primary yellow button by default', () => {
			render(Button, {
				props: {
					children: createTextSnippet('Tambah ke Keranjang')
				}
			})
			const button = screen.getByTestId('foundation-button')
			expect(button).toBeInTheDocument()
			expect(button.tagName).toBe('BUTTON')
			expect(button).toHaveAttribute('data-variant', 'primary')
			expect(button).toHaveClass('bg-[#FFC745]', 'text-[#212121]')
		})

		it('should render outline and ghost variants', () => {
			const { rerender } = render(Button, {
				props: {
					variant: 'outline',
					children: createTextSnippet('Batal')
				}
			})
			let button = screen.getByTestId('foundation-button')
			expect(button).toHaveClass('border-gray-300')

			rerender({
				variant: 'ghost',
				children: createTextSnippet('Detail')
			})
			button = screen.getByTestId('foundation-button')
			expect(button).toHaveClass('bg-transparent')
		})

		it('should render anchor tag when href is provided', () => {
			render(Button, {
				props: {
					href: '/katalog',
					children: createTextSnippet('Lihat Semua')
				}
			})
			const link = screen.getByTestId('foundation-button')
			expect(link.tagName).toBe('A')
			expect(link).toHaveAttribute('href', '/katalog')
		})

		it('should handle click events', async () => {
			const handleClick = vi.fn()
			render(Button, {
				props: {
					onclick: handleClick,
					children: createTextSnippet('Klik')
				}
			})
			const button = screen.getByTestId('foundation-button')
			await fireEvent.click(button)
			expect(handleClick).toHaveBeenCalledTimes(1)
		})

		it('should support disabled state and prevent clicks', async () => {
			const handleClick = vi.fn()
			render(Button, {
				props: {
					disabled: true,
					onclick: handleClick,
					children: createTextSnippet('Disabled')
				}
			})
			const button = screen.getByTestId('foundation-button')
			expect(button).toBeDisabled()
			await fireEvent.click(button)
			expect(handleClick).not.toHaveBeenCalled()
		})

		it('should support icon-only sizing when icon is true without children', () => {
			render(Button, {
				props: {
					icon: true,
					size: 'md'
				}
			})
			const button = screen.getByTestId('foundation-button')
			expect(button).toHaveClass('h-10', 'w-10', 'p-0')
		})
	})
})
