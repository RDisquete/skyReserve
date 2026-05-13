import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 1. Capa del Video de Fondo */}
        <div className="absolute inset-0 z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
            >
                <source
                    src="/hero_drone.mp4"
                    type="video/mp4" />
                Tu navegador no soporta videos.
            </video>

            {/* 2. Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-colors duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-main via-transparent to-transparent opacity-80" />
        </div>

        {/* 3. Contenido */}
        <div className="relative z-10 text-center px-6 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-8"
            >
                <span className="w-12 h-px bg-brand-accent/50" />
                <span className="text-white text-[10px] font-black tracking-[0.5em] uppercase">
                    Advanced Aerial Solutions
                </span>
                <span className="w-12 h-px bg-brand-accent/50" />
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-[8rem] lg:text-[10rem] text-white tracking-[-0.03em] leading-[0.9] mb-10 font-[inherit]"
            >
                <span className="font-light italic">Sky</span><motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="font-extrabold text-brand-accent"
                >RESERVE</motion.span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-l text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-14 uppercase tracking-widest italic"
            >
                Redefiniendo la perspectiva visual a través de tecnología operativa de vanguardia.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-center"
            >
                <Link 
                    to="/services"
                    className="group flex items-center gap-3 text-white/70 text-[11px] font-medium tracking-[0.25em] uppercase hover:text-brand-accent transition-colors"
                >
                    Explorar Servicios
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </motion.div>
        </div>

        {/* 4. Indicador de Scroll */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-30">
            <div className="w-px h-20 bg-linear-to-b from-white to-transparent mx-auto animate-pulse" />
        </div>

        {/* 5. Social Links */}
        <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
            <a 
                href="https://rdisquete.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-accent transition-colors"
                title="Portfolio"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </a>
            <a 
                href="https://www.linkedin.com/in/rafael-dorado-zamoro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-accent transition-colors"
                title="LinkedIn"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a 
                href="https://github.com/RDisquete" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-accent transition-colors"
                title="GitHub"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
    </section>
);