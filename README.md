# Page Views for SvelteKit apps

This repository demonstrates how to track page views in a SvelteKit application.

When a page loads, a request is sent to `/api/track`, where the page view is stored in the database. An internal dashboard at `/internal/stats` displays page statistics over time.

<br /><img src="https://github.com/user-attachments/assets/228660be-a820-4887-9175-e7a046b7b23b" width="350" alt="dashboard" />
