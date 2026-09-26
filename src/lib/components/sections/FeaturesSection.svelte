<script lang="ts">
	import { cn } from '$lib/core/utils'
	import { Truck, ShieldCheck, CreditCard, Headphones, Sparkles } from '@lucide/svelte'

	export interface FeatureItem {
		id: string | number
		title: string
		description: string
		icon?: string
		[key: string]: any
	}

	interface Props {
		features?: FeatureItem[]
		title?: string
		class?: string
		[key: string]: any
	}

	let {
		features = [
			{
				id: 1,
				title: 'Gratis Ongkir Seluruh Indonesia',
				description: 'Nikmati subsidi ongkos kirim tanpa minimum transaksi',
				icon: 'truck'
			},
			{
				id: 2,
				title: 'Jaminan 100% Produk Original',
				description: 'Semua produk terverifikasi dengan garansi uang kembali',
				icon: 'shield'
			},
			{
				id: 3,
				title: 'Pembayaran Aman & Lengkap',
				description: 'Mendukung transfer bank, e-wallet, kartu kredit, dan COD',
				icon: 'payment'
			},
			{
				id: 4,
				title: 'Layanan Bantuan 24/7',
				description: 'Tim kami selalu siap membantu setiap kendala belanja Anda',
				icon: 'support'
			}
		],
		title = 'Fitur Unggulan & Layanan toco',
		class: className = '',
		...restProps
	}: Props = $props()
</script>

<section
	class={cn('my-8 md:my-12 rounded-2xl bg-amber-50/40 p-6 md:p-8 border border-amber-100 dark:border-gray-800 dark:bg-gray-900', className)}
	data-testid="features-section"
	{...restProps}
>
	{#if title}
		<div class="mb-6 flex items-center gap-2">
			<Sparkles class="size-5 text-amber-500" />
			<h2 class="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white" data-testid="features-title">
				{title}
			</h2>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="features-grid">
		{#each features as feature (feature.id)}
			<div
				class="flex items-start gap-3.5 rounded-xl border border-gray-100 bg-white p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/80"
				data-testid="feature-card"
			>
				<div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
					{#if feature.icon === 'truck'}
						<Truck class="size-5" />
					{:else if feature.icon === 'shield'}
						<ShieldCheck class="size-5" />
					{:else if feature.icon === 'payment'}
						<CreditCard class="size-5" />
					{:else if feature.icon === 'support'}
						<Headphones class="size-5" />
					{:else}
						<Sparkles class="size-5" />
					{/if}
				</div>

				<div>
					<h3 class="text-sm font-bold text-gray-900 dark:text-white" data-testid="feature-title">
						{feature.title}
					</h3>
					<p class="mt-1 text-xs text-gray-500 leading-relaxed dark:text-gray-400" data-testid="feature-description">
						{feature.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>
