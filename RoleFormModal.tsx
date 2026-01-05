
import React, { useState, useEffect } from 'react';
import { X, Save, ShieldCheck, Loader2, CheckCircle2, Shield, Info, Check } from 'lucide-react';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
  systemMenus: string[];
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({ isOpen, onClose, initialData, onSave, systemMenus }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    permissions: [] as string[]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        description: initialData.description || '',
        permissions: initialData.permissions || []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const togglePermission = (menu: string) => {
    setFormData(prev => {
      const isExist = prev.permissions.includes(menu);
      if (isExist) {
        return { ...prev, permissions: prev.permissions.filter(p => p !== menu) };
      } else {
        return { ...prev, permissions: [...prev.permissions, menu] };
      }
    });
  };

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
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Konfigurasi Peran</h2>
                  <p className="text-indigo-100 text-xs font-medium">Atur deskripsi dan otoritas menu untuk peran ini.</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Peran</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none font-bold text-slate-900 shadow-inner"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Peran</label>
                  <input 
                    type="text" 
                    disabled
                    value={formData.id}
                    className="w-full px-5 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Otoritas</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Jelaskan cakupan wewenang peran ini..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none font-medium text-slate-700 shadow-inner resize-none"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-indigo-600" /> Hak Akses Menu Sistem
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{formData.permissions.length} Menu Diaktifkan</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {systemMenus.map((menu) => {
                    const isActive = formData.permissions.includes(menu);
                    return (
                      <button
                        key={menu}
                        type="button"
                        onClick={() => togglePermission(menu)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          isActive 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold">{menu}</span>
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-slate-100 text-transparent'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start space-x-3">
                <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  Perubahan pada hak akses menu akan langsung berdampak pada visibilitas dashboard bagi seluruh pengguna dengan peran ini. Pastikan konfigurasi sudah sesuai dengan tupoksi.
                </p>
              </div>

              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={handleClose} className="flex-1 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-all">Batalkan</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>Simpan Konfigurasi</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-16 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Peran Diperbarui!</h2>
            <p className="text-slate-500 font-medium">Hak akses dan deskripsi peran telah berhasil disimpan ke sistem.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleFormModal;
