import { initialize_db } from '$lib/server/db'
import { handle_session } from '$lib/server/sessions'
import type { Handle, ServerInit } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	handle_session(event)
	return await resolve(event)
}

export const init: ServerInit = async () => {
	await initialize_db()
}
