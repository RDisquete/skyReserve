import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiCheck,
  FiCode,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import { useForm } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm("myzjljrj");

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-10 bg-main">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 text-brand-accent mb-4">
            <div className="w-8 h-px bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Contacto
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tighter uppercase italic mb-6 leading-none">
            Hablemos del <span className="font-bold">proyecto</span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg font-light max-w-3xl leading-relaxed">
            SkyReserve es también una forma de enseñar cómo trabajo:
            frontend, producto, experiencia de usuario y sistemas reales.
          </p>

          <p className="text-text-secondary text-base sm:text-lg font-light max-w-3xl leading-relaxed mt-5">
            Si tienes una idea, una plataforma que mejorar o necesitas construir algo desde cero,
            puedes escribirme aquí directamente.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >

            {/* WHY */}
            <div className="mb-14">

              <h2 className="text-2xl font-light text-text-primary uppercase italic mb-8">
                Cómo trabajo
              </h2>

              <div className="grid gap-4">

                {[
                  {
                    icon: FiCode,
                    title: 'Frontend real',
                    desc: 'Interfaces rápidas, claras y pensadas para uso real.',
                  },
                  {
                    icon: FiLayers,
                    title: 'Producto completo',
                    desc: 'Diseño, arquitectura, interacción y experiencia conectadas.',
                  },
                  {
                    icon: FiZap,
                    title: 'Performance',
                    desc: 'Optimización enfocada en fluidez y tiempos de carga.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-brand-panel border border-text-primary/5"
                  >
                    <item.icon
                      size={20}
                      className="text-brand-accent mt-1"
                    />

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-primary block mb-2">
                        {item.title}
                      </span>

                      <p className="text-sm text-text-secondary font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-brand-accent/10 text-brand-accent">
                  <FiMapPin size={18} />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary block mb-1">
                    Ubicación
                  </span>

                  <span className="text-sm text-text-secondary font-light">
                    España · Trabajo remoto y proyectos digitales
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-brand-accent/10 text-brand-accent">
                  <FiMail size={18} />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary block mb-1">
                    Email
                  </span>

                  <span className="text-sm text-text-secondary font-light">
                    rafael.doradozamoro@gmail.com
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >

            {state.succeeded ? (

              <div className="bg-brand-panel border border-brand-accent/20 p-10 text-center">

                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <FiCheck size={28} className="text-brand-accent" />
                </div>

                <h3 className="text-2xl font-light text-text-primary uppercase italic mb-4">
                  Mensaje enviado
                </h3>

                <p className="text-text-secondary font-light leading-relaxed">
                  Gracias por escribir.
                  Intentaré responder lo antes posible.
                </p>

              </div>

            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">
                      Nombre
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-brand-panel border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">
                      Empresa
                    </label>

                    <input
                      type="text"
                      name="empresa"
                      className="w-full bg-brand-panel border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none transition-colors"
                      placeholder="Empresa o proyecto"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-brand-panel border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">
                      Tipo de proyecto
                    </label>

                    <select
                      name="tipo"
                      className="w-full bg-brand-panel border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="web">Web corporativa</option>
                      <option value="app">Aplicación web</option>
                      <option value="frontend">Frontend/UI</option>
                      <option value="ux">UX / rendimiento</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">
                    Cuéntame un poco
                  </label>

                  <textarea
                    name="mensaje"
                    required
                    rows={6}
                    className="w-full bg-brand-panel border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none resize-none transition-colors"
                    placeholder="Idea, proyecto, problema que quieres resolver..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all bg-brand-accent text-white hover:bg-white hover:text-black disabled:opacity-50"
                >
                  {state.submitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>

              </form>

            )}

          </motion.div>

        </div>
      </div>
    </div>
  );
}