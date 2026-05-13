import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, loading } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const redirectTo = location.state?.from || '/contratar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: authError } = isSignUp 
      ? await signUp(email, password)
      : await signIn(email, password);

    if (authError) {
      setError(authError.message);
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-10 bg-main transition-colors duration-500">
      <div className="max-w-md mx-auto">
        <header className="mb-12 text-center">
          <div className="flex items-center gap-2 text-brand-accent mb-4 justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Acceso Seguro</span>
          </div>
          <h1 className="text-4xl font-light text-text-primary tracking-tighter uppercase italic">
            {isSignUp ? 'Crear' : 'Iniciar'} <span className="font-bold">Cuenta</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-panel border border-text-primary/10 p-4 pl-12 text-[11px] text-text-primary focus:border-brand-accent outline-none uppercase tracking-widest"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-panel border border-text-primary/10 p-4 pl-12 text-[11px] text-text-primary focus:border-brand-accent outline-none uppercase tracking-widest"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-red-600 text-[10px] uppercase tracking-widest">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all bg-brand-accent text-white hover:bg-white hover:text-black shadow-xl shadow-brand-accent/20 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Cargando...' : isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>

          <p className="text-center text-[10px] text-text-secondary uppercase tracking-widest">
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-brand-accent hover:underline cursor-pointer"
            >
              {isSignUp ? 'Iniciar sesión' : 'Regístrate'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}