import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import StatCard from '../../../components/StatCard';
import { Users, UserPlus, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const useHROverview = () => useQuery({
  queryKey: ['hrOverview'],
  queryFn: async () => {
    const { data } = await api.get('/admin/hr/overview');
    return data;
  }
});

const attendanceData = [
  { day: '10 May', present: 88, absent: 8 },
  { day: '11 May', present: 92, absent: 4 },
  { day: '12 May', present: 85, absent: 11 },
  { day: '13 May', present: 94, absent: 2 },
  { day: '14 May', present: 90, absent: 6 },
  { day: '15 May', present: 89, absent: 7 },
  { day: '16 May', present: 96, absent: 0 },
];

const leaveData = [
  { name: 'Casual Leave', value: 7, color: '#f43f5e' },
  { name: 'Sick Leave', value: 5, color: '#fb7185' },
  { name: 'Earned Leave', value: 4, color: '#fda4af' },
  { name: 'Other Leave', value: 2, color: '#fecdd3' },
];

export const HRDashboardScreen = () => {
  const { data: overview, isLoading } = useHROverview();

  if (isLoading) return <div className="p-8 text-center text-rose-500">Loading Dashboard...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Dashboard</h2>
          <p className="text-sm text-slate-500">Overview of employees, attendance, and leaves.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Employees" value={overview?.totalEmployees || '128'} subtitle="+12 this month" icon={Users} />
        <StatCard label="Present Today" value="96" subtitle="75% of total" icon={UserPlus} />
        <StatCard label="On Leave" value="18" subtitle="14% of total" icon={Calendar} />
        <StatCard label="New Joinees" value="8" subtitle="This month" icon={UserPlus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Attendance Overview</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
              <option>This Week</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="present" name="Present" fill="#fb7185" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="absent" name="Absent" fill="#fecdd3" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leave Summary Donut */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Leave Summary</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
              <option>This Month</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">18</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {leaveData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
