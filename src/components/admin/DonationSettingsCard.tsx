import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  QrCode,
  Building,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { useDonationSettings } from '../../hooks/useDonationSettings';
import { type DonationPaymentSettings } from '../../types/donation';

export const DonationSettingsCard: React.FC = () => {
  const { donationSettings, loading, error, updateSettings } = useDonationSettings();

  const [formData, setFormData] = useState<DonationPaymentSettings>(donationSettings);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(donationSettings);
  }, [donationSettings]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (formData.upi.enabled && !formData.upi.id.trim()) {
      setErrorMessage('Please provide a UPI ID or disable UPI Payments.');
      return;
    }

    if (formData.bank.enabled && !formData.bank.accountNumber?.trim()) {
      setErrorMessage('Please provide an Account Number or disable Bank Transfer.');
      return;
    }

    setSaving(true);
    try {
      await updateSettings({
        upi: {
          enabled: formData.upi.enabled,
          id: formData.upi.id.trim(),
          name: (formData.upi.name || '').trim()
        },
        bank: {
          enabled: formData.bank.enabled,
          accountName: (formData.bank.accountName || '').trim(),
          bankName: (formData.bank.bankName || '').trim(),
          branch: (formData.bank.branch || '').trim(),
          accountNumber: (formData.bank.accountNumber || '').trim(),
          ifsc: (formData.bank.ifsc || '').trim().toUpperCase(),
          accountType: (formData.bank.accountType || 'Savings').trim()
        },
        instructions: (formData.instructions || '').trim()
      });

      setSuccessMessage('Donation payment details updated successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update donation details.';
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs text-center py-12 text-on-surface-variant">
        <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-semibold text-[14px]">Loading donation payment details...</p>
      </div>
    );
  }

  return (
    <div id="donation-details" className="bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-outline-variant/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Public Donation Settings</span>
          </div>
          <h2 className="font-headline-sm text-primary text-[20px] font-bold">
            Donation Payment Details
          </h2>
          <p className="text-[13px] text-on-surface-variant mt-0.5">
            Configure direct UPI IDs, Bank Transfer parameters, and contribution guidelines displayed on the public Donate page.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-secondary-fixed/30 text-on-secondary-fixed border border-secondary/30 flex items-center gap-3 text-[14px] font-semibold animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center gap-3 text-[14px] font-medium animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {error && !errorMessage && (
        <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center gap-3 text-[14px] font-medium">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* ===================================================================
         * 1. UPI PAYMENT SECTION
         * =================================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-primary flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-[16px]">
                  UPI Payment Channel
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  Enables instant transfer via Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/30">
              <input
                type="checkbox"
                checked={formData.upi.enabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    upi: { ...prev.upi, enabled: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-secondary rounded cursor-pointer"
              />
              <span className="font-bold text-[13px] text-primary select-none">
                Enable UPI Payments
              </span>
            </label>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity ${formData.upi.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div>
              <label className="block text-[13px] font-bold text-primary mb-1">
                UPI ID (VPA) {formData.upi.enabled && <span className="text-error">*</span>}
              </label>
              <input
                type="text"
                value={formData.upi.id}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    upi: { ...prev.upi, id: e.target.value }
                  }))
                }
                placeholder="e.g. edenresourcehome@sbi or username@okhdfcbank"
                required={formData.upi.enabled}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
              />
              <span className="text-[11px] text-on-surface-variant mt-1 block">
                Donors will be able to click a button to copy this ID directly on the website.
              </span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-primary mb-1">
                UPI Account / Display Name <span className="text-on-surface-variant font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.upi.name || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    upi: { ...prev.upi, name: e.target.value }
                  }))
                }
                placeholder="e.g. Eden Resource Home"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
              />
              <span className="text-[11px] text-on-surface-variant mt-1 block">
                The registered beneficiary name associated with the UPI ID.
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
         * 2. BANK TRANSFER SECTION
         * =================================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-[16px]">
                  Direct Bank Transfer (NEFT / RTGS / IMPS)
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  Enables institutional and direct banking transfers to the organization's verified bank account.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/30">
              <input
                type="checkbox"
                checked={formData.bank.enabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bank: { ...prev.bank, enabled: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-secondary rounded cursor-pointer"
              />
              <span className="font-bold text-[13px] text-primary select-none">
                Enable Bank Transfer
              </span>
            </label>
          </div>

          <div className={`space-y-4 transition-opacity ${formData.bank.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={formData.bank.accountName || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bank: { ...prev.bank, accountName: e.target.value }
                    }))
                  }
                  placeholder="e.g. Eden Resource Home"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bank.bankName || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bank: { ...prev.bank, bankName: e.target.value }
                    }))
                  }
                  placeholder="e.g. State Bank of India"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.bank.branch || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bank: { ...prev.bank, branch: e.target.value }
                    }))
                  }
                  placeholder="e.g. Ukhrul Branch"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Account Number {formData.bank.enabled && <span className="text-error">*</span>}
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showAccountNumber ? 'text' : 'password'}
                    value={formData.bank.accountNumber || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bank: { ...prev.bank, accountNumber: e.target.value }
                      }))
                    }
                    placeholder="Enter account number"
                    required={formData.bank.enabled}
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="absolute right-3 text-on-surface-variant hover:text-primary transition-colors p-1"
                    title={showAccountNumber ? 'Hide account number' : 'Show account number'}
                    aria-label={showAccountNumber ? 'Hide account number' : 'Show account number'}
                  >
                    {showAccountNumber ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <span className="text-[11px] text-on-surface-variant mt-1 block">
                  Preserved with leading zeros. Complete number is shown to donors on the public site.
                </span>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.bank.ifsc || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bank: { ...prev.bank, ifsc: e.target.value.toUpperCase() }
                    }))
                  }
                  placeholder="e.g. SBIN0001234"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none uppercase font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-primary mb-1">
                Account Type
              </label>
              <select
                value={formData.bank.accountType || 'Savings'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bank: { ...prev.bank, accountType: e.target.value }
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
              >
                <option value="Savings">Savings Account</option>
                <option value="Current">Current Account</option>
                <option value="Trust / Society">Trust / Society Account</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===================================================================
         * 3. ADDITIONAL INSTRUCTIONS
         * =================================================================== */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-bold text-primary">
            Additional Donation Instructions <span className="text-on-surface-variant font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={formData.instructions || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                instructions: e.target.value
              }))
            }
            placeholder="e.g. Please send a screenshot of the payment along with your PAN card details to support@edenresourcehome.org.in or WhatsApp +91 89748 91082 to receive an official receipt."
            className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[11px] text-on-surface-variant">
            Displayed prominently below payment options to guide donors on receipt generation and compliance.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-secondary transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Donation Details...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Donation Details</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
