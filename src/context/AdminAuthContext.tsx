import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  email: string;
  isDemo: boolean;
  id?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithPassword = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Basic administrative verification
    if (!email || !password) {
      return { success: false, error: 'Fadlan geli email-ka iyo furaha sirta ah.' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Furaha sirta ah waa inuu ugu yaraan 4 xaraf ka koobnaadaa.' };
    }

    const authUser: AdminUser = {
      email: email.trim().toLowerCase(),
      isDemo: false,
      id: 'admin-' + Date.now(),
    };

    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    return { success: true };
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
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        loginWithPassword,
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
