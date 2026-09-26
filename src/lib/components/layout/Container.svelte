<script lang="ts">
	import { cn } from '$lib/core/utils'
	import type { Snippet } from 'svelte'

	interface Props {
		class?: string
		children?: Snippet
		[key: string]: any
	}

	let { class: className = '', children, ...restProps }: Props = $props()
</script>

<div
	class={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
	data-testid="layout-container"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
