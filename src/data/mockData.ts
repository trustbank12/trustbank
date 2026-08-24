import { UserProfile, Transaction, LoanItem, ElectricityMeter, AppNotification } from '../types';

export const OFFICIAL_OFFICE_NOTE = {
  title: 'Office notes',
  salutation: 'Dear Sir/Madam,',
  message: 'Kindly proceed to the nearest bank to make the outstanding payment.',
  details: {
    amountPaid: 260.00,
    outstandingBalance: 262.00,
    totalAmount: 522.00,
  },
  closingRequest: 'We kindly request that you complete the outstanding payment of USD 262.00 at your earliest convenience.',
  gratitude: 'Thank you for your attention, cooperation, and understanding.',
  signOff: 'Best regards,',
};

export const INITIAL_USER_PROFILE: UserProfile = {
  username: 'Aminabibi12',
  fullName: 'Aminabibi Bulbuliya',
  accountNumber: '8842-9901-4421',
  routingNumber: '021000021',
  swiftBic: 'TRUSBKUS33NYC',
  email: 'aminabibi.bulbuliya@trustbanks-client.com',
  phone: '+1 (555) 234-8901',
  address: '742 Evergreen Terrace, Suite 400, New York, NY 10001, USA',
  tier: 'Private Wealth Premier Client',
  kycStatus: 'Verified',
  joinedDate: 'Aug 1, 2026',
  securityPin: '2345',
  cardDetails: {
    cardNumber: '4532 8901 3349 7821',
    expiry: '09/29',
    cvv: '842',
    cardHolder: 'AMINABIBI BULBULIYA',
    cardType: 'Visa Platinum',
    isFrozen: false,
  }
};

// Available Balance: $1,500,000.00
export const INITIAL_CHECKING_BALANCE = 1500000.00;
export const INITIAL_SAVINGS_BALANCE = 250000.00;

export const INITIAL_ELECTRICITY_METER: ElectricityMeter = {
  meterNumber: '0419-8821-9940-22',
  meterType: 'Prepaid (Smart Token)',
  provider: 'Trust Power & Energy Grid',
  address: '742 Evergreen Terrace, Suite 400, New York, NY 10001',
  currentUnitsKwh: 342.5,
  tariffPerKwh: 0.18,
  lastRechargeDate: '2026-08-18',
  accountNumber: '8842-9901-4421',
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-permanent-trustbank-1500k',
    type: 'received',
    title: 'Direct Vault Deposit & Inflow Allocation',
    recipientOrSender: 'Trust Bank',
    accountNumber: '•••• 4421',
    bankName: 'Trust Bank Treasury Operations',
    amount: 1500000.00,
    date: '2026-08-20 08:30',
    category: 'Income',
    status: 'Completed',
    referenceId: 'TB-REC-1500000-PERM',
    note: 'Official Inflow Deposit of USD 1,500,000 from Trust Bank credited to Aminabibi Bulbuliya (Permanent Record)',
    sourceAccount: 'Checking',
  },
  {
    id: 'tx-101',
    type: 'received',
    title: 'Executive Dividend & Asset Yield',
    recipientOrSender: 'Morgan Stanley Global Trust',
    accountNumber: '•••• 6632',
    bankName: 'Trust Bank Treasury',
    amount: 14500.00,
    date: '2026-08-22 14:30',
    category: 'Income',
    status: 'Completed',
    referenceId: 'TB-TX-98214981',
    note: 'Q3 Asset Dividend Distribution to Aminabibi Bulbuliya',
    sourceAccount: 'Checking',
  },
  {
    id: 'tx-102',
    type: 'transfer_out',
    title: 'International Wire Transfer',
    recipientOrSender: 'Zayd Overseas Trading Corp',
    accountNumber: 'GB44 TRUS 9821 0029 4410',
    bankName: 'Trust Bank UK (London)',
    amount: 4200.00,
    date: '2026-08-20 09:15',
    category: 'Transfer',
    status: 'Completed',
    referenceId: 'TB-TX-98214112',
    note: 'Contractual Supply Milestone Payment',
    sourceAccount: 'Checking',
  },
  {
    id: 'tx-103',
    type: 'electricity_bill',
    title: 'Electricity Smart Meter Recharge',
    recipientOrSender: 'Trust Power & Energy Grid',
    accountNumber: 'Meter #0419-8821',
    bankName: 'Trust Power Payment Gateway',
    amount: 250.00,
    date: '2026-08-18 16:40',
    category: 'Electricity',
    status: 'Completed',
    referenceId: 'TB-PWR-449102',
    note: '1,388 kWh Prepaid Electricity Token Generated',
    sourceAccount: 'Checking',
  },
  {
    id: 'tx-105',
    type: 'loan_payment',
    title: 'Home Mortgage Monthly Installment',
    recipientOrSender: 'Trust Bank Mortgage Division',
    accountNumber: 'MORT-7741-2',
    bankName: 'Trust Bank Residential Credit',
    amount: 2150.00,
    date: '2026-08-10 08:00',
    category: 'Loan',
    status: 'Completed',
    referenceId: 'TB-TX-98188390',
    note: 'Principal & Interest Auto-Payment',
    sourceAccount: 'Checking',
  }
];

