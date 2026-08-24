import React, { useState, useEffect, useRef } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, KeyRound, Check } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionTitle?: string;
  actionDescription?: string;
}

const CORRECT_PIN = '2345';

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = 'Security PIN Authorization',
  actionDescription = 'Enter your 4-digit security PIN (2345) to authorize this transaction.',
}) => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '']);
      setErrorMessage('');
      setIsSuccess(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, val: string) => {
    // Only numeric
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = cleanVal;
    setPin(newPin);
    setErrorMessage('');

    if (cleanVal && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (index === 3 && cleanVal) {
      const fullPin = newPin.join('');
      validatePin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validatePin = (inputPin: string) => {
    if (inputPin === CORRECT_PIN) {
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 400);
    } else {
      setErrorMessage('incorrect PIN');
      setPin(['', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleKeypadPress = (digit: string) => {
    const firstEmptyIndex = pin.findIndex(d => d === '');
    if (firstEmptyIndex !== -1) {
      handleDigitChange(firstEmptyIndex, digit);
    }
  };

  const handleKeypadBackspace = () => {
    const lastFilledIndex = [...pin].reverse().findIndex(d => d !== '');
    if (lastFilledIndex !== -1) {
      const targetIndex = 3 - lastFilledIndex;
      const newPin = [...pin];
      newPin[targetIndex] = '';
      setPin(newPin);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 animate-fadeIn">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0047bb] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-heading">
            {actionTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1 px-4 leading-relaxed">
            {actionDescription}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* PIN Inputs (Masked Dots or Masked Inputs) */}
        <div className="flex justify-center gap-3 mb-6">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeypadPress ? handleKeyDown(idx, e) : undefined}
              className={`w-12 h-14 text-center text-2xl font-mono font-extrabold rounded-2xl border transition-all focus:outline-none ${
                digit
                  ? 'border-[#0047bb] bg-blue-50 text-[#0047bb]'
                  : 'border-slate-300 bg-slate-50 text-slate-900'
              } ${errorMessage ? 'border-red-400 bg-red-50' : ''}`}
            />
          ))}
        </div>

        {/* Numeric On-Screen Keypad for Fast Entry */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeypadPress(num)}
              className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-mono font-bold text-lg active:scale-95 transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPin(['', '', '', ''])}
            className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 font-bold text-xs active:scale-95 transition-all cursor-pointer uppercase"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-mono font-bold text-lg active:scale-95 transition-all cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleKeypadBackspace}
            className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>

        {/* Security Subtext */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0047bb]" />
          <span>Client PIN: 2345</span>
        </div>

      </div>
    </div>
  );
};
