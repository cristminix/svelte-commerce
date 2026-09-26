import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import SearchBar from '$lib/components/layout/SearchBar.svelte'
import Header from '$lib/components/layout/Header.svelte'
import Footer from '$lib/components/layout/Footer.svelte'
import Section from '$lib/components/layout/Section.svelte'
import Container from '$lib/components/layout/Container.svelte'

const createTextSnippet = (content: string) =>
	createRawSnippet<[]>(() => ({
		render: () => `<div>${content}</div>`
	}))

describe('Layout Components', () => {
	describe('SearchBar Component', () => {
		it('should render input with custom or default placeholder', () => {
			render(SearchBar, {
				props: { placeholder: 'Cari barang murah...' }
			})
			const input = screen.getByTestId('search-input')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('placeholder', 'Cari barang murah...')
		})

		it('should call onsearch when search form is submitted', async () => {
			const handleSearch = vi.fn()
			render(SearchBar, {
				props: {
					value: 'sepatu sneaker',
					onsearch: handleSearch
				}
			})
			const form = screen.getByTestId('search-bar')
			await fireEvent.submit(form)
			expect(handleSearch).toHaveBeenCalledWith('sepatu sneaker')
		})

		it('should show clear button when value exists and clear on click', async () => {
			const handleSearch = vi.fn()
			render(SearchBar, {
				props: {
					value: 'laptop',
					onsearch: handleSearch
				}
			})
			const clearBtn = screen.getByTestId('search-clear-btn')
			expect(clearBtn).toBeInTheDocument()
			await fireEvent.click(clearBtn)
			expect(handleSearch).toHaveBeenCalledWith('')
		})

		it('should trigger onfilter when filter button is clicked', async () => {
			const handleFilter = vi.fn()
			render(SearchBar, {
				props: {
					onfilter: handleFilter
				}
			})
			const filterBtn = screen.getByTestId('search-filter-btn')
			await fireEvent.click(filterBtn)
			expect(handleFilter).toHaveBeenCalledTimes(1)
		})
	})

	describe('Header Component', () => {
		it('should render logo Pang and links', () => {
			render(Header, {})
			const logo = screen.getByTestId('header-logo')
			expect(logo).toBeInTheDocument()
			expect(logo).toHaveTextContent('Pang')
		})

		it('should render cart and notification badges when counts > 0', () => {
			render(Header, {
				props: {
					cartCount: 3,
					notificationCount: 5
				}
			})
			const cartBadge = screen.getByTestId('cart-badge')
			const notifBadge = screen.getByTestId('notification-badge')

			expect(cartBadge).toHaveTextContent('3')
			expect(notifBadge).toHaveTextContent('5')
		})

		it('should render guest login button when user is null', () => {
			render(Header, {
				props: { user: null }
			})
			expect(screen.getByTestId('login-btn')).toBeInTheDocument()
			expect(screen.queryByTestId('user-profile-link')).toBeNull()
		})

		it('should render user profile when user is authenticated', () => {
			render(Header, {
				props: {
					user: { name: 'Budi Santoso' }
				}
			})
			const userLink = screen.getByTestId('user-profile-link')
			expect(userLink).toBeInTheDocument()
			expect(userLink).toHaveTextContent('Budi Santoso')
		})

		it('should toggle mobile menu drawer on mobile button click', async () => {
			render(Header, {})
			const mobileBtn = screen.getByTestId('mobile-menu-btn')
			expect(screen.queryByTestId('mobile-menu-drawer')).toBeNull()

			await fireEvent.click(mobileBtn)
			expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument()

			await fireEvent.click(mobileBtn)
			expect(screen.queryByTestId('mobile-menu-drawer')).toBeNull()
		})

		it('should trigger trending keyword search on click', async () => {
			const handleSearch = vi.fn()
			render(Header, {
				props: {
					trendingKeywords: ['Air Fryer'],
					onsearch: handleSearch
				}
			})
			const keywordBtn = screen.getByText('Air Fryer')
			await fireEvent.click(keywordBtn)
			expect(handleSearch).toHaveBeenCalledWith('Air Fryer')
		})
	})

	describe('Footer Component', () => {
		it('should render Pang brand logo and company info', () => {
			render(Footer, {})
			const footerLogo = screen.getByTestId('footer-logo')
			expect(footerLogo).toBeInTheDocument()
			expect(footerLogo).toHaveTextContent('Pang')
		})

		it('should render payment methods badges', () => {
			render(Footer, {})
			expect(screen.getByTestId('payment-bca')).toBeInTheDocument()
			expect(screen.getByTestId('payment-mandiri')).toBeInTheDocument()
			expect(screen.getByTestId('payment-qris')).toBeInTheDocument()
		})

		it('should render social media links', () => {
			render(Footer, {})
			expect(screen.getByTestId('social-facebook')).toBeInTheDocument()
			expect(screen.getByTestId('social-instagram')).toBeInTheDocument()
		})

		it('should render custom navigation sections', () => {
			render(Footer, {
				props: {
					sections: [
						{
							title: 'Informasi Khusus',
							links: [{ label: 'Syarat Garansi', href: '/garansi' }]
						}
					]
				}
			})
			expect(screen.getByText('Informasi Khusus')).toBeInTheDocument()
			expect(screen.getByText('Syarat Garansi')).toBeInTheDocument()
		})
	})

	describe('Section Component', () => {
		it('should render title and subtitle when provided', () => {
			render(Section, {
				props: {
					title: 'Pilihan Khusus Untukmu',
					subtitle: 'Rekomendasi terbaik berdasarkan pilihan pembeli'
				}
			})
			expect(screen.getByTestId('section-title')).toHaveTextContent('Pilihan Khusus Untukmu')
			expect(screen.getByTestId('section-subtitle')).toHaveTextContent('Rekomendasi terbaik berdasarkan pilihan pembeli')
		})

		it('should render actionText link with correct href', () => {
			render(Section, {
				props: {
					title: 'Promo Spesial',
					actionText: 'Lihat Semua',
					actionHref: '/promo'
				}
			})
			const actionLink = screen.getByTestId('section-action')
			expect(actionLink).toBeInTheDocument()
			expect(actionLink).toHaveTextContent('Lihat Semua')
			expect(actionLink).toHaveAttribute('href', '/promo')
		})

		it('should render children content inside section', () => {
			render(Section, {
				props: {
					title: 'Produk Populer',
					children: createTextSnippet('Daftar Produk Populer')
				}
			})
			expect(screen.getByText('Daftar Produk Populer')).toBeInTheDocument()
		})
	})

	describe('Container Component', () => {
		it('should render layout container with children', () => {
			render(Container, {
				props: {
					class: 'my-custom-container',
					children: createTextSnippet('Container Children')
				}
			})
			const container = screen.getByTestId('layout-container')
			expect(container).toHaveClass('my-custom-container')
			expect(container).toHaveTextContent('Container Children')
		})
	})
})
