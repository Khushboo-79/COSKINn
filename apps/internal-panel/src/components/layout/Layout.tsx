import type { ReactNode } from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-rose-50/20 font-sans overflow-hidden">
      <TopNavbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 relative overflow-hidden flex flex-col">
          {/* Background blobs for premium feel */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 animate-blob animation-delay-2000"></div>

          <div className="flex-1 overflow-hidden relative z-10 bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/60 shadow-xl shadow-rose-100/20 p-2">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
