<script lang="ts">
	import { cn } from '$lib/core/utils'

	type PriceSize = 'sm' | 'md' | 'lg'

	interface Props {
		price: number
		originalPrice?: number
		currency?: string
		size?: PriceSize
		showDiscountBadge?: boolean
		class?: string
		[key: string]: any
	}

	let {
		price = 0,
		originalPrice = undefined,
		currency = 'IDR',
		size = 'md',
		showDiscountBadge = false,
		class: className = '',
		...restProps
	}: Props = $props()

	const isDiscounted = $derived(
		typeof originalPrice === 'number' && originalPrice > price
	)

	const discountPercent = $derived(
		isDiscounted && originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
	)

	function formatPriceValue(val: number, curr: string): string {
		if (typeof val !== 'number' || isNaN(val)) return 'Rp 0'
		const rounded = Math.round(val)
		if (curr === 'IDR' || curr === 'Rp') {
			return `Rp ${rounded.toLocaleString('id-ID')}`
		}
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: curr,
			minimumFractionDigits: 0
		}).format(val)
	}

	const sizeClasses: Record<PriceSize, { price: string; original: string }> = {
		sm: {
			price: 'text-sm font-bold',
			original: 'text-xxs'
		},
		md: {
			price: 'text-base font-bold',
			original: 'text-xs'
		},
		lg: {
			price: 'text-xl font-bold',
			original: 'text-sm'
		}
	}
</script>

<div
	class={cn('inline-flex items-baseline flex-wrap gap-1.5 leading-tight', className)}
	data-testid="price-display"
	data-price={price}
	data-original-price={originalPrice}
	{...restProps}
>
	<!-- Final / Selling Price -->
	<span
		class={cn(
			'tracking-tight',
			sizeClasses[size]?.price || sizeClasses.md.price,
			isDiscounted ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
		)}
		data-testid="selling-price"
	>
		{formatPriceValue(price, currency)}
	</span>

	<!-- Original Price (Strike-through) -->
	{#if isDiscounted && originalPrice}
		<span
			class={cn(
				'line-through text-gray-400 dark:text-gray-500 font-normal',
				sizeClasses[size]?.original || sizeClasses.md.original
			)}
			data-testid="original-price"
		>
			{formatPriceValue(originalPrice, currency)}
		</span>

		{#if showDiscountBadge && discountPercent > 0}
			<span
				class="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 px-1 py-0.5 rounded leading-none border border-red-200 dark:border-red-900"
				data-testid="price-discount-badge"
			>
				{discountPercent}%
			</span>
		{/if}
	{/if}
</div>
