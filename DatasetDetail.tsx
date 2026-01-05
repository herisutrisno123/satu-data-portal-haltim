
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  FileText, 
  Info,
  ExternalLink,
  Share2,
  FileDown,
  Loader2,
  Building2,
  ChevronRight,
  ShieldCheck,
  Mail,
  RefreshCw,
  Clock
} from 'lucide-react';
import { MOCK_DATASETS } from '../constants';
import { Topic } from '../types';

const DatasetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [dataset, setDataset] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedDatasets = localStorage.getItem('haltim_datasets');
    const datasets = savedDatasets ? JSON.parse(savedDatasets) : MOCK_DATASETS;
    const found = datasets.find((d: any) => d.id === id);
    setDataset(found);
    setIsLoading(false);
  }, [id]);

  // Generate dynamic mock data based on the topic for the preview table
  const previewRows = useMemo(() => {
    if (!dataset) return [];
    
    // Jika dataset memiliki variabel hasil isian dari panel pengelola
    if (dataset.variables && dataset.variables.length > 0) {
      return dataset.variables.map((v: any) => ({
        kecamatan: 'Total Kabupaten',
        variable: v.name,
        unit: v.unit || 'Satuan',
        value: v.value
      }));
    }

    const kecamatans = ['Maba', 'Maba Selatan', 'Maba Utara', 'Buli', 'Wasile'];
    let variable = 'Jumlah Penduduk';
    let unit = 'Jiwa';
    let baseValue = 5000;

    switch (dataset.topic) {
      case Topic.AGRICULTURE:
        variable = 'Produksi Kelapa';
        unit = 'Ton';
        baseValue = 1200;
        break;
      case Topic.ECONOMY:
        variable = 'Realisasi Anggaran';
        unit = 'Miliar Rp';
        baseValue = 15;
        break;
      case Topic.HEALTH:
        variable = 'Kapasitas Tempat Tidur';
        unit = 'Unit';
        baseValue = 50;
        break;
      case Topic.EDUCATION:
        variable = 'Jumlah Ruang Kelas';
        unit = 'Ruang';
        baseValue = 120;
        break;
      default:
        variable = 'Data Statistik';
        unit = 'Satuan';
    }

    return kecamatans.map((kec, idx) => ({
      kecamatan: kec,
      variable: variable,
      unit: unit,
      value: (baseValue + (idx * 450) + Math.floor(Math.random() * 100)).toLocaleString('id-ID')
    }));
  }, [dataset]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  if (!dataset) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Dataset tidak ditemukan</h2>
        <Link to="/datasets" className="text-blue-600 hover:underline mt-4 inline-block font-bold"> Kembali ke Katalog </Link>
      </div>
    );
  }

  const handleScrollToMetadata = () => {
    const element = document.getElementById('metadata-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const title = dataset.title;
      const publisher = dataset.publisher;
      const rows = previewRows.map(r => `( ${r.kecamatan}: ${r.value} ${r.unit} ) Tj`).join('\n0 -20 Td ');

      const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj
4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
5 0 obj << /Length 500 >> stream
BT /F1 18 Tf 50 720 Td (DETAIL DATASET HALMAHERA TIMUR) Tj
/F1 14 Tf 0 -40 Td (Judul: ${title}) Tj
/F1 12 Tf 0 -30 Td (Produsen: ${publisher}) Tj
/F1 10 Tf 0 -40 Td (DATA PRATINJAU:) Tj
0 -25 Td ${rows}
/F1 8 Tf 0 -60 Td (Dokumen ini dihasilkan secara otomatis oleh Portal Satu Data Halmahera Timur.) Tj ET
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
850
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const fileName = dataset.title.toLowerCase().replace(/\s+/g, '-');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal membuat PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/datasets" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Katalog Dataset
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full">
                {dataset.topic}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight mb-4">
              {dataset.title}
            </h1>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {dataset.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-slate-100">
               <div className="flex items-center space-x-2 text-slate-500">
                <Calendar className="w-5 h-5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase tracking-tighter">Terakhir Diperbarui</p>
                  <p className="font-bold text-slate-900">{dataset.updatedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <User className="w-5 h-5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase tracking-tighter">Produsen Data</p>
                  <p className="font-bold text-slate-900">{dataset.publisher}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Building2 className="w-5 h-5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase tracking-tighter">Sumber Data</p>
                  <p className="font-bold text-slate-900">{dataset.publisher}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Tag className="w-5 h-5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase tracking-tighter">Format Tersedia</p>
                  <p className="font-bold text-slate-900">PDF Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" /> Pratinjau Data
              </h3>
              <div className="text-xs font-bold text-slate-400 uppercase">Menampilkan cuplikan data</div>
            </div>
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Variabel</th>
                    <th className="px-6 py-4">Satuan</th>
                    <th className="px-6 py-4">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                  {previewRows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{row.variable}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{row.kecamatan}</p>
                      </td>
                      <td className="px-6 py-4">{row.unit}</td>
                      <td className="px-6 py-4 font-black text-blue-600">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Dokumen Data</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-red-900/20 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <FileDown className="w-5 h-5 mr-2 group-hover:bounce" />
                )}
                <span>{isDownloading ? 'Menyiapkan File...' : 'Unduh Dokumen PDF'}</span>
              </button>
              
              <button 
                onClick={handleScrollToMetadata}
                className="w-full bg-blue-50 text-blue-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Detail <ChevronRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
            <p className="mt-6 text-white/50 text-xs text-center font-medium">
              Data ini dilisensikan di bawah Creative Commons Attribution. Dokumen PDF berisi laporan lengkap dan metadata.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <Share2 className="w-4 h-4 mr-2" /> Bagikan
              </h4>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-slate-600 font-bold text-xs transition-all">Salin Tautan</button>
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-slate-600 font-bold text-xs transition-all">WhatsApp</button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100" id="metadata-section">
               <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" /> Metadata Lanjutan
              </h4>
              <ul className="text-xs space-y-3 font-medium text-slate-500">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><Tag className="w-3 h-3 mr-1" /> ID Dataset</span>
                  <span className="text-slate-900">HALTIM-{dataset.id}</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> Tanggal diperbaharui</span>
                  <span className="text-slate-900">{dataset.updatedAt}</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Jam diperbaharui</span>
                  <span className="text-slate-900">09:30 WITA</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><User className="w-3 h-3 mr-1" /> Oleh</span>
                  <span className="text-slate-900">{dataset.publisher}</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><RefreshCw className="w-3 h-3 mr-1" /> Frekuensi Update</span>
                  <span className="text-slate-900">Tahunan</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><Building2 className="w-3 h-3 mr-1" /> Produsen</span>
                  <span className="text-slate-900">{dataset.publisher}</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Kualitas Data</span>
                  <span className="text-emerald-600 font-bold">Terverifikasi</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="flex items-center"><Mail className="w-3 h-3 mr-1" /> Kontak PPID</span>
                  <span className="text-blue-600">ppid@haltimkab.go.id</span>
                </li>
                <li className="flex justify-between">
                  <span className="flex items-center font-bold">Lisensi</span>
                  <span className="text-slate-900 font-bold">Open Data License</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;
