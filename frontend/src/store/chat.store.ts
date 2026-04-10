import { create } from 'zustand';
import api from '../services/api';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface Chat {
  id: string;
  title: string;
}

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  messages: Message[];
  isLoading: boolean;
  activeProvider: string;
  
  fetchChats: () => Promise<void>;
  setCurrentChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  createChat: (title: string) => Promise<void>;
  setActiveProvider: (provider: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  messages: [],
  isLoading: false,
  activeProvider: 'gemini',

  fetchChats: async () => {
    const res = await api.get('/chats');
    set({ chats: res.data });
  },

  setActiveProvider: (provider) => set({ activeProvider: provider }),

  setCurrentChat: async (chatId) => {
    set({ currentChatId: chatId, isLoading: true });
    try {
      const res = await api.get(`/chats/${chatId}/messages`);
      set({ messages: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  createChat: async (title) => {
    const res = await api.post('/chats', { title });
    set(state => ({ chats: [res.data, ...state.chats], currentChatId: res.data.id, messages: [] }));
  },

  sendMessage: async (content) => {
    const { currentChatId, activeProvider, messages } = get();
    if (!currentChatId) return;

    // Optimistic UI
    const tempMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    };
    set({ messages: [...messages, tempMessage] });

    try {
      const res = await api.post('/chats/message', {
        chatId: currentChatId,
        content,
        provider: activeProvider
      });
      set(state => ({ messages: [...state.messages, res.data] }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message');
      console.error(error);
    }
  }
}));
