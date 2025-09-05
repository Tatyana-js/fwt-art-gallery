import IMainPainting from "./MainPainting";

export default interface IArtist {
  yearOfCreation?: string;
  _id?: string;
  name?: string;
  description?: string;
  yearsOfLife?: string;
  genres?: string[];
  mainPainting: IMainPainting;
  __v?: number;
}
