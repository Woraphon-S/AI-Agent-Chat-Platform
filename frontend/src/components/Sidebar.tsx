import React from 'react';
import { useChatStore } from '../store/chat.store';
import { useAuthStore } from '../store/auth.store';
import { Plus, MessageSquare, LogOut, Settings, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const { chats, fetchChats, createChat, setCurrentChat, currentChatId, activeProvider, setActiveProvider } = useChatStore();
  const { logout, user } = useAuthStore();

  React.useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-80 h-full bg-white border-r border-gray-100 flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <Cpu className="text-white w-5 h-5" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">AI Agent</h1>
      </div>

      <button
        onClick={() => createChat('New Conversation')}
        className="flex items-center gap-2 w-full p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all mb-6 shadow-sm"
      >
        <Plus size={18} />
        <span className="font-medium">New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {chats.map((chat) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={chat.id}
            onClick={() => setCurrentChat(chat.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              currentChatId === chat.id 
              ? 'bg-gray-100 text-black border border-gray-200' 
              : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={18} />
            <span className="truncate flex-1 text-sm font-medium">{chat.title}</span>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex gap-2 p-1 bg-gray-50 rounded-lg mb-4">
           {['gemini', 'openai'].map(provider => (
             <button
               key={provider}
               onClick={() => setActiveProvider(provider)}
               className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                 activeProvider === provider ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'
               }`}
             >
               {provider.toUpperCase()}
             </button>
           ))}
        </div>
        
        <div className="flex items-center gap-3 p-3 text-gray-500 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </div>
        <div 
          onClick={logout}
          className="flex items-center gap-3 p-3 text-red-500 rounded-xl hover:bg-red-50 cursor-pointer transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};
