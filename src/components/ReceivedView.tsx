import React, { useState } from 'react';
import { 
  ArrowDownLeft, 
  Copy, 
  Check, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Share2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { UserProfile, Transaction } from '../types';
import { formatCurrency } from '../data/mockData';
import { ReceiptModal } from './ReceiptModal';
import { OfficeNoteModal } from './OfficeNoteModal';

interface ReceivedViewProps {
  userProfile: UserProfile;
  checkingBalance: number;
  transactions: Transaction[];
}

export const ReceivedView: React.FC<ReceivedViewProps> = ({
  userProfile,
  checkingBalance,
  transactions,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);
  const [showOfficeNoteModal, setShowOfficeNoteModal] = useState<boolean>(false);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleActionBlocked = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOfficeNoteModal(true);
  };

  const receivedTransactions = transactions.filter(
    (t) => t.type === 'received' || t.type === 'salary_deposit'
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ArrowDownLeft className="w-3.5 h-3.5 text-teal-700" />
            <span>Inflow & Wire Coordinates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Receive Money & Deposits
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Beneficiary: <strong className="text-slate-900">Aminabibi Bulbuliya</strong> &bull; Routing #{userProfile.routingNumber}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Available Balance</p>
          <p className="text-lg font-bold text-[#0047bb] font-mono">{formatCurrency(checkingBalance)}</p>
        </div>
      </div>

      {/* Wire & Direct Deposit Coordinates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Banking Coordinates Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0047bb]" />
              Direct Deposit & Domestic Wire Details
            </h3>
            <span className="text-xs text-[#0047bb] font-bold bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Verified Beneficiary
            </span>
          </div>

          <div className="space-y-3 text-xs">
            
            {/* Beneficiary Name */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Account Beneficiary</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{userProfile.fullName}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('name', userProfile.fullName)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Copy Name"
              >
                {copiedKey === 'name' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Account Number */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Account Number</p>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{userProfile.accountNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('acc', userProfile.accountNumber)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Copy Account Number"
              >
                {copiedKey === 'acc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Routing Number */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">ABA Routing Number (ACH & Wire)</p>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{userProfile.routingNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('rout', userProfile.routingNumber)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Copy Routing Number"
              >
                {copiedKey === 'rout' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* SWIFT / BIC */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">International SWIFT / BIC</p>
                <p className="font-mono font-bold text-[#0047bb] text-sm mt-0.5">{userProfile.swiftBic}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('swift', userProfile.swiftBic)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Copy SWIFT"
              >
                {copiedKey === 'swift' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Bank Name & Address */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Bank Name & Address</p>
              <p className="font-bold text-slate-900 mt-0.5">Trust Bank, Central Operations Division</p>
              <p className="text-slate-500 text-[11px]">270 Park Avenue, New York, NY 10017, USA</p>
            </div>

          </div>
        </div>

        {/* QR Inflow & Request Deposit */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Instant QR Inflow
              </h3>
              <QrCode className="w-5 h-5 text-[#0047bb]" />
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center justify-center my-3 shadow-inner">
              <div className="w-36 h-36 border-4 border-[#002d72] rounded-xl flex items-center justify-center bg-white p-2 relative shadow-sm">
                <QrCode className="w-32 h-32 text-[#002d72]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-[#0047bb] flex items-center justify-center text-white font-bold text-[10px] shadow">
                    TB
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-2 text-center font-medium">
                Scan via Trust Bank Mobile or FedNow
              </p>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Scan to initiate verified credit to account #•••• 4421.
            </p>
          </div>

          <form onSubmit={handleActionBlocked} className="mt-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Request Deposit / Clearing</span>
            </button>
          </form>
        </div>

      </div>

      {/* Received Transactions Ledger */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">
          Inflow & Deposit History
        </h3>

        <div className="divide-y divide-slate-100">
          {receivedTransactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => setSelectedReceiptTx(tx)}
              className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2.5 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047bb] shrink-0 font-bold">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#0047bb] transition-colors">
                      {tx.title}
                    </p>
                    {tx.id === 'tx-permanent-trustbank-1500k' && (
                      <span className="text-[10px] uppercase font-bold text-[#0047bb] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Permanent Record
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    From: <strong className="text-slate-700">{tx.recipientOrSender}</strong> &bull; {tx.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold font-mono text-[#0047bb]">
                  +{formatCurrency(tx.amount)}
                </p>
                <span className="text-[10px] text-slate-400 group-hover:text-[#0047bb] flex items-center justify-end gap-1 mt-0.5 font-medium">
                  <FileText className="w-3 h-3" /> View Voucher
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        transaction={selectedReceiptTx}
        isOpen={!!selectedReceiptTx}
        onClose={() => setSelectedReceiptTx(null)}
      />

      {/* Office Note Modal */}
      <OfficeNoteModal
        isOpen={showOfficeNoteModal}
        onClose={() => setShowOfficeNoteModal(false)}
        title="Inbound Clearing Notice - Outstanding Payment Required"
      />

    </div>
  );
};
