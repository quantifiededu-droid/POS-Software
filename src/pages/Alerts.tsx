import React from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  Bell, 
  Settings, 
  Smartphone, 
  Mail, 
  AlertTriangle,
  History,
  CheckCircle2
} from 'lucide-react';

export default function Alerts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Notification Center</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Configure how system alerts reach you.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <History size={20} />
          <span>Alert Logs</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-navy text-white rounded-xl"><Smartphone size={24} /></div>
              <div>
                <h3 className="font-bold text-navy">SMS Alerts (Twilio)</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Mobile Notifications</p>
              </div>
            </div>
            <Input label="Twilio Account SID" type="password" placeholder="ACxxxxxxxxxxxx" />
            <Input label="Twilio Auth Token" type="password" placeholder="••••••••••••" />
            <Input label="Recipient Phone Number" placeholder="+1234567890" />
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-sm font-bold text-navy">Service Active</span>
              </div>
              <Button size="sm" variant="outline" className="py-2 text-[10px]">Test Link</Button>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-navy text-white rounded-xl"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold text-navy">Email Alerts (NodeMailer)</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">In-box Notifications</p>
              </div>
            </div>
            <Input label="SMTP Server" placeholder="smtp.gmail.com" />
            <Input label="SMTP Port" placeholder="465" />
            <Input label="Recipient Email" placeholder="owner@clemtrix.com" />
            <Button className="w-full h-14">Save Configuration</Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-navy">Global Thresholds</h3>
              <AlertTriangle className="text-amber-500" size={24} />
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-navy">Default Low Stock Alert</span>
                    <span className="text-sm font-black text-gold">10 items</span>
                 </div>
                 <input type="range" className="w-full accent-gold h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-navy">Default Expiry Alert</span>
                    <span className="text-sm font-black text-gold">30 days</span>
                 </div>
                 <input type="range" className="w-full accent-gold h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-4">
                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                <p className="text-xs text-amber-700 font-medium">These settings apply to all products unless overridden individually in the product settings.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
