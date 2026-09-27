import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Search,
  Upload,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import type { SiteSettings } from '../../types/settings';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { EdenLogo } from '../../components/common/EdenLogo';

interface AdminSettingsFormProps {
  initialSettings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const AdminSettingsForm: React.FC<AdminSettingsFormProps> = ({ initialSettings, updateSettings }) => {
  const [formData, setFormData] = useState<SiteSettings>(initialSettings);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [logoError, setLogoError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Phone list operations
  const handleAddPhone = () => {
    setPhoneError(null);
    const cleaned = newPhone.trim();
    if (!cleaned) {
      setPhoneError('Please enter a phone number.');
      return;
    }
    if (cleaned.length < 7) {
      setPhoneError('Phone number is too short.');
      return;
    }
    if (formData.phones.includes(cleaned)) {
      setPhoneError('This phone number is already added.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      phones: [...prev.phones, cleaned]
    }));
    setNewPhone('');
  };

  const handleRemovePhone = (index: number) => {
    if (formData.phones.length <= 1) {
      setPhoneError('At least one contact phone number is recommended.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }));
  };

  const handleEditPhone = (index: number, val: string) => {
    setFormData((prev) => {
      const copy = [...prev.phones];
      copy[index] = val;
      return { ...prev, phones: copy };
    });
  };

  // Email list operations
  const handleAddEmail = () => {
    setEmailError(null);
    const cleaned = newEmail.trim();
    if (!cleaned) {
      setEmailError('Please enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleaned)) {
      setEmailError('Please enter a valid email format.');
      return;
    }
    if (formData.emails.includes(cleaned)) {
      setEmailError('This email address is already added.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      emails: [...prev.emails, cleaned]
    }));
    setNewEmail('');
  };

  const handleRemoveEmail = (index: number) => {
    if (formData.emails.length <= 1) {
      setEmailError('At least one contact email is recommended.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index)
    }));
  };

  const handleEditEmail = (index: number, val: string) => {
    setFormData((prev) => {
      const copy = [...prev.emails];
      copy[index] = val;
      return { ...prev, emails: copy };
    });
  };

  // Logo file upload via Cloudinary
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError(null);
    setLogoUploading(true);
    setLogoUploadProgress(0);

    try {
      const result = await uploadToCloudinary(file, (percent) => {
        setLogoUploadProgress(percent);
      });

      setFormData((prev) => ({
        ...prev,
        logoUrl: result.secure_url
      }));
    } catch (err: unknown) {
      const errorObj = err as Error;
      setLogoError(errorObj.message || 'Logo upload failed. Please try again.');
    } finally {
      setLogoUploading(false);
    }
  };

  // Main save action
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!formData.siteName.trim()) {
      setErrorMessage('Website name is required.');
      return;
    }

