import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight, 
  Calendar, 
  AlertCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { UserProfile, LoanItem } from '../types';
import { formatCurrency } from '../data/mockData';
import { OfficeNoteModal } from './OfficeNoteModal';

interface LoanViewProps {
  userProfile: UserProfile;
  checkingBalance: number;
  loans: LoanItem[];
  onPayLoanInstallment?: (loanId: string, paymentAmount: number) => void;
}

export const LoanView: React.FC<LoanViewProps> = ({
  userProfile,
  checkingBalance,
}) => {
  const [loanType, setLoanType] = useState<string>('Personal Loan');
  const [requestedAmount, setRequestedAmount] = useState<string>('50000');
  const [showOfficeNoteModal, setShowOfficeNoteModal] = useState<boolean>(false);

  // When user presses "Apply for Loan": Show "Kindly go to our nearest bank" notice
  const handleApplyLoan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowOfficeNoteModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Building2 className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
            <span className="truncate">Credit & Lending Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Trust Bank Loans & Credit
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
            Account: <strong className="text-slate-900">{userProfile.fullName}</strong> &bull; Tier-1 Premier (795)
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-left sm:text-right self-start sm:self-center">
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-bold">Checking Balance</p>
          <p className="text-base sm:text-lg font-bold text-[#0047bb] font-mono">{formatCurrency(checkingBalance)}</p>
        </div>
      </div>

      {/* Single Clean "Apply for Loan" Card */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0047bb] flex items-center justify-center mx-auto shadow-sm">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Apply for Loan
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
              Submit your credit facility or mortgage request online with Trust Bank Premier Services.
            </p>
          </div>

          <form onSubmit={handleApplyLoan} className="space-y-3 sm:space-y-4 text-left pt-2">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                Loan Category
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#0047bb] focus:bg-white"
              >
                <option value="Personal Loan">Personal Loan</option>
                <option value="Home Mortgage">Home Mortgage</option>
                <option value="Auto Loan">Auto Loan</option>
                <option value="Business Expansion">Business Expansion Loan</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                Requested Loan Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  value={requestedAmount}
                  onChange={(e) => setRequestedAmount(e.target.value)}
                  placeholder="50,000.00"
                  className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm sm:text-base font-bold focus:outline-none focus:border-[#0047bb] focus:bg-white"
                />
              </div>
            </div>

            <button
              id="apply-for-loan-button"
              type="submit"
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-3 sm:mt-4 min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Apply for Loan</span>
            </button>
          </form>
        </div>
      </div>

      {/* Office Note Modal - "Kindly go to our nearest bank" */}
      <OfficeNoteModal
        isOpen={showOfficeNoteModal}
        onClose={() => setShowOfficeNoteModal(false)}
        title="Lending Facility Notice - Bank Clearance Required"
      />

    </div>
  );
};
