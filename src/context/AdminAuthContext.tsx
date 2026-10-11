import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

interface AdminUser {
  email: string;
  isDemo: boolean;
  id?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithSupabase: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithDemo: (email?: string) => void;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'portfolio_admin_auth_user';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Supabase auth state listener
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setIsLoading(false);
      return;
    }

    client.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email && !user?.isDemo) {
        const authUser: AdminUser = {
          email: session.user.email,
          isDemo: false,
          id: session.user.id,
        };
        setUser(authUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const authUser: AdminUser = {
          email: session.user.email,
          isDemo: false,
          id: session.user.id,
        };
        setUser(authUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      } else if (!user?.isDemo) {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const loginWithSupabase = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const client = getSupabaseClient();
    if (!client) {
      return {
        success: false,
        error: 'Supabase lama xirin. Fadlan isticmaal "Demo Mode Login" ama geli furayaasha Supabase qaybta Settings.',
      };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user?.email) {
        const authUser: AdminUser = {
          email: data.user.email,
          isDemo: false,
          id: data.user.id,
        };
        setUser(authUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        return { success: true };
      }

      return { success: false, error: 'Xaqiijinta gelitaanka waa lagu guuldareystay.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Cilad lama filaan ah ayaa dhacday' };
    }
  };

  const loginWithDemo = (email: string = 'admin@portfolio.local') => {
    const authUser: AdminUser = {
      email,
      isDemo: true,
      id: 'demo-admin-id',
    };
    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
  };

  const logout = async () => {
    const client = getSupabaseClient();
    if (client && !user?.isDemo) {
      try {
        await client.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        loginWithSupabase,
        loginWithDemo,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
