import type { PaketItem, SantriItem } from '@/types';
import { NAMA_HARI, JADWAL_HARI } from './constants';

export function normalizeSyncText(value: unknown): string {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function makeSyncKey(item: Partial<PaketItem>): string {
  return [
    String(item.rawTanggal || '').trim(),
    normalizeSyncText(item.nama),
    normalizeSyncText(item.kelas),
    normalizeSyncText(item.keterangan || '')
  ].join('|');
}

export function makeLocalId(): number {
  const now = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return Number(String(now) + String(random).padStart(5, '0'));
}

export function getLocalDateISO(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseLocalDate(rawDate?: string): Date | null {
  if (!rawDate) return null;
  const parts = String(rawDate).trim().split('-');
  if (parts.length !== 3) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
}

export function formatIndonesianDate(rawDate: string): string {
  const date = parseLocalDate(rawDate);
  if (!date) return rawDate;
  const dayIndex = date.getDay();
  return `${NAMA_HARI[dayIndex]}, ${date.toLocaleDateString('id-ID')}`;
}

export function isKelasSesuaiJadwal(rawDate: string, kelas: string): boolean {
  const date = parseLocalDate(rawDate);
  if (!date) return false;
  const dayIndex = date.getDay();
  const allowed = JADWAL_HARI[dayIndex] || [];
  return allowed.map(k => k.toUpperCase()).includes(kelas.toUpperCase());
}

export function levenshteinDistance(a: string, b: string): number {
  if (!a) return b ? b.length : 0;
  if (!b) return a.length;
  const dp: number[][] = [];
  for (let i = 0; i <= a.length; i++) dp[i] = [i];
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

export function wordSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (!maxLen) return 1;
  return 1 - (levenshteinDistance(a, b) / maxLen);
}

export function scoreSantriSuggestion(query: string, student: SantriItem): number {
  const q = normalizeSyncText(query);
  const name = normalizeSyncText(student.nama);
  if (!q || !name) return 0;
  if (name === q) return 1000;
  if (name.startsWith(q)) return 800 - (name.length - q.length);

  const nameWords = name.split(' ');
  const qWords = q.split(' ');

  let wordPrefixBonus = 0;
  for (const qw of qWords) {
    if (nameWords.some(nw => nw.startsWith(qw))) {
      wordPrefixBonus += 120;
    }
  }

  if (name.includes(q)) return 500 + wordPrefixBonus - (name.length - q.length);

  let bestWordScore = 0;
  for (const qw of qWords) {
    for (const nw of nameWords) {
      bestWordScore = Math.max(bestWordScore, wordSimilarity(qw, nw));
    }
  }

  const wholeScore = wordSimilarity(q, name);
  const similarityScore = Math.max(bestWordScore, wholeScore);

  if (similarityScore < 0.45) return 0;
  return Math.round(similarityScore * 300 + wordPrefixBonus);
}

export function getSantriSuggestions(query: string, list: SantriItem[], limit: number = 6): SantriItem[] {
  if (!query || query.trim().length < 2) return [];
  return [...list]
    .map(student => ({ student, score: scoreSantriSuggestion(query, student) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.student);
}

export function getGhostCompletion(query: string, student?: SantriItem): string {
  if (!query || !student || !student.nama) return '';
  const rawQ = query.trimStart();
  const rawTarget = student.nama;
  if (rawTarget.toLowerCase().startsWith(rawQ.toLowerCase())) {
    return rawTarget.slice(rawQ.length);
  }
  return '';
}

export function nameSimilarity(a: string, b: string): number {
  const aa = normalizeSyncText(a);
  const bb = normalizeSyncText(b);
  if (!aa || !bb) return 0;
  if (aa === bb) return 1;
  const maxLen = Math.max(aa.length, bb.length);
  if (!maxLen) return 1;
  const prev: number[] = Array.from({ length: bb.length + 1 }, (_, i) => i);
  let row = prev;
  for (let i = 1; i <= aa.length; i++) {
    const cur = [i];
    for (let j = 1; j <= bb.length; j++) {
      cur[j] = Math.min(
        cur[j - 1] + 1,
        row[j] + 1,
        row[j - 1] + (aa[i - 1] === bb[j - 1] ? 0 : 1)
      );
    }
    row = cur;
  }
  return 1 - row[bb.length] / maxLen;
}

export function areLikelyDuplicate(a: Partial<PaketItem>, b: Partial<PaketItem>): boolean {
  if (String(a.rawTanggal || '') !== String(b.rawTanggal || '')) return false;
  if (normalizeSyncText(a.kelas) !== normalizeSyncText(b.kelas)) return false;
  if (normalizeSyncText(a.keterangan || '') !== normalizeSyncText(b.keterangan || '')) return false;
  return nameSimilarity(a.nama || '', b.nama || '') >= 0.92;
}

export function isValidPackageRecord(item: unknown): item is PaketItem {
  if (!item || typeof item !== 'object') return false;
  const obj = item as Record<string, unknown>;
  return Boolean(
    obj.nama &&
    typeof obj.nama === 'string' &&
    obj.nama.trim().length > 0 &&
    (obj.rawTanggal || obj.tanggal)
  );
}

export function normalizePackageRecord(item: any): PaketItem {
  const rawTanggal = String(item.rawTanggal || item.tanggal || getLocalDateISO()).trim();
  const date = parseLocalDate(rawTanggal) || new Date();
  const dayIndex = date.getDay();
  const kelas = String(item.kelas || '').trim().toUpperCase();

  const isSesuai = typeof item.isSesuai === 'boolean'
    ? item.isSesuai
    : (item.status === 'sesuai' || (JADWAL_HARI[dayIndex] || []).includes(kelas));

  const status = item.status === 'Sudah Diambil' ? 'Sudah Diambil' : 'Belum Diambil';

  return {
    id: Number(item.id) || makeLocalId(),
    local_id: String(item.local_id || item.id || ''),
    rawTanggal,
    tglFormatted: item.tglFormatted || `${NAMA_HARI[dayIndex]}, ${date.toLocaleDateString('id-ID')}`,
    nama: String(item.nama || '').trim(),
    kelas,
    keterangan: String(item.keterangan || '').trim(),
    isSesuai,
    petugas: String(item.petugas || 'Petugas Piket').trim(),
    status,
    sync_key: item.sync_key || makeSyncKey({ rawTanggal, nama: item.nama, kelas, keterangan: item.keterangan }),
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at || new Date().toISOString()
  };
}

export function dedupeLocalPackages(rows: PaketItem[]): PaketItem[] {
  const exact = new Map<string, PaketItem>();
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!isValidPackageRecord(row)) continue;
    const normalized = normalizePackageRecord(row);
    const key = makeSyncKey(normalized);
    const previous = exact.get(key);
    if (!previous || Number(normalized.id || 0) > Number(previous.id || 0)) {
      exact.set(key, normalized);
    }
  }

  const result: PaketItem[] = [];
  for (const item of exact.values()) {
    const duplicateIndex = result.findIndex(existing => areLikelyDuplicate(existing, item));
    if (duplicateIndex === -1) {
      result.push(item);
    } else if (Number(item.id || 0) > Number(result[duplicateIndex].id || 0)) {
      result[duplicateIndex] = item;
    }
  }

  return result.sort((a, b) => {
    const da = a.rawTanggal || '', db = b.rawTanggal || '';
    if (da !== db) return db.localeCompare(da);
    return Number(b.id || 0) - Number(a.id || 0);
  });
}
