export interface UPIPaymentDetails {
  enabled: boolean;
  id: string;
  name?: string;
}

export interface BankPaymentDetails {
  enabled: boolean;
  accountName?: string;
  bankName?: string;
  branch?: string;
  accountNumber?: string;
  ifsc?: string;
  accountType?: string;
}

export interface DonationPaymentSettings {
  upi: UPIPaymentDetails;
  bank: BankPaymentDetails;
  instructions?: string;
  updatedAt?: unknown;
}

export const DEFAULT_DONATION_SETTINGS: DonationPaymentSettings = {
  upi: {
    enabled: false,
    id: '',
    name: ''
  },
  bank: {
    enabled: false,
    accountName: '',
    bankName: '',
    branch: '',
    accountNumber: '',
    ifsc: '',
    accountType: 'Savings'
  },
  instructions: ''
};
