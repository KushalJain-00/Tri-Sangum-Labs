TRISANGUM LABS
त्रि-संगम  ·  Where builders find builders.
Design Document
TriSangum Labs — UI/UX Specification
Version 1.1  ·  June 2026  ·  Status: Draft
Authors: TriSangum Labs Founding Team
Stack: React + Tailwind + CSS Custom Properties
1. Design Philosophy
TriSangum Labs is not a tech-corporate product. It is a place for builders — many of them students in tier-2 cities — to find each other and make things. The visual language must feel human, warm, and grounded, not clinical or performative.
Principle
What it means in practice
Warm, not white
Backgrounds are warm cream in light mode, warm ink in dark. Never pure #FFFFFF or #000000.
Craft, not chrome
Typography-first. Display headings in Playfair Display carry the weight. Blobs are the only colour accent.
Touch-first from day one
Every interaction designed for mobile touch first. Desktop enhancements layered on top — never the reverse.
Honest copy
Every error message, empty state, and label written like a real person. No 'An error occurred'. No 'Something went wrong'.
Pill everything
All inputs and buttons use border-radius: 9999px. This is a brand decision — not a suggestion.
The project is the hero
No social feed, no algorithmic distraction. The project card is the atomic unit. Everything is designed around it.
2. Brand Identity
2.1  Logo Wordmark
The wordmark is always rendered as styled HTML/JSX text — never an SVG text element or image. This ensures it is always crisp at every resolution and can be copied as text.
JSX
// LogoWordmark.jsx
export function LogoWordmark({ size = 'md' }) {
  const sizes = {
    sm: { tri: 18, sangum: 20, lab: 16 },
    md: { tri: 22, sangum: 24, lab: 19 },
    lg: { tri: 30, sangum: 34, lab: 26 },
    xl: { tri: 48, sangum: 52, lab: 40 },
  };
  const s = sizes[size];
  return (
    <span style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}>
      <span style={{
        fontStyle: 'italic',
        fontWeight: 700,
        color: 'var(--text-primary)',
        fontSize: s.tri,
      }}>Tri</span>
      <span style={{
        fontStyle: 'italic',
        fontWeight: 700,
        color: 'var(--accent)',
        fontSize: s.sangum,
      }}>Sangum</span>
      <span style={{
        fontFamily: 'Tiro Devanagari, serif',
        fontStyle: 'normal',
        fontWeight: 400,
        color: 'var(--amber)',
        fontSize: s.lab,
        marginLeft: 4,
      }}>लैब</span>
    </span>
  );
}
2.2  Logo Mark — Confluence Symbol
The confluence symbol (LogoMark) represents three paths meeting at a single point — a minimal geometric mark used in the browser tab favicon, sidebar collapsed state, and loading screen.
JSX
// LogoMark.jsx — three arcs converging to a point
// Exact SVG specification:
export function LogoMark({ size = 32, className = '' }) {
  return (
    <svg
      width={size} height={size}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Three arcs converging to center-bottom point (16, 26) */}
      {/* Arc 1 — left stream */}
      <path
        d='M4 6 C4 6, 8 10, 16 26'
        stroke='var(--text-primary)'
        strokeWidth='2.5'
        strokeLinecap='round'
        fill='none'
      />
      {/* Arc 2 — center stream */}
      <path
        d='M16 4 C16 4, 16 12, 16 26'
        stroke='var(--accent)'
        strokeWidth='2.5'
        strokeLinecap='round'
        fill='none'
      />
      {/* Arc 3 — right stream */}
      <path
        d='M28 6 C28 6, 24 10, 16 26'
        stroke='var(--amber)'
        strokeWidth='2.5'
        strokeLinecap='round'
        fill='none'
      />
      {/* Confluence point */}
      <circle cx='16' cy='26' r='2' fill='var(--accent)' />
    </svg>
  );
}
2.3  Logo Usage Rules
LogoWordmark appears in: topbar (md size), homepage hero (xl size), email headers (lg size).
LogoMark appears in: browser favicon, sidebar collapsed state (32px), loading screen (48px).
Never use the wordmark on a coloured background where contrast drops below 4.5:1.
Minimum clear space: equal to the height of the 'T' in Tri on all sides.
Never rotate, stretch, or recolour individual parts. The amber लैब is always amber.
3. Color System
3.1  Token Definitions
All colours are defined as CSS custom properties and applied exclusively via tokens. Never use a raw hex value in component CSS. The theme is switched by adding data-theme='dark' to the html element.
CSS
/* src/styles/globals.css */
 