    setSaving(true);
    try {
      await updateSettings(formData);
      setSuccessMessage('Website settings successfully saved and synced to the public website.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const errorObj = err as Error;
      setErrorMessage(errorObj.message || 'Failed to save settings to Firestore.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <h1 className="font-headline-lg text-primary text-[26px] sm:text-[30px] font-bold">
            Global Website Settings
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Configure the organization name, contact lines, physical address, and SEO metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-md hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-secondary-fixed text-on-secondary-fixed border border-secondary flex items-center gap-3 text-[14px] font-medium shadow-xs">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center gap-3 text-[14px] font-medium shadow-xs">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: General Identity */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                1. General Identity
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Controls the site branding displayed in the navbar, footer, and titles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-bold text-primary uppercase tracking-wider mb-2">
                Website Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                placeholder="Eden Resource Home"
              />
              <p className="text-[12px] text-on-surface-variant mt-1.5">
                Automatically updates the navigation brand, footer copyright, and page headers.
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-primary uppercase tracking-wider mb-2">
                Tagline / Motto
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                placeholder="Care, Education & A Brighter Future"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-primary uppercase tracking-wider mb-2">
                Established Year
              </label>
              <input
                type="number"
                value={formData.establishedYear}
                onChange={(e) => setFormData({ ...formData, establishedYear: parseInt(e.target.value) || 2001 })}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                placeholder="2001"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logo */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                2. Organization Logo
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Upload a custom logo to Cloudinary, or use the default vector crest emblem.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Logo Preview */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col items-center justify-center min-w-[140px] min-h-[140px]">
              {formData.logoUrl ? (
                <img
                  src={formData.logoUrl}
                  alt="Custom Website Logo"
                  className="max-h-20 max-w-[120px] object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <EdenLogo showText={false} className="h-12 w-12" />
                  <span className="text-[11px] text-on-surface-variant font-medium">Default Crest</span>
                </div>
              )}
            </div>

            {/* Logo actions */}
            <div className="space-y-3 flex-1">
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer font-semibold text-[13.5px] text-primary transition-colors border border-outline-variant/40">
                  <Upload className="w-4 h-4" />
                  <span>{logoUploading ? `Uploading (${logoUploadProgress}%)...` : 'Upload New Logo'}</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={logoUploading}
                  />
                </label>

                {formData.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoUrl: '' })}
                    className="ml-3 text-[13px] text-error hover:underline font-semibold"
                  >
                    Reset to Default Crest
                  </button>
                )}
              </div>

              {logoError && (
                <p className="text-[12.5px] text-error font-medium">{logoError}</p>
              )}

              <p className="text-[12px] text-on-surface-variant">
                Recommended: Transparent PNG, SVG, or WEBP image (at least 200x200px). Uploads directly to Cloudinary.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Contact Channels */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                3. Contact Phone Numbers & Emails
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Multiple phone lines and emails are supported. Add, edit, or remove entries below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Numbers List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>Phone Numbers ({formData.phones.length})</span>
                </label>
              </div>

              <div className="space-y-2.5">
                {formData.phones.map((phone, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => handleEditPhone(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] font-medium text-primary focus:bg-surface focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(idx)}
                      className="p-2.5 rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors"
                      title="Remove phone number"
                      aria-label={`Remove phone number ${phone}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Phone Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 89748 91082"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/50 text-[14px] focus:bg-surface focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-secondary text-white font-bold text-[13px] hover:bg-primary transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Phone</span>
                  </button>
                </div>
                {phoneError && (
                  <p className="text-[12px] text-error mt-1.5 font-medium">{phoneError}</p>
                )}
              </div>
            </div>

            {/* Email Addresses List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>Email Addresses ({formData.emails.length})</span>
                </label>
              </div>

              <div className="space-y-2.5">
                {formData.emails.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEditEmail(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] font-medium text-primary focus:bg-surface focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(idx)}
                      className="p-2.5 rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors"
                      title="Remove email address"
                      aria-label={`Remove email address ${email}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Email Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="support@edenresourcehome.org.in"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/50 text-[14px] focus:bg-surface focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-secondary text-white font-bold text-[13px] hover:bg-primary transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Email</span>
                  </button>
                </div>
                {emailError && (
                  <p className="text-[12px] text-error mt-1.5 font-medium">{emailError}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Physical Address & Location */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                4. Physical Address & Location Display
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Details shown on the Contact page, Footer, and donor documentation.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-primary uppercase tracking-wider mb-2">
                One-Line Location Display Text
              </label>
              <input
                type="text"
                value={formData.locationText}
                onChange={(e) => setFormData({ ...formData, locationText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                placeholder="Tallui Junction, Ukhrul District, Manipur, India"
              />
              <p className="text-[12px] text-on-surface-variant mt-1.5">
                Displayed in the footer badge, navbar subtitle, and contact banners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={formData.address.line1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, line1: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="Tallui Junction"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={formData.address.line2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, line2: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="Near Post Office / Landmark"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  City / Town
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="Ukhrul"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="Manipur"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="India"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.address.postalCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, postalCode: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                  placeholder="795142"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Social Media Links */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                5. Social Media Channels
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Leave empty to hide the icon from the public footer. Do not enter fabricated URLs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="https://youtube.com/..."
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                X / Twitter URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="https://x.com/..."
              />
            </div>
          </div>
        </div>

        {/* Section 6: SEO Metadata */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[19px] font-bold">
                6. SEO & Search Engine Metadata
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Configures default page title and search engine snippet description.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                Default Site Title
              </label>
              <input
                type="text"
                value={formData.seo.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, title: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="Eden Resource Home | Child Care & Education in Manipur"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-on-surface-variant mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.seo.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, description: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px]"
                placeholder="Eden Resource Home is a registered child welfare and residential care organization in Tallui Junction, Ukhrul, Manipur."
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-on-surface-variant text-center sm:text-left">
            Ready to apply your changes? Clicking save updates Firestore in real time.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-[14.5px] shadow-md hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, loading } = useSiteSettings();

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin mr-3" />
        <span className="font-semibold text-primary">Loading website settings from Firestore...</span>
      </div>
    );
  }

  return <AdminSettingsForm initialSettings={settings} updateSettings={updateSettings} />;
};

