export const VITE_API_URL = import.meta.env.VITE_API_URL;

const getImageSrc = (imageUrl: string): string => {
  return `${VITE_API_URL}${imageUrl}`;
};

export default getImageSrc;
