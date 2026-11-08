import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, FileText, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartSubtotalMxn,
    cartTotalMxn,
    formatPrice,
    navigateToCheckoutQuote,
    navigateToCatalog,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#07182E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#20D4E8]" />
              <h2 className="text-base font-bold tracking-tight">
                Cotización / Carrito ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demo Disclaimer notice banner */}
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-start gap-2 text-amber-900 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              <strong>Modo Demostración Comercial:</strong> Los precios y existencias son de referencia para validación y cotización B2B.
            </span>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#07182E] mb-1">
                  Tu lista de cotización está vacía
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Explora las divisiones de Climatización, Seguridad y Paneles Solares para agregar equipos a tu cotización.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToCatalog('all');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#087BFF] text-white text-xs font-semibold hover:bg-[#0069dc] transition-colors"
                >
                  Explorar catálogo de productos
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-3 first:pt-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087BFF]">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs font-semibold text-[#07182E] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            SKU: {item.product.sku}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Eliminar de cotización"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:text-[#07182E] hover:bg-slate-200 rounded-l"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#07182E] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:text-[#07182E] hover:bg-slate-200 rounded-r"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-[#07182E] tabular-nums">
                            {formatPrice(item.product.priceMxn * item.quantity)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {formatPrice(item.product.priceMxn)} c/u
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#F4F7FB] border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal equipos</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {formatPrice(cartSubtotalMxn)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>IVA estimado (16%)</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {formatPrice(cartSubtotalMxn * 0.16)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#07182E]">
                  <span>Total estimado cotización</span>
                  <span className="text-base text-[#087BFF] tabular-nums">
                    {formatPrice(cartTotalMxn)}
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={navigateToCheckoutQuote}
                  className="w-full py-3 px-4 rounded-lg bg-[#07182E] hover:bg-[#102B4C] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#20D4E8]" />
                  <span>Generar Proforma Formal B2B</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-600 transition-colors"
                  >
                    Vaciar lista
                  </button>
                  <span>Envíos con seguro a todo México</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
