# 📦 BAPENTA 3D — Dual Mode 2D/3D Warehouse Control Center & Multiplayer Digital Twin

[![Live Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://lanaaayeraa.github.io/bapenta-3d/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLanaaAyeraa%2Fbapenta-3d)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)
![Supabase](https://img.shields.io/badge/Supabase-Realtime%20%26%20Sync-green.svg)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-slate.svg)

> **🌐 Live Demo Langsung Aktif:** [**https://lanaaayeraa.github.io/bapenta-3d/**](https://lanaaayeraa.github.io/bapenta-3d/)

> Sistem Manajemen & Verifikasi Paket Santri Modern Berbasis **Dual Mode**: **Standard 2D Web Dashboard** & **Interactive 3D Warehouse Digital Twin** dengan fitur **Multiplayer Live Presence**, **Meja Komputer Operator 3 Workstations**, dan **Sinkronisasi Otomatis Supabase Cloud**.

---

## 🌟 Fitur Utama (Key Features)

### 1. 👥 Realtime Multiplayer & Live Presence (Petugas Piket)
- **Supabase Realtime Presence & Broadcast**: Menampilkan seluruh rekan petugas piket yang sedang online secara real-time.
- **Visualisasi 3D Petugas Lain**: Rekan petugas piket yang online langsung muncul sebagai avatar 3D di kantor/gudang dengan label nama dan indikator status.
- **Gerakan Terbuka (*Walk Mode*)**: Saat petugas lain bergerak dalam mode jalan (*WASD*), pergerakan dan ayunan langkah mereka otomatis tersinkronisasi mulus (*smooth interpolation*).
- **Radar Minimap Interaktif**: Minimap 2D menampilkan radar blip hijau zamrud (`#10b981`) berdenyut untuk setiap petugas piket yang aktif.
- **Sapaan Broadcast (Salute 👋)**: Fitur sapa rekan piket satu ketukan dengan notifikasi toast dan efek audio.

### 2. 💻 Meja Komputer Operator Luas (3 Workstations)
- **Kapasitas 3 Petugas**: Meja kayu oak selebar 18 unit dilengkapi 3 set workstation mandiri:
  - **Workstation 1 (Kiri)**: Monitor ultrawide curved, gaming PC dengan RGB LED cyan, keyboard, mousepad, & kursi ergonomis.
  - **Workstation 2 (Tengah)**: Dual curved gaming monitors, gaming PC dengan RGB LED emerald, keyboard, mousepad, & kursi ergonomis.
  - **Workstation 3 (Kanan)**: Monitor ultrawide curved, gaming PC dengan RGB LED ungu, keyboard, mousepad, & kursi ergonomis.
- **Pilihan Kursi Kerja**: Setiap petugas dapat memilih duduk di Kursi 1, Kursi 2, atau Kursi 3 melalui modal multiplayer.
- **Input Paket Cepat**: Mengklik bagian mana saja pada meja atau komputer langsung membuka modal input paket dengan shortcut angka kelas `1-9` & `0`.

### 3. 🏭 3D Interactive Warehouse Digital Twin (Skala 1:8)
- **Denah Spasial 2 Zona**:
  - **Area Kantor (Selatan/Depan)**: Ruang rapat eksekutif, sofa lounge, meja 3 workstation, pintu red chute, conveyor L-shape, dan terowongan scanner.
  - **Gudang Raksasa (Utara/Belakang)**: Luas 8x lipat dengan 4 baris rak palet vertikal (*double-deep racking*), area transit forklift, dan lorong keselamatan.
- **5 Bot / NPC Prosedural**:
  - 2 Staff di Kantor: *Ust. Fahmi* (Supervisor) & *Akhi Zaid* (Staff Admin).
  - 3 Petugas di Gudang: *Pak Joko* (QC Inspector), *Mas Aris* (Picker Barat), & *Kang Deden* (Stock Keeper Timur).
- **Animasi Kardus Otomatis**: Setiap input paket baru menjalankan animasi nyata: `Pintu Merah` ➔ `Conveyor Belt L-Shape` ➔ `Mesin Scanner (Flash Laser)` ➔ `Transit Staging` ➔ `Penataan ke Rak Sesuai Jadwal`.

### 4. 🔄 Sinkronisasi 2-Arah Supabase Cloud & Offline-First
- **Supabase Realtime `postgres_changes`**: Setiap kali paket baru ditambahkan dari device mana pun, paket langsung muncul di layar semua petugas dan otomatis menjalankan animasi conveyor 3D tanpa perlu refresh halaman.
- **Zero Data Loss**: Arsitektur offline-first dengan `localStorage` cache berlapis dan automatic cloud backup di Supabase Storage (`bapenta-files`).

### 5. ⚡ Fitur Mode 2D Lengkap
- Rekapitulasi per Tanggal, Minggu, & Bulan.
- Autocomplete fuzzy pencarian santri.
- Global Search (`Ctrl+K`).
- AI Assistant Gaul (Groq API).
- Ambient Lo-Fi Music Player.
- Export PDF, Excel, & Print Struk Paket.

---

## 🚀 Panduan Menjalankan

### Opsi A: Buka Langsung (Offline-First Single-File)
Cukup klik ganda file [`bapenta.html`](bapenta.html) atau [`index.html`](index.html) di komputer Anda untuk membuka aplikasi langsung di browser Chrome/Edge/Firefox tanpa memerlukan instalasi node.

### Opsi B: Jalankan Local Dev Server
```bash
# Clone repository
git clone https://github.com/LanaaAyeraa/bapenta-3d.git
cd bapenta-3d

# Install dependensi (opsional)
npm install

# Jalankan build static
npm run build

# Preview aplikasi
npm run preview
```

---

## ☁️ Deployment ke Vercel

Proyek ini telah dikonfigurasi penuh dengan [`vercel.json`](vercel.json) untuk deployment statis instan:

1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Hubungkan akun GitHub dan pilih repositori `LanaaAyeraa/bapenta-3d`.
3. Klik tombol **Deploy** (Pengaturan framework: *Other* atau otomatis terdeteksi).
4. Aplikasi akan aktif dalam hitungan detik dengan URL produksi HTTPS.

---

## 📂 Struktur File

```text
├── bapenta.html             # Single-file HTML lengkap (2D + 3D + Multiplayer)
├── index.html               # Entry-point web hosting (sinkron dengan bapenta.html)
├── vercel.json              # Konfigurasi deployment Vercel
├── package.json             # Konfigurasi paket & build script statis
├── docs/                    # Dokumentasi arsitektur & ADR
├── AGENTS.md                # Pedoman rekayasa & alur agen
└── GLOSSARY.md              # Kamus domain aplikasi
```

---

## 📜 Lisensi
Lisensi MIT — Dikelola untuk Tim Piket Paket BAPENTA.