:root {
  /* Backgrounds */
  --bg-primary:    #F5F2E8;   /* main page bg — warm cream */
  --bg-surface:    #FAF8F0;   /* cards, modals, sidebar */
  --bg-surface-2:  #F0EDE0;   /* inputs, hover states, secondary surfaces */
  --bg-overlay:    rgba(26, 25, 22, 0.5);  /* modal backdrop */
 
  /* Text */
  --text-primary:   #1A1916;  /* headings, important labels */
  --text-secondary: #5A584E;  /* body text, descriptions */
  --text-muted:     #9A9890;  /* timestamps, placeholders, subtle labels */
  --text-inverse:   #F5F2E8;  /* text on dark buttons */
 
  /* Accent */
  --accent:         #1D4ED8;  /* primary actions, links, active states */
  --accent-hover:   #1C43BC;  /* hover on accent elements */
  --accent-soft:    #DBEAFE;  /* focus rings, soft highlights */
  --accent-muted:   #3B82F640; /* very subtle bg tints */
 
  /* Brand */
  --amber:          #C17B2A;  /* लैब, highlights */
  --amber-soft:     #FEF3C7;  /* amber tint backgrounds */
 
  /* Semantic */
  --success:        #065F46;
  --success-bg:     #D1FAE5;
  --error:          #7C2D2D;
  --error-bg:       #FEE2E2;
  --warning:        #92400E;
  --warning-bg:     #FEF3C7;
 
  /* Surfaces */
  --border:         #DDD9CC;  /* card borders, dividers */
  --border-focus:   #1D4ED8;  /* focused inputs */
  --shadow-sm:      0 1px 3px rgba(26, 25, 22, 0.08);
  --shadow-md:      0 4px 12px rgba(26, 25, 22, 0.12);
  --shadow-lg:      0 12px 32px rgba(26, 25, 22, 0.16);
 
  /* CTA */
  --cta:            #7C2D2D;  /* homepage hero CTA button only */
  --cta-hover:      #6B2222;
}
 
[data-theme='dark'] {
  --bg-primary:    #0E0D0B;
  --bg-surface:    #151410;
  --bg-surface-2:  #1C1A16;
  --bg-overlay:    rgba(0, 0, 0, 0.7);
  --text-primary:  #F0EFE8;
  --text-secondary:#B8B5A8;
  --text-muted:    #6A6860;
  --text-inverse:  #0E0D0B;
  --accent:        #3B6FE8;
  --accent-hover:  #5080F0;
  --accent-soft:   #1D4ED820;
  --accent-muted:  #3B6FE820;
  --amber:         #D4903A;
  --amber-soft:    #92400E30;
  --success:       #34D399;
  --success-bg:    #065F4620;
  --error:         #FCA5A5;
  --error-bg:      #7C2D2D20;
  --warning:       #FCD34D;
  --warning-bg:    #92400E20;
  --border:        #2A2820;
  --border-focus:  #3B6FE8;
  --shadow-sm:     0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md:     0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg:     0 12px 32px rgba(0, 0, 0, 0.5);
  --cta:           #A04040;
  --cta-hover:     #B85050;
}
4. Typography
4.1  Font Loading
HTML / CSS
/* In index.html <head> — preconnect and preload */
<link rel='preconnect' href='https://fonts.googleapis.com' />
<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
<link href='https://fonts.googleapis.com/css2?
  family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700
  &family=DM+Sans:wght@400;500;600
  &family=Tiro+Devanagari
  &family=JetBrains+Mono:wght@400;500
  &display=swap' rel='stylesheet' />
 
/* Fallback font stack */
--font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body:    'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-devanagari: 'Tiro Devanagari', serif;
--font-mono:    'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
4.2  Type Scale
Class
Font
Size
Weight
Line-height
Usage
display-xl
Playfair Display
60px / 3.75rem
700
1.1
Homepage hero only
display-lg
Playfair Display
40px / 2.5rem
700
1.2
Page h1 headings
display-md
Playfair Display
28px / 1.75rem
600
1.3
Section h2 headings, modal titles
display-sm
Playfair Display
22px / 1.375rem
600
1.4
Card titles, h3 subheadings
body-lg
DM Sans
17px / 1.0625rem
400
1.65
Main descriptions, long text
body-md
DM Sans
15px / 0.9375rem
400
1.6
Secondary text, form fields, metadata
body-sm
DM Sans
13px / 0.8125rem
400
1.55
Timestamps, tags, labels
label
DM Sans
11px / 0.6875rem
600
1.4
Form labels — UPPERCASE, 0.05em tracking
mono
JetBrains Mono
13px / 0.8125rem
400
1.5
Stack tags, inline code
5. Layout System
5.1  Breakpoints
Name
Min-width
Description
mobile
0px
Default — all components designed at this size first
sm
480px
Large phones — minor layout adjustments
md
768px
Tablet — two-column grids begin
lg
1024px
Desktop — sidebar appears, full project grid
xl
1280px
Wide desktop — max-width container caps at 1200px
5.2  Page Layout — Project Feed
The feed page uses a two-column layout: a collapsible sidebar on the left and the main content area on the right. Below the lg breakpoint, the sidebar is hidden and accessed via a hamburger menu.
CSS
/* Project feed layout */
.feed-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
}
 
