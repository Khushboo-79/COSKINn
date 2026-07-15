export const ContentAnalyticsScreen = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            
          </h2>
          <p className="text-sm text-slate-500">Manage  details.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-400 mb-2">Coming Soon</h3>
          <p className="text-slate-500 max-w-md">This module is currently under development. Please check back later for updates.</p>
        </div>
      </div>
    </div>
  );
};
