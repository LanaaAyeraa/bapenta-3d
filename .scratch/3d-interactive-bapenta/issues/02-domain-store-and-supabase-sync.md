# 02: Core Domain Store & Offline-First Supabase Sync Engine

**What to build:**
Central reactive data store and offline-first 2-way Supabase sync engine that replicates 100% of the sync logic from `bapenta.html`. Supports local caching in `localStorage`, debounced push/pull, conflict resolution, tombstone delete tracking, and automated backup uploads to Supabase Storage bucket `bapenta-files`.

**Blocked by:** 01 (Scaffold Vite React and shadcn/ui Foundation)

**Status:** ready-for-agent

- [ ] Define TypeScript models for `Paket`, `Santri`, `SyncState`, and `Petugas`
- [ ] Implement deterministic `makeSyncKey`, `makeLocalId`, and deduplication algorithms
- [ ] Implement Supabase client with exact endpoint `https://hidgkvfrniimzteypmfv.supabase.co`
- [ ] Implement 2-way sync loop (pullAndMerge, pushLocalPackages, flushDeletedCloudPackages)
- [ ] Implement automated periodic cloud backup creation to `bapenta-files`
- [ ] Implement `usePackageStore` for UI state consumption
