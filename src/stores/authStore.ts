import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {User, Session} from '@supabase/supabase-js';
import {supabase} from '@/lib/supabaseClient';
import {toast} from 'sonner';
import {useShowStore} from '@/stores/showStore';

/** Avoid showing another user's cached shows after switch-account / re-login. */
let lastShowsOwnerId: string | null = null;

function syncShowsWithSession(session: Session | null) {
  const userId = session?.user?.id ?? null;
  if (userId === lastShowsOwnerId) return;
  lastShowsOwnerId = userId;
  useShowStore.getState().clearShows();
}

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;

  initialize: () => Promise<void>;
  signInWithPassword: (
    email: string,
    password: string,
  ) => Promise<{error: any}>;
  signInWithOAuth: (provider: 'google') => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,

      initialize: async () => {
        try {
          const {
            data: {session},
            error,
          } = await supabase.auth.getSession();
          if (error) {
            console.error('Error getting session:', error);
            set({loading: false});
            return;
          }

          set({
            session,
            user: session?.user ?? null,
            loading: false,
          });
          syncShowsWithSession(session);
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({loading: false});
        }
      },

      signInWithPassword: async (email: string, password: string) => {
        set({loading: true});
        try {
          const {data, error} = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

          if (error) throw error;

          set({
            user: data.user,
            session: data.session,
            loading: false,
          });
          syncShowsWithSession(data.session);

          toast.success('Login realizado!', {
            description: 'Bem-vindo de volta!',
          });

          return {error: null};
        } catch (error: any) {
          const message = error.message || 'Credenciais inválidas';
          toast.error('Erro no login', {
            description: message,
          });
          set({loading: false});
          return {error};
        }
      },

      signInWithOAuth: async (provider: 'google') => {
        try {
          const {error} = await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo: window.location.origin,
            },
          });

          if (error) throw error;
        } catch (error: any) {
          toast.error('Erro ao conectar com Google', {
            description: error.message,
          });
        }
      },

      signOut: async () => {
        try {
          const {error} = await supabase.auth.signOut();
          if (error) {
            console.error('Error signing out:', error);
            return;
          }

          set({
            user: null,
            session: null,
            loading: false,
          });
          syncShowsWithSession(null);
        } catch (error) {
          console.error('Error during sign out:', error);
        }
      },

      setUser: (user) => set({user}),
      setSession: (session) => set({session}),
      setLoading: (loading) => set({loading}),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    },
  ),
);

useAuthStore.getState().initialize();

supabase.auth.onAuthStateChange((event, session) => {
  syncShowsWithSession(session);
  useAuthStore.getState().setSession(session);
  useAuthStore.getState().setUser(session?.user ?? null);
  useAuthStore.getState().setLoading(false);
});
