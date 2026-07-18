import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-slate-200/60 shadow-sm">
          <div className="flex justify-between items-center h-16 px-8">
            <h1 className="text-xl font-semibold text-slate-800">
              Internal Admin Panel
            </h1>
          </div>
        </header>
        <main className="flex-1 w-full p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
