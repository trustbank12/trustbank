import React from 'react';
import { Landmark, AlertTriangle, X, Building2, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface OfficeNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  transactionRef?: string;
  onViewReceipt?: () => void;
}

export const OfficeNoteModal: React.FC<OfficeNoteModalProps> = ({
  isOpen,
  onClose,
  title = 'Transaction Pending - Action Required',
  transactionRef,
  onViewReceipt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl text-slate-900">
        
        {/* Top Warning Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Trust Bank & Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5 pr-8">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-700 shrink-0" /> Pending
              </span>
              {transactionRef && (
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono font-semibold truncate">
                  Ref: {transactionRef}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading mt-0.5">
              Office Notes
            </h3>
          </div>
        </div>

        {/* Exact Specified Official Office Note Content */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed font-sans shadow-inner">
          <p className="font-bold text-slate-900 text-xs sm:text-sm">
            Dear Sir/Madam,
          </p>

          <p className="text-slate-700 font-medium text-xs sm:text-sm">
            Kindly proceed to the nearest bank to make the outstanding payment.
          </p>

          <div className="bg-white border border-slate-300 p-3 sm:p-3.5 rounded-xl space-y-1.5 font-mono text-[11px] sm:text-xs my-2 shadow-sm">
            <p className="text-slate-600 font-sans font-bold mb-1">
              Please find the payment details below:
            </p>
            <div className="flex justify-between text-slate-700">
              <span>Amount already paid:</span>
              <span className="font-bold text-slate-900">USD 260.00</span>
            </div>
            <div className="flex justify-between text-amber-700 font-bold">
              <span>Outstanding balance:</span>
              <span>USD 262.00</span>
            </div>
            <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200 font-semibold">
              <span>Total amount:</span>
              <span className="text-slate-900 font-bold">USD 522.00</span>
            </div>
          </div>

          <p className="text-slate-700 font-medium text-xs sm:text-sm">
            We kindly request that you complete the outstanding payment of <strong className="text-amber-800 font-bold bg-amber-100 px-1 py-0.5 rounded whitespace-nowrap">USD 262.00</strong> at your earliest convenience.
          </p>

          <p className="text-slate-700 text-xs sm:text-sm">
            Thank you for your attention, cooperation, and understanding.
          </p>

          <div className="pt-2 border-t border-slate-200">
            <p className="text-slate-500 text-[11px] sm:text-xs">Best regards,</p>
            <p className="font-bold text-[#002d72] mt-0.5 text-xs sm:text-sm">Trust Bank Branch Operations & Clearing Division</p>
          </div>
        </div>

        {/* Action Buttons: View Receipt + Acknowledge */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          {onViewReceipt && (
            <button
              id="office-note-receipt-btn"
              type="button"
              onClick={onViewReceipt}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#002d72] border border-slate-300 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[44px]"
            >
              <FileText className="w-4 h-4 text-[#0047bb]" />
              <span>Receipt</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span>Acknowledge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
