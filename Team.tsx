# FIGMA DESIGN PROMPT — I.R.I.S | Intelligent Real-time Identification & Security System

---

## PASTE THIS ENTIRE PROMPT INTO FIGMA AI / YOUR DESIGNER

---

Design a **complete, multi-section, single-page website** for **I.R.I.S** — an **AI-powered Security Camera System** built using Python, OpenCV, and MediaPipe. The website introduces the project, created by **Pratham Joshi** and **Hariom Bhimani**, with guidance from **Priti Dave Ma'am**, **Nilesh Ladani Sir**, and **Sanjay Sir**.

---

## AESTHETIC & FEEL

- Inspired by **Apple.com's design language** — premium, minimal, confident, cinematic
- **Glassmorphism / frosted glass** throughout: `backdrop-filter: blur(24px)`, semi-transparent cards with `background: rgba(255,255,255,0.08)`, thin `1px` borders at `rgba(255,255,255,0.18)`
- **Dark theme base**: deep navy-black background `#050A18`, not pure black
- **Accent palette**: electric blue `#3B82F6`, cyan `#06B6D4`, soft purple `#818CF8` — used for glows, gradients, and highlights only
- **Typography**: Use Inter or SF Pro Display. Hero heading ~72–96px bold. Section headings ~48px. Body text ~17–18px, line-height 1.7. Language is **simple, clear English** — confident and easy to follow, not overly technical
- Scrolling animations: **smooth parallax, fade-up-on-scroll, and stagger reveals** — nothing that looks like a PowerPoint slide transition
- No carousels. No slideshows. Everything flows naturally on scroll like Apple's product pages
- Subtle **grain/noise texture overlay** at 3–5% opacity on the background for depth
- Soft **radial glow halos** behind key sections (like apple.com's product glow effects)
- All buttons: pill-shaped, glass-style, with a hover glow effect

---

## SITE STRUCTURE — 9 SECTIONS

Design all sections as one continuous scroll page. Each section full-width. Include a **sticky top navigation bar**.

---

### [NAVBAR — Sticky, always visible]

- Frosted glass bar: `blur(20px)`, very thin bottom border, slightly darker than page
- Left: Project logo — a small camera-lens SVG icon + text **"I.R.I.S"** in white
- Centre: nav links — `Home`, `About`, `How It Works`, `Team`, `Report`, `Demo`, `Contact`
- Right: a small glowing pill badge that says **"I.R.I.S · v1.0"**
- On scroll: navbar slightly darkens and adds a thin glowing bottom border in `#3B82F6`

---

### [SECTION 1 — HERO]

Full viewport height (`100vh`). Centre-aligned.

- **Background**: animated particle field — tiny white dots slowly drifting, connected by faint lines when close (like a neural network / surveillance grid). Subtle camera-scan animation: a faint horizontal green scan line sweeps top to bottom every 4 seconds, very subtle
- **Main heading** (huge, white, bold):
  > "The Camera That Thinks."
- **Sub-heading** (smaller, grey):
  > "I.R.I.S is an AI-powered security system that identifies faces, detects weapons, and spots danger — in real time."
- **Two CTA buttons** below, side by side:
  - "See How It Works →" (glass pill, blue glow)
  - "Watch Demo ↓" (outline pill)
- **Below buttons**: small text — "Created by Pratham Joshi & Hariom Bhimani"
- **Scroll indicator**: small animated chevron at the very bottom of the hero, bouncing gently

---

### [SECTION 2 — WHAT IS THIS PROJECT?]

Two-column layout. Left: text. Right: a sleek mockup of the camera system UI (a dark terminal/camera feed window with face-detection bounding boxes drawn on it, green corner brackets, HUD overlay text like "Face: Pratham 94%", "ALERT: Weapon Detected").

- **Section label** (small caps, blue): `ABOUT THE PROJECT`
- **Heading**: "Meet I.R.I.S — A Security System Powered by Artificial Intelligence"
- **Body text** (simple English, 3 short paragraphs):
  > "I.R.I.S — short for Intelligent Real-time Identification & Security System — is a real-time AI security camera built using Python. It watches a live video feed from a webcam and does three things automatically: it recognises people's faces, spots dangerous weapons like knives, and detects violent actions like punching or kicking."
  >
  > "If anything suspicious is detected, I.R.I.S immediately raises an alert, shows it on screen, and saves a snapshot. It's like having a smart security guard that never blinks."
  >
  > "I.R.I.S uses OpenCV for computer vision, MediaPipe for body pose detection, and LBPH (a face recognition algorithm) — all running live on a regular laptop with just a webcam."
- Right mockup: dark glass card with a fake camera feed UI. Include green face-box brackets, red "WEAPON" alert label, cyan HUD text at top. Looks like a real security software interface. Add a subtle pulsing red dot to indicate "LIVE"

---

### [SECTION 3 — THREE CORE ABILITIES]

Full-width dark section. Three large glass cards side by side (or staggered on scroll).

Each card has: a large icon (top), a bold title, and 2–3 lines of simple explanation.

**Card 1 — Face Recognition** 🧑‍💻
- Icon: stylised face with bracket corners (like a camera detection box)
- Title: "Knows Who You Are"
- Text: "I.R.I.S remembers faces you've registered. It uses LBPH — a smart image-matching algorithm — to identify people in real time and show their name on screen. New faces can be added anytime by pressing K."

**Card 2 — Weapon Detection** 🔪
- Icon: warning triangle with a blade silhouette
- Title: "Spots Danger Instantly"
- Text: "Using shape analysis and a multi-frame confirmation system (called a ghost buffer), I.R.I.S only raises a weapon alert when it is truly sure — not just because of a bright wall or a white shirt. It checks the object across multiple frames before alerting."

**Card 3 — Violence Detection** 🥊
- Icon: a human figure mid-punch (simple silhouette)
- Title: "Detects Harmful Actions"
- Text: "Using Google's MediaPipe, I.R.I.S tracks 33 points on the human body — wrists, knees, shoulders — and checks for violent movements like punching, kicking, choking, or someone falling. It needs to see the action in 3 consecutive frames before raising an alert, so it never panics at a stretch or a wave."

Card style: dark glass (`rgba(255,255,255,0.06)`), glowing top border, subtle hover lift with glow

---

### [SECTION 4 — HOW IT WORKS (Visual Flow Diagram)]

Clean, horizontal or step-by-step vertical flowchart. Nodes connected by animated flowing lines (like Apple's chip diagrams).

Steps:
1. **Webcam captures live video** → camera icon
2. **Frame is pre-processed** (CLAHE + grayscale) → filter icon
3. **Face Detection** (Haar Cascade + 2-frame confirmation) → face icon
4. **Face Recognition** (LBPH matching) → ID card icon
5. **Weapon Scan** (contour shape + metallic mask + ghost buffer) → shield icon
6. **Pose Analysis** (MediaPipe 33-point skeleton) → body icon
7. **Alert Raised** (if confirmed across frames) → bell icon
8. **Snapshot saved + on-screen panel** → screenshot icon

Each step: small glass node, icon + label, connected by a soft glowing dashed animated line flowing left to right. Add a small tooltip-style callout on each node with one line of plain explanation.

---

### [SECTION 5 — PROJECT REPORT]

Clean centred section on a slightly lighter background.

- **Section label**: `PROJECT REPORT`
- **Heading**: "Read the Full Report"
- **Body**: "Our complete report covers the theory, methodology, results, and references behind I.R.I.S. Download it below as a PDF."
- **Large glass card** in the centre: looks like a document preview — shows a faint page mockup with "I.R.I.S | AI Security Camera System | Pratham Joshi & Hariom Bhimani" as the cover. A glowing "📄 Download PDF" button at the bottom of the card
- Below: small note — "This report documents the complete research and development process behind I.R.I.S."
- **PLACEHOLDER NOTE for developer**: leave a clearly labelled embed slot: `<!-- PDF EMBED OR LINK GOES HERE -->`

---

### [SECTION 6 — DEMO VIDEO]

Dark full-width section with a soft blue radial glow behind it.

- **Section label**: `LIVE DEMO`
- **Heading**: "See I.R.I.S in Action"
- **Body**: "Watch I.R.I.S detect faces, flag a weapon, and raise a violence alert — all in real time from a single webcam."
- **Large 16:9 video embed placeholder**: styled like a YouTube/Vimeo embed box. Dark glass container. A play button icon in the centre. A faint camera-feed overlay to make it look intentional as a placeholder. Add label: `<!-- PASTE YOUR VIDEO EMBED IFRAME HERE -->`
- Below the video: three small stat pills (glass badges) side by side:
  - `⚡ Real-time Detection`
  - `🔒 Multi-frame Confirmation`
  - `📸 Auto Alert Snapshots`

---

### [SECTION 7 — MEET THE TEAM]

Warm, personal section. Slightly warmer background tint (very subtle).

- **Section label**: `THE TEAM`
- **Heading**: "The People Behind I.R.I.S"

**Two student cards** (larger, prominent):

**Pratham Joshi**
- Role: "Developer & Researcher"
- Quote: "Building something that can actually see the world — that's what made this project exciting."
- Avatar: circular placeholder image with gradient ring (blue→purple)

**Hariom Bhimani**
- Role: "Developer & Researcher"
- Quote: "Understanding how AI sees faces the same way our eyes do — it changed how I think about computers."
- Avatar: circular placeholder image with gradient ring (cyan→blue)

---

**Three mentor cards** (slightly smaller, below):

**Priti Dave Ma'am**
- Role: "Mentor & Project Guide"
- Note: "Thank you for guiding us through every step of the project."
- Small badge: "Project Mentor"

**Nilesh Ladani Sir**
- Role: "Subject Guide"
- Note: "Thank you for your encouragement and feedback throughout."
- Small badge: "Academic Guide"

**Sanjay Sir**
- Role: "Faculty Support"
- Note: "Thank you for your support and insights."
- Small badge: "Faculty"

Mentor cards: glass style, smaller than student cards, arranged in a row below

---

### [SECTION 8 — EASTER EGGS — HIDDEN / SUBTLE]

These are secret interactive elements hidden in the page. Do NOT label them — they reward curious visitors. Place these discretely:

**Easter Egg 1 — Konami Code**
- When the user types the Konami Code on keyboard (↑↑↓↓←→←→BA), the entire page briefly flashes green and a toast notification pops up from the bottom: "🎮 Nice. You found the cheat code. Even I.R.I.S can't catch you." — toast disappears after 4 seconds.
- Note for developer: `<!-- KONAMI CODE EASTER EGG HANDLER -->`

**Easter Egg 2 — Hidden face scan**
- In the hero section, if the user clicks exactly on the camera-lens icon in the navbar logo, a fake "face scan" animation plays over the screen — green scan lines sweep the screen, then a fake popup appears: "✅ I.R.I.S Scan Complete: [Your Name Here] | Threat Level: Zero 😎" — disappears after 3 seconds.

**Easter Egg 3 — Secret credit**
- In the page's HTML source code comment (visible only if you inspect the code), add a hidden message: `<!-- Built at 2am. Fuelled by chai and curiosity. — Pratham & Hariom -->`

**Easter Egg 4 — Footer clock**
- The footer shows a live clock that updates every second. It looks like a terminal-style timestamp: `SYSTEM TIME: 14:32:07 | STATUS: ALL CLEAR`. If you stare at it for 10 seconds without moving your mouse, a small blinking text appears next to it: `"you've been staring for a while. everything is fine. 📷"`

---

### [SECTION 9 — FOOTER]

Clean, dark, minimal.

- Top of footer: thin glowing separator line
- Left: "I.R.I.S — Intelligent Real-time Identification & Security System"
- Centre: quick links — Home, Report, Demo, Team
- Right: "Pratham Joshi & Hariom Bhimani"
- Very bottom: "Guided by Priti Dave Ma'am · Nilesh Ladani Sir · Sanjay Sir"
- Easter Egg terminal clock widget (described above) — right side of footer, monospace font, green text
- Bottom-most line, very small grey text: "Built with Python, OpenCV, MediaPipe, and a lot of late nights."

---

## ANIMATIONS & INTERACTIONS (Critical — this must not look like a slideshow)

- **Hero particles**: continuous, slow, organic drift — NOT a loop with a visible reset
- **Scroll-triggered fade-ups**: elements appear with `opacity 0→1` + `translateY 30px→0` over 600ms with `ease-out`. Stagger child elements by 100ms each
- **Glass cards on hover**: `translateY -6px` + soft `box-shadow` glow in the card's accent colour, transition 250ms
- **Flowchart lines**: animated SVG `stroke-dashoffset` flowing from left to right continuously
- **Scan line in hero**: single horizontal line, `opacity 0→0.4→0`, sweeps full height every 5 seconds, green colour, very subtle
- **Navbar**: on scroll past 80px, adds `backdrop-filter: blur(24px)` + a faint bottom glow line, transitions smoothly
- **Button hover**: scale `1→1.03`, glow intensifies, transition 200ms
- **CTA pill badges** (stat badges in video section): slow pulsing glow border animation
- **Section entrance**: each section has its own entrance character — the abilities section has cards staggering in from below, the team section portraits fade in with a slight scale (0.95→1)

---

## RESPONSIVENESS

- Design at 1440px desktop width as primary
- Also design a 390px mobile view (iPhone 15 Pro size)
- On mobile: all multi-column layouts collapse to single column, navbar collapses to a hamburger menu (glass drawer), hero text scales down to ~40px

---

## COLOUR TOKENS (for design system in Figma)

| Token | Value |
|---|---|
| `bg-base` | `#050A18` |
| `bg-card` | `rgba(255,255,255,0.06)` |
| `border-glass` | `rgba(255,255,255,0.12)` |
| `accent-blue` | `#3B82F6` |
| `accent-cyan` | `#06B6D4` |
| `accent-purple` | `#818CF8` |
| `text-primary` | `#F1F5F9` |
| `text-secondary` | `#94A3B8` |
| `alert-red` | `#EF4444` |
| `alert-green` | `#22C55E` |
| `glow-blue` | `rgba(59,130,246,0.35)` |

---

## FIGMA SETUP NOTES

- Use **Auto Layout** throughout
- Set up a **component library**: Glass Card, Pill Badge, Icon Node, Team Card, Nav Link, CTA Button
- Use **Figma Variables** for all colour tokens above
- Create **Prototype flows** for: scroll animations (use Smart Animate), hover states on cards and buttons, Easter egg interactions (overlay frames)
- Export each section as a separate Figma frame, then connect them in a single prototype flow
- Use **Figma's blur effect** (`Layer blur` or `Background blur`) to simulate glassmorphism on cards

---

*I.R.I.S (Intelligent Real-time Identification & Security System) was fully built in Python using OpenCV, MediaPipe, and LBPH face recognition — no cloud APIs, no pre-trained weapon models, just pure computer vision logic running on a standard laptop webcam.*