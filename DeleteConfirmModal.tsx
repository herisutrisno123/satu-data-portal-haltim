
import React from 'react';
import { X, AlertTriangle, Trash2, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  itemName,
  isLoading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">
            {title}
          </h2>
          <p className="text-slate-500 font-medium text-sm px-4">
            Apakah Anda yakin ingin menghapus <span className="font-bold text-slate-900">"{itemName}"</span>? Tindakan ini tidak dapat dibatalkan.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-10">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
            >
              Batalkan
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 shadow-xl shadow-red-100 flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
              <span>Hapus Data</span>
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
