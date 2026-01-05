
import React, { useState, useEffect } from 'react';
import { X, Save, Database, Loader2, CheckCircle2, Calendar, ListTree, FileText, Info, Layers, Sparkles } from 'lucide-react';

interface DatasetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave?: (data: any) => void;
  topics: any[];
  masterNames: any[]; 
}

const DatasetFormModal: React.FC<DatasetFormModalProps> = ({ isOpen, onClose, initialData, onSave, topics, masterNames }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
    year: new Date().getFullYear().toString(),
    variables: [] as { name: string; value: string; type?: string; unit?: string }[]
  });

  // Cari data master berdasarkan judul yang dipilih
  const selectedMaster = masterNames.find(mn => mn.name === formData.title);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        topic: initialData.topic || '',
        description: initialData.description || '',
        year: initialData.updatedAt?.split('-')[0] || new Date().getFullYear().toString(),
        variables: initialData.variables || []
      });
    } else {
      setFormData({
        title: '',
        topic: '',
        description: '',
        year: new Date().getFullYear().toString(),
        variables: []
      });
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (selectedMaster && !initialData) {
      setFormData(prev => ({
        ...prev,
        topic: selectedMaster.category,
        description: selectedMaster.description,
        variables: selectedMaster.variables.map((v: any) => ({ 
          name: v.name, 
          value: '', 
          type: v.type || 'text',
          unit: v.value // satuan/isi variabel dari master
        }))
      }));
    }
  }, [formData.title, selectedMaster, initialData]);

  if (!isOpen) return null;

  const handleVariableChange = (index: number, value: string) => {
    const newVars = [...formData.variables];
    newVars[index].value = value;
    setFormData({ ...formData, variables: newVars });
  };

  // Fungsi untuk mengisi data contoh otomatis
  const handleFillExample = () => {
    setIsAutoFilling(true);
    setTimeout(() => {
      const exampleVars = formData.variables.map(v => {
        let exampleValue = '';
        const nameLower = v.name.toLowerCase();

        if (v.type === 'number') {
          if (nameLower.includes('penduduk') || nameLower.includes('laki') || nameLower.includes('perempuan')) {
            exampleValue = Math.floor(Math.random() * (5000 - 1000) + 1000).toString();
          } else if (nameLower.includes('luas')) {
            exampleValue = (Math.random() * 500).toFixed(2);
          } else {
            exampleValue = Math.floor(Math.random() * 100).toString();
          }
        } else if (v.type === 'date') {
          const today = new Date();
          exampleValue = today.toISOString().split('T')[0];
        } else {
          exampleValue = `Data Contoh ${v.name}`;
        }

        return { ...v, value: exampleValue };
      });

      setFormData(prev => ({ ...prev, variables: exampleVars }));
      setIsAutoFilling(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSave) onSave(formData);
      setShowSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setShowSuccess(false);
    }, 300);
  };

  const shouldShowFormContent = selectedMaster || (initialData && formData.variables.length > 0);

  const getInputProps = (type?: string) => {
    switch (type) {
      case 'number':
        return { type: 'number' };
      case 'date':
        return { type: 'date' };
      default:
        return { type: 'text' };
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!showSuccess ? (
          <>
            <div className={`p-8 border-b border-slate-100 flex justify-between items-center ${initialData ? 'bg-indigo-600' : 'bg-blue-600'} text-white transition-colors`}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black leading-tight">
                    {initialData ? 'Ubah Entri Data' : 'Isi Dataset Baru'}
                  </h2>
                  <p className="text-white/70 font-medium text-sm">
                    {initialData ? `Mengubah data entry: ${initialData.id}` : 'Pilih form dataset untuk mulai mengisi'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center">
                  <FileText className="w-3 h-3 mr-1 text-blue-600" /> Pilih Form Dataset (Master)
                </label>
                <select 
                  required
                  disabled={!!initialData}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:border-blue-500 transition-all outline-none text-sm font-bold shadow-inner ${!!initialData ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50 text-slate-900'}`}
                >
                  <option value="">-- Pilih Form dari Master --</option>
                  {masterNames.map(mn => (
                    <option key={mn.name} value={mn.name}>{mn.name}</option>
                  ))}
                </select>
                {initialData && <p className="text-[10px] text-indigo-600 font-bold mt-1">* Jenis form tidak dapat diubah dalam mode edit.</p>}
              </div>

              {shouldShowFormContent && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                  <div className="flex flex-wrap gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kategori:</span>
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black">{formData.topic}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200 hidden sm:block"></div>
                    <div className="flex items-center space-x-2 flex-1">
                      <Info className="w-4 h-4 text-slate-400" />
                      <p className="text-[11px] text-slate-500 font-medium italic">"{formData.description}"</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">Tahun Pelaporan</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="number" 
                          required
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 transition-all outline-none text-sm font-bold text-slate-900 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input Variabel Otomatis */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center">
                        <ListTree className="w-4 h-4 mr-2 text-blue-600" /> Pengisian Nilai Variabel
                      </label>
                      
                      {!initialData && (
                        <button 
                          type="button"
                          onClick={handleFillExample}
                          disabled={isAutoFilling}
                          className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isAutoFilling ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          <span>Isi Contoh Data</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {formData.variables.map((variable, index) => {
                        const inputProps = getInputProps(variable.type);
                        return (
                          <div key={index} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all duration-500 ${isAutoFilling ? 'opacity-50 scale-[0.98]' : 'hover:border-blue-200'}`}>
                            <div className="flex-1">
                              <p className="text-xs font-black text-slate-500 uppercase tracking-tight mb-1">
                                {variable.name} 
                                {variable.type === 'number' && <span className="ml-1 text-[8px] text-blue-500">(ANGKA)</span>}
                                {variable.type === 'date' && <span className="ml-1 text-[8px] text-emerald-500">(TANGGAL)</span>}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium italic">
                                Masukan nilai: <span className="text-slate-600 font-black">{(variable as any).unit || '-'}</span>
                              </p>
                            </div>
                            <div className="flex-[2]">
                              <input 
                                {...inputProps}
                                required
                                placeholder={`Isi nilai ${variable.name}...`}
                                value={variable.value}
                                onChange={(e) => handleVariableChange(index, e.target.value)}
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm font-bold text-slate-900 shadow-sm transition-all ${variable.value ? 'border-blue-100 bg-blue-50/20' : ''}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {!shouldShowFormContent && !initialData && (
                <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-slate-300">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">Belum Ada Form Dipilih</p>
                    <p className="text-xs text-slate-400 max-w-[240px] mx-auto">Silakan pilih salah satu Form Dataset di atas untuk memunculkan formulir input.</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Batalkan
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || (!selectedMaster && !initialData)}
                  className={`flex-[2] text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${initialData ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{initialData ? 'Simpan Perubahan' : 'Simpan Dataset'}</span>
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
              <h2 className="text-3xl font-black text-slate-900">
                {initialData ? 'Data Diperbarui!' : 'Dataset Tersimpan!'}
              </h2>
              <p className="text-slate-500 font-medium text-lg max-sm mx-auto">
                {initialData 
                  ? 'Perubahan data entry telah berhasil disimpan ke dalam sistem.' 
                  : 'Data Anda telah berhasil disimpan dan masuk ke antrean verifikasi Satu Data Halmahera Timur.'}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl text-sm text-slate-600 font-medium border border-slate-100 inline-block">
              ID Submission:<br/>
              <span className="text-blue-600 font-black text-xl uppercase tracking-widest">DS-{(Math.random()*1000).toFixed(0)}-{formData.year}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetFormModal;
