interface IImage {
    _id: string
    src: string
    webp: string
    src2x: string
    webp2x: string
    original: string
}

export interface IMainPainting {
    _id: string
    name: string
    yearOfCreation: string
    image: IImage
    artist: string
}

export default interface IArtist {
    _id: string
    name: string
    description: string
    yearsOfLife: string
    genres: string[]
    mainPainting: IMainPainting
    __v: number
}
