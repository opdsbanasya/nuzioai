# Nuzio AI – UI/UX Architecture & Design System Document

> **Goal:** Build a premium AI-powered audio news briefing app that feels like a mix of Spotify + Inshorts + Headspace.
>
> Design language: **Minimalism + Neo-dark + Glassmorphism + Editorial Typography + Progressive Onboarding**

---

# 1. Design Philosophy

The UI follows:

### A. Progressive Disclosure

User is not overwhelmed.

Instead of asking everything on one screen:

```txt
Language
↓
Profession
↓
Interests
↓
Voice
↓
Time
↓
Notifications
```

Each screen asks only one thing.

This reduces cognitive load and improves onboarding completion. Progress indicators and step-based onboarding are commonly used to reduce abandonment and improve completion rates. ([The Apps Developers][1])

---

### B. Personalization First

Entire onboarding is based on:

```txt
Tell us about yourself

↓

We'll build your briefing
```

User feels:

```txt
This app is for me
```

The onboarding questions directly affect content, voice, timing, and recommendations. Personalization flows are widely used to improve relevance and retention when the answers visibly affect the experience. ([EPIC][2])

---

### C. Time-To-Value Pattern

The app avoids lengthy tutorials.

Flow:

```txt
Install

↓

Choose preferences

↓

Immediate personalized briefing
```

The first meaningful experience appears immediately after onboarding, which aligns with modern onboarding best practices focused on reducing time-to-value. ([Aaron Mallen][3])

---

# 2. Visual Design System

## Theme

```txt
Dark First
```

Primary Background

```css
#050505
```

Secondary Surface

```css
#111111
```

Card Surface

```css
#161616
```

---

## Accent Colors

### Primary

```css
#8B5CF6
```

Purple

Used for:

* CTAs
* Active states
* Progress indicators
* Player controls

---

### Secondary

```css
#34D399
```

Green

Used for:

* Success
* Active audio
* Premium indicators

---

### Blue

```css
#60A5FA
```

Used for:

* Upgrade
* Billing
* Highlights

---

# 3. Typography System

Two-type hierarchy.

## Editorial Serif

Used for:

```txt
News on go

your world

the loop

Aarav
```

Font:

```txt
Playfair Display
```

Purpose:

```txt
Premium
Editorial
Newsroom feeling
```

---

## Sans

Font:

```txt
Inter
```

Used for:

```txt
Labels
Cards
Buttons
Navigation
```

Purpose:

```txt
Modern
Readable
Clean
```

---

# 4. Design Patterns Used

## Pattern 1: Stepper Onboarding

Used in:

```txt
Profession
Interests
Voice
Time
Notifications
```

Visual:

```txt
━━━━━━━░░░░░
Step 2 of 6
```

Benefits:

* Progress visibility
* Reduced abandonment
* Clear expectations

Progress indicators are a common onboarding pattern because users understand how much remains in the flow. ([Android Developers][4])

---

## Pattern 2: Choice Chips

Used in:

```txt
Interests
Profession
```

Example:

```txt
[ AI ]
[ Startup ]
[ Markets ]
```

Selected:

```txt
[✓ AI]
```

Benefits:

* Faster than dropdowns
* Mobile friendly
* Multi-select support

---

## Pattern 3: Card Selection Pattern

Used in:

```txt
Voice Selection
```

Example:

```txt
┌────────────┐
 Aria
 British
 Warm
 [Play]
└────────────┘
```

Benefits:

* Rich metadata
* Preview before selection
* Easy comparison

---

## Pattern 4: Permission Priming

Notification screen.

Instead of:

```txt
Allow Notifications?
```

The UI explains:

```txt
Morning Brief
Breaking News
Weekly Digest
```

Then asks permission.

Permission priming improves understanding by explaining the value before requesting OS permissions. ([Android Developers][4])

---

## Pattern 5: Bottom Floating Player

Used in:

```txt
Home
Discover
Settings
```

Like:

```txt
Spotify Mini Player
```

Benefits:

* Persistent playback
* Cross-screen continuity
* Higher engagement

---

## Pattern 6: Bottom Navigation

Tabs:

```txt
Discover
Player
Settings
```

Pattern:

```txt
Centered CTA Navigation
```

Player button is elevated.

Inspired by:

```txt
Spotify
Clubhouse
```

---

# 5. Screen-by-Screen Breakdown

---

## 01 Splash

Purpose:

```txt
Brand Introduction
```

Components:

* Logo
* Tagline
* Loading state

Pattern:

```txt
Branded Splash
```

---

## 02 Language

Purpose:

```txt
Localization
```

Components:

* Language cards
* Location toggle

Pattern:

```txt
Preference Capture
```

---

## 03 Login

Purpose:

```txt
Authentication
```

