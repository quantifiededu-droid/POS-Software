import React from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Circle,
  MoreVertical,
  CheckCheck
} from 'lucide-react';

export default function Chat() {
  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Conversations List */}
      <Card className="w-80 p-0 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-50 space-y-4">
          <h3 className="font-bold text-lg text-navy">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-gold/20 outline-none"
              placeholder="Search staff..."
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3].map(i => (
            <button key={i} className={`w-full p-6 flex items-center gap-4 hover:bg-gray-50 transition-all border-b border-gray-50 ${i === 1 ? 'bg-gold/5' : ''}`}>
               <div className="relative">
                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">S</div>
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
               </div>
               <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-navy text-sm">Shopkeeper {i}</p>
                    <span className="text-[10px] font-bold text-gray-400">10:45 AM</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">Is the new stock of coffee in yet?</p>
               </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 p-0 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">S</div>
            <div>
              <p className="font-bold text-navy text-sm">Shopkeeper 1</p>
              <div className="flex items-center gap-1">
                <Circle size={8} className="fill-green-500 text-green-500" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Now</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-navy rounded-lg"><MoreVertical size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[70%]">
               <p className="text-sm font-medium text-navy">Good morning sir, we just ran out of Premium Coffee beans. Should I put in a restock order now?</p>
               <span className="text-[10px] text-gray-400 font-bold block mt-2 text-right uppercase">09:12 AM</span>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-gold shrink-0 flex items-center justify-center font-bold text-navy text-[10px]">C</div>
            <div className="bg-navy p-4 rounded-2xl rounded-tr-none max-w-[70%]">
               <p className="text-sm font-medium text-white">Yes please, go ahead. Add 50 units for now. I'll check the invoice later this evening.</p>
               <div className="flex items-center justify-end gap-1 mt-2 text-white/50">
                  <span className="text-[10px] font-bold uppercase">09:15 AM</span>
                  <CheckCheck size={12} />
               </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-50 shrink-0">
          <form className="flex gap-4">
             <input 
               className="flex-1 bg-gray-50 border-none outline-none px-6 py-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-gold/20"
               placeholder="Write your message here..."
             />
             <button className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center hover:bg-navy/90 transition-all active:scale-95">
               <Send size={24} />
             </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
