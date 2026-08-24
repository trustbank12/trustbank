import React, { useState } from 'react';
import { 
  Zap, 
  Lightbulb, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  PlusCircle, 
  Copy, 
  Check, 
  Building2, 
  Activity, 
  TrendingDown, 
  Receipt,
  Download,
  AlertTriangle,
  X,
  ArrowRight
} from 'lucide-react';
import { UserProfile, ElectricityMeter } from '../types';
import { formatCurrency, INITIAL_ELECTRICITY_METER } from '../data/mockData';

interface ElectricityViewProps {
  userProfile: UserProfile;
  checkingBalance: number;
  onPayElectricity?: (amount: number, unitsKwh: number, meterNum: string, token: string) => void;
}

export const ElectricityView: React.FC<ElectricityViewProps> = ({
  userProfile,
  checkingBalance,
}) => {
  const [meter] = useState<ElectricityMeter>(INITIAL_ELECTRICITY_METER);
  const [rechargeAmount, setRechargeAmount] = useState<string>('250');
  const [selectedMeterType, setSelectedMeterType] = useState<'Prepaid (Smart Token)' | 'Postpaid Standard'>('Prepaid (Smart Token)');
  const [meterInput, setMeterInput] = useState<string>(INITIAL_ELECTRICITY_METER.meterNumber);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showUnavailableModal, setShowUnavailableModal] = useState<boolean>(false);

  const numAmount = parseFloat(rechargeAmount) || 0;
  const estimatedKwh = numAmount > 0 ? (numAmount / meter.tariffPerKwh).toFixed(1) : '0';

  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('Unavailable: Kindly pay the remaining payment of $262.00 to restore utility clearing gateway.');
    setShowUnavailableModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Power & Utility Bill Payments</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Electricity Services
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
            Registered: <strong className="text-slate-900">{userProfile.fullName}</strong> &bull; Provider: <strong className="text-[#0047bb]">Trust Power & Energy Grid</strong>
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-left sm:text-right self-start sm:self-center">
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-bold">Checking Balance</p>
          <p className="text-base sm:text-lg font-bold text-[#0047bb] font-mono">{formatCurrency(checkingBalance)}</p>
        </div>
      </div>

      {/* Prominent Warning Banner if Unavailable */}
      {errorMessage && (
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-300 text-slate-900 text-xs sm:text-sm flex items-start gap-2.5 sm:gap-3 animate-fadeIn shadow-sm">
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-extrabold text-amber-900 text-xs sm:text-sm">
              Service Notice: Unavailable
            </h4>
            <p className="text-[11px] sm:text-xs text-amber-800 mt-0.5 font-medium leading-snug">
              Unavailable: Kindly pay the remaining payment $262.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowUnavailableModal(true)}
            className="py-1.5 px-2.5 sm:px-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] sm:text-xs shrink-0 cursor-pointer shadow-sm"
          >
            Notice
          </button>
        </div>
      )}

      {/* Meter Stats & Recharge Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Active Smart Meter Card */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Connected &bull; Active
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Primary Residential Meter
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5 truncate">
              Meter #{meter.meterNumber}
            </p>

            <div className="space-y-2.5 sm:space-y-3 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 my-3 sm:my-4 text-xs">
              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="text-slate-500 font-medium">Available Energy:</span>
                <span className="font-mono font-extrabold text-slate-900 text-xs sm:text-sm">{meter.currentUnitsKwh.toFixed(1)} kWh</span>
              </div>

              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="text-slate-500 font-medium">Tariff Rate:</span>
                <span className="font-mono text-[#0047bb] font-bold">{formatCurrency(meter.tariffPerKwh)} / kWh</span>
              </div>

              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="text-slate-500 font-medium">Meter Type:</span>
                <span className="text-slate-800 font-semibold truncate max-w-[140px] text-right">{meter.meterType}</span>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-[11px] sm:text-xs">
                <span className="text-slate-500 font-medium">Last Recharge:</span>
                <span className="text-slate-800 font-semibold">{meter.lastRechargeDate}</span>
              </div>

              <div className="pt-1 text-[10px] sm:text-[11px] text-slate-500 leading-snug">
                <strong className="text-slate-700">Address:</strong> {meter.address}
              </div>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-2 font-medium">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="leading-tight">Power grid steady. Voltage: 220V - 240V steady.</span>
          </div>
        </div>

        {/* Instant Recharge Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-3 sm:mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Electricity Bill & Token Recharge</span>
          </h3>

          <form onSubmit={handleRechargeSubmit} className="space-y-3 sm:space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[10px] sm:text-xs">
                  Select Meter Type
                </label>
                <select
                  value={selectedMeterType}
                  onChange={(e) => setSelectedMeterType(e.target.value as any)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-[#0047bb] focus:bg-white"
                >
                  <option value="Prepaid (Smart Token)">Prepaid Smart Token (Keypad STS)</option>
                  <option value="Postpaid Standard">Postpaid Monthly Energy Bill</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[10px] sm:text-xs">
                  Meter Number
                </label>
                <input
                  type="text"
                  required
                  value={meterInput}
                  onChange={(e) => setMeterInput(e.target.value)}
                  placeholder="0419-8821-9940-22"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:outline-none focus:border-[#0047bb] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold uppercase tracking-wider text-slate-700 text-[10px] sm:text-xs">
                  Recharge Amount (USD)
                </label>
                <span className="text-slate-500 font-medium text-[11px] sm:text-xs">
                  Units: <strong className="text-amber-700 font-mono text-xs sm:text-sm">{estimatedKwh} kWh</strong>
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  required
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="w-full pl-7 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-base sm:text-lg font-bold focus:outline-none focus:border-[#0047bb] focus:bg-white"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                {[50, 100, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setRechargeAmount(amt.toString())}
                    className="px-2.5 sm:px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] sm:text-[11px] text-slate-500 font-medium leading-relaxed">
              Direct deduction from Checking Account #8842-9901-4421. An instant STS 20-digit token will be generated upon clearing.
            </div>

            <div className="pt-1 sm:pt-2">
              <button
                id="pay-electricity-btn"
                type="submit"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Pay Electricity & Generate Token</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Unavailable Notice Modal */}
      {showUnavailableModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl text-slate-900">
            
            {/* Top Warning Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowUnavailableModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close notice"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5 pr-8">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-700" /> Notice
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading mt-0.5">
                  Service Unavailable
                </h3>
              </div>
            </div>

            {/* Content: Unavailable kindly pay the remaining payment $262 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed font-sans shadow-inner">
              <p className="font-bold text-sm sm:text-base text-slate-900">
                Unavailable: Kindly pay the remaining payment $262
              </p>

              <p className="text-slate-700 font-medium text-xs sm:text-sm">
                The utility token generation gateway is currently blocked. Kindly proceed to the nearest bank branch to clear the outstanding balance.
              </p>

              <div className="bg-white border border-slate-300 p-3 sm:p-3.5 rounded-xl space-y-1.5 font-mono text-[11px] sm:text-xs my-2 shadow-sm">
                <p className="text-slate-600 font-sans font-bold mb-1">
                  Payment Details:
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
                We kindly request that you complete the remaining payment of <strong className="text-amber-800 font-bold bg-amber-100 px-1 py-0.5 rounded whitespace-nowrap">USD 262.00</strong> to reactivate immediate electricity token dispatch.
              </p>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-slate-500 text-[11px] sm:text-xs">Best regards,</p>
                <p className="font-bold text-[#002d72] mt-0.5 text-xs sm:text-sm">Trust Bank Clearing & Utility Division</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 sm:mt-6">
              <button
                type="button"
                onClick={() => setShowUnavailableModal(false)}
                className="w-full py-3 px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Acknowledge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
