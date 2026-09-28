import React, { useState } from 'react';
import { useDonationSettings } from '../../hooks/useDonationSettings';

interface DonationFormData {
  amount: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
}

export const DonationForm: React.FC = () => {
  const { donationSettings } = useDonationSettings();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [formData, setFormData] = useState<DonationFormData>({
    amount: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'upi'
  });

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((curr) => (curr === key ? null : curr));
      }, 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DonationFormData, string>> = {};

    const amountNum = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Please enter a valid donation amount (minimum ₹1).';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate frontend validation & processing flow
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      amount: '',
      fullName: '',
      email: '',
      phone: '',
      message: '',
      paymentMethod: 'upi'
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl p-8 lg:p-10 shadow-md border border-secondary-fixed/40 space-y-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center mx-auto shadow-sm">
          <span translate="no" className="notranslate material-symbols-outlined text-[36px]">volunteer_activism</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
            Thank you for your willingness to support Eden Resource Home.
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Your generous intent to contribute <strong className="text-primary font-bold">₹{parseFloat(formData.amount).toLocaleString('en-IN')}</strong> will help provide loving shelter, nutritious meals, and quality schooling for our children in Ukhrul, Manipur.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-surface-container-low text-left space-y-2 text-body-sm text-on-surface-variant max-w-md mx-auto">
          <div className="flex justify-between border-b border-outline-variant/30 pb-2">
            <span className="font-semibold text-primary">Donor Name:</span>
            <span>{formData.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant/30 pb-2">
            <span className="font-semibold text-primary">Email:</span>
            <span>{formData.email}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant/30 pb-2">
            <span className="font-semibold text-primary">Intended Amount:</span>
            <span className="font-bold text-secondary">₹{parseFloat(formData.amount).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold text-primary">Payment Mode:</span>
            <span className="uppercase">{formData.paymentMethod}</span>
          </div>
        </div>

        {/* Dynamic CMS-Configured UPI Details upon selection */}
        {formData.paymentMethod === 'upi' && donationSettings.upi?.enabled && donationSettings.upi?.id && (
          <div className="p-5 rounded-xl bg-surface-container-low text-left space-y-3 max-w-md mx-auto border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-bold text-primary flex items-center gap-1.5 text-title-sm">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px]">qr_code_2</span>
                UPI Payment Details
              </span>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">Direct Transfer</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-on-surface-variant font-medium block">UPI ID (VPA):</span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-container-lowest">
                <span className="font-mono text-primary font-bold select-all break-all text-sm">{donationSettings.upi.id}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(donationSettings.upi.id, 'submitted_upi')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shrink-0 cursor-pointer"
                >
                  <span translate="no" className="notranslate material-symbols-outlined text-[14px]">
                    {copiedKey === 'submitted_upi' ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedKey === 'submitted_upi' ? 'UPI ID copied' : 'Copy UPI ID'}</span>
                </button>
              </div>
            </div>

            {donationSettings.upi.name && (
              <div className="flex justify-between text-xs pt-1">
                <span className="text-on-surface-variant font-medium">Account Name:</span>
                <span className="font-bold text-primary">{donationSettings.upi.name}</span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic CMS-Configured Bank Transfer Details upon selection */}
        {formData.paymentMethod === 'netbanking' && donationSettings.bank?.enabled && (
          <div className="p-5 rounded-xl bg-surface-container-low text-left space-y-3 max-w-md mx-auto border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-bold text-primary flex items-center gap-1.5 text-title-sm">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px]">account_balance</span>
                Bank Transfer Details
              </span>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">NEFT / RTGS / IMPS</span>
            </div>

            <div className="space-y-2 text-xs">
              {donationSettings.bank.accountName && (
                <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                  <span className="text-on-surface-variant">Account Name:</span>
                  <span className="font-bold text-primary">{donationSettings.bank.accountName}</span>
                </div>
              )}
              {donationSettings.bank.bankName && (
                <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                  <span className="text-on-surface-variant">Bank Name:</span>
                  <span className="font-bold text-primary">{donationSettings.bank.bankName}</span>
                </div>
              )}
              {donationSettings.bank.branch && (
                <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                  <span className="text-on-surface-variant">Branch:</span>
                  <span className="font-bold text-primary">{donationSettings.bank.branch}</span>
                </div>
              )}
              {donationSettings.bank.accountNumber && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest">
                  <div>
                    <span className="text-on-surface-variant block text-[11px]">Account Number:</span>
                    <span className="font-mono text-primary font-bold select-all text-sm">{donationSettings.bank.accountNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(donationSettings.bank.accountNumber || '', 'submitted_acc')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shrink-0 cursor-pointer"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[14px]">
                      {copiedKey === 'submitted_acc' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedKey === 'submitted_acc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
              {donationSettings.bank.ifsc && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest">
                  <div>
                    <span className="text-on-surface-variant block text-[11px]">IFSC Code:</span>
                    <span className="font-mono text-primary font-bold uppercase select-all text-sm">{donationSettings.bank.ifsc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(donationSettings.bank.ifsc || '', 'submitted_ifsc')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shrink-0 cursor-pointer"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[14px]">
                      {copiedKey === 'submitted_ifsc' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedKey === 'submitted_ifsc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
              {donationSettings.bank.accountType && (
                <div className="flex justify-between pt-1">
                  <span className="text-on-surface-variant">Account Type:</span>
                  <span className="font-bold text-primary">{donationSettings.bank.accountType}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Instructions */}
        {donationSettings.instructions && (
          <div className="p-4 rounded-xl bg-surface-container text-body-sm text-on-surface-variant max-w-lg mx-auto flex items-start gap-3">
            <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">receipt_long</span>
            <p className="text-left text-xs sm:text-sm whitespace-pre-line leading-relaxed">
              {donationSettings.instructions}
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-surface-container text-body-sm text-on-surface-variant max-w-lg mx-auto flex items-start gap-3">
          <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
          <p className="text-left text-xs sm:text-sm">
            Please note: Online payment gateway integration is currently in progress. An official coordinator from Eden Resource Home will reach out to you directly at <strong className="text-on-surface">{formData.email}</strong> or <strong className="text-on-surface">+91 {formData.phone}</strong> with verified contribution details and official acknowledgement receipts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 rounded-lg bg-surface-container-high text-primary hover:bg-secondary-fixed transition-colors font-label-lg text-label-lg font-semibold"
        >
          Submit Another Contribution
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-10 shadow-md">
      <div className="flex items-center justify-between gap-4 pb-6">
        <div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
            Secure Contribution
          </span>
          <h2 className="font-headline-md text-headline-md text-primary mt-1">
            Direct Gift to Our Home
          </h2>
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-primary shrink-0">
          <span translate="no" className="notranslate material-symbols-outlined text-[24px]">favorite</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* CUSTOM AMOUNT FIELD ONLY - STRICTLY NO PRESET BUTTONS */}
        <div className="p-5 rounded-xl bg-surface-container-low space-y-3">
          <label
            htmlFor="donationAmount"
            className="block font-title-md text-title-md text-primary font-bold"
          >
            Enter Donation Amount (₹) <span className="text-error">*</span>
          </label>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Every amount matters. You decide how much you wish to contribute to support our children.
          </p>

          <div className="relative flex items-center">
            <span className="absolute left-4 font-headline-md text-headline-md text-primary font-bold select-none pointer-events-none">
              ₹
            </span>
            <input
              id="donationAmount"
              name="amount"
              type="number"
              min="1"
              step="any"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                if (errors.amount) setErrors({ ...errors, amount: undefined });
              }}
              placeholder="Enter amount"
              required
              className={`w-full pl-12 pr-4 py-3.5 rounded-lg bg-surface-container-lowest text-primary font-title-lg text-title-lg focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 shadow-sm ${
                errors.amount ? 'ring-2 ring-error' : 'focus:ring-secondary'
              }`}
            />
          </div>
          {errors.amount && (
            <p className="text-error text-body-sm flex items-center gap-1.5 pt-1">
              <span translate="no" className="notranslate material-symbols-outlined text-[16px]">error</span>
              {errors.amount}
            </p>
          )}

          {formData.amount && parseFloat(formData.amount) > 0 && (
            <div className="flex items-center gap-2 pt-1 text-label-md font-label-md text-secondary">
              <span translate="no" className="notranslate material-symbols-outlined text-[16px]">eco</span>
              <span>
                ₹{parseFloat(formData.amount).toLocaleString('en-IN')} will directly support children's welfare in Ukhrul.
              </span>
            </div>
          )}
        </div>

        {/* Donor Personal Information */}
        <div className="space-y-4">
          <h3 className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">
            <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px]">person</span>
            Donor Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block font-label-lg text-label-lg text-on-surface">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="e.g. Somatai Kashung"
                required
                className={`w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 ${
                  errors.fullName ? 'ring-2 ring-error' : 'focus:ring-secondary'
                }`}
              />
              {errors.fullName && (
                <p className="text-error text-body-sm text-xs">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block font-label-lg text-label-lg text-on-surface">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="name@example.com"
                required
                className={`w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 ${
                  errors.email ? 'ring-2 ring-error' : 'focus:ring-secondary'
                }`}
              />
              {errors.email && (
                <p className="text-error text-body-sm text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phoneNumber" className="block font-label-lg text-label-lg text-on-surface">
              Phone Number (+91) <span className="text-error">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 font-label-lg text-label-lg text-on-surface-variant select-none pointer-events-none">
                +91
              </span>
              <input
                id="phoneNumber"
                name="phone"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="98765 43210"
                required
                className={`w-full pl-12 pr-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 ${
                  errors.phone ? 'ring-2 ring-error' : 'focus:ring-secondary'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-error text-body-sm text-xs">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="donorMessage" className="block font-label-lg text-label-lg text-on-surface">
              Optional Message of Encouragement
            </label>
            <textarea
              id="donorMessage"
              name="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write an encouraging note or blessing to the children and caretakers in Ukhrul..."
              className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-on-surface-variant/50 resize-y"
            />
          </div>
        </div>

        {/* Payment Mode Selection Placeholder for Future Gateway Connection */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="block font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">
              <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px]">payments</span>
              Select Payment Mode
            </label>
            <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md">
              Gateway connection ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'upi', label: 'UPI / QR', desc: 'Instant via any UPI App', icon: 'qr_code_2' },
              { id: 'card', label: 'Cards', desc: 'Debit & Credit Cards', icon: 'credit_card' },
              { id: 'netbanking', label: 'Net Banking', desc: 'All major Indian banks', icon: 'account_balance' },
            ].map((method) => (
              <label
                key={method.id}
                className={`p-3.5 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-1.5 border-2 ${
                  formData.paymentMethod === method.id
                    ? 'border-secondary bg-secondary-fixed text-primary font-semibold shadow-sm'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={formData.paymentMethod === method.id}
                  onChange={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                  className="sr-only"
                />
                <span translate="no" className="notranslate material-symbols-outlined text-[24px]">{method.icon}</span>
                <span className="font-title-md text-title-md font-bold">{method.label}</span>
                <span className="font-body-sm text-[12px] opacity-80">{method.desc}</span>
              </label>
            ))}
          </div>

          {/* Active Payment Mode Previews */}
          {formData.paymentMethod === 'upi' && donationSettings.upi?.enabled && donationSettings.upi?.id && (
            <div className="p-3.5 rounded-xl bg-secondary-fixed/40 border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-semibold text-primary block">Official Beneficiary UPI ID:</span>
                <span className="font-mono font-bold text-primary text-sm">{donationSettings.upi.id}</span>
                {donationSettings.upi.name && <span className="text-on-surface-variant block">Name: {donationSettings.upi.name}</span>}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(donationSettings.upi.id, 'form_preview_upi')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold hover:bg-secondary transition-all shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span translate="no" className="notranslate material-symbols-outlined text-[14px]">
                  {copiedKey === 'form_preview_upi' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedKey === 'form_preview_upi' ? 'UPI ID copied' : 'Copy UPI ID'}</span>
              </button>
            </div>
          )}

          {formData.paymentMethod === 'netbanking' && donationSettings.bank?.enabled && donationSettings.bank?.accountNumber && (
            <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-primary">Direct Bank Account:</span>
                {donationSettings.bank.bankName && <span className="text-on-surface-variant font-medium">{donationSettings.bank.bankName}</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest">
                  <span className="text-on-surface-variant">A/C: <strong className="text-primary font-mono">{donationSettings.bank.accountNumber}</strong></span>
                  <button
                    type="button"
                    onClick={() => handleCopy(donationSettings.bank.accountNumber || '', 'form_preview_acc')}
                    className="text-primary hover:text-secondary p-1"
                    title="Copy Account Number"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[15px]">
                      {copiedKey === 'form_preview_acc' ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                {donationSettings.bank.ifsc && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest">
                    <span className="text-on-surface-variant">IFSC: <strong className="text-primary font-mono">{donationSettings.bank.ifsc}</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy(donationSettings.bank.ifsc || '', 'form_preview_ifsc')}
                      className="text-primary hover:text-secondary p-1"
                      title="Copy IFSC"
                    >
                      <span translate="no" className="notranslate material-symbols-outlined text-[15px]">
                        {copiedKey === 'form_preview_ifsc' ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-primary text-on-primary font-title-lg text-title-lg font-bold flex items-center justify-center gap-3 shadow-md hover:bg-secondary hover:shadow-lg transition-all group disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Validating Information...</span>
              </>
            ) : (
              <>
                <span>Proceed to Donate</span>
                <span translate="no" className="notranslate material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>

        {/* Transparent Notice */}
        <div className="p-4 rounded-xl bg-surface-container flex items-start gap-3">
          <span translate="no" className="notranslate material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">
            verified_user
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            All contributions are directed to Eden Resource Home child care initiatives in Ukhrul, Manipur. Official receipts are issued for transparent record keeping.
          </p>
        </div>
      </form>
    </div>
  );
};
