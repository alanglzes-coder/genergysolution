import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  FileDown, 
  Share2, 
  MessageCircle, 
  Check, 
  Truck, 
  HelpCircle,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToCatalog,
    formatPrice,
    addToast,
    setIsQuoteModalOpen,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string>(
    selectedProduct?.gallery?.[0] || selectedProduct?.image || ''
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'warranty'>('specs');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Producto no seleccionado</h2>
        <button
          onClick={() => navigateToCatalog('all')}
          className="mt-4 px-4 py-2 bg-[#087BFF] text-white rounded-lg text-sm"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(selectedProduct.id);

  // Related products from the same division
  const relatedProducts = products
    .filter((p) => p.division === selectedProduct.division && p.id !== selectedProduct.id)
    .slice(0, 3);

  // WhatsApp prefilled message
  const whatsappUrl = `https://wa.me/5215515909699?text=${encodeURIComponent(
    `Hola GENERGY SOLUTION, me interesa cotizar el equipo: ${selectedProduct.brand} ${selectedProduct.model} (${selectedProduct.name}). SKU: ${selectedProduct.sku}. ¿Podrían enviarme disponibilidad y precio formal?`
  )}`;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Enlace Copiado', 'Enlace al producto copiado al portapapeles', 'info');
  };

  return (
    <div className="bg-[#F4F7FB] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button 
            onClick={() => navigateToCatalog('all')} 
            className="hover:text-[#087BFF] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catálogo</span>
          </button>
          <span>/</span>
          <button 
            onClick={() => navigateToCatalog(selectedProduct.division)}
            className="hover:text-[#087BFF] transition-colors capitalize font-medium"
          >
            {selectedProduct.division === 'clima' ? 'Climatización' : selectedProduct.division === 'seguridad' ? 'Videovigilancia' : 'Energía Solar'}
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{selectedProduct.brand} {selectedProduct.model}</span>
        </div>

        {/* Main Product Container: Sticky Gallery Left, Sticky Buy Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
              
              {/* Main Active Image with Zoom effect container */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#07182E]/5 border border-slate-100 flex items-center justify-center mb-4">
                <img
                  src={selectedImage || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-4 left-4 bg-[#07182E]/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {selectedProduct.brand} Oficial
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#07182E] text-[11px] font-semibold px-2.5 py-1 rounded shadow-xs">
                  Garantía: {selectedProduct.warrantyYears} años
                </div>
              </div>

              {/* Thumbnails */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                <div className="flex items-center gap-3">
                  {selectedProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all bg-slate-50 ${
                        (selectedImage === img || (!selectedImage && idx === 0))
                          ? 'border-[#087BFF] ring-2 ring-[#087BFF]/20'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Highlights list below image */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Características Principales
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProduct.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (PDP) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm sticky top-28 space-y-6">
              
              <div>
                {/* Brand & Sku */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#07182E] text-sm tracking-tight">{selectedProduct.brand}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-600">{selectedProduct.model}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">SKU: {selectedProduct.sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#07182E] tracking-tight leading-snug mb-3">
                  {selectedProduct.name}
                </h1>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>
              </div>

              {/* Pricing Box with Demo Label */}
              <div className="p-4 rounded-xl bg-[#F4F7FB] border border-slate-200/80">
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#07182E] tabular-nums">
                      {formatPrice(selectedProduct.priceMxn)}
                    </span>
                    {selectedProduct.regularPriceMxn && (
                      <span className="text-xs text-slate-400 line-through ml-2 tabular-nums">
                        {formatPrice(selectedProduct.regularPriceMxn)}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Disponible ({selectedProduct.stockUnits} unid.)
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Precio de referencia comercial sin IVA</span>
                  <span className="text-[#087BFF] font-medium">Facturación CFDI 4.0</span>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-[#07182E] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(selectedProduct, quantity)}
                    className="flex-1 py-3 px-5 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar a Cotización</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      isFavorited
                        ? 'border-red-300 bg-red-50 text-red-500'
                        : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                    title="Favoritos"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Direct WhatsApp Quote Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp con un Asesor Técnico</span>
                </a>

                {/* Express Project Quote */}
                <button
                  onClick={() => setIsQuoteModalOpen(true, { 
                    notes: `Solicitud de cotización formal para ${selectedProduct.name} (${selectedProduct.model}) - Cantidad estimada: ${quantity}` 
                  })}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#07182E] hover:bg-[#102B4C] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Solicitar Cotización Formal para Proyecto</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#087BFF]" />
                  <span>Envíos directos a obras y almacenes en todo México</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Garantía de {selectedProduct.warrantyYears} años directa con fabricante</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F5B82E]" />
                  <span>Certificación oficial NOM / UL / CE según normativa</span>
                </div>
              </div>

              {/* Share and Datasheet */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => addToast('Ficha Técnica', `Descarga de datasheet de ${selectedProduct.model} iniciada`, 'info')}
                  className="flex items-center gap-1.5 text-[#087BFF] hover:underline font-medium"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Descargar Ficha Técnica (PDF)</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-slate-800 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartir</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Tabs: Specifications, Description, Warranty */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs mb-16">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-sm font-bold tracking-tight transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Ficha Técnica & Especificaciones
            </button>
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2 text-sm font-bold tracking-tight transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Descripción de Ingeniería & Aplicaciones
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`pb-2 text-sm font-bold tracking-tight transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'warranty'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Garantía, Certificaciones & Normas
            </button>
          </div>

          {activeTab === 'specs' && (
            <div>
              <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {selectedProduct.specifications.map((spec, sIdx) => (
                      <tr key={sIdx} className={sIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="py-3 px-4 font-semibold text-slate-700 w-1/3 text-xs sm:text-sm">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-mono text-xs sm:text-sm">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
              <p>{selectedProduct.fullDescription}</p>
              <div className="p-4 bg-[#F4F7FB] rounded-xl border border-slate-200 mt-4">
                <h4 className="font-bold text-[#07182E] text-xs uppercase tracking-wide mb-2">
                  Recomendación del Equipo de Ingeniería GENERGY:
                </h4>
                <p className="text-xs text-slate-600">
                  Para obtener el máximo rendimiento y preservar la garantía directa del fabricante, se recomienda la instalación por personal certificado y el uso de accesorios dieléctricos e interruptores termomagnéticos normados.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <Award className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-bold">Garantía Certificada de {selectedProduct.warrantyYears} Años</div>
                  <div className="text-xs text-emerald-800">
                    Cubre defectos de manufactura, componentes electrónicos y reemplazo por diagnóstico técnico formal.
                  </div>
                </div>
              </div>
              <p className="leading-relaxed">
                Todos nuestros equipos cuentan con número de serie traceable y son importados conforme a las normas oficiales mexicanas vigentes (NOM, ANCE, NYCE).
              </p>
            </div>
          )}
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-[#07182E] mb-6 tracking-tight">
              Equipos Relacionados & Compatibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} compact />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
