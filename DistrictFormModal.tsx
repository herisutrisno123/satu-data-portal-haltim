
import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Loader2, CheckCircle2, Maximize2, Users2 } from 'lucide-react';

interface DistrictFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const DistrictFormModal: React.FC<DistrictFormModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    population: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        area: initialData.area?.toString() || '',
        population: initialData.population?.toString() || '',
      });
    } else {
      setFormData({ name: '', area: '', population: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        ...formData,
        area: parseFloat(formData.area),
        population: parseInt(formData.population)
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
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-black">{initialData ? 'Ubah Kecamatan' : 'Tambah Kecamatan'}</h2>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> Nama Kecamatan
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Misal: Maba Selatan"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Maximize2 className="w-3 h-3 mr-1" /> Luas (Km²)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Users2 className="w-3 h-3 mr-1" /> Penduduk
                  </label>
                  <input 
                    type="number" 
                    required
                    value={formData.population}
                    onChange={(e) => setFormData({...formData, population: e.target.value})}
                    placeholder="0"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
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
            <p className="text-slate-500 font-medium">Data wilayah kecamatan telah diperbarui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictFormModal;