.sidebar {
  width: 220px;                   /* expanded */
  min-width: 220px;
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
              min-width 250ms cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
 
.sidebar.collapsed {
  width: 56px;
  min-width: 56px;
}
 
/* Labels fade on collapse */
.sidebar .nav-label {
  opacity: 1;
  transition: opacity 200ms;
  white-space: nowrap;
}
.sidebar.collapsed .nav-label { opacity: 0; pointer-events: none; }
 
.main-content {
  flex: 1;
  padding: 24px 28px;
  max-width: 1200px;
  overflow-y: auto;
}
 
/* Mobile: sidebar hidden, topbar shown */
@media (max-width: 1023px) {
  .sidebar { display: none; }
  .mobile-topbar { display: flex; }
}
5.3  Project Grid
CSS
.project-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;              /* mobile: single column */
}
 
@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* tablet: 2 columns */
  }
}
 
@media (min-width: 1100px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr); /* desktop: 3 columns */
  }
}
 
/* Skeleton grid: same structure, 6 skeleton cards */
.skeleton-grid { /* identical grid rules */ }
6. Component Specifications
6.1  ProjectCard — Full Specification
The project card is the most important component in the product. Every state must be implemented exactly as specified. The mobile state is not an afterthought — it is the primary state.
Structure
CSS
/* Card anatomy */
.project-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}
 
/* Desktop hover lift */
@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-soft);
  }
  /* Hover reveal overlay */
  .project-card:hover .card-hover-layer { opacity: 1; }
}
Card Face — Default State (always visible)
Element
Content
Style notes
Type badge
OPEN SOURCE / HIRING / CLOSED / FREELANCE
Pill chip, 10px font, uppercase, type-specific background colour
Timestamp
'2 hours ago' via timeAgo()
body-sm, --text-muted, right-aligned
Title
Project title — 2 line max, ellipsis overflow
display-sm, Playfair Display, --text-primary
Description
First 100 chars, ellipsis overflow, 2 lines max
body-md, --text-secondary
Tags
Stack tags as mono chips — max 3 shown, +N if more
JetBrains Mono, 11px, --bg-surface-2 bg
Author row
Avatar initial + Full name + City
body-sm, avatar 28px circle
Hover Reveal Layer — Desktop Only (hover: hover media query)
⚠  Hover reveal requires @media (hover: hover)
If you apply hover styles without this media query, touch devices will get stuck in the hover state after tap. This is a critical mobile bug. Every hover-dependent style must be wrapped in @media (hover: hover).
Element
Content
Style notes
Overlay background
Semi-transparent surface over card face
var(--bg-surface) at 95% opacity, backdrop-blur(4px)
'Looking for' label
LOOKING FOR — label style, uppercase
label class
Skill chips
Array of looking_for items — pill chips
--accent-soft bg, --accent text
Contributor count
'{n} contributors' with user icon
body-sm, --text-muted
View button
'View Project' — secondary variant
Full width, links to /projects/:id
Contribute button
'Contribute' — primary variant
Full width, opens ContributeModal or redirects to sign in
Mobile State — Touch Devices (no hover)
On touch devices (where @media (hover: hover) does not apply), the hover reveal content is shown as a persistent expanded section below the card face — always visible, never requiring hover.
CSS
/* Mobile: hover content always visible below card face */
@media (hover: none) {
  .card-hover-layer {
    position: static;         /* not overlaid — below card content */
    opacity: 1;               /* always visible */
    background: transparent;  /* no overlay bg needed */
    border-top: 1px solid var(--border);
    margin-top: 14px;
    padding-top: 14px;
  }
 
  /* Ensure Contribute button is always reachable */
  .card-contribute-btn {
    display: block;
    width: 100%;
    margin-top: 10px;
  }
}
Skeleton Card — Loading State
CSS
/* SkeletonCard.jsx — matches ProjectCard structure exactly */
.skeleton-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  pointer-events: none;
}
 
