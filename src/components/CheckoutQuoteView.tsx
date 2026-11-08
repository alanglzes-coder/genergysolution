import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Send, 
  ShieldCheck, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutQuoteView: React.FC = () => {
  const {
    cart,
    cartSubtotalMxn,
    cartTotalMxn,
    formatPrice,
    navigateToCatalog,
    addToast,
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Ing. Carlos Mendoza',
    company: 'Desarrollos & Edificaciones Industriales S.A. de C.V.',
    rfc: 'DEI200415AB3',
    email: 'carlos.mendoza@desarrollos.mx',
    phone: '+52 55 4912 3000',
    city: 'Monterrey, Nuevo León',
    address: 'Av. Fundidora 501, Parque Industrial',
    projectType: 'comercial',
    deliveryTime: 'Inmediata / 3 a 5 días hábiles',
    notes: 'Requerimos puesta en marcha y memoria técnica de cálculo para aprobación de supervisión de obra.',
  });

  const [isGenerated, setIsGenerated] = useState(false);

  const quoteNumber = 'GEN-COT-2026-9482';
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    const summary = cart
      .map((item) => `- ${item.quantity}x ${item.product.brand} ${item.product.model} (${item.product.name}) - ${formatPrice(item.product.priceMxn * item.quantity)}`)
      .join('\n');

    const message = `*SOLICITUD FORMAL DE COTIZACIÓN - GENERGY SOLUTION*\nFolio: ${quoteNumber}\nCliente: ${formData.fullName}\nEmpresa: ${formData.company}\nCiudad: ${formData.city}\nTeléfono: ${formData.phone}\n\n*EQUIPOS SELECCIONADOS:*\n${summary}\n\nSubtotal: ${formatPrice(cartSubtotalMxn)}\nIVA 16%: ${formatPrice(cartSubtotalMxn * 0.16)}\n*TOTAL ESTIMADO: ${formatPrice(cartTotalMxn)}*\n\nNotas: ${formData.notes}`;

    window.open(`https://wa.me/5215515909699?text=${encodeURIComponent(message)}`, '_blank');
    setIsGenerated(true);
    addToast('Cotización Formal Enviada', 'Redirigiendo a WhatsApp con tu asesor de ingeniería asignado', 'success');
  };

  const handleExportCsv = () => {
    const headers = 'SKU,Marca,Modelo,Nombre,Cantidad,PrecioUnitarioMXN,TotalMXN\n';
    const rows = cart
      .map(
        (item) =>
          `"${item.product.sku}","${item.product.brand}","${item.product.model}","${item.product.name}",${item.quantity},${item.product.priceMxn},${item.product.priceMxn * item.quantity}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cotizacion_${quoteNumber}_WooCommerce.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Archivo Exportado', 'Archivo CSV compatible con WooCommerce descargado', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F4F7FB] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white p-12 rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#07182E] mb-2">
            No hay productos en la lista de cotización
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Agrega equipos desde las divisiones de Climatización, Seguridad o Energía Solar para generar una proforma formal.
          </p>
          <button
            onClick={() => navigateToCatalog('all')}
            className="px-6 py-2.5 bg-[#087BFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0069dc]"
          >
            Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FB] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <button
            onClick={() => navigateToCatalog('all')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#087BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exportar CSV WooCommerce</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Imprimir Proforma</span>
            </button>
          </div>
        </div>

        {/* Proforma Paper Sheet */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 mb-8 print:shadow-none print:border-none print:p-0">
          
          {/* Proforma Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-200">
            <div>
              <img
                src="/assets/aistudio/LOGO_GENERGY_HOR_2a5ceb1a.png"
                alt="GENERGY SOLUTION"
                className="h-10 w-auto object-contain mb-2"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs text-slate-500 space-y-0.5">
                <div>GENERGY SOLUTION S.A. DE C.V.</div>
                <div>Climatización, Seguridad & Energía Solar</div>
                <div>Edo de México / Cobertura Nacional</div>
                <div>Tel: +52 55 1590-9699 · contacto@genergysolution.com</div>
              </div>
            </div>

            <div className="sm:text-right bg-slate-50 p-4 rounded-xl border border-slate-100 sm:min-w-[240px]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF]">
                PROFORMA COMERCIAL B2B
              </div>
              <div className="text-base font-black text-[#07182E] font-mono mt-0.5">
                {quoteNumber}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Fecha de emisión: <strong>{currentDate}</strong>
              </div>
              <div className="text-[11px] text-amber-700 font-medium">
                Vigencia: 15 días naturales
              </div>
            </div>
          </div>

          {/* Client Information Form / Preview */}
          <div className="my-6 p-4 rounded-xl bg-[#F4F7FB] border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07182E] mb-3 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#087BFF]" />
              <span>Datos del Solicitante / Razón Social para Facturación</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-500 block text-[10px]">Nombre / Atención</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="text-slate-500 block text-[10px]">Empresa / Razón Social</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="text-slate-500 block text-[10px]">RFC para Factura</label>
                <input
                  type="text"
                  value={formData.rfc}
                  onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-500 block text-[10px]">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-500 block text-[10px]">Teléfono de Contacto</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-500 block text-[10px]">Ciudad / Destino de Entrega</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-[#07182E] text-white">
                <tr>
                  <th className="py-2.5 px-3 text-left font-semibold">SKU / Modelo</th>
                  <th className="py-2.5 px-3 text-left font-semibold">Descripción del Equipo</th>
                  <th className="py-2.5 px-3 text-center font-semibold">Cant.</th>
                  <th className="py-2.5 px-3 text-right font-semibold">P. Unitario</th>
                  <th className="py-2.5 px-3 text-right font-semibold">Importe MXN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cart.map((item, idx) => (
                  <tr key={item.product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="py-3 px-3 font-mono font-bold text-[#07182E] align-top whitespace-nowrap">
                      {item.product.sku}
                      <div className="text-[10px] text-slate-400 font-normal">{item.product.brand}</div>
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="font-semibold text-slate-800">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.product.shortDescription}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700 align-top tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 align-top tabular-nums whitespace-nowrap">
                      {formatPrice(item.product.priceMxn)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#07182E] align-top tabular-nums whitespace-nowrap">
                      {formatPrice(item.product.priceMxn * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2 mb-6">
            <div className="max-w-md text-xs text-slate-500 space-y-1.5">
              <div className="font-bold text-[#07182E]">Condiciones Comerciales:</div>
              <div>· Moneda: Pesos Mexicanos (MXN) / Dólares Americanos al T.C. Diario oficial.</div>
              <div>· Forma de pago: Transferencia bancaria SPEI, tarjeta corporativa o crédito B2B.</div>
              <div>· Entrega: Libre a bordo (LAB) en almacén o flete asegurado a obra.</div>
              <div>· Todos los productos cuentan con póliza y garantía oficial por escrito.</div>
            </div>

            <div className="w-full sm:w-72 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Neto:</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {formatPrice(cartSubtotalMxn)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA Trasladado (16%):</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {formatPrice(cartSubtotalMxn * 0.16)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-[#07182E]">
                <span>Total Cotizado:</span>
                <span className="text-[#087BFF] font-mono tabular-nums">
                  {formatPrice(cartTotalMxn)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons for Sending */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demostración de sistema: Proforma lista para validación de compra y enlace a WhatsApp</span>
            </div>

            <button
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Cotización a Ingeniero por WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
