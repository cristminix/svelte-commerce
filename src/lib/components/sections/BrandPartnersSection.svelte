<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { Award } from '@lucide/svelte'

	export interface BrandPartnerItem {
		id: string | number
		name: string
		logo?: string
		banner?: string
		discount?: string
		slug?: string
		[key: string]: any
	}

	interface Props {
		brands?: BrandPartnerItem[]
		title?: string
		subtitle?: string
		class?: string
		[key: string]: any
	}

	let {
		brands = [
			{
				id: 1,
				name: 'Philips',
				logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=200&q=80',
				banner: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80',
				discount: 'Diskon s/d 40%',
				slug: 'philips'
			},
			{
				id: 2,
				name: 'Sony Audio',
				logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80',
				banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
				discount: 'Cashback 100Rb',
				slug: 'sony'
			},
			{
				id: 3,
				name: 'Asus ROG',
				logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80',
				banner: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
				discount: 'Ekstra Garansi 1 Thn',
				slug: 'asus'
			},
			{
				id: 4,
				name: 'L’Oréal Paris',
				logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
				banner: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
				discount: 'Diskon s/d 50%',
				slug: 'loreal'
			}
		],
		title = 'Brand Pilihan',
		subtitle = 'Mitra resmi dengan promo dan penawaran eksklusif',
		class: className = '',
		...restProps
	}: Props = $props()
</script>

<section
	class={cn('my-8 md:my-12', className)}
	data-testid="brand-partners-section"
	{...restProps}
>
	<!-- Section Header -->
	<div class="mb-6 flex items-center justify-between">
		<div>
			<div class="flex items-center gap-2">
				<Award class="size-5 text-amber-500" />
				<h2 class="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white" data-testid="brand-partners-title">
					{title}
				</h2>
			</div>
			{#if subtitle}
				<p class="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
					{subtitle}
				</p>
			{/if}
		</div>
	</div>

	<!-- Brands Grid -->
	<div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" data-testid="brands-grid">
		{#each brands as brand (brand.id)}
			<a
				href={brand.slug ? `/brand/${brand.slug}` : `/brands/${brand.id}`}
				class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md sm:p-4 dark:border-gray-800 dark:bg-gray-900"
				data-testid="brand-partner-card"
			>
				<!-- Brand Mini Banner / Image -->
				{#if brand.banner}
					<div class="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
						<img
							src={brand.banner}
							alt={brand.name}
							class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						{#if brand.discount}
							<div class="absolute bottom-2 left-2 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
								{brand.discount}
							</div>
						{/if}
					</div>
				{:else if brand.discount}
					<div class="mb-2">
						<span class="inline-block rounded bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 px-1.5 py-0.5 text-[10px] font-bold">
							{brand.discount}
						</span>
					</div>
				{/if}

				<!-- Brand Info -->
				<div class="flex items-center gap-2.5">
					{#if brand.logo}
						<div class="flex size-9 sm:size-10 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-1 shadow-xs dark:border-gray-800 dark:bg-gray-800 shrink-0">
							<img src={brand.logo} alt={brand.name} class="size-full object-cover rounded-full" />
						</div>
					{/if}
					<div class="overflow-hidden">
						<h3 class="truncate text-xs sm:text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors dark:text-gray-100 dark:group-hover:text-[#FFC745]">
							{brand.name}
						</h3>
						<span class="text-[11px] text-gray-400 dark:text-gray-500">Official Partner</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
