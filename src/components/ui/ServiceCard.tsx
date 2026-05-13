import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { DroneService } from '../../types/types';
import { getServiceImage, getServiceVideoSmall } from '../../lib/serviceMedia';

interface ServiceCardProps {
  service: DroneService;
  onClick?: () => void;
}

export const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const imageSrc = getServiceImage(service);
  const videoSrc = getServiceVideoSmall(service);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-brand-panel border border-text-primary/5 rounded-sm overflow-hidden cursor-pointer"
    >
      
      {/* Imagen/Video - OCUPA CASI TODA LA TARJETA */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Imagen estática */}
        {!imageError && (
          <img 
            src={imageSrc} 
            alt={service.title}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
        )}
        
        {/* Placeholder si no hay imagen */}
        {imageError && (
          <div className={`absolute inset-0 flex items-center justify-center bg-brand-accent/10 transition-all duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-text-secondary/30 text-xs uppercase tracking-widest">Sin imagen</span>
          </div>
        )}
        
        {/* Video en hover */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Categoría superpuesta */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] tracking-[0.3em] text-white font-black uppercase bg-black/30 backdrop-blur-sm px-3 py-1 rounded-sm">
            {service.category || 'Tech'}
          </span>
        </div>
      </div>

      {/* Título y Precio */}
      <div className="p-6 -mt-4 relative z-30">
        <h3 className="text-2xl font-light text-text-primary tracking-tighter uppercase italic mb-2 group-hover:text-brand-accent transition-colors">
          {service.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-xs font-light leading-relaxed line-clamp-2">
            {service.description}
          </span>
          <div className="text-right ml-4">
            <span className="text-text-primary font-mono text-lg font-bold">
              €{Number(service.price_per_hour)}
            </span>
            <span className="text-[10px] text-text-secondary block">/ hora</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};