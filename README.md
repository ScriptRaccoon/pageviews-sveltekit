# Page Views for SvelteKit

This repository demonstrates how to track page views to a SvelteKit application.

Specifically, once a page is loaded, a request is sent to `/api/track`. The endpoint saves the page view to the database. Also, there is a dashboard page `/internal/stats` for the page statistics over time.
