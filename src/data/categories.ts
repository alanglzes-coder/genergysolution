import { Division } from '../types';

export interface DivisionInfo {
  id: Division;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  subcategories: {
    id: string;
    name: string;
    count: number;
    description: string;
  }[];
  featuredBrands: string[];
}

export const DIVISIONS: Record<Division, DivisionInfo> = {
  clima: {
    id: 'clima',
    title: 'Aire Acondicionado & Climatización',
    shortTitle: 'Climatización',
    tagline: 'Confort térmico de máxima eficiencia energética',
    description: 'Soluciones integrales de aire acondicionado para residencias, corporativos y complejos industriales. Sistemas Inverter R-32, unidades VRF multizona y chillers de alto rendimiento.',
    image: '/assets/images/category_climatizacion_1794103568632.jpg',
    accentColor: '#20D4E8',
    subcategories: [
      { id: 'minisplit-inverter', name: 'Minisplits Inverter', count: 18, description: 'Equipos residenciales y comerciales de 1 a 3 toneladas con ahorro hasta 70% de energía.' },
      { id: 'vrf-multizona', name: 'Sistemas VRF / VRV', count: 12, description: 'Climatización simultánea multizona para edificios de oficinas y residencias de lujo.' },
      { id: 'paquetes-chillers', name: 'Manejadoras y Chillers', count: 8, description: 'Equipos centrales de alta capacidad para naves comerciales e instalaciones médicas.' },
      { id: 'termostatos-control', name: 'Control & Termostatos Inteligentes', count: 9, description: 'Sistemas Wi-Fi y protocolos BACnet/Modbus para automatización de clima.' },
    ],
    featuredBrands: ['Daikin', 'Carrier', 'Trane', 'Mirage', 'York', 'Honeywell'],
  },
  seguridad: {
    id: 'seguridad',
    title: 'Cámaras de Seguridad & Videovigilancia',
    shortTitle: 'Videovigilancia',
    tagline: 'Vigilancia continua con Inteligencia Artificial',
    description: 'Equipamiento profesional de circuito cerrado (CCTV) con analítica de video, visión nocturna ultra HD, reconocimiento facial, disuasión activa y protección perimetral.',
    image: '/assets/images/category_videovigilancia_1794103567505.jpg',
    accentColor: '#087BFF',
    subcategories: [
      { id: 'camaras-ip-4k', name: 'Cámaras IP 4K & Domos', count: 24, description: 'Resolución ultra HD, tecnología DarkFighter / ColorVu y clasificación de humanos/vehículos.' },
      { id: 'ptz-largodistancia', name: 'Cámaras PTZ & Térmicas', count: 10, description: 'Zoom óptico hasta 32x con paneo continuo de 360° y seguimiento de objetivos con IA.' },
      { id: 'nvrs-grabadores', name: 'NVRs & Grabadores con IA', count: 14, description: 'Grabación continua PoE, compresión H.265+ y gestión centralizada remota.' },
      { id: 'control-acceso', name: 'Control de Acceso & Alarmas', count: 11, description: 'Biometría, reconocimiento facial, molinetes y sistemas de intrusión perimetral.' },
    ],
    featuredBrands: ['Hikvision', 'Dahua', 'Axis', 'Hanwha', 'Ubiquiti', 'ZKTeco'],
  },
  solar: {
    id: 'solar',
    title: 'Paneles Solares & Energía Fotovoltaica',
    shortTitle: 'Energía Solar',
    tagline: 'Independencia energética y sostenibilidad real',
    description: 'Ingeniería fotovoltaica para autoconsumo residencial, comercial e industrial. Paneles solares Monocristalinos Tier-1, inversores híbridos y baterías de litio de respaldo.',
    image: '/assets/images/category_solar_1794103568740.jpg',
    accentColor: '#F5B82E',
    subcategories: [
      { id: 'paneles-monocristalinos', name: 'Módulos Fotovoltaicos Tier-1', count: 16, description: 'Paneles de alta eficiencia N-Type TOPCon de 450W a 670W con 25 años de garantía.' },
      { id: 'inversores-hibridos', name: 'Inversores Centrales & Híbridos', count: 15, description: 'Inversores conectados a red y conmutación de respaldo inmediato ante cortes.' },
      { id: 'microinversores', name: 'Microinversores Autónomos', count: 8, description: 'Optimización panel por panel con monitoreo a nivel de módulo y seguridad rápida.' },
      { id: 'almacenamiento-litio', name: 'Baterías & Almacenamiento', count: 7, description: 'Sistemas LiFePO4 de alta densidad para respaldo crítico y almacenamiento de excedentes.' },
    ],
    featuredBrands: ['Huawei FusionSolar', 'Canadian Solar', 'Enphase', 'Growatt', 'JA Solar', 'SolarEdge'],
  },
};

export const ALL_BRANDS = [
  { name: 'Daikin', division: 'clima', country: 'Japón' },
  { name: 'Hikvision', division: 'seguridad', country: 'Global' },
  { name: 'Huawei FusionSolar', division: 'solar', country: 'Global' },
  { name: 'Carrier', division: 'clima', country: 'EE.UU.' },
  { name: 'Canadian Solar', division: 'solar', country: 'Canadá' },
  { name: 'Dahua', division: 'seguridad', country: 'Global' },
  { name: 'Enphase', division: 'solar', country: 'EE.UU.' },
  { name: 'Trane', division: 'clima', country: 'EE.UU.' },
  { name: 'Axis', division: 'seguridad', country: 'Suecia' },
  { name: 'Growatt', division: 'solar', country: 'Global' },
  { name: 'Mirage', division: 'clima', country: 'México' },
  { name: 'Honeywell', division: 'clima', country: 'EE.UU.' },
];
