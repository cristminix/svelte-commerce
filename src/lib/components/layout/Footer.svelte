<script lang="ts">
	import { cn } from '$lib/core/utils'

	interface LinkItem {
		label: string
		href: string
	}

	interface LinkSection {
		title: string
		links: LinkItem[]
	}

	interface Props {
		class?: string
		sections?: LinkSection[]
		currentYear?: number
		[key: string]: any
	}

	let {
		class: className = '',
		sections = [
			{
				title: 'Layanan Pelanggan',
				links: [
					{ label: 'Pusat Bantuan', href: '/help' },
					{ label: 'Cara Belanja', href: '/cara-belanja' },
					{ label: 'Metode Pembayaran', href: '/pembayaran' },
					{ label: 'Lacak Pesanan', href: '/order-tracking' },
					{ label: 'Pengembalian Barang', href: '/refund-policy' }
				]
			},
			{
				title: 'Tentang Pang',
				links: [
					{ label: 'Tentang Kami', href: '/about' },
					{ label: 'Karir', href: '/careers' },
					{ label: 'Blog & Berita', href: '/blog' },
					{ label: 'Kebijakan Privasi', href: '/privacy-policy' },
					{ label: 'Syarat & Ketentuan', href: '/terms-and-conditions' }
				]
			},
			{
				title: 'Mitra & Kerjasama',
				links: [
					{ label: 'Daftar Toko Resmi', href: '/official-store' },
					{ label: 'Mitra Logistik', href: '/logistik' },
					{ label: 'Mulai Berjualan di Pang', href: '/auth/join-as-vendor' },
					{ label: 'Afiliasi Pang', href: '/affiliate' }
				]
			}
		],
		currentYear = new Date().getFullYear(),
		...restProps
	}: Props = $props()

	const paymentMethods = [
		{ name: 'BCA', label: 'BCA', bg: 'bg-blue-800 text-white' },
		{ name: 'Mandiri', label: 'Mandiri', bg: 'bg-yellow-500 text-blue-950' },
		{ name: 'BNI', label: 'BNI', bg: 'bg-teal-700 text-white' },
		{ name: 'BRI', label: 'BRI', bg: 'bg-blue-600 text-white' },
		{ name: 'Visa', label: 'VISA', bg: 'bg-blue-700 text-white font-serif' },
		{ name: 'Mastercard', label: 'Mastercard', bg: 'bg-red-600 text-white' },
		{ name: 'GoPay', label: 'GoPay', bg: 'bg-sky-600 text-white' },
		{ name: 'QRIS', label: 'QRIS', bg: 'bg-red-700 text-white' }
	]

	const socialMedia = [
		{
			name: 'Facebook',
			href: 'https://facebook.com',
			svg: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com',
			svg: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'
		},
		{
			name: 'Instagram',
			href: 'https://instagram.com',
			svg: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z'
		},
		{
			name: 'YouTube',
			href: 'https://youtube.com',
			svg: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z'
		}
	]
</script>

<footer
	class={cn('w-full border-t border-gray-200 bg-white pt-12 pb-8 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400', className)}
	data-testid="main-footer"
	{...restProps}
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Top Row: Links & Brand Info -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
			<!-- Col 1: Brand Info & App Download -->
			<div class="lg:col-span-2">
				<a href="/" class="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white" data-testid="footer-logo">
					<img src="/logo.svg" alt="Pang" class="h-8 w-auto object-contain" />
					<!-- <span>Pang</span>
					<span class="size-2 rounded-full bg-[#FFC745] inline-block"></span> -->
				</a>
				<p class="mt-3 text-sm text-gray-500 leading-relaxed max-w-sm dark:text-gray-400">
					Platform belanja online terpercaya dengan ribuan produk berkualitas, jaminan keamanan transaksi, dan pengiriman ke seluruh nusantara.
				</p>

				<!-- App Download Badges Mockup -->
				<div class="mt-5">
					<span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Unduh Aplikasi</span>
					<div class="mt-2 flex flex-wrap gap-2.5">
						<div class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-left dark:border-gray-700 dark:bg-gray-800">
							<span class="text-xs font-semibold text-gray-800 dark:text-gray-200">Google Play</span>
						</div>
						<div class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-left dark:border-gray-700 dark:bg-gray-800">
							<span class="text-xs font-semibold text-gray-800 dark:text-gray-200">App Store</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Col 2-4: Navigation Links -->
			{#each sections as section}
				<div>
					<h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider dark:text-white">
						{section.title}
					</h3>
					<ul class="mt-3 space-y-2 text-sm">
						{#each section.links as link}
							<li>
								<a href={link.href} class="transition-colors hover:text-[#B87A00] hover:underline dark:hover:text-[#FFC745]">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Middle Row: Payment Methods & Social Links -->
		<div class="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
			<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<!-- Payment Methods -->
				<div data-testid="payment-methods">
					<span class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
						Metode Pembayaran
					</span>
					<div class="mt-3 flex flex-wrap items-center gap-2">
						{#each paymentMethods as pm}
							<span
								class={cn(
									'inline-flex items-center justify-center rounded px-2.5 py-1 text-xs font-bold tracking-tight shadow-sm select-none',
									pm.bg
								)}
								data-testid={`payment-${pm.name.toLowerCase()}`}
								title={pm.name}
							>
								{pm.label}
							</span>
						{/each}
					</div>
				</div>

				<!-- Social Media Links -->
				<div data-testid="social-links">
					<span class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
						Ikuti Kami
					</span>
					<div class="mt-3 flex items-center gap-3">
						{#each socialMedia as sm}
							<a
								href={sm.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#FFC745] hover:text-[#212121] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-[#FFC745] dark:hover:text-[#212121]"
								aria-label={sm.name}
								data-testid={`social-${sm.name.toLowerCase()}`}
							>
								<svg class="size-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d={sm.svg} />
								</svg>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Copyright Row -->
		<div class="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-400 dark:border-gray-800">
			<p>© {currentYear} Pang. by PT. PAWON GEMILANG RASA</p>
		</div>
	</div>
</footer>
