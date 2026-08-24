import React, { useEffect } from 'react';
import { Landmark } from 'lucide-react';

interface LoginLoadingScreenProps {
  onComplete: () => void;
}

export const LoginLoadingScreen: React.FC<LoginLoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Smooth loading sequence
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f7fa] flex flex-col items-center justify-center p-6 text-slate-900 select-none">
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        
        {/* Real Trust Bank Brand Mark */}
        <div className="w-16 h-16 rounded-2xl bg-[#002d72] flex items-center justify-center mb-5 shadow-lg shadow-blue-950/20">
          <Landmark className="w-8 h-8 text-white" />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#002d72] font-heading">
            Trust<span className="text-[#0047bb]">Bank</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Online Banking Portal
          </p>
        </div>

        {/* Minimalist Authentic Banking Spinner */}
        <div className="relative w-12 h-12 mb-4">
          <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-[#0047bb] animate-spin" />
        </div>

        {/* Loading text only - No please wait, no 20s, no progress line */}
        <p className="text-base font-bold text-slate-800 tracking-wide font-heading">
          Loading...
        </p>

      </div>

      <div className="absolute bottom-6 text-center text-xs text-slate-500 font-medium">
        <p>Trust Bank &bull; Secure Encrypted Connection &bull; Member FDIC</p>
      </div>
    </div>
  );
};

