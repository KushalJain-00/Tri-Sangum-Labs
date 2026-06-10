TRISANGUM LABS
त्रि-संगम  ·  Where builders find builders.
Product Requirements Document
TriSangum Labs — Developer Collaboration Platform
Version 1.1  ·  June 2026  ·  Status: Draft
Authors: TriSangum Labs Founding Team
Phase: MVP — Phase 1
1. Executive Summary
TriSangum Labs is a project-first developer collaboration platform built for India's builder community — students, solo developers, hardware engineers, and early teams across tier-2 and tier-3 cities who have no dedicated, structured space to find collaborators.
The Core Mechanic
The atomic unit is a project — not a resume, not a follower count, not a social post. You post what you are building, the help you need, and your visibility preference. The right people find it and something gets built.
Three communities meet at one platform: Aakriti (idea holders who post projects) · Yantrit (builders who contribute) · Uday (companies and hirers who find verified talent). This is the TriSangum — the confluence.
Phase 1 ships the core loop only: post a project, discover projects, express interest, get accepted. Everything else follows from proof that loop creates real collaborations.
India-first
Primary market
3 sides
Idea holders · Builders · Hirers
1 loop
Post → Discover → Contribute → Build
2. Problem Statement
2.1  The Gap
Developer collaboration tools exist at scale. None of them treat finding a collaborator as the primary purpose, and none of them were built for the Indian developer — particularly the student or solo builder outside Bangalore and Mumbai.
Platform
What it does
What it fails at
GitHub
Code hosting, version control
Discovery is near-zero. Human connection layer is buried. No India context.
LinkedIn
Professional networking, job boards
Built for corporate hiring. Wrong tone for a student in Indore building a weekend project.
Devpost
Hackathon project showcase
Event-driven only. No persistent collaboration. Projects die after the hackathon.
Hackaday
Hardware project content
Content/showcase, not matchmaking. No contributor pipeline.
WhatsApp/Discord
Informal community chat
Ephemeral. No structured discovery. No record of contributions.
2.2  User Pain Points
Students and solo developers
No way to find collaborators for a real project outside hackathons or immediate friend circles.
GitHub repos exist but discovery is effectively zero — nobody finds them, nobody knows how to contribute.
LinkedIn is tonally wrong — too formal, too performative for project-based collaboration.
College communities are isolated. No cross-college or cross-city project discovery exists.
Small teams and early-stage startups
Hiring is expensive and overkill for a part-time or equity contributor.
No way to signal a specific skill need without writing a full job description.
No trusted space where serious, active builders congregate.
Hardware, embedded, and robotics developers
Completely invisible on every existing platform — no platform treats hardware as a first-class discipline.
Cannot communicate hardware-specific needs: component requirements, prototyping stage, CAD tools, BOM status.
No community that understands both sides of a hardware-software project.
3. Goals and Non-Goals
3.1  Phase 1 Goals — The Core Loop
Ship a working project board where developers can list projects and find contributors.
Validate the core loop: someone posts a project → someone expresses interest → an owner accepts → a collaboration begins. This is the only metric that matters in Phase 1.
Reach 50 active project listings within 30 days of launch via manual seeding and first college cohort.
Reach 300 registered users within 60 days — primarily from 2 targeted college communities and build-in-public content.
Establish the TriSangum Labs brand as a trusted, human, India-first developer space.
3.2  Phase 2 Goals — Community and Monetisation
Profiles with verified contribution history — the reputation layer that makes TriSangum useful to hirers.
Direct messaging between matched contributors and project owners.
Company and recruiter access tier — structured hiring through verified contribution history.
College partnership revenue — earliest monetisation channel.
Hardware-specific project fields — BOM stage, component requirements, CAD tools, prototyping phase.
Domain-specific boards with dedicated community spaces.
3.3  Non-Goals — Phase 1
⚠  Strict scope boundary
Any feature below is explicitly out of scope for Phase 1. A request to add these during Phase 1 build requires a formal team decision and a written justification. The default answer is no.
Social feed — posts, likes, shares, comments on posts. This makes it LinkedIn.
Direct messaging. Phase 2 only.
Payment processing or freelance contract infrastructure.
Native mobile app. Web-first, always. Mobile-responsive web is the target.
AI-powered matching or recommendations.
Ratings, reviews, leaderboards, gamification of any kind.
Real-time notifications — email via Resend is sufficient for MVP.
Video or audio features.
Bookmarks or saved projects. Phase 2.
In-app notification centre. The bell icon does not appear in Phase 1 UI.
Community page or community forum. Phase 2.
4. User Personas
4.1  Primary Personas
The College Builder — Arjun, 20, Pune
Second-year computer engineering student at a tier-2 college. Has an idea for a shared expense tracker for hostel roommates. Knows React from YouTube. Needs a backend developer. Has no mechanism to find that person outside his immediate circle. Would post on TriSangum the day it launched.
Behaviour: 
Posts a project card, waits for interest notifications via email, accepts a contributor.
Success signal: 
A contribution request arrives within 72 hours of posting.
The Solo Dev — Priya, 24, Nagpur
Works a day job, builds ML projects on weekends. Training a model to detect crop diseases from phone photos. Needs a mobile developer for the front end. Has posted on Reddit twice — zero responses. LinkedIn feels wrong. GitHub has the repo but nobody finds it.
Behaviour: 
Browses by AI/ML category, finds hardware and software projects to contribute to, eventually posts her own.
Success signal: 
Finds a project relevant to her skills within 5 minutes of browsing.
The Hardware Builder — Rahul, 22, Nashik
Robotics student building a voice-controlled arm. Needs an NLP developer. Has zero presence on any existing platform because no platform speaks to hardware builders. Would feel genuinely seen by a platform that lists Hardware as a first-class category.
Behaviour: 
Posts a hardware project card with component context, browses the Hardware filter, finds developers who understand embedded constraints.
Success signal: 
A relevant contributor expresses interest within the first week.
4.2  Secondary Personas
The Early Startup — Meera, 28, Ahmedabad
Building a freelance management tool for Indian developers. Needs a React developer for 3 months. Cannot afford a full hire. Would use TriSangum to post a Hiring project card if the developer community is real.
The Professor — Dr. Sharma, 42, Indore
Wants to connect students with real projects beyond academic assignments. Would recommend TriSangum to students if given the opportunity to pitch in class. A channel partner for college acquisition in Phase 1.
5. User Stories
5.1  Core Stories — Phase 1
As a developer I want to post a project in under 3 minutes so I can find collaborators without friction.
As a developer I want to browse projects by category and technology so I can find something relevant to contribute to.
As a developer I want to filter by city and college so I can find people I could actually meet.
As a developer I want to express interest in a project with a short message so the owner knows I want to contribute.
As a project owner I want to see who expressed interest in my project so I can decide who to collaborate with.
As a project owner I want to accept or decline contribution requests so I control who joins.
As a user I want to see full project details — description, stack, what help is needed — so I can make an informed decision.
As a user I want to sign up with email or GitHub so I can join without friction.
As a user I want to view my posted projects and contribution history so I have a record of what I have built.
5.2  Discovery Stories
As a user I want to search projects by keyword so I can find something specific quickly.
As a user I want to see trending tags so I can discover what the community is actively building.
As a user I want to filter by project type — open source, hiring, closed, freelance — so I only see what is relevant to me.
As a user I want the project feed to feel active even on day one so I trust the platform is real. (Seeded projects must address this.)
5.3  Edge Case Stories
⚠  These must be handled in Phase 1 — they will happen in week one.
Ignored edge cases create bad first impressions that are impossible to recover from.
As a contributor I want to see the status of my request — pending, accepted, declined — so I know whether to move on.
As a project owner I want a clear path to mark my project as inactive or complete so stale projects do not pollute the feed.
As a user I want a clear error message when my form submission fails so I know what went wrong and can retry.
As a user on mobile I want to be able to interact with project cards fully since I cannot hover — the Contribute action must be accessible without hover.
As a first-time visitor I want the feed to show real projects even before I sign up so I trust the platform before committing.
As a user I want the platform to respond clearly when the API is unavailable — not just hang silently.
6. Feature Requirements
6.1  Authentication
PRIORITY: MUST HAVE
Email and password registration and sign in via Supabase Auth.
GitHub OAuth sign in via Supabase — no custom OAuth implementation required.
JWT session management. Token stored in memory (React Context) on client — not localStorage.
On page refresh: if no token in memory, silently attempt Supabase session restore. If session expired, redirect to sign in. This must be transparent to the user — they should not lose their page state unnecessarily.
Password reset via email (Resend).
Protected routes: redirect to /signin if not authenticated, with return-to param so they land back after login.
6.2  Project Board
PRIORITY: MUST HAVE — THIS IS THE ENTIRE PRODUCT
Grid display of all active projects with card layout.
Filter by type: Open Source / Hiring / Closed / Freelance.
Filter by category: Software / Hardware / AI-ML / Mobile / DevTools / Other.
Filter by tech stack tags (multi-select).
Search by project title, description, and tags. See Section 6.9 for search implementation.
Sort by: Latest (default) / Trending (star velocity) / This Month.
City and college filter.
Trending tags bar showing most-used tags this week.
Pagination — 20 cards per page. Infinite scroll deferred to Phase 2.
Empty state: when no projects match filters, show a clear empty state with a 'Post a project' CTA. Never show a broken or blank page.
Inactive/completed projects are excluded from the default feed. Owner can mark a project inactive from their dashboard.
6.3  Project Cards
PRIORITY: MUST HAVE
Default state: type badge, timestamp, title (2 lines max), description (2 lines max), stack tags, author name and city.
Hover state (desktop): poster details, what they need, contributor count, View and Contribute buttons.
Touch/mobile state: the hover reveal content is permanently visible below the card summary. No hover dependency on mobile. The Contribute button is always accessible on touch devices.
Smooth transition between default and hover states: 200ms ease, translateY(−2px) lift on hover.
6.4  Post a Project
PRIORITY: MUST HAVE
Project title (required, max 120 characters).
Description — what are you building and what problem does it solve (required, max 1000 characters).
Project type: Open Source / Closed / Hiring / Freelance (required).
Category: Software / Hardware / AI-ML / Mobile / DevTools / Other (required).
Tech stack tags — add by typing and pressing Enter, remove individually (required, min 1 tag).
What kind of help do you need — free text (required, max 200 characters).
City and college — optional.
Repository URL — optional, validated as URL format.
Form validation: all required fields validated before submit. Inline error messages below each field on first submit attempt. Error state: red border on input, red text message below.
Success state: modal closes, project card appears at top of feed, success toast notification.
Loading state: submit button shows spinner and 'Posting...' text, is disabled during submission.
6.5  Project Detail Page
PRIORITY: MUST HAVE
Full project title and description.
All tags, type badge, category badge.
Poster card — avatar initial, name, role, city, college, brief bio.
'Looking for' section — skill chips.
Contributor count and list of accepted contributors (names and avatars).
Contribute button — opens expression of interest form. Hidden if: (a) user is owner, (b) user already submitted a request.
If user already submitted: show request status chip — Pending / Accepted / Declined.
Star button with count. Auth required to star — prompt sign in if not authed.
Share button — copies URL to clipboard, shows 'Copied' confirmation.
Project status indicator: Idea / Building / Launched — set by owner.
6.6  Expression of Interest
PRIORITY: MUST HAVE
Short message field — why you want to contribute and what you bring (required, max 500 characters, character counter shown).
Submit sends email notification to project owner via Resend.
Owner can accept or decline from their dashboard — two clear action buttons per request.
Status visible to contributor at all times: Pending / Accepted / Declined.
Owner response sends email notification to contributor via Resend.
A user may only submit one request per project. If they try again the button is disabled showing their current status.
Owner cannot submit a contribution request on their own project.
6.7  User Dashboard
PRIORITY: MUST HAVE FOR MVP
Display name, city, college, brief bio (editable).
Projects posted — card grid with status and contributor count.
Incoming contribution requests — listed per project with Accept/Decline actions.
My contribution requests — outgoing requests with status chips.
Edit/delete own projects.
Mark project as Inactive (removes from public feed, preserves data).
No skill lists, endorsements, or follower counts in Phase 1.
6.8  Navigation
PRIORITY: MUST HAVE
Collapsible left sidebar on the project feed page. Sidebar state persisted in localStorage.
Sidebar collapses to icon-only mode (56px). Labels fade out, icons remain.
Mobile: sidebar hidden behind hamburger icon, slides in as overlay drawer.
Top navigation on homepage — Projects, About, Contact Us. No 'Community' link until Phase 2 when the page exists.
Theme toggle (light/dark) in topbar. Preference saved to localStorage.
No notification bell in Phase 1. Email is the notification layer.
6.9  Search Implementation
⚠  Defined here to prevent lazy ILIKE implementation
Full-text search must use PostgreSQL tsvector. ILIKE is slow, case-sensitive, and will not scale past 500 projects.
Search operates across: project title (weight A), description (weight B), tags array (weight B).
Implementation: a generated tsvector column on the projects table, updated automatically via trigger.
Query: use to_tsquery with plainto_tsquery for user input — handles partial words and punctuation safely.
Results ordered by: ts_rank DESC, then created_at DESC as tiebreaker.
Minimum query length: 2 characters. Below 2: show full unfiltered feed.
Search combined with filters: search narrows results, filters narrow further. They are additive.
6.10  Trending Algorithm
Trending is not total stars. It is star velocity — projects gaining stars fastest in a rolling window.
Trending score formula: (stars gained in last 7 days × 2) + (contribution requests in last 7 days × 3) + (total stars × 0.1)
Trending score recalculated every hour via a scheduled job (FastAPI background task or simple cron).
GET /api/v1/projects?sort=trending returns projects ordered by trending_score DESC.
GET /api/v1/projects/trending (used by trending tags bar) returns top 10 most active tags by usage in last 7 days.
A project with 0 activity in the last 7 days has a trending score of (total_stars × 0.1) only — it can still appear but is deprioritised.
7. Design Requirements
7.1  Brand Identity
The logo is not negotiable. "Tri" in italic dark serif, "Sangum" in bold blue italic, "लैब" in Devanagari amber. This combination must appear exactly as designed across all touchpoints. The logo is always styled HTML text — never an image or SVG text element.
7.2  Visual Direction
Warm cream backgrounds — not pure white. #F5F2E8 light, #0E0D0B dark ink.
Watercolour blob shapes from the brand appear as the only colour accent — terracotta and dusty blue at low opacity in background.
Typography contrast: Playfair Display for display headings, DM Sans for all body and UI text.
Pill-shaped inputs and buttons throughout — border-radius 9999px on all interactive elements. Non-negotiable.
Card hover transitions feel physical — not tooltips, not modals. The card face reveals content in a smooth overlay.
Every error message, empty state, and notification written like a real person. No generic 'An error occurred'.
7.3  Form States — Required
⚠  All four form states must be designed and implemented
Missing states will be invented inconsistently by the builder. Define them here.
State
Visual treatment
Default
1px var(--border) border, var(--bg-surface-2) background
Focus
1px var(--accent) border, outline: 2px solid var(--accent-soft)
Error
1px #EF4444 border, red error message (DM Sans 12px) below input
Disabled
0.5 opacity, cursor not-allowed, no focus ring
Loading (submit button)
Spinner icon left, 'Posting...' text, pointer-events none
Success (post modal)
Modal closes, toast slides in from bottom-right: 'Project posted!' green
7.4  Loading States — Required
Project feed: skeleton cards (grey pulse animation) while data loads. 6 skeleton cards shown.
Project detail: skeleton for header, description, and sidebar sections.
Profile page: skeleton for avatar, stats row, and project grid.
Inline loaders: spinner icon (20px, var(--accent) colour) for button actions — star, contribute submit.
Skeleton animation: opacity pulses from 0.5 to 1 over 1.2s ease-in-out infinite.
7.5  Error States — Required
API unavailable: full-page error state on feed/detail pages. Friendly message, retry button. Never a blank white screen.
404 (project not found): dedicated illustrated empty state. 'This project doesn't exist or was removed.' Link back to feed.
401 (session expired mid-session): toast notification 'Your session expired. Please sign in again.' Redirect to /signin with return-to param.
Network failure on form submit: inline toast 'Could not post your project. Check your connection and try again.' Button re-enables.
7.6  Themes
Both light and dark themes required — developers need dark mode.
Light theme: warm cream (#F5F2E8), not clinical white.
Dark theme: warm ink (#0E0D0B), not cold tech black.
Theme preference persisted in localStorage key 'trisangum-theme'. Default: light.
Theme applied via data-theme attribute on the html element. All colours via CSS custom properties — never hard-coded.
8. Success Metrics
8.1  The One Metric That Matters
Primary KPI: Successful Collaboration Connections
A successful connection = a contribution request that was accepted by a project owner. This is the only evidence that the platform is doing what it exists to do. Every other metric is secondary.
Target: 25 successful connections in the first 60 days.
8.2  Phase 1 Launch Targets
Metric
Target
Timeframe
How measured
Successful connections (primary)
25
60 days
Contribution status = accepted, in DB
Active project listings
50
30 days
Projects with status != inactive
Registered users
300
60 days
User table row count
Contribution request rate
≥ 40% of projects receive ≥1 request
30 days
contributions / projects ratio
Owner response rate
≥ 60% of requests get a response
30 days
(accepted + declined) / total requests
Return visit rate
≥ 30%
First 30 days
Sessions from returning visitors
City diversity
Users from ≥ 5 cities outside top 3 metros
60 days
User.city field analysis
8.3  Health Indicators
Project posting rate: are new projects appearing daily? Target: ≥ 2 new projects per day by week 4.
Contribution request rate: are people expressing interest? Below 1 request per 5 projects = discovery problem.
Owner response rate: are owners responding? Below 50% = engagement problem, may need email nudges.
Acceptance rate: are connections happening? Below 30% acceptance = quality mismatch problem.
9. Launch Plan
9.1  Timeline
Week
Phase
Deliverable
1–2
Foundation
Repo setup, design system implementation (tokens, components), Neon DB + Supabase Auth connected
3–5
Core build
Auth flow, project board, project card, post modal, project detail page
6–7
Completion
User dashboard, contribution flow, email notifications via Resend, search + filters
8
QA
Internal testing, bug fixes, performance audit, both themes verified on all pages
9
Seed
Founding team posts 15 real projects. Discord server opened. LinkedIn build-in-public post #1
10
College 1
Professor approach confirmed. Permission secured. Classroom pitch prepared.
11
Launch
First classroom pitch — first real user cohort. Feedback collection begins.
12+
Iterate
Bug fixes, second college targeted, Product Hunt prep
9.2  Seed Strategy
Critical: the feed cannot be empty on day one.
An empty platform communicates abandonment, not potential. Every user who arrives to an empty feed is a lost user.
Founding team posts 15 real projects before any public access. These must be genuine — fake or placeholder projects will be spotted immediately.
One specific college WhatsApp group as ground zero — not a broadcast to everyone. Personal invite, personal context.
Discord server opened before launch so early interested users have a community to join.
LinkedIn build-in-public posts from the company page starting week 1 of build — document the process, not just the product.
Professor approach: personal email, not a cold pitch deck. Offer to run a 10-minute classroom demo. Get a confirmed yes before counting this in the launch plan.
10. Risks and Mitigations
Risk
Severity
Mitigation
Cold start / empty platform
High
15 real projects seeded by founding team before public access. First cohort treated as closed beta, not public launch.
Scope creep during build
High
This PRD is the authority. Any Phase 1 addition requires written justification and team vote. Default answer is no.
Team bandwidth
Medium
Three student developers with college workload. Simplest possible stack (see TRD). MVP is genuinely minimal — no feature additions until the core loop ships.
Owner unresponsiveness
Medium
Resend email nudge to owner 48 hours after a pending request arrives. Owners who do not respond in 7 days are shown a warning on their dashboard.
Mobile-first audience, desktop-first design
Medium
Card hover reveal redesigned for mobile — touch equivalent always present. Mobile tested at 375px after every UI change.
User churn after graduation
Low
Contribution history travels with the user. College-era contributions remain on their profile. Natural transition from student to professional user.
Hardware features absent in Phase 1
Low
Hardware is a first-class category from day one via the filter. Hardware-specific project fields (BOM, CAD tools) are Phase 2. Acknowledged gap.
Sign Off
This document defines the product vision and requirements for TriSangum Labs Phase 1 MVP. All product decisions during Phase 1 development must reference this document. Deviations require team agreement and written justification.
The mandate for Phase 1
Build the project board. Deploy it. Get twenty-five collaborations to start. Everything else follows from that proof.
Aakriti · Yantrit · Uday  —  Create · Engineer · Rise