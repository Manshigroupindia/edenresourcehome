import React, { useState } from 'react';
import { useDonationSettings } from '../../hooks/useDonationSettings';

export const BankAccountDetailsCard: React.FC = () => {
  const { donationSettings, loading } = useDonationSettings();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const bank = donationSettings?.bank;

  // Verify that bank is enabled and has at least one useful piece of information
  const isBankEnabled = Boolean(
    bank &&
    bank.enabled === true &&
    (
      (bank.accountNumber && bank.accountNumber.trim().length > 0) ||
      (bank.accountName && bank.accountName.trim().length > 0) ||
      (bank.bankName && bank.bankName.trim().length > 0)
    )
  );

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((curr) => (curr === key ? null : curr));
      }, 2500);
    } catch {
      // Do not expose sensitive bank details in error logs
    }
  };

  // If loading, or bank transfer disabled, or no data configured, render nothing
  if (loading || !isBankEnabled || !bank) {
    return null;
  }

  return (
    <div
      id="bank-account-details"
      aria-label="Bank Account Details"
      className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-md border border-outline-variant/20 space-y-6 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="inline-flex items-center gap-2 text-secondary font-bold text-label-md font-label-md uppercase tracking-wider mb-1">
            <span translate="no" className="notranslate material-symbols-outlined text-[18px]">
              account_balance
            </span>
            <span>Direct Bank Transfer</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
            Bank Account Details
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            You can also support Eden Resource Home through direct bank transfer.
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 self-start sm:self-auto">
          <span translate="no" className="notranslate material-symbols-outlined text-[24px]">
            account_balance
          </span>
        </div>
      </div>

      {/* Bank Details Key-Value List */}
      <div className="space-y-3 font-body-md">
        {/* Account Name */}
        {bank.accountName && bank.accountName.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
            <span className="font-medium text-on-surface-variant text-body-sm">
              Account Name
            </span>
            <span className="font-bold text-primary text-body-md text-left sm:text-right">
              {bank.accountName.trim()}
            </span>
          </div>
        )}

        {/* Bank Name */}
        {bank.bankName && bank.bankName.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
            <span className="font-medium text-on-surface-variant text-body-sm">
              Bank Name
            </span>
            <span className="font-bold text-primary text-body-md text-left sm:text-right">
              {bank.bankName.trim()}
            </span>
          </div>
        )}

        {/* Branch */}
        {bank.branch && bank.branch.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
            <span className="font-medium text-on-surface-variant text-body-sm">
              Branch
            </span>
            <span className="font-bold text-primary text-body-md text-left sm:text-right">
              {bank.branch.trim()}
            </span>
          </div>
        )}

        {/* Account Number with Copy Account Number button */}
        {bank.accountNumber && bank.accountNumber.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="min-w-0">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold block">
                Account Number
              </span>
              <span className="font-mono text-title-md text-primary font-bold break-all select-all block mt-0.5">
                {bank.accountNumber.trim()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(bank.accountNumber || '', 'acc')}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-label-md font-label-md font-bold transition-all shrink-0 cursor-pointer self-start sm:self-auto ${
                copiedKey === 'acc'
                  ? 'bg-secondary text-primary-fixed shadow-sm'
                  : 'bg-primary text-on-primary hover:bg-secondary active:scale-95'
              }`}
              title="Copy Account Number"
              aria-label="Copy Account Number to clipboard"
            >
              <span translate="no" className="notranslate material-symbols-outlined text-[18px]">
                {copiedKey === 'acc' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedKey === 'acc' ? 'Copied' : 'Copy Account Number'}</span>
            </button>
          </div>
        )}

        {/* IFSC Code with Copy */}
        {bank.ifsc && bank.ifsc.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
            <span className="font-medium text-on-surface-variant text-body-sm">
              IFSC Code
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary uppercase select-all">
                {bank.ifsc.trim().toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(bank.ifsc || '', 'ifsc')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  copiedKey === 'ifsc'
                    ? 'bg-secondary text-primary-fixed'
                    : 'bg-surface-container-high text-primary hover:bg-secondary-fixed'
                }`}
                title="Copy IFSC Code"
                aria-label="Copy IFSC Code"
              >
                <span translate="no" className="notranslate material-symbols-outlined text-[14px]">
                  {copiedKey === 'ifsc' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedKey === 'ifsc' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Account Type */}
        {bank.accountType && bank.accountType.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
            <span className="font-medium text-on-surface-variant text-body-sm">
              Account Type
            </span>
            <span className="font-bold text-primary text-body-md text-left sm:text-right">
              {bank.accountType.trim()}
            </span>
          </div>
        )}
      </div>

      {/* Subtext info */}
      <div className="pt-2 flex items-center gap-2 text-on-surface-variant text-body-sm text-xs">
        <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[18px] shrink-0">
          verified_user
        </span>
        <span>
          Contributions are acknowledged with official receipts for transparent audit and record keeping.
        </span>
      </div>
    </div>
  );
};