export const INITIAL_LOANS: LoanItem[] = [
  {
    id: 'loan-1',
    loanType: 'Home Mortgage',
    principal: 450000,
    remainingBalance: 342150,
    interestRate: 3.85,
    monthlyPayment: 2150.00,
    nextDueDate: '2026-09-10',
    termMonths: 360,
    paidMonths: 72,
    status: 'Active',
  },
  {
    id: 'loan-2',
    loanType: 'Auto Loan',
    principal: 65000,
    remainingBalance: 24800,
    interestRate: 4.15,
    monthlyPayment: 980.00,
    nextDueDate: '2026-09-15',
    termMonths: 60,
    paidMonths: 36,
    status: 'Active',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-perm-1500k',
    title: 'Permanent Inflow Verified: $1,500,000.00',
    message: 'Official credit of $1,500,000.00 from Trust Bank has been successfully booked to Checking Account #8842-9901-4421.',
    type: 'received',
    date: 'August 20, 2026 - 08:30 AM',
    isRead: false,
  },
  {
    id: 'notif-1',
    title: 'Wire Transfer Successfully Received',
    message: 'Deposit of $14,500.00 from Morgan Stanley Global Trust has been credited to your Checking Account.',
    type: 'received',
    date: 'August 22, 2026 - 02:30 PM',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Security Notice: New Session Login',
    message: 'A successful secure login was initiated under TLS 1.3 cryptographic protection.',
    type: 'security',
    date: 'August 24, 2026 - 07:28 AM',
    isRead: false,
  }
];

// Helper functions for persistent storage
const STORAGE_KEYS = {
  PROFILE: 'trustbanks_user_profile_v2',
  CHECKING: 'trustbanks_checking_bal_v2',
  SAVINGS: 'trustbanks_savings_bal_v2',
  TRANSACTIONS: 'trustbanks_transactions_v2',
  LOANS: 'trustbanks_loans_v2',
  ELECTRICITY: 'trustbanks_electricity_v2',
  NOTIFICATIONS: 'trustbanks_notifications_v2',
  AUTH: 'trustbanks_auth_session_v2',
};

export const loadStoredData = () => {
  try {
    const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const savings = localStorage.getItem(STORAGE_KEYS.SAVINGS);
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const loans = localStorage.getItem(STORAGE_KEYS.LOANS);
    const electricity = localStorage.getItem(STORAGE_KEYS.ELECTRICITY);
    const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);

    let parsedTransactions = transactions ? JSON.parse(transactions) : INITIAL_TRANSACTIONS;
    // Ensure the permanent $1,500,000 transaction is always present
    const hasPermanent = parsedTransactions.some((t: Transaction) => t.id === 'tx-permanent-trustbank-1500k' || (t.amount === 1500000 && t.recipientOrSender === 'Trust Bank'));
    if (!hasPermanent) {
      parsedTransactions = [INITIAL_TRANSACTIONS[0], ...parsedTransactions];
    }

    // Always reset checking balance back to $1,500,000.00 as requested
    const currentCheckingBalance = INITIAL_CHECKING_BALANCE;
    localStorage.setItem(STORAGE_KEYS.CHECKING, INITIAL_CHECKING_BALANCE.toString());

    let loadedProfile = profile ? JSON.parse(profile) : INITIAL_USER_PROFILE;
    if (loadedProfile) {
      loadedProfile.joinedDate = 'Aug 1, 2026';
    }

    return {
      profile: loadedProfile,
      checkingBalance: currentCheckingBalance,
      savingsBalance: savings ? parseFloat(savings) : INITIAL_SAVINGS_BALANCE,
      transactions: parsedTransactions,
      loans: loans ? JSON.parse(loans) : INITIAL_LOANS,
      electricityMeter: electricity ? JSON.parse(electricity) : INITIAL_ELECTRICITY_METER,
      notifications: notifications ? JSON.parse(notifications) : INITIAL_NOTIFICATIONS,
      isLoggedIn: auth === 'true',
    };
  } catch (e) {
    console.error('Error loading stored banking data:', e);
    return {
      profile: INITIAL_USER_PROFILE,
      checkingBalance: INITIAL_CHECKING_BALANCE,
      savingsBalance: INITIAL_SAVINGS_BALANCE,
      transactions: INITIAL_TRANSACTIONS,
      loans: INITIAL_LOANS,
      electricityMeter: INITIAL_ELECTRICITY_METER,
      notifications: INITIAL_NOTIFICATIONS,
      isLoggedIn: false,
    };
  }
};

export const saveStoredData = (data: {
  profile?: UserProfile;
  checkingBalance?: number;
  savingsBalance?: number;
  transactions?: Transaction[];
  loans?: LoanItem[];
  electricityMeter?: ElectricityMeter;
  notifications?: AppNotification[];
  isLoggedIn?: boolean;
}) => {
  try {
    if (data.profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
    if (data.checkingBalance !== undefined) localStorage.setItem(STORAGE_KEYS.CHECKING, data.checkingBalance.toString());
    if (data.savingsBalance !== undefined) localStorage.setItem(STORAGE_KEYS.SAVINGS, data.savingsBalance.toString());
    if (data.transactions) localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
    if (data.loans) localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(data.loans));
    if (data.electricityMeter) localStorage.setItem(STORAGE_KEYS.ELECTRICITY, JSON.stringify(data.electricityMeter));
    if (data.notifications) localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(data.notifications));
    if (data.isLoggedIn !== undefined) localStorage.setItem(STORAGE_KEYS.AUTH, data.isLoggedIn ? 'true' : 'false');
  } catch (e) {
    console.error('Error saving data to localStorage:', e);
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
