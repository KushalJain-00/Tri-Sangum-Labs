TRISANGUM LABS
त्रि-संगम  ·  Where builders find builders.
Technical Requirements Document
TriSangum Labs — Developer Collaboration Platform
Version 1.1  ·  June 2026  ·  Status: Draft
Authors: TriSangum Labs Founding Team
Stack: React + FastAPI + Neon + Supabase Auth
1. Technical Overview
This document defines the complete technical architecture, stack decisions, database schema, API contracts, frontend structure, and deployment strategy for TriSangum Labs Phase 1 MVP.
Design principle
All technical decisions were made based on the team's actual current skill levels — not what sounds impressive. The goal is to ship something real and working, not to over-engineer.
When in doubt, do the simpler thing. Ship something that works over something that is perfect.
2. System Architecture
2.1  Architecture Overview
TriSangum Labs uses a three-tier web architecture: a React SPA on the frontend, a FastAPI REST backend, and a PostgreSQL database hosted on Neon. Supabase is used exclusively for authentication — it is not the database host.
Layer
Technology
Hosting
Purpose
Frontend
React 18 + Vite + Tailwind CSS
Vercel
User interface — all pages and components
Backend
Python FastAPI
Railway (paid plan)
REST API — all business logic and data access
Database
PostgreSQL via Neon
Neon (paid plan)
Persistent data storage — always-on, serverless Postgres
Auth
Supabase Auth
Supabase (free tier sufficient)
JWT sessions, OAuth, user management — auth only
Email
Resend
Resend (pay-as-you-go)
Contribution notifications, password reset, nudge emails
Storage
Cloudinary
Cloudinary (free tier)
Avatars and project images
Monitoring
Railway metrics + Neon dashboard
Included
Basic uptime and query monitoring
2.2  Why Neon, Not Supabase DB
This is a deliberate architectural decision — not a default.
Supabase DB has a 60-connection limit on the free tier, spins down after inactivity, and creates vendor lock-in across auth + DB simultaneously. Decoupling auth (Supabase) from the database (Neon) gives us a clean separation of concerns and a straightforward migration path.
Neon gives us: real always-on Postgres, database branching (dev/staging/prod), connection pooling built-in, and a standard PostgreSQL connection string. Zero code changes if we ever need to migrate to a dedicated server — it is just a DATABASE_URL swap.
2.3  Why Railway, Not Render
Render free tier spins down after inactivity — 30–60 second cold starts will kill a live demo or classroom pitch.
Railway paid plan (~$5/month) keeps the backend always-on. No cold starts. No surprises.
Railway deploys from GitHub push, has a clean dashboard, and supports environment variables natively.
At MVP scale, Railway is the right balance of simplicity and reliability.
2.4  Communication Flow
User opens browser → Vercel serves the React SPA (CDN-cached, fast globally).
React app authenticates via Supabase Auth SDK (client-side only). Supabase issues a signed JWT.
React app sends HTTP requests to FastAPI backend on Railway, with JWT in Authorization header.
FastAPI middleware verifies JWT signature using Supabase JWT secret on every protected request.
FastAPI queries PostgreSQL on Neon via SQLAlchemy async, returns JSON.
React updates UI state via React Query cache and re-renders.
2.5  Environment Separation
Environment
Frontend
Backend
Database
Auth
Development
Local Vite (port 5173)
Local uvicorn (port 8000)
Neon dev branch
Supabase dev project
Staging (optional)
Vercel preview deployment
Railway preview service
Neon staging branch
Supabase dev project
Production
Vercel production
Railway production service
Neon main branch
Supabase prod project
All secrets in .env files — never committed to Git. .env is in .gitignore from day one.
Neon branching: dev branch for local development, main branch for production. Branches are free on Neon paid plan.
3. Tech Stack
3.1  Frontend
Package
Version
Purpose
react
18.x
UI framework
vite
5.x
Build tool and dev server — fast HMR
react-router-dom
6.x
Client-side routing
tailwindcss
3.x
Utility-first CSS — design system tokens via CSS custom properties
@supabase/supabase-js
2.x
Auth client — OAuth, session management, token refresh
axios
1.x
HTTP client for API calls to FastAPI backend
@tanstack/react-query
5.x
Server state management, caching, loading/error states
3.2  Backend
Package
Version
Purpose
fastapi
0.110+
Web framework — async, auto Swagger at /docs
uvicorn
0.29+
ASGI server
sqlalchemy
2.x
Async ORM for database access — use AsyncSession
asyncpg
0.29+
Async PostgreSQL driver — required for SQLAlchemy async
alembic
1.x
Database migrations
pydantic
2.x
Request/response validation and serialisation
python-jose
3.x
JWT token verification against Supabase JWT secret
passlib + bcrypt
1.x
Password hashing for email/password auth
python-multipart
latest
File upload handling
cloudinary
1.x
Image upload client
resend
latest
Email sending (notifications, password reset)
python-dotenv
latest
Environment variable loading
slowapi
latest
Rate limiting on auth endpoints
pytest + httpx
latest
Testing — unit and integration
3.3  Stack Justifications
FastAPI over Node/Express: 
Lead backend developer knows Python. Forcing Node doubles the learning curve. FastAPI is modern, async, and auto-generates Swagger docs at /docs.
Neon over Supabase DB: 
Always-on Postgres with no connection limit issues at MVP scale. Branching for dev/prod. Clean migration path. Explained fully in Section 2.2.
Supabase Auth only: 
GitHub OAuth, JWT management, password reset, and session refresh are all handled. No custom OAuth implementation needed. Supabase auth is genuinely good — only the DB hosting is suboptimal.
React Query over Redux: 
For an MVP with a small team, React Query handles all server state elegantly. No Redux boilerplate, no actions, no reducers. Cache invalidation is automatic.
Railway over Render: 
Always-on. No cold starts. $5/month is acceptable for a real deployment.
Cloudinary for images: 
Free tier is generous (25GB). Handles image transformation (resize, crop, format conversion) automatically. Removes the need for server-side image processing.
4. Folder Structure
4.1  Frontend
frontend/src/
src/
  pages/            → one file per route
    HomePage.jsx
    ProjectFeed.jsx
    ProjectDetail.jsx
    SignIn.jsx
    SignUp.jsx
    UserProfile.jsx
    Dashboard.jsx     ← my projects + my contribution requests
    About.jsx
    Contact.jsx
    NotFound.jsx
 
  components/
    layout/
      Sidebar.jsx
      Topbar.jsx
      TrendingBar.jsx
      Navbar.jsx       ← homepage nav only
    cards/
      ProjectCard.jsx  ← default + hover + mobile states
      MiniProjectCard.jsx
      SkeletonCard.jsx ← loading state
    modals/
      PostProjectModal.jsx
      ContributeModal.jsx
      EditProjectModal.jsx
    ui/
      Button.jsx       ← primary, secondary, ghost, danger variants
      Input.jsx        ← with error state prop
      Textarea.jsx
      Select.jsx
      TagInput.jsx
      Badge.jsx
      Avatar.jsx
      Chip.jsx
      StatusChip.jsx   ← pending/accepted/declined
      Toast.jsx        ← success/error toasts
      EmptyState.jsx
      ErrorState.jsx   ← full-page error with retry
      LoadingSpinner.jsx
    brand/
      LogoMark.jsx
      LogoWordmark.jsx
      BlobBackground.jsx
 
  context/
    AuthContext.jsx
    ThemeContext.jsx
    ToastContext.jsx
 
  hooks/
    useAuth.js
    useTheme.js
    useSidebar.js
    useToast.js
 
  api/
    axios.js          ← configured Axios instance with interceptors
    projects.js       ← all project API calls
    auth.js           ← register, login, me
    users.js          ← profile, update
    contributions.js  ← express interest, accept, decline
 
  data/
    mockProjects.js   ← 12 seed projects for development
 
  styles/
    globals.css       ← CSS custom properties, base reset, scrollbar
    animations.css    ← all keyframes
 
  utils/
    colors.js         ← deterministic avatar colour from name initial
    dates.js          ← timeAgo() helper
    filters.js        ← client-side filter/sort logic
    validators.js     ← shared form validation functions
