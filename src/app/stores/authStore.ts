import { create } from 'zustand';
import { IUser } from '@/models/user';

interface AuthResult {
  success: boolean;
  code?: string;
  message?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  fetchUser: () => Promise<AuthResult>;
  login: (data: { email: string; password: string }) => Promise<AuthResult>;
  signup: (data: { name: string; email: string; password: string }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  setUser: (user: IUser | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  loading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/auth/me');
      const result = await res.json();

      if (!res.ok || !result.success) {
        set({ user: null, isAuthenticated: false });
        return {
          success: false,
          code: result.code || 'FETCH_FAILED',
          message: result.message || 'Failed to fetch user.'
        };
      }

      const user = result.data.user;
      console.log("Fetched user:", user);
      set({ user, isAuthenticated: true });
      return { success: true };

    } catch (err: unknown) {
      set({ user: null, isAuthenticated: false });
      return {
        success: false,
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error occurred'
      };
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          code: result.code || 'LOGIN_FAILED',
          message: result.message || 'Login failed',
        };
      }

      return await get().fetchUser();

    } catch (err: unknown) {
      set({ loading: false });
      return {
        success: false,
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error occurred'
      };
    }
  },

  signup: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          code: result.code || 'REGISTER_FAILED',
          message: result.message || 'Registration failed',
        };
      }

      return {
        success: true,
        code: result.code,
        message: result.message,
      };

    } catch (err: unknown) {
      return {
        success: false,
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error occurred'
      };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ user: null, isAuthenticated: false, loading: false });
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err: unknown) {
      console.error("Logout API call failed:", err instanceof Error ? err.message : err);
    }
  },
}));
