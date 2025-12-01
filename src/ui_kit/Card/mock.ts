import IArtist from '@/types/Artist';

const artists: IArtist[] = [
  {
    _id: '1',
    name: 'Vincent van Gogh',
    yearsOfLife: '1853-1890',
    description: 'Dutch painter',
    genres: [{ _id: '', name: 'Post-Impressionism' }],
    avatar: {
      _id: 'avatar1',
      src: '/images/van-gogh.jpg',
      webp: '/images/van-gogh.webp',
      src2x: '/images/van-gogh@2x.jpg',
      webp2x: '/images/van-gogh@2x.webp',
      original: '/images/van-gogh-original.jpg',
    },
    paintings: [], // добавьте пустой массив
    mainPainting: {
      name: 'Moonlight',
      yearOfCreation: '1895',
      image: {
        _id: '60bf3ec1ee81da111fa68728',
        src: '/images/60bf3ec1ee81da111fa6871f/image.jpg',
        webp: '/images/60bf3ec1ee81da111fa6871f/image.webp',
        src2x: '/images/60bf3ec1ee81da111fa6871f/image2x.jpg',
        webp2x: '/images/60bf3ec1ee81da111fa6871f/image2x.webp',
        original: '/images/60bf3ec1ee81da111fa6871f/original.jpg',
      },
      _id: '',
      artist: '',
    },
  },
];
export default artists;
