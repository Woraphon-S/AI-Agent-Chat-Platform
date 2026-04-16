import React, { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [isRegister, setIsRegister] = useState(false);
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await api.post('/auth/register', { email, password });
        toast.success('Account created! Please sign in.');
        setIsRegister(false);
      } else {
        const res = await api.post('/auth/login', { email, password });
        setAuth(res.data.user, res.data.token);
        toast.success(`Welcome back, ${res.data.user.name || 'User'}!`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-2xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
             <Cpu className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm font-medium">The minimalist AI companion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-secondary transition-all text-sm font-medium"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-secondary transition-all text-sm font-medium"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl hover:shadow-gray-200 transition-all mt-4"
          >
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-gray-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-secondary font-bold hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
