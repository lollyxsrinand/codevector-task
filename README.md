# CodeVector Take Home Task

## Overview

The project consists of:

* **Backend:** Fastify + TypeScript
* **Database:** Supabase (PostgreSQL)
* **Frontend:** Next.js
* **Deployment:** Render (Backend) + Vercel (Frontend)

The database contains **200,001 generated products**, each with:

* id
* name
* category
* price
* created_at
* updated_at
---
# Assignment Checklist

* [x] Generate ~200,000 products
* [x] Seed script committed
* [x] Fast pagination
* [x] Cursor-based pagination
* [x] Correct pagination while data changes
* [x] Category filtering
* [x] Newest-first sorting
* [x] Public backend deployment
* [x] Public frontend deployment
* [x] Simple UI for browsing products

---

# Features

* 200,001 seeded products
* Cursor-based pagination
* Category filtering
* Products sorted by newest first
* Stable pagination while data changes
* Fast backend API
* Responsive frontend
* Deployed backend
* Deployed frontend
* Backend kept awake using a scheduled cron job

---

# Tech Stack

## Backend

* Fastify
* TypeScript
* Supabase
* Faker.js (seed script)

## Frontend

* Next.js (App Router)
* React
* TypeScript
* Zustand

## Deployment

* Backend: Render
* Frontend: Vercel
* Database: Supabase
* Cron Job: UptimeRobot (10-minute interval)

---

# Pagination

I've found that cursor based pagination is much faster than offset.

The cursor consists of:

* `updated_at`
* `id`

This means:

* fast queries on large datasets
* deterministic ordering
* no duplicate products
* no skipped products while new rows are inserted or updated

Products are ordered by:

```sql
updated_at DESC,
id DESC
```

# Database Seeding

A seed script generates **200,000 fake products** using Faker.js and inserts them into Supabase in batches.

---

# Project Structure

```
backend/
    src/
        routes/
        services/
        scripts/
        lib/
        types/

frontend/
    app/
    components/
    stores/
    lib/
    types/
```
- `backend/script/seed.ts` has the seeding script
- `backend/services/` contains db operations file
- `backend/routes/` defines routes and it's handlers

---

# What I'd Improve

Given more time, I would:

* Extend API to manually add/edit/delete products
* Use a monorepo to share the `types/` between frontend and backend for consistency
* Measure API fetch times, display API stats and compare with time complexity in theory
* Add additional filters (price range, search, date range)
* Improve frontend UI/UX and rendering techniques
---