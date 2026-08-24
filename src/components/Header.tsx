import React from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  Landmark, 
  User, 
  Bell, 
  LogOut 
} from 'lucide-react';
import { ActiveTab, UserProfile, AppNotification } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: UserProfile;
  notifications: AppNotification[];
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  notifications,
  onLogout,
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Landmark },
    { id: 'transfer' as ActiveTab, label: 'Transfer', icon: ArrowLeftRight },
    { id: 'loan' as ActiveTab, label: 'Loan', icon: Building2 },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 shadow-sm">
        {/* Main Navigation Header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18">
            
            {/* Bank Brand Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer" 
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#002d72] flex items-center justify-center shadow-md shrink-0">
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#002d72]">
                    Trust<span className="text-[#0047bb]">Bank</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-50 text-[#0047bb] font-extrabold border border-blue-200">
                    Online
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 -mt-0.5 font-semibold hidden md:block">
                  Wealth Management &bull; Member FDIC
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0047bb] text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              
              {/* Notifications Button */}
              <button
                id="header-notifications-btn"
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#0047bb] text-white border-[#0047bb]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-[#0047bb] hover:bg-white'
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0047bb] text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Pill */}
              <button
                id="header-profile-btn"
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-1.5 sm:gap-2.5 pl-2 sm:pl-2.5 pr-2.5 sm:pr-3.5 py-1 sm:py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 border-[#0047bb] text-[#002d72]'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-white'
                }`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#002d72] flex items-center justify-center font-bold text-[11px] sm:text-xs text-white">
                  AB
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">
                    {userProfile.fullName}
                  </p>
                  <p className="text-[10px] text-[#0047bb] font-semibold mt-0.5">
                    Verified Client
                  </p>
                </div>
              </button>

              {/* Logout Button */}
              <button
                id="header-logout-btn"
                type="button"
                onClick={onLogout}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Bar for Fast One-Tap Switching on Handheld Screens */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)] no-print">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#0047bb] font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-[#0047bb]' : 'text-slate-500'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
