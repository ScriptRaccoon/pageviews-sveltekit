import type { RequestEvent } from '@sveltejs/kit'
import { Crawler } from 'es6-crawler-detect'
import { db } from './db'

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

	const today = new Date()
	const month = today.toISOString().substring(0, 7) // YYYY-MM

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

	visits_cache.set(cache_key, Date.now() + 1000 * 60 * 60) // 1h
}

export async function get_stats() {
	try {
		const sql_months = `
			SELECT path, month, visits
			FROM page_stats
			ORDER BY path, month`

		const sql_total = `
			SELECT path, SUM(visits) AS total_visits
			FROM page_stats
			GROUP BY path
			ORDER BY total_visits DESC`

		const [res_months, res_total] = await db.batch([
			{ sql: sql_months },
			{ sql: sql_total },
		])

		const visits_total = res_total.rows as unknown as {
			path: string
			total_visits: number
		}[]

		const visits_total_dict = Object.fromEntries(
			visits_total.map((obj) => [obj.path, obj.total_visits]),
		)

		const paths = visits_total.map((obj) => obj.path)

		const visits_monthly_ungrouped = res_months.rows as unknown as {
			path: string
			month: string
			visits: number
		}[]

		const visits_monthly_grouped: Record<string, [string, number][]> = {}

		for (const obj of visits_monthly_ungrouped) {
			visits_monthly_grouped[obj.path] ??= []
			visits_monthly_grouped[obj.path].push([obj.month, obj.visits])
		}

		const visits_monthly = Object.entries(visits_monthly_grouped)

		visits_monthly.sort((a, b) => visits_total_dict[b[0]] - visits_total_dict[a[0]])

		return { paths, visits_total, visits_monthly }
	} catch (err) {
		console.error(err)
		return null
	}
}
