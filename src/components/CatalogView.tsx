import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Grid3X3, 
  Rows, 
  ChevronRight, 
  Flame, 
  Shield, 
  Sun, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ALL_BRANDS, DIVISIONS } from '../data/categories';
import { Division } from '../types';

export const CatalogView: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    navigateToProduct,
    formatPrice,
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Apply filters
  const filteredProducts = products.filter((product) => {
    // Division filter
    if (filters.division !== 'all' && product.division !== filters.division) {
      return false;
    }
    // Subcategory filter
    if (filters.category !== 'all' && product.subCategory !== filters.category) {
      return false;
    }
    // Brand filter
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }
    // Search query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchModel = product.model.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchModel && !matchSku) {
        return false;
      }
    }
    // Max price
    if (product.priceMxn > filters.maxPrice) {
      return false;
    }
    // In stock only
    if (filters.onlyInStock && !product.inStock) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.priceMxn - b.priceMxn;
    if (filters.sortBy === 'price-desc') return b.priceMxn - a.priceMxn;
    if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const availableBrands = filters.division === 'all'
    ? ALL_BRANDS
    : ALL_BRANDS.filter((b) => b.division === filters.division);

  return (
    <div className="bg-[#F4F7FB] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Inicio</span>
            <span>/</span>
            <span className="text-[#07182E] font-semibold">Catálogo General de Equipos</span>
            {filters.division !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#087BFF] font-semibold capitalize">
                  {filters.division === 'clima' ? 'Climatización' : filters.division === 'seguridad' ? 'Videovigilancia' : 'Energía Solar'}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07182E] tracking-tight">
                {filters.division === 'all'
                  ? 'Catálogo General de Tecnología'
                  : filters.division === 'clima'
                  ? 'Equipos de Aire Acondicionado & Climatización'
                  : filters.division === 'seguridad'
                  ? 'Cámaras de Seguridad & Videovigilancia IP'
                  : 'Paneles Solares & Sistemas Fotovoltaicos'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Catálogo de demostración comercial listo para cotizaciones formales y venta B2B.
              </p>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#07182E]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros y Categorías ({filteredProducts.length})</span>
            </button>
          </div>
        </div>

        {/* Division Quick Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, division: 'all', category: 'all' }))}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              filters.division === 'all'
                ? 'bg-[#07182E] text-white border-[#07182E] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold">Todas las Divisiones</div>
            <div className="text-[11px] opacity-75 mt-0.5">{products.length} productos</div>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, division: 'clima', category: 'all' }))}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              filters.division === 'clima'
                ? 'bg-[#07182E] text-white border-[#07182E] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#20D4E8]">
              <Flame className="w-3.5 h-3.5" />
              <span className={filters.division === 'clima' ? 'text-white' : 'text-[#07182E]'}>Climatización</span>
            </div>
            <div className="text-[11px] opacity-75 mt-0.5">Inverters & VRF</div>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, division: 'seguridad', category: 'all' }))}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              filters.division === 'seguridad'
                ? 'bg-[#07182E] text-white border-[#07182E] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#087BFF]">
              <Shield className="w-3.5 h-3.5" />
              <span className={filters.division === 'seguridad' ? 'text-white' : 'text-[#07182E]'}>Videovigilancia</span>
            </div>
            <div className="text-[11px] opacity-75 mt-0.5">Cámaras IP 4K & IA</div>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, division: 'solar', category: 'all' }))}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              filters.division === 'solar'
                ? 'bg-[#07182E] text-white border-[#07182E] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5B82E]">
              <Sun className="w-3.5 h-3.5" />
              <span className={filters.division === 'solar' ? 'text-white' : 'text-[#07182E]'}>Energía Solar</span>
            </div>
            <div className="text-[11px] opacity-75 mt-0.5">Módulos & Inversores</div>
          </button>
        </div>

        {/* Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-[#07182E]">
                  <Filter className="w-4 h-4 text-[#087BFF]" />
                  <span>Filtros Avanzados</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-500 hover:text-[#087BFF] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
              </div>

              {/* Keyword Search inside catalog */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Búsqueda por Modelo o Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filtrar catálogo..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full bg-[#F4F7FB] border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#087BFF]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Subcategories (if specific division selected) */}
              {filters.division !== 'all' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Subcategorías
                  </label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        filters.category === 'all'
                          ? 'bg-[#07182E] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Todas las subcategorías
                    </button>
                    {DIVISIONS[filters.division].subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setFilters((prev) => ({ ...prev, category: sub.id }))}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                          filters.category === sub.id
                            ? 'bg-[#07182E] text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{sub.name}</span>
                        <span className="text-[10px] opacity-70 ml-1">{sub.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Marcas Certificadas
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, brand: 'all' }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      filters.brand === 'all'
                        ? 'bg-[#07182E] text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Todas las marcas ({availableBrands.length})
                  </button>
                  {availableBrands.map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFilters((prev) => ({ ...prev, brand: b.name }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        filters.brand === b.name
                          ? 'bg-[#07182E] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Precio Máximo
                  </label>
                  <span className="text-xs font-mono font-bold text-[#087BFF]">
                    {formatPrice(filters.maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="120000"
                  step="2000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#087BFF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$3,000</span>
                  <span>$120,000+</span>
                </div>
              </div>

              {/* Stock only toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filters.onlyInStock}
                    onChange={(e) => setFilters((prev) => ({ ...prev, onlyInStock: e.target.checked }))}
                    className="rounded text-[#087BFF] focus:ring-0 w-4 h-4"
                  />
                  <span>Solo equipos con stock inmediato</span>
                </label>
              </div>

            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            
            {/* Toolbar: Count, Sorting, View mode */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-medium">
                Mostrando <strong className="text-[#07182E] font-bold">{sortedProducts.length}</strong> de {products.length} equipos certificados
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort selector */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="hidden sm:inline">Ordenar:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-[#F4F7FB] border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#07182E] focus:outline-hidden focus:border-[#087BFF]"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre A-Z</option>
                  </select>
                </div>

                {/* View switcher */}
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-[#07182E] shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                    title="Vista en cuadrícula"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-[#07182E] shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                    title="Vista en lista"
                  >
                    <Rows className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty state */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#07182E] mb-1">
                  No se encontraron productos con estos filtros
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Intenta ampliar tu rango de precios o limpiar la búsqueda para ver más modelos disponibles.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#087BFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0069dc]"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center justify-between"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full sm:w-36 h-36 object-cover rounded-lg border border-slate-100 bg-slate-50 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-bold text-[#07182E]">{product.brand}</span>
                        <span>·</span>
                        <span className="font-mono">{product.model}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-400">SKU: {product.sku}</span>
                      </div>

                      <h3
                        onClick={() => navigateToProduct(product)}
                        className="text-base font-bold text-[#07182E] hover:text-[#087BFF] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-3">
                        {product.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {product.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                          <span key={fIdx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:border-l sm:border-slate-100 sm:pl-5 flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-3">
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-extrabold text-[#07182E] tabular-nums">
                          {formatPrice(product.priceMxn)}
                        </div>
                        <div className="text-[10px] text-slate-400">Demostración comercial</div>
                      </div>

                      <button
                        onClick={() => navigateToProduct(product)}
                        className="px-4 py-2 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white text-xs font-semibold whitespace-nowrap transition-colors"
                      >
                        Ver detalles →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-2xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-sm text-[#07182E]">Filtros de Catálogo</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                {/* Brands in mobile */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-700 mb-2">Marcas</div>
                  <div className="space-y-1">
                    {availableBrands.map((b, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, brand: b.name }));
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-xs rounded ${filters.brand === b.name ? 'bg-[#07182E] text-white' : 'text-slate-700'}`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2 text-xs border border-slate-300 rounded-lg text-slate-700"
                >
                  Restablecer
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs bg-[#087BFF] text-white font-bold rounded-lg"
                >
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
