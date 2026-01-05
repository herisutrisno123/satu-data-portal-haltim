
import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Loader2, CheckCircle2, Palette, Type, FileText } from 'lucide-react';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-100 text-blue-600',
  });

  const colors = [
    { label: 'Blue', value: 'bg-blue-100 text-blue-600' },
    { label: 'Red', value: 'bg-red-100 text-red-600' },
    { label: 'Green', value: 'bg-green-100 text-green-600' },
    { label: 'Purple', value: 'bg-purple-100 text-purple-600' },
    { label: 'Orange', value: 'bg-orange-100 text-orange-600' },
    { label: 'Cyan', value: 'bg-cyan-100 text-cyan-600' },
    { label: 'Emerald', value: 'bg-emerald-100 text-emerald-600' },
    { label: 'Slate', value: 'bg-slate-100 text-slate-600' },
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        color: initialData.color || 'bg-blue-100 text-blue-600',
      });
    } else {
      setFormData({ name: '', description: '', color: 'bg-blue-100 text-blue-600' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSave(formData);
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
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                   <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">{initialData ? 'Ubah Kategori' : 'Tambah Kategori'}</h2>
                  <p className="text-slate-400 text-xs font-medium">Atur klasifikasi data untuk memudahkan pencarian.</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                  <Type className="w-3 h-3 mr-2 text-blue-500" /> Nama Kategori
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Misal: Lingkungan Hidup"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                  <FileText className="w-3 h-3 mr-2 text-blue-500" /> Keterangan Kategori
                </label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Berikan penjelasan singkat mengenai cakupan kategori ini..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-medium text-slate-700 shadow-inner resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                  <Palette className="w-3 h-3 mr-2 text-blue-500" /> Skema Warna Visual
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setFormData({...formData, color: c.value})}
                      className={`h-12 rounded-2xl transition-all ${c.value} border-2 ${formData.color === c.value ? 'border-slate-900 scale-105 shadow-md' : 'border-transparent hover:scale-105'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={handleClose} className="flex-1 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-all">Batal</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>{initialData ? 'Simpan Perubahan' : 'Terbitkan Kategori'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-16 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Berhasil!</h2>
            <p className="text-slate-500 font-medium">Data kategori klasifikasi telah diperbarui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFormModal;
