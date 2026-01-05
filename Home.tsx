
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Database, ArrowRight, Calendar, FileDown, Loader2, PieChart, Building2, ShieldCheck, Layers, ChevronDown, TrendingUp, ExternalLink, Users } from 'lucide-react';
import { TOPICS, PRIORITY_INDICATORS, MOCK_DATASETS, MOCK_IPM_DATA } from '../constants';
import { Link } from 'react-router-dom';
import { Dataset } from '../types';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [producers, setProducers] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  
  const [ipmData, setIpmData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [statTab, setStatTab] = useState<'topic' | 'producer'>('topic');

  useEffect(() => {
    // Load Datasets
    const savedDatasets = localStorage.getItem('haltim_datasets');
    const currentDatasets = savedDatasets ? JSON.parse(savedDatasets) : MOCK_DATASETS;
    setDatasets(currentDatasets);

    // Load Producers (Synchronized with DatasetManagement list)
    const savedProducers = localStorage.getItem('haltim_producers');
    const defaultProducers = [
      { id: 'P-001', name: 'Bappeda', fullName: 'Badan Perencanaan Pembangunan, Penelitian dan Pengembangan Daerah' },
      { id: 'P-002', name: 'Diskominfo', fullName: 'Dinas Komunikasi, Informatika, Persandian dan Statistik' },
      { id: 'P-003', name: 'Dinas Kesehatan', fullName: 'Dinas Kesehatan Kabupaten Halmahera Timur' },
      { id: 'P-004', name: 'Dinas Pendidikan', fullName: 'Dinas Pendidikan, Kepemudaan dan Olahraga' },
      { id: 'P-005', name: 'Dinas Sosial', fullName: 'Dinas Sosial, Pemberdayaan Perempuan dan Perlindungan Anak' },
      { id: 'P-006', name: 'Disdukcapil', fullName: 'Dinas Kependudukan dan Pencatatan Sipil' },
      { id: 'P-007', name: 'Dinas PMD', fullName: 'Dinas Pemberdayaan Masyarakat dan Desa' },
      { id: 'P-008', name: 'Dinas Pertanian', fullName: 'Dinas Pertanian Kabupaten Halmahera Timur' },
      { id: 'P-009', name: 'Dinas PUPR', fullName: 'Dinas Pekerjaan Umum dan Penataan Ruang' },
      { id: 'P-010', name: 'Dinas Perhubungan', fullName: 'Dinas Perhubungan Kabupaten Halmahera Timur' },
      { id: 'P-011', name: 'Dinas Pariwisata', fullName: 'Dinas Kebudayaan dan Pariwisata' },
      { id: 'P-012', name: 'Dinas Perikanan', fullName: 'Dinas Kelautan dan Perikanan' },
      { id: 'P-013', name: 'Dinas Lingkungan Hidup', fullName: 'Dinas Lingkungan Hidup Kabupaten Halmahera Timur' },
      { id: 'P-014', name: 'DPMPTSP', fullName: 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu' },
      { id: 'P-015', name: 'BPKAD', fullName: 'Badan Pengelola Keuangan dan Aset Daerah' },
      { id: 'P-016', name: 'Bapenda', fullName: 'Badan Pendapatan Daerah' },
      { id: 'P-017', name: 'BKPSDM', fullName: 'Badan Kepegawaian dan Pengembangan Sumber Daya Manusia' },
      { id: 'P-018', name: 'BPBD', fullName: 'Badan Penanggulangan Bencana Daerah' },
      { id: 'P-019', name: 'Inspektorat', fullName: 'Inspektorat Daerah Kabupaten Halmahera Timur' },
      { id: 'P-020', name: 'RSUD Maba', fullName: 'Rumah Sakit Umum Daerah Maba' },
    ];
    
    // Calculate dataset count per producer dynamically
    const producerData = (savedProducers ? JSON.parse(savedProducers) : defaultProducers).map((p: any) => ({
      ...p,
      count: currentDatasets.filter((d: Dataset) => 
        d.publisher.toLowerCase().includes(p.name.toLowerCase()) || 
        d.publisher.toLowerCase().includes(p.fullName?.toLowerCase())
      ).length
    }));
    setProducers(producerData);

    // Load Districts
    const savedDistricts = localStorage.getItem('haltim_districts');
    setDistricts(savedDistricts ? JSON.parse(savedDistricts) : [
      { id: 'kec-01', name: 'Kota Maba' },
      { id: 'kec-02', name: 'Maba' },
      { id: 'kec-03', name: 'Maba Selatan' },
      { id: 'kec-04', name: 'Maba Tengah' },
      { id: 'kec-05', name: 'Maba Utara' },
      { id: 'kec-06', name: 'Wasile' },
      { id: 'kec-07', name: 'Wasile Selatan' },
      { id: 'kec-08', name: 'Wasile Tengah' },
      { id: 'kec-09', name: 'Wasile Timur' },
      { id: 'kec-10', name: 'Wasile Utara' },
    ]);

    // Load Topics
    const savedTopics = localStorage.getItem('haltim_topics');
    if (savedTopics) {
      const parsedTopics = JSON.parse(savedTopics);
      const enriched = parsedTopics.map((t: any) => {
        const source = TOPICS.find(s => s.name === t.name);
        return {
          ...t,
          icon: source?.icon || <Layers className="w-6 h-6" />,
          color: t.color || source?.color || 'bg-blue-100 text-blue-600'
        };
      });
      setTopics(enriched);
    } else {
      setTopics(TOPICS);
    }

    // Load Macro Data
    const savedIpm = localStorage.getItem('haltim_ipm');
    const ipmArray = savedIpm ? JSON.parse(savedIpm) : MOCK_IPM_DATA;
    const sortedData = [...ipmArray].sort((a, b) => String(b.year).localeCompare(String(a.year)));
    setIpmData(sortedData);
    
    if (sortedData.length > 0) {
      setSelectedYear(String(sortedData[0].year));
    }
  }, []);

  const availableYears = useMemo(() => {
    return ipmData.map(d => String(d.year)).slice(0, 5);
  }, [ipmData]);

  const dynamicPriorityIndicators = useMemo(() => {
    const currentYearData = ipmData.find(d => String(d.year) === selectedYear);
    const prevYear = String(parseInt(selectedYear) - 1);
    const prevYearData = ipmData.find(d => String(d.year) === prevYear);

    return PRIORITY_INDICATORS.map(indicator => {
      let value = indicator.value;
      let change = indicator.change;

      if (indicator.label.includes('Pembangunan Manusia')) {
        if (currentYearData?.ipm) {
          value = String(currentYearData.ipm);
          if (prevYearData?.ipm) change = parseFloat(((currentYearData.ipm - prevYearData.ipm) / prevYearData.ipm * 100).toFixed(2));
        }
      } else if (indicator.label.includes('Kemiskinan')) {
        if (currentYearData?.kemiskinan) {
          value = String(currentYearData.kemiskinan);
          if (prevYearData?.kemiskinan) change = parseFloat(((currentYearData.kemiskinan - prevYearData.kemiskinan) / prevYearData.kemiskinan * 100).toFixed(2));
        }
      } else if (indicator.label.includes('Pertumbuhan Ekonomi')) {
        if (currentYearData?.growth) {
          value = String(currentYearData.growth);
          if (prevYearData?.growth) change = parseFloat(((currentYearData.growth - prevYearData.growth) / prevYearData.growth * 100).toFixed(2));
        }
      } else if (indicator.label.includes('Pengangguran')) {
        if (currentYearData?.unemployment) {
          value = String(currentYearData.unemployment);
          if (prevYearData?.unemployment) change = parseFloat(((currentYearData.unemployment - prevYearData.unemployment) / prevYearData.unemployment * 100).toFixed(2));
        }
      }

      return { ...indicator, value, change };
    });
  }, [selectedYear, ipmData]);

  const latestDatasets = useMemo(() => {
    return [...datasets]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 5);
  }, [datasets]);

  const topProducers = useMemo(() => {
    return [...producers].sort((a, b) => b.count - a.count).slice(0, 6);
  }, [producers]);

  const handleDownloadPDF = async (id: string, title: string) => {
    setDownloadingId(id);
    await new Promise(r => setTimeout(r, 1000));
    setDownloadingId(null);
    alert('File PDF sedang diunduh...');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-2" /> Portal Data Terpadu
            </h2>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Dengan data yang akurat, wujudkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Halmahera Timur yang maju dan berdaya saing.</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium">Satu Data Halmahera Timur: fondasi digital untuk pembangunan yang lebih cerdas.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari dataset..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 outline-none shadow-lg font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all">Cari Data</button>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { val: datasets.length, label: 'Dataset' },
              { val: producers.length, label: 'Produsen' },
              { val: districts.length, label: 'Kecamatan' },
              { val: topics.length, label: 'Kategori' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-blue-500 transition-all">
                <p className="text-3xl font-extrabold text-blue-600 group-hover:scale-110 transition-transform">{stat.val}</p>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Indicators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Capaian Prioritas</h2>
            <p className="text-slate-500 font-medium mt-1">Indikator kinerja utama pembangunan daerah.</p>
          </div>
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shadow-inner overflow-x-auto no-scrollbar">
            <div className="flex items-center px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 mr-2 whitespace-nowrap">
              <Calendar className="w-3 h-3 mr-1.5" />
              <span>Pilih Tahun</span>
            </div>
            {availableYears.map(year => (
              <button 
                key={year} 
                onClick={() => setSelectedYear(year)} 
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedYear === year ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicPriorityIndicators.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-blue-400 transition-all group">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">{item.label}</p>
              <div className="flex items-baseline space-x-1.5 mb-4">
                <span className="text-4xl font-black text-slate-900">{item.value}</span>
                <span className="text-slate-400 font-bold text-sm">{item.unit}</span>
              </div>
              <div className={`flex items-center space-x-1.5 font-bold text-xs ${item.change >= 0 ? (item.label.includes('Kemiskinan') || item.label.includes('Pengangguran') ? 'text-red-600' : 'text-green-600') : (item.label.includes('Kemiskinan') || item.label.includes('Pengangguran') ? 'text-green-600' : 'text-red-600')}`}>
                <TrendingUp className={`w-4 h-4 ${item.change < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(item.change)}% dari tahun sebelumnya</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sektoral & Producer Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Data Sektoral</h3>
                <p className="text-slate-500 font-medium">Kategori data utama daerah</p>
              </div>
              <Link to="/datasets" className="text-blue-600 font-bold flex items-center space-x-1 hover:underline">
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {topics.slice(0, 6).map((topic) => (
                <Link key={topic.name} to={`/datasets?topic=${topic.name}`} className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`${topic.color || 'bg-blue-100 text-blue-600'} w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    {topic.icon && React.isValidElement(topic.icon) ? topic.icon : <Layers className="w-5 h-5" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{topic.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{datasets.filter(d => d.topic === topic.name).length} Dataset</p>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 flex items-center">
                {statTab === 'topic' ? <PieChart className="w-5 h-5 mr-3 text-blue-600" /> : <Building2 className="w-5 h-5 mr-3 text-blue-600" />} 
                Sebaran Data
              </h3>
              <div className="flex bg-slate-200/50 p-1 rounded-lg">
                <button onClick={() => setStatTab('topic')} className={`p-1.5 rounded-md transition-all ${statTab === 'topic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                   <Layers className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setStatTab('producer')} className={`p-1.5 rounded-md transition-all ${statTab === 'producer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                   <Building2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 no-scrollbar">
              {statTab === 'topic' ? (
                topics.map((topic) => {
                  const count = datasets.filter(d => d.topic === topic.name).length;
                  const percentage = datasets.length > 0 ? (count / datasets.length) * 100 : 0;
                  return (
                    <div key={topic.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-600 truncate mr-2">{topic.name}</span>
                        <span className="text-blue-600 whitespace-nowrap">{count}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })
              ) : (
                topProducers.map((p) => {
                  const percentage = datasets.length > 0 ? (p.count / datasets.length) * 100 : 0;
                  return (
                    <div key={p.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-600 truncate mr-2">{p.name}</span>
                        <span className="text-blue-600 whitespace-nowrap">{p.count}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="pt-4 border-t border-slate-200">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                 Data per {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Datasets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Dataset Terbaru</h3>
              <p className="text-slate-500 font-medium">Data sektoral yang baru saja diperbarui.</p>
            </div>
            <Link to="/datasets" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-slate-800 transition-all active:scale-95">
              <span>Jelajahi Katalog</span>
              <Database className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {latestDatasets.map((dataset) => (
              <div key={dataset.id} className="py-6 flex flex-col md:flex-row md:items-center justify-between group">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <Link to={`/datasets/${dataset.id}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight line-clamp-1 block">
                      {dataset.title}
                    </Link>
                    <div className="flex items-center mt-1 space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center"><Building2 className="w-3 h-3 mr-1" /> {dataset.publisher}</span>
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {dataset.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 self-end md:self-center">
                  <button 
                    onClick={() => handleDownloadPDF(dataset.id, dataset.title)}
                    disabled={downloadingId === dataset.id}
                    className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                  >
                    {downloadingId === dataset.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                  </button>
                  <Link to={`/datasets/${dataset.id}`} className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
