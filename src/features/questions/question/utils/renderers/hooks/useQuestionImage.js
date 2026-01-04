import { useState, useEffect, useRef } from 'react';

/**
 * Hook to handle question image URL from File object or string URL
 * Manages object URL creation and cleanup for File objects
 *
 * @param {string|File|null} image - Image URL string or File object
 * @returns {string|null} Image URL ready to use in img src, or null if no image
 */
export function useQuestionImage(image) {
  const [imageUrl, setImageUrl] = useState(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    // Cleanup previous object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (!image) {
      setImageUrl(null);
      return;
    }

    // If it's a File object, create object URL
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      objectUrlRef.current = objectUrl;
      setImageUrl(objectUrl);
    } else if (typeof image === 'string' && image.trim() !== '') {
      // If it's a string URL, use it directly
      setImageUrl(image);
    } else {
      setImageUrl(null);
    }

    // Cleanup object URL on unmount or when image changes
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [image]);

  return imageUrl;
}
