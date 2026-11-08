import React from 'react';
import { Building2, Home, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Sliders } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SolutionsSection: React.FC = () => {
  const { setIsQuoteModalOpen, navigateToCatalog } = useStore();

  const packages = [
    {
      type: 'residencial',
      icon: Home,
      badge: 'Solución Residencial Premium',
      title: 'Hogar Inteligente, Seguro y Autosuficiente',
      description: 'Integración completa para residencias de alto nivel. Minisplits Inverter silenciosos, sistema solar con inversor híbrido para cero factura eléctrica y videovigilancia 4K perimetral.',
      points: [
        'Ahorro de hasta 95% en recibo de luz CFE tarifa DAC',
        'Climatización silenciosa multizona con control móvil',
        'Cámaras ColorVu 4K con disuasión activa de intrusos',
        'Respaldo con batería LiFePO4 ante apagones',
      ],
      ctaText: 'Cotizar Proyecto Residencial',
      accentColor: '#20D4E8',
    },
    {
      type: 'empresarial',
      icon: Building2,
      badge: 'Solución Corporativa & B2B',
      title: 'Eficiencia Operativa e Infraestructura Crítica',
      description: 'Ingeniería llave en mano para corporativos, hoteles, naves industriales y centros de distribución. Sistemas VRF de alta capacidad, NVRs empresariales y parques solares de autoconsumo.',
      points: [
        'Deducibilidad fiscal inmediata 100% en energía renovable (Art. 34 LISR)',
        'Circuito cerrado CCTV con IA, control de acceso y lectura vehicular LPR',
        'Sistemas VRF con recuperación de calor y monitoreo BACnet',
        'Contratos de mantenimiento preventivo y SLA 24/7 garantizado',
      ],
      ctaText: 'Solicitar Asesoría de Ingeniería B2B',
      accentColor: '#087BFF',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#07182E] text-white relative overflow-hidden">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#20D4E8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#20D4E8] mb-2">
            Proyectos Integrales Llave en Mano
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Soluciones Residenciales y Empresariales
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            No solo vendemos equipos: diseñamos la arquitectura técnica completa, realizamos memorias de cálculo, gestionamos trámites de interconexión y ejecutamos instalaciones certificadas.
          </p>
        </div>

        {/* Feature Highlight Banner with the Industrial B2B generated image */}
        <div className="mb-14 rounded-2xl overflow-hidden bg-[#102B4C] border border-slate-700/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/assets/images/solutions_b2b_industrial_1794103568311.jpg"
              alt="Planta Comercial e Industrial GENERGY SOLUTION"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#102B4C]/90 lg:to-[#102B4C]"></div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5B82E] uppercase tracking-wide mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Ingeniería & Especificación Técnica</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                ¿Desarrollas una nave, corporativo o proyecto residencial de lujo?
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Nuestro departamento técnico valida compatibilidad entre sistemas de climatización VRF, cálculo fotovoltaico para absorción de carga base y topología de red para cámaras IP 4K de alto tráfico sin saturar tu infraestructura IT.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/60 mb-6">
                <div>
                  <div className="text-lg font-extrabold text-[#20D4E8] tabular-nums">0% Costo</div>
                  <div className="text-xs text-slate-400">Levantamiento inicial preliminar</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#087BFF] tabular-nums">100% CFE</div>
                  <div className="text-xs text-slate-400">Gestión de trámite interconexión</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#F5B82E] tabular-nums">NOM / Retie</div>
                  <div className="text-xs text-slate-400">Normativa eléctrica vigente</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true, { projectType: 'comercial' })}
                className="px-6 py-3 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Solicitar Cotización de Proyecto
              </button>
              <button
                onClick={() => navigateToCatalog('all')}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
              >
                Explorar Equipos
              </button>
            </div>
          </div>

        </div>

        {/* 2 Focused Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <div
                key={idx}
                className="bg-[#102B4C]/70 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-slate-700/80 flex flex-col justify-between hover:border-slate-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#07182E] border border-slate-700 flex items-center justify-center text-white" style={{ color: pkg.accentColor }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-[#07182E] px-3 py-1 rounded-full border border-slate-700">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {pkg.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#20D4E8] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsQuoteModalOpen(true, { projectType: pkg.type as any })}
                  className="w-full py-3 px-4 rounded-lg bg-[#07182E] hover:bg-[#087BFF] text-white text-xs font-bold uppercase tracking-wider border border-slate-600 hover:border-[#087BFF] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
