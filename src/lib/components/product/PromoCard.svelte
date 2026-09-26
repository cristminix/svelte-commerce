<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { Badge } from '$lib/components/foundation'
	import { ArrowRight } from '@lucide/svelte'

	interface Props {
		title: string
		subtitle?: string
		ctaText?: string
		ctaHref?: string
		badge?: string
		image?: string
		gradient?: string
		class?: string
		[key: string]: any
	}

	let {
		title,
		subtitle = undefined,
		ctaText = 'Lihat Promo',
		ctaHref = '/products',
		badge = undefined,
		image = undefined,
		gradient = 'from-[#FFF8E7] to-[#FFEEC2]',
		class: className = '',
		...restProps
	}: Props = $props()
</script>

<div
	class={cn(
		'group relative overflow-hidden rounded-2xl border border-amber-200/60 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl dark:border-gray-700',
		className
	)}
	data-testid="promo-card"
	{...restProps}
>
	<!-- Background Image or Gradient -->
	{#if image}
		<div class="absolute inset-0 z-0">
			<img src={image} alt={title} class="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
			<div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
		</div>
	{:else}
		<div class={cn('absolute inset-0 z-0 bg-gradient-to-br', gradient)}></div>
	{/if}

	<!-- Card Content -->
	<div class="relative z-10 flex h-full flex-col justify-between max-w-sm">
		<div>
			{#if badge}
				<div class="mb-3">
					<Badge text={badge} variant="bonus" class="font-bold" />
				</div>
			{/if}

			<h3
				class={cn(
					'text-xl font-black tracking-tight sm:text-2xl',
					image ? 'text-white' : 'text-gray-900 dark:text-gray-900'
				)}
				data-testid="promo-title"
			>
				{title}
			</h3>

			{#if subtitle}
				<p
					class={cn(
						'mt-2 text-xs sm:text-sm leading-relaxed',
						image ? 'text-gray-200' : 'text-gray-600 dark:text-gray-700'
					)}
					data-testid="promo-subtitle"
				>
					{subtitle}
				</p>
			{/if}
		</div>

		<div class="mt-6">
			<a
				href={ctaHref}
				class="inline-flex items-center gap-2 rounded-lg bg-[#FFC745] px-4 py-2 text-xs font-bold text-[#212121] shadow-sm transition-all hover:bg-[#F0B830] hover:gap-3 sm:text-sm"
				data-testid="promo-cta"
			>
				<span>{ctaText}</span>
				<ArrowRight class="size-4" />
			</a>
		</div>
	</div>
</div>
