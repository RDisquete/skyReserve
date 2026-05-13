import { motion } from 'framer-motion';
import { Hero } from '../components/layout/Hero';
import { ServiceGrid } from '../components/layout/ServiceGrid';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <Hero />


{/* Intro Servicios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-brand-accent mb-4">
              <div className="w-8 h-px bg-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Flota</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tighter uppercase italic mb-6">
              Tecnología aerial para <span className="font-bold">cada necesidad</span>
            </h2>
            <p className="text-text-secondary font-light leading-relaxed mb-6">
              Contamos con una flota de drones especializados para diferentes tipos de producción. 
              Desde cinematografía 4K hasta inspecciones industriales con sensores térmicos, 
              tenemos la unidad perfecta para tu proyecto.
            </p>
            <p className="text-text-secondary font-light leading-relaxed">
              Todos nuestros equipos incluyen seguro completo y pilotos con certificación oficial.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block aspect-square bg-brand-panel border border-text-primary/5 rounded-sm relative overflow-hidden"
          >
            <img 
              src="/landing.jpg" 
              alt="SkyReserve"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 pb-8 sm:pb-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-brand-accent mb-4">
            <div className="w-8 h-px bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Catálogo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-text-primary tracking-tighter uppercase italic">
            Nuestras <span className="font-bold">Unidades</span>
          </h2>
        </header>
        <ServiceGrid />
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 md:px-10 bg-brand-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tighter uppercase italic mb-6">
            ¿Listo para <span className="font-bold">elevar</span> tu proyecto?
          </h2>
          <p className="text-white/70 font-light mb-10 max-w-xl mx-auto">
            Cuéntanos sobre tu proyecto y te recommendamos la mejor configuración de drone para tus necesidades.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-colors"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </>
  );
};