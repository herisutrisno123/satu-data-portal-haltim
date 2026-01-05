
import React, { useState, useEffect } from 'react';
import { X, Save, ClipboardCheck, Loader2, CheckCircle2, Calendar, BookOpen, Heart, Building2, Home, Shield, Users2 } from 'lucide-react';

interface SpmIndicatorsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const SpmIndicatorsFormModal: React.FC<SpmIndicatorsFormModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    education: '',
    health: '',
    pupr: '',
    housing: '',
    peace: '',
    social: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        year: initialData.year || '',
        education: initialData.education?.toString() || '',
        health: initialData.health?.toString() || '',
        pupr: initialData.pupr?.toString() || '',
        housing: initialData.housing?.toString() || '',
        peace: initialData.peace?.toString() || '',
        social: initialData.social?.toString() || '',
      });
    } else {
      setFormData({ 
        year: new Date().getFullYear().toString(), 
        education: '', 
        health: '',
        pupr: '',
        housing: '',
        peace: '',
        social: '',
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
        education: parseFloat(formData.education),
        health: parseFloat(formData.health),
        pupr: parseFloat(formData.pupr),
        housing: parseFloat(formData.housing),
        peace: parseFloat(formData.peace),
        social: parseFloat(formData.social),
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
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <ClipboardCheck className="w-5 h-5" />
                <h2 className="text-xl font-black">{initialData ? 'Ubah Indikator SPM' : 'Tambah Indikator SPM'}</h2>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Pendidikan */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-purple-500" /> SPM Pendidikan (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
                </div>

                {/* Kesehatan */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" /> SPM Kesehatan (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.health}
                    onChange={(e) => setFormData({...formData, health: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
                </div>

                {/* Pekerjaan Umum */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-orange-500" /> SPM Pekerjaan Umum (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.pupr}
                    onChange={(e) => setFormData({...formData, pupr: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
                </div>

                {/* Perumahan Rakyat */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <Home className="w-4 h-4 mr-2 text-emerald-500" /> SPM Perumahan Rakyat (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.housing}
                    onChange={(e) => setFormData({...formData, housing: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
                </div>

                {/* Trantibumlinmas */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-slate-500" /> SPM Trantibumlinmas (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.peace}
                    onChange={(e) => setFormData({...formData, peace: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
                </div>

                {/* Sosial */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center">
                    <Users2 className="w-4 h-4 mr-2 text-blue-500" /> SPM Sosial (%)
                  </label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.social}
                    onChange={(e) => setFormData({...formData, social: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold"
                  />
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
            <p className="text-slate-500 font-medium">Data capaian SPM tahun {formData.year} telah diperbarui di sistem.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpmIndicatorsFormModal;
