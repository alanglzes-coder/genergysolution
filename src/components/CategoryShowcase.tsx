import React from 'react';
import { ArrowRight, Flame, Shield, Sun, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DIVISIONS } from '../data/categories';
import { Division } from '../types';

export const CategoryShowcase: React.FC = () => {
  const { navigateToCatalog } = useStore();

  const categories = [
    {
      ...DIVISIONS.clima,
      icon: Flame,
      gradient: 'from-[#07182E]/90 via-[#07182E]/50 to-transparent',
      borderColor: 'group-hover:border-[#20D4E8]',
      highlight: 'Inverter SEER hasta 22 & VRF Multizona',
      chips: ['Minisplits', 'VRF', 'Chillers', 'Termostatos'],
    },
    {
      ...DIVISIONS.seguridad,
      icon: Shield,
      gradient: 'from-[#07182E]/90 via-[#07182E]/50 to-transparent',
      borderColor: 'group-hover:border-[#087BFF]',
      highlight: 'ColorVu 4K & Reconocimiento Facial IA',
      chips: ['Cámaras IP 4K', 'NVRs', 'PTZ 360°', 'Control de Acceso'],
    },
    {
      ...DIVISIONS.solar,
      icon: Sun,
      gradient: 'from-[#07182E]/90 via-[#07182E]/50 to-transparent',
      borderColor: 'group-hover:border-[#F5B82E]',
      highlight: 'Paneles N-Type Tier-1 & Baterías Litio',
      chips: ['Módulos TOPCon', 'Inversores Híbridos', 'Microinversores', 'Baterías'],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F4F7FB]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-2">
              Divisiones Especializadas
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#07182E] tracking-tight">
              Tres grandes líneas tecnológicas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Arquitectura de equipos seleccionados para soportar operación continua con el más alto retorno de inversión.
            </p>
          </div>

          <button
            onClick={() => navigateToCatalog('all')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087BFF] hover:text-[#0069dc] group"
          >
            <span>Ver todo el catálogo unificado</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Large Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigateToCatalog(cat.id as Division)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
              >
                {/* Visual Imagery */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#07182E]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`}></div>

                  {/* Division Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#07182E]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-semibold">
                    <Icon className="w-4 h-4 text-white" style={{ color: cat.accentColor }} />
                    <span>{cat.shortTitle}</span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cat.accentColor }} />
                      <span>{cat.highlight}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-white">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Content & Subcategory links */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {cat.description}
                    </p>

                    {/* Subcategory tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cat.chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Marcas: {cat.featuredBrands.slice(0, 3).join(', ')}...
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#087BFF] group-hover:underline">
                      Explorar división →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
