<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { ChevronLeft, ChevronRight } from '@lucide/svelte'
	import { onMount, onDestroy } from 'svelte'

	export interface BannerItem {
		id?: string | number
		image: string
		title?: string
		subtitle?: string
		href?: string
		[key: string]: any
	}

	interface Props {
		banners?: BannerItem[]
		data?: BannerItem[]
		autoplayInterval?: number
		class?: string
		[key: string]: any
	}

	let {
		banners = undefined,
		data = undefined,
		autoplayInterval = 4000,
		class: className = '',
		...restProps
	}: Props = $props()

	const items: BannerItem[] = $derived(
		data || banners || [
			{
				id: 1,
				image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
				title: 'Mega Diskon Elektronik s/d 70%',
				subtitle: 'Gratis ongkir ke seluruh Indonesia',
				href: '/products?category=electronic'
			},
			{
				id: 2,
				image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
				title: 'Tren Fashion Terbaru',
				subtitle: 'Koleksi eksklusif dari brand ternama',
				href: '/products?category=fashion'
			},
			{
				id: 3,
				image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
				title: 'Kebutuhan Rumah Tangga',
				subtitle: 'Belanja hemat setiap hari',
				href: '/products'
			}
		]
	)

	let currentIndex = $state(0)
	let timer: any = null
	let isPaused = $state(false)

	function nextSlide() {
		if (items.length <= 1) return
		currentIndex = (currentIndex + 1) % items.length
	}

	function prevSlide() {
		if (items.length <= 1) return
		currentIndex = (currentIndex - 1 + items.length) % items.length
	}

	function goToSlide(index: number) {
		currentIndex = index
	}

	onMount(() => {
		if (autoplayInterval > 0 && typeof window !== 'undefined') {
			timer = setInterval(() => {
				if (!isPaused) {
					nextSlide()
				}
			}, autoplayInterval)
		}
	})

	onDestroy(() => {
		if (timer) clearInterval(timer)
	})
</script>

<div
	class={cn('relative w-full overflow-hidden rounded-2xl shadow-sm', className)}
	data-testid="hero-banner"
	role="region"
	aria-roledescription="carousel"
	aria-label="Banner Promosi Utama"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => (isPaused = false)}
	{...restProps}
>
	<!-- Slide Container -->
	<div
		class="relative aspect-[16/7] sm:aspect-[21/8] md:aspect-[24/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
		data-testid="hero-slides-wrapper"
	>
		{#each items as item, index}
			<div
				class={cn(
					'absolute inset-0 size-full transition-opacity duration-500 ease-in-out',
					index === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
				)}
				data-testid={`hero-slide-${index}`}
				aria-hidden={index !== currentIndex}
			>
				<a href={item.href || '#'} class="block size-full relative">
					<img
						src={item.image}
						alt={item.title || `Promo Banner ${index + 1}`}
						class="size-full object-cover"
						data-testid={`banner-image-${index}`}
						onerror={(e) => {
							const target = e.currentTarget as HTMLImageElement
							if (!target.dataset.fallback) {
								target.dataset.fallback = 'true'
								target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'
							}
						}}
					/>
					{#if item.title || item.subtitle}
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
							{#if item.title}
								<h2 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight" data-testid={`banner-title-${index}`}>
									{item.title}
								</h2>
							{/if}
							{#if item.subtitle}
								<p class="mt-1 text-xs sm:text-sm text-gray-200" data-testid={`banner-subtitle-${index}`}>
									{item.subtitle}
								</p>
							{/if}
						</div>
					{/if}
				</a>
			</div>
		{/each}
	</div>

	<!-- Left/Right Arrow Navigation -->
	{#if items.length > 1}
		<button
			type="button"
			onclick={prevSlide}
			class="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105 active:scale-95 dark:bg-gray-900/80 dark:text-white"
			aria-label="Banner sebelumnya"
			data-testid="banner-prev-btn"
		>
			<ChevronLeft class="size-5" />
		</button>
		<button
			type="button"
			onclick={nextSlide}
			class="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105 active:scale-95 dark:bg-gray-900/80 dark:text-white"
			aria-label="Banner berikutnya"
			data-testid="banner-next-btn"
		>
			<ChevronRight class="size-5" />
		</button>

		<!-- Dot Indicators / Pagination -->
		<div
			class="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur-sm"
			data-testid="banner-dots"
		>
			{#each items as _, index}
				<button
					type="button"
					onclick={() => goToSlide(index)}
					class={cn(
						'h-2 rounded-full transition-all duration-300',
						index === currentIndex ? 'w-6 bg-[#FFC745]' : 'w-2 bg-white/60 hover:bg-white'
					)}
					aria-label={`Pindah ke banner ${index + 1}`}
					data-testid={`banner-dot-${index}`}
				></button>
			{/each}
		</div>
	{/if}
</div>
