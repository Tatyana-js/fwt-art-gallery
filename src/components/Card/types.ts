interface Image {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

export default interface ICard {
  _id?: string;
  name: string;
  yearOfCreation: string;
  image?: Image;
  artist?: string;
}
