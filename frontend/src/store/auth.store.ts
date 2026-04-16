import { create } from 'zustand';
import { useChatStore } from './chat.store';

interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  systemPrompt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    useChatStore.getState().reset();
    set({ user, token, isAuthenticated: true });
  },

  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    useChatStore.getState().reset();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
