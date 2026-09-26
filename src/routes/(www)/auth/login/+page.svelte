<script lang="ts">
	import { LoaderIcon } from '@lucide/svelte'
	import * as InputOTP from '$lib/components/ui/input-otp/index.js'
	import Button from '$lib/components/ui/button/button.svelte'
	import { Label } from '$lib/components/ui/label/index.js'
	import { env } from '$env/dynamic/public'
	import Textbox from '$lib/components/form/textbox.svelte'
	import { page } from '$app/state'
	import { LoginModule, loginModuleSchema as schemas } from '$lib/core/composables/index.js'
	import { SeoHeader } from '$lib/core/components/index.js'

	const loginModule = new LoginModule()
</script>

<svelte:head>
	<title>Masuk | Pang</title>
	<meta name="description" content="Masuk ke akun Pang Anda untuk menikmati pengalaman berbelanja online terbaik." />
</svelte:head>

<SeoHeader metaTitle="Masuk" noindex={true} />

<div
	class="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50/60 px-4 py-12 dark:bg-gray-900/60 sm:px-6 lg:px-8"
>
	<div
		class="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all dark:border-gray-800 dark:bg-gray-850"
	>
		<!-- Brand & Header -->
		<div class="space-y-3 text-center">
			<a href="/" class="inline-flex items-center gap-2" aria-label="Pang homepage">
				<img src="/logo.svg" alt="Pang" class="h-10 w-auto object-contain" />
				<span class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Pang</span>
			</a>
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{loginModule.step === 1 ? 'Masuk ke Akun' : 'Verifikasi OTP'}
			</h1>
			<p class="text-xs text-gray-500 dark:text-gray-400">
				{loginModule.step === 1
					? 'Selamat datang kembali! Silakan masukkan detail akun Anda.'
					: 'Masukkan kode 4 digit OTP yang telah dikirim ke nomor Anda.'}
			</p>
		</div>

		{#if loginModule.step === 1}
			<form onsubmit={loginModule.handleSubmit} class="flex flex-col space-y-4">
				<div class="space-y-4">
					<!-- Identifier Field (Phone or Email) -->
					<div class="space-y-2">
						<div class="flex items-center justify-between gap-2">
							<Label for="identifier" class="text-sm font-medium text-gray-700 dark:text-gray-300">
								{#if loginModule.identifier.length === 0}
									{#if env.PUBLIC_LOGIN_TYPE === 'PHONE'}
										Nomor Telepon
									{:else if env.PUBLIC_LOGIN_TYPE === 'EMAIL'}
										Alamat Email
									{:else}
										{loginModule.isPhoneNumber ? 'Nomor Telepon' : 'Alamat Email'}
									{/if}
								{:else}
									{loginModule.isPhoneNumber ? 'Nomor Telepon' : 'Alamat Email'}
								{/if}
							</Label>

							{#if !env.PUBLIC_LOGIN_TYPE}
								<button
									type="button"
									class="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline dark:text-amber-400"
									onclick={loginModule.switchLoginType}
								>
									Gunakan {loginModule.isPhoneNumber ? 'Email' : 'Nomor Telepon'}
								</button>
							{/if}
						</div>

						{#key loginModule.isPhoneNumber}
							<Textbox
								name="identifier"
								bind:value={loginModule.identifier}
								placeholder={loginModule.isPhoneNumber ? 'Contoh: 081234567890' : 'nama@email.com'}
								type={loginModule.isPhoneNumber ? 'tel' : 'email'}
								schema={loginModule.isPhoneNumber ? schemas.phone : schemas.email}
								class="h-11 rounded-lg"
								required
							/>
						{/key}
					</div>

					<!-- Password Field (Only for Email login) -->
					{#if !loginModule.isPhoneNumber}
						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<Label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">
									Kata Sandi
								</Label>
								<a
									href="/auth/forgot-password"
									class="text-xs font-medium text-gray-500 hover:text-amber-600 hover:underline dark:text-gray-400"
								>
									Lupa kata sandi?
								</a>
							</div>
							<Textbox
								name="password"
								type="password"
								bind:value={loginModule.password}
								placeholder="Masukkan kata sandi Anda"
								schema={schemas.password}
								class="h-11 rounded-lg"
								required
							/>
						</div>
					{/if}
				</div>

				<!-- Submit Button -->
				<Button
					type="submit"
					class="mt-2 h-11 w-full rounded-lg bg-[#FFC745] font-bold text-gray-900 shadow-xs transition-all hover:bg-[#f0b830] active:scale-[0.99] dark:bg-[#FFC745] dark:text-gray-900"
					disabled={loginModule.isLoading}
				>
					{#if loginModule.isLoading}
						<LoaderIcon class="mr-2 h-4 w-4 animate-spin" />
						Memproses...
					{:else}
						{loginModule.isPhoneNumber ? 'Kirim Kode OTP' : 'Masuk Sekarang'}
					{/if}
				</Button>

				<!-- Signup Link -->
				{#if loginModule.showSignupButton}
					<div class="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
						Belum punya akun di Pang?
						<a
							href="/auth/signup"
							class="ml-1 font-bold text-gray-900 hover:text-amber-600 hover:underline dark:text-white"
						>
							Daftar Sekarang
						</a>
					</div>
				{/if}

				<!-- Terms & Conditions Note -->
				<p class="pt-2 text-center text-[11px] text-gray-400 dark:text-gray-500">
					Dengan masuk, Anda menyetujui
					<a href="/terms-and-conditions" class="underline hover:text-gray-600 dark:hover:text-gray-300">
						Syarat & Ketentuan
					</a>
					dan
					<a href="/privacy-policy" class="underline hover:text-gray-600 dark:hover:text-gray-300">
						Kebijakan Privasi
					</a>
					Pang.
				</p>

				{#if page?.data?.store?.plugins?.isMultiVendor?.active}
					<div class="border-t border-gray-100 pt-3 text-center dark:border-gray-800">
						<a
							href="/auth/join-as-vendor"
							class="text-xs font-semibold text-gray-600 hover:text-amber-600 hover:underline dark:text-gray-300"
						>
							Buka Toko di Pang &rarr;
						</a>
					</div>
				{/if}
			</form>
		{:else if loginModule.step === 2}
			<!-- Step 2: OTP Verification -->
			<div class="space-y-6">
				<div class="flex justify-center">
					<InputOTP.Root maxlength={4} bind:value={loginModule.otp}>
						{#snippet children({ cells })}
							<InputOTP.Group>
								{#each cells as cell}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
				</div>

				<p class="text-center text-sm text-gray-600 dark:text-gray-400">
					Tidak menerima kode OTP?
					<button
						type="button"
						class="ml-1 font-semibold text-amber-600 hover:underline dark:text-amber-400"
						onclick={() => (loginModule.step = 1)}
					>
						Kirim Ulang
					</button>
				</p>

				<Button
					class="h-11 w-full rounded-lg bg-[#FFC745] font-bold text-gray-900 shadow-xs hover:bg-[#f0b830] dark:bg-[#FFC745] dark:text-gray-900"
					onclick={loginModule.handleVerifyOtp}
					disabled={loginModule.otp.length !== 4 || loginModule.isLoading}
				>
					{#if loginModule.isLoading}
						<LoaderIcon class="mr-2 h-4 w-4 animate-spin" />
						Memverifikasi...
					{:else}
						Verifikasi & Masuk
					{/if}
				</Button>
			</div>
		{/if}
	</div>
</div>
