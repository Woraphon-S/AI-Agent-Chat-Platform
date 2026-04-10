import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatArea } from '../components/ChatArea';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden">
        <ChatArea />
      </main>
    </div>
  );
};
