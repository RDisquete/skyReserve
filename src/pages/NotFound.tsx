import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-10 bg-main flex items-center justify-center">
      <div className="text-center">
        <div className="text-[120px] font-bold text-brand-accent/20 leading-none font-mono">404</div>
        <h1 className="text-3xl font-light text-text-primary tracking-tighter uppercase italic mt-4 mb-4">
          Página no <span className="font-bold">encontrada</span>
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          La ruta que buscas no existe o ha sido movida.
        </p>
        <Link 
          to="/"
          className="inline-block px-8 py-4 bg-brand-accent text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}