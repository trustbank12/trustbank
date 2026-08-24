import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  Building2, 
  Wallet, 
  Clock, 
  FileText, 
  AlertTriangle, 
  Receipt,
  RotateCcw,
  CheckCircle2,
  Timer,
  Loader2
} from 'lucide-react';
import { UserProfile, Transaction } from '../types';
import { formatCurrency } from '../data/mockData';
import { PinModal } from './PinModal';
import { OfficeNoteModal } from './OfficeNoteModal';
import { ReceiptModal } from './ReceiptModal';

interface TransferViewProps {
  userProfile: UserProfile;
  checkingBalance: number;
  savingsBalance: number;
  onExecutePendingTransfer: (newTx: Transaction) => void;
  onRefundTransfer?: (transactionId: string) => void;
}

export const TransferView: React.FC<TransferViewProps> = ({
  userProfile,
  checkingBalance,
  savingsBalance,
  onExecutePendingTransfer,
  onRefundTransfer,
}) => {
  const sourceAccount = 'Checking';
  
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientAccount, setRecipientAccount] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [referenceNote, setReferenceNote] = useState<string>('');
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [isTransferLoading, setIsTransferLoading] = useState<boolean>(false);
  const [showOfficeNoteModal, setShowOfficeNoteModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [pendingTxRef, setPendingTxRef] = useState<string>('');
  const [lastPendingTx, setLastPendingTx] = useState<Transaction | null>(null);

  // 2-minute timer state for pending transaction (120 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [refundNotice, setRefundNotice] = useState<string>('');

  const availableBalance = checkingBalance;

  // Countdown timer effect for pending transaction
  useEffect(() => {
    if (!lastPendingTx || lastPendingTx.status !== 'Pending') return;

    // Calculate time elapsed
    const created = lastPendingTx.createdAt || Date.now();
    const elapsedSeconds = Math.floor((Date.now() - created) / 1000);
    const initialRemaining = Math.max(0, 120 - elapsedSeconds);

    setSecondsRemaining(initialRemaining);
    if (initialRemaining === 0) {
      setIsExpired(true);
      handleAutoRefund(lastPendingTx.id);
      return;
    }

    const interval = setInterval(() => {
      const currentElapsed = Math.floor((Date.now() - created) / 1000);
      const remaining = Math.max(0, 120 - currentElapsed);
      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        setIsExpired(true);
        clearInterval(interval);
        handleAutoRefund(lastPendingTx.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastPendingTx]);

  const handleAutoRefund = (txId: string) => {
    setIsExpired(true);
    setRefundNotice('Payment window expired (2 minutes exceeded). Payment is blocked and the money is in pending and has been refunded.');
    if (lastPendingTx) {
      setLastPendingTx(prev => prev ? { ...prev, status: 'Refunded' } : null);
    }
    if (onRefundTransfer) {
      onRefundTransfer(txId);
    }
  };

  const handleManualRefund = () => {
    if (!lastPendingTx) return;
    setRefundNotice(`Transaction of ${formatCurrency(lastPendingTx.amount)} has been refunded back to your Checking Account.`);
    setLastPendingTx(prev => prev ? { ...prev, status: 'Refunded' } : null);
    if (onRefundTransfer) {
      onRefundTransfer(lastPendingTx.id);
    }
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  // Called when user clicks the "Transfer" button
  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setRefundNotice('');

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please enter a valid transfer amount.');
      return;
    }

    if (numericAmount > availableBalance) {
      setErrorMessage(`Insufficient funds. Available checking balance is ${formatCurrency(availableBalance)}.`);
      return;
    }

    if (!recipientName.trim()) {
      setErrorMessage('Please enter recipient full name.');
      return;
    }

    if (!recipientAccount.trim()) {
      setErrorMessage('Please enter recipient account number or IBAN.');
      return;
    }

    // Now prompt for PIN upon clicking "Transfer"
    setShowPinModal(true);
  };

  // Called once the PIN (2345) is entered and verified
  const handlePinSuccess = () => {
    setShowPinModal(false);
    setIsTransferLoading(true);

    const numericAmount = parseFloat(amount);
    const refId = `TB-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;
    const createdTimestamp = Date.now();

    // 40 seconds wait without displaying any numbers or percentages, just "Loading..."
    setTimeout(() => {
      setIsTransferLoading(false);

      // Create a PENDING transaction (not completed, holding for branch payment settlement)
      const newPendingTx: Transaction = {
        id: `tx-${createdTimestamp}`,
        type: 'transfer_out',
        title: `Transfer to ${recipientName}`,
        recipientOrSender: recipientName,
        accountNumber: recipientAccount,
        bankName: bankName || 'Destination Bank',
        amount: numericAmount,
        date: dateStr,
        category: 'Transfer',
        status: 'Pending',
        referenceId: refId,
        note: referenceNote || 'Pending clearance - Office Note Notice',
        sourceAccount: sourceAccount,
        createdAt: createdTimestamp,
      };

      setPendingTxRef(refId);
      setLastPendingTx(newPendingTx);
      setIsExpired(false);
      setSecondsRemaining(120);
      setRefundNotice('');
      onExecutePendingTransfer(newPendingTx);

      // Show the required Office Notes modal and pending notice
      setShowOfficeNoteModal(true);
    }, 40000);
  };

  const handleOpenReceiptFromOfficeNote = () => {
    setShowOfficeNoteModal(false);
    setShowReceiptModal(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0047bb] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#0047bb] shrink-0" />
            <span className="truncate">Fund Transfer Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Transfer Money
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
            Originating: <strong className="text-slate-900">{userProfile.fullName}</strong> &bull; Checking #{userProfile.accountNumber}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-left sm:text-right self-start sm:self-center">
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-bold">Available Balance</p>
          <p className="text-lg sm:text-xl font-extrabold text-[#0047bb] font-mono">{formatCurrency(checkingBalance)}</p>
        </div>
      </div>

      {/* Refund Success Notice */}
      {refundNotice && (
        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5 sm:gap-3 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold leading-snug">{refundNotice}</span>
        </div>
      )}

      {/* Pending Notice Banner with 2-Minute Timer & Refund Action */}
      {lastPendingTx && (
        <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm animate-fadeIn transition-colors ${
          lastPendingTx.status === 'Refunded' || isExpired
            ? 'bg-blue-50 border-blue-300 text-slate-900'
            : 'bg-amber-50 border-amber-300 text-slate-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-xl mt-0.5 shrink-0 ${
                lastPendingTx.status === 'Refunded' || isExpired
                  ? 'bg-blue-100 text-[#0047bb]'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {lastPendingTx.status === 'Refunded' || isExpired ? (
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    lastPendingTx.status === 'Refunded' || isExpired
                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    Status: {lastPendingTx.status === 'Refunded' || isExpired ? 'Refunded' : 'Pending'}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-mono font-semibold truncate">Ref: {lastPendingTx.referenceId}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 leading-snug break-words">
                  Transfer of {formatCurrency(lastPendingTx.amount)} to {lastPendingTx.recipientOrSender}
                </h4>
                
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                  {lastPendingTx.status === 'Refunded' || isExpired
                    ? 'Payment not completed after 2 minutes. The money is in pending and has been refunded back to your balance.'
                    : 'Transaction is in pending clearance. Payment is disallowed after 2 minutes.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 pt-1 sm:pt-0">
              {lastPendingTx.status === 'Pending' && !isExpired ? (
                <button
                  type="button"
                  onClick={() => setShowOfficeNoteModal(true)}
                  className="py-1.5 sm:py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-colors shadow-sm cursor-pointer min-h-[38px]"
                >
                  Office Note
                </button>
              ) : (
                <span className="py-1.5 px-2.5 sm:px-3 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Refunded
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowReceiptModal(true)}
                className="py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer min-h-[38px]"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-3 sm:mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#0047bb] shrink-0" />
          <span>Transfer Details</span>
        </h3>

        {errorMessage && (
          <div className="mb-4 sm:mb-5 p-3 sm:p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold leading-snug">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleInitiateTransfer} className="space-y-3.5 sm:space-y-5">
          
          {/* Recipient Full Name */}
          <div>
            <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
              Recipient Full Name
            </label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Johnathan Smith"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
            />
          </div>

          {/* Recipient Account & Bank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                Recipient Account / IBAN
              </label>
              <input
                type="text"
                required
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                placeholder="e.g. 9901-2248-1142 or GB44..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm font-mono placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
              />
            </div>

            {/* Destination Financial Institution */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                Destination Financial Institution
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. JPMorgan Chase, Bank of America"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
              />
            </div>
          </div>

          {/* Transfer Amount */}
          <div>
            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                Amount (USD)
              </label>
              <span className="text-[11px] sm:text-xs text-slate-500">
                Available: <strong className="text-[#0047bb] font-mono">{formatCurrency(availableBalance)}</strong>
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base sm:text-lg">
                $
              </span>
              <input
                type="number"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-lg sm:text-xl font-bold placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-2.5">
              {[500, 1000, 5000, 10000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[11px] sm:text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  +{formatCurrency(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Memo */}
          <div>
            <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
              Payment Memo / Reference (Optional)
            </label>
            <input
              type="text"
              value={referenceNote}
              onChange={(e) => setReferenceNote(e.target.value)}
              placeholder="e.g. Invoice payment, personal gift"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#0047bb] focus:bg-white"
            />
          </div>

          {/* Submit Transfer Button */}
          <div className="pt-2 sm:pt-3">
            <button
              id="transfer-submit-button"
              type="submit"
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span>Transfer</span>
            </button>
            <p className="text-center text-[10px] sm:text-[11px] text-slate-500 mt-2 font-medium">
              Security PIN authentication (2345) will be required upon pressing Transfer.
            </p>
          </div>

        </form>
      </div>

      {/* PIN Confirmation Modal */}
      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
        actionTitle="Transfer Authorization"
        actionDescription="Enter your 4-digit security PIN to authorize this transfer for Aminabibi Bulbuliya."
      />

      {/* 40-Second Loading Modal - Shows ONLY 'Loading...' without percentages or countdown */}
      {isTransferLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xl text-center max-w-sm w-full animate-fadeIn flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-[#0047bb] animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Loading...
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Official Office Note Modal (Shown on Pending, has Receipt button) */}
      <OfficeNoteModal
        isOpen={showOfficeNoteModal}
        onClose={() => setShowOfficeNoteModal(false)}
        transactionRef={pendingTxRef}
        onViewReceipt={handleOpenReceiptFromOfficeNote}
      />

      {/* Receipt Modal (Displays Pending voucher with note) */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        transaction={lastPendingTx}
      />

    </div>
  );
};
