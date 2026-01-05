
import React, { useState, useEffect } from 'react';
import { X, Save, BarChart3, Loader2, CheckCircle2, Calendar, TrendingUp, Briefcase, Heart, BookOpen, GraduationCap, Coins } from 'lucide-react';

interface DevIndicatorsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const DevIndicatorsFormModal: React.FC<DevIndicatorsFormModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    ipm: '',
    kemiskinan: '',
    growth: '',
    unemployment: '',
    uhh: '',
    hls: '',
    rls: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        year: initialData.year || '',
        ipm: initialData.ipm?.toString() || '',
        kemiskinan: initialData.kemiskinan?.toString() || '',
        growth: initialData.growth?.toString() || '',
        unemployment: initialData.unemployment?.toString() || '',
        uhh: initialData.uhh?.toString() || '',
        hls: initialData.hls?.toString() || '',
        rls: initialData.rls?.toString() || '',
      });
    } else {
      setFormData({ 
        year: new Date().getFullYear().toString(), 
        ipm: '', 
        kemiskinan: '',
        growth: '',
        unemployment: '',
        uhh: '',
        hls: '',
        rls: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        ...formData,
        ipm: parseFloat(formData.ipm),
        kemiskinan: parseFloat(formData.kemiskinan),
        growth: parseFloat(formData.growth),
        unemployment: parseFloat(formData.unemployment),
        uhh: parseFloat(formData.uhh || '0'),
        hls: parseFloat(formData.hls || '0'),
        rls: parseFloat(formData.rls || '0'),
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setShowSuccess(false), 300);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-black">{initialData ? 'Ubah Indikator Pembangunan' : 'Tambah Indikator Pembangunan'}</h2>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Year Selector */}
              <div className="space-y-1.5 max-w-[200px]">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> Tahun Anggaran
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  placeholder="Misal: 2025"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                />
              </div>

              {/* IPM & Poverty Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] border-b border-blue-50 pb-2">Kesejahteraan Sosial (IPM & Kemiskinan)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center">
                      <GraduationCap className="w-3 h-3 mr-1.5 text-blue-500" /> IPM (Poin)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.ipm}
                      onChange={(e) => setFormData({...formData, ipm: e.target.value})}
                      placeholder="Contoh: 71.25"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1.5 text-red-500" /> Tingkat Kemiskinan (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.kemiskinan}
                      onChange={(e) => setFormData({...formData, kemiskinan: e.target.value})}
                      placeholder="Contoh: 12.42"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                   <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">UHH (Tahun)</label>
                    <input type="number" step="0.01" value={formData.uhh} onChange={(e) => setFormData({...formData, uhh: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" placeholder="68.50" />
                   </div>
                   <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">HLS (Tahun)</label>
                    <input type="number" step="0.01" value={formData.hls} onChange={(e) => setFormData({...formData, hls: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" placeholder="12.10" />
                   </div>
                   <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">RLS (Tahun)</label>
                    <input type="number" step="0.01" value={formData.rls} onChange={(e) => setFormData({...formData, rls: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" placeholder="7.80" />
                   </div>
                </div>
              </div>

              {/* Economic Indicators Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] border-b border-emerald-50 pb-2">Ekonomi & Tenaga Kerja</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center">
                      <Coins className="w-3 h-3 mr-1.5 text-emerald-500" /> Pertumbuhan Ekonomi (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.growth}
                      onChange={(e) => setFormData({...formData, growth: e.target.value})}
                      placeholder="Contoh: 5.68"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center">
                      <Briefcase className="w-3 h-3 mr-1.5 text-indigo-500" /> Pengangguran Terbuka (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.unemployment}
                      onChange={(e) => setFormData({...formData, unemployment: e.target.value})}
                      placeholder="Contoh: 4.15"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex space-x-3">
                <button type="button" onClick={handleClose} className="flex-1 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-colors border border-slate-100">Batal</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>{initialData ? 'Simpan Perubahan' : 'Terbitkan Indikator'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-16 text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Berhasil!</h2>
            <p className="text-slate-500 font-medium">Data indikator pembangunan tahun {formData.year} telah diperbarui di sistem.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevIndicatorsFormModal;
