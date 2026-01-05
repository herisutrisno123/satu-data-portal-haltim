
import React, { useState, useMemo, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  MOCK_IPM_DATA,
  MOCK_ECONOMIC_DATA,
  PRIORITY_INDICATORS, 
  DETAILED_STATS 
} from '../constants';
import { 
  TrendingUp, 
  Database, 
  PieChart as PieChartIcon, 
  LayoutDashboard,
  Calendar,
  ChevronDown,
} from 'lucide-react';

const getPdrbSectoral = (year: string) => {
  const seed = parseInt(year) || 2025;
  return [
    { name: 'Pertambangan', value: 40 + (seed % 10), color: '#0f172a' },
    { name: 'Pertanian', value: 20 + (seed % 8), color: '#22c55e' },
    { name: 'Konstruksi', value: 10 + (seed % 5), color: '#3b82f6' },
    { name: 'Perdagangan', value: 8 + (seed % 4), color: '#f59e0b' },
    { name: 'Lainnya', value: 5 + (seed % 3), color: '#94a3b8' },
  ];
};

const Priority: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'macro' | 'economic' | 'social' | 'regional'>('macro');
  const [consolidatedData, setConsolidatedData] = useState<any[]>([]);
  const currentYearStr = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYearStr);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  useEffect(() => {
    // Ambil data konsolidasi dari localStorage yang dikelola di Panel Admin
    const savedIpm = localStorage.getItem('haltim_ipm');
    let dataArray = [];
    
    if (savedIpm) {
      dataArray = JSON.parse(savedIpm);
    } else {
      // Jika kosong, lakukan penggabungan mock data IPM dan Ekonomi seperti di Panel Admin
      dataArray = MOCK_IPM_DATA.map(ipm => {
        const eco = MOCK_ECONOMIC_DATA.find(e => e.year === ipm.year);
        return {
          ...ipm,
          growth: eco?.growth || 0,
          unemployment: eco?.unemployment || 0
        };
      });
    }
    
    // Urutkan berdasarkan tahun terbaru
    const sortedData = [...dataArray].sort((a, b) => String(b.year).localeCompare(String(a.year)));
    setConsolidatedData(sortedData);

    if (sortedData.length > 0) {
      setSelectedYear(String(sortedData[0].year));
    }
  }, []);

  const availableYears = useMemo(() => {
    return consolidatedData.map(d => String(d.year));
  }, [consolidatedData]);

  const currentYearData = useMemo(() => {
    return consolidatedData.find(d => String(d.year) === selectedYear) || consolidatedData[0];
  }, [selectedYear, consolidatedData]);

  const dynamicIndicators = useMemo(() => {
    return PRIORITY_INDICATORS.map(indicator => {
      let value = "-";
      let change = 0;
      const prevYear = String(parseInt(selectedYear) - 1);
      const prevData = consolidatedData.find(d => String(d.year) === prevYear);

      if (indicator.label.includes('Pembangunan Manusia')) {
        value = currentYearData?.ipm ? String(currentYearData.ipm) : "-";
        if (currentYearData?.ipm && prevData?.ipm) {
          change = parseFloat(((currentYearData.ipm - prevData.ipm) / prevData.ipm * 100).toFixed(2));
        }
      } else if (indicator.label.includes('Kemiskinan')) {
        value = currentYearData?.kemiskinan ? String(currentYearData.kemiskinan) : "-";
        if (currentYearData?.kemiskinan && prevData?.kemiskinan) {
          change = parseFloat(((currentYearData.kemiskinan - prevData.kemiskinan) / prevData.kemiskinan * 100).toFixed(2));
        }
      } else if (indicator.label.includes('Pertumbuhan Ekonomi')) {
        // MENGAMBIL DATA PERTUMBUHAN EKONOMI DARI PANEL PENGELOLA (field 'growth')
        value = currentYearData?.growth !== undefined ? String(currentYearData.growth) : "-";
        if (currentYearData?.growth !== undefined && prevData?.growth !== undefined) {
          // Hitung perubahan poin (delta) untuk persentase biasanya lebih informatif
          change = parseFloat((currentYearData.growth - prevData.growth).toFixed(2));
        }
      } else if (indicator.label.includes('Pengangguran')) {
        // MENGAMBIL DATA PENGANGGURAN DARI PANEL PENGELOLA (field 'unemployment')
        value = currentYearData?.unemployment !== undefined ? String(currentYearData.unemployment) : "-";
        if (currentYearData?.unemployment !== undefined && prevData?.unemployment !== undefined) {
          change = parseFloat((currentYearData.unemployment - prevData.unemployment).toFixed(2));
        }
      }

      return { ...indicator, value, change };
    });
  }, [selectedYear, currentYearData, consolidatedData]);

  const pdrbSectoral = useMemo(() => getPdrbSectoral(selectedYear), [selectedYear]);

  const sortedChartData = useMemo(() => {
    return [...consolidatedData]
      .filter(d => parseInt(d.year) <= parseInt(selectedYear))
      .sort((a, b) => String(a.year).localeCompare(String(b.year)))
      .slice(-5);
  }, [consolidatedData, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-none">Statistik Prioritas</h1>
              <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Capaian Kinerja Kabupaten (Live Data)</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <button onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)} className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Tahun {selectedYear}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute top-full mt-2 w-full min-w-[160px] bg-white rounded-2xl shadow-xl border py-2 z-50 overflow-hidden">
                <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Pilih Tahun Data</div>
                <div className="max-h-60 overflow-y-auto">
                  {availableYears.map(year => (
                    <button key={year} onClick={() => { setSelectedYear(year); setIsYearDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-bold ${selectedYear === year ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>Tahun {year}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {['macro', 'economic', 'social', 'regional'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{tab === 'macro' ? 'Makro' : tab === 'economic' ? 'Ekonomi' : tab === 'social' ? 'Sosial' : 'Wilayah'}</button>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicIndicators.map((indicator, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-blue-300 transition-all">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{indicator.label}</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-slate-900">{indicator.value}</span>
              <span className="text-slate-400 font-bold">{indicator.unit}</span>
            </div>
            {indicator.value !== "-" && (
              <div className={`mt-4 inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                (indicator.label.includes('Kemiskinan') || indicator.label.includes('Pengangguran'))
                ? (indicator.change > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600')
                : (indicator.change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')
              }`}>
                <TrendingUp className={`w-3 h-3 ${indicator.change < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(indicator.change)} {indicator.label.includes('Pertumbuhan') || indicator.label.includes('Pengangguran') ? 'Poin' : '%'} dari {parseInt(selectedYear)-1}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Macro Charts Section */}
      {(activeTab === 'macro' || activeTab === 'social') && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-8 flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-blue-600" /> Estimasi Struktur Ekonomi (%)
            </h3>
            <div className="h-72 w-full flex flex-col md:flex-row items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pdrbSectoral} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pdrbSectoral.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full md:w-1/2 space-y-2.5 pl-4 mt-4 md:mt-0">
                {pdrbSectoral.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></div>
                      <span className="font-bold text-slate-600">{s.name}</span>
                    </div>
                    <span className="font-black text-slate-900">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-8">Tren Pembangunan Manusia (IPM)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sortedChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="ipm" stroke="#2563eb" strokeWidth={4} fillOpacity={0.1} fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DETAILED_STATS.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm group hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.category}</span>
              <div className={`${stat.color || 'text-blue-600'} p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon && React.isValidElement(stat.icon) ? stat.icon : <Database className="w-6 h-6" />}
              </div>
            </div>
            <h4 className="text-slate-500 text-sm font-bold mb-1">{stat.label}</h4>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-slate-900">{stat.value}</span>
              {stat.unit && <span className="text-slate-400 font-bold text-sm">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Priority;
