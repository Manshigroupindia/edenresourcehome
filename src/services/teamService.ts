import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { type TeamMember, DEFAULT_TEAM_MEMBERS } from '../types/team';

const TEAM_COLLECTION = 'team';

/**
 * Fetch team members from Firestore.
 * - For Admin (includeInactive = true): Returns ONLY real Firestore documents (empty array if none exist).
 * - For Public Website (includeInactive = false): Returns active Firestore members, or static fallback if none exist yet.
 */
export async function getTeamMembers(includeInactive: boolean = false): Promise<TeamMember[]> {
  try {
    const colRef = collection(db, TEAM_COLLECTION);
    const q = query(colRef, orderBy('displayOrder', 'asc'));
    const snapshot = await getDocs(q);

    // If Firestore has real documents, map them directly using doc.id
    if (!snapshot.empty) {
      const members: TeamMember[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        members.push({
          id: docSnap.id,
          name: data.name || '',
          designation: data.designation || '',
          role: data.role || '',
          bio: data.bio || '',
          imageUrl: data.imageUrl || '',
          cloudinaryPublicId: data.cloudinaryPublicId || '',
          displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : 0,
          isActive: data.isActive !== false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      });

      if (!includeInactive) {
        return members.filter((m) => m.isActive);
      }

      return members;
    }

    // When snapshot is empty:
    // For admin mode: Return empty array so admin sees the genuine empty state
    if (includeInactive) {
      return [];
    }

    // For public website mode: Display static fallback directory so public site layout remains beautiful
    return DEFAULT_TEAM_MEMBERS.map((m, index) => ({
      id: `public-fallback-${index + 1}`,
      ...m,
      displayOrder: m.displayOrder ?? index + 1,
      isActive: m.isActive ?? true
    })).filter((m) => m.isActive);
  } catch (err) {
    console.warn('Failed to load team members from Firestore:', err);

    if (includeInactive) {
      return [];
    }

    return DEFAULT_TEAM_MEMBERS.map((m, index) => ({
      id: `public-fallback-${index + 1}`,
      ...m,
      displayOrder: m.displayOrder ?? index + 1,
      isActive: m.isActive ?? true
    })).filter((m) => m.isActive);
  }
}

/**
 * Add a new team member to Firestore.
 * Firestore automatically generates the document ID.
 */
export async function addTeamMember(member: Omit<TeamMember, 'id'>): Promise<string> {
  const colRef = collection(db, TEAM_COLLECTION);
  const docRef = await addDoc(colRef, {
    name: member.name.trim(),
    designation: (member.designation || '').trim(),
    role: (member.role || '').trim(),
    bio: (member.bio || '').trim(),
    imageUrl: member.imageUrl || '',
    cloudinaryPublicId: member.cloudinaryPublicId || '',
    displayOrder: Number(member.displayOrder) || 0,
    isActive: member.isActive !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return docRef.id;
}

/**
 * Update an existing team member in Firestore.
 * Requires the actual Firestore document ID.
 */
export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Team member document ID is missing.');
  }

  if (id.startsWith('default-') || id.startsWith('public-fallback-')) {
    throw new Error('Cannot update a placeholder template. Please add this team member first.');
  }

  const docRef = doc(db, TEAM_COLLECTION, id);
  const updates: Record<string, unknown> = {
    updatedAt: serverTimestamp()
  };

  if (member.name !== undefined) updates.name = member.name.trim();
  if (member.designation !== undefined) updates.designation = member.designation.trim();
  if (member.role !== undefined) updates.role = member.role.trim();
  if (member.bio !== undefined) updates.bio = member.bio.trim();
  if (member.imageUrl !== undefined) updates.imageUrl = member.imageUrl;
  if (member.cloudinaryPublicId !== undefined) updates.cloudinaryPublicId = member.cloudinaryPublicId;
  if (member.displayOrder !== undefined) updates.displayOrder = Number(member.displayOrder) || 0;
  if (member.isActive !== undefined) updates.isActive = member.isActive;

  await updateDoc(docRef, updates);
}

/**
 * Delete an existing team member from Firestore.
 * Requires the actual Firestore document ID.
 */
export async function deleteTeamMember(id: string): Promise<void> {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Team member document ID is missing.');
  }

  if (id.startsWith('default-') || id.startsWith('public-fallback-')) {
    throw new Error('Cannot delete a non-persisted template.');
  }

  const docRef = doc(db, TEAM_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Batch update display orders for real Firestore documents.
 */
export async function reorderTeamMembers(items: { id: string; displayOrder: number }[]): Promise<void> {
  const batch = writeBatch(db);
  items.forEach((item) => {
    if (item.id && !item.id.startsWith('default-') && !item.id.startsWith('public-fallback-')) {
      const docRef = doc(db, TEAM_COLLECTION, item.id);
      batch.update(docRef, {
        displayOrder: item.displayOrder,
        updatedAt: serverTimestamp()
      });
    }
  });
  await batch.commit();
}

/**
 * Seed Firestore with the verified default team members.
 * Uses addDoc to generate real Firestore document IDs for each record.
 */
export async function seedInitialTeam(): Promise<void> {
  const colRef = collection(db, TEAM_COLLECTION);
  const snapshot = await getDocs(colRef);
  if (!snapshot.empty) {
    return; // Already populated
  }

  for (const member of DEFAULT_TEAM_MEMBERS) {
    await addDoc(colRef, {
      ...member,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
}
