import React, { useState } from 'react';
import { MessageCircle, X, Send, Flame, Shield, Sun } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { selectedProduct, view } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const sendWhatsApp = (customMsg?: string) => {
    let msgToSend = customMsg || message;
    if (!msgToSend.trim()) {
      if (view === 'product-detail' && selectedProduct) {
        msgToSend = `Hola GENERGY SOLUTION, requiero asesoría técnica y cotización formal para el modelo ${selectedProduct.brand} ${selectedProduct.model}.`;
      } else {
        msgToSend = 'Hola GENERGY SOLUTION, me comunico desde la tienda online. Deseo solicitar asesoría técnica para un proyecto.';
      }
    }
    window.open(`https://wa.me/5215515909699?text=${encodeURIComponent(msgToSend)}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Popover Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-2 animate-fadeIn">
          {/* Header */}
          <div className="bg-[#07182E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#07182E] rounded-full"></span>
              </div>
              <div>
                <div className="text-sm font-bold">Mesa de Asesoría GENERGY</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>●</span> Ingenieros en línea · Respuesta inmediata
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Division Selector Pills */}
          <div className="p-4 bg-[#F4F7FB] border-b border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">
              ¿Qué departamento necesitas consultar?
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => sendWhatsApp('Hola, requiero asesoría técnica para un proyecto de Climatización / Aire Acondicionado Inverter.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-colors"
              >
                <Flame className="w-4 h-4 text-[#20D4E8]" />
                <span>Ingeniería de Climatización & HVAC</span>
              </button>

              <button
                onClick={() => sendWhatsApp('Hola, requiero cotización y soporte para Cámaras de Seguridad IP 4K y Videovigilancia.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-colors"
              >
                <Shield className="w-4 h-4 text-[#087BFF]" />
                <span>Videovigilancia & Circuito Cerrado (CCTV)</span>
              </button>

              <button
                onClick={() => sendWhatsApp('Hola, requiero cálculo y cotización para Paneles Solares e Inversores Fotovoltaicos.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-colors"
              >
                <Sun className="w-4 h-4 text-[#F5B82E]" />
                <span>Energía Solar & Baterías de Respaldo</span>
              </button>
            </div>
          </div>

          {/* Custom Message input */}
          <div className="p-4">
            <div className="relative">
              <textarea
                rows={2}
                placeholder="Escribe tu consulta o requerimiento específico..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#25D366]"
              />
              <button
                onClick={() => sendWhatsApp()}
                className="mt-2 w-full py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Iniciar Conversación por WhatsApp</span>
              </button>
            </div>
            <div className="text-[10px] text-slate-400 text-center mt-2">
              Horario: Lunes a Viernes 8:00 a 19:00 hrs · Sábados 9:00 a 14:00 hrs
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all focus-visible:outline-hidden"
        title="Contactar por WhatsApp"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>

    </div>
  );
};
