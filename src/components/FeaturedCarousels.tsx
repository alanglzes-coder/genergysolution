import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Division } from '../types';

export const FeaturedCarousels: React.FC = () => {
  const { products, navigateToCatalog } = useStore();
  const [activeTab, setActiveTab] = useState<Division | 'all'>('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((p) => p.division === activeTab);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, filteredProducts.length - itemsPerPage);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header with Title and Segmented Division Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-2">
              Equipos de Mayor Demanda
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182E] tracking-tight">
              Productos Destacados & Sistemas Clave
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#F4F7FB] rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => {
                setActiveTab('all');
                setCarouselIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#07182E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#07182E]'
              }`}
            >
              Todos ({products.length})
            </button>

            <button
              onClick={() => {
                setActiveTab('clima');
                setCarouselIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'clima'
                  ? 'bg-[#07182E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#07182E]'
              }`}
            >
              Climatización
            </button>

            <button
              onClick={() => {
                setActiveTab('seguridad');
                setCarouselIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'seguridad'
                  ? 'bg-[#07182E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#07182E]'
              }`}
            >
              Videovigilancia
            </button>

            <button
              onClick={() => {
                setActiveTab('solar');
                setCarouselIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'solar'
                  ? 'bg-[#07182E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#07182E]'
              }`}
            >
              Energía Solar
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Controls: Prev & Next buttons */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-500 font-medium">
              Mostrando {Math.min(filteredProducts.length, carouselIndex + 1)}–{Math.min(filteredProducts.length, carouselIndex + itemsPerPage)} de {filteredProducts.length} productos certificados
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={carouselIndex >= maxIndex}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid display of current carousel slice */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(carouselIndex, carouselIndex + itemsPerPage).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom Catalog Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateToCatalog(activeTab === 'all' ? 'all' : activeTab)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#07182E] hover:text-[#087BFF] transition-colors py-2 px-4 rounded-lg hover:bg-slate-50"
          >
            <span>Ver más productos en el catálogo de {activeTab === 'all' ? 'GENERGY SOLUTION' : activeTab}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
