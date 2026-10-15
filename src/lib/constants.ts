export const SUPABASE_URL = 'https://hidgkvfrniimzteypmfv.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_D9VXgBCMsA0yjHw_RD08-w_USLrszfU';
export const BACKUP_BUCKET = 'bapenta-files';

export const SYNC_STATE_KEY = 'bapenta_supabase_sync_state_v1';
export const DEVICE_ID_KEY = 'bapenta_device_id_v1';
export const BACKUP_STATE_KEY = 'bapenta_supabase_backup_state_v1';
export const DELETED_KEYS_KEY = 'bapenta_deleted_keys_v1';
export const LOCAL_STORAGE_KEY_PAKET = 'rekapPaketData';
export const LOCAL_STORAGE_KEY_PAKET_UI = 'rekapPaketData_UI';
export const LOCAL_STORAGE_KEY_SANTRI = 'santriData';
export const LOCAL_STORAGE_KEY_PETUGAS = 'bapenta_petugas_aktif';
export const LOCAL_STORAGE_KEY_THEME = 'bapenta_theme';
export const LOCAL_STORAGE_KEY_GROQ_KEY = 'groqApiKey';

export const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const JADWAL_HARI: Record<number, string[]> = {
  1: ['7A', '7B', '7C', '7D'],             // Senin
  2: ['8A', '8B', '8C', '8D'],             // Selasa
  3: ['9A', '9B', '9C', '9D'],             // Rabu
  4: ['10A', '10B', '10C', '10IPA', '10IPS'], // Kamis
  5: ['11A', '11B', '11C', '11IPA', '11IPS'], // Jumat
  6: ['12A', '12B', '12C', '12IPA', '12IPS'], // Sabtu
  0: []                                     // Minggu
};

export const KELAS_OPTIONS = [
  '7A', '7B', '7C', '7D',
  '8A', '8B', '8C', '8D',
  '9A', '9B', '9C', '9D',
  '10A', '10B', '10C',
  '11A', '11B', '11C',
  '12A', '12B', '12C'
];

export const KETERANGAN_QUICK_OPTIONS = [
  'Makanan',
  'Pakaian',
  'Obat / Vitamin',
  'Paket / Kardus',
  'Dokumen / Buku',
  'Lainnya'
];

export const PETUGAS_DEFAULT = [
  'Ust. Ahmad',
  'Ust. Zaki',
  'Ust. Fajar',
  'Ust. Rizky',
  'Ust. Syahrul',
  'Ust. Wildan'
];
