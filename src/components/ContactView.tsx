import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { addToast } = useStore();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    department: 'ventas',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addToast('Mensaje Recibido', 'Tu solicitud fue canalizada al área de ingeniería correspondiente.', 'success');
  };

  return (
    <div className="bg-[#F4F7FB] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-2">
            Atención Directa & Sucursales
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07182E] tracking-tight">
            Contacto & Asesoría Técnica Especializada
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Estamos disponibles para cotizaciones de volumen, especificaciones de catálogo y soporte post-venta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Info & Branches */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              <h3 className="text-base font-bold text-[#07182E] border-b border-slate-100 pb-3">
                Canales de Atención Inmediata
              </h3>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#07182E] text-[#20D4E8] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#07182E]">Conmutador Nacional:</div>
                    <a href="tel:+5215515909699" className="text-[#087BFF] hover:underline font-mono text-sm font-semibold">
                      +52 (55) 1590-9699
                    </a>
                    <div className="text-[11px] text-slate-400">10 líneas disponibles</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#07182E]">WhatsApp Oficial Comercial:</div>
                    <a 
                      href="https://wa.me/5215515909699" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-mono text-sm font-semibold"
                    >
                      +52 55 1590-9699
                    </a>
                    <div className="text-[11px] text-slate-400">Respuesta promedio: 5 minutos</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#07182E] text-[#F5B82E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#07182E]">Correo de Cotizaciones:</div>
                    <a href="mailto:cotizaciones@genergysolution.com" className="text-[#087BFF] hover:underline">
                      cotizaciones@genergysolution.com
                    </a>
                    <div className="text-[11px] text-slate-400">Recepción de memorias y planos PDF/DWG</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#07182E] text-slate-200 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#07182E]">Horarios de Centro de Distribución:</div>
                    <div>Lunes a Viernes: 8:00 AM - 7:00 PM</div>
                    <div>Sábados: 9:00 AM - 2:00 PM (Hora Centro)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Branches Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Almacenes & Centros de Soporte
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#F4F7FB] rounded-lg border border-slate-200">
                  <div className="font-bold text-[#07182E]">Sede Corporativa & Centro Logístico CDMX</div>
                </div>

                <div className="p-3 bg-[#F4F7FB] rounded-lg border border-slate-200">
                  <div className="font-bold text-[#07182E]">Centro de Distribución Norte Monterrey</div>
                  <div className="text-slate-600 mt-0.5">Parque Industrial Huinalá, Carretera a Miguel Alemán Km 14.5, Apodaca, N.L.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs">
              
              <h3 className="text-xl font-bold text-[#07182E] mb-2">
                Envíanos tu Requerimiento
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Completa este formulario para que un especialista técnico se ponga en contacto contigo con la proforma correspondiente.
              </p>

              {sent ? (
                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-emerald-950 mb-1">
                    ¡Mensaje Recibido Correctamente!
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto mb-4">
                    Hemos registrado tu solicitud para el departamento de {form.department}. Nos comunicaremos a la brevedad.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nombre Completo *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Ing. Daniel Vázquez"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Empresa / Razón Social</label>
                      <input
                        type="text"
                        placeholder="Ej. Grupo Inmobiliario Alfa"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                      <input
                        required
                        type="email"
                        placeholder="daniel@grupoalfa.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Teléfono Móvil o WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+52 55..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Departamento Destino</label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                    >
                      <option value="ventas">Ventas & Cotizaciones B2B</option>
                      <option value="ingenieria">Soporte Técnico de Ingeniería & Cálculos</option>
                      <option value="garantias">Garantías & Centro de Servicio Oficial</option>
                      <option value="distribuidores">Programa para Nuevos Integradores / Distribuidores</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mensaje o Equipos a Cotizar *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Indica marcas de interés, capacidades estimadas o detalles de tu proyecto..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg p-3 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#087BFF] hover:bg-[#0069dc] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje a Asesor Comercial</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
