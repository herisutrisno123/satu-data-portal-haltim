
import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, Github, Globe, Info } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email.split('@')[0] || 'Admin Data');
      onClose();
    }, 1500);
  };

  const useDemoCredentials = () => {
    setEmail('admin@admin.com');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Selamat Datang</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">Masuk untuk mengelola data sektoral</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Akun Demo</span>
            </div>
            <div className="text-xs text-blue-600 font-medium">
              <p>Email: <span className="font-bold select-all">admin@admin.com</span></p>
              <p>Password: <span className="font-bold select-all">admin123</span></p>
            </div>
            <button 
              type="button"
              onClick={useDemoCredentials}
              className="mt-1 text-[10px] font-black text-blue-600 hover:text-blue-800 underline uppercase tracking-tighter text-left"
            >
              Gunakan Akun Demo Otomatis
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@haltimkab.go.id"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Lupa kata sandi?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk Sekarang</span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold">
              <span className="bg-white px-4 text-slate-400">Atau masuk dengan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-600">
              <Globe className="w-4 h-4" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-600">
              <Github className="w-4 h-4" />
              <span>Dinas ID</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-6 text-center">
          <p className="text-xs font-medium text-slate-500">
            Belum punya akun? <a href="#" className="text-blue-600 font-bold hover:underline">Daftar sebagai Produsen Data</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
