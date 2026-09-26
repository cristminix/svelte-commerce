<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { ChevronRight } from '@lucide/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		title?: string
		subtitle?: string
		actionText?: string
		actionHref?: string
		class?: string
		containerClass?: string
		children?: Snippet
		headerRight?: Snippet
		[key: string]: any
	}

	let {
		title = undefined,
		subtitle = undefined,
		actionText = undefined,
		actionHref = undefined,
		class: className = '',
		containerClass = '',
		children,
		headerRight,
		...restProps
	}: Props = $props()
</script>

<section
	class={cn('my-6 md:my-10', className)}
	data-testid="content-section"
	{...restProps}
>
	<div class={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClass)}>
		<!-- Section Header (if title or action present) -->
		{#if title || actionText || headerRight}
			<div class="mb-4 flex items-center justify-between gap-4 md:mb-6" data-testid="section-header">
				<div>
					{#if title}
						<h2 class="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl tracking-tight dark:text-white" data-testid="section-title">
							{title}
						</h2>
					{/if}
					{#if subtitle}
						<p class="mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400" data-testid="section-subtitle">
							{subtitle}
						</p>
					{/if}
				</div>

				<!-- Right Action / Slot -->
				<div class="flex items-center gap-2">
					{#if headerRight}
						{@render headerRight()}
					{:else if actionText}
						<a
							href={actionHref || '#'}
							class="group flex items-center gap-1 text-xs font-semibold text-[#B87A00] transition-colors hover:text-[#8C5D00] sm:text-sm dark:text-[#FFC745] dark:hover:text-[#FFE082]"
							data-testid="section-action"
						>
							<span>{actionText}</span>
							<ChevronRight class="size-4 transition-transform group-hover:translate-x-0.5" />
						</a>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Section Content -->
		{#if children}
			<div data-testid="section-content">
				{@render children()}
			</div>
		{/if}
	</div>
</section>
