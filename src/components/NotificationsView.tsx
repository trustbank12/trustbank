import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  ArrowDownLeft, 
  ArrowLeftRight, 
  Building2, 
  Zap, 
  Check, 
  Trash2, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onDeleteNotification: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onDeleteNotification,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.isRead;
    return n.type === filterType;
  });

  const getIconForType = (type: AppNotification['type']) => {
    switch (type) {
      case 'security': return ShieldCheck;
      case 'received': return ArrowDownLeft;
      case 'transfer': return ArrowLeftRight;
      case 'loan': return Building2;
      case 'electricity': return Zap;
      default: return Info;
    }
  };

  const getColorClass = (type: AppNotification['type']) => {
    switch (type) {
      case 'security': return 'bg-blue-50 border-blue-200 text-[#0047bb]';
      case 'received': return 'bg-teal-50 border-teal-200 text-teal-700';
      case 'transfer': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'loan': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'electricity': return 'bg-amber-50 border-amber-200 text-amber-700';
      default: return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0047bb] text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-[#0047bb]" />
            <span>Activity & Security Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Notifications Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Account Holder: <strong className="text-slate-900">Aminabibi Bulbuliya</strong> &bull; {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#0047bb]" />
              <span>Mark All Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="py-2 px-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 border border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'security', label: 'Security' },
          { id: 'received', label: 'Inflows' },
          { id: 'transfer', label: 'Transfers' },
          { id: 'loan', label: 'Loans' },
          { id: 'electricity', label: 'Electricity' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === tab.id
                ? 'bg-[#0047bb] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-medium">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No notifications in this category.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const Icon = getIconForType(notif.type);
            const colorCls = getColorClass(notif.type);

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  notif.isRead
                    ? 'bg-slate-50/70 border-slate-200 text-slate-700'
                    : 'bg-blue-50/40 border-blue-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${colorCls}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#0047bb] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono mt-1.5 block">
                      {notif.date}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteNotification(notif.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
