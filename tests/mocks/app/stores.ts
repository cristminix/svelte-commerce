import { readable } from 'svelte/store'
import { vi } from 'vitest'

export const getStores = vi.fn()
export const navigating = readable(null)
export const page = readable({
	url: new URL('http://localhost'),
	params: {},
	route: { id: '/' },
	status: 200,
	error: null,
	data: {},
	form: null
})
export const updated = readable(false)
