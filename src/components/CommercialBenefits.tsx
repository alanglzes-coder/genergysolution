import React from 'react';
import { Truck, ShieldCheck, FileCheck, Headphones, Wrench, CreditCard } from 'lucide-react';

export const CommercialBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Logística & Envíos Asegurados',
      description: 'Cobertura a las 32 entidades de México con rastreo en tiempo real y seguro de carga.',
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Oficial de Fábrica',
      description: 'Equipos 100% originales con número de serie registrado y respaldo directo del fabricante.',
    },
    {
      icon: FileCheck,
      title: 'Facturación Fiscal CFDI 4.0',
      description: 'Emisión inmediata de comprobantes fiscales con desglose de IVA y retenciones según aplique.',
    },
    {
      icon: Wrench,
      title: 'Soporte de Ingeniería Preventa',
      description: 'Ingenieros certificados revisan tus planos, diagramas unifilares y memorias de carga.',
    },
    {
      icon: CreditCard,
      title: 'Condiciones Comerciales B2B',
      description: 'Esquemas de precio por volumen para integradores, contratistas y empresas desarrolladoras.',
    },
    {
      icon: Headphones,
      title: 'Mesa de Ayuda & Post-Venta',
      description: 'Asistencia para puesta en marcha, configuración de NVRs y comisionamiento de inversores.',
    },
  ];

  return (
    <section className="py-16 bg-[#F4F7FB]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087BFF] mb-2">
            Ventajas Comerciales GENERGY
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182E] tracking-tight">
            Respaldamos cada una de tus instalaciones
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Estructura operativa inspirada en los más altos estándares mayoristas con atención personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-[#07182E] text-[#20D4E8] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#07182E] mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
