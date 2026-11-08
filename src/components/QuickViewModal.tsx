import React from 'react';
import { X, ShoppingCart, Heart, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    isQuickViewModalOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
    formatPrice,
  } = useStore();

  if (!isQuickViewModalOpen || !quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image */}
            <div className="relative aspect-4/3 md:aspect-auto h-full bg-[#07182E]/5 overflow-hidden">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#07182E]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {quickViewProduct.brand}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-500 font-mono mb-1">
                  SKU: {quickViewProduct.sku} · {quickViewProduct.model}
                </div>

                <h3 className="text-lg font-bold text-[#07182E] leading-snug mb-2">
                  {quickViewProduct.name}
                </h3>

                <div className="text-xl font-black text-[#087BFF] tabular-nums mb-3">
                  {formatPrice(quickViewProduct.priceMxn)}
                  <span className="text-xs text-slate-400 font-normal ml-2">demo</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>

                <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                  {quickViewProduct.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      closeQuickView();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar a Cotización</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      isFavorited ? 'border-red-300 bg-red-50 text-red-500' : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    closeQuickView();
                    navigateToProduct(quickViewProduct);
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-600 hover:text-[#087BFF] flex items-center justify-center gap-1"
                >
                  <span>Ver Ficha Técnica Completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
