import React from 'react';
import { useChatStore } from '../store/chat.store';
import { useAuthStore } from '../store/auth.store';
import { Plus, MessageSquare, LogOut, Settings, Cpu, Trash2, User as UserIcon, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsModal } from './SettingsModal';
import { ConfirmModal } from './ConfirmModal';
import { useThemeStore } from '../store/theme.store';

export const Sidebar: React.FC = () => {
  const { chats, fetchChats, createChat, setCurrentChat, currentChatId, deleteChat } = useChatStore();
  const { logout, user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  const [confirmModal, setConfirmModal] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant: 'danger' | 'primary';
    icon: 'trash' | 'logout' | 'alert';
    confirmText?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'primary',
    icon: 'alert'
  });

  React.useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-80 h-full bg-[var(--sidebar)] border-r border-[var(--border)] flex flex-col p-4 z-10 shadow-[10px_0_30px_rgba(0,0,0,0.03)] transition-colors duration-300">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--foreground)] rounded-lg flex items-center justify-center transition-colors">
            <Cpu className="text-[var(--background)] w-5 h-5 transition-colors" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-[var(--foreground)]">MONTO AI</h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-[var(--secondary)] text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <button
        onClick={() => createChat('บทสนทนาใหม่')}
        className="flex items-center gap-2 w-full p-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl hover:opacity-80 transition-all mb-6 shadow-sm"
      >
        <Plus size={18} />
        <span className="font-medium">เริ่มแชทใหม่</span>
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
              ? 'bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]' 
              : 'text-[var(--muted)] hover:bg-[var(--secondary)]'
            } group`}
          >
            <MessageSquare size={18} />
            <span className="truncate flex-1 text-sm font-medium">{chat.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmModal({
                  isOpen: true,
                  title: 'คุณแน่ใจหรือไม่?',
                  message: 'บทสนทนาและข้อมูลทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้',
                  onConfirm: () => deleteChat(chat.id),
                  variant: 'danger',
                  icon: 'trash',
                  confirmText: 'ใช่, ลบทิ้งเลย'
                });
              }}
              className="p-1 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        
        <div 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-3 p-3 text-gray-500 rounded-xl hover:bg-gray-50 cursor-pointer transition-all"
        >
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="profile" className="w-[18px] h-[18px] rounded-md object-cover" />
          ) : (
            <UserIcon size={18} />
          )}
          <span className="text-sm font-medium truncate flex-1">{user?.name || 'ตั้งค่า'}</span>
          <Settings size={18} className="text-gray-300" />
        </div>
        <div 
          onClick={() => {
            setConfirmModal({
              isOpen: true,
              title: 'ออกจากระบบ?',
              message: 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบในตอนนี้?',
              onConfirm: () => logout(),
              variant: 'danger',
              icon: 'logout',
              confirmText: 'ใช่, ออกจากระบบ'
            });
          }}
          className="flex items-center gap-3 p-3 text-red-500 rounded-xl hover:bg-red-50 cursor-pointer transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">ออกจากระบบ</span>
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        variant={confirmModal.variant}
        icon={confirmModal.icon}
        confirmText={confirmModal.confirmText}
      />
    </div>
  );
};
