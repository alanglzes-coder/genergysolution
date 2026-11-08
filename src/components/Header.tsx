import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Phone, 
  ChevronDown, 
  FileText, 
  Menu, 
  X, 
  ExternalLink,
  Flame,
  Shield,
  Sun,
  Layers,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DIVISIONS } from '../data/categories';
import { Division, Product } from '../types';

export const Header: React.FC = () => {
  const {
    products,
    cartTotalCount,
    cartSubtotalMxn,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsQuoteModalOpen,
    setIsMigrationModalOpen,
    navigateToHome,
    navigateToCatalog,
    navigateToProduct,
    navigateToSolutions,
    navigateToContact,
    formatPrice,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<Division | 'all' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtered products for live search preview
  const searchResults: Product[] = searchQuery.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToCatalog('all');
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Bar Announcement / Tech & Support Channel */}
      <div className="bg-[#07182E] text-slate-300 text-xs px-4 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-[#20D4E8]"></span>
              Centro de Ingeniería & Distribución Tecnológica
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              · Envíos con cobertura a todo México
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              · Soporte técnico certificado B2B & Residencial
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Currency selector */}
            <div className="flex items-center bg-[#102B4C] rounded px-2 py-0.5 text-[11px] font-semibold text-slate-200">
              <button 
                onClick={() => setCurrency('MXN')}
                className={`px-1.5 py-0.5 rounded transition-colors ${currency === 'MXN' ? 'bg-[#087BFF] text-white' : 'hover:text-white'}`}
              >
                MXN
              </button>
              <span className="text-slate-500 mx-1">|</span>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded transition-colors ${currency === 'USD' ? 'bg-[#087BFF] text-white' : 'hover:text-white'}`}
              >
                USD
              </button>
            </div>

            {/* Direct Tech Support Phone */}
            <a 
              href="tel:+525584219000" 
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#20D4E8]" />
              <span>(55) 1590-9699</span>
            </a>

            {/* WordPress / WooCommerce Architecture Visualizer Trigger */}
            <button
              onClick={() => setIsMigrationModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#F5B82E] hover:text-[#f8c95a] transition-colors"
              title="Ver arquitectura para WooCommerce & WordPress"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>WooCommerce Ready</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Search, User, Wishlist, Cart */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo */}
          <button 
            onClick={navigateToHome}
            className="flex items-center gap-3 shrink-0 text-left focus-visible:outline-hidden group"
          >
            <img 
              src="/assets/aistudio/LOGO_GENERGY_HOR_2a5ceb1a.png" 
              alt="GENERGY SOLUTION" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Search Bar with live autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar por equipo, modelo, marca o SKU (ej. Daikin 18K, Hikvision 4K, Huawei 5kW)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#F4F7FB] border border-slate-300 hover:border-slate-400 focus:border-[#087BFF] focus:bg-white focus:outline-hidden rounded-lg pl-10 pr-24 py-2.5 text-sm text-[#07182E] transition-all placeholder:text-slate-500 shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-xs px-1"
                >
                  Limpiar
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#07182E] hover:bg-[#102B4C] text-white text-xs font-semibold rounded-md transition-colors"
              >
                Buscar
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Productos encontrados ({searchResults.length})</span>
                  <span className="text-[11px] text-[#087BFF]">Demostración de catálogo</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigateToProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-[#F4F7FB] cursor-pointer transition-colors"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded border border-slate-200 bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold text-[#07182E]">{item.brand}</span>
                          <span>·</span>
                          <span className="font-mono">{item.model}</span>
                        </div>
                        <h4 className="text-sm font-medium text-[#07182E] truncate">{item.name}</h4>
                        <div className="text-xs font-semibold text-[#087BFF] mt-0.5">
                          {formatPrice(item.priceMxn)}
                          <span className="text-[10px] font-normal text-slate-500 ml-1.5">demo</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigateToCatalog('all');
                    setIsSearchFocused(false);
                  }}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-center text-[#087BFF] transition-colors border-t border-slate-100"
                >
                  Ver todos los resultados en el catálogo →
                </button>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cotizador B2B Express Button */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cotizador B2B</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-lg text-slate-700 hover:text-[#07182E] hover:bg-slate-100 transition-colors"
              title="Lista de Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#087BFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart / Quotation Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07182E] hover:bg-[#102B4C] text-white transition-colors shadow-xs"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#F5B82E] text-[#07182E] text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-slate-300">Cotización</span>
                <span className="text-xs font-bold text-white mt-0.5">
                  {formatPrice(cartSubtotalMxn)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Bar: Divisions Megamenus & Navigation Links */}
      <nav className="hidden md:block bg-[#102B4C] text-white border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            
            <div className="flex items-center">
              {/* Category 1: Climatización */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegamenu('clima')}
                onMouseLeave={() => setActiveMegamenu(null)}
              >
                <button
                  onClick={() => navigateToCatalog('clima')}
                  className={`flex items-center gap-1.5 px-4 py-3 font-semibold text-xs tracking-wide uppercase transition-colors border-b-2 ${
                    activeMegamenu === 'clima' ? 'border-[#20D4E8] text-[#20D4E8] bg-[#07182E]' : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#20D4E8]" />
                  <span>Climatización & HVAC</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Megamenu Clima */}
                {activeMegamenu === 'clima' && (
                  <div className="absolute left-0 top-full w-[600px] bg-white text-[#07182E] shadow-2xl rounded-b-xl border border-slate-200 p-6 z-50 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Subcategorías de Climatización
                        </div>
                        <ul className="space-y-2.5">
                          {DIVISIONS.clima.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <button
                                onClick={() => {
                                  navigateToCatalog('clima', sub.id);
                                  setActiveMegamenu(null);
                                }}
                                className="text-left group flex items-start justify-between w-full hover:text-[#087BFF]"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-[#087BFF] transition-colors">
                                    {sub.name}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1">{sub.description}</p>
                                </div>
                                <span className="text-[11px] text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 ml-2 font-mono shrink-0">
                                  {sub.count}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F4F7FB] p-4 rounded-lg flex flex-col justify-between border border-slate-200/80">
                        <div>
                          <span className="text-[11px] font-bold text-[#087BFF] uppercase tracking-wider">Marcas Representadas</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {DIVISIONS.clima.featuredBrands.map((b) => (
                              <span key={b} className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-700 font-medium">
                                {b}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                            Cálculo de cargas térmicas para proyectos residenciales, consultorios y edificios comerciales.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            navigateToCatalog('clima');
                            setActiveMegamenu(null);
                          }}
                          className="mt-4 text-xs font-bold text-white bg-[#07182E] hover:bg-[#087BFF] py-2 px-3 rounded transition-colors text-center"
                        >
                          Ver todos los equipos de Clima →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Category 2: Cámaras & Seguridad */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegamenu('seguridad')}
                onMouseLeave={() => setActiveMegamenu(null)}
              >
                <button
                  onClick={() => navigateToCatalog('seguridad')}
                  className={`flex items-center gap-1.5 px-4 py-3 font-semibold text-xs tracking-wide uppercase transition-colors border-b-2 ${
                    activeMegamenu === 'seguridad' ? 'border-[#087BFF] text-[#087BFF] bg-[#07182E]' : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-[#087BFF]" />
                  <span>Seguridad & Videovigilancia</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Megamenu Seguridad */}
                {activeMegamenu === 'seguridad' && (
                  <div className="absolute left-0 top-full w-[600px] bg-white text-[#07182E] shadow-2xl rounded-b-xl border border-slate-200 p-6 z-50 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Sistemas de Videovigilancia
                        </div>
                        <ul className="space-y-2.5">
                          {DIVISIONS.seguridad.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <button
                                onClick={() => {
                                  navigateToCatalog('seguridad', sub.id);
                                  setActiveMegamenu(null);
                                }}
                                className="text-left group flex items-start justify-between w-full hover:text-[#087BFF]"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-[#087BFF] transition-colors">
                                    {sub.name}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1">{sub.description}</p>
                                </div>
                                <span className="text-[11px] text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 ml-2 font-mono shrink-0">
                                  {sub.count}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F4F7FB] p-4 rounded-lg flex flex-col justify-between border border-slate-200/80">
                        <div>
                          <span className="text-[11px] font-bold text-[#087BFF] uppercase tracking-wider">Marcas Autorizadas</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {DIVISIONS.seguridad.featuredBrands.map((b) => (
                              <span key={b} className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-700 font-medium">
                                {b}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                            CCTV IP con reconocimiento facial forense, lectura de placas y protección perimetral activa.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            navigateToCatalog('seguridad');
                            setActiveMegamenu(null);
                          }}
                          className="mt-4 text-xs font-bold text-white bg-[#07182E] hover:bg-[#087BFF] py-2 px-3 rounded transition-colors text-center"
                        >
                          Ver catálogo de Seguridad →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Category 3: Paneles Solares */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegamenu('solar')}
                onMouseLeave={() => setActiveMegamenu(null)}
              >
                <button
                  onClick={() => navigateToCatalog('solar')}
                  className={`flex items-center gap-1.5 px-4 py-3 font-semibold text-xs tracking-wide uppercase transition-colors border-b-2 ${
                    activeMegamenu === 'solar' ? 'border-[#F5B82E] text-[#F5B82E] bg-[#07182E]' : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[#F5B82E]" />
                  <span>Energía Solar Fotovoltaica</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Megamenu Solar */}
                {activeMegamenu === 'solar' && (
                  <div className="absolute left-0 top-full w-[600px] bg-white text-[#07182E] shadow-2xl rounded-b-xl border border-slate-200 p-6 z-50 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Tecnología Fotovoltaica
                        </div>
                        <ul className="space-y-2.5">
                          {DIVISIONS.solar.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <button
                                onClick={() => {
                                  navigateToCatalog('solar', sub.id);
                                  setActiveMegamenu(null);
                                }}
                                className="text-left group flex items-start justify-between w-full hover:text-[#087BFF]"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-[#087BFF] transition-colors">
                                    {sub.name}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1">{sub.description}</p>
                                </div>
                                <span className="text-[11px] text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 ml-2 font-mono shrink-0">
                                  {sub.count}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F4F7FB] p-4 rounded-lg flex flex-col justify-between border border-slate-200/80">
                        <div>
                          <span className="text-[11px] font-bold text-[#F5B82E] uppercase tracking-wider">Fabricantes Tier-1</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {DIVISIONS.solar.featuredBrands.map((b) => (
                              <span key={b} className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-700 font-medium">
                                {b}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                            Interconexión a CFE, sistemas aislados y almacenamiento con baterías inteligentes de litio.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            navigateToCatalog('solar');
                            setActiveMegamenu(null);
                          }}
                          className="mt-4 text-xs font-bold text-white bg-[#07182E] hover:bg-[#F5B82E] hover:text-[#07182E] py-2 px-3 rounded transition-colors text-center"
                        >
                          Ver equipos Solares →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Complete Catalog Link */}
              <button
                onClick={() => navigateToCatalog('all')}
                className="flex items-center gap-1 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Todo el Catálogo</span>
              </button>
            </div>

            {/* Right Quick Links */}
            <div className="flex items-center gap-1 text-xs font-medium">
              <button
                onClick={navigateToSolutions}
                className="px-3 py-3 text-slate-300 hover:text-white transition-colors"
              >
                Soluciones B2B & Residenciales
              </button>
              <button
                onClick={navigateToContact}
                className="px-3 py-3 text-slate-300 hover:text-white transition-colors"
              >
                Contacto & Asesoría
              </button>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-3 py-1.5 my-1 ml-2 bg-[#087BFF] hover:bg-[#0069dc] text-white font-semibold rounded transition-colors"
              >
                Cotizar Proyecto
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#07182E] text-white p-4 border-t border-slate-800 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#102B4C] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-1 pt-2">
            <button
              onClick={() => {
                navigateToCatalog('all');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10"
            >
              Ver Catálogo Completo
            </button>
            <button
              onClick={() => {
                navigateToCatalog('clima');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10 flex items-center gap-2 text-[#20D4E8]"
            >
              <Flame className="w-4 h-4" /> Climatización & HVAC
            </button>
            <button
              onClick={() => {
                navigateToCatalog('seguridad');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10 flex items-center gap-2 text-[#087BFF]"
            >
              <Shield className="w-4 h-4" /> Seguridad & Videovigilancia
            </button>
            <button
              onClick={() => {
                navigateToCatalog('solar');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10 flex items-center gap-2 text-[#F5B82E]"
            >
              <Sun className="w-4 h-4" /> Paneles Solares
            </button>
            <button
              onClick={() => {
                navigateToSolutions();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10"
            >
              Soluciones Llave en Mano
            </button>
            <button
              onClick={() => {
                navigateToContact();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold rounded hover:bg-white/10"
            >
              Contacto & Sucursales
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMigrationModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-[#F5B82E] font-medium flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Arquitectura WordPress
            </button>
            <button
              onClick={() => {
                setIsQuoteModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold bg-[#087BFF] text-white px-3 py-1.5 rounded"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
