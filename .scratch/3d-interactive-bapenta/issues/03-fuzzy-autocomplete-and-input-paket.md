# 03: Fast Package Input with Fuzzy Ghost Autocomplete

**What to build:**
A high-efficiency package registration screen with keyboard-first controls, Santri fuzzy ghost autocomplete (Levenshtein distance matching), quick chips for classes and categories, and a duplicate detection modal for similar santri names.

**Blocked by:** 02 (Core Domain Store & Offline-First Supabase Sync Engine)

**Status:** ready-for-agent

- [ ] Implement Levenshtein distance and word similarity algorithms
- [ ] Implement ghost text completion input with Tab/Arrow navigation
- [ ] Build quick-select button grids for Kelas (7A, 7B, 8A, etc.) and Keterangan (Makanan, Pakaian, Obat, dll.)
- [ ] Implement Add New Santri dialog with fuzzy duplicate warning modal
- [ ] Fast form submission that saves locally and triggers debounced cloud sync