Components:

* Value proposition
* Google Sign In

Pattern:

```txt
Low Friction Authentication
```

Google login reduces onboarding friction compared with lengthy forms. ([Android Developers][4])

---

## 04 Profession

Purpose:

```txt
User Segmentation
```

Used later for:

```txt
Feed Ranking
Recommendations
```

---

## 05 Interests

Purpose:

```txt
Personalization
```

Pattern:

```txt
Multi-select Tag Picker
```

Maximum:

```txt
7 Interests
```

---

## 06 Voice

Purpose:

```txt
Audio Personalization
```

Pattern:

```txt
Selectable Voice Cards
```

Contains:

* Name
* Accent
* Gender
* Preview Audio

---

## 07 Time

Purpose:

```txt
Habit Formation
```

Pattern:

```txt
Wheel Time Picker
```

Used for:

```txt
Morning Brief Scheduling
```

---

## 08 Notifications

Purpose:

```txt
Permission Priming
```

Explains:

* Morning Brief
* Breaking Stories
* Weekly Digest

Before asking permission.

---

## 09 All Set

Purpose:

```txt
Success Confirmation
```

Pattern:

```txt
Completion Screen
```

Shows:

* Preferences Summary
* Start CTA

Creates a sense of accomplishment after onboarding. ([Android Developers][4])

---

## 10 Home (Morning Brief)

Most important screen.

Components:

### Category Pills

```txt
All
AI
Markets
Startup
Science
```

### Greeting

```txt
Good Morning, Aarav
```

### Audio Card

Contains:

* Current Story
* Waveform
* Progress
* Controls

Pattern:

```txt
Hero Content Card
```

---

## 11 Discover

Purpose:

```txt
Content Exploration
```

Components:

* Search
* Filters
* Story Cards

Pattern:

```txt
Card Feed Layout
```

Similar to:

```txt
Inshorts
Spotify Podcast Lists
```

---

## 12 Settings

Sections:

```txt
Profile
Preferences
Playback
Notifications
Appearance
```

Pattern:

```txt
Grouped Settings
```

---

## 13 Billing

Pattern:

```txt
Pricing Card Stack
```

Contains:

### Free

```txt
Current Plan
```

### Pro

```txt
Upgrade CTA
```

### Annual

```txt
Savings CTA
```

Pattern:

```txt
Middle Plan Highlight
```

The Pro plan is visually emphasized.

---

# 6. Component Library (ShadCN Mapping)

```txt
Button
Card
Badge
Tabs
Switch
Input
Dialog
Drawer
Tooltip
Avatar
Separator
Progress
```

Custom Components:

```txt
VoiceCard
InterestChip
AudioPlayer
Waveform
StoryCard
PricingCard
MorningBriefCard
```

---

# 7. Animation Guidelines

GSAP + Framer Motion

### Page Enter

```txt
opacity: 0 → 1
y: 20 → 0
```

Duration:

```txt
0.5s
```

---

### Chip Selection

```txt
Scale 1 → 1.05
```

---

### CTA Hover

```txt
Glow Increase
```

---

### Audio Player

```txt
Animated Bars
```

---

# 8. Agent Build Instructions

Tell the AI agent:

```txt
Build a mobile-first React application using Vite, JavaScript, Tailwind CSS, ShadCN UI, Framer Motion, and GSAP.

Follow a premium dark-theme design system.

Use Playfair Display for editorial headings and Inter for UI text.

Implement progressive onboarding with step indicators.

Use reusable components for cards, chips, buttons, player controls, and pricing sections.

The UI should feel like a combination of Spotify, Headspace, and a premium AI news product.

Focus on pixel-perfect implementation of the provided Figma screens before integrating backend functionality.
```

Ye document agent ko dene par uske paas UI hierarchy, design system, component architecture, animation rules, aur UX patterns sab clear honge.

[1]: https://theappsdevelopers.com/blog/mobile-app-onboarding-ux-patterns-that-convert/?utm_source=chatgpt.com "Mobile App Onboarding UX: Patterns That Convert"
[2]: https://no-edit.lovable.app/blog/mobile-app-onboarding-ux-patterns?utm_source=chatgpt.com "Mobile App Onboarding UX Patterns — 2026 Best Practices | EPIC Design"
[3]: https://www.aaronmallen.com/2026/07/22/how-to-design-a-mobile-app-onboarding-flow-that-reduces-drop-off/?utm_source=chatgpt.com "How to Design a Mobile App Onboarding Flow That Reduces Drop-Off - Aaron Mallen"
[4]: https://developer.android.google.cn/design/ui/mobile/guides/patterns/onboarding?hl=en&utm_source=chatgpt.com "Authentication & Onboarding  |  Mobile  |  Android Developers"
