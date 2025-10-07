export const BASA_URL = import.meta.env.VITE_BASA_URL;

const getImageSrc = (imageUrl: string): string => {
  return `${BASA_URL}${imageUrl}`;
};

export default getImageSrc;
