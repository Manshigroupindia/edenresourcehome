import React, { useState } from 'react';
import { useDonationSettings } from '../../hooks/useDonationSettings';

export const DonationPaymentDetails: React.FC = () => {
  const { donationSettings, loading } = useDonationSettings();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (loading) {
    return null;
  }

  const { upi, bank, instructions } = donationSettings;

  const hasUpi = Boolean(upi && upi.enabled && upi.id && upi.id.trim().length > 0);
  const hasBank = Boolean(
    bank &&
    bank.enabled &&
    (
      (bank.accountNumber && bank.accountNumber.trim().length > 0) ||
      (bank.accountName && bank.accountName.trim().length > 0) ||
      (bank.bankName && bank.bankName.trim().length > 0)
    )
  );

  // If neither channel is enabled or configured, hide the section gracefully
  if (!hasUpi && !hasBank) {
    return null;
  }

  return (
    <section
      id="direct-payment-details"
      aria-label="Direct Donation Payment Details"
      className="w-full bg-surface-container-low/70 border-t border-b border-outline-variant/15 py-12 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-primary-fixed text-label-md font-label-md uppercase tracking-wider shadow-xs">
            <span translate="no" className="notranslate material-symbols-outlined text-[16px]">
              account_balance_wallet
            </span>
            <span>Direct Contribution Channels</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg lg:text-display font-display text-primary font-bold tracking-tight">
            Direct Bank &amp; UPI Transfer
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant text-balance leading-relaxed">
            You can make your voluntary donation directly via verified UPI or institutional bank transfer. Every contribution is acknowledged with an official receipt.
          </p>
        </div>

        {/* Channels Grid */}
        <div
          className={`grid grid-cols-1 ${
            hasUpi && hasBank ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'
          } gap-8 items-stretch`}
        >
          {/* =========================================================
           * 1. UPI Payment Card (Rendered only if upi.enabled === true)
           * ========================================================= */}
          {hasUpi && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/20 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-outline-variant/20">
                  <div className="w-13 h-13 rounded-2xl bg-secondary-fixed/50 text-primary flex items-center justify-center shrink-0 shadow-xs">
                    <span translate="no" className="notranslate material-symbols-outlined text-[28px]">
                      qr_code_2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-primary font-bold">
                      UPI Transfer
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Instant transfer via Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.
                    </p>
                  </div>
                </div>

                {/* UPI Details Display */}
                <div className="space-y-4">
                  {/* UPI ID Row */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold block">
                      UPI ID (VPA):
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                      <span className="font-mono text-title-md text-primary font-bold break-all select-all">
                        {upi.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(upi.id, 'upi')}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-label-md font-label-md font-bold transition-all shrink-0 cursor-pointer ${
                          copiedKey === 'upi'
                            ? 'bg-secondary text-primary-fixed shadow-sm'
                            : 'bg-primary text-on-primary hover:bg-secondary active:scale-95'
                        }`}
                        title="Copy UPI ID"
                        aria-label="Copy UPI ID to clipboard"
                      >
                        <span translate="no" className="notranslate material-symbols-outlined text-[18px]">
                          {copiedKey === 'upi' ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedKey === 'upi' ? 'UPI ID copied' : 'Copy UPI ID'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Name (Only if available) */}
                  {upi.name && upi.name.trim().length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-container-low/60 text-body-sm">
                      <span className="font-medium text-on-surface-variant">Name:</span>
                      <span className="font-bold text-primary">{upi.name.trim()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* UPI Footer Helper */}
              <div className="pt-4 border-t border-outline-variant/20 flex items-center gap-2.5 text-on-surface-variant text-label-md font-label-md">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px] shrink-0">
                  verified
                </span>
                <span>Directly credited to Eden Resource Home child care initiatives.</span>
              </div>
            </div>
          )}

          {/* =========================================================
           * 2. Bank Transfer Card (Rendered only if bank.enabled === true)
           * ========================================================= */}
          {hasBank && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/20 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-outline-variant/20">
                  <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-xs">
                    <span translate="no" className="notranslate material-symbols-outlined text-[28px]">
                      account_balance
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-primary font-bold">
                      Direct Bank Transfer
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      NEFT / RTGS / IMPS institutional direct account transfer.
                    </p>
                  </div>
                </div>

                {/* Bank Fields (Only fields with data are rendered - never empty labels) */}
                <div className="space-y-3 font-body-sm">
                  {/* Account Name */}
                  {bank.accountName && bank.accountName.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="font-medium text-on-surface-variant">Account Name:</span>
                      <span className="font-bold text-primary">{bank.accountName.trim()}</span>
                    </div>
                  )}

                  {/* Bank Name */}
                  {bank.bankName && bank.bankName.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="font-medium text-on-surface-variant">Bank Name:</span>
                      <span className="font-bold text-primary">{bank.bankName.trim()}</span>
                    </div>
                  )}

                  {/* Branch */}
                  {bank.branch && bank.branch.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="font-medium text-on-surface-variant">Branch:</span>
                      <span className="font-bold text-primary">{bank.branch.trim()}</span>
                    </div>
                  )}

                  {/* Account Number with Copy */}
                  {bank.accountNumber && bank.accountNumber.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                      <div>
                        <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold block">
                          Account Number:
                        </span>
                        <span className="font-mono text-title-md text-primary font-bold break-all select-all">
                          {bank.accountNumber.trim()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bank.accountNumber || '', 'accountNumber')}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-label-md font-label-md font-bold transition-all shrink-0 cursor-pointer self-start sm:self-auto ${
                          copiedKey === 'accountNumber'
                            ? 'bg-secondary text-primary-fixed shadow-sm'
                            : 'bg-surface-container-high text-primary hover:bg-secondary-fixed'
                        }`}
                        title="Copy Account Number"
                        aria-label="Copy Account Number to clipboard"
                      >
                        <span translate="no" className="notranslate material-symbols-outlined text-[16px]">
                          {copiedKey === 'accountNumber' ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedKey === 'accountNumber' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {/* IFSC Code with Copy */}
                  {bank.ifsc && bank.ifsc.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                      <div>
                        <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold block">
                          IFSC:
                        </span>
                        <span className="font-mono text-title-md text-primary font-bold uppercase select-all">
                          {bank.ifsc.trim().toUpperCase()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bank.ifsc || '', 'ifsc')}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-label-md font-label-md font-bold transition-all shrink-0 cursor-pointer self-start sm:self-auto ${
                          copiedKey === 'ifsc'
                            ? 'bg-secondary text-primary-fixed shadow-sm'
                            : 'bg-surface-container-high text-primary hover:bg-secondary-fixed'
                        }`}
                        title="Copy IFSC Code"
                        aria-label="Copy IFSC Code to clipboard"
                      >
                        <span translate="no" className="notranslate material-symbols-outlined text-[16px]">
                          {copiedKey === 'ifsc' ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedKey === 'ifsc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {/* Account Type */}
                  {bank.accountType && bank.accountType.trim().length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="font-medium text-on-surface-variant">Account Type:</span>
                      <span className="font-bold text-primary">{bank.accountType.trim()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Footer Helper */}
              <div className="pt-4 border-t border-outline-variant/20 flex items-center gap-2.5 text-on-surface-variant text-label-md font-label-md">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px] shrink-0">
                  shield
                </span>
                <span>Official non-profit bank account registered under JJ Act regulations.</span>
              </div>
            </div>
          )}
        </div>

        {/* Optional Additional Payment Instructions */}
        {instructions && instructions.trim().length > 0 && (
          <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/25 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span translate="no" className="notranslate material-symbols-outlined text-[22px]">
                receipt_long
              </span>
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-title-md text-title-md text-primary font-bold">
                Additional Contribution Guidelines &amp; Receipts
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line leading-relaxed">
                {instructions.trim()}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
