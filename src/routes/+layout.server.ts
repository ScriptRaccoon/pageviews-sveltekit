import { TRACKED_PATHS } from '$lib/server/config'
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load: LayoutServerLoad = async () => {
	return { tracked_paths: TRACKED_PATHS }
}
