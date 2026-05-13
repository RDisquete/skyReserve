import { motion } from 'framer-motion';
import { FiCamera, FiCode, FiSmartphone, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-10 bg-main">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-brand-accent mb-4"
          >
            <div className="w-8 h-px bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              About
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tighter uppercase italic mb-8 leading-none"
          >
            Construyo cosas que la gente <span className="font-bold">usa</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light max-w-3xl leading-relaxed"
          >
            Soy Rafa. Durante años trabajé con fotografía y contenido visual.
            Con el tiempo terminé más interesado en las herramientas que había detrás
            de las imágenes que en las imágenes en sí.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary text-base sm:text-lg font-light max-w-3xl leading-relaxed mt-6"
          >
            Ahora desarrollo aplicaciones frontend con React y TypeScript.
            Me obsesiona que una interfaz se sienta rápida, clara y natural.
            Que no haga perder tiempo. Que funcione bien incluso cuando la conexión no ayuda.
          </motion.p>
        </header>

{/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 sm:mb-28">

          {/* LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-text-primary uppercase italic mb-6">
                Cómo trabajo
              </h2>

              <div className="space-y-5 text-text-secondary font-light leading-relaxed text-sm sm:text-base">
                <p>
                  No me interesa hacer interfaces "bonitas" si luego son lentas,
                  confusas o incómodas de usar. Intento que diseño y código trabajen juntos.
                </p>

                <p>
                  SkyReserve nace precisamente de eso. Quería construir una plataforma
                  que mezclara reservas, gestión de servicios y experiencia visual
                  sin sentirse pesada ni complicado.
                </p>

                <p>
                  Todo lo que hay aquí está desarrollado desde cero:
                  frontend, estructura, interacción, rendimiento y lógica de datos.
                  Me gusta entender cómo funciona todo el sistema, no solo la parte visual.
                </p>

                <p>
                  Vengo del mundo audiovisual y creo que eso se nota bastante en cómo planteo
                  las interfaces: ritmo, jerarquía visual, movimiento y atención al detalle.
                </p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT STATS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-6 h-fit"
          >
            <div className="bg-brand-panel p-6 sm:p-8 border border-text-primary/5 hover:border-brand-accent/30 transition-all duration-300 group">
              <FiCamera className="text-brand-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-2xl sm:text-3xl font-bold text-text-primary">10+</span>
              <p className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest mt-2">
                Años en visual
              </p>
            </div>

            <div className="bg-brand-panel p-6 sm:p-8 border border-text-primary/5 hover:border-brand-accent/30 transition-all duration-300 group">
              <FiCode className="text-brand-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-2xl sm:text-3xl font-bold text-text-primary">React</span>
              <p className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest mt-2">
                Frontend stack
              </p>
            </div>

            <div className="bg-brand-panel p-6 sm:p-8 border border-text-primary/5 hover:border-brand-accent/30 transition-all duration-300 group">
              <FiSmartphone className="text-brand-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-2xl sm:text-3xl font-bold text-text-primary">UX</span>
              <p className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest mt-2">
                Mobile first
              </p>
            </div>

            <div className="bg-brand-panel p-6 sm:p-8 border border-text-primary/5 hover:border-brand-accent/30 transition-all duration-300 group">
              <FiCode className="text-brand-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-2xl sm:text-3xl font-bold text-text-primary">TS</span>
              <p className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest mt-2">
                TypeScript
              </p>
            </div>

          </motion.div>
        </div>

        {/* PROJECTS */}
        <section className="border-t border-text-primary/10 pt-12 sm:pt-16 mb-16 sm:mb-24">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl font-light text-text-primary uppercase italic mb-8 sm:mb-10"
          >
            Algunos proyectos
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            <motion.a
              href="https://rdisquetesevadeboda.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block p-5 sm:p-6 border border-text-primary/10 bg-brand-panel hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
                  Wedding Album
                </span>

                <FiExternalLink
                  size={14}
                  className="text-text-secondary group-hover:text-brand-accent"
                />
              </div>

              <p className="text-text-secondary text-sm font-light leading-relaxed">
                Sistema privado para compartir fotos mediante QR desde móvil.
              </p>
            </motion.a>

            <motion.a
              href="https://nor3xtrem.es/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block p-5 sm:p-6 border border-text-primary/10 bg-brand-panel hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
                  Nor3xtrem
                </span>

                <FiExternalLink
                  size={14}
                  className="text-text-secondary group-hover:text-brand-accent"
                />
              </div>

              <p className="text-text-secondary text-sm font-light leading-relaxed">
                Plataforma para evento cicloturista optimizada para móvil y rendimiento.
              </p>
            </motion.a>

            <motion.a
              href="https://mattersoundrdisquete.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block p-5 sm:p-6 border border-text-primary/10 bg-brand-panel hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
                  Matter & Sound
                </span>

                <FiExternalLink
                  size={14}
                  className="text-text-secondary group-hover:text-brand-accent"
                />
              </div>

              <p className="text-text-secondary text-sm font-light leading-relaxed">
                Experimento visual con audio en tiempo real usando Canvas y Web Audio API.
              </p>
            </motion.a>

          </div>
        </section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-panel border border-text-primary/5 p-6 sm:p-10"
        >

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">

            <div>
              <h2 className="text-2xl font-light text-text-primary uppercase italic">
                SkyReserve
              </h2>

              <p className="text-text-secondary font-light mt-3 max-w-xl leading-relaxed">
                Este proyecto es también una forma de enseñar cómo trabajo:
                producto, frontend, rendimiento y experiencia de usuario
                dentro de una aplicación completa.
              </p>
            </div>

            <div className="flex gap-4">

              <Link
                to="/contact"
                className="inline-block bg-brand-accent text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors"
              >
                Contactar
              </Link>

              <a
                href="https://rdisquete.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-text-primary/20 text-text-primary px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:border-brand-accent transition-colors"
              >
                Portfolio
              </a>

            </div>

          </div>

        </motion.section>
      </div>
    </div>
  );
}