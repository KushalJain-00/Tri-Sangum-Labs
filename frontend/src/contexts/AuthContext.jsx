import { useState, useEffect } from 'react';
import api, { setAuthToken } from '../lib/api';
import { supabase } from '../lib/supabase';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthToken(session?.access_token);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthToken(session?.access_token);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/api/v1/auth/login', { email, password });
    setUser(data.user);
    setSession({ access_token: data.access_token });
    setAuthToken(data.access_token);
    return data;
  };

  const register = async ({ email, password, username, full_name }) => {
    const { data } = await api.post('/api/v1/auth/register', {
      email,
      password,
      username,
      full_name,
    });
    setUser(data.user);
    setSession({ access_token: data.access_token });
    setAuthToken(data.access_token);
    return data;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setSession(null);
      setAuthToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
