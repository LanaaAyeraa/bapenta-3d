# GLOSSARY.md — BAPENTA 3D Domain Glossary

This document establishes the official vocabulary for the BAPENTA 3D application.

## Core Domain Terms

### Paket
A package or parcel received for a santri. Contains:
- `id`: Unique identifier (local or remote integer/uuid)
- `local_id`: Client-generated unique id (`pkt_<timestamp>_<rand>`)
- `sync_key`: Deterministic hash key combining date, sanitized name, class, and description to prevent cloud duplicates
- `tanggal`: Date of arrival (`YYYY-MM-DD`)
- `nama`: Name of the recipient santri
- `kelas`: Class of the santri (e.g., 7A, 7B, 8A, etc.)
- `keterangan`: Package category/note (e.g. Makanan, Pakaian, Obat, Paket, Dokumen)
- `petugas`: Name of the duty officer who received the package
- `status`: Delivery status, strictly `'Belum Diambil'` or `'Sudah Diambil'`
- `device_id`: Identifier of the originating device
- `created_at` / `updated_at`: ISO timestamp

### Santri
Master reference student record.
- `id`: Student ID
- `nama`: Full name of santri
- `kelas`: Class level and section
- `asrama`: Dormitory/hostel room identifier

### Petugas Piket
The duty officer/ustadz responsible for receiving and distributing packages during their shift.

### 3D Warehouse / 3D Control Center
The interactive 3D spatial representation of the storage room:
- **Rak / Bay**: Categorized 3D shelves organized by grade level (Kelas 7, 8, 9, 10, 11, 12, etc.) or storage rack.
- **3D Paket Box**: Physical 3D representation of a parcel placed on the shelf. Color-coded (Amber for *Belum Diambil*, Emerald for *Sudah Diambil*).
- **Inspection View**: Interactive focus mode on a selected package showing detailed metadata, quick actions, and receipt options.

### Supabase Sync Engine
The offline-first 2-way synchronization layer:
- Local state cached in `localStorage` (`dataRekap` / `bapenta_paket_v1`, `santriList`).
- Debounced upsert & pull against Supabase table `paket` and `santri`.
- Tombstone handling for deleted items via `sync_key`.
- Periodic snapshot backup into Supabase Storage bucket `bapenta-files`.

### Ghost Autocomplete
Fast predictive typing engine for santri input featuring Levenshtein fuzzy distance matching and inline ghost text suggestion.
