import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  User as UserIcon,
  Sparkles,
  RefreshCw,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { type TeamMember } from '../../types/team';
import { type FounderSettings, DEFAULT_FOUNDER_SETTINGS } from '../../types/founder';
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
  seedInitialTeam
} from '../../services/teamService';
import {
  getFounderSettings,
  updateFounderSettings
} from '../../services/founderService';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

type ActiveTab = 'team' | 'founder';

export const AdminTeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('team');

  // Global alerts
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-dismiss success notification
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  /* =========================================================================
   * TAB 1: OUR TEAM STATE & HANDLERS
   * ========================================================================= */
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(true);
  const [seedingTeam, setSeedingTeam] = useState<boolean>(false);

  // Modal State for Add / Edit
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Member Form State
  const [formName, setFormName] = useState('');
  const [formDesignation, setFormDesignation] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formCloudinaryId, setFormCloudinaryId] = useState('');
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(0);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);

  // Member Image Upload State
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);
  const [memberImagePreview, setMemberImagePreview] = useState<string | null>(null);
  const [memberUploading, setMemberUploading] = useState(false);
  const [memberUploadProgress, setMemberUploadProgress] = useState(0);
  const [memberFormError, setMemberFormError] = useState<string | null>(null);
  const memberFileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete Member Confirmation Modal
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [isDeletingMember, setIsDeletingMember] = useState(false);

  // Fetch Team Members (including inactives for admin)
  const fetchAllTeam = async () => {
    setTeamLoading(true);
    try {
      const list = await getTeamMembers(true);
      setTeamMembers(list);
    } catch (err: unknown) {
      console.error('Error fetching team members:', err);
      setErrorMessage('Could not load team members from Firestore.');
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeam();
  }, []);

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setFormName('');
    setFormDesignation('');
    setFormRole('');
    setFormBio('');
    setFormImageUrl('');
    setFormCloudinaryId('');
    // Next display order
    const maxOrder = teamMembers.reduce((max, m) => Math.max(max, m.displayOrder || 0), 0);
    setFormDisplayOrder(maxOrder + 1);
    setFormIsActive(true);
    setMemberImageFile(null);
    setMemberImagePreview(null);
    setMemberFormError(null);
    setMemberUploadProgress(0);
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormDesignation(member.designation);
    setFormRole(member.role || '');
    setFormBio(member.bio || '');
    setFormImageUrl(member.imageUrl || '');
    setFormCloudinaryId(member.cloudinaryPublicId || '');
    setFormDisplayOrder(member.displayOrder);
    setFormIsActive(member.isActive);
    setMemberImageFile(null);
    setMemberImagePreview(member.imageUrl || null);
    setMemberFormError(null);
    setMemberUploadProgress(0);
    setIsMemberModalOpen(true);
  };

  const handleMemberImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMemberFormError('Please select a valid image file (JPG, PNG, WEBP, GIF).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMemberFormError('Image must be smaller than 10MB.');
      return;
    }

    setMemberFormError(null);
    setMemberImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMemberImagePreview(objectUrl);
  };

  const handleRemoveMemberImage = () => {
    setMemberImageFile(null);
    setMemberImagePreview(null);
    setFormImageUrl('');
    setFormCloudinaryId('');
    if (memberFileInputRef.current) {
      memberFileInputRef.current.value = '';
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemberFormError(null);

    const trimmedName = formName.trim();
    const trimmedDesignation = formDesignation.trim();

    if (!trimmedName) {
      setMemberFormError('Please provide a team member name.');
      return;
    }

    if (!trimmedDesignation) {
      setMemberFormError('Please provide a designation / position.');
      return;
    }

    setMemberUploading(true);
    try {
      let finalImageUrl = formImageUrl;
      let finalCloudinaryId = formCloudinaryId;

      // If a new image file was chosen, upload to Cloudinary
      if (memberImageFile) {
        setMemberUploadProgress(10);
        const uploadResult = await uploadToCloudinary(memberImageFile, (progress) => {
          setMemberUploadProgress(progress);
        });
        finalImageUrl = uploadResult.secure_url;
        finalCloudinaryId = uploadResult.public_id;
      } else if (editingMember) {
        // When editing and no new image was selected:
        // If image preview was removed, clear it; otherwise keep existing photo
        if (!memberImagePreview) {
          finalImageUrl = '';
          finalCloudinaryId = '';
        } else {
          finalImageUrl = editingMember.imageUrl || '';
          finalCloudinaryId = editingMember.cloudinaryPublicId || '';
        }
      }

      if (editingMember) {
        if (!editingMember.id) {
          throw new Error('Team member document ID is missing.');
        }

        // Update existing member in Firestore using real document ID
        await updateTeamMember(editingMember.id, {
          name: trimmedName,
          designation: trimmedDesignation,
          role: formRole.trim(),
          bio: formBio.trim(),
          imageUrl: finalImageUrl,
          cloudinaryPublicId: finalCloudinaryId,
          displayOrder: Number(formDisplayOrder) || 0,
          isActive: formIsActive
        });
        setSuccessMessage(`Team member "${trimmedName}" updated successfully.`);
      } else {
        // Create new member in Firestore with auto-generated ID
        await addTeamMember({
          name: trimmedName,
          designation: trimmedDesignation,
          role: formRole.trim(),
          bio: formBio.trim(),
          imageUrl: finalImageUrl,
          cloudinaryPublicId: finalCloudinaryId,
          displayOrder: Number(formDisplayOrder) || 0,
          isActive: formIsActive
        });
        setSuccessMessage('Team member added successfully.');
      }

      setIsMemberModalOpen(false);
      await fetchAllTeam();
    } catch (err: unknown) {
      console.error('Error saving team member:', err);
      const rawMsg = err instanceof Error ? err.message : String(err);
      if (
        rawMsg.includes('No document to update') ||
        rawMsg.includes('not-found') ||
        rawMsg.includes('NOT_FOUND')
      ) {
        setMemberFormError('This team member no longer exists. Please refresh the Team list.');
        await fetchAllTeam();
      } else {
        setMemberFormError(rawMsg);
      }
    } finally {
      setMemberUploading(false);
      setMemberUploadProgress(0);
    }
  };

  const handleToggleMemberActive = async (member: TeamMember) => {
    if (!member.id) {
      setErrorMessage('Team member document ID is missing.');
      return;
    }
    try {
      const newStatus = !member.isActive;
      // Optimistic update
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, isActive: newStatus } : m))
      );

      await updateTeamMember(member.id, { isActive: newStatus });
      setSuccessMessage(
        `"${member.name}" is now ${newStatus ? 'visible (Active)' : 'hidden (Inactive)'} on the website.`
      );
    } catch (err: unknown) {
      console.error('Error toggling member status:', err);
      const rawMsg = err instanceof Error ? err.message : String(err);
      if (
        rawMsg.includes('No document to update') ||
        rawMsg.includes('not-found') ||
        rawMsg.includes('NOT_FOUND')
      ) {
        setErrorMessage('This team member no longer exists. Please refresh the Team list.');
      } else {
        setErrorMessage('Failed to update member status.');
      }
      await fetchAllTeam();
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= teamMembers.length) return;

    const currentItem = teamMembers[index];
    const targetItem = teamMembers[targetIndex];

    const currentOrder = currentItem.displayOrder;
    const targetOrder = targetItem.displayOrder;

    // Swap displayOrder values
    const newCurrentOrder = targetOrder === currentOrder
      ? (direction === 'up' ? currentOrder - 1 : currentOrder + 1)
      : targetOrder;
    const newTargetOrder = currentOrder;

    const updatedList = [...teamMembers];
    updatedList[index] = { ...currentItem, displayOrder: newCurrentOrder };
    updatedList[targetIndex] = { ...targetItem, displayOrder: newTargetOrder };
    updatedList.sort((a, b) => a.displayOrder - b.displayOrder);

    setTeamMembers(updatedList);

    try {
      await reorderTeamMembers([
        { id: currentItem.id, displayOrder: newCurrentOrder },
        { id: targetItem.id, displayOrder: newTargetOrder }
      ]);
      setSuccessMessage('Order updated successfully.');
    } catch (err: unknown) {
      console.error('Error reordering team members:', err);
      setErrorMessage('Failed to update display order.');
      await fetchAllTeam();
    }
  };

  const handleDeleteMemberConfirm = async () => {
    if (!deletingMember) return;
    if (!deletingMember.id) {
      setErrorMessage('Team member document ID is missing.');
      setDeletingMember(null);
      return;
    }
    setIsDeletingMember(true);
    try {
      await deleteTeamMember(deletingMember.id);
      setSuccessMessage(`Team member "${deletingMember.name}" deleted successfully.`);
      setDeletingMember(null);
      await fetchAllTeam();
    } catch (err: unknown) {
      console.error('Error deleting team member:', err);
      const rawMsg = err instanceof Error ? err.message : String(err);
      if (
        rawMsg.includes('No document') ||
        rawMsg.includes('not-found') ||
        rawMsg.includes('NOT_FOUND')
      ) {
        setErrorMessage('This team member no longer exists. Please refresh the Team list.');
      } else {
        setErrorMessage('Failed to delete team member.');
      }
      setDeletingMember(null);
      await fetchAllTeam();
    } finally {
      setIsDeletingMember(false);
    }
  };

  const handleSeedTeam = async () => {
    setSeedingTeam(true);
    try {
      await seedInitialTeam();
      setSuccessMessage('Default team directory successfully initialized into Firestore.');
      await fetchAllTeam();
    } catch (err: unknown) {
      console.error('Error seeding team:', err);
      setErrorMessage('Could not seed default team directory.');
    } finally {
      setSeedingTeam(false);
    }
  };

  /* =========================================================================
   * TAB 2: FOUNDER STATE & HANDLERS
   * ========================================================================= */
  const [founderData, setFounderData] = useState<FounderSettings>(DEFAULT_FOUNDER_SETTINGS);
  const [founderLoading, setFounderLoading] = useState<boolean>(true);
  const [founderSaving, setFounderSaving] = useState<boolean>(false);

  // Founder Image Upload State
  const [founderImageFile, setFounderImageFile] = useState<File | null>(null);
  const [founderImagePreview, setFounderImagePreview] = useState<string | null>(null);
  const [founderUploading, setFounderUploading] = useState(false);
  const [founderUploadProgress, setFounderUploadProgress] = useState(0);
  const [founderError, setFounderError] = useState<string | null>(null);
  const founderFileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchFounderData = async () => {
    setFounderLoading(true);
    try {
      const data = await getFounderSettings();
      setFounderData(data);
      setFounderImagePreview(data.imageUrl || null);
    } catch (err: unknown) {
      console.error('Error fetching founder data:', err);
      setErrorMessage('Could not load founder details from Firestore.');
    } finally {
      setFounderLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'founder') {
      fetchFounderData();
    }
  }, [activeTab]);

  const handleFounderImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFounderError('Please select a valid image file (JPG, PNG, WEBP, GIF).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFounderError('Image must be smaller than 10MB.');
      return;
    }

    setFounderError(null);
    setFounderImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFounderImagePreview(objectUrl);
  };

  const handleRemoveFounderImage = () => {
    setFounderImageFile(null);
    setFounderImagePreview(null);
    setFounderData((prev) => ({
      ...prev,
      imageUrl: '',
      cloudinaryPublicId: ''
    }));
    if (founderFileInputRef.current) {
      founderFileInputRef.current.value = '';
    }
  };

  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFounderError(null);

    const trimmedName = founderData.name.trim();
    if (!trimmedName) {
      setFounderError('Founder Name is required.');
      return;
    }

    setFounderSaving(true);
    try {
      let finalImageUrl = founderData.imageUrl;
      let finalCloudinaryId = founderData.cloudinaryPublicId || '';

      if (founderImageFile) {
        setFounderUploading(true);
        setFounderUploadProgress(10);
        const uploadResult = await uploadToCloudinary(founderImageFile, (progress) => {
          setFounderUploadProgress(progress);
        });
        finalImageUrl = uploadResult.secure_url;
        finalCloudinaryId = uploadResult.public_id;
      }

      const updatedPayload: Partial<FounderSettings> = {
        name: trimmedName,
        designation: founderData.designation.trim(),
        shortDescription: founderData.shortDescription.trim(),
        fullDescription: founderData.fullDescription.trim(),
        quote: (founderData.quote || '').trim(),
        imageUrl: finalImageUrl,
        cloudinaryPublicId: finalCloudinaryId,
        isActive: founderData.isActive
      };

      await updateFounderSettings(updatedPayload);

      setFounderData((prev) => ({
        ...prev,
        ...updatedPayload
      }));

      setFounderImageFile(null);
      setFounderImagePreview(finalImageUrl || null);
      setSuccessMessage('Founder details updated successfully.');
    } catch (err: unknown) {
      console.error('Error saving founder details:', err);
      const msg = err instanceof Error ? err.message : 'Failed to update founder details.';
      setFounderError(msg);
    } finally {
      setFounderSaving(false);
      setFounderUploading(false);
      setFounderUploadProgress(0);
    }
  };

  // Quick stats
  const totalTeamCount = teamMembers.length;
  const activeTeamCount = teamMembers.filter((m) => m.isActive).length;
  const hiddenTeamCount = totalTeamCount - activeTeamCount;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-outline-variant/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Eden Resource Home Leadership &amp; Staff</span>
          </div>
          <h1 className="font-headline-lg text-primary text-[26px] sm:text-[30px] font-bold tracking-tight">
            Our Team &amp; Founders
          </h1>
          <p className="text-body-sm text-on-surface-variant text-[14px] mt-1">
            Manage your caregiver staff directory and dedicated founder biography in real-time.
          </p>
        </div>

        {/* Action Button for Team Tab */}
        {activeTab === 'team' && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleOpenAddMember}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13.5px] hover:bg-secondary transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Team Member</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30">
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-[14px] transition-all ${
            activeTab === 'team'
              ? 'border-secondary text-primary bg-secondary/5 rounded-t-xl'
              : 'border-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container/50 rounded-t-xl'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Our Team</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container text-on-surface-variant">
            {totalTeamCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('founder')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-[14px] transition-all ${
            activeTab === 'founder'
              ? 'border-secondary text-primary bg-secondary/5 rounded-t-xl'
              : 'border-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container/50 rounded-t-xl'
          }`}
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>Founder</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-primary">
            Settings
          </span>
        </button>
      </div>

      {/* Global Alerts */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-secondary-fixed/30 text-on-secondary-fixed border border-secondary/30 flex items-center justify-between gap-3 text-[14px] font-semibold shadow-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-primary hover:opacity-75 p-1"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center justify-between gap-3 text-[14px] font-medium shadow-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-error hover:opacity-75 p-1"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
       * TAB 1: OUR TEAM CONTENT
       * ===================================================================== */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-outline-variant/30 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Total Staff Members
                </span>
                <div className="font-headline-sm text-primary text-[24px] font-bold mt-1">
                  {totalTeamCount}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-outline-variant/30 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Publicly Active
                </span>
                <div className="font-headline-sm text-primary text-[24px] font-bold mt-1">
                  {activeTeamCount}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-outline-variant/30 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Hidden / Draft
                </span>
                <div className="font-headline-sm text-primary text-[24px] font-bold mt-1">
                  {hiddenTeamCount}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <UserX className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Members Table / List */}
          <div className="bg-surface rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest">
              <div>
                <h2 className="font-headline-sm text-primary text-[18px] font-bold">
                  Caregivers &amp; Administrative Team
                </h2>
                <p className="text-[13px] text-on-surface-variant">
                  Ordered as displayed on the public About page. Reorder using the Up/Down arrows or edit directly.
                </p>
              </div>

              {teamMembers.length > 0 && (
                <div className="flex items-center gap-2 text-[12px] text-on-surface-variant">
                  <span>Sorted by Display Order</span>
                </div>
              )}
            </div>

            {teamLoading ? (
              <div className="py-20 text-center text-on-surface-variant">
                <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="font-semibold text-[14px]">Loading team directory from Firestore...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="py-16 text-center p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant/60">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-sm text-primary text-[18px] font-bold">
                    No team members added yet
                  </h3>
                  <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
                    Manage team members displayed on the website. Click below to add your first team member.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={handleOpenAddMember}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13.5px] hover:bg-secondary transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Team Member</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSeedTeam}
                    disabled={seedingTeam}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[13px] border border-outline-variant/30 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${seedingTeam ? 'animate-spin' : ''}`} />
                    <span>{seedingTeam ? 'Importing...' : 'Import Default Team Directory'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
                      <th className="py-3 px-4 w-14 text-center">Order</th>
                      <th className="py-3 px-4 w-20">Photo</th>
                      <th className="py-3 px-4">Name &amp; Designation</th>
                      <th className="py-3 px-4 hidden md:table-cell">Role / Badge</th>
                      <th className="py-3 px-4 w-32 text-center">Visibility</th>
                      <th className="py-3 px-4 w-40 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-[14px]">
                    {teamMembers.map((member, index) => (
                      <tr
                        key={member.id}
                        className={`hover:bg-surface-container/40 transition-colors ${
                          !member.isActive ? 'opacity-65 bg-surface-container-lowest/50' : ''
                        }`}
                      >
                        {/* Display Order Controls */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-bold text-[13px] text-primary">
                              #{member.displayOrder}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <button
                                type="button"
                                onClick={() => handleMoveOrder(index, 'up')}
                                disabled={index === 0}
                                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 text-on-surface-variant transition-colors"
                                title="Move up in order"
                                aria-label="Move up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveOrder(index, 'down')}
                                disabled={index === teamMembers.length - 1}
                                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 text-on-surface-variant transition-colors"
                                title="Move down in order"
                                aria-label="Move down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Photo Thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 flex items-center justify-center shrink-0">
                            {member.imageUrl ? (
                              <ImageWithFallback
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-6 h-6 text-on-surface-variant/40" />
                            )}
                          </div>
                        </td>

                        {/* Member Details */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <div className="font-bold text-primary text-[15px] flex items-center gap-2">
                              <span>{member.name}</span>
                            </div>
                            <p className="text-[13px] text-secondary font-semibold">
                              {member.designation}
                            </p>
                            {member.bio && (
                              <p className="text-[12px] text-on-surface-variant/80 line-clamp-1 max-w-md">
                                {member.bio}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Role / Category Badge */}
                        <td className="py-3.5 px-4 hidden md:table-cell">
                          {member.role ? (
                            <span className="inline-block px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-wider">
                              {member.role}
                            </span>
                          ) : (
                            <span className="text-on-surface-variant/40 text-[12px] italic">
                              None
                            </span>
                          )}
                        </td>

                        {/* Visibility Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleMemberActive(member)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold transition-all ${
                              member.isActive
                                ? 'bg-secondary-fixed/50 text-primary hover:bg-secondary-fixed'
                                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                            title="Click to toggle visibility"
                          >
                            {member.isActive ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-secondary" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditMember(member)}
                              className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                              title="Edit team member details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingMember(member)}
                              className="p-2 rounded-xl text-error hover:bg-error/10 transition-colors"
                              title="Delete team member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
       * TAB 2: FOUNDER MANAGEMENT
       * ===================================================================== */}
      {activeTab === 'founder' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs">
            <div className="pb-6 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-headline-sm text-primary text-[20px] font-bold">
                  Founder Profile &amp; Mission Story
                </h2>
                <p className="text-[13px] text-on-surface-variant mt-0.5">
                  Single source of truth for the Founder section displayed on both the Home Page and About Page.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-fixed/30 text-primary text-[12px] font-bold">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Syncs to Home &amp; About Us</span>
              </div>
            </div>

            {founderLoading ? (
              <div className="py-20 text-center text-on-surface-variant">
                <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="font-semibold text-[14px]">Loading founder data from Firestore...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveFounder} className="pt-6 space-y-6">
                {founderError && (
                  <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center justify-between gap-3 text-[13.5px]">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-error shrink-0" />
                      <span>{founderError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFounderError(null)}
                      className="text-error hover:opacity-75"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Photo Upload & Preview */}
                  <div className="lg:col-span-4 space-y-4">
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-primary">
                      Founder Photo
                    </label>

                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-xs flex items-center justify-center">
                      {founderImagePreview ? (
                        <img
                          src={founderImagePreview}
                          alt={founderData.name || 'Founder'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 text-on-surface-variant/50">
                          <UserIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
                          <span className="text-[12px]">No photo configured</span>
                        </div>
                      )}

                      {founderUploading && (
                        <div className="absolute inset-0 bg-primary/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                          <div className="w-8 h-8 border-3 border-secondary-fixed border-t-transparent rounded-full animate-spin mb-2" />
                          <span className="text-[12px] font-bold">Uploading to Cloudinary...</span>
                          <span className="text-[11px] text-white/80">{founderUploadProgress}%</span>
                        </div>
                      )}
                    </div>

                    <input
                      ref={founderFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFounderImageSelect}
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => founderFileInputRef.current?.click()}
                        disabled={founderSaving || founderUploading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[13px] transition-colors border border-outline-variant/30 disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4 text-secondary" />
                        <span>{founderImagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                      </button>

                      {founderImagePreview && (
                        <button
                          type="button"
                          onClick={handleRemoveFounderImage}
                          disabled={founderSaving || founderUploading}
                          className="px-3 py-2.5 rounded-xl bg-error/10 hover:bg-error/20 text-error font-semibold text-[13px] transition-colors"
                          title="Remove custom photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Uploads directly to Cloudinary unsigned preset (<code className="bg-surface-container px-1 py-0.5 rounded">edenresourcehome</code>). Recommended resolution: 800x600px or 4:3 ratio.
                    </p>

                    {/* Founder Visibility Toggle */}
                    <div className="pt-4 border-t border-outline-variant/20">
                      <label className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors">
                        <div>
                          <span className="font-bold text-[13.5px] text-primary block">
                            Founder Section Visibility
                          </span>
                          <span className="text-[11.5px] text-on-surface-variant">
                            Controls founder card visibility on Home &amp; About pages
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={founderData.isActive}
                          onChange={(e) =>
                            setFounderData((prev) => ({ ...prev, isActive: e.target.checked }))
                          }
                          className="w-5 h-5 accent-secondary rounded cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Founder Form Fields */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[13px] font-bold text-primary mb-1">
                        Founder Name(s) <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        value={founderData.name}
                        onChange={(e) =>
                          setFounderData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Mr. R.M. Sangreingam & Mrs. R.M. Tanmila"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary font-medium focus:border-secondary focus:bg-surface focus:outline-none"
                      />
                    </div>

                    {/* Designation / Title */}
                    <div>
                      <label className="block text-[13px] font-bold text-primary mb-1">
                        Designation / Title
                      </label>
                      <input
                        type="text"
                        value={founderData.designation}
                        onChange={(e) =>
                          setFounderData((prev) => ({ ...prev, designation: e.target.value }))
                        }
                        placeholder="e.g. Founders & Lifetime Trustees"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                      />
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-[13px] font-bold text-primary mb-1">
                        Short Description / Caption
                      </label>
                      <textarea
                        rows={2}
                        value={founderData.shortDescription}
                        onChange={(e) =>
                          setFounderData((prev) => ({ ...prev, shortDescription: e.target.value }))
                        }
                        placeholder="Brief 1-2 sentence caption displayed below the founder photo on the home page."
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none resize-none"
                      />
                    </div>

                    {/* Full Description / Biography */}
                    <div>
                      <label className="block text-[13px] font-bold text-primary mb-1">
                        Full Biography / Story
                      </label>
                      <textarea
                        rows={5}
                        value={founderData.fullDescription}
                        onChange={(e) =>
                          setFounderData((prev) => ({ ...prev, fullDescription: e.target.value }))
                        }
                        placeholder="Comprehensive history and mission description displayed in the founder highlight section."
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Optional Quote */}
                    <div>
                      <label className="block text-[13px] font-bold text-primary mb-1">
                        Guiding Quote <span className="text-on-surface-variant font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Quote className="w-4 h-4 text-secondary absolute top-3 left-3 pointer-events-none opacity-60" />
                        <textarea
                          rows={2}
                          value={founderData.quote || ''}
                          onChange={(e) =>
                            setFounderData((prev) => ({ ...prev, quote: e.target.value }))
                          }
                          placeholder="e.g. To see a child smile with renewed self-respect and step boldly into the future..."
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none italic"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={founderSaving || founderUploading}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-secondary transition-all disabled:opacity-50"
                      >
                        {founderSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Saving Founder Details...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Save Founder Details</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
       * ADD / EDIT MEMBER MODAL
       * ===================================================================== */}
      {isMemberModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => !memberUploading && setIsMemberModalOpen(false)}
        >
          <div
            className="bg-surface rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-primary text-[19px] font-bold">
                    {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                  </h3>
                  <p className="text-[12px] text-on-surface-variant">
                    {editingMember ? 'Update details and photo' : 'Add caregiver or administrative personnel'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                disabled={memberUploading}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {memberFormError && (
              <div className="p-3.5 rounded-xl bg-error-container/40 text-on-error-container border border-error/30 text-[13px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-error shrink-0" />
                <span>{memberFormError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveMember} className="space-y-4">
              {/* Photo Upload Box */}
              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Team Member Photo <span className="text-on-surface-variant font-normal">(Optional)</span>
                </label>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 flex items-center justify-center shrink-0">
                    {memberImagePreview ? (
                      <img
                        src={memberImagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-on-surface-variant/40" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      ref={memberFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMemberImageSelect}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => memberFileInputRef.current?.click()}
                        disabled={memberUploading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[12px] border border-outline-variant/30"
                      >
                        <Upload className="w-3.5 h-3.5 text-secondary" />
                        <span>{memberImagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                      </button>

                      {memberImagePreview && (
                        <button
                          type="button"
                          onClick={handleRemoveMemberImage}
                          disabled={memberUploading}
                          className="px-2.5 py-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error font-semibold text-[12px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant block">
                      Uploaded safely to Cloudinary. Max 10MB.
                    </span>
                  </div>
                </div>

                {memberUploading && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-primary font-semibold">
                      <span>Uploading photo to Cloudinary...</span>
                      <span>{memberUploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-300"
                        style={{ width: `${memberUploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Mary Vashum or Academic Supervisor"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                />
              </div>

              {/* Designation & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-bold text-primary mb-1">
                    Designation / Position <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    placeholder="e.g. Education & Tuition Head"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-primary mb-1">
                    Role Category Badge <span className="text-on-surface-variant font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. ACADEMIC SUPERVISOR"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[13px] font-bold text-primary mb-1">
                  Bio / Responsibilities <span className="text-on-surface-variant font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Overseeing schooling enrollment, evening study tutoring, textbook provisions, and cognitive skill mentorship."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Display Order & Active Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[13px] font-bold text-primary mb-1">
                    Display Order (Numeric)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] text-primary focus:border-secondary focus:bg-surface focus:outline-none"
                  />
                  <span className="text-[11px] text-on-surface-variant mt-1 block">
                    Lower numbers appear first.
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-[13px] text-primary block leading-tight">
                        Active on Website
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Shown in public directory
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  disabled={memberUploading}
                  className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-[14px] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={memberUploading}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-secondary transition-all disabled:opacity-50"
                >
                  {memberUploading
                    ? 'Saving...'
                    : editingMember
                    ? 'Save Changes'
                    : 'Add Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
       * DELETE MEMBER CONFIRMATION MODAL
       * ===================================================================== */}
      {deletingMember && (
        <div
          className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => !isDeletingMember && setDeletingMember(null)}
        >
          <div
            className="bg-surface rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-error-container/40 text-error flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-sm text-primary text-[18px] font-bold">
                Delete Team Member?
              </h3>
              <p className="text-body-sm text-on-surface-variant text-[13.5px]">
                Are you sure you want to delete this team member: <strong className="text-primary">{deletingMember.name}</strong>?
              </p>
              <p className="text-[12px] text-on-surface-variant/80">
                This will remove their profile from the public website directory.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingMember(null)}
                disabled={isDeletingMember}
                className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-[13.5px] font-semibold flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteMemberConfirm}
                disabled={isDeletingMember}
                className="px-4 py-2.5 rounded-xl bg-error text-white font-bold text-[13.5px] shadow-sm hover:opacity-90 flex-1"
              >
                {isDeletingMember ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminTeamPage;
