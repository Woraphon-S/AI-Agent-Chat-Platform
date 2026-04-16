import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-3 p-4 mb-2">
      <div className="w-8 h-8 rounded-full bg-[var(--chat-bubble-ai)] flex items-center justify-center flex-shrink-0 shadow-sm ring-2 ring-[var(--border)] transition-colors">
        <Sparkles className="text-[var(--foreground)] w-4 h-4 transition-colors" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="bg-[var(--chat-bubble-ai)] px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center border border-[var(--border)] transition-colors">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
