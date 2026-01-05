
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  MOCK_IPM_DATA, 
  MOCK_ECONOMIC_DATA 
} from '../constants';
import { 
  TrendingUp, 
  Users, 
  Coins, 
  Briefcase, 
  ArrowLeft,
  Calendar,
  ChevronRight,
  Download,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DevelopmentIndicators: React.FC = () => {
  // Merge the data for easier display in a table
  const mergedData = useMemo(() => {
    return MOCK_IPM_DATA.map(ipmItem => {
      const ecoItem = MOCK_ECONOMIC_DATA.find(e => e.year === ipmItem.year);
      return {
        year: ipmItem.year,
        ipm: ipmItem.ipm,
        kemiskinan: ipmItem.kemiskinan,
        growth: ecoItem?.growth || 0,
        unemployment: ecoItem?.unemployment || 0
      };
    }).sort((a, b) => b.year.localeCompare(a.year));
  }, []);

  const latestData = mergedData[0];
  const previousData = mergedData[1];

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(2));
  };

  const indicatorCards = [
    { 
      label: 'Indeks Pembangunan Manusia', 
      value: latestData.ipm, 
      unit: 'Poin', 
      icon: <Users className="w-6 h-6" />, 
      color: 'blue', 
      change: (latestData.ipm - previousData.ipm).toFixed(2) 
    },
    { 
      label: 'Tingkat Kemiskinan', 
      value: latestData.kemiskinan, 
      unit: '%', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'red', 
      change: (latestData.kemiskinan - previousData.kemiskinan).toFixed(2) 
    },
    { 
      label: 'Pertumbuhan Ekonomi', 
      value: latestData.growth, 
      unit: '%', 
      icon: <Coins className="w-6 h-6" />, 
      color: 'emerald', 
      change: (latestData.growth - previousData.growth).toFixed(2) 
    },
    { 
      label: 'Pengangguran Terbuka', 
      value: latestData.unemployment, 
      unit: '%', 
      icon: <Briefcase className="w-6 h-6" />, 
      color: 'indigo', 
      change: (latestData.unemployment - previousData.unemployment).toFixed(2) 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Indikator Pembangunan</h1>
            <p className="text-slate-500 font-medium max-w-2xl">
              Visualisasi data makro ekonomi dan sosial Kabupaten Halmahera Timur untuk memantau tren pembangunan tahunan.
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Download className="w-5 h-5" />
            <span>Unduh Laporan Tahunan</span>
          </button>
        </div>
      </section>

      {/* Latest Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicatorCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-blue-400 transition-all group">
            <div className={`p-3 rounded-2xl bg-${card.color}-50 text-${card.color}-600 inline-block mb-6 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{card.label}</p>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-slate-900">{card.value}</span>
              <span className="text-slate-400 font-bold text-sm">{card.unit}</span>
            </div>
            <div className={`mt-4 text-xs font-bold ${Number(card.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Number(card.change) >= 0 ? '+' : ''}{card.change} {card.unit} <span className="text-slate-400">vs {previousData.year}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Trends Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IPM vs Kemiskinan Trend */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Tren Kesejahteraan (IPM & Kemiskinan)
            </h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...mergedData].reverse()}>
                <defs>
                  <linearGradient id="colorIpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Area type="monotone" dataKey="ipm" name="IPM (Poin)" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorIpm)" />
                <Line type="monotone" dataKey="kemiskinan" name="Kemiskinan (%)" stroke="#ef4444" strokeWidth={3} dot={{r: 6}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth vs Unemployment */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-emerald-600" /> Dinamika Ekonomi & Tenaga Kerja
            </h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...mergedData].reverse()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Bar dataKey="growth" name="Pertumbuhan (%)" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="unemployment" name="Pengangguran (%)" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Detailed Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" /> Data Tahunan Historis
          </h2>
        </div>
        
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahun Anggaran</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">IPM (Poin)</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kemiskinan (%)</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pertumbuhan (%)</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pengangguran (%)</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mergedData.map((row) => (
                  <tr key={row.year} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-slate-900 flex items-center">
                        {row.year}
                        {row.year === latestData.year && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-[8px] font-black rounded-full uppercase">Terbaru</span>
                        )}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-bold text-blue-600">{row.ipm}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-bold text-red-500">{row.kemiskinan}%</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-bold text-emerald-600">{row.growth}%</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-bold text-indigo-600">{row.unemployment}%</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100 uppercase tracking-tighter">
                        Terverifikasi BPS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Info Footer */}
      <section className="bg-blue-600 rounded-[48px] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl font-black leading-tight">Mendorong Transparansi Data untuk Perencanaan yang Lebih Baik</h2>
          <p className="text-blue-100 font-medium leading-relaxed">
            Data indikator pembangunan ini bersumber dari kolaborasi antara BPS Kabupaten Halmahera Timur dan Dinas Kominfo sebagai wali data. Kami berkomitmen untuk menyajikan data yang akurat guna mendukung pengambilan kebijakan berbasis bukti (evidence-based policy).
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/datasets" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-blue-50 transition-all">
              <span>Lihat Detail Dataset</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <BarChart3 className="absolute -right-12 -bottom-12 w-80 h-80 text-white/10" />
      </section>
    </div>
  );
};

export default DevelopmentIndicators;
