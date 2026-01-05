
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  BookOpen, 
  Sprout, 
  HardHat, 
  Building2, 
  Palmtree,
  Factory,
  GraduationCap,
  Map,
  Zap,
  Droplets
} from 'lucide-react';
import { Topic, Dataset, PriorityIndicator } from './types';

export const TOPICS = [
  { name: Topic.ECONOMY, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { name: Topic.HEALTH, icon: <Heart className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
  { name: Topic.EDUCATION, icon: <BookOpen className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
  { name: Topic.AGRICULTURE, icon: <Sprout className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
  { name: Topic.INFRASTRUCTURE, icon: <Building2 className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
  { name: Topic.DEMOGRAPHICS, icon: <Users className="w-6 h-6" />, color: 'bg-cyan-100 text-cyan-600' },
  { name: Topic.TOURISM, icon: <Palmtree className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
  { name: Topic.MINING, icon: <Factory className="w-6 h-6" />, color: 'bg-slate-100 text-slate-600' },
];

export const PRIORITY_INDICATORS: PriorityIndicator[] = [
  { label: 'Indeks Pembangunan Manusia', value: '71.25', change: 0.45, unit: 'Poin', icon: 'UserCheck' },
  { label: 'Tingkat Kemiskinan', value: '12.42', change: -0.8, unit: '%', icon: 'TrendingDown' },
  { label: 'Pertumbuhan Ekonomi', value: '5.68', change: 1.2, unit: '%', icon: 'BarChart' },
  { label: 'Tingkat Pengangguran Terbuka', value: '4.15', change: -0.2, unit: '%', icon: 'Briefcase' },
];

export const DETAILED_STATS = [
  { category: 'Pendidikan', label: 'Rasio Guru-Murid SD', value: '1:18', icon: <GraduationCap />, color: 'text-purple-600' },
  { category: 'Infrastruktur', label: 'Panjang Jalan Mantap', value: '412.5', unit: 'Km', icon: <Map />, color: 'text-orange-600' },
  { category: 'Energi', label: 'Rasio Elektrifikasi Desa', value: '94.2', unit: '%', icon: <Zap />, color: 'text-yellow-600' },
  { category: 'Lingkungan', label: 'Cakupan Air Minum', value: '68.4', unit: '%', icon: <Droplets />, color: 'text-blue-600' },
  { category: 'Pertanian', label: 'Luas Lahan Kelapa', value: '15.240', unit: 'Ha', icon: <Sprout />, color: 'text-green-600' },
  { category: 'Pariwisata', label: 'Kunjungan Wisatawan', value: '3.420', unit: 'Orang', icon: <Palmtree />, color: 'text-emerald-600' },
];

export const MOCK_DATASETS: Dataset[] = [
  {
    id: '1',
    title: 'Jumlah Penduduk Menurut Kecamatan dan Jenis Kelamin 2025',
    topic: Topic.DEMOGRAPHICS,
    description: 'Data statistik kependudukan Kabupaten Halmahera Timur tahun 2025 berdasarkan hasil proyeksi penduduk.',
    publisher: 'Dinas Kependudukan dan Catatan Sipil',
    updatedAt: '2025-01-15',
    format: ['PDF'],
    downloads: 1240
  },
  {
    id: '2',
    title: 'Produksi Kelapa Sawit Berdasarkan Lokasi Perkebunan 2024',
    topic: Topic.AGRICULTURE,
    description: 'Statistik hasil produksi sektor perkebunan khususnya kelapa sawit di wilayah Halmahera Timur.',
    publisher: 'Dinas Pertanian',
    updatedAt: '2024-08-10',
    format: ['PDF'],
    downloads: 856
  },
  {
    id: '3',
    title: 'Daftar Fasilitas Kesehatan (RSUD, Puskesmas, Pustu) 2025',
    topic: Topic.HEALTH,
    description: 'Lokasi dan kapasitas layanan fasilitas kesehatan yang tersebar di seluruh kecamatan.',
    publisher: 'Dinas Kesehatan',
    updatedAt: '2025-01-20',
    format: ['PDF'],
    downloads: 542
  },
  {
    id: '4',
    title: 'Realisasi Anggaran Pendapatan dan Belanja Daerah (APBD) 2024',
    topic: Topic.ECONOMY,
    description: 'Laporan realisasi serapan anggaran daerah per triwulan tahun anggaran 2024.',
    publisher: 'BPKAD',
    updatedAt: '2024-12-01',
    format: ['PDF'],
    downloads: 2105
  },
  {
    id: '5',
    title: 'Data Sebaran Lokasi Pertambangan Nikel 2025',
    topic: Topic.MINING,
    description: 'Peta dan data IUP sektor pertambangan nikel di Kabupaten Halmahera Timur.',
    publisher: 'Dinas ESDM / PTSP',
    updatedAt: '2025-01-12',
    format: ['PDF'],
    downloads: 1530
  }
];

export const CHART_DATA = [
  { year: '2021', ipm: 70.2, kemiskinan: 13.8 },
  { year: '2022', ipm: 70.8, kemiskinan: 13.1 },
  { year: '2023', ipm: 71.25, kemiskinan: 12.42 },
  { year: '2024', ipm: 71.8, kemiskinan: 12.10 },
  { year: '2025', ipm: 72.35, kemiskinan: 11.85 },
];

export const MOCK_IPM_DATA = CHART_DATA.map(d => ({ 
  ...d, 
  id: `ipm-${d.year}`,
  uhh: 68.5 + (parseInt(d.year) - 2021) * 0.2,
  hls: 12.1 + (parseInt(d.year) - 2021) * 0.1,
  rls: 7.8 + (parseInt(d.year) - 2021) * 0.15
}));

export const MOCK_ECONOMIC_DATA = [
  { id: 'eco-2025', year: '2025', growth: 5.92, unemployment: 3.85 },
  { id: 'eco-2024', year: '2024', growth: 5.75, unemployment: 3.98 },
  { id: 'eco-2023', year: '2023', growth: 5.68, unemployment: 4.15 },
  { id: 'eco-2022', year: '2022', growth: 5.4, unemployment: 4.35 },
  { id: 'eco-2021', year: '2021', growth: 3.8, unemployment: 4.55 },
];
