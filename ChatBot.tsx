
// Added React import to satisfy React.FC namespace requirement
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, TrendingUp, Database, HelpCircle } from 'lucide-react';
import { askGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const QUICK_PROMPTS = [
  { id: 1, label: 'Tren IPM 2023', icon: <TrendingUp className="w-3 h-3" />, prompt: 'Bagaimana tren pencapaian IPM Halmahera Timur di tahun 2023?' },
  { id: 2, label: 'Kondisi Ekonomi', icon: <Sparkles className="w-3 h-3" />, prompt: 'Ringkas kondisi ekonomi makro Haltim saat ini.' },
  { id: 3, label: 'Cari Dataset', icon: <Database className="w-3 h-3" />, prompt: 'Data apa saja yang tersedia di topik Pertanian?' },
  { id: 4, label: 'Bantuan Portal', icon: <HelpCircle className="w-3 h-3" />, prompt: 'Apa itu portal Satu Data Haltim dan bagaimana cara mengunduh data?' },
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Halo! Saya Analis Data Virtual Haltim. Anda bisa bertanya tentang statistik IPM, pertumbuhan ekonomi, atau ketersediaan dataset. Apa yang ingin Anda ketahui hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askGemini(textToSend, messages);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Toggle Button with Notification Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'flex'} fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-2xl items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all z-40 group`}
      >
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[420px] h-[600px] bg-white rounded-[32px] shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-sm block">Analis Data Virtual</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" /> AI Powered
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-xl p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="ml-2 text-xs font-bold text-slate-400">Sedang menganalisis data...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions (Floating over input) */}
          {messages.length === 1 && !isLoading && (
            <div className="px-6 py-4 bg-white border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Saran Pertanyaan:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.id}
                    onClick={() => handleSend(qp.prompt)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95"
                  >
                    {qp.icon}
                    <span>{qp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pertanyaan Anda..."
                  className="w-full bg-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner font-medium"
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50 transition-all active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
