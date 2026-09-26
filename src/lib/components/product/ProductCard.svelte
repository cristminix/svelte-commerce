<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { Badge, Rating, PriceDisplay, Button } from '$lib/components/foundation'
	import { ShoppingCart, CheckCircle2, ShieldCheck } from '@lucide/svelte'

	export interface ProductItem {
		id: string | number
		name: string
		title?: string
		image?: string
		img?: string
		price: number
		originalPrice?: number
		rating?: number
		reviews?: number
		badges?: Array<{ text: string; variant?: 'discount' | 'bonus' | 'neutral' }> | string[]
		isOfficial?: boolean
		slug?: string
		storeName?: string
		location?: string
		bonusPoints?: number | string
		[key: string]: any
	}

	interface Props {
		product: ProductItem
		class?: string
		onaddtocart?: (product: ProductItem) => void
		onclick?: (product: ProductItem) => void
		[key: string]: any
	}

	let {
		product,
		class: className = '',
		onaddtocart = undefined,
		onclick = undefined,
		...restProps
	}: Props = $props()

	const title = $derived(product.name || product.title || 'Produk')
	const image = $derived(product.image || product.img || '/placeholder.png')
	const href = $derived(product.slug ? (product.slug.startsWith('/') ? product.slug : `/products/${product.slug}`) : `/products/${product.id}`)

	const discountPercent = $derived(
		product.originalPrice && product.originalPrice > product.price
			? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
			: 0
	)

	function handleAddToCart(e: MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		onaddtocart?.(product)
	}
</script>

<div
	class={cn(
		'group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900',
		className
	)}
	data-testid={`product-card-${product.id}`}
	data-product-id={product.id}
	{...restProps}
>
	<!-- Clickable card area linking to product detail -->
	<a
		{href}
		onclick={() => onclick?.(product)}
		class="flex flex-col flex-1 focus:outline-none"
		data-testid="product-card-link"
		aria-label={`Lihat detail ${title}`}
	>
		<!-- Image Container -->
		<div class="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-800" data-testid="product-image-container">
			<img
				src={image}
				alt={title}
				loading="lazy"
				class="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
				data-testid="product-image"
			/>

			<!-- Top Badges Overlay -->
			<div class="absolute left-2 top-2 flex flex-col gap-1 items-start z-10" data-testid="product-badges-container">
				<!-- Official Store Badge -->
				{#if product.isOfficial}
					<span
						class="inline-flex items-center gap-1 rounded bg-purple-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
						data-testid="official-badge"
						title="Toko Resmi Terverifikasi"
					>
						<ShieldCheck class="size-3" />
						<span>Official</span>
					</span>
				{/if}

				<!-- Discount Badge (if on sale) -->
				{#if discountPercent > 0}
					<Badge text={`${discountPercent}% Off`} variant="discount" data-testid="discount-badge" />
				{/if}
			</div>

			<!-- Bonus Points Badge Overlay (Top Right) -->
			{#if product.bonusPoints}
				<div class="absolute right-2 top-2 z-10">
					<Badge text={`Poin +${product.bonusPoints}`} variant="bonus" data-testid="bonus-points-badge" />
				</div>
			{/if}
		</div>

		<!-- Card Body Content -->
		<div class="flex flex-col flex-1 justify-between p-3 sm:p-3.5">
			<div>
				<!-- Store name / Official info if present -->
				{#if product.storeName}
					<div class="mb-1 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400" data-testid="product-store">
						{#if product.isOfficial}
							<CheckCircle2 class="size-3 text-purple-600 dark:text-purple-400 shrink-0" />
						{/if}
						<span class="truncate font-medium">{product.storeName}</span>
					</div>
				{/if}

				<!-- Product Title (Clamped to 2 lines) -->
				<h3
					class="line-clamp-2 text-xs sm:text-sm font-semibold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-gray-100 dark:group-hover:text-[#FFC745]"
					title={title}
					data-testid="product-title"
				>
					{title}
				</h3>

				<!-- Price Display -->
				<div class="mt-1.5" data-testid="product-price">
					<PriceDisplay
						price={product.price}
						originalPrice={product.originalPrice}
						size="sm"
					/>
				</div>
			</div>

			<div class="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800">
				<!-- Rating & Reviews -->
				{#if product.rating !== undefined}
					<div class="mb-2">
						<Rating score={product.rating} reviews={product.reviews} />
					</div>
				{/if}

				<!-- Additional Badges (e.g. Cashback, Produk Baru) -->
				{#if product.badges && product.badges.length > 0}
					<div class="mb-2 flex flex-wrap gap-1">
						{#each product.badges as b}
							{#if typeof b === 'string'}
								<Badge text={b} variant="neutral" />
							{:else}
								<Badge text={b.text} variant={b.variant || 'neutral'} />
							{/if}
						{/each}
					</div>
				{/if}

				<!-- Add to Cart Button -->
				<Button
					variant="primary"
					size="sm"
					icon
					class="w-full font-bold shadow-none"
					onclick={handleAddToCart}
					data-testid="add-to-cart-btn"
				>
					<ShoppingCart class="size-3.5" />
					<span>+ Keranjang</span>
				</Button>
			</div>
		</div>
	</a>
</div>
