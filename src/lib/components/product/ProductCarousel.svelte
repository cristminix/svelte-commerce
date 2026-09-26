<script lang="ts">
	import { cn } from '$lib/core/utils'
	import ProductCard, { type ProductItem } from './ProductCard.svelte'
	import { ChevronLeft, ChevronRight } from '@lucide/svelte'

	interface Props {
		products: ProductItem[]
		class?: string
		cardClass?: string
		onaddtocart?: (product: ProductItem) => void
		onclick?: (product: ProductItem) => void
		[key: string]: any
	}

	let {
		products = [],
		class: className = '',
		cardClass = '',
		onaddtocart,
		onclick,
		...restProps
	}: Props = $props()

	let scrollContainer: HTMLDivElement | null = $state(null)

	function scroll(direction: 'left' | 'right') {
		if (!scrollContainer) return
		const scrollAmount = 300
		scrollContainer.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth'
		})
	}
</script>

<div
	class={cn('relative group w-full py-2', className)}
	data-testid="product-carousel"
	{...restProps}
>
	<!-- Left Navigation Button -->
	<button
		type="button"
		onclick={() => scroll('left')}
		class="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 disabled:opacity-0 sm:size-10 dark:border-gray-700 dark:bg-gray-800/95 dark:text-gray-200"
		aria-label="Scroll ke kiri"
		data-testid="carousel-prev-btn"
	>
		<ChevronLeft class="size-5" />
	</button>

	<!-- Horizontal Scrollable Container -->
	<div
		bind:this={scrollContainer}
		class="flex items-stretch gap-3 overflow-x-auto scroll-smooth px-1 py-2 scrollbar-none snap-x snap-mandatory sm:gap-4 md:gap-5"
		data-testid="carousel-scroll-container"
	>
		{#each products as product (product.id)}
			<div
				class={cn(
					'w-[160px] min-w-[160px] snap-start sm:w-[200px] sm:min-w-[200px] md:w-[220px] md:min-w-[220px]',
					cardClass
				)}
				data-testid="carousel-item"
			>
				<ProductCard
					{product}
					class="h-full"
					{onaddtocart}
					{onclick}
				/>
			</div>
		{/each}
	</div>

	<!-- Right Navigation Button -->
	<button
		type="button"
		onclick={() => scroll('right')}
		class="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 disabled:opacity-0 sm:size-10 dark:border-gray-700 dark:bg-gray-800/95 dark:text-gray-200"
		aria-label="Scroll ke kanan"
		data-testid="carousel-next-btn"
	>
		<ChevronRight class="size-5" />
	</button>
</div>
