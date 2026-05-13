import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { DroneService } from '../types/types';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { getServiceImage, getServiceVideoSmall, toSlug } from '../lib/serviceMedia';

export default function Services() {
  const [services, setServices] = useState<DroneService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*');
      
      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(services.map(s => s.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = search === '' || 
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || service.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 font-sans">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-10">
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
              <span className="text-[10px] uppercase tracking-widest text-text-secondary">Cargando servicios...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-10">
        <header className="mb-10">
          <div className="flex items-center gap-3 text-brand-accent mb-4">
            <div className="w-8 h-px bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Catálogo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-text-primary tracking-tighter uppercase italic mb-6">
            Nuestras <span className="font-bold">Unidades</span>
          </h1>
          <p className="text-text-secondary text-base font-light max-w-2xl leading-relaxed">
            Equipamiento de última generación para cualquier tipo de producción aérea. 
            Selecciona una categoría o busca directamente el servicio que necesitas.
          </p>
        </header>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-panel border border-text-primary/10 p-4 pl-12 text-[11px] text-text-primary focus:border-brand-accent outline-none uppercase tracking-widest"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all border ${
                  category === cat
                    ? 'bg-brand-accent text-white border-brand-accent'
                    : 'bg-brand-panel border-text-primary/10 text-text-secondary hover:border-brand-accent'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Servicios como secciones grandes alternadas */}
        <div className="space-y-8">
          {filteredServices.map((service, index) => {
            const imageSrc = getServiceImage(service);
            const videoSrc = getServiceVideoSmall(service);
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate(`/services/${toSlug(service.title)}`)}
              onMouseEnter={(el) => {
                const video = el.currentTarget.querySelector('video');
                if (video) {
                  video.currentTime = 0;
                  video.play().catch(() => {});
                }
              }}
              onMouseLeave={(el) => {
                const video = el.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
              className={`group relative flex flex-col lg:flex-row cursor-pointer ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } gap-0 border border-text-primary/10 bg-brand-panel overflow-hidden hover:border-brand-accent/50 transition-colors`}
            >
              {/* Imagen grande con video hover - 60% en desktop */}
              <div className="lg:w-[60%] aspect-16/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <img 
                  src={imageSrc} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Video en hover */}
                {videoSrc && (
                  <video 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    muted 
                    loop 
                    playsInline
                    preload="none"
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                )}
                
                <div className="absolute inset-0 bg-linear-to-t from-brand-panel via-transparent to-transparent" />
              </div>

              {/* Contenido */}
              <div className="lg:w-[40%] p-8 lg:p-16 flex flex-col justify-center bg-brand-panel">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">
                  {service.category}
                </span>
                
                <h2 className="text-3xl lg:text-5xl font-light text-text-primary tracking-tighter uppercase italic mb-6 group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h2>

                <p className="text-text-secondary text-base font-light leading-relaxed mb-10">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-text-primary/5">
                  <div>
                    <span className="text-[9px] text-text-secondary uppercase tracking-widest">Precio</span>
                    <p className="text-3xl font-bold text-text-primary">
                      €{service.price_per_hour}<span className="text-sm font-light text-text-secondary ml-1">/hora</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-brand-accent text-[10px] font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                    Ver proyecto <FiArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        {filteredServices.length === 0 && (
          <div className="py-20 text-center border border-dashed border-text-primary/10">
            <p className="text-text-secondary text-[10px] uppercase tracking-widest font-mono">
              No se han encontrado servicios.
            </p>
            <button 
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="mt-4 text-brand-accent text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}