import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Headphones, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { navigateToCatalog, setIsQuoteModalOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#07182E] text-white">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero_genergy_tech_1794103566606.jpg"
          alt="GENERGY SOLUTION - Sede Corporativa & Tecnologías Integradas"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182E] via-[#07182E]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182E] via-transparent to-[#07182E]/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Quiet kicker text without pill box */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#20D4E8] mb-4">
            <span>GENERGY SOLUTION</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>ECOMMERCE TECNOLÓGICO B2B & RESIDENCIAL</span>
          </div>

          {/* Main Title strictly matching user brief */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mb-6 text-balance">
            Tecnología que transforma espacios y protege tu futuro
          </h1>

          {/* Subtitle strictly matching user brief */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Climatización, seguridad y energía solar en un solo lugar.
          </p>

          <p className="text-sm sm:text-base text-slate-400 mb-10 leading-relaxed">
            Proveemos equipamiento de grado comercial e industrial con respaldo técnico directo de los fabricantes más respetados del mundo. Desde sistemas inverter de ultra alta eficiencia hasta videovigilancia 4K con IA y parques fotovoltaicos.
          </p>

          {/* Buttons: Explorar productos y Solicitar asesoría */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => navigateToCatalog('all')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white font-semibold text-sm transition-all shadow-lg shadow-[#087BFF]/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Explorar productos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-xs border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <span>Solicitar asesoría</span>
            </button>
          </div>

        </div>

        {/* 4-Column Proof Row below the hero headline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-8 border-t border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#102B4C] border border-slate-700 flex items-center justify-center shrink-0 text-[#20D4E8]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Garantía Directa</div>
              <div className="text-[11px] text-slate-400">Hasta 25 años con fabricantes</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#102B4C] border border-slate-700 flex items-center justify-center shrink-0 text-[#F5B82E]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Ingeniería Certificada</div>
              <div className="text-[11px] text-slate-400">Memorias de cálculo y diseño</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#102B4C] border border-slate-700 flex items-center justify-center shrink-0 text-[#087BFF]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Distribuidor Oficial</div>
              <div className="text-[11px] text-slate-400">Daikin, Hikvision, Huawei</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#102B4C] border border-slate-700 flex items-center justify-center shrink-0 text-[#20D4E8]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Soporte Continuo</div>
              <div className="text-[11px] text-slate-400">Asesoría post-venta 24/7</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
