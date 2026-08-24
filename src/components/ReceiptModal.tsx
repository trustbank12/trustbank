import React from 'react';
import { Landmark, CheckCircle2, Download, Printer, X, ShieldCheck, Copy, Check, Clock, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../data/mockData';

interface ReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !transaction) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isPending = transaction.status === 'Pending';
  const isRefunded = transaction.status === 'Refunded';
  const isCredit = transaction.type === 'received' || transaction.type === 'salary_deposit' || isRefunded;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl text-slate-900 animate-fadeIn my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors no-print cursor-pointer"
          title="Close Receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Receipt Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-inner">
          
          {/* Watermark Logo */}
          <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
            <Landmark className="w-36 h-36 sm:w-48 sm:h-48 text-[#002d72]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#002d72] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-[#002d72] text-base sm:text-lg leading-tight">
                  Trust<span className="text-[#0047bb]">Bank</span>
                </h4>
                <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Official Voucher
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              {isRefunded ? (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-blue-300">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0047bb]" /> Refunded
                </span>
              ) : isPending ? (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-300">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" /> Pending
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-blue-200">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0047bb]" /> Settled
                </span>
              )}
            </div>
          </div>

          {/* Transaction Amount */}
          <div className="text-center my-3 sm:my-5">
            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
              Transaction Amount
            </p>
            <h2 className={`text-2xl sm:text-4xl font-extrabold font-heading ${
              isRefunded ? 'text-[#0047bb]' : isCredit ? 'text-[#0047bb]' : isPending ? 'text-amber-700' : 'text-slate-900'
            }`}>
              {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">
              {transaction.title}
            </p>
          </div>

          {/* Refund Status Notice Box */}
          {isRefunded && (
            <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Notice: refunded Clearance</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-800 leading-normal">
                Status: <strong>Pending</strong>. Kindly proceed to the nearest bank branch to clear the outstanding balance of <strong>USD 262.00</strong> as indicated in the Office Note.
              </p>
            </div>
          )}

          {/* Pending Status Notice Box inside the Receipt if Pending */}
          {isPending && (
            <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Notice: Pending Clearance</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-800 leading-normal">
                Status: <strong>Pending</strong>. Kindly proceed to the nearest bank branch to clear the outstanding balance of <strong>USD 262.00</strong> as indicated in the Office Note.
              </p>
            </div>
          )}

          {/* Meta Details List */}
          <div className="space-y-2 text-[11px] sm:text-xs border-t border-b border-slate-200 py-3 sm:py-4 my-3 sm:my-4 font-sans">
            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-medium shrink-0">Account Holder:</span>
              <span className="font-bold text-slate-900 text-right">Aminabibi Bulbuliya</span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-medium shrink-0">Recipient:</span>
              <span className="font-semibold text-slate-800 text-right break-words">{transaction.recipientOrSender}</span>
            </div>

            {transaction.bankName && (
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 font-medium shrink-0">Bank:</span>
                <span className="font-semibold text-slate-800 text-right truncate">{transaction.bankName}</span>
              </div>
            )}

            {transaction.accountNumber && (
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 font-medium shrink-0">Account / IBAN:</span>
                <span className="font-mono text-slate-900 font-bold text-right truncate">{transaction.accountNumber}</span>
              </div>
            )}

            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-medium shrink-0">Timestamp:</span>
              <span className="font-mono text-slate-800 font-semibold text-right">{transaction.date}</span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-medium shrink-0">Category:</span>
              <span className="text-slate-800 font-semibold text-right">{transaction.category}</span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-medium shrink-0">Source Account:</span>
              <span className="text-slate-800 font-semibold text-right">{transaction.sourceAccount} (•••• 4421)</span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-slate-200 gap-2">
              <span className="text-slate-500 font-medium shrink-0">Reference Number:</span>
              <div className="flex items-center gap-1 font-mono text-[#0047bb] text-[10px] sm:text-[11px] font-bold">
                <span className="truncate max-w-[140px] sm:max-w-none">{transaction.referenceId}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1 hover:text-[#002d72] transition-colors shrink-0"
                  title="Copy Reference"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Verification Badge Footer */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-0.5">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0047bb] shrink-0" />
              <span>Verified Record</span>
            </span>
            <span className="font-mono text-slate-500 font-bold">Member FDIC</span>
          </div>

        </div>

        {/* Modal Buttons */}
        <div className="mt-4 sm:mt-5 flex gap-2.5 sm:gap-3 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[40px]"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Print</span>
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white text-xs font-bold transition-colors cursor-pointer min-h-[40px]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
