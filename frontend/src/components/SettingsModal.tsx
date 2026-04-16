import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bot, Key, Save, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import api from '../services/api';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1',
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<'profile' | 'ai'>('profile');
  const [loading, setLoading] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    avatarUrl: user?.avatarUrl || '',
    systemPrompt: user?.systemPrompt || '',
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const res = await api.put('/user/profile', {
        name: formData.name,
        avatarUrl: formData.avatarUrl
      });
      updateUser(res.data);
      toast.success('อัปเดตโปรไฟล์สำเร็จแล้ว');
      onClose();
    } catch (error) {
      toast.error('ไม่สามารถอัปเดตโปรไฟล์ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAI = async () => {
    setLoading(true);
    try {
      const res = await api.put('/user/settings', {
        systemPrompt: formData.systemPrompt
      });
      updateUser(res.data);
      toast.success('อัปเดตการตั้งค่า AI สำเร็จแล้ว');
      onClose();
    } catch (error) {
      toast.error('ไม่สามารถอัปเดตการตั้งค่า AI ได้');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--background)] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] border border-[var(--border)] transition-colors duration-300"
        >
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-[var(--secondary)] p-6 flex flex-col gap-2 border-r border-[var(--border)] transition-colors">
            <h2 className="text-xl font-bold mb-6 px-2 text-[var(--foreground)]">ตั้งค่า</h2>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === 'profile' ? 'bg-[var(--foreground)] text-[var(--background)] shadow-lg' : 'hover:bg-[var(--border)] text-[var(--muted)]'
              }`}
            >
              <User size={18} />
              <span className="font-medium text-sm">ข้อมูลโปรไฟล์</span>
            </button>
            
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === 'ai' ? 'bg-[var(--foreground)] text-[var(--background)] shadow-lg' : 'hover:bg-[var(--border)] text-[var(--muted)]'
              }`}
            >
              <Bot size={18} />
              <span className="font-medium text-sm">ตั้งค่า AI</span>
            </button>
            
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0 bg-[var(--background)] transition-colors">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h3 className="font-bold text-lg text-[var(--foreground)]">
                {activeTab === 'profile' ? 'การตั้งค่าโปรไฟล์' : 'ข้อมูลพฤติกรรม AI'}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-[var(--secondary)] text-[var(--muted)] rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'profile' ? (
                <div className="space-y-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                      <img 
                        src={formData.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-3xl object-cover bg-gray-100 border-4 border-white shadow-xl transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      {PRESET_AVATARS.map((url) => (
                        <button
                          key={url}
                          onClick={() => setFormData({ ...formData, avatarUrl: url })}
                          className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${
                            formData.avatarUrl === url ? 'border-black scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt="preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--muted)] uppercase ml-1">ชื่อเต็ม</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-4 bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/5 focus:bg-[var(--background)] transition-all"
                        placeholder="ระบุชื่อของคุณ"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--muted)] uppercase ml-1">คำสั่งระบบ (System Prompt)</label>
                      <textarea 
                        rows={10}
                        value={formData.systemPrompt}
                        onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                        className="w-full p-5 bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/5 focus:bg-[var(--background)] transition-all font-mono text-sm leading-relaxed"
                        placeholder="เช่น คุณคือวิศวกรซอฟต์แวร์อาวุโส ให้ตอบคำถามด้วยท่าทีที่เป็นมืออาชีพ..."
                      />
                    </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--background)]">
              <button 
                onClick={onClose}
                className="px-6 py-3 font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
              >
                ยกเลิก
              </button>
              <button 
                disabled={loading}
                onClick={activeTab === 'profile' ? handleSaveProfile : handleSaveAI}
                className="flex items-center gap-2 px-8 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-2xl font-bold hover:opacity-80 disabled:opacity-50 transition-all shadow-lg active:scale-95"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    <span>บันทึกการเปลี่ยนแปลง</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
