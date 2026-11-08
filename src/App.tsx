/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedCarousels } from './components/FeaturedCarousels';
import { SolutionsSection } from './components/SolutionsSection';
import { CommercialBenefits } from './components/CommercialBenefits';
import { BrandsSection } from './components/BrandsSection';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { SolutionsView } from './components/SolutionsView';
import { ContactView } from './components/ContactView';
import { CheckoutQuoteView } from './components/CheckoutQuoteView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WordPressMigrationModal } from './components/WordPressMigrationModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { view } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#07182E]">
      <Header />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedCarousels />
            <SolutionsSection />
            <CommercialBenefits />
            <BrandsSection />
          </>
        )}

        {view === 'catalog' && <CatalogView />}

        {view === 'product-detail' && <ProductDetailView />}

        {view === 'solutions' && <SolutionsView />}

        {view === 'contact' && <ContactView />}

        {view === 'checkout-quote' && <CheckoutQuoteView />}
      </main>

      <Footer />

      {/* Global Interactive Drawers, Modals & Floating Tools */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickQuoteModal />
      <QuickViewModal />
      <WordPressMigrationModal />
      <WhatsAppFloatingButton />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
