import type { RequestEvent } from '@sveltejs/kit'
import crypto from 'node:crypto'

export function handle_session(event: RequestEvent) {
	const saved_session_id = event.cookies.get('session_id')
	if (saved_session_id) {
		event.locals.session_id = saved_session_id
		return
	}

	const session_id = crypto.randomUUID()

	event.cookies.set('session_id', session_id, {
		path: '/',
		maxAge: 60 * 60,
		sameSite: true,
		httpOnly: true,
		secure: true,
	})

	event.locals.session_id = session_id
}
