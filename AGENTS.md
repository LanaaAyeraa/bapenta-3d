# AGENTS.md — BAPENTA 3D Control Center

This document outlines the architecture, standards, and agent skills configuration for the BAPENTA 3D project.

## Agent skills

### Issue tracker

Local Markdown issues tracked under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical Matt Pocock label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context domain modeling with root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.

---

## Architectural Guidelines

1. **UI Standard**: shadcn/ui components (React, Tailwind CSS, Lucide Icons) with clean, responsive, dark-mode ready layout.
2. **3D Experience**: Interactive 3D warehouse / package control room (Three.js / React Three Fiber) with interactive shelves, 3D package models, status glowing shaders/materials, orbit controls, package inspection modals, and smooth animations.
3. **Data Integrity & Supabase Sync**: Zero modification to underlying Supabase schema, keys, and 2-way sync / offline-first caching mechanics inherited from `bapenta.html`.
4. **Engineering Workflow**: Strict Matt Pocock Skills lifecycle (spec-first, tickets with blocking edges, red-green-refactor TDD, domain glossary alignment, code review).
