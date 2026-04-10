import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chat.store';
import { MessageItem } from './MessageItem';
import { Send, Hash } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { messages, currentChatId, sendMessage, isLoading, activeProvider } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !currentChatId) return;
    sendMessage(input);
    setInput('');
  };

  if (!currentChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white">
        <Hash size={48} className="mb-4 opacity-20" />
        <p className="text-sm font-medium">Select or create a chat to begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageItem key={index} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="p-6 text-xs font-semibold text-secondary animate-pulse">
            AI is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 pl-4 rounded-2xl focus-within:border-secondary transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask anything to ${activeProvider}...`}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 py-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-secondary text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all font-bold"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
          Powered by {activeProvider.toUpperCase()} • Clean & Minimalist AI Agent
        </p>
      </div>
    </div>
  );
};
