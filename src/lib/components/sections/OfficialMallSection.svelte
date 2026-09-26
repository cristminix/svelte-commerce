<script lang="ts">
	import { cn } from '$lib/core/utils'
	import ProductCard, { type ProductItem } from '$lib/components/product/ProductCard.svelte'
	import ProductCarousel from '$lib/components/product/ProductCarousel.svelte'
	import { ShieldCheck, ChevronRight, Store } from '@lucide/svelte'

	export interface OfficialStoreItem {
		id: string | number
		name: string
		logo?: string
		slug?: string
		category?: string
		[key: string]: any
	}

	interface Props {
		products?: ProductItem[]
		stores?: OfficialStoreItem[]
		title?: string
		actionText?: string
		actionHref?: string
		class?: string
		onaddtocart?: (product: ProductItem) => void
		[key: string]: any
	}

	let {
		products = [],
		stores = [
			{ id: 1, name: 'Samsung Official', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=120&q=80', slug: 'samsung' },
			{ id: 2, name: 'Nike Official Store', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80', slug: 'nike' },
			{ id: 3, name: 'Unilever Indonesia', logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=120&q=80', slug: 'unilever' },
			{ id: 4, name: 'Xiaomi Store', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80', slug: 'xiaomi' },
			{ id: 5, name: 'Eiger Adventure', logo: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=120&q=80', slug: 'eiger' }
		],
		title = 'Toko Mall',
		actionText = 'Semua Toko Mall',
		actionHref = '/official-store',
		class: className = '',
		onaddtocart,
		...restProps
	}: Props = $props()
</script>

<section
	class={cn('my-8 md:my-12 overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-b from-purple-50/60 to-white p-4 sm:p-6 md:p-8 dark:border-purple-950/40 dark:from-purple-950/10 dark:to-gray-900', className)}
	data-testid="official-mall-section"
	{...restProps}
>
	<!-- Mall Section Header -->
	<div class="mb-6 flex items-center justify-between gap-4">
		<div class="flex items-center gap-2.5">
			<div class="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
				<ShieldCheck class="size-5 sm:size-6" />
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h2 class="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white" data-testid="mall-title">
						{title}
					</h2>
					<span class="rounded bg-purple-600 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
						100% Ori
					</span>
				</div>
				<p class="text-xs text-gray-500 dark:text-gray-400">Jaminan produk original & garansi resmi</p>
			</div>
		</div>

		<a
			href={actionHref}
			class="group flex items-center gap-1 text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
			data-testid="mall-action-link"
		>
			<span>{actionText}</span>
			<ChevronRight class="size-4 transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>

	<!-- Products Carousel -->
	{#if products && products.length > 0}
		<div class="mb-8" data-testid="mall-products-carousel">
			<ProductCarousel
				{products}
				{onaddtocart}
			/>
		</div>
	{/if}

	<!-- Official Store Brands Row (Daftar Toko Resmi Pilihan) -->
	<div class="pt-6 border-t border-purple-100/80 dark:border-purple-950/50" data-testid="official-stores-row">
		<div class="mb-4 flex items-center gap-2">
			<Store class="size-4 text-purple-600 dark:text-purple-400" />
			<h3 class="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider dark:text-gray-200">
				Daftar Toko Resmi Pilihan
			</h3>
		</div>

		<div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
			{#each stores as store (store.id)}
				<a
					href={store.slug ? `/store/${store.slug}` : `/stores/${store.id}`}
					class="group flex flex-col items-center gap-2 text-center focus:outline-none shrink-0"
					data-testid="official-store-item"
				>
					<div class="flex size-14 sm:size-16 items-center justify-center overflow-hidden rounded-full border-2 border-purple-200 bg-white p-2 shadow-sm transition-all duration-200 group-hover:border-purple-600 group-hover:scale-105 dark:border-purple-900 dark:bg-gray-800">
						{#if store.logo}
							<img src={store.logo} alt={store.name} class="size-full object-cover rounded-full" />
						{:else}
							<Store class="size-6 text-purple-600" />
						{/if}
					</div>
					<span class="max-w-[80px] sm:max-w-[90px] truncate text-xs font-semibold text-gray-700 transition-colors group-hover:text-purple-700 dark:text-gray-300 dark:group-hover:text-purple-400">
						{store.name}
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
