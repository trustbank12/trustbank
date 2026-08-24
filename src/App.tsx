import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  UserProfile, 
  Transaction, 
  LoanItem, 
  ElectricityMeter, 
  AppNotification 
} from './types';
import { 
  loadStoredData, 
  saveStoredData, 
  INITIAL_USER_PROFILE, 
  INITIAL_CHECKING_BALANCE, 
  INITIAL_SAVINGS_BALANCE, 
  INITIAL_TRANSACTIONS, 
  INITIAL_LOANS, 
  INITIAL_ELECTRICITY_METER, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { DashboardView } from './components/DashboardView';
import { TransferView } from './components/TransferView';
import { ReceivedView } from './components/ReceivedView';
import { LoanView } from './components/LoanView';
import { ElectricityView } from './components/ElectricityView';
import { ProfileView } from './components/ProfileView';
import { NotificationsView } from './components/NotificationsView';

export default function App() {
  // Load initial persistent state
  const initialData = loadStoredData();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialData.isLoggedIn);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  const [userProfile, setUserProfile] = useState<UserProfile>(initialData.profile);
  const [checkingBalance, setCheckingBalance] = useState<number>(INITIAL_CHECKING_BALANCE);
  const [savingsBalance, setSavingsBalance] = useState<number>(initialData.savingsBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(initialData.transactions);
  const [loans, setLoans] = useState<LoanItem[]>(initialData.loans);
  const [electricityMeter, setElectricityMeter] = useState<ElectricityMeter>(initialData.electricityMeter);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialData.notifications);

  // Periodic 2-minute check for pending transactions
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setTransactions(prev => {
        let hasChanges = false;
        const updated = prev.map(tx => {
          if (tx.status === 'Pending' && tx.createdAt && now - tx.createdAt >= 120000) {
            hasChanges = true;
            return {
              ...tx,
              status: 'Refunded' as const,
              refundedAt: now,
              note: `${tx.note || ''} (Refunded - 2 minute timeout exceeded)`.trim(),
            };
          }
          return tx;
        });

        if (hasChanges) {
          setCheckingBalance(INITIAL_CHECKING_BALANCE);
        }
        return hasChanges ? updated : prev;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    saveStoredData({
      profile: userProfile,
      checkingBalance,
      savingsBalance,
      transactions,
      loans,
      electricityMeter,
      notifications,
      isLoggedIn,
    });
  }, [userProfile, checkingBalance, savingsBalance, transactions, loans, electricityMeter, notifications, isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');

    // Add login notification
    const now = new Date();
    const loginNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Secure Session Initiated',
      message: `Authentication session active for Aminabibi Bulbuliya under TLS 1.3 cryptographic protection.`,
      type: 'security',
      date: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isRead: false,
    };

    setNotifications(prev => [loginNotif, ...prev]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  // When a transfer is submitted: It is recorded with "Pending" status and held subject to office note
  const handleExecutePendingTransfer = (newPendingTx: Transaction) => {
    setTransactions(prev => [newPendingTx, ...prev]);

    const now = new Date();
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Transfer Pending Settlement: $${newPendingTx.amount.toLocaleString()}`,
      message: `Transfer of $${newPendingTx.amount.toLocaleString()} to ${newPendingTx.recipientOrSender} is Pending (Ref: ${newPendingTx.referenceId}). Action required: Outstanding payment at nearest branch within 2 minutes.`,
      type: 'transfer',
      date: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isRead: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Refund transfer after 2 minutes or manually
  const handleRefundTransfer = (transactionId: string) => {
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === transactionId) {
          return {
            ...tx,
            status: 'Refunded',
            refundedAt: Date.now(),
            note: `${tx.note || ''} (Refunded)`.trim(),
          };
        }
        return tx;
      })
    );

    // Keep checking balance at $1,500,000.00
    setCheckingBalance(INITIAL_CHECKING_BALANCE);

    const now = new Date();
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Funds Refunded: Checking Balance $1,500,000.00`,
      message: `Pending transfer payment window closed. All funds refunded back to your account ($1,500,000.00).`,
      type: 'transfer',
      date: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isRead: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Pay Electricity Bill & Token Generation
  const handlePayElectricity = (amount: number, unitsKwh: number, meterNum: string, token: string) => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    const electricTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'electricity_bill',
      title: `Electricity Meter Recharge`,
      recipientOrSender: 'Trust Power & Energy Grid',
      accountNumber: `Meter #${meterNum.slice(0, 8)}`,
      bankName: 'Trust Power Gateway',
      amount: amount,
      date: dateStr,
      category: 'Electricity',
      status: 'Completed',
      referenceId: `TB-PWR-${Math.floor(100000 + Math.random() * 900000)}`,
      note: `${unitsKwh} kWh Token Generated (${token})`,
      sourceAccount: 'Checking',
    };

    setTransactions(prev => [electricTx, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Electricity Recharge Confirmed: $${amount.toLocaleString()}`,
      message: `${unitsKwh} kWh power units loaded for Meter #${meterNum}. Token: ${token}.`,
      type: 'electricity',
      date: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isRead: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Update Profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  // Toggle Card Freeze
  const handleToggleCardFreeze = () => {
    setUserProfile(prev => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        isFrozen: !prev.cardDetails.isFrozen,
      },
    }));
  };

  // Notification management
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Render Login Page if unauthenticated
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-900 flex flex-col justify-between selection:bg-[#0047bb] selection:text-white font-sans w-full overflow-x-hidden">
      
      {/* Header with Navigation & Identity */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        notifications={notifications}
        onLogout={handleLogout}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3.5 sm:py-8 pb-24 sm:pb-8">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            checkingBalance={checkingBalance}
            savingsBalance={savingsBalance}
            transactions={transactions}
            loans={loans}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'transfer' && (
          <TransferView
            userProfile={userProfile}
            checkingBalance={checkingBalance}
            savingsBalance={savingsBalance}
            onExecutePendingTransfer={handleExecutePendingTransfer}
            onRefundTransfer={handleRefundTransfer}
          />
        )}

        {activeTab === 'received' && (
          <ReceivedView
            userProfile={userProfile}
            checkingBalance={checkingBalance}
            transactions={transactions}
          />
        )}

        {activeTab === 'loan' && (
          <LoanView
            userProfile={userProfile}
            checkingBalance={checkingBalance}
            loans={loans}
          />
        )}

        {activeTab === 'electricity' && (
          <ElectricityView
            userProfile={userProfile}
            checkingBalance={checkingBalance}
            onPayElectricity={handlePayElectricity}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onToggleCardFreeze={handleToggleCardFreeze}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearNotifications={handleClearNotifications}
            onDeleteNotification={handleDeleteNotification}
          />
        )}

      </main>

      {/* Global Real Trust Bank Footer in White & Blue Styling */}
      <footer className="border-t border-slate-200 bg-white py-5 text-xs text-slate-500 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-[#002d72] font-heading text-sm">Trust Bank</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold">Online Banking Portal</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Account Holder: <strong className="text-slate-800 font-bold">Aminabibi Bulbuliya</strong> &bull; Member FDIC &bull; Equal Housing Lender
            </p>
          </div>
          <div className="text-[11px] text-slate-500 font-mono text-center sm:text-right">
            <span className="font-semibold text-[#0047bb]">256-Bit Encrypted Session</span>
            <p className="text-[10px] text-slate-400 mt-0.5">&copy; 2026 Trust Bank N.A. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
