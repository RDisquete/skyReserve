import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  initAuth: () => Promise<void>;
  fetchUserRole: () => Promise<void>;
}

// Función para obtener el role desde la tabla profiles
const fetchUserRole = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  
  if (error || !data) return false;
  return data.role === 'admin';
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      loading: false,
      initialized: false,

      fetchUserRole: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;
        
        const isAdmin = await fetchUserRole(session.user.id);
        set({ isAdmin });
      },

      signIn: async (email, password) => {
        set({ loading: true });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        set({ loading: false });
        if (error) return { error };
        
        // Verificar role desde la DB
        const isAdmin = await fetchUserRole(data.user.id);
        set({ user: data.user, isAdmin });
        
        return { error: null };
      },

      signUp: async (email, password) => {
        set({ loading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          set({ loading: false });
          if (error) {
            console.error('SignUp error:', error);
            return { error };
          }
          if (data.user) {
            // No intentar crear perfil aquí - dejar que el trigger de Supabase lo haga
            set({ user: data.user, isAdmin: false });
          }
          return { error: null };
        } catch (err) {
          set({ loading: false });
          console.error('SignUp exception:', err);
          return { error: err as Error };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAdmin: false });
      },

      initAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const isAdmin = await fetchUserRole(session.user.id);
          set({ user: session.user, isAdmin });
        }
        set({ initialized: true });

        supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            const isAdmin = await fetchUserRole(session.user.id);
            set({ user: session.user, isAdmin });
          } else {
            set({ user: null, isAdmin: false });
          }
        });
      },
    }),
    { name: 'skyreserve-auth' }
  )
);