import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { DroneService } from '../types/types';
import { FiArrowLeft, FiCheck, FiAward, FiClock, FiMapPin, FiZap, FiTarget, FiLayers } from 'react-icons/fi';
import { getServiceImage, getServiceVideoResponsive, toSlug } from '../lib/serviceMedia';

const serviceDetails: Record<string, {
  fullDescription: string;
  features: string[];
  benefits: string[];
  applications: string[];
  equipment: string[];
  process: string[];
}> = {
  'inspeccion-industrial': {
    fullDescription: 'Servicio profesional de inspección técnica mediante drones de última generación. Ideal para evaluaciones de infraestructuras industriales, estructuras metálicas, chimeneas, tanques, líneas de transmisión y cualquier activo que requiera revisión visual detallada sin riesgos para el personal.',
    features: [
      'Cámaras termográficas de alta resolución',
      'Sensor 4K con zoom óptico 30x',
      'Detección de fallos térmicos',
      'Modelado 3D con photogrametría',
      'Informes técnicos certified',
      'Cobertura de áreas de difícil acceso'
    ],
    benefits: [
      'Reducción del 80% en costos de inspección',
      'Eliminación de riesgos para trabajadores',
      'Inspecciones en tiempo récord',
      'Documentación visual completa',
      'Detección temprana de fallos',
      'Cumplimiento normativo'
    ],
    applications: [
      'Industria energética',
      'Construcción civil',
      'Infraestructuras críticas',
      'Plantas manufactureas',
      'Parques eólicos',
      'Plantas solares'
    ],
    equipment: [
      'DJI Matrice 300 RTK',
      'Cámara Zenmuse XT2',
      'Cámara Zenmuse P1',
      'Sistema de baterías múltiples'
    ],
    process: [
      'Planificación de vuelo',
      'Ejecución con piloto certified',
      'Captura de datos',
      'Procesamiento de imágenes',
      'Análisis técnico',
      'Informe final'
    ]
  },
  'fotografia-inmobiliaria': {
    fullDescription: 'Servicio premium de fotografía y video aéreo para el sector inmobiliario. Creamos contenido visual de alta calidad que destaca propiedades residenciales, comerciales y terrenos, generando mayor interés y加速ando las ventas.',
    features: [
      'Video 5.2K cinema quality',
      'Fotos HDR de 48MP',
      'Flight planning automatizado',
      'Edición profesional color grading',
      'Entrega en 24 horas',
      'Recursos para MLS'
    ],
    benefits: [
      'Incremento del 47% en leads',
      'Diferenciación visual neta',
      'Recorridos virtuales inmersivos',
      'Marketing multi-canal',
      'Presencia premium',
      'ROI demostrado'
    ],
    applications: [
      'Residencial de lujo',
      'Comercial retail',
      'Urbanizaciones',
      'Hoteles y resorts',
      'Fincas y ranchos',
      'Propiedades heritage'
    ],
    equipment: [
      'DJI Mavic 3 Cine',
      'Lentes Hasselblad',
      'Sistema de iluminación',
      'Estabilizador 3 ejes'
    ],
    process: [
      'Scouting de ubicación',
      'Sesión fotográfica',
      'Procesamiento RAW',
      'Edición profesional',
      'Entrega de archivos',
      'Soporte marketing'
    ]
  },
  'grabacion-cinematografica': {
    fullDescription: 'Producción audiovisualcinema grade con drones para cine, publicidad, documentales y contenido corporativo. Nuestro equipo de pilotos y operadores de cámara delivers imágenes que redefinen el lenguaje visual de tu proyecto.',
    features: [
      'Cinema 8K RAW',
      'Apple ProRes 422 HQ',
      'Codec de broadcast',
      'Dynamic range 14+ stops',
      'Frame rates 120fps',
      'Color science cinema'
    ],
    benefits: [
      'Calidad award-winning',
      'Flexibilidad creativa total',
      'Eficiencia de producción',
      'Integración seamless',
      'Deliverables multi-formato',
      'Post-production ready'
    ],
    applications: [
      'Largometajes',
      'Publicidades tv',
      'Videoclips musicales',
      'Documentales',
      'Corporate videos',
      'Series streaming'
    ],
    equipment: [
      'DJI Inspire 3',
      'Zenmuse X9-8K Air',
      'Cinema Pro package',
      'ND filters kit',
      'Batteries V-Mount'
    ],
    process: [
      'Pre-producción',
      'Recce de localizaciones',
      'Storyboards aerial',
      'Rodaje',
      'DIT workflow',
      'Post-produccion'
    ]
  },
  'eventos-sociales': {
    fullDescription: 'Captura momentos únicos desde el cielo para bodas, celebraciones, comuniones y eventos familiares. Our cinematic aerial footage transforms your special day into unforgettable memories that will be cherished for generations.',
    features: [
      'Video 5.2K cinema quality',
      'Fotos 48MP HDR',
      'Shot list personalizado',
      'Cinematic color grading',
      'Teaser en 48 horas',
      'Album digital completo'
    ],
    benefits: [
      'Perspectiva única e innovadora',
      'Cobertura completa sin interrupciones',
      'Calidad cinema para tu evento',
      'Recuerdos para toda la vida',
      'Compartible en redes sociales',
      'Pack familiar completo'
    ],
    applications: [
      'Bodas y ceremonias',
      'Comuniones y bautizos',
      'Cumpleaños especiales',
      'Anniversaries',
      'Reuniones familiares',
      'Fiestas privadas'
    ],
    equipment: [
      'DJI Mavic 3 Pro',
      'Lentes Hasselblad',
      'Sistema de iluminación portable',
      'Estabilizador avanzado',
      'Multiple batteries'
    ],
    process: [
      'Reunión pre-evento',
      'Scouting de ubicación',
      'Cobertura del evento',
      'Edición profesional',
      'Entrega de archivos',
      'Álbum online'
    ]
  },
  'eventos-deportivos': {
    fullDescription: 'Cobertura aérea profesional para eventos deportivos, competiciones y entrenamiento. Our dynamic aerial footage brings energy and perspective to any sports content, perfect for broadcasts, promotions and athlete profiling.',
    features: [
      '4K 120fps slow motion',
      'Tracking dinámico de acción',
      'Multi-drone coverage',
      'Live streaming capability',
      'Analytics integrados',
      'Highlights automatizados'
    ],
    benefits: [
      'Perspectiva única del deporte',
      'Contenido para redes sociales',
      'Análisis técnico-visual',
      'Promoción de eventos',
      'Cobertura multiplataforma',
      'Valor agregado neto'
    ],
    applications: [
      'Competiciones de motor',
      'Eventos de motocross',
      'Carreras de montaña',
      'Deportes acuáticos',
      'Eventos ecuestres',
      'Torneos de fútbol'
    ],
    equipment: [
      'DJI FPV Combo',
      'DJI Mavic 3 Enterprise',
      'Sistema de tracking',
      'Goggles HD',
      'Transmisor live'
    ],
    process: [
      'Briefing deportivo',
      'Plan de vuelo de carrera',
      'Cobertura en vivo',
      'Captura de momentos clave',
      'Procesamiento deportivo',
      'Highlights delivery'
    ]
  },
  'mapeo-y-topografia': {
    fullDescription: 'Servicio especializado en topografía y cartografía mediante tecnología drone. Generamos modelos digitales de terreno, ortofotos georeferenciadas y modelos 3D de precisión para proyectos de ingeniería, construcción y gestión territorial.',
    features: [
      'Precisión centimétrica RTK/PPK',
      'Ortofotos de alta resolución',
      'Modelos digitales de elevación',
      'Curvas de nivel exactas',
      'Cálculo de volúmenes',
      'Informes cartográficos'
    ],
    benefits: [
      'Reducción del 90% en tiempo de campo',
      'Precisión superior a métodos tradicionales',
      'Costos significativamente menores',
      'Cobertura de áreas inaccesibles',
      'Datos procesables en CAD/GIS',
      'Actualización rápida de cambios'
    ],
    applications: [
      'Proyectos de construcción',
      'Obras civiles e infraestructuras',
      'Minería y canteras',
      'Agricultura de precisión',
      'Gestión urbana',
      'Estudios ambientales'
    ],
    equipment: [
      'DJI Matrice 350 RTK',
      'Cámara Zenmuse P1',
      'Sistema RTK externo',
      'Software photogrammetry',
      'Base station GPS'
    ],
    process: [
      'Planificación de área',
      'Configuración RTK/PPK',
      'Vuelo automatizado',
      'Captura de imágenes',
      'Procesamiento photogramétrico',
      'Entrega de deliverables'
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<DroneService | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('services')
        .select('*');

      if (!error && data) {
        const found = data.find((s) => toSlug(s.title) === slug);
        if (found) {
          setService(found);
        }
      }
      setLoading(false);
    };

    fetchService();
  }, [slug]);


  if (loading) return null;

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="text-text-secondary text-[10px] uppercase tracking-widest">Servicio no encontrado</div>
    </div>
  );

  const imageSrc = getServiceImage(service);
  const videoSrc = getServiceVideoResponsive(service, isMobile);
  const slugKey = toSlug(service.title).replace('-industrial', '-industrial').replace('-inmobiliaria', '-inmobiliaria').replace('-cinematografica', '-cinematografica');
  const details = serviceDetails[slugKey] || serviceDetails['inspeccion-industrial'];

  return (
    <div className="min-h-screen bg-main">
      {/* HERO: Video fullscreen con título superpuesto */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video/Imagen de fondo */}
        <div className="absolute inset-0">
          {videoSrc ? (
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img 
              src={imageSrc} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Gradient overlay mínimo */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/60" />

        {/* Título superpuesto en el video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
              {service.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[8rem] lg:text-[10rem] text-white tracking-[-0.03em] leading-[0.9] font-light">
              {service.title}
            </h1>
          </motion.div>
        </div>

        {/* Back button */}
        <button 
          onClick={() => navigate('/services')}
          className="absolute top-8 left-6 sm:left-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer z-20"
        >
          <FiArrowLeft size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Volver</span>
        </button>

        {/* Scroll indicator */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
        </motion.div> */}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24">
        
        {/* Descripción extendida */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">
            Descripción del servicio
          </h2>
          <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed max-w-4xl">
            {details.fullDescription}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">
            Características técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.features.map((feature) => (
              <motion.div 
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 p-6 bg-brand-panel border border-text-primary/5"
              >
                <FiZap className="text-brand-accent shrink-0 mt-0.5" size={18} />
                <span className="text-text-primary text-sm font-light">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Beneficios y Aplicaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center gap-3">
              <FiAward /> Beneficios
            </h2>
            <ul className="space-y-4">
              {details.benefits.map((benefit, i) => (
                <motion.li 
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <FiCheck className="text-brand-accent shrink-0" size={14} />
                  <span className="text-text-secondary text-sm">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center gap-3">
              <FiTarget /> Aplicaciones
            </h2>
            <ul className="space-y-4">
              {details.applications.map((app, i) => (
                <motion.li 
                  key={app}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <FiMapPin className="text-brand-accent shrink-0" size={14} />
                  <span className="text-text-secondary text-sm">{app}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Equipamiento y Proceso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-brand-panel border border-text-primary/10 p-8"
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center gap-3">
              <FiLayers /> Equipamiento
            </h2>
            <ul className="space-y-3">
              {details.equipment.map((equip) => (
                <li key={equip} className="text-text-primary text-sm font-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                  {equip}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-brand-panel border border-text-primary/10 p-8"
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6 flex items-center gap-3">
              <FiClock /> Proceso de trabajo
            </h2>
            <div className="space-y-3">
              {details.process.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-brand-accent/20 text-brand-accent text-[10px] font-black flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-text-primary text-sm font-light">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 border-t border-text-primary/10"
        >
          <p className="text-text-secondary text-sm mb-8">¿Listo para comenzar tu proyecto?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contratar')}
              className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] bg-brand-accent text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Reservar Ahora
            </button>
            <Link 
              to="/contact"
              className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] border border-text-primary/20 text-text-primary hover:border-brand-accent hover:text-brand-accent transition-all"
            >
              Contactar
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Otros servicios */}
      <div className="border-t border-text-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">
            Otros servicios
          </h2>
          <Link 
            to="/services"
            className="text-brand-accent text-[10px] font-black uppercase tracking-widest hover:underline"
          >
            Ver todos los servicios →
          </Link>
        </div>
      </div>
    </div>
  );
}