<script lang="ts">
	import { cn } from '$lib/core/utils'
	import PromoCard from '$lib/components/product/PromoCard.svelte'

	interface Props {
		class?: string
		[key: string]: any
	}

	let { class: className = '', ...restProps }: Props = $props()
</script>

<section
	class={cn('my-8 md:my-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6', className)}
	data-testid="promo-section"
	{...restProps}
>
	<PromoCard
		title="Buritan Miom Promenya!"
		subtitle="Nikmati cashback hingga 50% dan gratis ongkir untuk transaksi belanja pilihanmu hari ini!"
		badge="Promo Spesial"
		ctaText="Cek Promo Sekarang"
		ctaHref="/promo"
		gradient="from-[#FFE4B5] to-[#FFD580]"
	/>

	<PromoCard
		title="Katalog Lengkap Produk Pang"
		subtitle="Jelajahi jutaan produk berkualitas mulai dari gadget, fesyen, hingga perabotan rumah tangga."
		badge="Katalog Baru"
		ctaText="Lihat Katalog Lengkap"
		ctaHref="/products"
		gradient="from-[#FFF3D6] to-[#FFE8A3]"
	/>
</section>
