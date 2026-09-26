import { describe, it, expect, beforeEach } from 'vitest'
import { mount, unmount } from 'svelte'
import LoginPage from '../src/routes/(www)/auth/login/+page.svelte'

describe('Auth Login Route (+page.svelte)', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})

	it('should be importable and defined', () => {
		expect(LoginPage).toBeDefined()
	})

	it('renders login form elements and Pang brand header', () => {
		const app = mount(LoginPage, {
			target: document.body
		})

		expect(document.body.textContent).toContain('Pang')
		expect(document.body.textContent).toContain('Masuk ke Akun')

		// Logo image
		const logoImg = document.body.querySelector('img[alt="Pang"]')
		expect(logoImg).not.toBeNull()
		expect(logoImg?.getAttribute('src')).toBe('/logo.svg')

		// Identifier input
		const input = document.body.querySelector('input[name="identifier"]')
		expect(input).not.toBeNull()

		// Submit button
		const submitBtn = document.body.querySelector('button[type="submit"]')
		expect(submitBtn).not.toBeNull()

		// Signup link
		const signupLink = document.body.querySelector('a[href="/auth/signup"]')
		expect(signupLink).not.toBeNull()

		unmount(app)
	})
})
