import React, { useState } from 'react';
import { 
  Landmark, 
  ArrowLeftRight, 
  ArrowDownLeft, 
  Building2, 
  Zap, 
  TrendingUp, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  ShieldCheck, 
  Search, 
  ArrowUpRight, 
  Lock, 
  FileText, 
  Wallet,
  Clock
} from 'lucide-react';
import { ActiveTab, UserProfile, Transaction, LoanItem } from '../types';
import { formatCurrency } from '../data/mockData';
import { ReceiptModal } from './ReceiptModal';

interface DashboardViewProps {
  userProfile: UserProfile;
  checkingBalance: number;
  savingsBalance: number;
  transactions: Transaction[];
  loans: LoanItem[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  checkingBalance,
  savingsBalance,
  transactions,
  loans,
  setActiveTab,
}) => {
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [copiedAcc, setCopiedAcc] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(userProfile.accountNumber.replace(/-/g, ''));
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipientOrSender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.referenceId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'transfers') return matchesSearch && (tx.type === 'transfer_out');
    if (filterCategory === 'received') return matchesSearch && (tx.type === 'received' || tx.type === 'salary_deposit');
    if (filterCategory === 'loans') return matchesSearch && (tx.type === 'loan_payment' || tx.type === 'loan_disbursement');
    if (filterCategory === 'electricity') return matchesSearch && (tx.type === 'electricity_bill');
    return matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-12">
      
      {/* 1. TOP BOX: Only show Welcome, Aminabibi Bulbuliya */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading tracking-tight break-words">
          Welcome, <span className="text-[#0047bb]">{userProfile.fullName}</span>
        </h1>
      </div>

      {/* 2. DEDICATED AMOUNT BOX: Available Balance, $1,500,000.00, Checking: $1,500,000.00 */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Wallet className="w-4 h-4 text-[#0047bb] shrink-0" />
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                Available Balance
              </p>
            </div>
            
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0047bb] font-mono tracking-tight break-all">
              {formatCurrency(checkingBalance)}
            </p>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-mono font-semibold">
              Checking: {formatCurrency(checkingBalance)}
            </p>
          </div>

          {/* Quick Action Transfer Buttons inside the Balance card */}
          <div className="flex items-center gap-2 pt-1 sm:pt-0 w-full sm:w-auto">
            <button
              id="quick-transfer-btn"
              onClick={() => setActiveTab('transfer')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer min-h-[40px]"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Transfer</span>
            </button>
            <button
              id="quick-received-btn"
              onClick={() => setActiveTab('received')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-all cursor-pointer min-h-[40px]"
            >
              <ArrowDownLeft className="w-4 h-4 text-[#0047bb]" />
              <span>Received</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORE BANKING ACTION BUTTONS: Loan, Electricity */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            Primary Banking Actions
          </h3>
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Quick Access</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          
          {/* 1. Loan Button */}
          <button
            id="dashboard-action-loan"
            onClick={() => setActiveTab('loan')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer flex items-center sm:block gap-3.5"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 sm:mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading group-hover:text-indigo-700 transition-colors">
                Loan
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Mortgage, credit facilities & clearance notice
              </p>
            </div>
          </button>

          {/* 2. Electricity Button */}
          <button
            id="dashboard-action-electricity"
            onClick={() => setActiveTab('electricity')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer flex items-center sm:block gap-3.5"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 sm:mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading group-hover:text-amber-700 transition-colors">
                Electricity
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Pay electricity bill & utility meter payments
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* Account Balances Grid & Virtual Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Checking Account Card */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047bb] shrink-0">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">Premier Checking</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono">Account •••• 4421</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#0047bb] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                Primary
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">Available Balance</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0047bb] font-mono mt-0.5 break-all">
              {formatCurrency(checkingBalance)}
            </p>
          </div>

          <div className="pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px] sm:text-xs">Routing Number:</span>
            <span className="font-mono text-slate-900 font-bold text-[11px] sm:text-xs">{userProfile.routingNumber}</span>
          </div>
        </div>

        {/* Interactive Virtual Debit Card (Deep Wells Fargo Navy / Royal Blue Card) */}
        <div className="bg-[#002d72] border border-blue-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md text-white relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              <span className="font-heading font-extrabold text-xs sm:text-sm tracking-tight text-white">
                Trust<span className="text-blue-300">Bank</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold font-mono tracking-wider text-blue-200 uppercase">
              {userProfile.cardDetails.cardType}
            </span>
          </div>

          <div className="my-1 sm:my-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-blue-200">Card Number</span>
              <button
                type="button"
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="text-[10px] sm:text-[11px] text-blue-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {showCardDetails ? <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span>{showCardDetails ? 'Hide' : 'Reveal'}</span>
              </button>
            </div>
            
            <p className="font-mono text-base sm:text-xl font-bold tracking-widest text-white break-all">
              {showCardDetails
                ? userProfile.cardDetails.cardNumber
                : '•••• •••• •••• 7821'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-blue-800 text-[11px] sm:text-xs">
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-blue-300">Cardholder</p>
              <p className="font-bold text-white font-mono uppercase truncate text-[11px] sm:text-xs">{userProfile.fullName}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-blue-300">Expires / CVV</p>
              <p className="font-mono text-white text-[11px] sm:text-xs">
                {userProfile.cardDetails.expiry} | {showCardDetails ? userProfile.cardDetails.cvv : '•••'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Transactions Ledger */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              Transaction History
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Account Ledger for {userProfile.fullName}
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative w-full sm:min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 py-2 px-3 focus:outline-none focus:border-[#0047bb]"
            >
              <option value="all">All Records</option>
              <option value="transfers">Transfers</option>
              <option value="received">Received Inflows</option>
              <option value="loans">Loans</option>
              <option value="electricity">Electricity</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-100">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No transactions match the selected filter.
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isRefunded = tx.status === 'Refunded';
              const isCredit = tx.type === 'received' || tx.type === 'salary_deposit' || isRefunded;
              const isPending = tx.status === 'Pending';

              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceiptTx(tx)}
                  className="py-3 flex items-center justify-between hover:bg-slate-50 px-1 sm:px-2.5 rounded-xl transition-colors cursor-pointer group gap-2"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                      isPending
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : isRefunded
                        ? 'bg-blue-50 border-blue-200 text-[#0047bb]'
                        : isCredit
                        ? 'bg-blue-50 border-blue-200 text-[#0047bb]'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {isPending ? (
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      ) : isRefunded ? (
                        <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047bb]" />
                      ) : isCredit ? (
                        <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047bb]" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047bb] transition-colors truncate max-w-[140px] sm:max-w-[280px]">
                          {tx.title}
                        </p>
                        {isPending && (
                          <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                            Pending
                          </span>
                        )}
                        {isRefunded && (
                          <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#0047bb] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 shrink-0">
                            Refunded
                          </span>
                        )}
                        {tx.id === 'tx-permanent-trustbank-1500k' && (
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#0047bb] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 shrink-0">
                            Vault
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
                        <span className="font-medium text-slate-700 truncate">{tx.recipientOrSender}</span>
                        <span>&bull;</span>
                        <span className="font-mono text-[10px] sm:text-[11px] shrink-0">{tx.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`text-xs sm:text-sm font-bold font-mono ${
                      isRefunded ? 'text-[#0047bb]' : isCredit ? 'text-[#0047bb]' : isPending ? 'text-amber-700' : 'text-slate-900'
                    }`}>
                      {isRefunded ? '+' : isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 group-hover:text-[#0047bb] flex items-center justify-end gap-1 mt-0.5 font-medium">
                      <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Voucher
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        transaction={selectedReceiptTx}
        isOpen={!!selectedReceiptTx}
        onClose={() => setSelectedReceiptTx(null)}
      />

    </div>
  );
};
