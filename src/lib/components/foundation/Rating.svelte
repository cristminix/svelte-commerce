<script lang="ts">
	import { cn } from '$lib/core/utils'

	interface Props {
		score: number
		reviews?: number
		showStars?: boolean
		maxStars?: number
		class?: string
		[key: string]: any
	}

	let {
		score = 0,
		reviews = undefined,
		showStars = false,
		maxStars = 5,
		class: className = '',
		...restProps
	}: Props = $props()

	const formattedScore = $derived(
		typeof score === 'number' && !isNaN(score)
			? score % 1 === 0
				? score.toFixed(1)
				: score.toFixed(1)
			: '0.0'
	)

	const stars = $derived(
		Array.from({ length: maxStars }, (_, i) => ({
			filled: i + 1 <= Math.round(score)
		}))
	)
</script>

<div
	class={cn('inline-flex items-center gap-1 text-rating text-gray-700 dark:text-gray-300', className)}
	data-testid="rating"
	data-score={score}
	data-reviews={reviews}
	role="group"
	aria-label={`Rating ${formattedScore} dari ${maxStars} bintang${reviews !== undefined ? `, ${reviews} ulasan` : ''}`}
	{...restProps}
>
	{#if showStars}
		<div class="flex items-center gap-0.5" aria-hidden="true">
			{#each stars as star, i}
				<svg
					class={cn(
						'size-3.5 shrink-0 transition-colors',
						star.filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600'
					)}
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					data-testid={`star-${i + 1}`}
				>
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			{/each}
		</div>
	{:else}
		<svg
			class="size-3.5 shrink-0 fill-amber-400 text-amber-400"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	{/if}

	<span class="font-semibold text-gray-900 dark:text-gray-100" data-testid="rating-score">
		{formattedScore}
	</span>

	{#if reviews !== undefined && reviews !== null}
		<span class="text-gray-500 dark:text-gray-400" data-testid="rating-reviews">
			({reviews})
		</span>
	{/if}
</div>