.skeleton-line {
  background: var(--bg-surface-2);
  border-radius: 4px;
  animation: skeleton-pulse 1.2s ease-in-out infinite;
}
 
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1;   }
}
 
/* Skeleton line dimensions match real card elements */
.skeleton-badge  { height: 20px; width: 80px; border-radius: 9999px; }
.skeleton-title  { height: 22px; width: 85%; margin: 10px 0 6px; }
.skeleton-desc-1 { height: 14px; width: 100%; margin-bottom: 4px; }
.skeleton-desc-2 { height: 14px; width: 70%; margin-bottom: 14px; }
.skeleton-tag    { height: 18px; width: 60px; border-radius: 4px; display: inline-block; margin-right: 6px; }
.skeleton-avatar { height: 28px; width: 28px; border-radius: 9999px; display: inline-block; }
6.2  Button Variants
Variant
Background
Text
Border
Hover
Use case
primary
var(--accent)
var(--text-inverse)
none
var(--accent-hover) bg
Main actions — Contribute, Post, Submit
secondary
transparent
var(--accent)
1px var(--accent)
var(--accent-muted) bg
Secondary actions — View, Cancel, Edit
ghost
transparent
var(--text-secondary)
none
var(--bg-surface-2) bg
Low-priority — icons, sidebar items
danger
transparent
var(--error)
1px var(--error)
var(--error-bg) bg
Destructive — Delete Project, Decline
cta
var(--cta)
var(--text-inverse)
none
var(--cta-hover) bg
Homepage hero CTA only
CSS
/* All buttons share this base */
.btn {
  border-radius: 9999px;      /* pill — non-negotiable */
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 150ms, border-color 150ms, opacity 150ms;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
 
/* Sizes */
.btn-sm  { padding: 6px 14px;  height: 34px; font-size: 13px; }
.btn-md  { padding: 8px 20px;  height: 38px; font-size: 14px; }
.btn-lg  { padding: 12px 28px; height: 48px; font-size: 16px; }
 
/* Loading state */
.btn[data-loading='true'] {
  pointer-events: none;
  opacity: 0.7;
}
.btn[data-loading='true']::before {
  content: '';
  width: 14px; height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
 
/* Disabled state */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
6.3  Input / Textarea
CSS
.input {
  width: 100%;
  padding: 10px 18px;
  border-radius: 9999px;         /* pill */
  border: 1px solid var(--border);
  background: var(--bg-surface-2);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color 150ms, box-shadow 150ms;
  outline: none;
}
 
.input::placeholder { color: var(--text-muted); }
 
.input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
 
.input[data-error='true'] {
  border-color: var(--error);
}
.input[data-error='true']:focus {
  box-shadow: 0 0 0 3px var(--error-bg);
}
 
.input-error-msg {
  font-size: 12px;
  color: var(--error);
  margin-top: 4px;
  margin-left: 18px;    /* indent to align with pill input content */
}
 
/* Textarea — same styles but border-radius 16px not pill */
.textarea {
  /* all .input rules except: */
  border-radius: 16px;
  padding: 12px 18px;
  resize: vertical;
  min-height: 100px;
}
6.4  Tag Input Component
Used in the Post Project form for stack tags and looking_for fields. Users type a tag and press Enter or comma to add it. Each tag renders as a removable chip.
JSX
// TagInput.jsx
export function TagInput({ value = [], onChange, placeholder, max = 10 }) {
  const [input, setInput] = useState('');
 
  const add = (raw) => {
    const tag = raw.trim().toLowerCase().replace(/[^a-z0-9+#.-]/g, '');
    if (tag && !value.includes(tag) && value.length < max) {
      onChange([...value, tag]);
    }
    setInput('');
  };
 
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
    }
    if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };
 
  return (
    <div className='tag-input-container'>
      {value.map(tag => (
        <span key={tag} className='tag-chip'>
          {tag}
          <button onClick={() => onChange(value.filter(t => t !== tag))}
            aria-label={`Remove ${tag}`}>×</button>
        </span>
      ))}
      {value.length < max && (
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input && add(input)}
          placeholder={value.length === 0 ? placeholder : 'Add more...'}
        />
      )}
      <span className='tag-count'>{value.length}/{max}</span>
    </div>
  );
}
6.5  Avatar Component
Avatars are always circular. If the user has no avatar_url, a coloured circle with their initial is shown. The colour is deterministic — the same user always gets the same colour.
JSX
// src/utils/colors.js — deterministic avatar colour
const AVATAR_COLORS = [
  '#C7522A', '#2A7AC7', '#2AC75C', '#C7A52A',
  '#7A2AC7', '#C72A7A', '#2AC7C7', '#5C7A2A',
];
export function avatarColor(name = '') {
  const code = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}
 
// Avatar.jsx
export function Avatar({ user, size = 36 }) {
  if (user.avatar_url) {
    return <img src={user.avatar_url} alt={user.full_name}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  }
  const initial = (user.full_name || user.username || '?')[0].toUpperCase();
  const bg = avatarColor(user.full_name || user.username);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body)', fontWeight: 600,
      fontSize: size * 0.42,
      flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}
