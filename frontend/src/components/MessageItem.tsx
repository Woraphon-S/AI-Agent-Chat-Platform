import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

interface MessageItemProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-4 p-6 ${isUser ? 'bg-white' : 'bg-gray-50 border-y border-gray-100'}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-black' : 'bg-secondary'}`}>
        {isUser ? <User className="text-white w-5 h-5" /> : <Sparkles className="text-white w-5 h-5" />}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
          {isUser ? 'You' : 'AI Assistant'}
        </p>
        <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
