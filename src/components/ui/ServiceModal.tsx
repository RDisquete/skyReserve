import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { DroneService } from '../../types/types';
import { getServiceImage, getServiceVideoSmall, toSlug } from '../../lib/serviceMedia';

interface ServiceModalProps {
  service: DroneService;
  onClose: () => void;
}

export const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const imageSrc = getServiceImage(service);
  const videoSrc = getServiceVideoSmall(service);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-brand-panel border border-text-primary/10 overflow-hidden"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-main/50 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <FiX size={16} />
        </button>

        {/* Image/Video */}
        <div className="aspect-video relative">
          {!imageError ? (
            <>
              <img 
                src={imageSrc} 
                alt={service.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
              {videoSrc && (
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-brand-panel to-brand-accent/10 flex items-center justify-center">
              <span className="text-text-secondary/30 text-[10px] uppercase tracking-widest">Sin imagen</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-brand-panel via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 -mt-20 relative">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent bg-brand-panel px-3 py-1">
            {service.category}
          </span>
          
          <h2 className="text-3xl font-light text-text-primary tracking-tighter uppercase italic mt-4 mb-2">
            {service.title}
          </h2>
          
          <p className="text-text-secondary text-sm font-light leading-relaxed line-clamp-3">
            {service.description}
          </p>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-text-primary/10">
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest">Precio</span>
              <p className="text-2xl font-bold text-text-primary">
                €{service.price_per_hour}<span className="text-sm font-light text-text-secondary">/hr</span>
              </p>
            </div>
            <button 
              onClick={() => navigate(`/services/${toSlug(service.title)}`)}
              className="bg-brand-accent text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Ver más
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};