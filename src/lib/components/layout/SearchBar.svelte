<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { Search, SlidersHorizontal, X } from '@lucide/svelte'

	interface Props {
		placeholder?: string
		value?: string
		showFilterButton?: boolean
		class?: string
		onsearch?: (query: string) => void
		onfilter?: () => void
		[key: string]: any
	}

	let {
		placeholder = 'Cari di Pang...',
		value = $bindable(''),
		showFilterButton = true,
		class: className = '',
		onsearch,
		onfilter,
		...restProps
	}: Props = $props()

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault()
		onsearch?.(value.trim())
	}

	function handleClear() {
		value = ''
		onsearch?.('')
	}
</script>

<form
	onsubmit={handleSubmit}
	class={cn('relative flex w-full items-center', className)}
	role="search"
	data-testid="search-bar"
	{...restProps}
>
	<div class="relative flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-white transition-all focus-within:border-[#FFC745] focus-within:ring-2 focus-within:ring-[#FFC745]/30 dark:border-gray-700 dark:bg-gray-800">
		<!-- Search Input -->
		<input
			type="text"
			bind:value
			{placeholder}
			class="h-10 w-full bg-transparent px-3.5 pr-8 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
			data-testid="search-input"
			aria-label={placeholder}
		/>

		<!-- Clear Button (if text entered) -->
		{#if value}
			<button
				type="button"
				onclick={handleClear}
				class="mr-1 rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
				aria-label="Hapus pencarian"
				data-testid="search-clear-btn"
			>
				<X class="size-4" />
			</button>
		{/if}

		<!-- Filter Button (Optional) -->
		{#if showFilterButton}
			<button
				type="button"
				onclick={() => onfilter?.()}
				class="border-l border-gray-200 px-2.5 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
				title="Filter Pencarian"
				aria-label="Filter Pencarian"
				data-testid="search-filter-btn"
			>
				<SlidersHorizontal class="size-4" />
			</button>
		{/if}

		<!-- Search Submit Button (Yellow toco accent) -->
		<button
			type="submit"
			class="flex h-10 items-center justify-center bg-[#FFC745] px-4 text-[#212121] transition-colors hover:bg-[#F0B830] active:bg-[#E5AB20]"
			aria-label="Cari"
			data-testid="search-submit-btn"
		>
			<Search class="size-4 stroke-[2.5]" />
		</button>
	</div>
</form>
