# 05: Interactive 3D Warehouse & Package Control Room

**What to build:**
An immersive 3D spatial view of the package sorting room / warehouse:
- 3D room environment with lighting, shadows, floor markings, and labeled multi-tier shelving units organized by class tiers (Kelas 7, 8, 9, 10, 11, 12, dll.).
- Dynamic 3D parcel boxes rendered on shelves from live database records, color-coded by status (Amber glow for Belum Diambil, Emerald Green for Sudah Diambil).
- Orbit controls with camera position presets (Overview, Rak Kelas 7-9, Rak Kelas 10-12, Meja Piket).
- Hover effects with gentle levitation and pointer cursor.
- Click to inspect 3D package card: full metadata display, instant status toggle button ("Ambil Paket"), WhatsApp share, and sound effect/visual celebration on pickup.

**Blocked by:** 02 (Core Domain Store & Offline-First Supabase Sync Engine)

**Status:** ready-for-agent

- [ ] Set up Three.js rendering canvas with responsive resize and post-processing/lighting
- [ ] Build 3D warehouse environment (floor, walls, lighting, sorting desk, shelving units)
- [ ] Implement procedural 3D package box meshes with dynamic placement on shelves
- [ ] Implement camera preset manager and smooth orbital controls
- [ ] Build interactive raycaster for package hovering and selection
- [ ] Build 3D Package Inspection Card with live status toggle and receipt links
