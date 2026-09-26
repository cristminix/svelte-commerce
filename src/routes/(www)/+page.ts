import type { PageLoad } from './$types'
import { wwwLoad } from '$lib/core/load-functions/index.js'
import { BannerService } from '$lib/core/services'

export const load: PageLoad = async (event) => {
	const baseData = await wwwLoad(event)

	try {
		const bannerService = new BannerService(event.fetch)
		const bannersRes = await bannerService.list()
		const banners = bannersRes?.data || (Array.isArray(bannersRes) ? bannersRes : [])

		return {
			...baseData,
			banners
		}
	} catch (e) {
		console.warn('Failed to load banners from API:', e)
		return {
			...baseData,
			banners: []
		}
	}
}