6.6  Status Chip
Status
Background
Text colour
Label
pending
var(--warning-bg)
var(--warning)
Pending
accepted
var(--success-bg)
var(--success)
Accepted
declined
var(--error-bg)
var(--error)
Declined
idea
var(--bg-surface-2)
var(--text-muted)
Idea
building
var(--accent-soft)
var(--accent)
Building
launched
var(--success-bg)
var(--success)
Launched ✓
inactive
var(--bg-surface-2)
var(--text-muted)
Inactive
6.7  Toast Notification
CSS / JSX
// Toast slides in from bottom-right on desktop, bottom-centre on mobile
.toast-container {
  position: fixed;
  bottom: 24px; right: 24px;
  z-index: 9999;
  display: flex; flex-direction: column; gap: 8px;
}
@media (max-width: 640px) {
  .toast-container { right: 12px; left: 12px; }
}
 
.toast {
  padding: 12px 18px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  display: flex; align-items: center; gap: 10px;
  animation: slide-up 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  min-width: 280px; max-width: 380px;
}
.toast.success { background: var(--success-bg); color: var(--success); }
.toast.error   { background: var(--error-bg);   color: var(--error);   }
.toast.info    { background: var(--accent-soft); color: var(--accent);  }
 
@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
 
// Toast messages (copy) — written like a human:
// ✓ 'Project posted! People can now find it.'
// ✓ 'Request sent. You will hear back by email.'
// ✓ 'Contributor accepted. They have been notified.'
// ✗ 'Error' — never this
// ✗ 'An error occurred' — never this
// ✗ 'Something went wrong' — never this
7. Page Designs
7.1  Homepage — /
The homepage is the first impression. It must communicate what TriSangum is in under 5 seconds and route visitors directly to the project feed. It is deliberately minimal — one section above the fold.
Section
Content
Notes
Nav
LogoWordmark + 'Projects' link + 'About' link + 'Contact Us' link + Theme toggle
No 'Community' link — it does not exist yet. Right-side: Sign In + Get Started (CTA)
Hero
Blob background, LogoWordmark (xl), tagline, two CTAs
Tagline: 'Where builders find builders.' CTA primary: 'Explore Projects' → /projects. CTA secondary: 'Post a project' → /signup
How it works
Three cards — Aakriti / Yantrit / Uday — with Playfair headings
Each card has a short (2 sentence) description. No icons needed — typography carries it.
Footer
LogoWordmark (sm) + copyright + 'Projects · About · Contact'
Single line, clean
⚠  Blob SVG paths — ASCII hyphens only
All SVG path d attributes must use standard ASCII hyphen-minus (-) for negative numbers. Never use the Unicode minus sign (U+2212: −). Example: use 'M42.7,-58.2' not 'M42.7,−58.2'. The Unicode minus breaks SVG rendering silently.
7.2  Project Feed — /projects
Region
Component
Notes
Left sidebar
Sidebar.jsx
Logo, nav items, filter controls. Collapsed to icons at 56px.
Top bar (mobile)
MobileTopbar.jsx
Hamburger + LogoWordmark + Theme toggle + Post button
Trending bar
TrendingBar.jsx
Horizontal scroll row of trending tag pills above the grid. 'Trending this week:' label.
Feed header
Filter chips + sort dropdown + 'Post a project' button
Filter chips: All / Open Source / Hiring / Closed / Freelance. Sort: Latest / Trending / This Month.
Project grid
ProjectCard.jsx × N
3 columns desktop, 2 tablet, 1 mobile. Skeleton grid while loading (6 cards).
Empty state
EmptyState.jsx
'No projects match your filters.' + 'Clear filters' button + 'Be the first to post one →' link
Pagination
Simple prev/next buttons + page count
'Showing 1–20 of 47 projects'. 20 per page.
Sidebar nav items — Phase 1 only
Projects (home icon), My Dashboard (grid icon), Post a Project (+ icon), About (info icon), Sign In / Sign Out (user icon).
The following items are NOT in Phase 1 sidebar: Saved, Community, Hiring, Hardware (as nav items). Hardware and AI-ML exist as filter chips only.
7.3  Project Detail — /projects/:id
Region
Content
Notes
Breadcrumb
← Back to projects
Simple text link — no full breadcrumb trail
Header
Title (display-lg) + type badge + status chip + star button + share button
Star requires auth — show sign in prompt if not authed. Share copies URL to clipboard.
Body
Full description, tags grid, 'Looking for' skill chips
Separate visual sections with subtle dividers
Poster card
Avatar, full name, city, college, bio excerpt, link to /u/:username
Sidebar on desktop (right column), below content on mobile
Contribute CTA
Large primary button if eligible, status chip if already requested, hidden if owner
Eligibility: authenticated + not owner + not already submitted
Contributors
Grid of accepted contributor avatars + count
Only shows if count > 0. 'X people contributing'
Repo link
External link button if repo_url is set
Opens in new tab. Only shown if field is populated.
7.4  Dashboard — /dashboard
Tab / Section
Content
Notes
My Projects
Card grid of own projects including inactive
Each card shows: contributor count, status chip, Edit button, Mark Inactive button
Incoming Requests
List of contribution requests grouped by project
Each request: avatar + name + message preview + Accept / Decline buttons. Pending count shown as badge on tab.
My Requests
List of outgoing contribution requests with status chips
Status: Pending / Accepted / Declined. Project title is a link.
Empty states
Each tab has its own empty state
'You have not posted any projects yet. Post your first one →'
No bookmarks tab — not in Phase 1
Saved/Bookmarks is explicitly out of scope for Phase 1 (see PRD Section 3.3). There is no bookmarks table, no API endpoint, and no bookmarks UI. Do not add a Saved tab to the dashboard.
7.5  Sign In and Sign Up — /signin, /signup
Field
Type
Validation
Email (both)
email input
Required, valid email format
Password (both)
password input
Required, min 8 characters. Show/hide toggle button inside input.
Username (signup)
text input
Required, 3–30 chars, regex ^[a-z0-9_-]+$, lowercase only
Full name (signup)
text input
Required, 2–100 chars
GitHub OAuth button above the email form — 'Continue with GitHub'. Divider: '— or —' between OAuth and email form.
After successful auth: redirect to returnTo param if present, otherwise to /projects.
Error messages: human-friendly. 'That email is already registered. Try signing in.' — not 'Email already exists'.
Loading state: form inputs disabled, submit button shows spinner while auth request is in flight.
8. Modal Specifications
8.1  Post Project Modal
Opens from the 'Post a project' button anywhere in the app. Requires authentication — if not authed, redirect to sign in with return-to param. The modal is a centered overlay — not a slide-in drawer.
Field
Type
Required
Validation
Project title
text input
Yes
1–120 characters. Character count shown '48 / 120'.
Description
textarea
Yes
10–1000 characters. Character count shown.
Project type
segmented control (4 options)
Yes
Open Source / Closed / Hiring / Freelance
Category
segmented control (6 options)
Yes
Software / Hardware / AI-ML / Mobile / DevTools / Other
Tech stack tags
TagInput
Yes (min 1)
Max 10 tags. Tags normalised lowercase.
What kind of help
text input
Yes
5–200 characters.
Repository URL
url input
No
If provided, must be valid URL format.
City
text input
No
Optional context
College
text input
No
Optional context
Form validates all required fields on submit — inline errors below each invalid field.
Submit button text: 'Post Project'. Loading text: 'Posting...'. Success: modal closes, toast 'Project posted! People can now find it.'
Cancel button (secondary, top-right ×): closes modal, discards form state.
Mobile: modal is full-screen on screens < 640px.
8.2  Contribute Modal
Opens from the 'Contribute' button on a project card or project detail page. The user writes a short message explaining why they want to contribute.
Field
Type
Required
Validation
Message
textarea
Yes
20–500 characters. Character count shown '143 / 500'.
Header: 'Contribute to [Project Title]' — project name injected.
Subtext: 'Tell the project owner why you want to join and what you bring.'
Submit button: 'Send Request'. Loading: 'Sending...'. Success: modal closes, toast 'Request sent. You will hear back by email.'
If user already has a pending request: button is disabled, shows status chip. Modal still opens to show the message they sent.
9. Navigation — Final Specification
⚠  This is the authoritative navigation spec — overrides any prior version
The original design doc had navigation items that did not match the PRD. This section is the definitive source of truth for every nav item in the product.
9.1  Homepage Top Nav
Item
Link
Auth required
Notes
LogoWordmark
/ (homepage)
No
Always left-aligned
Projects
/projects
No
About
/about
No
Contact Us
/contact
No
Theme toggle
(action)
No
Sun/moon icon, right side
Sign In
/signin
No
Shown when not authed
Get Started (CTA)
/signup
No
Shown when not authed. Disappears when authed.
[Avatar + name]
/dashboard
Yes
Shown when authed — replaces Sign In and Get Started
NO 'Community' link
Community does not exist in Phase 1. There is no /community route. Do not add this link.
9.2  Sidebar Nav — Project Feed Page
Item
Icon
Link
Auth required
Projects (logo at top)
LogoMark
/ (homepage)
No
Browse Projects
grid icon
/projects
No
Post a Project
+ icon
opens PostProjectModal
Yes — redirects to /signin if not authed
My Dashboard
dashboard icon
/dashboard
Yes
About
info icon
/about
No
Theme toggle
sun/moon
(action)
No
Sign In / Sign Out
user icon
/signin or (action)
Contextual
No notification bell in Phase 1
Email is the notification layer for Phase 1. There is no in-app notification centre. The bell icon does not appear anywhere in the Phase 1 UI.
10. Blob Background Specification
The watercolour blob shapes are the only colour accent in the visual system. They appear as background decoration on the homepage hero and optionally on the sign in/sign up pages. They must be low-opacity and never interfere with text legibility.
10.1  BlobBackground Component
JSX
// BlobBackground.jsx
export function BlobBackground() {
  return (
    <div className='blob-bg' aria-hidden='true'>
      {/* Blob 1 — terracotta, top-left */}
      <svg className='blob blob-1' viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='var(--cta)'
          d='M47.3,-62.1C60.1,-52.0,68.5,-36.3,71.2,-19.8
             C73.9,-3.3,70.9,14.1,63.1,28.5
             C55.3,42.9,42.7,54.3,28.1,61.5
             C13.5,68.7,-3.1,71.6,-18.9,67.9
             C-34.7,64.2,-49.7,53.9,-60.0,39.6
             C-70.3,25.3,-75.9,7.0,-73.4,-10.1
             C-70.9,-27.2,-60.3,-43.1,-46.5,-53.2
             C-32.7,-63.3,-16.4,-67.6,0.7,-68.4
             C17.8,-69.2,34.5,-72.2,47.3,-62.1Z'
          transform='translate(100 100)'
        />
      </svg>
 
      {/* Blob 2 — dusty blue, bottom-right */}
      {/* CRITICAL: all negative numbers use ASCII hyphen-minus (-) */}
      {/* WRONG: 'M42.7,−58.2' (Unicode minus U+2212) */}
      {/* RIGHT: 'M42.7,-58.2' (ASCII hyphen-minus) */}
      <svg className='blob blob-2' viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='var(--accent)'
          d='M42.7,-58.2C54.9,-48.3,63.8,-34.2,68.4,-18.5
             C73.0,-2.8,73.3,14.5,66.4,28.1
             C59.5,41.7,45.4,51.6,30.5,58.4
             C15.6,65.2,-0.1,68.9,-15.4,65.9
             C-30.7,62.9,-45.6,53.2,-56.3,39.5
             C-67.0,25.8,-73.5,8.1,-71.5,-8.2
             C-69.5,-24.5,-59.0,-39.4,-45.8,-49.4
             C-32.6,-59.4,-16.3,-64.5,-0.2,-64.3
             C15.9,-64.1,30.5,-68.1,42.7,-58.2Z'
          transform='translate(100 100)'
        />
      </svg>
    </div>
  );
}
CSS
.blob-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
 
