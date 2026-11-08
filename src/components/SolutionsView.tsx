import React from 'react';
import { 
  Building2, 
  Home, 
  Factory, 
  CheckCircle, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Compass,
  FileCheck2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SolutionsView: React.FC = () => {
  const { setIsQuoteModalOpen, navigateToCatalog } = useStore();

  const steps = [
    {
      step: '01',
      title: 'Diagnóstico & Levantamiento Técnico',
      desc: 'Inspección en sitio o análisis de planos arquitectónicos para determinar cargas térmicas, orientación solar y puntos de vigilancia perimetral.',
    },
    {
      step: '02',
      title: 'Ingeniería de Detalle & Memoria',
      desc: 'Cálculo de SEER, balances fotovoltaicos en software PVsyst y diagramas unifilares conforme a las normas NOM-001-SEDE vigentes.',
    },
    {
      step: '03',
      title: 'Suministro Oficial de Equipos',
      desc: 'Despacho directo de fábrica con números de serie registrados para garantía oficial y trazabilidad ante aseguradoras.',
    },
    {
      step: '04',
      title: 'Instalación & Comisionamiento',
      desc: 'Técnicos certificados ejecutan vacío de líneas de refrigerante, pruebas de aislamiento dieléctrico y configuración de red CCTV.',
    },
    {
      step: '05',
      title: 'Póliza & Mantenimiento Preventivo',
      desc: 'Monitoreo continuo remoto y contratos de mantenimiento semestral para asegurar máxima vida útil y eficiencia.',
    },
  ];

  return (
    <div className="bg-[#F4F7FB] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Hero Banner for Solutions */}
        <div className="rounded-2xl overflow-hidden bg-[#07182E] text-white p-8 sm:p-12 lg:p-16 mb-12 relative">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/assets/images/solutions_b2b_industrial_1794103568311.jpg"
              alt="Instalaciones Industriales"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20D4E8] mb-3">
              División de Proyectos de Ingeniería
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-balance">
              Soluciones Llave en Mano para Residencias y Empresas
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Integramos climatización inteligente de alta eficiencia, seguridad electrónica avanzada con Inteligencia Artificial y parques solares de generación distribuida.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true, { projectType: 'comercial' })}
                className="px-6 py-3 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Solicitar Levantamiento en Sitio
              </button>
              <button
                onClick={() => navigateToCatalog('all')}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all"
              >
                Ver Catálogo de Equipos
              </button>
            </div>
          </div>
        </div>

        {/* 3 Main Target Verticals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#20D4E8] flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-[#07182E]" />
              </div>
              <h3 className="text-lg font-bold text-[#07182E] mb-2">
                Residencial de Alta Gama
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Confort total y discreción visual para residencias de lujo. Minisplits Inverter con flujo silencioso, paneles solares all-black de máxima estética e integración de cámaras ColorVu perimetrales.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eliminación de tarifa DAC de CFE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Control de clima vía App móvil y voz</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Batería de respaldo ante apagones</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true, { projectType: 'residencial' })}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:border-[#087BFF] text-xs font-bold text-[#07182E] hover:text-[#087BFF] transition-colors"
            >
              Cotizar Paquete Residencial
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#087BFF] flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-[#087BFF]" />
              </div>
              <h3 className="text-lg font-bold text-[#07182E] mb-2">
                Comercial & Corporativo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Edificios de oficinas, consultorios, retail y hotelería. Sistemas VRF multizona, control de acceso vehicular por lectura de placas y analítica de flujo de clientes con IA.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Monitoreo centralizado multizona</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Detección de intrusión sin falsas alarmas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Retorno de inversión solar de 2.5 a 4 años</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true, { projectType: 'comercial' })}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:border-[#087BFF] text-xs font-bold text-[#07182E] hover:text-[#087BFF] transition-colors"
            >
              Cotizar Solución Comercial
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F5B82E] flex items-center justify-center mb-6">
                <Factory className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[#07182E] mb-2">
                Industrial & Centros Logísticos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Naves de almacenamiento, manufactura y centros de datos. Enfriamiento de precisión, perímetros térmicos de largo alcance y generación fotovoltaica en media tensión.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cámaras térmicas para prevención de incendios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cumplimiento con Código de Red 2.0</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% deducible de impuestos el primer año</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true, { projectType: 'industrial' })}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:border-[#087BFF] text-xs font-bold text-[#07182E] hover:text-[#087BFF] transition-colors"
            >
              Cotizar Proyecto Industrial
            </button>
          </div>

        </div>

        {/* Methodology: 5-step process */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-2xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-2">
              Metodología de Ingeniería
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182E] tracking-tight">
              ¿Cómo desarrollamos tu proyecto?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Proceso estructurado para evitar sobrecostos, fallas de compatibilidad o retrasos en obra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="relative">
                <div className="text-3xl font-black text-[#087BFF]/20 mb-2 font-mono">
                  {st.step}
                </div>
                <h4 className="text-sm font-bold text-[#07182E] mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
