import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const {
    navigateToHome,
    navigateToCatalog,
    navigateToSolutions,
    navigateToContact,
    setIsMigrationModalOpen,
  } = useStore();

  return (
    <footer className="bg-[#07182E] text-white border-t border-slate-800">
      
      {/* Top Banner inside footer: Fast Quotation Hotline */}
      <div className="border-b border-slate-800 bg-[#102B4C]/60 py-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#20D4E8] mb-1">
              Atención Telefónica Directa
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              ¿Requieres asistencia para especificar un proyecto de climatización o seguridad?
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+5215515909699"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#20D4E8]" />
              <span>(55) 1590-9699</span>
            </a>

            <a
              href="https://wa.me/5215515909699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src="/assets/aistudio/LOGO_GENERGY_HOR_2a5ceb1a.png"
              alt="GENERGY SOLUTION"
              className="h-10 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Centro de ingeniería y distribución de equipamiento tecnológico de grado comercial e industrial. Especialistas en aire acondicionado inverter, videovigilancia 4K con IA y energía solar fotovoltaica.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#20D4E8]"></span>
              <span>Cobertura de envíos e ingeniería en todo México</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsMigrationModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#F5B82E] hover:underline font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver arquitectura para WordPress & WooCommerce →</span>
              </button>
            </div>
          </div>

          {/* Division 1: Clima */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span>Climatización & HVAC</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateToCatalog('clima', 'minisplit-inverter')} className="hover:text-white transition-colors">
                  Minisplits Inverter R-32
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('clima', 'vrf-multizona')} className="hover:text-white transition-colors">
                  Sistemas VRF Multizona
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('clima', 'paquetes-chillers')} className="hover:text-white transition-colors">
                  Manejadoras & Chillers
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('clima', 'termostatos-control')} className="hover:text-white transition-colors">
                  Termostatos Inteligentes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('clima')} className="text-[#20D4E8] hover:underline">
                  Ver catálogo de clima →
                </button>
              </li>
            </ul>
          </div>

          {/* Division 2: Seguridad */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span>Cámaras & CCTV</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateToCatalog('seguridad', 'camaras-ip-4k')} className="hover:text-white transition-colors">
                  Cámaras IP 4K ColorVu
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('seguridad', 'ptz-largodistancia')} className="hover:text-white transition-colors">
                  Dromos PTZ & Térmicas
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('seguridad', 'nvrs-grabadores')} className="hover:text-white transition-colors">
                  NVRs con IA de Rostros
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('seguridad', 'control-acceso')} className="hover:text-white transition-colors">
                  Control de Acceso Biométrico
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('seguridad')} className="text-[#087BFF] hover:underline">
                  Ver catálogo de seguridad →
                </button>
              </li>
            </ul>
          </div>

          {/* Division 3: Solar & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span>Energía Solar</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 mb-6">
              <li>
                <button onClick={() => navigateToCatalog('solar', 'paneles-monocristalinos')} className="hover:text-white transition-colors">
                  Módulos Tier-1 TOPCon
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('solar', 'inversores-hibridos')} className="hover:text-white transition-colors">
                  Inversores Híbridos
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('solar', 'microinversores')} className="hover:text-white transition-colors">
                  Microinversores Enphase
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCatalog('solar', 'almacenamiento-litio')} className="hover:text-white transition-colors">
                  Baterías LiFePO4
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Empresa
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={navigateToSolutions} className="hover:text-white transition-colors">
                  Soluciones Llave en Mano
                </button>
              </li>
              <li>
                <button onClick={navigateToContact} className="hover:text-white transition-colors">
                  Contacto & Sucursales
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Commercial Demo Disclaimer Callout */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 space-y-3">
          <div className="p-4 rounded-xl bg-[#102B4C]/40 border border-slate-800 text-slate-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#20D4E8] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white">Aviso de Demostración Comercial & Modelo Tecnológico:</strong> GENERGY SOLUTION es una tienda online desarrollada como prototipo interactivo de alta fidelidad para presentación comercial a clientes e inversionistas. Los modelos y marcas referenciados (Daikin, Hikvision, Huawei, Canadian Solar, Carrier, Axis) pertenecen a sus respectivos fabricantes. La arquitectura técnica está preparada para su posterior despliegue como tema independiente <code className="text-[#20D4E8]">genergy-solution</code> y plugin <code className="text-[#20D4E8]">genergy-catalog-manager</code> sobre WordPress y WooCommerce.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <div>
              © 2026 GENERGY SOLUTION. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Términos y Condiciones</span>
              <span>·</span>
              <span className="hover:text-slate-300 cursor-pointer">Aviso de Privacidad</span>
              <span>·</span>
              <span className="hover:text-slate-300 cursor-pointer">Políticas de Garantía</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
