import { create } from 'zustand';
import api from '../services/api';
import { toast } from 'sonner';

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
  
  fetchChats: () => Promise<void>;
  setCurrentChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  createChat: (title: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  messages: [],
  isLoading: false,

  fetchChats: async () => {
    const res = await api.get('/chats');
    const chats = res.data;
    set({ chats });
    
    // Auto-select the most recent chat if none is selected
    if (chats.length > 0 && !get().currentChatId) {
      get().setCurrentChat(chats[0].id);
    }
  },


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
    const { currentChatId, messages } = get();
    if (!currentChatId) return;

    set({ isLoading: true });

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
      });
      set(state => ({ messages: [...state.messages, res.data] }));

      // If it was the first message, refresh chats to get auto-generated title
      if (messages.length === 0) {
        get().fetchChats();
      }
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      const serverMessage = error.response?.data?.message || '';
      if (serverMessage.includes('high demand')) {
        toast.error('ขณะนี้ MONTO AI มีผู้ใช้งานจำนวนมาก รบกวนลองใหม่อีกครั้งในภายหลังนะครับ');
      } else {
        toast.error(serverMessage || 'Failed to send message');
      }
      console.error(error);
    }
  },

  deleteChat: async (chatId) => {
    try {
      await api.delete(`/chats/${chatId}`);
      set(state => {
        const newChats = state.chats.filter(c => c.id !== chatId);
        const newState: Partial<ChatState> = { chats: newChats };
        
        if (state.currentChatId === chatId) {
          newState.currentChatId = null;
          newState.messages = [];
        }
        
        return newState;
      });
      toast.success('Chat deleted');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete chat';
      toast.error(errorMessage);
      console.error('[DEBUG] Delete Chat Error:', error.response?.data || error.message);
    }
  },

  reset: () => {
    set({ chats: [], currentChatId: null, messages: [], isLoading: false });
  }
}));
