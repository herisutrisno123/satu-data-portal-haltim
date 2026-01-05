
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import { Loader2 } from 'lucide-react';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Priority = lazy(() => import('./pages/Priority'));
const Indicators = lazy(() => import('./pages/DevelopmentIndicators'));
const Datasets = lazy(() => import('./pages/Datasets'));
const DatasetDetail = lazy(() => import('./pages/DatasetDetail'));
const DatasetManagement = lazy(() => import('./pages/DatasetManagement'));
const About = lazy(() => import('./pages/About'));

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center space-y-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
      <p className="text-slate-500 font-bold animate-pulse">Menyiapkan Satu Data...</p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">H</div>
            <h2 className="text-xl font-bold text-slate-900">Satu Data Haltim</h2>
          </div>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Portal data terpadu Kabupaten Halmahera Timur yang menyajikan data akurat, mutakhir, terpadu, dan dapat dipertanggungjawabkan.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Akses Data</h3>
          <ul className="space-y-4 text-sm font-semibold text-slate-600">
            <li><Link to="/datasets" className="hover:text-blue-600">Katalog Dataset</Link></li>
            <li><Link to="/priority" className="hover:text-blue-600">Data & Capaian Prioritas</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Kontak</h3>
          <ul className="space-y-4 text-sm font-semibold text-slate-600">
            <li>Email: data@haltimkab.go.id</li>
            <li>Telp: (0921) 123456</li>
            <li>Alamat: Jl. Trans Halmahera, Maba, Halmahera Timur</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-400 text-xs font-bold uppercase tracking-widest">
        <p>&copy; 2024 Pemerintah Kabupaten Halmahera Timur. All rights Reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-slate-600">Kebijakan Privasi</a>
          <a href="#" className="hover:text-slate-600">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/indicators" element={<Indicators />} />
              <Route path="/priority" element={<Priority />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/datasets/:id" element={<DatasetDetail />} />
              <Route path="/manage-datasets" element={<DatasetManagement />} />
              <Route path="/topics" element={<Datasets />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
