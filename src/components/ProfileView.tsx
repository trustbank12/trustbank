import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  CreditCard, 
  Key, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Eye, 
  EyeOff,
  Landmark,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onToggleCardFreeze: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onToggleCardFreeze,
}) => {
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(userProfile.email);
  const [phone, setPhone] = useState<string>(userProfile.phone);
  const [address, setAddress] = useState<string>(userProfile.address);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ email, phone, address });
    setIsEditingContact(false);
    setSuccessMessage('Contact coordinates updated successfully.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-12">
      
      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#002d72] p-1 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
          <div className="w-full h-full bg-[#002d72] rounded-xl flex items-center justify-center font-heading text-white font-extrabold">
            AB
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              {userProfile.fullName}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0047bb] border border-blue-200">
              {userProfile.tier}
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Primary Client ID: <span className="font-mono text-slate-700 font-bold">TRUST-NYC-99824</span> &bull; Member since {userProfile.joinedDate}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-[#0047bb] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#0047bb]" /> KYC Status: {userProfile.kycStatus}
            </span>
            <span className="text-slate-600 font-medium">
              Primary Account: <strong className="font-mono text-slate-900 font-bold">{userProfile.accountNumber}</strong>
            </span>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Profile Details & Security Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Coordinates */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-[#0047bb]" />
                Contact Coordinates
              </h3>
              {!isEditingContact && (
                <button
                  type="button"
                  onClick={() => setIsEditingContact(true)}
                  className="text-xs text-[#0047bb] hover:text-[#002d72] font-bold transition-colors cursor-pointer"
                >
                  Edit Information
                </button>
              )}
            </div>

            {isEditingContact ? (
              <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0047bb] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Telephone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0047bb] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Residential Address</label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0047bb] focus:bg-white resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingContact(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#0047bb] hover:bg-[#0033a0] text-white font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#0047bb] shrink-0" />
                  <div className="truncate">
                    <p className="text-[10px] text-slate-500 font-medium">Email Address</p>
                    <p className="text-slate-900 font-semibold truncate">{userProfile.email}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0047bb] shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Mobile Phone</p>
                    <p className="text-slate-900 font-semibold">{userProfile.phone}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0047bb] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Registered Address</p>
                    <p className="text-slate-900 font-semibold leading-relaxed">{userProfile.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security & Card Management */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2 mb-4">
              <Shield className="w-4.5 h-4.5 text-[#0047bb]" />
              Security & Card Management
            </h3>

            <div className="space-y-3 text-xs">
              
              {/* Card Status & Freeze */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Trust Bank Visa Platinum</p>
                  <p className="text-[11px] text-slate-500 font-mono">•••• 7821</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    userProfile.cardDetails.isFrozen
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-[#0047bb] border border-blue-200'
                  }`}>
                    {userProfile.cardDetails.isFrozen ? 'Card Frozen' : 'Card Active & Protected'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onToggleCardFreeze}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    userProfile.cardDetails.isFrozen
                      ? 'bg-[#0047bb] hover:bg-[#0033a0] text-white'
                      : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {userProfile.cardDetails.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                </button>
              </div>

              {/* Security PIN Overview */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">4-Digit Transfer PIN</p>
                  <p className="text-[11px] text-slate-500">Required for transfer confirmations</p>
                  <p className="font-mono text-xs text-[#0047bb] font-bold mt-1">Configured: ••••</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#0047bb] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    PIN Verified (2345)
                  </span>
                </div>
              </div>

              {/* Encryption & Banking Protocols */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-medium">
                <p className="text-slate-900 font-bold mb-0.5">Trust Bank Encryption Protocol</p>
                <p>256-bit AES cryptographic protection with hardware security module (HSM) session token authentication.</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
