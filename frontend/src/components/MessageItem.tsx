import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuthStore } from '../store/auth.store';

interface MessageItemProps {
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({ role, content, createdAt }) => {
  const isUser = role === 'user';
  const { user } = useAuthStore();
  
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) return 'Today';
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const avatarWidthClass = 'w-8';
  const gapClass = 'gap-3';
  const offsetClass = 'mx-11'; // Offset for name/date (w-8 + gap-3 = 44px = 11 units)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col p-4 mb-2"
    >
      {/* Name Section - Offset horizontally to align with bubble */}
      <p className={`text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ${
        isUser ? `text-right ${offsetClass}` : `text-left ${offsetClass}`
      }`}>
        {isUser ? (user?.name || 'User') : 'MONTO AI'}
      </p>

      {/* Bubble Row - Avatar and Bubble centered vertically */}
      <div className={`flex items-center ${gapClass} ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-all overflow-hidden ${
        isUser ? 'bg-[var(--chat-bubble-user)] ring-2 ring-[var(--border)]' : 'bg-[var(--chat-bubble-ai)] ring-2 ring-[var(--border)]'
      }`}>
          {isUser ? (
            user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="user avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="text-[var(--background)] w-4 h-4" />
            )
          ) : (
            <Sparkles className="text-[var(--foreground)] w-4 h-4" />
          )}
        </div>

        <div className={`p-4 shadow-sm text-sm leading-relaxed max-w-[80%] ${
          isUser 
            ? 'bg-[var(--chat-bubble-user)] text-[var(--background)] rounded-2xl rounded-tr-none' 
            : 'bg-[var(--chat-bubble-ai)] text-[var(--foreground)] rounded-2xl rounded-tl-none'
        }`}>
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : ''}`}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg my-4 shadow-lg !bg-[#1E1E1E]"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className} bg-black/10 px-1.5 py-0.5 rounded font-semibold`} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Date Section - Offset horizontally to align with bubble */}
      <div className={`flex gap-2 mt-1 text-[9px] font-bold uppercase tracking-tighter text-gray-300 ${
        isUser ? `justify-end ${offsetClass}` : `justify-start ${offsetClass}`
      }`}>
        <span>{formatDate(createdAt)}</span>
        <span>•</span>
        <span>{formatTime(createdAt)}</span>
      </div>
    </motion.div>
  );
};
