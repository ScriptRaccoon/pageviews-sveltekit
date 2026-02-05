import { UNTRACKED_PATHS } from '$lib/server/config'
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load: LayoutServerLoad = async () => {
	return { untracked_paths: UNTRACKED_PATHS }
}
