<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { 
		Sparkles, 
		Tv, 
		Shirt, 
		Smartphone, 
		Laptop, 
		Utensils, 
		Baby, 
		Car, 
		HeartHandshake, 
		ShoppingBag,
		type Icon
	} from '@lucide/svelte'

	interface Props {
		name: string
		icon?: string
		image?: string
		slug?: string
		class?: string
		onclick?: () => void
		[key: string]: any
	}

	let {
		name,
		icon = undefined,
		image = undefined,
		slug = undefined,
		class: className = '',
		onclick = undefined,
		...restProps
	}: Props = $props()

	const iconMap: Record<string, any> = {
		electronic: Tv,
		fashion: Shirt,
		mobile: Smartphone,
		computer: Laptop,
		food: Utensils,
		baby: Baby,
		automotive: Car,
		beauty: Sparkles,
		health: HeartHandshake,
		general: ShoppingBag
	}

	const IconComponent = $derived(icon && iconMap[icon.toLowerCase()] ? iconMap[icon.toLowerCase()] : ShoppingBag)
	const href = $derived(slug ? (slug.startsWith('/') ? slug : `/${slug}`) : '#')
</script>

<a
	{href}
	onclick={(e) => {
		if (onclick) {
			e.preventDefault()
			onclick()
		}
	}}
	class={cn(
		'group flex flex-col items-center justify-start gap-2 p-1 text-center transition-transform hover:-translate-y-0.5 focus:outline-none',
		className
	)}
	data-testid="category-icon-item"
	data-category-name={name}
	{...restProps}
>
	<!-- Circle Icon Container -->
	<div
		class="relative flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white p-2.5 shadow-sm transition-all duration-200 group-hover:border-[#FFC745] group-hover:bg-amber-50/50 group-hover:shadow md:size-14 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-[#FFC745]"
		data-testid="category-circle"
	>
		{#if image}
			<img src={image} alt={name} class="size-full object-contain" />
		{:else}
			<IconComponent class="size-6 text-gray-700 transition-colors group-hover:text-amber-600 dark:text-gray-200 dark:group-hover:text-[#FFC745]" />
		{/if}
	</div>

	<!-- Category Label -->
	<span
		class="max-w-[72px] text-center text-xs font-medium text-gray-700 line-clamp-2 transition-colors group-hover:text-amber-600 md:max-w-[84px] dark:text-gray-300 dark:group-hover:text-[#FFC745]"
		data-testid="category-name"
	>
		{name}
	</span>
</a>
