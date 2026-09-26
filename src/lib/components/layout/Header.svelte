<script lang="ts">
	import { cn } from '$lib/core/utils'
	import SearchBar from './SearchBar.svelte'
	import { Bell, ShoppingCart, User, Menu, X } from '@lucide/svelte'

	interface Props {
		cartCount?: number
		notificationCount?: number
		user?: { name: string; email?: string; avatar?: string } | null
		trendingKeywords?: string[]
		class?: string
		onsearch?: (query: string) => void
		oncartclick?: () => void
		onnotificationclick?: () => void
		onloginclick?: () => void
		[key: string]: any
	}

	let {
		cartCount = 0,
		notificationCount = 0,
		user = null,
		trendingKeywords = [
			'Kulkas 2 Pintu',
			'Sepatu Pria',
			'Smart TV',
			'Kaos Polos',
			'Air Fryer',
			'Serum Wajah'
		],
		class: className = '',
		onsearch,
		oncartclick,
		onnotificationclick,
		onloginclick,
		...restProps
	}: Props = $props()

	let isMobileMenuOpen = $state(false)

	function handleSearch(query: string) {
		onsearch?.(query)
	}
</script>

<header
	class={cn('sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900', className)}
	data-testid="main-header"
	{...restProps}
>
	<!-- Top Bar / Utility Bar -->
	<div class="hidden border-b border-gray-100 bg-gray-50 py-1 text-xs text-gray-500 lg:block dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-4">
				<a href="/download" class="hover:text-gray-900 dark:hover:text-white">Download Aplikasi toco</a>
				<span class="text-gray-300 dark:text-gray-700">|</span>
				<a href="/promo" class="font-medium text-red-600 hover:text-red-700 dark:text-red-400">Promo Hari Ini</a>
			</div>
			<div class="flex items-center gap-4">
				<a href="/mitra" class="hover:text-gray-900 dark:hover:text-white">Mitra toco</a>
				<span class="text-gray-300 dark:text-gray-700">|</span>
				<a href="/help" class="hover:text-gray-900 dark:hover:text-white">Bantuan</a>
				<span class="text-gray-300 dark:text-gray-700">|</span>
				<span class="font-medium">Bahasa Indonesia</span>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between gap-4 md:gap-8">
			<!-- Logo -->
			<a
				href="/"
				class="flex shrink-0 items-center gap-1 text-2xl font-black tracking-tight text-gray-900 transition-opacity hover:opacity-90 dark:text-white"
				data-testid="header-logo"
				aria-label="toco homepage"
			>
				<span>toco</span>
				<span class="size-2 rounded-full bg-[#FFC745] inline-block"></span>
			</a>

			<!-- Search Bar (Desktop & Tablet) -->
			<div class="hidden flex-1 max-w-2xl md:block">
				<SearchBar onsearch={handleSearch} />
				<!-- Quick Trending Keywords -->
				{#if trendingKeywords && trendingKeywords.length > 0}
					<div class="mt-1.5 flex items-center gap-3 overflow-hidden text-xs text-gray-500 dark:text-gray-400">
						{#each trendingKeywords.slice(0, 5) as keyword}
							<button
								type="button"
								onclick={() => handleSearch(keyword)}
								class="hover:text-amber-600 hover:underline dark:hover:text-amber-400"
							>
								{keyword}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- User Actions Menu -->
			<div class="flex items-center gap-2 sm:gap-4" data-testid="user-menu">
				<!-- Notification Button -->
				<button
					type="button"
					onclick={() => onnotificationclick?.()}
					class="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
					aria-label="Notifikasi"
					data-testid="notification-btn"
				>
					<Bell class="size-5" />
					{#if notificationCount > 0}
						<span
							class="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white leading-none"
							data-testid="notification-badge"
						>
							{notificationCount > 99 ? '99+' : notificationCount}
						</span>
					{/if}
				</button>

				<!-- Cart Button -->
				<a
					href="/checkout/cart"
					onclick={(e) => {
						if (oncartclick) {
							e.preventDefault()
							oncartclick()
						}
					}}
					class="relative flex items-center gap-2 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:px-3 sm:py-1.5 sm:rounded-lg dark:text-gray-200 dark:hover:bg-gray-800"
					aria-label="Keranjang Belanja"
					data-testid="cart-btn"
				>
					<div class="relative">
						<ShoppingCart class="size-5" />
						{#if cartCount > 0}
							<span
								class="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white leading-none"
								data-testid="cart-badge"
							>
								{cartCount > 99 ? '99+' : cartCount}
							</span>
						{/if}
					</div>
					<span class="hidden text-sm font-medium sm:inline">Keranjang</span>
				</a>

				<div class="hidden h-5 w-px bg-gray-200 sm:block dark:bg-gray-700"></div>

				<!-- User Profile / Login -->
				{#if user}
					<a
						href="/my/profile"
						class="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
						data-testid="user-profile-link"
					>
						{#if user.avatar}
							<img src={user.avatar} alt={user.name} class="size-7 rounded-full object-cover" />
						{:else}
							<div class="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
								{user.name.charAt(0).toUpperCase()}
							</div>
						{/if}
						<span class="hidden text-sm font-medium text-gray-900 sm:inline dark:text-gray-100">
							{user.name}
						</span>
					</a>
				{:else}
					<div class="flex items-center gap-2">
						<a
							href="/auth/login"
							onclick={(e) => {
								if (onloginclick) {
									e.preventDefault()
									onloginclick()
								}
							}}
							class="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:text-sm dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
							data-testid="login-btn"
						>
							Masuk
						</a>
						<a
							href="/auth/signup"
							class="hidden rounded-md bg-[#FFC745] px-3 py-1.5 text-xs font-semibold text-[#212121] transition hover:bg-[#F0B830] sm:inline-block sm:text-sm"
							data-testid="signup-btn"
						>
							Daftar
						</a>
					</div>
				{/if}

				<!-- Mobile Menu Toggle -->
				<button
					type="button"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					class="rounded p-1.5 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
					aria-label="Toggle menu"
					data-testid="mobile-menu-btn"
				>
					{#if isMobileMenuOpen}
						<X class="size-6" />
					{:else}
						<Menu class="size-6" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Search Bar for Mobile -->
		<div class="mt-2.5 md:hidden">
			<SearchBar onsearch={handleSearch} />
		</div>
	</div>

	<!-- Mobile Drawer Menu -->
	{#if isMobileMenuOpen}
		<div class="border-t border-gray-200 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-gray-900" data-testid="mobile-menu-drawer">
			<div class="flex flex-col gap-3">
				<a href="/" class="text-sm font-semibold text-gray-900 dark:text-white">Beranda</a>
				<a href="/products" class="text-sm text-gray-700 dark:text-gray-300">Semua Produk</a>
				<a href="/promo" class="text-sm text-red-600 font-medium">Promo & Diskon</a>
				<a href="/help" class="text-sm text-gray-700 dark:text-gray-300">Pusat Bantuan</a>
				{#if !user}
					<div class="mt-2 flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
						<a href="/auth/login" class="flex-1 rounded-md border border-gray-300 py-2 text-center text-sm font-semibold">Masuk</a>
						<a href="/auth/signup" class="flex-1 rounded-md bg-[#FFC745] py-2 text-center text-sm font-semibold text-[#212121]">Daftar</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</header>
