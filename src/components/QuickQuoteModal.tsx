import React, { useState } from 'react';
import { X, Send, Sparkles, Building2, Flame, Shield, Sun } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { QuoteRequest } from '../types';

export const QuickQuoteModal: React.FC = () => {
  const {
    isQuoteModalOpen,
    setIsQuoteModalOpen,
    quoteFormData,
    addToast,
  } = useStore();

  const [form, setForm] = useState<QuoteRequest>({
    fullName: quoteFormData.fullName || '',
    company: quoteFormData.company || '',
    email: quoteFormData.email || '',
    phone: quoteFormData.phone || '',
    city: quoteFormData.city || '',
    division: (quoteFormData.division as any) || 'multiple',
    projectType: quoteFormData.projectType || 'comercial',
    estimatedBudget: quoteFormData.estimatedBudget || '',
    notes: quoteFormData.notes || '',
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setIsQuoteModalOpen(false);
      addToast(
        'Solicitud Recibida con Éxito',
        'Un ingeniero comercial de GENERGY SOLUTION te contactará en menos de 2 horas hábiles.',
        'success'
      );

      // Open WhatsApp preview
      const text = `*SOLICITUD DE ASESORÍA / PROYECTO - GENERGY SOLUTION*\nNombre: ${form.fullName}\nEmpresa: ${form.company || 'Particular'}\nTeléfono: ${form.phone}\nCiudad: ${form.city}\nDivisión: ${form.division}\nTipo: ${form.projectType}\nPresupuesto estimado: ${form.estimatedBudget || 'Por definir'}\nRequerimientos: ${form.notes}`;
      window.open(`https://wa.me/525584219000?text=${encodeURIComponent(text)}`, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsQuoteModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#07182E] text-white p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#20D4E8] uppercase tracking-wide mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Asesoría de Ingeniería & Proyectos</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Cotización Rápida en 60 Segundos
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Ingenieros certificados en Clima, CCTV y Solar analizarán tus planos o requerimientos sin costo.
              </p>
            </div>

            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Ing. Roberto Sánchez"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Empresa o Proyecto
                </label>
                <input
                  type="text"
                  placeholder="Ej. Constructora del Norte"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+52 55..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  required
                  type="email"
                  placeholder="contacto@empresa.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                />
              </div>
            </div>

            {/* Division Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                División de Interés *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, division: 'multiple' })}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    form.division === 'multiple'
                      ? 'bg-[#07182E] text-white border-[#07182E] font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Proyecto Integral
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, division: 'clima' })}
                  className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1 ${
                    form.division === 'clima'
                      ? 'bg-[#07182E] text-white border-[#07182E] font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Flame className="w-3 h-3 text-[#20D4E8]" />
                  <span>Climatización</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, division: 'seguridad' })}
                  className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1 ${
                    form.division === 'seguridad'
                      ? 'bg-[#07182E] text-white border-[#07182E] font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Shield className="w-3 h-3 text-[#087BFF]" />
                  <span>CCTV & Seguridad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, division: 'solar' })}
                  className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1 ${
                    form.division === 'solar'
                      ? 'bg-[#07182E] text-white border-[#07182E] font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Sun className="w-3 h-3 text-[#F5B82E]" />
                  <span>Solar</span>
                </button>
              </div>
            </div>

            {/* Scope / Project Type & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tipo de Instalación
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value as any })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="residencial">Residencial / Casa Habitación</option>
                  <option value="comercial">Comercial / Oficinas / Locales</option>
                  <option value="industrial">Industrial / Naves / Parques</option>
                  <option value="distribuidor">Integrador / Contratista B2B</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ciudad o Ubicación del Proyecto
                </label>
                <input
                  type="text"
                  placeholder="Ej. Querétaro, CDMX, GDL..."
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Notes / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detalles del Requerimiento o Equipos Estimados
              </label>
              <textarea
                rows={3}
                placeholder="Indica metros cuadrados, cantidad de cámaras, capacidad en toneladas de clima o consumo promedio de energía en kWh..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-3 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Enviando requerimiento...' : 'Enviar Requerimiento a Ingeniería'}</span>
              </button>
              <div className="text-[11px] text-slate-400 text-center mt-2">
                Sin compromiso comercial · Respuesta en menos de 2 horas hábiles
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
