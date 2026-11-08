import React, { useState } from 'react';
import { X, Sparkles, Code, CheckCircle2, Copy, Download, Layers } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DEMO_PRODUCTS } from '../data/products';

export const WordPressMigrationModal: React.FC = () => {
  const { isMigrationModalOpen, setIsMigrationModalOpen, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'architecture' | 'plugin' | 'export'>('architecture');

  if (!isMigrationModalOpen) return null;

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    addToast('Código Copiado', 'Fragmento copiado al portapapeles', 'info');
  };

  const samplePluginPhp = `<?php
/**
 * Plugin Name: GENERGY Catalog Manager
 * Plugin URI: https://genergysolution.com/plugins/genergy-catalog-manager
 * Description: Administrador de catálogo especializado para Climatización, CCTV y Paneles Solares con sincronización WooCommerce y pasarela de cotización B2B.
 * Version: 1.0.0
 * Author: GENERGY SOLUTION Engineering Team
 * Text Domain: genergy-catalog
 */

if (!defined('ABSPATH')) exit;

class Genergy_Catalog_Manager {
    public function __construct() {
        add_action('init', array($this, 'register_divisions_taxonomy'));
        add_filter('woocommerce_product_data_tabs', array($this, 'add_technical_specs_tab'));
        add_action('woocommerce_process_product_meta', array($this, 'save_technical_specs_meta'));
    }

    public function register_divisions_taxonomy() {
        register_taxonomy('genergy_division', 'product', array(
            'label' => __('División Tecnológica', 'genergy-catalog'),
            'hierarchical' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'division'),
        ));
    }
}

new Genergy_Catalog_Manager();
`;

  const downloadWpJson = () => {
    const exportData = {
      generator: 'GENERGY SOLUTION Architecture Exporter v1.0',
      exportedAt: new Date().toISOString(),
      targetPlatform: 'WordPress + WooCommerce',
      theme: 'genergy-solution',
      plugin: 'genergy-catalog-manager',
      divisions: ['climatizacion', 'videovigilancia', 'energia-solar'],
      products: DEMO_PRODUCTS.map((p) => ({
        sku: p.sku,
        name: p.name,
        brand: p.brand,
        model: p.model,
        division: p.division,
        regular_price: p.regularPriceMxn || p.priceMxn,
        sale_price: p.priceMxn,
        stock_status: p.inStock ? 'instock' : 'onbackorder',
        stock_quantity: p.stockUnits,
        attributes: p.specifications.map((s) => ({
          name: s.label,
          options: [s.value],
          visible: true,
          variation: false,
        })),
        meta_data: [
          { key: '_genergy_model', value: p.model },
          { key: '_genergy_warranty_years', value: p.warrantyYears },
          { key: '_genergy_quote_only', value: p.isQuoteOnly ? 'yes' : 'no' },
        ],
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'genergy_woocommerce_import_schema.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Archivo Generado', 'Esquema de importación JSON WooCommerce descargado', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsMigrationModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#07182E] text-white p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5B82E] uppercase tracking-wide mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Arquitectura Técnica de Migración</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Preparado para WordPress & WooCommerce
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Esta tienda fue programada siguiendo fielmente el modelo de datos de WooCommerce y la jerarquía de plantillas de WordPress para una transición transparente.
              </p>
            </div>

            <button
              onClick={() => setIsMigrationModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`py-2 px-3 border-b-2 transition-colors ${
                activeTab === 'architecture'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Estructura Tema & Plugin
            </button>
            <button
              onClick={() => setActiveTab('plugin')}
              className={`py-2 px-3 border-b-2 transition-colors ${
                activeTab === 'plugin'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Código Plugin genergy-catalog-manager
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-2 px-3 border-b-2 transition-colors ${
                activeTab === 'export'
                  ? 'border-[#087BFF] text-[#087BFF]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Exportar Datos WooCommerce JSON
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            
            {activeTab === 'architecture' && (
              <div className="space-y-6 text-xs text-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Theme Box */}
                  <div className="bg-[#F4F7FB] p-5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#07182E] mb-2">
                      <Layers className="w-4 h-4 text-[#087BFF]" />
                      <span>Tema: wp-content/themes/genergy-solution/</span>
                    </div>
                    <p className="text-slate-600 mb-3">
                      Plantillas PHP con Tailwind compilado, compatibles con Gutenberg y bloques FSE:
                    </p>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                      <li>├── style.css (Metadata del tema)</li>
                      <li>├── functions.php (Enqueues y hooks)</li>
                      <li>├── header.php (Barra sticky, megamenús)</li>
                      <li>├── footer.php (Pie corporativo y legal)</li>
                      <li>├── front-page.php (Home impactante)</li>
                      <li>├── woocommerce/</li>
                      <li>│   ├── archive-product.php (Catálogo con filtros)</li>
                      <li>│   └── single-product.php (PDP con cotizador)</li>
                    </ul>
                  </div>

                  {/* Plugin Box */}
                  <div className="bg-[#F4F7FB] p-5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#07182E] mb-2">
                      <Code className="w-4 h-4 text-emerald-600" />
                      <span>Plugin: genergy-catalog-manager/</span>
                    </div>
                    <p className="text-slate-600 mb-3">
                      Módulo independiente para mantener la lógica comercial desacoplada del diseño:
                    </p>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                      <li>├── genergy-catalog-manager.php</li>
                      <li>├── includes/</li>
                      <li>│   ├── class-b2b-quote-engine.php</li>
                      <li>│   ├── class-syscom-sync-adapter.php</li>
                      <li>│   ├── class-technical-specs-meta.php</li>
                      <li>│   └── class-whatsapp-api.php</li>
                      <li>└── templates/</li>
                      <li>    └── proforma-pdf-template.php</li>
                    </ul>
                  </div>

                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Compatibilidad de Modelos de Datos</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Los SKUs, marcas, atributos técnicos y categorías de demostración creados en este proyecto corresponden al 100% con los objetos estándar de WooCommerce (WC_Product), listos para sincronización con catálogo SYScom o importación masiva vía WP All Import.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'plugin' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Estructura base del plugin PHP independiente:
                  </span>
                  <button
                    onClick={() => copyCode(samplePluginPhp)}
                    className="flex items-center gap-1 text-xs text-[#087BFF] hover:underline font-bold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar código PHP</span>
                  </button>
                </div>
                <pre className="bg-[#07182E] text-slate-200 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-72 border border-slate-800">
                  {samplePluginPhp}
                </pre>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-4 text-xs text-slate-700">
                <p>
                  Puedes descargar en un solo clic el catálogo completo actual en formato JSON compatible con la REST API de WooCommerce (v3) o WP-CLI:
                </p>
                
                <div className="p-4 bg-[#F4F7FB] rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-[#07182E]">Resumen del Paquete de Exportación:</div>
                  <div>· Total de productos mapeados: <strong>{DEMO_PRODUCTS.length} equipos</strong></div>
                  <div>· Divisiones: Climatización (HVAC), Seguridad (CCTV IP), Energía Solar</div>
                  <div>· Incluye: SKUs, Atributos técnicos para filtros por facetas, precios e imágenes</div>
                </div>

                <button
                  onClick={downloadWpJson}
                  className="w-full py-3 bg-[#087BFF] hover:bg-[#0069dc] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Esquema JSON para WooCommerce</span>
                </button>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setIsMigrationModalOpen(false)}
              className="px-5 py-2 rounded-lg bg-[#07182E] text-white text-xs font-semibold hover:bg-[#102B4C] transition-colors"
            >
              Cerrar Visualizador
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
