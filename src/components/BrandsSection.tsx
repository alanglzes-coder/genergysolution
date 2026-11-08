import React from 'react';
import { ALL_BRANDS } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const BrandsSection: React.FC = () => {
  const { navigateToCatalog } = useStore();

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-1">
            Red de Fabricantes Globales
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#07182E] tracking-tight">
            Marcas Líderes Certificadas
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Garantías válidas directamente en México con soporte de fábrica.
          </p>
        </div>

        {/* Brands Grid with clean modern cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ALL_BRANDS.map((brand, idx) => (
            <button
              key={idx}
              onClick={() => {
                navigateToCatalog('all');
              }}
              className="group p-4 bg-[#F4F7FB] hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#087BFF] hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[90px]"
            >
              <div className="text-sm font-extrabold text-[#07182E] group-hover:text-[#087BFF] transition-colors tracking-tight">
                {brand.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {brand.division === 'clima' ? 'Climatización' : brand.division === 'seguridad' ? 'Seguridad' : 'Solar'} · {brand.country}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