4.2  Backend
backend/app/
app/
  main.py             → FastAPI app entry, router registration, CORS, middleware
  config.py           → Pydantic Settings — all env vars typed and validated
  database.py         → AsyncEngine, AsyncSession, get_db dependency
  auth.py             → JWT verification, get_current_user dependency
 
  models/             → SQLAlchemy ORM models
    user.py
    project.py
    contribution.py
    project_star.py
 
  schemas/            → Pydantic v2 request/response schemas
    user.py
    project.py
    contribution.py
 
  routers/            → FastAPI APIRouter groups
    auth.py           → /api/v1/auth/*
    projects.py       → /api/v1/projects/*
    users.py          → /api/v1/users/*
    contributions.py  → /api/v1/contributions/*
    utility.py        → /api/v1/tags/trending, /api/v1/health
 
  services/           → business logic — routers call services, not DB directly
    project_service.py
    auth_service.py
    user_service.py
    contribution_service.py
    email_service.py  ← Resend integration
    trending_service.py ← trending score calculation
 
  utils/
    jwt_utils.py
    password_utils.py
    image_utils.py    ← Cloudinary upload helpers
 
  migrations/         → Alembic migration files
  tests/              → pytest test files
    test_auth.py
    test_projects.py
    test_contributions.py
5. Database Schema
PostgreSQL hosted on Neon. All tables use UUID primary keys. Timestamps use TIMESTAMPTZ. Row-level access control is enforced at the FastAPI service layer (not via Postgres RLS — see Section 7 for access control patterns).
5.1  users
Column
Type
Constraints
Notes
id
UUID
PRIMARY KEY DEFAULT gen_random_uuid()
Matches Supabase Auth user ID
email
VARCHAR(255)
UNIQUE NOT NULL
username
VARCHAR(50)
UNIQUE NOT NULL
URL-safe, lowercase, validated regex ^[a-z0-9_-]+$
full_name
VARCHAR(100)
NOT NULL
bio
TEXT
NULLABLE
Max 300 chars enforced in API
city
VARCHAR(100)
NULLABLE
college
VARCHAR(150)
NULLABLE
avatar_url
TEXT
NULLABLE
Cloudinary URL
github_url
TEXT
NULLABLE
created_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
updated_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
Auto-updated via trigger
5.2  projects
Column
Type
Constraints
Notes
id
UUID
PRIMARY KEY DEFAULT gen_random_uuid()
owner_id
UUID
NOT NULL FK users(id) ON DELETE CASCADE
title
VARCHAR(120)
NOT NULL
description
TEXT
NOT NULL
Max 1000 chars enforced in API
type
VARCHAR(20)
NOT NULL
open_source / closed / hiring / freelance
category
VARCHAR(20)
NOT NULL
software / hardware / ml / mobile / devtools / other
status
VARCHAR(20)
NOT NULL DEFAULT 'idea'
idea / building / launched / inactive
looking_for
TEXT[]
NOT NULL DEFAULT '{}'
Array of needed roles/skills
tags
TEXT[]
NOT NULL DEFAULT '{}'
Tech stack tags
repo_url
TEXT
NULLABLE
Validated URL format
city
VARCHAR(100)
NULLABLE
college
VARCHAR(150)
NULLABLE
star_count
INTEGER
NOT NULL DEFAULT 0
Denormalised — updated via service layer
contributor_count
INTEGER
NOT NULL DEFAULT 0
Count of accepted contributions only
trending_score
FLOAT
NOT NULL DEFAULT 0
Recalculated hourly — see Section 5.6
created_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
updated_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
Auto-updated via trigger
5.3  contributions
Column
Type
Constraints
Notes
id
UUID
PRIMARY KEY DEFAULT gen_random_uuid()
project_id
UUID
NOT NULL FK projects(id) ON DELETE CASCADE
user_id
UUID
NOT NULL FK users(id) ON DELETE CASCADE
status
VARCHAR(20)
NOT NULL DEFAULT 'pending'
pending / accepted / declined
message
TEXT
NOT NULL
Max 500 chars — why they want to contribute
created_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
updated_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
Updated when owner accepts/declines
UNIQUE
(project_id, user_id)
One request per user per project — enforced at DB level
5.4  project_stars
Column
Type
Constraints
Notes
project_id
UUID
NOT NULL FK projects(id) ON DELETE CASCADE
user_id
UUID
NOT NULL FK users(id) ON DELETE CASCADE
created_at
TIMESTAMPTZ
NOT NULL DEFAULT NOW()
Used for trending score calculation
PRIMARY KEY
(project_id, user_id)
Composite key prevents duplicate stars
5.5  Indexes
SQL
-- Core access patterns
CREATE INDEX idx_projects_owner    ON projects(owner_id);
CREATE INDEX idx_projects_type     ON projects(type) WHERE status != 'inactive';
CREATE INDEX idx_projects_category ON projects(category) WHERE status != 'inactive';
CREATE INDEX idx_projects_created  ON projects(created_at DESC) WHERE status != 'inactive';
CREATE INDEX idx_projects_trending ON projects(trending_score DESC) WHERE status != 'inactive';
 
-- Full-text search (Section 5.6)
CREATE INDEX idx_projects_search   ON projects USING GIN(search_vector);
 
-- Tag filtering
CREATE INDEX idx_projects_tags     ON projects USING GIN(tags);
 
-- Contributions
CREATE INDEX idx_contributions_project ON contributions(project_id);
CREATE INDEX idx_contributions_user    ON contributions(user_id);
CREATE INDEX idx_contributions_status  ON contributions(status);
 
-- Stars (for trending calculation)
CREATE INDEX idx_stars_project  ON project_stars(project_id);
CREATE INDEX idx_stars_created  ON project_stars(created_at DESC);
5.6  Full-Text Search Setup
⚠  This must be set up during initial migration — it cannot be added later without downtime.
Do not implement search as ILIKE. tsvector is the correct approach for Postgres.
SQL — Initial Migration
-- Add generated search vector column
ALTER TABLE projects ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B')
  ) STORED;
 
-- Index on the generated column
CREATE INDEX idx_projects_search ON projects USING GIN(search_vector);
 
-- Query pattern in service layer:
-- SELECT * FROM projects
-- WHERE search_vector @@ plainto_tsquery('english', :query)
-- ORDER BY ts_rank(search_vector, plainto_tsquery('english', :query)) DESC
-- Minimum query length: 2 characters enforced in API layer
5.7  Denormalised Count Sync
star_count and contributor_count are denormalised for read performance. They must be kept in sync by the service layer — not by triggers (triggers are harder to debug for a beginner team).
Python
# project_service.py — star toggle
async def toggle_star(project_id, user_id, db):
    existing = await db.get(ProjectStar, (project_id, user_id))
    if existing:
        await db.delete(existing)
        await db.execute(update(Project).where(Project.id == project_id)
            .values(star_count=Project.star_count - 1))
        starred = False
    else:
        db.add(ProjectStar(project_id=project_id, user_id=user_id))
        await db.execute(update(Project).where(Project.id == project_id)
            .values(star_count=Project.star_count + 1))
        starred = True
    await db.commit()
    return starred
 
# Same pattern for contributor_count — increment on accept, decrement on delete
5.8  Trending Score Recalculation
Python
# trending_service.py — runs as FastAPI background task on a schedule
# Formula: (stars_7d * 2) + (requests_7d * 3) + (total_stars * 0.1)
 
async def recalculate_trending(db):
    cutoff = datetime.utcnow() - timedelta(days=7)
 
    # Stars gained in last 7 days per project
    stars_7d = select(
        ProjectStar.project_id,
        func.count().label('count')
    ).where(ProjectStar.created_at >= cutoff).group_by(ProjectStar.project_id)
 
    # Contribution requests in last 7 days per project
    requests_7d = select(
        Contribution.project_id,
        func.count().label('count')
    ).where(Contribution.created_at >= cutoff).group_by(Contribution.project_id)
 
    # Update all projects
    projects = await db.execute(select(Project))
    for project in projects.scalars():
        s7 = stars_7d_map.get(project.id, 0)
        r7 = requests_7d_map.get(project.id, 0)
        score = (s7 * 2) + (r7 * 3) + (project.star_count * 0.1)
        project.trending_score = score
    await db.commit()
 
# Schedule: add to main.py as APScheduler job, interval=3600 (every hour)
6. API Reference
Base URL: /api/v1. All responses return JSON. Authentication via Bearer JWT in Authorization header. FastAPI auto-generates interactive docs at /docs (development only — disable in production).
6.1  Authentication Endpoints
Method
Path
Auth
Body / Params
Returns
POST
/auth/register
—
{ email, password, username, full_name }
201 { user, access_token }
POST
/auth/login
—
{ email, password }
200 { user, access_token }
GET
/auth/me
Bearer
—
200 { user }
POST
/auth/logout
Bearer
—
200 { message }
POST
/auth/password-reset-request
—
{ email }
200 { message } — always, even if email unknown
6.2  Project Endpoints
Method
Path
Auth
Body / Params
Returns
GET
/projects
—
type, category, tags, city, college, search, sort (latest|trending|month), page, per_page (default 20)
200 { projects[], total, page, per_page }
GET
/projects/trending-tags
—
—
200 { tags: [{ tag, count }] } — top 10 tags by usage last 7d
GET
/projects/:id
—
—
200 { project } or 404
POST
/projects
Bearer
{ title, description, type, category, tags, looking_for, repo_url?, city?, college? }
201 { project }
PUT
/projects/:id
Bearer (owner)
Partial project fields — any subset
200 { project } or 403/404
DELETE
/projects/:id
Bearer (owner)
—
204 or 403/404
POST
/projects/:id/star
Bearer
—
200 { starred: bool, star_count: int }
PUT
/projects/:id/status
Bearer (owner)
{ status: 'idea'|'building'|'launched'|'inactive' }
200 { project }
6.3  Contribution Endpoints
Method
Path
Auth
Body / Params
Returns
POST
/projects/:id/contribute
Bearer
{ message }
201 { contribution } or 409 if already submitted
GET
/projects/:id/contributions
Bearer (owner)
—
200 { contributions[] } — full list for owner
PUT
/contributions/:id
Bearer (owner)
{ status: 'accepted'|'declined' }
200 { contribution } — triggers Resend email
GET
/users/me/contributions
Bearer
—
200 { contributions[] } — outgoing requests with status
6.4  User Endpoints
Method
Path
Auth
Body / Params
Returns
GET
/users/:username
—
—
200 { user, projects[], accepted_contributions[] } or 404
PUT
/users/me
Bearer
{ full_name?, bio?, city?, college?, github_url? }
200 { user }
POST
/users/me/avatar
Bearer
multipart/form-data image file
200 { avatar_url } — uploaded to Cloudinary
GET
/users/me/projects
Bearer
—
200 { projects[] } — own projects including inactive
GET
/users/me/dashboard
Bearer
—
200 { projects[], incoming_requests[], outgoing_requests[] }
6.5  Utility Endpoints
Method
Path
Auth
Returns
GET
/health
—
200 { status: 'ok', db: 'ok', timestamp }
GET
/tags/trending
—
200 { tags: [{ tag, count, color }] }
6.6  Standard Error Responses
Status
When
Response shape
400
Validation failure (Pydantic)
{ detail: [{ loc, msg, type }] }
401
Missing or invalid JWT
{ detail: 'Not authenticated' }
403
Authenticated but not authorised (not owner)
{ detail: 'Forbidden' }
404
Resource not found
{ detail: 'Not found' }
409
Duplicate (e.g. already starred, already contributed)
{ detail: 'Conflict: already submitted' }
422
Pydantic schema mismatch
{ detail: [...] }
500
Unexpected server error
{ detail: 'Internal server error' } — never expose stack traces in prod
7. Authentication and Access Control
7.1  Auth Flow
User registers or logs in → FastAPI validates credentials → calls Supabase Auth → returns Supabase JWT.
Frontend stores JWT in AuthContext (React state) — not localStorage, not sessionStorage.
On page refresh: Supabase JS SDK automatically attempts session restore from its own internal storage. If session is valid, AuthContext is repopulated transparently. If expired, user is redirected to /signin with return-to param.
Every protected API call sends JWT in Authorization: Bearer header via Axios request interceptor.
FastAPI middleware verifies JWT signature using SUPABASE_JWT_SECRET on every protected request.
7.2  Frontend Route Protection
React
// ProtectedRoute.jsx
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
 
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to='/signin'
    state={{ returnTo: location.pathname }} replace />;
  return children;
}
 
// After sign in — redirect back to intended page
const location = useLocation();
const returnTo = location.state?.returnTo || '/projects';
navigate(returnTo, { replace: true });
7.3  Backend Access Control Pattern
Access control is enforced at the service layer — not via Postgres RLS. This is more debuggable for a beginner team and still fully secure when applied consistently.
Python
# auth.py — reusable dependency for all protected endpoints
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    payload = verify_jwt(token)   # raises 401 if invalid or expired
    user = await user_service.get_by_id(db, payload['sub'])
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user
 
# Owner-only endpoint pattern (applied in every mutating project endpoint)
async def require_project_owner(
    project_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Project:
    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail='Not found')
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail='Forbidden')
    return project
7.4  JWT Configuration
JWT expiry: 1 hour for access token, 7 days for refresh token — managed by Supabase Auth automatically.
Supabase JS SDK handles token refresh silently in the background. No manual refresh logic needed in React.
Backend verifies token using SUPABASE_JWT_SECRET — set in Railway environment variables.
GitHub OAuth scopes: read:user and user:email only — minimum required.
8. Frontend Architecture
8.1  Routing Structure
Route
Component
Auth
Notes
/
HomePage
No
Landing page — logo, blobs, single CTA
/projects
ProjectFeed
No
Main board — sidebar layout, public browsing allowed
/projects/:id
ProjectDetail
No
Full project view — contribute button requires auth
/signin
SignIn
No
Redirect to /projects if already authed
/signup
SignUp
No
Redirect to /projects if already authed
/u/:username
UserProfile
No
Public profile — shows posted projects and contributions
/dashboard
Dashboard
Yes
Own projects + incoming/outgoing contribution requests
/about
About
No
About page
/contact
Contact
No
Contact form
*
NotFound
No
404 — link back to /projects
⚠  No /community route in Phase 1
The 'Community' nav link does not appear on any page in Phase 1. It was in the original homepage nav and must be removed. There is no community page until Phase 2.
8.2  State Management
State type
Solution
What it holds
Auth state
AuthContext
current user, login(), logout(), loading
Theme
ThemeContext
theme ('light'|'dark'), toggleTheme() — writes to localStorage and data-theme attr
Toast notifications
ToastContext
showToast(message, type), active toasts queue
Sidebar
localStorage + local state
collapsed boolean, persisted as 'sidebar-collapsed'
Server data
React Query
projects list, single project, user profile, contributions — cached, auto-refetch
Form state
Local useState
form inputs, validation errors, submission loading — local to each form component
Modal open/close
Local useState
local to parent page component
8.3  API Layer
JavaScript
// src/api/axios.js — single configured Axios instance
import axios from 'axios';
import { supabase } from '../lib/supabase';
 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});
 
// Attach JWT to every request
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});
 
// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Session expired mid-session — show toast, redirect to /signin
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(err);
  }
);
 
export default api;
8.4  React Query Configuration
JavaScript
// src/main.jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,   // 2 minutes
      retry: 2,
      refetchOnWindowFocus: false, // don't refetch on tab switch
    }
  }
});
 
// Example query hook — src/hooks/useProjects.js
export function useProjects(filters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsApi.list(filters),
  });
}
 
// Cache invalidation after post or star
queryClient.invalidateQueries({ queryKey: ['projects'] });
9. Design System — Technical Spec
9.1  Color Tokens
All colours defined as CSS custom properties on :root and [data-theme='dark']. Never use raw hex values in component CSS — always use tokens. See Design Document for full token list.
Token
Light
Dark
Usage
--bg-primary
#F5F2E8
#0E0D0B
Page backgrounds
--bg-surface
#FAF8F0
#151410
Cards, modals, sidebar
--bg-surface-2
#F0EDE0
#1C1A16
Input fields, hover states
--text-primary
#1A1916
#F0EFE8
Headings, important text
--text-secondary
#5A584E
#8A8878
Body text, descriptions
--text-muted
#9A9890
#5A5850
Timestamps, labels, placeholders
--accent
#1D4ED8
#3B6FE8
Buttons, links, active states
--amber
#C17B2A
#D4903A
लैब text, highlights
--border
#DDD9CC
#2A2820
Card borders, dividers
--cta
#7C2D2D
#A04040
Homepage CTA button only
9.2  Typography
Token
Font
Size
Weight
Usage
display-xl
Playfair Display
48–64px
700
Logo hero, page hero
display-lg
Playfair Display
36–40px
700
Page titles, h1
display-md
Playfair Display
24–28px
600
Section headings, h2
body-lg
DM Sans
17px
400
Main body text
body-md
DM Sans
15px
400
Secondary text, descriptions
body-sm
DM Sans
13px
400
Timestamps, meta, tags
label
DM Sans
11px
600 uppercase
Form labels, section labels
devanagari
Tiro Devanagari
proportional
400
लैब only — always amber
mono
JetBrains Mono
12–13px
400
Stack tags, code snippets
9.3  Component Tokens
Component
Value
Input/button border-radius
9999px (pill) — all inputs and buttons, always
Card border-radius
12px
Modal border-radius
16px
Tag/chip border-radius
6px (small tags), 9999px (filter chips)
Avatar border-radius
9999px (always circular)
Input padding
10px 18px — never less
Card padding
20px
Button height
38px standard / 34px compact / 44px large CTA
Sidebar width expanded
220px
Sidebar width collapsed
56px
Sidebar transition
width 250ms cubic-bezier(0.4, 0, 0.2, 1)
Label opacity transition
200ms — hides text labels when sidebar collapses
10. Security Requirements
10.1  Authentication
JWT tokens verified on every protected backend request — never trust client-side claims.
Passwords hashed with bcrypt (passlib) — never stored as plaintext.
JWT access token expiry: 1 hour (Supabase default). Refresh handled automatically by Supabase JS SDK.
GitHub OAuth scopes: read:user and user:email only — minimum required.
Password reset emails sent via Resend — token expires in 1 hour.
10.2  API Security
All endpoints validate input via Pydantic v2 schemas — malformed requests rejected before business logic.
Owner-only endpoints verify user ID against resource owner_id via require_project_owner dependency — never trust frontend claims.
File uploads validate MIME type server-side via Cloudinary SDK — image types only.
Max file size: 5MB enforced by Cloudinary upload preset — not trusted from client.
Rate limiting on auth endpoints: 10 requests per minute per IP via slowapi.
CORS configured to allow only the Vercel production domain in production. Development allows localhost:5173.
Swagger /docs endpoint disabled in production (ENVIRONMENT=production check in main.py).
10.3  Environment and Secrets
All secrets in .env files — .env is in .gitignore from project initialisation.
Supabase service role key used only on backend — never sent to frontend.
Frontend uses Supabase anon key only — limited by Supabase Auth policies.
SUPABASE_JWT_SECRET used for JWT verification on backend — never in client code.
All production environment variables set in Railway dashboard — never hardcoded.
11. Deployment
11.1  Frontend — Vercel
Connect GitHub repo to Vercel — auto-deploys on every push to main branch.
Build command: npm run build. Output directory: dist.
Environment variables: VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY — set in Vercel dashboard.
Preview deployments auto-created for every pull request — test before merging.
11.2  Backend — Railway
Connect GitHub repo to Railway as a Web Service.
Build command: pip install -r requirements.txt
Start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Always-on service — no cold starts. ~$5/month on Starter plan.
Environment variables set in Railway dashboard — never in code.
Health check endpoint configured: GET /api/v1/health — Railway pings every 60 seconds.
11.3  Database — Neon
Create one Neon project with two branches: main (production) and dev (development).
Run Alembic migrations: alembic upgrade head — run separately against each branch.
Connection pooling: use Neon's built-in connection pooler endpoint — append ?pgbouncer=true to DATABASE_URL for the pooled connection.
Automated backups: enabled on Neon paid plan — daily point-in-time restore.
Monitor slow queries via Neon dashboard — alert on queries > 500ms.
11.4  Environment Variables Reference
Variable
Location
Value type
VITE_API_URL
Frontend .env
Backend Railway URL e.g. https://trisangum-api.up.railway.app
VITE_SUPABASE_URL
Frontend .env
Supabase project URL
VITE_SUPABASE_ANON_KEY
Frontend .env
Supabase public anon key — safe to expose
DATABASE_URL
Backend Railway env
Neon pooled connection string (pgbouncer=true)
SUPABASE_URL
Backend Railway env
Supabase project URL
SUPABASE_JWT_SECRET
Backend Railway env
From Supabase project settings — JWT verification
CLOUDINARY_CLOUD_NAME
Backend Railway env
Cloudinary cloud name
CLOUDINARY_API_KEY
Backend Railway env
Cloudinary API key — never in frontend
CLOUDINARY_API_SECRET
Backend Railway env
Cloudinary API secret — never in frontend
RESEND_API_KEY
Backend Railway env
Resend API key
CORS_ORIGINS
Backend Railway env
Vercel frontend URL — comma-separated
ENVIRONMENT
Backend Railway env
'production' — disables /docs and debug
APScheduler runs via
Backend
APScheduler AsyncIOScheduler — started in main.py lifespan
12. Testing Strategy
12.1  Backend Testing
pytest + httpx AsyncClient for all backend tests.
Unit tests for all service layer functions (project_service, auth_service, contribution_service, trending_service).
Integration tests for all API endpoints using httpx AsyncClient with test database (Neon dev branch).
Test database: Neon dev branch — never test against production.
Minimum coverage target: 70% of service layer for MVP.
CI: run pytest on every pull request via GitHub Actions before merge.
12.2  Frontend Testing
Manual testing across Chrome, Firefox, and Safari before each deployment.
Mobile responsive testing at 375px (iPhone SE), 768px (tablet), 1280px (desktop).
Both light and dark themes tested on every page after every UI change.
Card touch interaction tested on a real mobile device — not just DevTools emulation.
React Testing Library for critical user flow tests: auth, post project, contribute, accept/decline.
12.3  Testing Ownership
Builder 3 owns testing. After every feature branch is merged to main, Builder 3 runs the full user flow manually and documents any bugs in the GitHub Issues board with steps to reproduce. No merge to main without Builder 3 sign-off.
13. Performance Targets
Metric
Target
Notes
Initial page load
< 2 seconds
On a 4G mobile connection — Lighthouse simulation
Project feed render
< 1 second
With 20 cards — measure with React Profiler
API response (p95) — list endpoints
< 500ms
Measured from Railway logs
API response (p95) — single resource
< 200ms
Measured from Railway logs
Lighthouse performance
≥ 85
Mobile audit
Lighthouse accessibility
≥ 90
All pages — especially form labels and focus rings
Lighthouse SEO
≥ 80
Meta tags on project detail pages — enables sharing
Sign Off
This document defines the complete technical specification for TriSangum Labs Phase 1 MVP. All implementation decisions reference this document. Deviations require team agreement and must be documented as an addendum.
Build rule
When in doubt, do the simpler thing. Ship something that works over something that is perfect. You can always refactor — you cannot always recover from not shipping.
Aakriti · Yantrit · Uday  —  Create · Engineer · Rise