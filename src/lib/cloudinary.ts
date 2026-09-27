export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'tllrwznv';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'edenresourcehome';
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '139227391238254';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Upload an image file to Cloudinary using the unsigned upload preset.
 * Strictly avoids exposing any Cloudinary API Secret.
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResult> {
  // 1. Validation
  if (!file) {
    throw new Error('No file selected for upload.');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    throw new Error(`Unsupported image type (${file.type}). Allowed formats: JPG, JPEG, PNG, WEBP, GIF.`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`);
  }

  // 2. Prepare FormData for unsigned upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  if (API_KEY) {
    formData.append('api_key', API_KEY);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  // 3. Perform upload with XMLHttpRequest to support progress tracking if requested
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({
            secure_url: data.secure_url,
            public_id: data.public_id,
            format: data.format,
            width: data.width,
            height: data.height
          });
        } catch {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData?.error?.message || `Cloudinary upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred during image upload. Please check your connection.'));
    };

    xhr.send(formData);
  });
}
