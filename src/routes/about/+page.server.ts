import { save_visit } from '$lib/server/visit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	save_visit(event)
}
