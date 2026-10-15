# Spec: 3D Interactive Web Application for BAPENTA Control Center

**Status:** ready-for-agent

## Problem Statement
The current BAPENTA (Paket Control Center) application is a flat single-file HTML/JS page. While functional, it lacks spatial visualization of physical packages stored in the delivery office / warehouse. The duty officers (petugas piket) and santri want an immersive, interactive 3D spatial interface where they can visualize packages on physical shelves, locate items intuitively, inspect parcels in 3D, and manage package lifecycle while preserving all existing operational features, offline caching, and 2-way Supabase database synchronization.

## Solution
Re-architect BAPENTA into a modern, high-performance React application using shadcn/ui components (React, Tailwind CSS, Lucide Icons) and Three.js / React Three Fiber interactive 3D visualization. The 3D scene visualizes the package room with categorized shelves (by class or rack), dynamic 3D parcel boxes reflecting live package records with status glowing badges, interactive click-to-inspect 3D overlays, camera presets, and quick pickup status toggles. The 2D operational interface (Input form with ghost autocomplete, Live table, Rekap with CSV export, Migration JSON, Groq AI assistant, ambient music player, and 2-way Supabase sync) remains 100% feature-complete and bug-compatible with `bapenta.html`.

## User Stories

1. As a duty officer (petugas piket), I want to see an interactive 3D view of the package room with shelves and parcels, so that I have a clear spatial understanding of incoming goods.
2. As a duty officer, I want to rotate, zoom, and pan around the 3D warehouse, so that I can view packages from any angle or distance.
3. As a duty officer, I want to click on camera preset buttons (Overview / Drone, Rak Kelas 7-9, Rak Kelas 10-12, Meja Piket), so that I can quickly jump to specific areas of the 3D room.
4. As a duty officer, I want packages in the 3D scene to be color-coded by status (Amber/Orange for Belum Diambil, Emerald Green for Sudah Diambil), so that I can immediately spot uncollected packages.
5. As a duty officer, I want to click on any 3D package box to open an interactive 3D inspection modal showing recipient details, class, package type, date, and duty officer, so that I can inspect its details without leaving the 3D view.
6. As a duty officer, I want to toggle a package's status to "Sudah Diambil" directly from the 3D inspection modal, so that I can record pickups smoothly with audio/visual feedback.
7. As a duty officer, I want to switch seamlessly between 3D Control Room mode, Hybrid HUD mode (3D background with overlay management panels), and Classic 2D view, so that I can work in whichever mode is most productive for the task.
8. As a duty officer, I want fast package entry with santri ghost autocomplete and keyboard shortcuts, so that I can record dozens of new packages per minute during peak delivery hours.
9. As a duty officer, I want duplicate detection when typing a santri name, so that typos do not result in duplicate student records.
10. As a duty officer, I want quick-selection chips for Santri classes and package types (Makanan, Pakaian, Obat, Paket, Dokumen), so that I can fill out package forms with single clicks or key presses.
11. As a duty officer, I want real-time 2-way sync with Supabase cloud database (`https://hidgkvfrniimzteypmfv.supabase.co`), so that changes made on one device are instantly synced across all devices.
12. As a duty officer, I want local offline persistence in `localStorage`, so that the system remains 100% operational even when the internet connection drops.
13. As a duty officer, I want automatic snapshot backups uploaded to Supabase Storage bucket `bapenta-files`, so that data is safely preserved against catastrophic failure.
14. As a duty officer, I want to search across all packages using a global search bar with instant autocomplete, so that I can quickly find any student's package by name, class, or tracking key.
15. As an administrator, I want to filter historical packages by date ranges (Today, 7 Days, 30 Days, All, Custom) and export grouped CSV files, so that I can archive periodic distribution records.
16. As an administrator, I want to export and import full JSON backups, so that I can easily migrate or restore database state anytime.
17. As a duty officer, I want an integrated AI Assistant powered by Groq API, so that I can ask natural-language questions about packages, statistics, and trends.
18. As a duty officer, I want background ambient music (YouTube and Spotify integration), so that the duty shift environment remains pleasant.
19. As a user, I want full light and dark mode support with smooth transitions, so that the screen is comfortable to view in any lighting conditions.
20. As a user, I want responsive mobile-friendly layouts adhering to shadcn/ui design language, so that the app works well on smartphones, tablets, and desktop workstations.

## Implementation Decisions

1. **Architecture & Framework**:
   - Modern React with TypeScript and Vite.
   - Component library: **shadcn/ui** built on Tailwind CSS and Radix UI primitives with Lucide React icons.
   - State Management: Centralized store (`usePackageStore`) providing reactive access to `paketList`, `santriList`, `activePetugas`, `filterState`, and `themeState`.
2. **3D Interactive Engine**:
   - Three.js (@react-three/fiber and @react-three/drei).
   - Custom procedural 3D room: textured floor, walls, metal warehouse shelving units labeled by class groups, sorting desk, and ambient lighting with soft point lights and shadows.
   - Procedural 3D package boxes with procedural tape, label textures, and glowing rim shaders based on status.
   - Interactive raycasting: hover cursor change, gentle levitation on hover, click to inspect.
   - Smooth camera transitions with OrbitControls and target damping.
3. **Database & Sync Compatibility**:
   - Maintain identical Supabase URL, publishable key, table schemas (`paket`, `santri`), and storage bucket (`bapenta-files`).
   - Retain exact deterministic `sync_key` generation logic: `YYYY-MM-DD__<clean_name>__<clean_class>__<clean_ket>`.
   - Retain tombstone deletion mechanics via deleted sync keys tracking.
   - Retain debounced push/pull synchronization with offline fallback.
4. **Fuzzy Search & Ghost Autocomplete**:
   - Port the Levenshtein distance and word similarity algorithms directly from `bapenta.html` to guarantee 100% identical autocomplete suggestions and candidate scoring.
5. **UI & Feature Layout**:
   - Top App Bar with Logo, Global Search (Ctrl+K), Online/Sync Badge, Petugas Piket selector, Music player toggle, 3D Mode toggle, and Dark Mode switch.
   - View Tabs:
     - 3D Room / Warehouse View (Immersive spatial view)
     - Dashboard (Metrics, quick stats, distribution charts)
     - Input Paket (Rapid keyboard-first form)
     - Live Data (Active list with pickup actions, edit modal, WhatsApp notification, print receipt)
     - Rekap Data (Tabular data, periodic filters, grouped CSV exports)
     - Migrasi (JSON import/export, data reset)
     - AI Assistant (Groq chat modal)

## Testing Decisions

- Only external behavior is tested (data transformations, sync logic, search scoring, status transitions), not internal Three.js render ticks.
- Unit tests written in Vitest for:
  - Deterministic `sync_key` generation and deduplication.
  - Levenshtein distance and santri ghost autocomplete scoring.
  - Package status mutation (from Belum Diambil to Sudah Diambil) and local storage synchronization.
  - Package filtering by date and class.

## Out of Scope
- Direct thermal Bluetooth printer hardware drivers (standard browser print dialog is used).
- Native mobile app wrapper (Capacitor/Electron); PWA manifest is provided instead.

## Further Notes
The user explicitly stated: "tanpa ubah fitur dan sybc database nya" (without changing features or database synchronization). All existing data keys, Supabase backend hooks, and workflows must remain intact.
