import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigateToProduct,
    formatPrice,
  } = useStore();

  if (!isWishlistOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#07182E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-current" />
              <h2 className="text-base font-bold tracking-tight">
                Lista de Favoritos ({favoritedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {favoritedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#07182E] mb-1">
                  Aún no tienes favoritos guardados
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Guarda productos con el icono de corazón para consultarlos rápidamente más tarde.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-[#087BFF] text-white text-xs font-semibold hover:bg-[#0069dc] transition-colors"
                >
                  Continuar navegando
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {favoritedProducts.map((product) => (
                  <div key={product.id} className="py-4 flex gap-3 first:pt-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0 cursor-pointer"
                      onClick={() => {
                        navigateToProduct(product);
                        setIsWishlistOpen(false);
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087BFF]">
                            {product.brand}
                          </span>
                          <h4 
                            onClick={() => {
                              navigateToProduct(product);
                              setIsWishlistOpen(false);
                            }}
                            className="text-xs font-semibold text-[#07182E] line-clamp-1 hover:text-[#087BFF] cursor-pointer"
                          >
                            {product.name}
                          </h4>
                        </div>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Eliminar de favoritos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs font-bold text-[#07182E] tabular-nums">
                          {formatPrice(product.priceMxn)}
                        </div>

                        <button
                          onClick={() => {
                            addToCart(product, 1);
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#07182E] hover:bg-[#087BFF] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Mover al carrito</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {favoritedProducts.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => {
                  favoritedProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#087BFF] hover:bg-[#0069dc] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Agregar todos a la cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
