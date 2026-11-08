import React from 'react';
import { ShoppingCart, Eye, Heart, Check, FileText } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    setIsQuoteModalOpen,
    formatPrice,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#07182E]/5 overflow-hidden border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-red-50 text-red-500 shadow-xs'
              : 'bg-white/80 text-slate-600 hover:text-red-500 hover:bg-white shadow-2xs'
          }`}
          title={isFavorited ? 'Remover de favoritos' : 'Guardar en favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#07182E]/90 hover:bg-[#07182E] text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Rápida</span>
        </button>

        {/* Division Indicator subtle corner */}
        <div className="absolute top-2.5 left-2.5 bg-[#07182E]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
          {product.division === 'clima' ? 'Clima' : product.division === 'seguridad' ? 'Seguridad' : 'Solar'}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-bold text-[#07182E] tracking-tight">{product.brand}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono text-slate-600 text-[11px] truncate max-w-[130px]">{product.model}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigateToProduct(product)}
            className="text-sm font-semibold text-[#07182E] hover:text-[#087BFF] transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short specs bullet preview if not compact */}
          {!compact && product.keyFeatures && product.keyFeatures.length > 0 && (
            <ul className="space-y-1 mb-4 text-[11px] text-slate-600">
              {product.keyFeatures.slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price & Primary Action Area */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          
          <div className="mb-3">
            <div className="flex items-baseline justify-between gap-1">
              {product.isQuoteOnly ? (
                <div>
                  <span className="text-xs font-bold text-amber-700">Cotización bajo proyecto</span>
                  <div className="text-[10px] text-slate-400">Equipo industrial / B2B</div>
                </div>
              ) : (
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#07182E] tabular-nums">
                    {formatPrice(product.priceMxn)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Precio demo sin IVA · Entrega inmediata
                  </div>
                </div>
              )}

              {product.inStock ? (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  En stock ({product.stockUnits})
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  Bajo pedido
                </span>
              )}
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToProduct(product)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-semibold text-[#07182E] hover:bg-slate-50 transition-colors text-center"
            >
              Ver producto
            </button>

            {product.isQuoteOnly ? (
              <button
                onClick={() => setIsQuoteModalOpen(true, { notes: `Cotización requerida para modelo ${product.model} - ${product.name}` })}
                className="w-full py-2 px-2.5 rounded-lg bg-[#07182E] hover:bg-[#102B4C] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-[#20D4E8]" />
                <span className="truncate">Cotizar</span>
              </button>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-2 px-2.5 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="truncate">Cotizar / Agregar</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
