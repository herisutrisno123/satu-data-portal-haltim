
import React, { useState } from 'react';
import { X, Send, User, Building2, Mail, FileText, CheckCircle2, Loader2, Info } from 'lucide-react';

interface DataRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataRequestModal: React.FC<DataRequestModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    dataNeeded: '',
    purpose: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition
    setTimeout(() => {
      setStep('form');
      setFormData({
        name: '',
        email: '',
        institution: '',
        dataNeeded: '',
        purpose: ''
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {step === 'form' ? (
          <>
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">Permohonan Data</h2>
                  <p className="text-slate-500 font-medium text-sm">Lengkapi formulir untuk mengajukan data sektoral</p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Masukkan nama lengkap"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Instansi / Lembaga</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      placeholder="Contoh: Universitas, PT, dsb."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Aktif</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nama@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Deskripsi Data Yang Dibutuhkan</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.dataNeeded}
                  onChange={(e) => setFormData({...formData, dataNeeded: e.target.value})}
                  placeholder="Jelaskan secara spesifik data apa yang Anda cari..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Tujuan Penggunaan Data</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  placeholder="Contoh: Penelitian skripsi, Analisis pasar, dsb."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium resize-none"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  Permohonan Anda akan diproses oleh tim PPID Halmahera Timur dalam 3-5 hari kerja. Kami akan menghubungi Anda melalui email untuk memberikan data atau klarifikasi lebih lanjut.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirim Permohonan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Kirim Permohonan Data</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Permohonan Terkirim!</h2>
              <p className="text-slate-500 font-medium">Terima kasih, {formData.name.split(' ')[0]}. Permohonan Anda telah masuk ke sistem PPID Satu Data Halmahera Timur.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[24px] text-sm text-slate-600 font-medium border border-slate-100 max-w-sm mx-auto">
              Nomor Registrasi Anda:<br/>
              <span className="text-blue-600 font-black text-lg">REQ-HT-{(Math.random()*10000).toFixed(0)}</span>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Salinan permohonan telah dikirim ke email Anda</p>
            <button 
              onClick={handleClose}
              className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Tutup & Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataRequestModal;
