import type { RequestEvent } from '@sveltejs/kit'
import { Crawler } from 'es6-crawler-detect'
import { db } from './db'

const CrawlerDetector = new Crawler()

const visits_cache: Map<string, Set<string>> = new Map()

export async function save_visit(event: RequestEvent) {
	const ua = event.request.headers.get('user-agent') ?? ''
	if (CrawlerDetector.isCrawler(ua)) return

	const path = event.url.pathname

	const session_id = event.locals.session_id
	const cache_entry = visits_cache.get(session_id) ?? new Set()
	if (cache_entry.has(path)) return

	const now = new Date()
	const month = now.toISOString().substring(0, 7) // YYYY-MM

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

	cache_entry.add(path)
	visits_cache.set(session_id, cache_entry)
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

		return { paths, visits_total, visits_monthly }
	} catch (err) {
		console.error(err)
		return null
	}
}
