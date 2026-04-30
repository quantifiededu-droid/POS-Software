import React from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  Settings as SettingsIcon, 
  Building2, 
  User, 
  Shield, 
  HardDrive, 
  Trash2, 
  CloudUpload,
  Globe
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Settings() {
  const { business, user } = useStore();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-navy tracking-tight">System Settings</h2>
        <p className="text-gray-500 font-medium font-serif italic text-sm">Configure your app preferences and profile.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Navigation Rail */}
        <div className="col-span-1 space-y-2">
           {[
             { id: 'business', icon: Building2, label: 'Business Profile' },
             { id: 'profile', icon: User, label: 'Owner Profile' },
             { id: 'app', icon: Globe, label: 'App Preferences' },
             { id: 'data', icon: HardDrive, label: 'Data & Backup' },
             { id: 'security', icon: Shield, label: 'Security' },
           ].map(item => (
             <button 
               key={item.id}
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${
                 item.id === 'business' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-gray-400 hover:bg-gray-100 hover:text-navy'
               }`}
             >
               <item.icon size={20} />
               <span>{item.label}</span>
             </button>
           ))}
        </div>

        {/* Setting Panels */}
        <div className="col-span-2 space-y-8">
          <Card className="space-y-6">
            <h3 className="text-lg font-black text-navy border-b pb-4">Business Information</h3>
            <div className="flex items-center gap-6 pb-4">
              <div className="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-300 font-bold">
                LOGO
              </div>
              <div className="space-y-2">
                 <Button size="sm" variant="outline">Upload New Logo</Button>
                 <p className="text-[10px] text-gray-400 font-bold uppercase">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <Input label="Business Name" defaultValue={business?.name} />
            <Input label="Registered Email" defaultValue={business?.email} />
            <div className="grid grid-cols-2 gap-4">
               <Input label="Phone Number" defaultValue={business?.phone} />
               <Input label="Currency Symbol" defaultValue="$" />
            </div>
            <Input label="Business Address" defaultValue={business?.address} />
            <Button className="w-full h-14">Save Changes</Button>
          </Card>

          <Card className="space-y-6">
            <h3 className="text-lg font-black text-navy border-b pb-4">Data Management</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-6 rounded-2xl border-2 border-gray-50 hover:border-gold hover:bg-gold/5 transition-all flex flex-col items-center text-center gap-3 group">
                 <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <HardDrive size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-navy">Export Database</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Download .db backup</p>
                 </div>
              </button>
              <button className="p-6 rounded-2xl border-2 border-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center text-center gap-3 group">
                 <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <CloudUpload size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-navy">Restore Backup</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Upload .db file</p>
                 </div>
              </button>
            </div>
          </Card>

          <Card className="border-red-100 bg-red-50/10 space-y-4">
             <div className="flex items-center gap-4 text-red-500">
               <Trash2 size={24} />
               <h3 className="font-bold">Danger Zone</h3>
             </div>
             <p className="text-xs text-gray-500 font-medium font-serif italic">Permanently delete all sales records, inventory data, and business configuration. This action cannot be undone.</p>
             <button className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">Reset System Settings</button>
          </Card>
        </div>
      </div>
    </div>
  );
}
