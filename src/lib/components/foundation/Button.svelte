<script lang="ts">
	import { cn } from '$lib/core/utils'
	import type { Snippet } from 'svelte'

	export type ButtonVariant = 'primary' | 'outline' | 'ghost'
	export type ButtonSize = 'sm' | 'md' | 'lg'

	interface Props {
		variant?: ButtonVariant
		size?: ButtonSize
		icon?: boolean
		type?: 'button' | 'submit' | 'reset'
		disabled?: boolean
		href?: string
		class?: string
		ref?: HTMLElement | null
		children?: Snippet
		onclick?: (event: MouseEvent) => void
		[key: string]: any
	}

	let {
		variant = 'primary',
		size = 'md',
		icon = false,
		type = 'button',
		disabled = false,
		href = undefined,
		class: className = '',
		ref = $bindable(null),
		children,
		onclick,
		...restProps
	}: Props = $props()

	const variantStyles: Record<ButtonVariant, string> = {
		primary: 'bg-[#FFC745] hover:bg-[#F0B830] text-[#212121] font-semibold shadow-sm focus-visible:ring-[#FFC745]/50 border border-transparent',
		outline: 'bg-white hover:bg-gray-50 text-gray-800 font-medium border border-gray-300 shadow-sm focus-visible:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
		ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 font-medium hover:text-gray-900 border border-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
	}

	const sizeStyles: Record<ButtonSize, { standard: string; iconOnly: string }> = {
		sm: {
			standard: 'h-8 px-3 text-xs rounded-md gap-1.5',
			iconOnly: 'h-8 w-8 p-0 rounded-md'
		},
		md: {
			standard: 'h-10 px-4 text-sm rounded-md gap-2',
			iconOnly: 'h-10 w-10 p-0 rounded-md'
		},
		lg: {
			standard: 'h-12 px-6 text-base rounded-lg gap-2.5',
			iconOnly: 'h-12 w-12 p-0 rounded-lg'
		}
	}

	const baseClasses =
		'inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'

	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault()
			event.stopPropagation()
			return
		}
		onclick?.(event)
	}
</script>

{#if href}
	<a
		bind:this={ref}
		{href}
		class={cn(
			baseClasses,
			variantStyles[variant] || variantStyles.primary,
			icon && !children
				? (sizeStyles[size]?.iconOnly || sizeStyles.md.iconOnly)
				: (sizeStyles[size]?.standard || sizeStyles.md.standard),
			className
		)}
		aria-disabled={disabled ? 'true' : undefined}
		tabindex={disabled ? -1 : undefined}
		data-testid="foundation-button"
		data-variant={variant}
		data-size={size}
		onclick={handleClick}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		{type}
		{disabled}
		onclick={handleClick}
		class={cn(
			baseClasses,
			variantStyles[variant] || variantStyles.primary,
			icon && !children
				? (sizeStyles[size]?.iconOnly || sizeStyles.md.iconOnly)
				: (sizeStyles[size]?.standard || sizeStyles.md.standard),
			className
		)}
		data-testid="foundation-button"
		data-variant={variant}
		data-size={size}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
