import { get_stats } from '$lib/server/stats'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const stats = await get_stats()
	if (!stats) error(500, 'Could not load stats')
	return { stats }
}
