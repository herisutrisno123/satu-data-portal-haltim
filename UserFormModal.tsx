
import React, { useState, useEffect } from 'react';
import { X, Save, User, Loader2, CheckCircle2, Mail, Shield, Building2, Lock, Eye, EyeOff } from 'lucide-react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
  producers: any[];
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, initialData, onSave, producers }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    institution: '',
    password: ''
  });

  const roles = [
    'Administrator',
    'Walidata (Diskominfo)',
    'Produsen Data (OPD)',
    'Viewer Internal'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || '',
        institution: initialData.institution || '',
        password: '••••••••'
      });
    } else {
      setFormData({ 
        name: '', 
        email: '', 
        role: '',
        institution: '', 
        password: '' 
      });
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
      <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black leading-tight">{initialData ? 'Ubah Profil Operator' : 'Daftarkan Pengguna'}</h2>
                  <p className="text-slate-400 text-xs font-medium">Lengkapi data untuk pengaturan hak akses sistem.</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                   Nama Lengkap Operator
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Masukkan nama lengkap sesuai identitas"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                    Email Dinas
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nama@haltimkab.go.id"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                    <Shield className="w-3 h-3 mr-1.5 text-blue-500" /> Peran (Role)
                  </label>
                  <select 
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                  >
                    <option value="">-- Pilih Peran --</option>
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                  Instansi / OPD Terkait
                </label>
                <select 
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner"
                >
                  <option value="">-- Pilih Instansi --</option>
                  {producers.map(p => (
                    <option key={p.name} value={p.name}>{p.fullName || p.name}</option>
                  ))}
                  <option value="Lainnya">Instansi Eksternal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center ml-1">
                  Kata Sandi Akses
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required={!initialData}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder={initialData ? "Kosongkan jika tidak diubah" : "Buat kata sandi minimal 8 karakter"}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 shadow-inner pr-12"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
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
                  <span>{initialData ? 'Perbarui Data' : 'Terbitkan Akun'}</span>
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
            <p className="text-slate-500 font-medium">Konfigurasi akun pengguna telah disimpan dan siap digunakan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFormModal;
