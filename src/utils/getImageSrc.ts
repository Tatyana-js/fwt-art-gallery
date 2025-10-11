export const BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageSrc = (imageUrl: string): string => {
  return `${BASE_URL}${imageUrl}`;
};

export default getImageSrc;
