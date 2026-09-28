import React from 'react';
import { DonationSettingsCard } from '../../components/admin/DonationSettingsCard';
import { Link } from 'react-router-dom';
import { ExternalLink, HeartHandshake } from 'lucide-react';

export const AdminDonatePage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-bold mb-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Donation Channels Management</span>
          </div>
          <h1 className="font-headline-lg text-primary text-[26px] sm:text-[30px] font-bold">
            Donation &amp; Payment CMS
          </h1>
          <p className="text-body-sm text-on-surface-variant text-[14px] mt-0.5">
            Manage public UPI IDs, direct Bank Transfer details, and donor compliance instructions.
          </p>
        </div>

        <Link
          to="/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[13px] border border-outline-variant/30 transition-colors self-start sm:self-auto"
        >
          <ExternalLink className="w-4 h-4 text-secondary" />
          <span>View Public Donate Page</span>
        </Link>
      </div>

      {/* Donation Settings Card Component */}
      <DonationSettingsCard />
    </div>
  );
};
export default AdminDonatePage;
