
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Image as ImageIcon,
  Share2,
  Calendar,
  Loader2
} from 'lucide-react';

const INFOGRAPHICS = [
  {
    id: 1,
    title: 'Capaian IPM Halmahera Timur 2023',
    category: 'Sosial',
    thumbnail: 'https://picsum.photos/id/10/800/600',
    date: 'Januari 2024',
    description: 'Ringkasan capaian Indeks Pembangunan Manusia per kecamatan di Halmahera Timur.'
  },
  {
    id: 2,
    title: 'Statistik Produksi Pertanian 2022',
    category: 'Ekonomi',
    thumbnail: 'https://picsum.photos/id/20/800/600',
    date: 'Desember 2023',
    description: 'Visualisasi komoditas unggulan pertanian dan perkebunan Halmahera Timur.'
  },
  {
    id: 3,
    title: 'Sebaran Fasilitas Kesehatan 2024',
    category: 'Kesehatan',
    thumbnail: 'https://picsum.photos/id/30/800/600',
    date: 'Maret 2024',
    description: 'Peta sebaran RSUD dan Puskesmas di seluruh wilayah Kabupaten.'
  },
  {
    id: 4,
    title: 'Profil Kependudukan Haltim 2023',
    category: 'Kependudukan',
    thumbnail: 'https://picsum.photos/id/40/800/600',
    date: 'Februari 2024',
    description: 'Infografis struktur penduduk menurut kelompok umur dan jenis kelamin.'
  },
  {
    id: 5,
    title: 'Target vs Realisasi PAD 2023',
    category: 'Keuangan',
    thumbnail: 'https://picsum.photos/id/50/800/600',
    date: 'Januari 2024',
    description: 'Visualisasi realisasi Pendapatan Asli Daerah Kabupaten Halmahera Timur.'
  },
  {
    id: 6,
    title: 'Potensi Wisata Bahari Buli',
    category: 'Pariwisata',
    thumbnail: 'https://picsum.photos/id/60/800/600',
    date: 'Mei 2024',
    description: 'Ringkasan potensi dan statistik kunjungan wisatawan di area teluk Buli.'
  }
];

const Infographics: React.FC = () => {
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const filteredInfographics = INFOGRAPHICS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = async (id: number) => {
    setDownloadingId(id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloadingId(null);
    alert('Infografis berhasil diunduh dalam kualitas tinggi.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Galeri Infografis</h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            Visualisasi data pembangunan dan statistik sektoral Kabupaten Halmahera Timur yang dikemas secara informatif dan mudah dipahami.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari infografis..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInfographics.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                <button className="p-3 bg-white rounded-2xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <Eye className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleDownload(item.id)}
                  className="p-3 bg-white rounded-2xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-3">
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Calendar className="w-3 h-3 mr-1" />
                Diterbitkan {item.date}
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium line-clamp-2">
                {item.description}
              </p>
              
              <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                <button 
                  onClick={() => handleDownload(item.id)}
                  disabled={downloadingId === item.id}
                  className="flex items-center text-blue-600 font-bold text-sm hover:underline disabled:opacity-50"
                >
                  {downloadingId === item.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  {downloadingId === item.id ? 'Mengunduh...' : 'Unduh Gambar'}
                </button>
                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInfographics.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
          <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Infografis tidak ditemukan</h3>
          <p className="text-slate-500 mt-2">Coba gunakan kata kunci pencarian yang berbeda.</p>
        </div>
      )}
    </div>
  );
};

export default Infographics;
