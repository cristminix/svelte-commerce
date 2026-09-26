import type { PageLoad } from './$types'
import { wwwLoad } from '$lib/core/load-functions/index.js'
import { BannerService, CategoryService } from '$lib/core/services'

export const load: PageLoad = async (event) => {
	const baseData = await wwwLoad(event)

	let banners = []
	try {
		const bannerService = new BannerService(event.fetch)
		const bannersRes = await bannerService.list()
		banners = bannersRes?.data || (Array.isArray(bannersRes) ? bannersRes : [])
	} catch (e) {
		console.warn('Failed to load banners from API:', e)
	}

	let categories = []
	try {
		const categoryService = new CategoryService(event.fetch)
		const categoriesRes = await categoryService.fetchAllCategories()
		categories = categoriesRes?.data || (Array.isArray(categoriesRes) ? categoriesRes : [])
	} catch (e) {
		console.warn('Failed to load categories from API:', e)
	}

	return {
		...baseData,
		banners,
		categories
	}
}
