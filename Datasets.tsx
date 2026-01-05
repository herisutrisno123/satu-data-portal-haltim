
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Database, 
  ChevronRight, 
  FileText, 
  Layout, 
  Grid, 
  List, 
  Calendar,
  X,
  RotateCcw,
  FileDown,
  Loader2,
  Building2,
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react';
import { MOCK_DATASETS, TOPICS } from '../constants';
import { Topic } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import DataRequestModal from '../components/DataRequestModal';

const Datasets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'Semua'>('Semua');
  const [selectedYear, setSelectedYear] = useState<string | 'Semua'>('Semua');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    // Load from localStorage to reflect admin changes
    const savedDatasets = localStorage.getItem('haltim_datasets');
    setDatasets(savedDatasets ? JSON.parse(savedDatasets) : MOCK_DATASETS);

    const topicParam = searchParams.get('topic');
    if (topicParam) {
      const validTopics = Object.values(Topic) as string[];
      if (validTopics.includes(topicParam)) {
        setSelectedTopic(topicParam as Topic);
      }
    }
  }, [searchParams]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedTopic !== 'Semua') count++;
    if (selectedYear !== 'Semua') count++;
    if (search.trim() !== '') count++;
    return count;
  }, [selectedTopic, selectedYear, search]);

  const availableYears = useMemo(() => {
    const year = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => String(year - i));
  }, []);

  const filteredDatasets = datasets.filter(d => {
    const matchesTopic = selectedTopic === 'Semua' || d.topic === selectedTopic;
    const matchesYear = selectedYear === 'Semua' || d.updatedAt.startsWith(selectedYear);
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                         d.publisher.toLowerCase().includes(search.toLowerCase());
    
    return matchesTopic && matchesYear && matchesSearch;
  });

  const handleTopicChange = (topic: Topic | 'Semua') => {
    setSelectedTopic(topic);
    if (topic === 'Semua') {
      searchParams.delete('topic');
    } else {
      searchParams.set('topic', topic);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedTopic('Semua');
    setSelectedYear('Semua');
    setSearch('');
    setSearchParams({});
  };

  const handleDownloadPDF = async (id: string, title: string) => {
    setDownloadingId(id);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj
4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
5 0 obj << /Length 120 >> stream
BT /F1 18 Tf 50 720 Td (KATALOG DATASET HALTIM) Tj
/F1 12 Tf 0 -30 Td (Judul: ${title}) Tj
/F1 10 Tf 0 -20 Td (Satu Data Kabupaten Halmahera Timur) Tj ET
endstream endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000212 00000 n 
0000000294 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
450
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingId(null);
    }
  };

  const FilterContent = ({ isMobile = false }) => (
    <div className={`space-y-8 ${isMobile ? 'pb-24' : ''}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900 flex items-center text-sm">
            <Layers className="w-4 h-4 mr-2 text-blue-600" /> Kategori Sektoral
          </h4>
          {isMobile && selectedTopic !== 'Semua' && (
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">Terpilih</span>
          )}
        </div>
        <div className={`flex flex-wrap lg:flex-col gap-2.5 lg:gap-1.5`}>
          <button
            onClick={() => handleTopicChange('Semua')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedTopic === 'Semua' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
            } ${isMobile ? 'flex-shrink-0' : 'w-full text-left'}`}
          >
            Semua Kategori
          </button>
          {TOPICS.map((topic) => (
            <button
              key={topic.name}
              onClick={() => handleTopicChange(topic.name as Topic)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                selectedTopic === topic.name 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
              } ${isMobile ? 'flex-shrink-0' : 'w-full text-left'}`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-4 flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Tahun Laporan (5 Thn Terakhir)
        </h4>
        <div className="flex flex-wrap lg:flex-col gap-2.5 lg:gap-1.5">
          <button
            onClick={() => setSelectedYear('Semua')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedYear === 'Semua' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            } ${isMobile ? 'flex-shrink-0' : 'w-full text-left'}`}
          >
            Semua Tahun
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                selectedYear === year 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              } ${isMobile ? 'flex-shrink-0' : 'w-full text-left'}`}
            >
              Tahun {year}
            </button>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-[32px] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-black text-lg mb-2 leading-tight">Butuh Data Lainnya?</h4>
            <p className="text-blue-100 text-xs leading-relaxed mb-6 font-medium">
              Jika data sektoral yang Anda cari belum tersedia di katalog publik kami, silakan ajukan permohonan melalui layanan PPID.
            </p>
            <button 
              onClick={() => setIsRequestModalOpen(true)}
              className="w-full bg-white text-blue-600 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95"
            >
              Ajukan Permohonan
            </button>
          </div>
          <Database className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-1">
            <Database className="w-4 h-4" />
            <span>Open Data Halmahera Timur</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Katalog Dataset</h1>
          <p className="text-slate-500 font-medium">Akses informasi sektoral terpercaya untuk mendukung riset dan inovasi.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden relative flex items-center space-x-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-bold text-slate-700 shadow-sm hover:border-blue-300 transition-all active:scale-95"
          >
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-50 animate-in zoom-in duration-300">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Sidebar Section */}
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
          <div className="sticky top-28">
            <FilterContent />
          </div>
        </aside>

        {/* Mobile Filter Sheet */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[40px] shadow-2xl animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[92vh]">
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              </div>
              <div className="px-8 pt-2 pb-6 flex justify-between items-center border-b border-slate-50">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Filter Data</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sesuaikan tampilan dataset</p>
                </div>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-8 py-8 overflow-y-auto">
                <FilterContent isMobile={true} />
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 sticky bottom-0 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 py-4 border-2 border-slate-100 rounded-[24px] font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-[24px] shadow-xl shadow-blue-200 active:scale-95"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Cari kata kunci, judul, atau produsen data..."
              className="w-full pl-14 pr-6 py-5 rounded-[28px] border-2 border-slate-100 bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50/50 transition-all outline-none font-medium shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-black text-slate-900 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                {filteredDatasets.length} Dataset
              </span>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={resetFilters}
                  className="hidden sm:flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Bersihkan Filter
                </button>
              )}
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/60 border-b border-slate-100 backdrop-blur-sm">
                      <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Identitas Dataset</th>
                      <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Sektoral</th>
                      <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Pembaruan</th>
                      <th className="px-6 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDatasets.map((dataset) => (
                      <tr key={dataset.id} className="hover:bg-blue-50/40 transition-all group cursor-pointer">
                        <td className="px-6 py-5">
                          <div className="max-w-md">
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                              {dataset.title}
                            </h3>
                            <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              <Building2 className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> {dataset.publisher}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                            {dataset.topic}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center text-slate-500 text-xs font-bold">
                            <Calendar className="w-4 h-4 mr-2 text-slate-300" />
                            {dataset.updatedAt}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end items-center space-x-3 opacity-40 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownloadPDF(dataset.id, dataset.title);
                              }}
                              disabled={downloadingId === dataset.id}
                              className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all disabled:opacity-50"
                              title="Download PDF"
                            >
                              {downloadingId === dataset.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <FileDown className="w-5 h-5" />
                              )}
                            </button>
                            <Link 
                              to={`/datasets/${dataset.id}`}
                              className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
              {filteredDatasets.map((dataset) => (
                <div key={dataset.id} className="bg-white p-8 rounded-[40px] border border-slate-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100/50 transition-all group flex flex-col shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Database className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Kategori</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase">
                        {dataset.topic}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-3 flex-1">
                    {dataset.title}
                  </h3>
                  <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">
                     <Building2 className="w-3.5 h-3.5 mr-2 text-slate-300" /> {dataset.publisher}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => handleDownloadPDF(dataset.id, dataset.title)}
                      disabled={downloadingId === dataset.id}
                      className="text-red-600 font-black text-xs uppercase tracking-widest flex items-center hover:opacity-70 disabled:opacity-50 transition-all"
                    >
                      {downloadingId === dataset.id ? (
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4 mr-2" />
                      )}
                      PDF
                    </button>
                    <Link 
                      to={`/datasets/${dataset.id}`}
                      className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center"
                    >
                      Detail <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DataRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </div>
  );
};

export default Datasets;
