
import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Loader2, CheckCircle2, Type, Layers, Plus, Trash2, ListTree, ChevronDown, Tag } from 'lucide-react';

interface MasterNameFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
  topics: any[];
}

const MasterNameFormModal: React.FC<MasterNameFormModalProps> = ({ isOpen, onClose, initialData, onSave, topics }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    variables: [{ name: '', value: '', type: 'text' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        variables: initialData.variables || [{ name: '', value: '', type: 'text' }]
      });
    } else {
      setFormData({ 
        name: '', 
        description: '', 
        category: '',
        variables: [{ name: '', value: '', type: 'text' }]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddVariable = () => {
    setFormData({
      ...formData,
      variables: [...formData.variables, { name: '', value: '', type: 'text' }]
    });
  };

  const handleRemoveVariable = (index: number) => {
    const newVars = [...formData.variables];
    newVars.splice(index, 1);
    setFormData({ ...formData, variables: newVars });
  };

  const handleVariableChange = (index: number, field: string, value: string) => {
    const newVars = [...formData.variables] as any;
    newVars[index][field] = value;
    setFormData({ ...formData, variables: newVars });
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <h2 className="text-xl font-black">{initialData ? 'Ubah Form Dataset' : 'Tambah Form Dataset'}</h2>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center mb-1">
                    <Layers className="w-3 h-3 mr-1.5 text-blue-500" /> Kategori Terkait
                  </label>
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-900 shadow-sm transition-all"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {topics.map(t => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center mb-1">
                    <Type className="w-3 h-3 mr-1.5 text-blue-500" /> Nama Form Dataset
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Produksi Kelapa Sawit"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-900 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* STRUKTUR VARIABEL */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center">
                    <ListTree className="w-4 h-4 mr-2 text-blue-600" /> Struktur Variabel Form
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 italic">Tambahkan field yang akan diisi oleh admin sektoral</span>
                </div>
                
                <div className="space-y-3">
                  {/* Table Header for Desktop */}
                  <div className="hidden md:flex gap-4 px-4 py-2 bg-slate-100/50 rounded-xl border border-slate-100">
                    <div className="flex-[2.5] text-[10px] font-black text-slate-500 uppercase tracking-wider">Nama Variabel</div>
                    <div className="flex-[2.5] text-[10px] font-black text-slate-500 uppercase tracking-wider">Satuan / Format Isian</div>
                    <div className="flex-[1.5] text-[10px] font-black text-slate-500 uppercase tracking-wider">Tipe Data</div>
                    <div className="w-10"></div>
                  </div>

                  {formData.variables.map((variable, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-left-2 duration-300 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-200 transition-all group">
                      {/* Kolom Nama Variabel */}
                      <div className="flex-[2.5] space-y-1">
                        <label className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Variabel</label>
                        <div className="relative">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          <input 
                            type="text" 
                            required
                            placeholder="Misal: Luas Lahan"
                            value={variable.name}
                            onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold text-slate-900 shadow-inner transition-all"
                          />
                        </div>
                      </div>

                      {/* Kolom Satuan/Format */}
                      <div className="flex-[2.5] space-y-1">
                        <label className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest">Satuan / Format Isian</label>
                        <input 
                          type="text" 
                          placeholder="Misal: Hektar (Ha) atau Ton"
                          value={variable.value}
                          onChange={(e) => handleVariableChange(index, 'value', e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold text-slate-900 shadow-inner transition-all"
                        />
                      </div>

                      {/* Kolom Tipe Data */}
                      <div className="flex-[1.5] space-y-1 relative">
                        <label className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Data</label>
                        <div className="relative">
                          <select 
                            value={variable.type}
                            onChange={(e) => handleVariableChange(index, 'type', e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold text-slate-900 shadow-inner appearance-none cursor-pointer transition-all pr-8"
                          >
                            <option value="text">Teks / Huruf</option>
                            <option value="number">Angka / Desimal</option>
                            <option value="date">Tanggal</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Tombol Hapus */}
                      <div className="flex justify-end items-center md:pt-0 pt-2">
                        {formData.variables.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleRemoveVariable(index)}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                            title="Hapus variabel ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={handleAddVariable}
                  className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest mt-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Baris Variabel Baru</span>
                </button>
              </div>

              <div className="space-y-1.5 pt-6 border-t border-slate-100">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center mb-1">
                   Deskripsi Kegunaan Form
                </label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Jelaskan secara singkat kegunaan dari form master data ini agar dipahami oleh pengelola data sektoral."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium text-slate-600 resize-none h-24 shadow-sm transition-all"
                />
              </div>

              <div className="pt-6 flex space-x-4">
                <button 
                  type="button" 
                  onClick={handleClose} 
                  className="flex-1 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{initialData ? 'Simpan Perubahan Master' : 'Publikasikan Form Master'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-16 text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Konfigurasi Tersimpan!</h2>
              <p className="text-slate-500 font-medium text-lg">Struktur master form dataset telah diperbarui dan siap digunakan oleh produsen data.</p>
            </div>
            <button 
              onClick={handleClose}
              className="mt-4 px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterNameFormModal;
