---
Task ID: 1
Agent: Main Agent
Task: Vercel deployment preparation - JWT auth, remove filesystem, Prisma schema, config updates

Work Log:
- Replaced in-memory token store with JWT auth using `jose` library (stateless, works in serverless)
- Created `/src/lib/admin-auth.ts` with `generateAdminToken()`, `validateAdminToken()`, `getAuthTokenFromRequest()`
- Updated `/src/app/api/admin/login/route.ts` to use JWT instead of Map
- Updated `/src/app/api/admin/verify/route.ts` to use JWT validation
- Updated `/src/app/api/admin/upload/route.ts` to remove filesystem writes (Vercel has no persistent FS)
- Updated `/src/app/api/admin/books/route.ts` to use new auth module
- Updated `/src/app/api/admin/books/[id]/route.ts` to use new auth module
- Updated Prisma schema to remove `@db.Text` annotations (incompatible with SQLite, not needed since String maps to TEXT in both SQLite and PostgreSQL)
- Kept SQLite as local dev provider with instructions for switching to PostgreSQL for Vercel
- Updated `.env` with clear sections for local dev (SQLite) and Vercel/Supabase (PostgreSQL)
- Updated `next.config.ts` to remove `output: "standalone"` (Vercel handles this), added image optimization config
- Updated `package.json` scripts: added `postinstall` for Prisma generate, `db:migrate:prod`, simplified build script
- Installed `jose` package for JWT
- Tested all endpoints: login, verify, admin books (with auth), public books, manuscript upload
- All tests pass, lint clean, dev server running on port 3000

Stage Summary:
- Admin auth is now JWT-based (serverless-compatible)
- File uploads return content only (no filesystem writes)
- Schema is SQLite locally, PostgreSQL-ready for Vercel
- Project is Vercel-ready: just change provider to "postgresql" and set DATABASE_URL to Supabase connection string
