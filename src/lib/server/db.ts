import { DB_AUTH_TOKEN, DB_URL } from '$env/static/private'
import { createClient, type LibsqlError } from '@libsql/client'

export const db = createClient({
	url: DB_URL,
	authToken: DB_AUTH_TOKEN,
})

export async function initialize_db() {
	try {
		await db.execute('PRAGMA foreign_keys = ON')
		console.info('Database initialized ✅')
	} catch (err) {
		console.error((err as LibsqlError).message)
	}
}
