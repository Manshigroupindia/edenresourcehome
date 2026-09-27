/**
 * Gallery Utility Functions
 * Handles timestamp formatting and detects/suppresses auto-generated filename titles.
 */

/**
 * Checks if a string looks like an auto-generated filename
 * e.g. "Whatsapp Image 2026 09 25 At 16 40 50", "IMG_20260925_164050", "photo.jpg", etc.
 */
export function isGeneratedFilename(text?: string | null): boolean {
  if (!text || typeof text !== 'string') return true;
  const trimmed = text.trim();
  if (!trimmed) return true;

  const lower = trimmed.toLowerCase();

  // Pattern 1: WhatsApp photo file names
  // e.g. "whatsapp image 2026 09 25 at 16 40 50", "whatsapp image...", "whatsapp-image..."
  if (lower.includes('whatsapp') && (lower.includes('image') || lower.includes('img') || lower.includes('ptt'))) {
    return true;
  }

  // Pattern 2: Legacy alt-formatter appending "- Eden Resource Home" to WhatsApp filename
  if (lower.includes('whatsapp') && lower.includes('eden resource home')) {
    return true;
  }

  // Pattern 3: Common camera/phone filename prefixes
  // e.g. IMG_1234, IMG-1234, DSC_1234, DSC01234, PXL_1234, PHOTO_1234, PHOTO-1234
  if (/^(img|dsc|pxl)[-_0-9]/i.test(trimmed)) {
    return true;
  }
  if (/^(photo|pic|screenshot|screen_shot)[-_0-9]/i.test(trimmed) && /\d/.test(trimmed)) {
    return true;
  }

  // Pattern 4: Date/timestamp filename patterns like "20260925_164050" or "2026 09 25 At 16 40 50"
  if (/\b\d{4}[-_ ]\d{2}[-_ ]\d{2}\b/i.test(trimmed) && (/\bat\b/i.test(trimmed) || /\b\d{2}[-_:. ]\d{2}\b/i.test(trimmed))) {
    return true;
  }

  // Pattern 5: Strings with image file extensions (.jpg, .jpeg, .png, .webp, etc.)
  if (/\.(jpg|jpeg|png|webp|gif|avif|heic|bmp|svg)$/i.test(trimmed)) {
    return true;
  }

  // Pattern 6: Long random alphanumeric hashes (like Cloudinary auto IDs)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Returns a clean user-entered title, or null if empty or auto-generated from a filename.
 */
export function cleanDisplayTitle(title?: string | null): string | null {
  if (!title || typeof title !== 'string') return null;
  const trimmed = title.trim();
  if (!trimmed || isGeneratedFilename(trimmed)) return null;
  return trimmed;
}

/**
 * Returns a clean user-entered description, or null if empty or auto-generated from a filename.
 */
export function cleanDisplayDescription(desc?: string | null): string | null {
  if (!desc || typeof desc !== 'string') return null;
  const trimmed = desc.trim();
  if (!trimmed || isGeneratedFilename(trimmed)) return null;
  return trimmed;
}

/**
 * Formats a Firestore Timestamp / Date object into:
 * "HH:MM AM/PM | DD MMM YYYY"
 * Example: "04:40 PM | 25 Sep 2026"
 */
export function formatGalleryTimestamp(createdAt: unknown): string | null {
  if (!createdAt) return null;

  let date: Date | null = null;

  try {
    // Firestore Timestamp instance with .toDate()
    if (typeof (createdAt as { toDate?: () => Date })?.toDate === 'function') {
      date = (createdAt as { toDate: () => Date }).toDate();
    } else if (typeof (createdAt as { seconds?: number })?.seconds === 'number') {
      date = new Date((createdAt as { seconds: number }).seconds * 1000);
    } else if (createdAt instanceof Date) {
      date = createdAt;
    } else if (typeof createdAt === 'string' || typeof createdAt === 'number') {
      const parsed = new Date(createdAt);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      }
    }
  } catch {
    return null;
  }

  if (!date || isNaN(date.getTime())) return null;

  // Format Time: "HH:MM AM/PM" (12-hour with leading zero)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  const formattedHour = hour12.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const timeStr = `${formattedHour}:${formattedMinutes} ${ampm}`;

  // Format Date: "DD MMM YYYY" (e.g. 25 Sep 2026)
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthStr = months[date.getMonth()];
  const year = date.getFullYear();
  const dateStr = `${day} ${monthStr} ${year}`;

  return `${timeStr} | ${dateStr}`;
}
