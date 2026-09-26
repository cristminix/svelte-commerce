<script lang="ts">
	import { cn } from '$lib/core/utils'
	import type { Snippet } from 'svelte'

	export type BadgeVariant = 'discount' | 'bonus' | 'neutral'

	interface Props {
		text?: string
		variant?: BadgeVariant
		class?: string
		children?: Snippet
		[key: string]: any
	}

	let {
		text = '',
		variant = 'neutral',
		class: className = '',
		children,
		...restProps
	}: Props = $props()

	const variantStyles: Record<BadgeVariant, string> = {
		discount: 'bg-red-600 text-white font-bold border border-red-600 shadow-sm',
		bonus: 'bg-[#FFF3D6] text-[#B87A00] font-semibold border border-[#FFE082]',
		neutral: 'bg-gray-100 text-gray-700 font-medium border border-gray-200'
	}
</script>

<span
	class={cn(
		'inline-flex items-center justify-center rounded px-1.5 py-0.5 text-badge leading-none select-none transition-colors',
		variantStyles[variant] || variantStyles.neutral,
		className
	)}
	data-testid="badge"
	data-variant={variant}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{text}
	{/if}
</span>
