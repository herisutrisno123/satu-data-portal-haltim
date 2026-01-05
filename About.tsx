
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Scale, FileText, CheckCircle2, Building2, Globe, Database, ArrowRight, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const [regulations, setRegulations] = useState<any[]>([]);

  useEffect(() => {
    const savedRegs = localStorage.getItem('haltim_regulations');
    if (savedRegs) {
      setRegulations(JSON.parse(savedRegs));
    } else {
      setRegulations([
        { id: 'REG-01', title: 'Perda Penyelenggaraan Statistik Sektoral', number: '1', year: '2023', type: 'Perda', about: 'Penyelenggaraan statistik sektoral daerah Kabupaten Halmahera Timur sebagai landasan utama tata kelola data daerah.' },
        { id: 'REG-02', title: 'Perbup Walidata & Produsen Data', number: '45', year: '2022', type: 'Perbup', about: 'Tata kelola peran walidata dan produsen data dalam ekosistem Satu Data untuk memastikan akurasi dan interoperabilitas data.' }
      ]);
    }
  }, []);

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Globe className="w-full h-full transform translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest">Tentang Inisiatif Kami</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Membangun Halmahera Timur <br /> <span className="text-blue-400">Berbasis Data Akurat</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            Satu Data Halmahera Timur adalah portal integrasi data resmi yang bertujuan menciptakan satu standar data, metadata, dan portal tunggal untuk pembangunan daerah yang transparan.
          </p>
        </div>
      </section>

      {/* Core Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Database className="w-6 h-6" />, title: "Standarisasi Data", desc: "Menerapkan standar metadata dan interoperabilitas antar instansi pemerintah." },
          { icon: <Globe className="w-6 h-6" />, title: "Keterbukaan Publik", desc: "Menjamin hak masyarakat untuk mengakses data pembangunan secara bebas dan mudah." },
          { icon: <CheckCircle2 className="w-6 h-6" />, title: "Verifikasi Berjenjang", desc: "Proses verifikasi data oleh walidata untuk menjamin akurasi dan integritas data." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Regulation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[56px] p-8 md:p-16 border border-slate-200 shadow-inner">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
                <Scale className="w-4 h-4" />
                <span>Landasan Hukum</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Regulasi Tata Kelola Data</h2>
              <p className="text-slate-500 font-medium mt-3 max-w-2xl">
                Implementasi Satu Data di Halmahera Timur didasarkan pada payung hukum yang kuat untuk menjamin keberlangsungan dan kepastian hukum pengelolaan statistik sektoral.
              </p>
            </div>
            <a 
              href="https://jdih.haltimkab.go.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-blue-600 font-bold hover:underline"
            >
              <span>JDIH Haltim</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regulations.map((reg, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 group hover:border-blue-400 transition-all">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg group-hover:bg-blue-600 transition-all">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${reg.type === 'Perda' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                      {reg.type}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahun {reg.year}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {reg.title} Nomor {reg.number}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {reg.about}
                  </p>
                  <div className="pt-4">
                    <button className="flex items-center space-x-2 text-blue-600 text-xs font-black uppercase tracking-widest hover:text-blue-700">
                      <FileText className="w-4 h-4" />
                      <span>Unduh Dokumen Lengkap</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-blue-600 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
            <div className="flex items-center space-x-6 text-center md:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Wali Data Daerah</h4>
                <p className="text-blue-100 text-sm font-medium">Dinas Komunikasi, Informatika, Persandian dan Statistik</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg shadow-blue-800/20 active:scale-95">
              Hubungi Sekretariat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
