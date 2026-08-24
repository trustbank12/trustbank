export interface UserProfile {
  username: string;
  fullName: string;
  accountNumber: string;
  routingNumber: string;
  swiftBic: string;
  email: string;
  phone: string;
  address: string;
  tier: string;
  kycStatus: 'Verified' | 'Pending' | 'Review';
  joinedDate: string;
  securityPin: string; // "2345"
  cardDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardHolder: string;
    cardType: 'Visa Platinum' | 'Mastercard World Elite';
    isFrozen: boolean;
  };
}

export type TransactionType = 
  | 'transfer_out' 
  | 'received' 
  | 'loan_disbursement' 
  | 'loan_payment' 
  | 'electricity_bill' 
  | 'debit_purchase' 
  | 'salary_deposit'
  | 'refund';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  recipientOrSender: string;
  accountNumber?: string;
  bankName?: string;
  amount: number;
  date: string;
  category: 'Transfer' | 'Income' | 'Loan' | 'Electricity' | 'Shopping' | 'Utilities' | 'Dining' | 'Refund';
  status: 'Completed' | 'Pending' | 'Processing' | 'Refunded';
  referenceId: string;
  note?: string;
  sourceAccount: 'Checking' | 'Savings';
  createdAt?: number;
  refundedAt?: number;
}

export interface LoanItem {
  id: string;
  loanType: 'Home Mortgage' | 'Auto Loan' | 'Personal Loan' | 'Business Expansion';
  principal: number;
  remainingBalance: number;
  interestRate: number; // e.g. 3.85%
  monthlyPayment: number;
  nextDueDate: string;
  termMonths: number;
  paidMonths: number;
  status: 'Active' | 'Approved' | 'In Review' | 'Paid Off';
}

export interface ElectricityMeter {
  meterNumber: string;
  meterType: 'Prepaid (Smart Token)' | 'Postpaid Standard';
  provider: 'Trust Power & Energy Grid' | 'National Grid Corp';
  address: string;
  currentUnitsKwh: number;
  tariffPerKwh: number;
  lastRechargeDate: string;
  accountNumber: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'security' | 'transfer' | 'received' | 'loan' | 'electricity' | 'system';
  date: string;
  isRead: boolean;
}

export type ActiveTab = 'dashboard' | 'transfer' | 'received' | 'loan' | 'electricity' | 'profile' | 'notifications';
