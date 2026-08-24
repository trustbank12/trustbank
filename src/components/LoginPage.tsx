import React, { useState } from 'react';
import { 
  Landmark, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  KeyRound, 
  Fingerprint
} from 'lucide-react';
import { LoginLoadingScreen } from './LoginLoadingScreen';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Strict verification:
    // Only accept Username "Aminabibi12" and Password "20209090"
    if (trimmedUser !== 'aminabibi12' || trimmedPass !== '20209090') {
      setErrorMessage('incorrect password');
      return;
    }

    // Credentials match -> Proceed to secure login loading sequence
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <LoginLoadingScreen
        onComplete={() => {
          setIsLoading(false);
          onLoginSuccess();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex flex-col justify-between text-slate-900 selection:bg-[#0047bb] selection:text-white">
      
      {/* Top Header */}
      <header className="w-full border-b border-slate-200 bg-white px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002d72] flex items-center justify-center shadow-md">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#002d72]">
                Trust<span className="text-[#0047bb]">Bank</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0047bb] font-bold border border-blue-200">
                Online Banking
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0047bb]" />
            <span className="hidden sm:inline">Secure 256-bit Encryption</span>
          </div>
        </div>
      </header>

      {/* Main Authentication Content */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 w-full">
        <div className="w-full max-w-md">
          
          {/* Card Container */}
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden w-full">
            
            {/* Top Blue Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0047bb]" />

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0047bb] mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access your Trust Bank account
              </p>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div 
                id="login-error-alert" 
                className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <p className="font-semibold">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Username Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="login-username">
                  Username or User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb]/20 focus:border-[#0047bb] focus:bg-white transition-all font-medium"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="login-password">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4.5 h-4.5" />
                  </div>
                  
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb]/20 focus:border-[#0047bb] focus:bg-white transition-all font-mono"
                    autoComplete="current-password"
                  />

                  {/* Eye Toggle Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#0047bb] transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5 text-[#0047bb]" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Security Status */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0047bb] focus:ring-[#0047bb]"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember User ID</span>
                </label>

                <span className="text-xs text-[#0047bb] flex items-center gap-1 font-semibold">
                  <Fingerprint className="w-3.5 h-3.5" /> Biometrics Ready
                </span>
              </div>

              {/* Login Button */}
              <button
                id="login-submit-btn"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-3"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>

          </div>

          {/* Security Notice Footer */}
          <div className="text-center mt-6 text-xs text-slate-500">
            <p className="flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0047bb]" />
              Official Trust Bank Secure Portal &bull; Member FDIC
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-3 text-center text-xs text-slate-500 bg-white">
        <p>Trust Bank Online Services &bull; Equal Housing Lender &bull; &copy; 2026 Trust Bank</p>
      </footer>

    </div>
  );
};
