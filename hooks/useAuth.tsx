import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getMockAuthUser, setMockAuthUser } from '@/lib/storage';
import type { UserProfile } from '@/lib/types';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  isMock: boolean;
  signIn: (email: string, displayName?: string) => Promise<void>;
  signUp: (email: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Mock auth provider for Phase 1/2.
 * In Phase 3 this is replaced with Supabase Auth (email/password).
 * The public API stays the same so components don't change.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMockAuthUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = async (email: string, displayName?: string) => {
    const profile: UserProfile = {
      id: `mock-${Date.now()}`,
      display_name: displayName || email.split('@')[0],
      email,
      created_at: new Date().toISOString(),
    };
    await setMockAuthUser(profile);
    setUser(profile);
  };

  const signUp = async (email: string, displayName: string) => {
    const profile: UserProfile = {
      id: `mock-${Date.now()}`,
      display_name: displayName,
      email,
      created_at: new Date().toISOString(),
    };
    await setMockAuthUser(profile);
    setUser(profile);
  };

  const signOut = async () => {
    await setMockAuthUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isMock: true, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
