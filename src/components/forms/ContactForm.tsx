import React, { useState } from 'react';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a message with at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Front-end state handling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl p-8 lg:p-10 shadow-md border border-secondary-fixed/50 space-y-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center mx-auto shadow-sm">
          <span translate="no" className="notranslate material-symbols-outlined text-[36px]">mark_email_read</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
            Message Inquiry Registered
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Thank you, <strong className="text-primary">{formData.fullName}</strong>. Your correspondence details have been validated.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low text-left space-y-2 text-body-sm text-on-surface-variant max-w-md mx-auto">
          <p><strong className="text-primary">Subject:</strong> {formData.subject}</p>
          <p><strong className="text-primary">Email:</strong> {formData.email}</p>
          {formData.phone && <p><strong className="text-primary">Phone:</strong> {formData.phone}</p>}
        </div>

        <div className="p-4 rounded-xl bg-surface-container text-body-sm text-on-surface-variant max-w-md mx-auto flex items-start gap-3">
          <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
          <p className="text-left text-xs sm:text-sm">
            Note: As backend mail service integration is configured, you can also reach our desk directly at{' '}
            <a href="tel:+918974891082" className="text-secondary font-bold underline">+91 89748 91082</a> or{' '}
            <a href="mailto:support@edenresourcehome.org.in" className="text-secondary font-bold underline">support@edenresourcehome.org.in</a>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 rounded-lg bg-surface-container-high text-primary hover:bg-secondary-fixed transition-colors font-label-lg text-label-lg font-semibold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md">
      <div className="space-y-2 pb-6">
        <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
          Correspondence Portal
        </span>
        <h2 className="font-headline-md text-headline-md text-primary">
          Send Us a Message
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Fill out the form below and our care administration team will respond promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="contactFullName" className="block font-label-lg text-label-lg text-on-surface">
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
              <span translate="no" className="notranslate material-symbols-outlined text-[20px]">person</span>
            </span>
            <input
              id="contactFullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="e.g. Somatai Kashung"
              required
              className={`w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 transition-all ${
                errors.fullName ? 'ring-2 ring-error' : 'focus:ring-secondary'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-error text-xs pt-1">{errors.fullName}</p>}
        </div>

        {/* Email & Phone Dual Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contactEmail" className="block font-label-lg text-label-lg text-on-surface">
              Email Address <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <span translate="no" className="notranslate material-symbols-outlined text-[20px]">mail</span>
              </span>
              <input
                id="contactEmail"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="name@example.com"
                required
                className={`w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 transition-all ${
                  errors.email ? 'ring-2 ring-error' : 'focus:ring-secondary'
                }`}
              />
            </div>
            {errors.email && <p className="text-error text-xs pt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contactPhone" className="block font-label-lg text-label-lg text-on-surface">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <span translate="no" className="notranslate material-symbols-outlined text-[20px]">call</span>
              </span>
              <input
                id="contactPhone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+91 98765 43210"
                className={`w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 transition-all ${
                  errors.phone ? 'ring-2 ring-error' : 'focus:ring-secondary'
                }`}
              />
            </div>
            {errors.phone && <p className="text-error text-xs pt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="contactSubject" className="block font-label-lg text-label-lg text-on-surface">
            Subject <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
              <span translate="no" className="notranslate material-symbols-outlined text-[20px]">subject</span>
            </span>
            <input
              id="contactSubject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                if (errors.subject) setErrors({ ...errors, subject: undefined });
              }}
              placeholder="e.g. Volunteer Inquiry / Child Welfare / Campus Visit"
              required
              className={`w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 transition-all ${
                errors.subject ? 'ring-2 ring-error' : 'focus:ring-secondary'
              }`}
            />
          </div>
          {errors.subject && <p className="text-error text-xs pt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contactMessage" className="block font-label-lg text-label-lg text-on-surface">
            Message <span className="text-error">*</span>
          </label>
          <textarea
            id="contactMessage"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder="Share details of your inquiry, sponsorship interest, or preferred campus visit schedule..."
            required
            className={`w-full p-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 placeholder:text-on-surface-variant/50 transition-all resize-y ${
              errors.message ? 'ring-2 ring-error' : 'focus:ring-secondary'
            }`}
          />
          {errors.message && <p className="text-error text-xs pt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-bold flex items-center justify-center gap-3 shadow-md hover:bg-secondary hover:shadow-lg transition-all group disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Processing Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <span translate="no" className="notranslate material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  send
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
