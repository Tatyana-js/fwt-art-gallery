interface IImage {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

export interface IMainPainting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}

export interface IPainting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
}

export interface IAvatar {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

export interface IGenre {
  _id: string;
  name: string;
}

export default interface IArtist {
  paintings: IMainPainting[];
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IMainPainting;
  avatar: IAvatar;
  __v?: number;
}
