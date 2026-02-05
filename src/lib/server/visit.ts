import type { RequestEvent } from '@sveltejs/kit'
import { Crawler } from 'es6-crawler-detect'
import { db } from './db'
import { get_current_month } from './utils'

const CrawlerDetector = new Crawler()

const visits_cache: Map<string, number> = new Map()

function clean_cache() {
	const now = Date.now()
	for (const [key, expires_at] of visits_cache.entries()) {
		if (expires_at <= now) visits_cache.delete(key)
	}
}

export async function save_visit(event: RequestEvent) {
	const ua = event.request.headers.get('user-agent') ?? ''
	if (CrawlerDetector.isCrawler(ua)) return

	const path = event.url.pathname
	const session_id = event.locals.session_id

	clean_cache()
	const cache_key = `${session_id}:${path}`
	if (visits_cache.has(cache_key)) return

	const month = get_current_month()

	const sql = `
		INSERT INTO page_stats
			(path, month, visits)
		VALUES
			(?, ?, 1)
		ON CONFLICT (path, month)
			DO UPDATE SET visits = visits + 1`

	const args = [path, month]

	try {
		await db.execute(sql, args)
	} catch (err) {
		console.error(err)
		return
	}

	const expires_at = Date.now() + 1000 * 60 * 60 // 1h
	visits_cache.set(cache_key, expires_at)
}
