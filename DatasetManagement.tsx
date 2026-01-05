
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  LayoutDashboard, 
  Database, 
  FileText,
  Layers,
  ChevronRight,
  Building2,
  MapPin,
  Users2,
  BarChart3,
  Shield,
  Info,
  CheckCircle2,
  AlertTriangle,
  Palette,
  User,
  ChevronDown,
  LogOut,
  Loader2,
  Mail,
  ShieldCheck,
  Lock,
  Camera,
  Save,
  Clock,
  Settings2,
  Check,
  ShieldAlert,
  X,
  ClipboardCheck,
  Scale,
  Download
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_DATASETS, TOPICS, MOCK_IPM_DATA, MOCK_ECONOMIC_DATA } from '../constants';
import { Dataset, Topic } from '../types';
import DatasetFormModal from '../components/DatasetFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import UserFormModal from '../components/UserFormModal';
import CategoryFormModal from '../components/CategoryFormModal';
import MasterNameFormModal from '../components/MasterNameFormModal';
import ProducerFormModal from '../components/ProducerFormModal';
import DistrictFormModal from '../components/DistrictFormModal';
import DevIndicatorsFormModal from '../components/DevIndicatorsFormModal';
import RoleFormModal from '../components/RoleFormModal';
import SpmIndicatorsFormModal from '../components/SpmIndicatorsFormModal';
import RegulationFormModal from '../components/RegulationFormModal';

const DatasetManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeMenu, setActiveMenu] = useState<'topics' | 'datasets' | 'names' | 'producers' | 'districts' | 'dev-indicators' | 'spm-indicators' | 'regulations' | 'users' | 'profile'>('datasets');
  const [activeUserTab, setActiveUserTab] = useState<'list' | 'roles'>('list');
  const [isDatasetMenuExpanded, setIsDatasetMenuExpanded] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isNameFormOpen, setIsNameFormOpen] = useState(false);
  const [isProducerFormOpen, setIsProducerFormOpen] = useState(false);
  const [isDistrictFormOpen, setIsDistrictFormOpen] = useState(false);
  const [isDevIndicatorsOpen, setIsDevIndicatorsOpen] = useState(false);
  const [isSpmIndicatorsOpen, setIsSpmIndicatorsOpen] = useState(false);
  const [isRegulationFormOpen, setIsRegulationFormOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [myDatasets, setMyDatasets] = useState<Dataset[]>([]);
  const [myUsers, setMyUsers] = useState<any[]>([]);
  const [myTopics, setMyTopics] = useState<any[]>([]);
  const [masterNames, setMasterNames] = useState<any[]>([]);
  const [myProducers, setMyProducers] = useState<any[]>([]);
  const [myDistricts, setMyDistricts] = useState<any[]>([]);
  const [myIpm, setMyIpm] = useState<any[]>([]);
  const [mySpm, setMySpm] = useState<any[]>([]);
  const [myRegulations, setMyRegulations] = useState<any[]>([]);

  // Roles & Permissions State
  const [myRoles, setMyRoles] = useState<any[]>([
    { id: 'R-01', name: 'Administrator', description: 'Akses penuh ke seluruh sistem dan manajemen pengguna.', permissions: ['Produsen Data', 'Kecamatan', 'Kategori', 'Dataset', 'Indikator Makro', 'Indikator SPM', 'Regulasi Data', 'Manajemen Pengguna', 'Profil Saya'] },
    { id: 'R-02', name: 'Walidata', description: 'Verifikator data sektoral dan pengelola kategori.', permissions: ['Kategori', 'Dataset', 'Indikator Makro', 'Indikator SPM', 'Regulasi Data', 'Profil Saya'] },
    { id: 'R-03', name: 'Produsen Data', description: 'Entri data sektoral sesuai tupoksi instansi.', permissions: ['Dataset', 'Profil Saya'] },
  ]);

  const SYSTEM_MENUS = ['Produsen Data', 'Kecamatan', 'Kategori', 'Dataset', 'Indikator Makro', 'Indikator SPM', 'Regulasi Data', 'Manajemen Pengguna', 'Profil Saya'];

  // Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Aris Munandar',
    email: 'aris@haltimkab.go.id',
    role: 'Administrator',
    institution: 'Dinas Komunikasi dan Informatika',
    lastLogin: 'Hari ini, 09:30 WITA'
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu && ['topics', 'datasets', 'names', 'producers', 'districts', 'dev-indicators', 'spm-indicators', 'regulations', 'users', 'profile'].includes(menu)) {
      setActiveMenu(menu as any);
    }

    const savedDatasets = localStorage.getItem('haltim_datasets');
    const savedUsers = localStorage.getItem('haltim_users');
    const savedTopics = localStorage.getItem('haltim_topics');
    const savedNames = localStorage.getItem('haltim_names');
    const savedProducers = localStorage.getItem('haltim_producers');
    const savedDistricts = localStorage.getItem('haltim_districts');
    const savedIpm = localStorage.getItem('haltim_ipm');
    const savedSpm = localStorage.getItem('haltim_spm');
    const savedRegulations = localStorage.getItem('haltim_regulations');
    const savedRoles = localStorage.getItem('haltim_roles');

    setMyDatasets(savedDatasets ? JSON.parse(savedDatasets) : MOCK_DATASETS);
    setMyUsers(savedUsers ? JSON.parse(savedUsers) : [
      { id: 'U-001', name: 'Aris Munandar', email: 'aris@haltimkab.go.id', role: 'Administrator', institution: 'Diskominfo', status: 'Aktif' },
      { id: 'U-002', name: 'Nur Laila', email: 'laila@haltimkab.go.id', role: 'Walidata', institution: 'Diskominfo', status: 'Aktif' },
      { id: 'U-003', name: 'Herman S.', email: 'herman@haltimkab.go.id', role: 'Produsen Data', institution: 'Dinas Kesehatan', status: 'Aktif' },
    ]);
    
    if (savedTopics) {
      setMyTopics(JSON.parse(savedTopics).map((t: any) => ({
        ...t,
        icon: TOPICS.find(source => source.name === t.name)?.icon || <Layers className="w-6 h-6" />
      })));
    } else {
      setMyTopics(TOPICS.map(t => ({
        ...t,
        description: `Kategori data sektoral yang mencakup statistik terkait ${t.name.toLowerCase()}.`
      })));
    }

    setMasterNames(savedNames ? JSON.parse(savedNames) : [
      { name: 'Jumlah Penduduk Menurut Kecamatan', category: Topic.DEMOGRAPHICS, description: 'Master kependudukan tahunan', variables: [{ name: 'Laki-laki', value: 'Jiwa', type: 'number' }, { name: 'Perempuan', value: 'Jiwa', type: 'number' }] },
    ]);

    setMyProducers(savedProducers ? JSON.parse(savedProducers) : [
      { id: 'P-001', name: 'Bappeda', fullName: 'Badan Perencanaan Pembangunan, Penelitian dan Pengembangan Daerah', head: 'Drs. Ramlan Pua Daud', description: 'Pengelola perencanaan pembangunan, data makro, and indikator strategis daerah.', address: 'Jl. Trans Halmahera, Maba', count: 124 },
      { id: 'P-002', name: 'Diskominfo', fullName: 'Dinas Komunikasi, Informatika, Persandian dan Statistik', head: 'Aris Munandar, ST', description: 'Wali data daerah and pengelola infrastruktur digital serta statistik sektoral.', address: 'Kantor Bupati Haltim, Maba', count: 42 },
      { id: 'P-003', name: 'Dinas Kesehatan', fullName: 'Dinas Kesehatan Kabupaten Halmahera Timur', head: 'dr. Vitara S.', description: 'Penyedia data kesehatan masyarakat, fasilitas medis, and angka harapan hidup.', address: 'Jl. Utama Maba', count: 85 },
      { id: 'P-004', name: 'Dinas Pendidikan', fullName: 'Dinas Pendidikan, Kepemudaan dan Olahraga', head: 'Jamal Esau, S.Pd', description: 'Penyedia data pendidikan dasar, sarana prasarana sekolah, and kepemudaan.', address: 'Jl. Trans Maba', count: 96 },
      { id: 'P-005', name: 'Dinas Sosial', fullName: 'Dinas Sosial, Pemberdayaan Perempuan dan Perlindungan Anak', head: 'Irmawati Ali, SE', description: 'Pengelola data kesejahteraan sosial, bantuan sosial, and perlindungan anak.', address: 'Jl. Trans Maba', count: 64 },
      { id: 'P-006', name: 'Disdukcapil', fullName: 'Dinas Kependudukan dan Pencatatan Sipil', head: 'Hj. Mardia, SH', description: 'Sumber utama data kependudukan dan catatan sipil Kabupaten Halmahera Timur.', address: 'Jl. Trans Maba', count: 110 },
      { id: 'P-007', name: 'Dinas PMD', fullName: 'Dinas Pemberdayaan Masyarakat dan Desa', head: 'M. Ali Jalam, S.STP', description: 'Penyedia data profil desa, bumdes, and indeks desa membangun.', address: 'Jl. Utama Maba', count: 58 },
      { id: 'P-008', name: 'Dinas Pertanian', fullName: 'Dinas Pertanian Kabupaten Halmahera Timur', head: 'Ir. Samsul Rizal', description: 'Penyedia data produksi pangan, hortikultura, and peternakan.', address: 'Jl. Trans Maba', count: 82 },
      { id: 'P-009', name: 'Dinas PUPR', fullName: 'Dinas Pekerjaan Umum dan Penataan Ruang', head: 'Revolino, ST', description: 'Pengelola data infrastruktur jalan, jembatan, irigasi, and tata ruang.', address: 'Jl. Utama Maba', count: 77 },
      { id: 'P-010', name: 'Dinas Perhubungan', fullName: 'Dinas Perhubungan Kabupaten Halmahera Timur', head: 'Dwi Cahyo, S.Si', description: 'Penyedia data sarana transportasi darat, laut, and udara.', address: 'Jl. Trans Maba', count: 35 },
      { id: 'P-011', name: 'Dinas Pariwisata', fullName: 'Dinas Kebudayaan dan Pariwisata', head: 'Hardiyanto, SE', description: 'Penyedia data destinasi wisata, kunjungan turis, and cagar budaya.', address: 'Jl. Trans Maba', count: 28 },
      { id: 'P-012', name: 'Dinas Perikanan', fullName: 'Dinas Kelautan dan Perikanan', head: 'Hadidjah Ali, S.Pi', description: 'Penyedia data hasil laut, nelayan, and potensi pesisir.', address: 'Jl. Trans Maba', count: 52 },
      { id: 'P-013', name: 'Dinas Lingkungan Hidup', fullName: 'Dinas Lingkungan Hidup Kabupaten Halmahera Timur', head: 'Iwan Subagyo, S.Si', description: 'Pengelola data kualitas lingkungan, persampahan, and ruang terbuka hijau.', address: 'Jl. Trans Maba', count: 41 },
      { id: 'P-014', name: 'DPMPTSP', fullName: 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu', head: 'Andi M. Gafar, SH', description: 'Penyedia data investasi daerah and perizinan terpadu.', address: 'Jl. Trans Maba', count: 39 },
      { id: 'P-015', name: 'BPKAD', fullName: 'Badan Pengelola Keuangan dan Aset Daerah', head: 'Rudi Aris, SE', description: 'Pengelola data keuangan daerah (APBD) dan aset pemerintah kabupaten.', address: 'Kantor Bupati Haltim', count: 67 },
      { id: 'P-016', name: 'Bapenda', fullName: 'Badan Pendapatan Daerah', head: 'Syamsudin, SE', description: 'Pengelola data penerimaan pajak dan retribusi daerah (PAD).', address: 'Kantor Bupati Haltim', count: 45 },
      { id: 'P-017', name: 'BKPSDM', fullName: 'Badan Kepegawaian dan Pengembangan Sumber Daya Manusia', head: 'Ismail, S.Sos', description: 'Penyedia data profil ASN dan pengembangan kompetensi pegawai.', address: 'Kantor Bupati Haltim', count: 88 },
      { id: 'P-018', name: 'BPBD', fullName: 'Badan Penanggulangan Bencana Daerah', head: 'M. Adam, SE', description: 'Penyedia data kebencanaan dan mitigasi risiko bencana daerah.', address: 'Jl. Trans Maba', count: 24 },
      { id: 'P-019', name: 'Inspektorat', fullName: 'Inspektorat Daerah Kabupaten Halmahera Timur', head: 'Drs. Sutarman', description: 'Pengelola data pengawasan internal dan audit kinerja daerah.', address: 'Kantor Bupati Haltim', count: 31 },
      { id: 'P-020', name: 'RSUD Maba', fullName: 'Rumah Sakit Umum Daerah Maba', head: 'dr. Muhammad Nasir', description: 'Penyedia data pelayanan medis rujukan di Halmahera Timur.', address: 'Jl. Utama Maba', count: 62 },
    ]);

    setMyDistricts(savedDistricts ? JSON.parse(savedDistricts) : [
      { id: 'kec-01', name: 'Kota Maba', population: 11200, area: 210.5 },
      { id: 'kec-02', name: 'Maba', population: 12500, area: 412.5 },
      { id: 'kec-03', name: 'Maba Selatan', population: 9800, area: 380.2 },
      { id: 'kec-04', name: 'Maba Tengah', population: 7500, area: 290.4 },
      { id: 'kec-05', name: 'Maba Utara', population: 8200, area: 450.1 },
      { id: 'kec-06', name: 'Wasile', population: 15200, area: 512.2 },
      { id: 'kec-07', name: 'Wasile Selatan', population: 13400, area: 480.8 },
      { id: 'kec-08', name: 'Wasile Tengah', population: 6800, area: 240.3 },
      { id: 'kec-09', name: 'Wasile Timur', population: 10500, area: 360.6 },
      { id: 'kec-10', name: 'Wasile Utara', population: 5400, area: 320.4 },
    ]);

    if (savedIpm) {
      setMyIpm(JSON.parse(savedIpm));
    } else {
      const mergedInitial = MOCK_IPM_DATA.map(ipm => {
        const eco = MOCK_ECONOMIC_DATA.find(e => e.year === ipm.year);
        return {
          ...ipm,
          growth: eco?.growth || 0,
          unemployment: eco?.unemployment || 0
        };
      });
      setMyIpm(mergedInitial);
    }

    // Load SPM Data
    setMySpm(savedSpm ? JSON.parse(savedSpm) : [
      { year: '2024', education: 88.5, health: 92.1, pupr: 76.4, housing: 72.8, social: 94.2, peace: 85.6 },
      { year: '2023', education: 86.2, health: 90.5, pupr: 74.2, housing: 70.5, social: 92.8, peace: 84.2 }
    ]);

    // Load Regulation Data
    setMyRegulations(savedRegulations ? JSON.parse(savedRegulations) : [
      { id: 'REG-01', title: 'Perda Penyelenggaraan Statistik Sektoral', number: '1', year: '2023', type: 'Perda', about: 'Penyelenggaraan statistik sektoral daerah Kabupaten Halmahera Timur.' },
      { id: 'REG-02', title: 'Perbup Walidata & Produsen Data', number: '45', year: '2022', type: 'Perbup', about: 'Tata kelola peran walidata dan produsen data dalam ekosistem Satu Data.' }
    ]);

    if (savedRoles) setMyRoles(JSON.parse(savedRoles));
  }, [searchParams]);

  // Editing States
  const [editingDataset, setEditingDataset] = useState<Dataset | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editingTopic, setEditingTopic] = useState<any | null>(null);
  const [editingProducer, setEditingProducer] = useState<any | null>(null);
  const [editingDistrict, setEditingDistrict] = useState<any | null>(null);
  const [editingMasterName, setEditingMasterName] = useState<any | null>(null);
  const [editingIpm, setEditingIpm] = useState<any | null>(null);
  const [editingSpm, setEditingSpm] = useState<any | null>(null);
  const [editingRegulation, setEditingRegulation] = useState<any | null>(null);
  const [editingRole, setEditingRole] = useState<any | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Save Handlers with Persistence
  const handleSaveDataset = (newData: any) => {
    let updated;
    if (editingDataset) updated = myDatasets.map(d => d.id === editingDataset.id ? { ...d, ...newData, topic: newData.topic as Topic, updatedAt: `${newData.year}-01-01` } : d);
    else updated = [{ ...newData, id: `DS-${Date.now()}`, publisher: userProfile.institution, updatedAt: `${newData.year}-01-01`, topic: newData.topic as Topic, format: ['PDF'], downloads: 0 }, ...myDatasets];
    setMyDatasets(updated);
    localStorage.setItem('haltim_datasets', JSON.stringify(updated));
  };

  const handleSaveUser = (newData: any) => {
    let updated;
    if (editingUser) updated = myUsers.map(u => u.id === editingUser.id ? { ...u, ...newData } : u);
    else updated = [...myUsers, { ...newData, id: `U-${Date.now()}`, status: 'Aktif' }];
    setMyUsers(updated);
    localStorage.setItem('haltim_users', JSON.stringify(updated));
  };

  const handleSaveTopic = (newData: any) => {
    let updated;
    if (editingTopic) updated = myTopics.map(t => t.name === editingTopic.name ? { ...t, ...newData } : t);
    else updated = [...myTopics, { ...newData, icon: <Layers className="w-6 h-6" /> }];
    setMyTopics(updated);
    localStorage.setItem('haltim_topics', JSON.stringify(updated));
    setEditingTopic(null);
  };

  const handleSaveProducer = (newData: any) => {
    let updated;
    if (editingProducer) updated = myProducers.map(p => p.id === editingProducer.id ? { ...p, ...newData } : p);
    else updated = [...myProducers, { ...newData, id: `P-${Date.now()}`, count: 0 }];
    setMyProducers(updated);
    localStorage.setItem('haltim_producers', JSON.stringify(updated));
    setEditingProducer(null);
  };

  const handleSaveDistrict = (newData: any) => {
    let updated;
    if (editingDistrict) updated = myDistricts.map(d => d.id === editingDistrict.id ? { ...d, ...newData } : d);
    else updated = [...myDistricts, { ...newData, id: `kec-${Date.now()}` }];
    setMyDistricts(updated);
    localStorage.setItem('haltim_districts', JSON.stringify(updated));
    setEditingDistrict(null);
  };

  const handleSaveMasterName = (newData: any) => {
    let updated;
    if (editingMasterName) updated = masterNames.map(mn => mn.name === editingMasterName.name ? { ...mn, ...newData } : mn);
    else updated = [...masterNames, newData];
    setMasterNames(updated);
    localStorage.setItem('haltim_names', JSON.stringify(updated));
    setEditingMasterName(null);
  };

  const handleSaveDevIndicators = (newData: any) => {
    let updated;
    if (editingIpm) updated = myIpm.map(ipm => ipm.year === editingIpm.year ? { ...ipm, ...newData } : ipm);
    else updated = [newData, ...myIpm];
    setMyIpm(updated);
    localStorage.setItem('haltim_ipm', JSON.stringify(updated));
    setEditingIpm(null);
  };

  const handleSaveSpmIndicators = (newData: any) => {
    let updated;
    if (editingSpm) updated = mySpm.map(spm => spm.year === editingSpm.year ? { ...spm, ...newData } : spm);
    else updated = [newData, ...mySpm];
    setMySpm(updated);
    localStorage.setItem('haltim_spm', JSON.stringify(updated));
    setEditingSpm(null);
  };

  const handleSaveRegulation = (newData: any) => {
    let updated;
    if (editingRegulation) updated = myRegulations.map(r => r.id === editingRegulation.id ? { ...r, ...newData } : r);
    else updated = [{ ...newData, id: `REG-${Date.now()}` }, ...myRegulations];
    setMyRegulations(updated);
    localStorage.setItem('haltim_regulations', JSON.stringify(updated));
    setEditingRegulation(null);
  };

  const handleSaveRole = (newData: any) => {
    const updatedRoles = myRoles.map(r => r.id === newData.id ? { ...r, ...newData } : r);
    setMyRoles(updatedRoles);
    localStorage.setItem('haltim_roles', JSON.stringify(updatedRoles));
    setEditingRole(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      alert('Profil Anda berhasil diperbarui!');
    }, 1500);
  };

  const handleLogoutAction = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const openDeleteModal = (id: string, name: string, type: string) => {
    setItemToDelete({ id, name, type });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    setTimeout(() => {
      const { id, type } = itemToDelete;
      let updated;
      
      if (type === 'dataset') {
        updated = myDatasets.filter(d => d.id !== id);
        setMyDatasets(updated);
        localStorage.setItem('haltim_datasets', JSON.stringify(updated));
      } else if (type === 'user') {
        updated = myUsers.filter(u => u.id !== id);
        setMyUsers(updated);
        localStorage.setItem('haltim_users', JSON.stringify(updated));
      } else if (type === 'topic') {
        updated = myTopics.filter(t => t.name !== id);
        setMyTopics(updated);
        localStorage.setItem('haltim_topics', JSON.stringify(updated));
      } else if (type === 'producer') {
        updated = myProducers.filter(p => p.id !== id);
        setMyProducers(updated);
        localStorage.setItem('haltim_producers', JSON.stringify(updated));
      } else if (type === 'district') {
        updated = myDistricts.filter(d => d.id !== id);
        setMyDistricts(updated);
        localStorage.setItem('haltim_districts', JSON.stringify(updated));
      } else if (type === 'name') {
        updated = masterNames.filter(mn => mn.name !== id);
        setMasterNames(updated);
        localStorage.setItem('haltim_names', JSON.stringify(updated));
      } else if (type === 'regulation') {
        updated = myRegulations.filter(r => r.id !== id);
        setMyRegulations(updated);
        localStorage.setItem('haltim_regulations', JSON.stringify(updated));
      } else if (type === 'ipm') {
        updated = myIpm.filter(ipm => ipm.year !== id);
        setMyIpm(updated);
        localStorage.setItem('haltim_ipm', JSON.stringify(updated));
      } else if (type === 'spm') {
        updated = mySpm.filter(spm => spm.year !== id);
        setMySpm(updated);
        localStorage.setItem('haltim_spm', JSON.stringify(updated));
      }
      
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }, 800);
  };

  const filteredDatasets = myDatasets.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = myUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTopics = myTopics.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredProducers = myProducers.filter(p => p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredMasterNames = masterNames.filter(mn => mn.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredRegulations = myRegulations.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isExiting) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LogOut className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <h2 className="text-2xl font-black mt-8 tracking-tight">Mengakhiri Sesi...</h2>
        <p className="text-slate-400 font-medium mt-2">Menutup Panel Pengelola Satu Data Haltim</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">Panel Pengelola Data</h1>
            <p className="text-slate-500 font-medium">Kabupaten Halmahera Timur</p>
          </div>
        </div>

        {activeMenu !== 'profile' && (
          <button 
            onClick={() => {
              if (activeMenu === 'users') { 
                if (activeUserTab === 'roles') alert('Fitur tambah peran akan segera tersedia.');
                else { setEditingUser(null); setIsUserFormOpen(true); }
              }
              else if (activeMenu === 'topics') { setEditingTopic(null); setIsCategoryFormOpen(true); }
              else if (activeMenu === 'producers') { setEditingProducer(null); setIsProducerFormOpen(true); }
              else if (activeMenu === 'names') { setEditingMasterName(null); setIsNameFormOpen(true); }
              else if (activeMenu === 'districts') { setEditingDistrict(null); setIsDistrictFormOpen(true); }
              else if (activeMenu === 'dev-indicators') { setEditingIpm(null); setIsDevIndicatorsOpen(true); }
              else if (activeMenu === 'spm-indicators') { setEditingSpm(null); setIsSpmIndicatorsOpen(true); }
              else if (activeMenu === 'regulations') { setEditingRegulation(null); setIsRegulationFormOpen(true); }
              else { setEditingDataset(null); setIsFormOpen(true); }
            }}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>
              {activeMenu === 'users' ? (activeUserTab === 'roles' ? 'Tambah Peran' : 'Tambah Pengguna') : 
               activeMenu === 'topics' ? 'Tambah Kategori' :
               activeMenu === 'names' ? 'Tambah Form Master' :
               activeMenu === 'producers' ? 'Tambah Produsen' :
               activeMenu === 'districts' ? 'Tambah Kecamatan' :
               activeMenu === 'dev-indicators' ? 'Update Indikator' :
               activeMenu === 'spm-indicators' ? 'Update SPM' :
               activeMenu === 'regulations' ? 'Tambah Regulasi' :
               'Isi Dataset Baru'}
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigasi Bertingkat */}
        <aside className="lg:w-64 space-y-2">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigasi Menu</p>
          
          <button onClick={() => setActiveMenu('producers')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'producers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><Building2 className="w-4 h-4" /><span>Produsen Data</span></div>
            {activeMenu === 'producers' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('districts')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'districts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><MapPin className="w-4 h-4" /><span>Kecamatan</span></div>
            {activeMenu === 'districts' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('topics')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'topics' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><Layers className="w-4 h-4" /><span>Kategori / Topik</span></div>
            {activeMenu === 'topics' && <ChevronRight className="w-4 h-4" />}
          </button>

          <div className="space-y-1">
            <button 
              onClick={() => setIsDatasetMenuExpanded(!isDatasetMenuExpanded)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${(activeMenu === 'datasets' || activeMenu === 'names') ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4" />
                <span>Data Set</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDatasetMenuExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {isDatasetMenuExpanded && (
              <div className="pl-6 space-y-1 mt-1 border-l-2 border-slate-100 ml-6 animate-in slide-in-from-top-2 duration-300">
                <button onClick={() => setActiveMenu('names')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeMenu === 'names' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>Form Dataset</button>
                <button onClick={() => setActiveMenu('datasets')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeMenu === 'datasets' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>Daftar Dataset</button>
              </div>
            )}
          </div>

          <button onClick={() => setActiveMenu('dev-indicators')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'dev-indicators' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><BarChart3 className="w-4 h-4" /><span>Indikator makro</span></div>
            {activeMenu === 'dev-indicators' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('spm-indicators')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'spm-indicators' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><ClipboardCheck className="w-4 h-4" /><span>Indikator SPM</span></div>
            {activeMenu === 'spm-indicators' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('regulations')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'regulations' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><Scale className="w-4 h-4" /><span>Regulasi data</span></div>
            {activeMenu === 'regulations' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('users')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><Users2 className="w-4 h-4" /><span>Manajemen Pengguna</span></div>
            {activeMenu === 'users' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button onClick={() => setActiveMenu('profile')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><User className="w-4 h-4" /><span>Profil Saya</span></div>
            {activeMenu === 'profile' && <ChevronRight className="w-4 h-4" />}
          </button>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <button 
              onClick={handleLogoutAction}
              className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </aside>

        {/* Konten Utama */}
        <div className="flex-1 space-y-8">
          
          {/* Section: Manajemen Regulasi */}
          {activeMenu === 'regulations' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Regulasi Data Daerah</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola dasar hukum penyelenggaraan Satu Data dan Statistik Sektoral.</p>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari regulasi..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-all font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul & Nomor</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tentang</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRegulations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Scale className="w-5 h-5" /></div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{reg.title}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">No. {reg.number} Tahun {reg.year}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5"><p className="text-xs text-slate-500 font-medium max-w-xs line-clamp-2 leading-relaxed">{reg.about}</p></td>
                          <td className="px-8 py-5">
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${reg.type === 'Perda' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-700'}`}>
                              {reg.type}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingRegulation(reg); setIsRegulationFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(reg.id, reg.title, 'regulation')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Manajemen Pengguna */}
          {activeMenu === 'users' && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Manajemen Pengguna</h3>
                  <p className="text-sm text-slate-500 font-medium">Kelola akun operator, peran, dan otoritas akses menu sistem.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                   <button onClick={() => setActiveUserTab('list')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeUserTab === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Daftar Pengguna</button>
                   <button onClick={() => setActiveUserTab('roles')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeUserTab === 'roles' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Peran & Hak Akses</button>
                </div>
              </div>

              {activeUserTab === 'list' ? (
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <div className="relative w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input type="text" placeholder="Cari operator..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Instansi</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Peran Sistem</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">{user.name.charAt(0)}</div>
                                <div><p className="text-sm font-bold text-slate-900">{user.name}</p><p className="text-[10px] text-slate-400 font-medium">{user.email}</p></div>
                              </div>
                            </td>
                            <td className="px-8 py-5"><span className="text-sm font-medium text-slate-600">{user.institution}</span></td>
                            <td className="px-8 py-5">
                               <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${user.role === 'Administrator' ? 'bg-slate-900 text-white' : user.role === 'Walidata' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                  <Shield className="w-3 h-3 mr-1" /> {user.role}
                               </span>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingUser(user); setIsUserFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => openDeleteModal(user.id, user.name, 'user')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div>
                        <h4 className="font-black text-slate-900">Daftar Peran (Role)</h4>
                        <p className="text-xs text-slate-500 font-medium">Pengaturan default hak akses menu untuk setiap tingkatan pengguna.</p>
                      </div>
                      <Settings2 className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100/50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">Nama Peran</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Otoritas</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Hak Akses Menu</th>
                            <th className="px-8 py-5 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {myRoles.map((role) => (
                            <tr key={role.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center space-x-3">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role.name === 'Administrator' ? 'bg-slate-900 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                      <ShieldCheck className="w-4 h-4" />
                                   </div>
                                   <span className="font-black text-sm text-slate-900">{role.name}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">{role.description}</p>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex flex-wrap gap-1.5 justify-center">
                                  {role.permissions.map((perm: string) => (
                                    <span key={perm} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-md border border-blue-100">
                                      {perm}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <button onClick={() => { setEditingRole(role); setIsRoleFormOpen(true); }} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Ubah Hak Akses">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
                     <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                           <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg leading-tight">Matriks Otoritas Menu</h4>
                           <p className="text-slate-400 text-xs font-medium">Pemetaan visibilitas menu berdasarkan peran aktif.</p>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="border-b border-white/10">
                                 <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Menu Utama</th>
                                 {myRoles.map(role => (
                                    <th key={role.id} className="py-4 px-4 text-center text-[10px] font-black text-blue-400 uppercase tracking-widest">{role.name}</th>
                                 ))}
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {SYSTEM_MENUS.map(menuName => (
                                 <tr key={menuName} className="hover:bg-white/5">
                                    <td className="py-4 px-4">
                                       <span className="text-sm font-bold text-slate-300">{menuName}</span>
                                    </td>
                                    {myRoles.map(role => (
                                       <td key={role.id} className="py-4 px-4 text-center">
                                          {role.permissions.includes(menuName) ? (
                                             <div className="w-6 h-6 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center mx-auto">
                                                <Check className="w-4 h-4" />
                                             </div>
                                          ) : (
                                             <div className="w-6 h-6 bg-white/5 text-white/10 rounded-lg flex items-center justify-center mx-auto">
                                                <X className="w-4 h-4" />
                                             </div>
                                          )}
                                       </td>
                                    ))}
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
                </div>
              )}
             </div>
          )}

          {/* Section: Profil Saya */}
          {activeMenu === 'profile' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Profil Saya</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola informasi akun dan pengaturan keamanan pengelola.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-24 bg-blue-600/5"></div>
                    <div className="relative mt-4">
                      <div className="w-32 h-32 bg-blue-100 rounded-[40px] flex items-center justify-center mx-auto text-blue-600 border-4 border-white shadow-lg">
                        <User className="w-16 h-16" />
                        <button className="absolute bottom-0 right-1/2 translate-x-12 p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-xl font-black text-slate-900">{userProfile.name}</h4>
                        <div className="flex items-center justify-center space-x-2 mt-1">
                          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">{userProfile.role}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-widest">Instansi</span>
                        <span className="text-slate-900 font-black">Diskominfo</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-widest">Login Terakhir</span>
                        <span className="text-slate-900 font-black">{userProfile.lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
                      <h4 className="font-bold">Status Keamanan</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Akun Anda saat ini memiliki hak akses penuh sebagai Administrator Satu Data.</p>
                    <button onClick={() => alert('Fitur ubah sandi segera hadir.')} className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2">
                       <Lock className="w-4 h-4" />
                       <span>Ubah Kata Sandi</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                      <h4 className="font-black text-slate-900">Informasi Pengguna</h4>
                      <p className="text-xs text-slate-500 font-medium">Detail profil Anda yang terdaftar di sistem.</p>
                    </div>
                    <form onSubmit={handleSaveProfile} className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 transition-all" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Dinas</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="email" disabled value={userProfile.email} className="w-full pl-11 pr-4 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 font-bold cursor-not-allowed" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instansi / Unit Kerja</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" value={userProfile.institution} onChange={(e) => setUserProfile({...userProfile, institution: e.target.value})} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-900 transition-all" />
                        </div>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={isSavingProfile} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50">
                          {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          <span>Simpan Perubahan</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Manajemen Produsen Data */}
          {activeMenu === 'producers' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Produsen Data (OPD)</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola daftar Organisasi Perangkat Daerah yang berkontribusi dalam Satu Data.</p>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari OPD..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-all font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Instansi Produsen</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Keterangan / Fungsi</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pimpinan</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducers.map((producer) => (
                        <tr key={producer.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
                              <div><p className="text-sm font-bold text-slate-900">{producer.fullName}</p><p className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">{producer.name}</p></div>
                            </div>
                          </td>
                          <td className="px-8 py-5"><p className="text-xs text-slate-500 font-medium max-w-xs line-clamp-2 leading-relaxed">{producer.description || '-'}</p></td>
                          <td className="px-8 py-5"><div className="flex items-center space-x-2"><User className="w-3.5 h-3.5 text-slate-300" /><span className="text-xs font-bold text-slate-700">{producer.head}</span></div></td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingProducer(producer); setIsProducerFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(producer.id, producer.fullName, 'producer')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Manajemen Kecamatan */}
          {activeMenu === 'districts' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Daftar Kecamatan</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola data geografis dan kependudukan tingkat kecamatan.</p>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari kecamatan..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-all font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kecamatan</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Luas (Km²)</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Penduduk</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myDistricts.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map((district) => (
                        <tr key={district.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5 font-bold text-slate-900">{district.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{district.area}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{district.population?.toLocaleString('id-ID')}</td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingDistrict(district); setIsDistrictFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(district.id, district.name, 'district')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Manajemen Kategori */}
          {activeMenu === 'topics' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Kategori & Topik Data</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola klasifikasi data sektoral yang tersedia di portal.</p>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari kategori..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-all font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Keterangan</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTopics.map((topic, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${topic.color || 'bg-blue-50 text-blue-600'} rounded-xl flex items-center justify-center`}>{topic.icon && React.isValidElement(topic.icon) ? topic.icon : <Layers className="w-4 h-4" />}</div>
                              <span className="text-sm font-bold text-slate-900">{topic.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5"><p className="text-xs text-slate-500 font-medium max-w-sm line-clamp-2">{topic.description || '-'}</p></td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingTopic(topic); setIsCategoryFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(topic.name, topic.name, 'topic')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Daftar Dataset */}
          {activeMenu === 'datasets' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Katalog Dataset Internal</h3>
                <p className="text-sm text-slate-500 font-medium">Lihat dan kelola entri data sektoral yang telah diinput.</p>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari dataset..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Dataset</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDatasets.map((dataset) => (
                        <tr key={dataset.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-6"><div><p className="text-sm font-bold text-slate-900">{dataset.title}</p><p className="text-[10px] text-slate-400 font-medium mt-1">Publisher: {dataset.publisher}</p></div></td>
                          <td className="px-8 py-6"><span className="text-xs px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 font-black uppercase tracking-tighter">{dataset.topic}</span></td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingDataset(dataset); setIsFormOpen(true); }} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(dataset.id, dataset.title, 'dataset')} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Form Dataset */}
          {activeMenu === 'names' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Form Master Dataset</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola struktur formulir dan variabel data sektoral.</p>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="relative w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Cari nama form..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Form Master</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Variabel</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMasterNames.map((mn, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                              <span className="text-sm font-bold text-slate-900">{mn.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5"><span className="text-xs font-bold text-slate-500">{mn.variables?.length || 0} Kolom Input</span></td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingMasterName(mn); setIsNameFormOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(mn.name, mn.name, 'name')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Indikator makro */}
          {activeMenu === 'dev-indicators' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Indikator Pembangunan Makro</h3>
                <p className="text-sm text-slate-500 font-medium">Update capaian indikator strategis daerah tahunan secara terpadu.</p>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahun</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">IPM</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kemiskinan</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Ekonomi</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pengangguran</th>
                        <th className="px-6 py-5 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myIpm.slice(0, 10).map((ipm, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-5 font-bold text-slate-900">{ipm.year}</td>
                          <td className="px-6 py-5 text-center text-sm font-black text-blue-600">{ipm.ipm}</td>
                          <td className="px-6 py-5 text-center text-sm font-bold text-red-500">{ipm.kemiskinan}%</td>
                          <td className="px-6 py-5 text-center text-sm font-bold text-emerald-600">{ipm.growth || 0}%</td>
                          <td className="px-6 py-5 text-center text-sm font-bold text-indigo-600">{ipm.unemployment || 0}%</td>
                          <td className="px-6 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingIpm(ipm); setIsDevIndicatorsOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(ipm.year, `Data Tahun ${ipm.year}`, 'ipm')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section: Indikator SPM */}
          {activeMenu === 'spm-indicators' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Indikator Standar Pelayanan Minimal (SPM)</h3>
                <p className="text-sm text-slate-500 font-medium">Kelola capaian pemenuhan layanan dasar berdasarkan 6 bidang SPM.</p>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tahun</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Pendidikan</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Kesehatan</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">PUPR</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Perkim</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Trantibum</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Sosial</th>
                        <th className="px-6 py-5 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mySpm.slice(0, 10).map((spm, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-5 font-bold text-slate-900">{spm.year}</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.education}%</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.health}%</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.pupr}%</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.housing}%</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.peace}%</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-slate-600">{spm.social}%</td>
                          <td className="px-6 py-5 text-right">
                             <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingSpm(spm); setIsSpmIndicatorsOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDeleteModal(spm.year, `Data SPM Tahun ${spm.year}`, 'spm')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DatasetFormModal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setEditingDataset(null); }} initialData={editingDataset} onSave={handleSaveDataset} topics={myTopics} masterNames={masterNames} />
      <UserFormModal isOpen={isUserFormOpen} onClose={() => { setIsUserFormOpen(false); setEditingUser(null); }} initialData={editingUser} onSave={handleSaveUser} producers={myProducers} />
      <CategoryFormModal isOpen={isCategoryFormOpen} onClose={() => { setIsCategoryFormOpen(false); setEditingTopic(null); }} initialData={editingTopic} onSave={handleSaveTopic} />
      <MasterNameFormModal isOpen={isNameFormOpen} onClose={() => { setIsNameFormOpen(false); setEditingMasterName(null); }} initialData={editingMasterName} onSave={handleSaveMasterName} topics={myTopics} />
      <ProducerFormModal isOpen={isProducerFormOpen} onClose={() => { setIsProducerFormOpen(false); setEditingProducer(null); }} initialData={editingProducer} onSave={handleSaveProducer} />
      <DistrictFormModal isOpen={isDistrictFormOpen} onClose={() => { setIsDistrictFormOpen(false); setEditingDistrict(null); }} initialData={editingDistrict} onSave={handleSaveDistrict} />
      <DevIndicatorsFormModal isOpen={isDevIndicatorsOpen} onClose={() => { setIsDevIndicatorsOpen(false); setEditingIpm(null); }} initialData={editingIpm} onSave={handleSaveDevIndicators} />
      <SpmIndicatorsFormModal isOpen={isSpmIndicatorsOpen} onClose={() => { setIsSpmIndicatorsOpen(false); setEditingSpm(null); }} initialData={editingSpm} onSave={handleSaveSpmIndicators} />
      <RegulationFormModal isOpen={isRegulationFormOpen} onClose={() => { setIsRegulationFormOpen(false); setEditingRegulation(null); }} initialData={editingRegulation} onSave={handleSaveRegulation} />
      <RoleFormModal isOpen={isRoleFormOpen} onClose={() => { setIsRoleFormOpen(false); setEditingRole(null); }} initialData={editingRole} onSave={handleSaveRole} systemMenus={SYSTEM_MENUS} />
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title={`Hapus ${itemToDelete?.type}`} itemName={itemToDelete?.name || ''} isLoading={isDeleting} />
    </div>
  );
};

export default DatasetManagement;
