# 04: Live Monitoring, Rekap Data Table, and Migration Tools

**What to build:**
Operational views including:
1. Live Data view with instant status toggles (Belum Diambil -> Sudah Diambil), package search, edit modal, delete, WhatsApp receipt generator, and print receipt view.
2. Rekap Data view with periodic filters (Hari Ini, 7 Hari, Bulan Ini, Semua, Rentang Tanggal) and grouped monthly CSV export.
3. Migrasi Data view with JSON backup export, JSON copy/import with merge/overwrite options, and local database reset.

**Blocked by:** 02 (Core Domain Store & Offline-First Supabase Sync Engine)

**Status:** ready-for-agent

- [ ] Build Live Data list with status badges, search, and action menus
- [ ] Implement Edit and Delete modals with sync tombstone triggers
- [ ] Implement WhatsApp text format generator and printable thermal receipt preview
- [ ] Implement Rekap table with pagination, search, and date filters
- [ ] Implement CSV export engine supporting monthly grouped downloads
- [ ] Implement Migrasi JSON import/export interface