.blob {
  position: absolute;
  opacity: 0.06;         /* light mode: very subtle */
  filter: blur(40px);
  width: 600px;
  height: 600px;
}
[data-theme='dark'] .blob { opacity: 0.04; }
 
.blob-1 { top: -200px; left: -200px; }
.blob-2 { bottom: -200px; right: -200px; }
 
/* Hero section must establish stacking context */
.hero { position: relative; z-index: 0; }
.hero > *:not(.blob-bg) { position: relative; z-index: 1; }
11. Animations Reference
CSS
/* src/styles/animations.css */
 
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1.0; }
}
 
@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
 
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
 
@keyframes spin {
  to { transform: rotate(360deg); }
}
 
@keyframes modal-in {
  from { transform: scale(0.96) translateY(8px); opacity: 0; }
  to   { transform: scale(1) translateY(0);      opacity: 1; }
}
 
/* Prefers-reduced-motion: remove all non-essential animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
12. Accessibility Requirements
Target Lighthouse accessibility score: 90+. These are the minimum requirements for Phase 1.
All form inputs have visible labels — never placeholder-only. Labels use the 'label' type scale class.
All icon buttons have aria-label attributes. A search icon button must have aria-label='Search projects'.
Focus rings: all interactive elements show a visible focus ring — use the box-shadow focus pattern from Section 6.3. Never use outline: none without a replacement.
Colour contrast: all text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Test both themes.
All images have descriptive alt text. Avatar images: alt='{Full name} avatar'.
Modal focus trap: when a modal is open, tab key cycles through modal elements only — does not escape to the background. Modal close button is the first focusable element.
Skip to main content link: hidden by default, visible on first tab press. Required for keyboard navigation.
Skeleton cards have aria-hidden='true' and aria-busy='true' on the parent container.
Status chips use role='status' where they update dynamically (contribution request status).
13. Email Templates — Resend
All transactional emails sent via Resend. Templates are React Email components for maintainability. Tone: human, brief, useful. No marketing language. Every email has one clear action.
13.1  Email Templates Required for Phase 1
Template
Trigger
Subject
Key content
contribution_received
Owner receives new contribution request
Someone wants to contribute to [Project Title]
Contributor name + message preview + 'View Request' button → /dashboard
contribution_accepted
Contributor request accepted
You have been accepted to [Project Title]
Project name + owner name + 'View Project' button → /projects/:id
contribution_declined
Contributor request declined
Update on your contribution request
Friendly decline, encourages them to apply to other projects. No reason field required.
password_reset
User requests password reset
Reset your TriSangum password
Single 'Reset Password' button. Link expires in 1 hour. No other content.
welcome
New user registers
Welcome to TriSangum Labs
LogoWordmark, one sentence intro, 'Browse Projects' CTA. No feature tour — keep it short.
owner_nudge
Owner has pending requests > 48hrs
You have [N] pending contributor requests
'[N] developers are waiting to hear from you.' → /dashboard. Friendly, not pushy.
All emails: from address is hello@trisangumlabs.com (configure in Resend sender domain).
All emails: include a plain-text fallback version.
All emails: unsubscribe link in footer (required for CAN-SPAM / Indian IT Act compliance).
No HTML email builder — use React Email for programmatic, version-controlled templates.
14. Error and Empty States — Full Specification
⚠  Every empty and error state must be designed and implemented
A blank white page or generic 'Error' text is unacceptable. These states happen in week one of real usage.
State
Page
Message (exact copy)
Actions
API unavailable
Feed, Detail, Dashboard
'Having trouble connecting. Check your connection and try again.'
Retry button — re-triggers the query
404 — project not found
Project Detail
'This project no longer exists or has been removed.'
'← Back to projects' link
401 — session expired mid-session
(toast, any page)
'Your session has expired. Please sign in again.'
Auto-redirect to /signin with return-to
No projects — empty feed
Project Feed
'No projects here yet. Be the first to post one.'
'Post a project →' CTA link
No results — filters active
Project Feed
'No projects match your filters.'
'Clear filters' button
No projects — dashboard
Dashboard / My Projects tab
'You have not posted anything yet.'
'Post your first project →' CTA
No incoming requests
Dashboard / Incoming
'No contribution requests yet. Share your project to get noticed.'
Link to the project URL
No outgoing requests
Dashboard / My Requests
'You have not applied to any projects yet.'
'Browse projects →' link
Form submit failure
Post modal, Contribute modal
'Could not submit. Check your connection and try again.'
Re-enables form and submit button
Network error on star
Project card / detail
'Could not star that. Try again.'
Toast — auto-dismiss after 4s
Sign Off
This document defines the complete UI/UX specification for TriSangum Labs Phase 1. All component implementations must reference this document. Visual deviations require team agreement.
The three non-negotiables
1. Pill-shaped inputs and buttons everywhere — border-radius: 9999px, always.
2. Every card interaction works on touch — mobile is not an afterthought.
3. Every error state, empty state, and toast is written like a real person.
Aakriti · Yantrit · Uday  —  Create · Engineer · Rise