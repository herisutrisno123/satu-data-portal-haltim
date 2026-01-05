
import React from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, Area
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieChartIcon, 
  MapPin, 
  ArrowLeft,
  Building2,
  Globe,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PDRB_SECTORAL = [
  { name: 'Pertambangan', value: 45, color: '#0f172a' },
  { name: 'Pertanian', value: 25, color: '#22c55e' },
  { name: 'Konstruksi', value: 12, color: '#3b82f6' },
  { name: 'Perdagangan', value: 10, color: '#f59e0b' },
  { name: 'Lainnya', value: 8, color: '#94a3b8' },
];

const KECAMATAN_DATA = [
  { name: 'Maba', pdrb: 4500, penduduk: 12500 },
  { name: 'Maba Selatan', pdrb: 3200, penduduk: 9800 },
  { name: 'Wasile', pdrb: 5100, penduduk: 15200 },
  { name: 'Wasile Timur', pdrb: 2800, penduduk: 8400 },
  { name: 'Buli', pdrb: 6200, penduduk: 11000 },
  { name: 'Maba Utara', pdrb: 1500, penduduk: 6500 },
];

const ECONOMIC_GROWTH = [
  { year: '2019', growth: 5.2, inflation: 3.1 },
  { year: '2020', growth: -1.2, inflation: 2.1 },
  { year: '2021', growth: 3.8, inflation: 2.8 },
  { year: '2022', growth: 5.4, inflation: 3.5 },
  { year: '2023', growth: 5.68, inflation: 3.2 },
];

const RegionalStats: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Statistik Daerah</h1>
            <p className="text-slate-500 font-medium max-w-2xl mt-2">
              Analisis mendalam mengenai struktur ekonomi, pertumbuhan, dan perbandingan pembangunan antar wilayah di Kabupaten Halmahera Timur.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Data 2023/2024</span>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <Coins className="w-24 h-24" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">PDRB ADHK (2023)</p>
          <h3 className="text-4xl font-black mb-4">Rp 12.4 Triliun</h3>
          <div className="flex items-center text-green-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5.68% Pertumbuhan Ekonomi
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Inflasi Tahunan</p>
          <h3 className="text-4xl font-black text-slate-900 mb-4">3.2%</h3>
          <p className="text-slate-500 text-sm font-medium">Kategori: Terkendali (Dibawah rata-rata nasional)</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">PDRB Per Kapita</p>
          <h3 className="text-4xl font-black text-slate-900 mb-4">Rp 98.4 Jt</h3>
          <p className="text-slate-500 text-sm font-medium">Berdasarkan Harga Berlaku per tahun</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sectoral Contribution */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-blue-600" /> Struktur Ekonomi (PDRB)
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase">Persentase (%)</span>
          </div>
          <div className="h-80 w-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PDRB_SECTORAL}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PDRB_SECTORAL.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3 pl-4">
              {PDRB_SECTORAL.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                    <span className="font-bold text-slate-600">{sector.name}</span>
                  </div>
                  <span className="font-black text-slate-900">{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Sektor Pertambangan dan Penggalian masih mendominasi struktur ekonomi Haltim, diikuti oleh sektor Pertanian yang menyerap tenaga kerja terbanyak.
            </p>
          </div>
        </div>

        {/* Growth vs Inflation */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Dinamika Ekonomi Makro
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase">Tren 5 Tahun</span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ECONOMIC_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="inflation" fill="#cbd5e1" stroke="#94a3b8" name="Inflasi (%)" />
                <Bar dataKey="growth" fill="#2563eb" radius={[4, 4, 0, 0]} name="Pertumbuhan (%)" />
                <Line type="monotone" dataKey="growth" stroke="#1e293b" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-400 text-center font-bold uppercase tracking-tighter italic">
            *Tahun 2020 mengalami kontraksi akibat dampak global pandemi COVID-19.
          </p>
        </div>
      </div>

      {/* Kecamatan Comparison */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Perbandingan Wilayah Kecamatan</h2>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
           <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KECAMATAN_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 14, fontWeight: 'bold'}} width={100} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Bar dataKey="pdrb" name="PDRB (Miliar Rp)" fill="#2563eb" radius={[0, 8, 8, 0]} />
                <Bar dataKey="penduduk" name="Jumlah Penduduk (Jiwa)" fill="#94a3b8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Koperasi Aktif</p>
            <p className="text-xl font-black text-slate-900">142</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desa Mandiri</p>
            <p className="text-xl font-black text-slate-900">18</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PAD (Miliar)</p>
            <p className="text-xl font-black text-slate-900">Rp 102.5</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Investasi</p>
            <p className="text-xl font-black text-slate-900">104%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalStats;
