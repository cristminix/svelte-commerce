<script lang="ts">
	import { cn } from '$lib/core/utils'
	import CategoryIcon from './CategoryIcon.svelte'

	export interface CategoryItem {
		id: string | number
		name: string
		icon?: string
		image?: string
		slug?: string
		[key: string]: any
	}

	interface Props {
		categories?: CategoryItem[]
		data?: CategoryItem[]
		class?: string
		oncategoryclick?: (category: CategoryItem) => void
		[key: string]: any
	}

	let {
		categories = undefined,
		data = undefined,
		class: className = '',
		oncategoryclick,
		...restProps
	}: Props = $props()

	const items = $derived(data || categories || [])
</script>

<div
	class={cn('w-full py-4', className)}
	data-testid="category-menu"
	{...restProps}
>
	<!-- Scrollable Category Row -->
	<div
		class="flex items-start gap-4 overflow-x-auto pb-2 scrollbar-none sm:gap-6 sm:justify-center md:gap-8"
		data-testid="category-menu-list"
	>
		{#each items as category (category.id || category.name)}
			<CategoryIcon
				name={category.name}
				icon={category.icon}
				image={category.image || category.img || category.thumbnail}
				slug={category.slug || category.href || category.link}
				onclick={() => oncategoryclick?.(category)}
			/>
		{/each}
	</div>
</div>
