import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chat.store';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import { Send, Hash } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { messages, currentChatId, sendMessage, isLoading } = useChatStore();
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
      <div className="flex-1 flex flex-col items-center justify-center text-[var(--muted)] bg-[var(--background)]">
        <Hash size={48} className="mb-4 opacity-10" />
        <p className="text-sm font-medium">Select or create a chat to begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--background)] relative transition-colors duration-300">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageItem key={index} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-[var(--background)] border-t border-[var(--border)] transition-colors">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="pt-2">

          <div className="flex items-center gap-3 bg-[var(--secondary)] border border-[var(--border)] p-2 pl-4 rounded-2xl focus-within:border-[var(--foreground)] transition-all shadow-sm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask MONTO AI..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--foreground)] py-2"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-xl hover:opacity-90 disabled:opacity-50 transition-all font-bold"
            >
              <Send size={18} />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
