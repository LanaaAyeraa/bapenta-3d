export interface PaketItem {
  id: number;
  local_id?: string;
  rawTanggal: string; // YYYY-MM-DD
  tglFormatted?: string;
  nama: string;
  kelas: string;
  keterangan: string;
  isSesuai?: boolean;
  petugas: string;
  status?: 'Belum Diambil' | 'Sudah Diambil';
  sync_key?: string;
  device_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SantriItem {
  id?: string | number;
  nama: string;
  kelas: string;
  asrama?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CloudPaketRow {
  id?: number | string;
  local_id?: string;
  tanggal: string;
  nama: string;
  kelas: string;
  keterangan?: string;
  petugas?: string;
  status?: string;
  sync_key?: string;
  device_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SyncState {
  status: 'ok' | 'error' | 'syncing' | 'idle';
  reason?: string;
  deviceId?: string;
  at?: string;
  count?: number;
  message?: string;
}

export interface BackupState {
  status: 'ok' | 'error';
  at?: string;
  path?: string;
  reason?: string;
  count?: number;
  message?: string;
}

export type NavigationTab = '3d' | 'dashboard' | 'input' | 'live' | 'rekap' | 'migrasi';

export type CameraPreset = 'overview' | 'rak-7-9' | 'rak-10-12' | 'meja-piket' | 'drone';
