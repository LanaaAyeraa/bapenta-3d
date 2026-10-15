# ADR 0001: 3D Interactive Web Architecture with shadcn/ui & Supabase Sync

## Status
Accepted

## Context
The legacy application `bapenta.html` is a single-file Vanilla JS / Tailwind CDN / Supabase application managing package arrival, distribution, and verification for santri.
The user requested:
1. Transform it into an interactive 3D web experience ("buat jadi 3D web interaktif").
2. Retain 100% of existing features, workflows, and database synchronization without breaking changes ("tanpa ubah fitur dan sync database nya").
3. Implement using the user standard: React + Vite + Tailwind CSS + Lucide Icons + shadcn/ui components.

## Decision
1. **Frontend Foundation**: Vite + React 19 + TypeScript + Tailwind CSS v4 / v3 + shadcn/ui design patterns + Lucide React.
2. **3D Interactive Scene**: Three.js (@react-three/fiber and @react-three/drei, or Three.js canvas layer) delivering an interactive 3D package distribution room / warehouse:
   - Interactive 3D racks segmented by classes.
   - Dynamic 3D package boxes populated directly from the live `paket` state.
   - Orbit controls, hover effects, highlight shaders, camera perspective switching (Drone, Shelf close-up, Desk).
   - Click on 3D box triggers 3D inspect card with pickup toggle, status update, WhatsApp share, and receipt print.
3. **Dual View / Seamless Hybrid Mode**:
   - Header toggle allowing switching between "3D Control Room" spatial view, "Hybrid HUD" (3D background with overlay management panels), and "Standard Management Table" (Live/Rekap view).
4. **Data & Sync Layer**:
   - Encapsulate the proven Supabase sync engine from `bapenta.html` into a dedicated React hook / store (`useSupabaseSync` and `usePackageStore`).
   - Maintain strict backwards compatibility with Supabase credentials:
     - URL: `https://hidgkvfrniimzteypmfv.supabase.co`
     - Publishable Key: `sb_publishable_D9VXgBCMsA0yjHw_RD08-w_USLrszfU`
     - Tables: `paket`, `santri`, Storage: `bapenta-files`.
     - Identical `sync_key`, `local_id`, deduplication, and tombstone logic.
5. **Testing**: Vitest for unit tests of data synchronization, fuzzy search/ghost autocomplete algorithms, and package status mutations.

## Consequences
- Full fidelity to all features from `bapenta.html` (Input Paket, Live Data, Rekap Data, Export CSV, Import/Export JSON, AI Chat Groq, Ambient Music Player).
- Cutting-edge interactive 3D presentation without sacrificing data safety or operational speed.
