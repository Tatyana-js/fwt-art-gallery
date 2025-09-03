interface Image {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

interface IMainPainting {
  _id?: string;
  name: string;
  yearOfCreation: string;
  image?: Image;
  artist?: string;
}

export default interface Artist {
  yearOfCreation?: string;
  _id?: string;
  name?: string;
  description?: string;
  yearsOfLife?: string;
  genres?: string[];
  mainPainting: IMainPainting;
  __v?: number;
}
