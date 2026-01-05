
import React, { useState, useEffect } from 'react';
import { X, Save, TrendingUp, Loader2, CheckCircle2, Calendar, BarChart3, Heart, BookOpen, GraduationCap } from 'lucide-react';

interface IpmFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const IpmFormModal: React.FC<IpmFormModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    ipm: '',
    kemiskinan: '',
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
        uhh: initialData.uhh?.toString() || '',
        hls: initialData.hls?.toString() || '',
        rls: initialData.rls?.toString() || '',
      });
    } else {
      setFormData({ 
        year: new Date().getFullYear().toString(), 
        ipm: '', 
        kemiskinan: '',
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
        uhh: parseFloat(formData.uhh),
        hls: parseFloat(formData.hls),
        rls: parseFloat(formData.rls),
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
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-black">{initialData ? 'Ubah Indikator IPM' : 'Tambah Indikator IPM'}</h2>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> Tahun Anggaran
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    placeholder="Misal: 2024"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <BarChart3 className="w-3 h-3 mr-1" /> Nilai IPM Akhir
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.ipm}
                    onChange={(e) => setFormData({...formData, ipm: e.target.value})}
                    placeholder="Contoh: 71.25"
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl focus:border-blue-500 outline-none font-black text-blue-600 shadow-inner"
                  />
                </div>
              </div>

              {/* Komponen IPM */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-[0.2em] mb-4">Komponen Penyusun IPM</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-red-500" /> UHH (Tahun)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.uhh}
                      onChange={(e) => setFormData({...formData, uhh: e.target.value})}
                      placeholder="68.20"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      <BookOpen className="w-3 h-3 mr-1 text-emerald-500" /> HLS (Tahun)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.hls}
                      onChange={(e) => setFormData({...formData, hls: e.target.value})}
                      placeholder="12.40"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      <GraduationCap className="w-3 h-3 mr-1 text-indigo-500" /> RLS (Tahun)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.rls}
                      onChange={(e) => setFormData({...formData, rls: e.target.value})}
                      placeholder="7.90"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Indikator Lainnya */}
              <div className="pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> Tingkat Kemiskinan (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.kemiskinan}
                    onChange={(e) => setFormData({...formData, kemiskinan: e.target.value})}
                    placeholder="Contoh: 12.42"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={handleClose} className="flex-1 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-colors">Batal</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>{initialData ? 'Simpan' : 'Tambah'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Berhasil!</h2>
            <p className="text-slate-500 font-medium text-sm">Data indikator IPM beserta komponennya telah diperbarui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IpmFormModal;
