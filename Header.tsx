
import React, { useState } from 'react';
import { Menu, X, Database, Info, Home, FileText, User, LogOut, ChevronDown, LayoutGrid, BarChart3 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Data Prioritas', path: '/priority', icon: <FileText className="w-4 h-4" /> },
    { name: 'Dataset', path: '/datasets', icon: <Database className="w-4 h-4" /> },
    { name: 'Tentang', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                  H
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">Satu Data</h1>
                  <p className="text-xs text-slate-500 font-medium">Kab. Halmahera Timur</p>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 text-sm font-semibold transition-colors ${
                    isActive(link.path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  to="/manage-datasets"
                  className={`flex items-center space-x-1.5 text-sm font-bold px-4 py-2 bg-blue-50 rounded-xl transition-all ${
                    isActive('/manage-datasets') ? 'text-blue-700 bg-blue-100 shadow-inner' : 'text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Kelola Data</span>
                </Link>
              )}
              
              {isLoggedIn ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all font-bold text-sm text-slate-700"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span>{userName}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                      <Link to="/manage-datasets" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center space-x-2">
                        <LayoutGrid className="w-4 h-4" />
                        <span>Panel Admin</span>
                      </Link>
                      <Link to="/manage-datasets?menu=profile" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profil Saya</span>
                      </Link>
                      <div className="border-t border-slate-50 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95"
                >
                  Masuk
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-xl text-base font-semibold ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                to="/manage-datasets"
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-xl text-base font-bold ${
                  isActive('/manage-datasets') ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                <span>Kelola Data Sektoral</span>
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                 <div className="flex items-center space-x-3 p-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 leading-none">{userName}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Pengelola Data</p>
                  </div>
                </div>
                <Link 
                  to="/manage-datasets?menu=profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl text-base font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <User className="w-5 h-5" />
                  <span>Profil Saya</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl text-base font-semibold text-red-600 bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-blue-100"
              >
                Masuk Ke Sistem
              </button>
            )}
          </div>
        )}
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;
