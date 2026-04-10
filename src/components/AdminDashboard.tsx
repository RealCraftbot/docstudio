import React from 'react';
import { useTemplateStore } from '../store/useTemplateStore';
import { TEMPLATES } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { BarChart3, Users, FileText, Settings, ArrowLeft, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const { salesData, userHistory } = useTemplateStore();

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans">
      {/* Top Nav */}
      <nav className="border-b border-[#141414] px-8 py-4 flex justify-between items-center bg-white">
        <div className="flex items-center space-x-8">
          <button onClick={onBack} className="hover:opacity-60 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-serif italic text-xl tracking-tight">DocStudio / Admin Console</h1>
        </div>
        <div className="flex items-center space-x-6 text-[11px] uppercase tracking-widest font-bold opacity-50">
          <span>System Status: Optimal</span>
          <span>v2.4.1</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Stats Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            label="Total Revenue" 
            value={`$${salesData.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            icon={<DollarSign className="w-4 h-4" />}
            trend="+12.5%"
          />
          <StatCard 
            label="Documents Generated" 
            value={salesData.count.toString()} 
            icon={<FileText className="w-4 h-4" />}
            trend="+4.2%"
          />
          <StatCard 
            label="Active Templates" 
            value={TEMPLATES.length.toString()} 
            icon={<Settings className="w-4 h-4" />}
          />
        </div>

        {/* Templates Table */}
        <div className="col-span-12 lg:col-span-8 border border-[#141414] bg-white">
          <div className="p-4 border-b border-[#141414] flex justify-between items-center">
            <h2 className="font-serif italic text-lg">Template Inventory</h2>
            <button className="text-[10px] uppercase tracking-widest font-bold border border-[#141414] px-3 py-1 hover:bg-[#141414] hover:text-white transition-all">
              Add New Template
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#141414] bg-[#f9f9f7]">
                  <th className="p-4 font-serif italic text-[11px] uppercase opacity-50">ID</th>
                  <th className="p-4 font-serif italic text-[11px] uppercase opacity-50">Name</th>
                  <th className="p-4 font-serif italic text-[11px] uppercase opacity-50">Category</th>
                  <th className="p-4 font-serif italic text-[11px] uppercase opacity-50">Base Price</th>
                  <th className="p-4 font-serif italic text-[11px] uppercase opacity-50">Status</th>
                </tr>
              </thead>
              <tbody>
                {TEMPLATES.map((t) => (
                  <tr key={t.id} className="border-b border-[#141414]/10 hover:bg-[#141414] hover:text-white cursor-pointer transition-colors group">
                    <td className="p-4 font-mono text-xs">{t.id.split('-')[0]}...</td>
                    <td className="p-4 font-medium">{t.name}</td>
                    <td className="p-4 text-xs opacity-60 group-hover:opacity-100">{t.category}</td>
                    <td className="p-4 font-mono text-xs">${t.basePrice.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                      <span className="text-[10px] uppercase font-bold">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-4 border border-[#141414] bg-white">
          <div className="p-4 border-b border-[#141414]">
            <h2 className="font-serif italic text-lg">Recent Activity</h2>
          </div>
          <div className="p-4 space-y-6">
            {userHistory.length > 0 ? (
              userHistory.map((h, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#141414] text-white flex items-center justify-center rounded-sm text-xs font-mono">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{h.action}</p>
                    <p className="text-[10px] opacity-50 uppercase font-bold">{h.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center opacity-30">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p className="font-serif italic">No recent activity recorded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string, value: string, icon: React.ReactNode, trend?: string }) {
  return (
    <div className="border border-[#141414] p-6 bg-white relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 border border-[#141414] group-hover:bg-[#141414] group-hover:text-white transition-colors">
          {icon}
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-[10px] font-bold">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <p className="font-serif italic text-[11px] uppercase opacity-50 mb-1">{label}</p>
      <p className="text-3xl font-mono tracking-tighter">{value}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#141414] transform translate-y-full group-hover:translate-y-0 transition-transform" />
    </div>
  );
}
