/**
 * compressImage
 * Compresses and converts a browser File (jpg, png, etc.) to a WebP Blob
 * using the Canvas API — no external libraries needed.
 *
 * @param {File} file          - The original image File from an <input type="file">
 * @param {number} maxWidthPx  - Maximum width in pixels (default 1200)
 * @param {number} quality     - WebP quality 0–1 (default 0.75 ≈ ~200-400KB)
 * @returns {Promise<Blob>}    - A compressed WebP Blob ready for Firebase upload
 */
export const compressImage = (file, maxWidthPx = 1200, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate scaled dimensions (preserve aspect ratio)
      let { width, height } = img;
      if (width > maxWidthPx) {
        height = Math.round((height * maxWidthPx) / width);
        width = maxWidthPx;
      }

      // Draw onto canvas and export as WebP
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas compression failed.'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for compression.'));
    };

    img.src = objectUrl;
  });
};

/**
 * blobToBase64
 * Converts a Blob or File object to a Base64 data URL string.
 *
 * @param {Blob|File} blob 
 * @returns {Promise<string>}
 */
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
