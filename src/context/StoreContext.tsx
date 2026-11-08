import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ViewMode, FilterState, Division, QuoteRequest } from '../types';
import { DEMO_PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  view: ViewMode;
  selectedProduct: Product | null;
  filters: FilterState;
  currency: 'MXN' | 'USD';
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isQuoteModalOpen: boolean;
  isQuickViewModalOpen: boolean;
  quickViewProduct: Product | null;
  isMigrationModalOpen: boolean;
  quoteFormData: Partial<QuoteRequest>;
  toasts: ToastMessage[];

  // Actions
  setView: (view: ViewMode) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCatalog: (division?: Division | 'all', category?: string) => void;
  navigateToHome: () => void;
  navigateToSolutions: () => void;
  navigateToContact: () => void;
  navigateToCheckoutQuote: () => void;

  // Cart
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  cartTotalCount: number;
  cartSubtotalMxn: number;
  cartTotalMxn: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Controls
  setIsQuoteModalOpen: (open: boolean, initialData?: Partial<QuoteRequest>) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsMigrationModalOpen: (open: boolean) => void;
  setCurrency: (c: 'MXN' | 'USD') => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  formatPrice: (amountMxn: number) => string;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const initialFilters: FilterState = {
  division: 'all',
  category: 'all',
  brand: 'all',
  searchQuery: '',
  maxPrice: 150000,
  onlyInStock: false,
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [view, setView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(DEMO_PRODUCTS[0]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN');

  // Modals & drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState<Partial<QuoteRequest>>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart state initialized with demo items
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('genergy_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { product: DEMO_PRODUCTS[0], quantity: 1 },
      { product: DEMO_PRODUCTS[4], quantity: 2 },
    ];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('genergy_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [DEMO_PRODUCTS[0].id, DEMO_PRODUCTS[8].id];
  });

  useEffect(() => {
    try {
      localStorage.setItem('genergy_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('genergy_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigations
  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCatalog = (division: Division | 'all' = 'all', category: string = 'all') => {
    setFilters((prev) => ({
      ...prev,
      division,
      category,
      searchQuery: '',
    }));
    setView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSolutions = () => {
    setView('solutions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCheckoutQuote = () => {
    setView('checkout-quote');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast('Producto Agregado', `${product.name} añadido a tu cotización`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Producto Removido', 'Elemento eliminado de la cotización', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const p = products.find((x) => x.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Favoritos', `${p?.name || 'Producto'} removido de favoritos`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Favoritos Guardado', `${p?.name || 'Producto'} añadido a favoritos`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Modals
  const handleOpenQuoteModal = (open: boolean, initialData?: Partial<QuoteRequest>) => {
    if (initialData) setQuoteFormData(initialData);
    setIsQuoteModalOpen(open);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewModalOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewModalOpen(false);
    setQuickViewProduct(null);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalMxn = cart.reduce((sum, item) => sum + item.product.priceMxn * item.quantity, 0);
  const cartTotalMxn = cartSubtotalMxn * 1.16; // Con IVA 16% comercial

  const formatPrice = (amountMxn: number) => {
    if (currency === 'USD') {
      const amountUsd = amountMxn / 20.0;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(amountUsd) + ' USD';
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(amountMxn) + ' MXN';
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        view,
        selectedProduct,
        filters,
        currency,
        isCartOpen,
        isWishlistOpen,
        isQuoteModalOpen,
        isQuickViewModalOpen,
        quickViewProduct,
        isMigrationModalOpen,
        quoteFormData,
        toasts,
        setView,
        navigateToProduct,
        navigateToCatalog,
        navigateToHome,
        navigateToSolutions,
        navigateToContact,
        navigateToCheckoutQuote,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setIsCartOpen,
        cartTotalCount,
        cartSubtotalMxn,
        cartTotalMxn,
        toggleWishlist,
        isInWishlist,
        setIsWishlistOpen,
        setIsQuoteModalOpen: handleOpenQuoteModal,
        openQuickView,
        closeQuickView,
        setIsMigrationModalOpen,
        setCurrency,
        setFilters,
        resetFilters,
        formatPrice,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
